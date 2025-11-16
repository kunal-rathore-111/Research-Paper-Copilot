const API_BASE = import.meta.env.VITE_API_BASE || '/app/api'

async function parseJsonResponse(res) {
  const txt = await res.text().catch(() => '')
  try {
    const json = txt ? JSON.parse(txt) : {}
    if (!res.ok) {
      const err = { status: res.status, body: json || txt }
      throw err
    }
    return json
  } catch (e) {
    if (res.ok) return txt
    throw e
  }
}

export async function checkEmail(email) {
  const res = await fetch(`${API_BASE}/auth/email-register/check-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
  if (res.ok) return { available: true }
  return { available: false }
}

export async function register(userData) {
  const res = await fetch(`${API_BASE}/auth/email-register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  return parseJsonResponse(res)
}

export async function verifyOtp(token, otp) {
  const res = await fetch(`${API_BASE}/auth/email-register/otp-verification?token=${encodeURIComponent(token)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ otp })
  })
  return parseJsonResponse(res)
}

export async function signin(credentials) {
  const res = await fetch(`${API_BASE}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(credentials)
  })
  return parseJsonResponse(res)
}

export async function checkToken() {
  const res = await fetch(`${API_BASE}/auth/signin/check-token`, {
    method: 'POST',
    credentials: 'include'
  })
  return parseJsonResponse(res)
}

export async function submitQuery(query) {
  const res = await fetch(`${API_BASE}/chat/query`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  })
  return parseJsonResponse(res)
}

export async function fetchAllChat() {
  const res = await fetch(`${API_BASE}/chat/fetch-all-chat`, {
    method: 'GET',
    credentials: 'include'
  })
  return parseJsonResponse(res)
}

export async function exportPdf(conversationId) {
  const res = await fetch(`${API_BASE}/export/${conversationId}`, {
    method: 'POST',
    credentials: 'include'
  })
  if (!res.ok) {
    const txt = await res.text().catch(() => '')
    let message = 'Export failed'
    try {
      const j = JSON.parse(txt)
      if (j && j.message) message = j.message
    } catch { }
    throw { status: res.status, message }
  }
  return res // caller should now do: const blob = await (await exportPdf(id)).blob()
}