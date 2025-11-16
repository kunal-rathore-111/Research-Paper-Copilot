import React from 'react'
import Nav from './components/Nav'
import Register from './pages/Register'
import OTPVerify from './pages/OTPVerify'
import SignIn from './pages/SignIn'
import Dashboard from './pages/DashBoard'
import LandingPage from './pages/LandingPage'
import { checkToken } from './api'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      route: 'landing', // Changed from 'dashboard' to 'landing'
      routeParams: {},
      checkingAuth: true,
      authed: false
    }
    this.navigate = this.navigate.bind(this)
  }

  componentDidMount() {
    this._isMounted = true
    // check token on mount
    checkToken()
      .then((res) => {
        if (!this._isMounted) return
        if (res && res.userId) this.setState({ authed: true })
        else this.setState({ authed: false })
      })
      .catch(() => {
        if (!this._isMounted) return
        this.setState({ authed: false })
      })
      .finally(() => {
        if (!this._isMounted) return
        this.setState({ checkingAuth: false })
      })

    // If URL contains token param (OTP redirect), set verify route
    try {
      const u = new URL(window.location.href)
      const token = u.searchParams.get('token')
      if (token) {
        this.setState({ route: 'verify', routeParams: { token } })
      }
    } catch (e) { }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  navigate(route, params = {}) {
    this.setState({ route, routeParams: params })
    // update URL for OTP token if needed
    if (route === 'verify' && params.token) {
      try {
        const u = new URL(window.location.href)
        u.searchParams.set('token', params.token)
        window.history.replaceState({}, '', u.toString())
      } catch (e) { }
    } else {
      try {
        const u = new URL(window.location.href)
        u.searchParams.delete('token')
        window.history.replaceState({}, '', u.toString())
      } catch (e) { }
    }
  }

  renderContent() {
    const { route, routeParams, authed } = this.state
    if (this.state.checkingAuth) {
      return (
        <div className="py-12 flex justify-center">
          <div className="text-gray-600">Checking authentication...</div>
        </div>
      )
    }

    if (route === 'landing') {
      return <LandingPage navigate={this.navigate} />
    }
    if (route === 'register') {
      return <Register navigate={this.navigate} />
    }
    if (route === 'verify') {
      return <OTPVerify token={routeParams.token} navigate={this.navigate} />
    }
    if (route === 'signin') {
      return <SignIn navigate={this.navigate} onAuth={() => this.setState({ authed: true, route: 'dashboard' })} />
    }
    // dashboard default
    if (route === 'dashboard') {
      if (!authed) {
        return (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">You need to sign in</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => this.navigate('signin')}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/90"
                >
                  Sign in
                </button>
                <button
                  onClick={() => this.navigate('register')}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )
      }
      return <Dashboard />
    }

    return <div className="p-8">Not found</div>
  }

  render() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-white selection:bg-indigo-600/90 selection:text-white">
        <header className="bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div
                className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent cursor-pointer hover:scale-[1.03] transition"
                onClick={() => this.navigate('landing')}
              >
                Research App
              </div>
              <nav className="hidden sm:flex text-sm font-medium gap-5">
                <button onClick={() => this.navigate('landing')} className="nav-underline text-slate-600 hover:text-indigo-600 transition">Home</button>
                <button onClick={() => this.navigate('register')} className="nav-underline text-slate-600 hover:text-indigo-600 transition">Register</button>
                <button onClick={() => this.navigate('signin')} className="nav-underline text-slate-600 hover:text-indigo-600 transition">Sign in</button>
                <button onClick={() => this.navigate('dashboard')} className="nav-underline text-slate-600 hover:text-indigo-600 transition">Dashboard</button>
              </nav>
            </div>
            <div className="text-xs sm:text-sm px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow">
              {this.state.authed ? 'Signed in' : 'Guest'}
            </div>
          </div>
        </header>

        <main className="max-w-full">
          {this.renderContent()}
        </main>

        {this.state.route !== 'landing' && (
          <footer className="mt-auto py-10 text-center text-xs text-slate-500">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 backdrop-blur-md shadow-sm border border-white/40">
              <span>© {new Date().getFullYear()} Research Co-Pilot</span>
              <span className="text-slate-300">•</span>
              <span className="hover:text-indigo-600 transition cursor-default">Focused AI Retrieval</span>
            </div>
          </footer>
        )}
      </div>
    )
  }
}