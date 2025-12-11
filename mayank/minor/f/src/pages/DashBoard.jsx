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
      <div className="relative min-h-screen w-full" style={{ backgroundColor: '#F5F2ED' }}>

        <main className="relative z-10 w-full min-h-screen">
          <div className="max-w-[1400px] mx-auto px-6 py-12 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <section className="lg:col-span-2">
                <div className="rounded-3xl p-8 shadow-xl space-y-6" style={{ border: '1px solid #d6d3d1', backgroundColor: 'white' }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight" style={{ color: '#FF6B4A' }}>
                        New Research Query
                      </h2>
                      <p className="text-xs mt-1" style={{ color: '#57534e' }}>
                        Ask and receive structured AI-validated results.
                      </p>
                    </div>
                    <div className="text-xs px-3 py-1 rounded-full border" style={{ backgroundColor: '#EDE8E1', color: '#2D2D2D', borderColor: '#d6d3d1' }}>
                      Model: ResearchGPT
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <label className="block space-y-2">
                      <span className="text-xs font-medium tracking-wide uppercase" style={{ color: '#2D2D2D' }}>
                        Query
                      </span>
                      <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        rows={5}
                        placeholder="Type your research question..."
                        className="w-full resize-none rounded-xl px-4 py-3 transition shadow-inner focus:outline-none focus:ring-2"
                        style={{ backgroundColor: '#F5F2ED', border: '1px solid #d6d3d1', color: '#2D2D2D' }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#FF6B4A'
                          e.target.style.boxShadow = '0 0 0 2px rgba(255, 107, 74, 0.2)'
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#d6d3d1'
                          e.target.style.boxShadow = 'none'
                        }}
                      />
                    </label>

                    {error && (
                      <div className="rounded-md bg-red-900/40 border border-red-700/70 px-4 py-2 text-xs font-light animate-[fadeIn_.4s]" style={{ color: '#2D2D2D' }}>
                        {error}
                      </div>
                    )}

                    <div className="flex items-center flex-wrap gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold tracking-wide shadow-md transition text-white ${loading
                          ? 'cursor-wait'
                          : 'hover:brightness-110 active:scale-[.98]'
                          }`}
                        style={{ backgroundColor: loading ? '#78716c' : '#FF6B4A' }}
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
                        className="px-4 py-3 rounded-xl border text-sm transition"
                        style={{ borderColor: '#d6d3d1', color: '#2D2D2D', backgroundColor: 'white' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EDE8E1'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        Reset
                      </button>

                      <div className="ml-auto text-xs" style={{ color: '#57534e' }}>
                        Tip: be specific for better results
                      </div>
                    </div>
                  </form>

                  {result && (
                    <div className="mt-6 rounded-2xl border p-6 space-y-4 shadow-inner" style={{ borderColor: '#d6d3d1', backgroundColor: '#F5F2ED' }}>
                      <h3 className="text-lg font-semibold" style={{ color: '#2D2D2D' }}>
                        Result
                      </h3>
                      <div className="space-y-4 text-sm leading-relaxed" style={{ color: '#2D2D2D' }}>
                        <p>
                          <span className="font-medium" style={{ color: '#57534e' }}>
                            Answer:
                          </span>{' '}
                          <span style={{ color: '#2D2D2D' }}>
                            {result?.answer ?? '—'}
                          </span>
                        </p>
                        {result?.summary ? (
                          <p>
                            <span className="font-medium" style={{ color: '#57534e' }}>
                              Summary:
                            </span>{' '}
                            <span style={{ color: '#2D2D2D' }}>
                              {result.summary}
                            </span>
                          </p>
                        ) : null}
                        {result?.validation && (
                          <div className="space-y-2">
                            <span className="font-medium" style={{ color: '#57534e' }}>
                              Validation:
                            </span>
                            <pre className="mt-2 p-4 border rounded-lg text-[11px] overflow-auto max-h-[260px]" style={{ backgroundColor: '#EDE8E1', borderColor: '#d6d3d1', color: '#2D2D2D' }}>
                              {JSON.stringify(result.validation, null, 2)}
                            </pre>
                          </div>
                        )}
                        {Array.isArray(result?.papers) &&
                          result.papers.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-medium" style={{ color: '#2D2D2D' }}>
                                Papers
                              </h4>
                              <ul className="space-y-3">
                                {result.papers.map((p, idx) => (
                                  <li
                                    key={p.paperId ?? p.id ?? idx}
                                    className="p-3 rounded-lg border" style={{ backgroundColor: 'white', borderColor: '#d6d3d1' }}
                                  >
                                    <a
                                      className="font-medium"
                                      style={{ color: '#FF6B4A' }}
                                      href={p.url ?? '#'}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {p.title ?? p.name ?? 'Untitled'}
                                    </a>
                                    <div className="text-xs mt-1" style={{ color: '#78716c' }}>
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
                <div className="rounded-3xl p-6 border shadow-xl flex flex-col gap-5" style={{ borderColor: '#d6d3d1', backgroundColor: 'white' }}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold" style={{ color: '#2D2D2D' }}>
                      History
                    </h2>
                    <button
                      onClick={loadHistory}
                      className="text-xs px-3 py-1.5 rounded-lg border transition"
                      style={{ backgroundColor: '#EDE8E1', color: '#2D2D2D', borderColor: '#d6d3d1' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d6d3d1'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#EDE8E1'}
                    >
                      Refresh
                    </button>
                  </div>

                  {history.length === 0 ? (
                    <div className="text-xs" style={{ color: '#78716c' }}>
                      No conversations yet
                    </div>
                  ) : (
                    <ul className="space-y-4 overflow-auto max-h-[55vh] pr-1">
                      {history.map((h, idx) => {
                        const id = h?._id ?? h?.id ?? idx
                        return (
                          <li
                            key={id}
                            className="group p-4 rounded-xl border transition relative"
                            style={{ borderColor: '#d6d3d1', backgroundColor: 'white' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F2ED'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                          >
                            <div className="min-w-0 space-y-1">
                              <div className="text-[11px]" style={{ color: '#78716c' }}>
                                {h?.createdAt
                                  ? new Date(h.createdAt).toLocaleString()
                                  : '—'}
                              </div>
                              <div className="text-sm font-medium truncate" style={{ color: '#2D2D2D' }}>
                                {h?.query ?? 'Untitled query'}
                              </div>
                              <div className="text-xs line-clamp-3" style={{ color: '#57534e' }}>
                                {previewText(h?.answer)}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                              <button
                                onClick={() => handleDownload(id)}
                                disabled={downloadingId === id}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition shadow text-white`}
                                style={{ backgroundColor: downloadingId === id ? '#78716c' : '#FF6B4A' }}
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
                                className="px-3 py-1.5 rounded-lg border text-xs transition"
                                style={{ borderColor: '#d6d3d1', color: '#2D2D2D', backgroundColor: 'white' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EDE8E1'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                              >
                                View
                              </button>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  )}

                  <div className="pt-1 text-[10px]" style={{ color: '#78716c' }}>
                    Stored securely. Export any conversation as PDF.
                  </div>
                </div>
              </aside>
            </div>


          </div>
        </main>
      </div>
    </>
  )
}