import React from 'react'
import { verifyOtp } from '../api'

export default class OTPVerify extends React.Component {
  constructor(props) {
    super(props)
    this.state = { otp: '', error: null }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ otp: e.target.value, error: null })
  }

  async onSubmit(e) {
    e.preventDefault()
    const token = this.props.token || (this.props.routeParams && this.props.routeParams.token)
    if (!token) {
      this.setState({ error: 'Missing token' })
      return
    }
    try {
      const res = await verifyOtp(token, this.state.otp)
      if (res.message && res.message.toLowerCase().includes('success')) {
        alert('Sign-up successful. Please sign in.')
        if (this.props.navigate) this.props.navigate('signin')
      } else {
        alert(res.message || 'Verified')
        if (this.props.navigate) this.props.navigate('signin')
      }
    } catch (err) {
      const body = err && err.body ? err.body : err
      this.setState({ error: body && body.message ? body.message : 'Invalid OTP' })
    }
  }

  render() {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm relative group">
          <div className="absolute -inset-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-sky-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-40 transition"></div>
          <div className="relative bg-white/85 backdrop-blur-xl border border-white/50 shadow-lg rounded-3xl px-7 py-8 space-y-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent text-center">
              OTP Verification
            </h2>
            {!this.props.token && (
              <div className="rounded-md bg-red-50 border border-red-200 px-4 py-2 text-red-700 text-sm shadow-sm">
                Missing token. Use the email link.
              </div>
            )}
            <form onSubmit={this.onSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  OTP Code
                </label>
                <input
                  value={this.state.otp}
                  onChange={this.onChange}
                  maxLength={6}
                  className="tracking-widest text-center text-lg font-mono w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-400 transition placeholder:text-slate-300"
                  placeholder="••••••"
                  required
                />
              </div>
              {this.state.error && (
                <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-red-700 text-xs shadow-sm">
                  {this.state.error}
                </div>
              )}
              <div>
                <button
                  type="submit"
                  disabled={!this.props.token}
                  className={`w-full px-5 py-3 rounded-xl text-sm font-semibold tracking-wide shadow-md transition ${!this.props.token
                      ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 hover:brightness-110 active:scale-[.98] text-white'
                    }`}
                >
                  Verify OTP
                </button>
              </div>
            </form>
            <div className="text-[11px] text-center text-slate-500">
              Code expires in 10 minutes. Request a new sign-up if expired.
            </div>
          </div>
        </div>
      </div>
    )
  }
}