import React from 'react'
import { motion } from 'framer-motion'
import { checkEmail, register } from '../api'

export default class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: null,
      checkingEmail: false,
      emailAvailable: null,
      loading: false,
      infoMessage: ''
    }
    this.emailTimer = null
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillUnmount() {
    if (this.emailTimer) clearTimeout(this.emailTimer)
  }

  onChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value, errors: null, infoMessage: '' })

    if (name === 'email') {
      // debounce email availability check
      this.setState({ emailAvailable: null })
      if (this.emailTimer) clearTimeout(this.emailTimer)
      const email = value.trim()
      if (!email) {
        return
      }
      this.emailTimer = setTimeout(async () => {
        this.setState({ checkingEmail: true })
        try {
          const res = await checkEmail(email)
          this.setState({ emailAvailable: !!res.available })
        } catch (err) {
          this.setState({ emailAvailable: false })
        } finally {
          this.setState({ checkingEmail: false })
        }
      }, 600)
    }
  }

  async onSubmit(e) {
    e.preventDefault()
    this.setState({ errors: null, loading: true, infoMessage: '' })
    const { username, email, password } = this.state

    // small client-side check
    if (!username || !email || !password) {
      this.setState({
        errors: { _global: ['Please fill all fields'] },
        loading: false
      })
      return
    }

    try {
      const data = await register({ username, email, password })
      let token = null

      // Try to extract token from redirectUrl
      if (data.redirectUrl) {
        try {
          // Try parsing as full URL
          const u = new URL(data.redirectUrl)
          token = u.searchParams.get('token')
        } catch (e) {
          // If full URL parsing fails, try extracting token from query string
          const match = data.redirectUrl.match(/[?&]token=([^&]+)/)
          if (match) token = match[1]
        }
      }

      // Also check if backend sent token directly in response
      if (!token && data.token) {
        token = data.token
      }

      // Navigate to OTP page with token
      if (token && this.props.navigate) {
        this.props.navigate('verify', { token })
      } else {
        // Show error if no token was provided
        this.setState({ errors: { _global: ['Registration failed. No verification token received.'] } })
      }
    } catch (err) {
      // err may have shape { status, body } or body.message.fieldErrors
      const body = (err && err.body) ? err.body : err
      if (body && body.message && body.message.fieldErrors) {
        this.setState({ errors: body.message.fieldErrors })
      } else if (body && body.message) {
        this.setState({ errors: { _global: [body.message] } })
      } else {
        this.setState({ errors: { _global: ['Registration failed. Try again.'] } })
      }
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    const {
      username,
      email,
      password,
      checkingEmail,
      emailAvailable,
      errors,
      loading,
      infoMessage
    } = this.state

    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-10" style={{ backgroundColor: '#F5F2ED' }}>
        <motion.div
          className="w-full max-w-md relative group"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative bg-white/90 backdrop-blur-xl shadow-xl rounded-3xl px-7 py-8 space-y-6" style={{ border: '1px solid #d6d3d1' }}>
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-center" style={{ color: '#2D2D2D' }}>Create your account</h2>
              <p className="text-sm text-center" style={{ color: '#57534e' }}>Start exploring AI-assisted research flows.</p>
            </div>

            {infoMessage && (
              <div className="rounded-md bg-green-50 border border-green-200 px-4 py-2 text-green-700 text-sm shadow-sm animate-[fadeIn_.4s]">
                {infoMessage}
              </div>
            )}
            {errors && errors._global && (
              <div className="rounded-md bg-red-50 border border-red-200 px-4 py-2 text-red-700 text-sm shadow-sm animate-[fadeIn_.4s]">
                {errors._global.join(' ')}
              </div>
            )}

            <form onSubmit={this.onSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">Username</label>
                <input
                  name="username"
                  value={username}
                  onChange={this.onChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-400 transition placeholder:text-slate-400 text-sm"
                  placeholder="john_doe"
                  autoComplete="username"
                />
                {errors && errors.username && (
                  <p className="text-xs text-red-600 mt-1">{errors.username.join(', ')}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">Email</label>
                <div className="relative">
                  <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-400 transition placeholder:text-slate-400 text-sm pr-16"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium">
                    {checkingEmail ? (
                      <div className="flex items-center gap-1 text-slate-400">
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z" />
                        </svg>
                        Checking
                      </div>
                    ) : emailAvailable === true ? (
                      <span className="text-green-600">Available</span>
                    ) : emailAvailable === false ? (
                      <span className="text-red-600">Taken</span>
                    ) : null}
                  </div>
                </div>
                {errors && errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email.join(', ')}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">Password</label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.onChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-400 transition placeholder:text-slate-400 text-sm"
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                />
                {errors && errors.password && (
                  <p className="text-xs text-red-600">{errors.password.join(', ')}</p>
                )}
                <div className="grid grid-cols-2 gap-2 mt-2 text-[11px] text-slate-500">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">≥ 6 chars</div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">Uppercase</div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">Number / Symbol</div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">Strong mix</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold tracking-wide shadow-md transition text-white ${loading
                    ? 'cursor-wait'
                    : 'hover:brightness-110 active:scale-[.98]'
                    }`}
                  style={{ backgroundColor: loading ? '#78716c' : '#2D2D2D' }}
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Create account'
                  )}
                </button>
              </div>

              <div className="text-center text-xs text-slate-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => this.props.navigate && this.props.navigate('signin')}
                  className="font-medium transition"
                  style={{ color: '#FF6B4A' }}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    )
  }
}