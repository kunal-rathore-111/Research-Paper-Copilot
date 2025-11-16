import React, { useEffect, useState } from 'react'
import { submitQuery, fetchAllChat, exportPdf } from '../api'

export default function Dashboard() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [error, setError] = useState(null)

  // NEW: track which conversation is currently being downloaded (id) or null
  const [downloadingId, setDownloadingId] = useState(null)

  useEffect(() => {
    loadHistory()
    // eslint-disable-next-line
  }, [])

  async function loadHistory() {
    try {
      const data = await fetchAllChat()
      // Expecting data.result to be an array; guard defensively
      if (data && Array.isArray(data.result)) {
        setHistory(data.result.slice().reverse()) // latest first
      } else if (Array.isArray(data)) {
        setHistory(data.slice().reverse())
      } else {
        setHistory([])
      }
    } catch (e) {
      console.error('Failed to load history', e)
      setHistory([])
    }
  }

  async function handleSubmit(e) {
    e?.preventDefault()
    setError(null)
    if (!query || query.trim().length < 5) {
      setError('Query must be at least 5 characters')
      return
    }
    setLoading(true)
    try {
      const data = await submitQuery(query.trim())

      // Normalize the response into a predictable object shape:
      // - if API returns { message: {...} } or { message: "string" }, handle both
      // - if API returns a plain string, wrap it into { answer: string }
      let payload = data
      if (data && data.message !== undefined) payload = data.message

      if (typeof payload === 'string') {
        setResult({ answer: payload })
      } else if (payload && typeof payload === 'object') {
        // ensure at least answer field exists
        setResult({
          answer: payload.answer ?? (payload.text ?? payload.content ?? ''),
          summary: payload.summary ?? '',
          validation: payload.validation ?? null,
          papers: Array.isArray(payload.papers) ? payload.papers : [],
          ...payload,
        })
      } else {
        setResult({ answer: String(payload) })
      }

      await loadHistory()
      setQuery('')
    } catch (err) {
      console.error('submitQuery error', err)
      const body = err && err.body ? err.body : err
      setError(
        body && (body.error || body.message)
          ? body.error || body.message
          : 'Research processing failed'
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleDownload(conversationId) {
    // Set the downloading id so UI can show per-item loading state
    setDownloadingId(conversationId)
    try {
      const blob = await exportPdf(conversationId)
      // If API returned an object instead of a Blob, handle gracefully
      if (!blob) throw new Error('No PDF data returned')
      // If a Response object (fetch) was returned, convert to blob
      let fileBlob = blob
      if (typeof blob === 'object' && typeof blob.arrayBuffer === 'function') {
        // fetch Response -> convert to blob
        fileBlob = await blob.blob()
      }
      const url = window.URL.createObjectURL(fileBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `research-report-${conversationId || Date.now()}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (e) {
      console.error('Export PDF failed', e)
      alert((e && e.err) || (e && e.message) || 'Failed to generate PDF')
    } finally {
      // Clear downloading state regardless of success/error
      setDownloadingId(null)
    }
  }

  // Small helper to safely render a short preview text
  const previewText = (text, max = 140) => {
    if (!text) return '—'
    const str = typeof text === 'string' ? text : JSON.stringify(text)
    return str.length > max ? str.slice(0, max) + '...' : str
  }

  return (
    <>
      <div className="relative min-h-screen w-full">
        <div aria-hidden className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />
        <div aria-hidden className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.25),transparent_60%)]" />

        <main className="relative z-10 w-full min-h-screen">
          <div className="max-w-[1400px] mx-auto px-6 py-12 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <section className="lg:col-span-2">
                <div className="rounded-3xl p-8 border border-slate-800/60 bg-gradient-to-br from-slate-900/70 to-slate-800/70 backdrop-blur-xl shadow-[0_8px_32px_-6px_rgba(0,0,0,0.65)] space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 to-sky-300 text-transparent bg-clip-text">
                        New Research Query
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Ask and receive structured AI-validated results.
                      </p>
                    </div>
                    <div className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      Model: ResearchGPT
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <label className="block space-y-2">
                      <span className="text-xs font-medium tracking-wide text-slate-300 uppercase">
                        Query
                      </span>
                      <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        rows={5}
                        placeholder="Type your research question..."
                        className="w-full resize-none rounded-xl bg-slate-900/60 border border-slate-700/70 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-400 transition shadow-inner"
                      />
                    </label>

                    {error && (
                      <div className="rounded-md bg-red-900/40 border border-red-700/70 px-4 py-2 text-red-200 text-xs animate-[fadeIn_.4s]">
                        {error}
                      </div>
                    )}

                    <div className="flex items-center flex-wrap gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold tracking-wide shadow-md transition ${loading
                            ? 'bg-indigo-600/40 cursor-wait'
                            : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 hover:brightness-110 active:scale-[.98]'
                          } text-white`}
                      >
                        {loading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="3"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          'Submit'
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setQuery('')
                          setResult(null)
                          setError(null)
                        }}
                        className="px-4 py-3 rounded-xl border border-slate-700 text-slate-300 text-sm hover:bg-slate-800/60 transition"
                      >
                        Reset
                      </button>

                      <div className="ml-auto text-xs text-slate-400">
                        Tip: be specific for better results
                      </div>
                    </div>
                  </form>

                  {result && (
                    <div className="mt-6 rounded-2xl border border-slate-800/50 bg-slate-900/50 p-6 space-y-4 shadow-inner">
                      <h3 className="text-lg font-semibold text-slate-100">
                        Result
                      </h3>
                      <div className="text-slate-300 space-y-4 text-sm leading-relaxed">
                        <p>
                          <span className="font-medium text-slate-400">
                            Answer:
                          </span>{' '}
                          <span className="text-slate-100">
                            {result?.answer ?? '—'}
                          </span>
                        </p>
                        {result?.summary ? (
                          <p>
                            <span className="font-medium text-slate-400">
                              Summary:
                            </span>{' '}
                            <span className="text-slate-100">
                              {result.summary}
                            </span>
                          </p>
                        ) : null}
                        {result?.validation && (
                          <div className="space-y-2">
                            <span className="font-medium text-slate-400">
                              Validation:
                            </span>
                            <pre className="mt-2 p-4 bg-slate-950/60 border border-slate-800 rounded-lg text-[11px] text-indigo-300 overflow-auto max-h-[260px]">
                              {JSON.stringify(result.validation, null, 2)}
                            </pre>
                          </div>
                        )}
                        {Array.isArray(result?.papers) &&
                          result.papers.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-medium text-slate-300">
                                Papers
                              </h4>
                              <ul className="space-y-3">
                                {result.papers.map((p, idx) => (
                                  <li
                                    key={p.paperId ?? p.id ?? idx}
                                    className="p-3 rounded-lg bg-slate-950/50 border border-slate-800"
                                  >
                                    <a
                                      className="text-indigo-400 hover:underline font-medium"
                                      href={p.url ?? '#'}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {p.title ?? p.name ?? 'Untitled'}
                                    </a>
                                    <div className="text-xs text-slate-500 mt-1">
                                      {Array.isArray(p.authors)
                                        ? p.authors.join(', ')
                                        : p.authors}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <aside>
                <div className="rounded-3xl p-6 border border-slate-800/60 bg-gradient-to-br from-slate-900/70 to-slate-800/70 backdrop-blur-xl shadow-[0_8px_32px_-6px_rgba(0,0,0,0.65)] flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-slate-100">
                      History
                    </h2>
                    <button
                      onClick={loadHistory}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                    >
                      Refresh
                    </button>
                  </div>

                  {history.length === 0 ? (
                    <div className="text-slate-500 text-xs">
                      No conversations yet
                    </div>
                  ) : (
                    <ul className="space-y-4 overflow-auto max-h-[55vh] pr-1">
                      {history.map((h, idx) => {
                        const id = h?._id ?? h?.id ?? idx
                        return (
                          <li
                            key={id}
                            className="group p-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-indigo-600/50 transition relative"
                          >
                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 bg-gradient-to-r from-indigo-500 via-purple-600 to-sky-500 transition pointer-events-none" />
                            <div className="min-w-0 space-y-1">
                              <div className="text-[11px] text-slate-500">
                                {h?.createdAt
                                  ? new Date(h.createdAt).toLocaleString()
                                  : '—'}
                              </div>
                              <div className="text-sm text-slate-100 font-medium truncate">
                                {h?.query ?? 'Untitled query'}
                              </div>
                              <div className="text-xs text-slate-400 line-clamp-3">
                                {previewText(h?.answer)}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                              <button
                                onClick={() => handleDownload(id)}
                                disabled={downloadingId === id}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${downloadingId === id
                                    ? 'bg-indigo-600/40 cursor-wait text-white'
                                    : 'bg-gradient-to-r from-indigo-600 to-sky-500 text-white hover:brightness-110'
                                  } transition shadow`}
                              >
                                {downloadingId === id ? (
                                  <span className="inline-flex items-center gap-1.5">
                                    <svg
                                      className="animate-spin h-3.5 w-3.5"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="3"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                      />
                                      <path
                                        className="opacity-75"
                                        d="M4 12a8 8 0 018-8v4"
                                      />
                                    </svg>
                                    PDF...
                                  </span>
                                ) : (
                                  'Export'
                                )}
                              </button>
                              <button
                                onClick={() =>
                                  setResult({
                                    answer: h?.answer ?? '',
                                    summary: h?.summary ?? '',
                                    validation: h?.validation ?? null,
                                    papers: Array.isArray(h?.papers)
                                      ? h.papers
                                      : []
                                  })
                                }
                                className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 text-xs hover:bg-slate-800/60 transition"
                              >
                                View
                              </button>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  )}

                  <div className="pt-1 text-[10px] text-slate-500">
                    Stored securely. Export any conversation as PDF.
                  </div>
                </div>
              </aside>
            </div>

            <div className="text-center text-xs text-slate-500">
              Built with ❤️ — Research App
            </div>
          </div>
        </main>
      </div>
    </>
  )
}