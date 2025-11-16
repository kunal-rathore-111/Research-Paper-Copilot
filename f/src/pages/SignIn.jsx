import React from 'react'
import { signin } from '../api'

export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: null,
      infoMessage: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value, errors: null, infoMessage: '' })
  }

  async onSubmit(e) {
    e.preventDefault()
    this.setState({ errors: null, loading: true, infoMessage: '' })
    const { email, password } = this.state

    if (!email || !password) {
      this.setState({
        errors: { _global: ['Please enter both email and password'] },
        loading: false
      })
      return
    }

    try {
      const res = await signin({ email, password })
      // expected backend: { message: "Sign-in successfull" } and Set-Cookie
      if (res && (res.message && res.message.toLowerCase().includes('sign-in') || res.message.toLowerCase().includes('success'))) {
        this.setState({ infoMessage: 'Signed in successfully' })
        if (this.props.onAuth) this.props.onAuth()
        // small delay so user sees success message
        setTimeout(() => {
          if (this.props.navigate) this.props.navigate('dashboard')
        }, 300)
      } else {
        // fallback - navigate if backend didn't send exact message but sign-in worked
        if (this.props.onAuth) this.props.onAuth()
        if (this.props.navigate) this.props.navigate('dashboard')
      }
    } catch (err) {
      const body = err && err.body ? err.body : err
      if (body && body.message && body.message.fieldErrors) {
        this.setState({ errors: body.message.fieldErrors })
      } else if (body && body.message) {
        this.setState({ errors: { _global: [body.message] } })
      } else if (body && body.error) {
        this.setState({ errors: { _global: [body.error] } })
      } else {
        this.setState({ errors: { _global: ['Sign-in failed. Try again.'] } })
      }
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    const { email, password, loading, errors, infoMessage } = this.state

    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition"></div>
          <div className="relative bg-white/85 backdrop-blur-xl border border-white/50 shadow-xl rounded-3xl px-7 py-8 space-y-6">
            <div className="space-y-1 text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">Welcome back</h2>
              <p className="text-sm text-slate-500">Continue your research journey.</p>
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
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">Email</label>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.onChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-400 transition placeholder:text-slate-400 text-sm"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {errors && errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email.join(', ')}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">Password</label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.onChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-400 transition placeholder:text-slate-400 text-sm"
                  placeholder="Your password"
                  autoComplete="current-password"
                />
                {errors && errors.password && (
                  <p className="text-xs text-red-600 mt-1">{errors.password.join(', ')}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold tracking-wide shadow-md transition ${
                    loading
                      ? 'bg-indigo-400 cursor-wait'
                      : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 hover:brightness-110 active:scale-[.98]'
                  } text-white`}
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z" />
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <button
                  type="button"
                  onClick={() => this.props.navigate && this.props.navigate('register')}
                  className="font-medium text-indigo-600 hover:text-indigo-700 transition"
                >
                  Create account
                </button>
                <button
                  type="button"
                  onClick={() => alert('Password reset flow not implemented yet.')}
                  className="hover:text-indigo-600 transition"
                >
                  Forgot password?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}