import React from 'react'

export default class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(route) {
    if (this.props.navigate) this.props.navigate(route)
  }

  render() {
    const { authed } = this.props
    return (
      <nav className="w-full bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <div
            className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent cursor-pointer hover:scale-[1.04] transition"
            onClick={() => this.onClick('dashboard')}
          >
            Research App
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <span onClick={() => this.onClick('register')} className="cursor-pointer text-slate-600 hover:text-indigo-600 nav-underline transition">Register</span>
            <span onClick={() => this.onClick('signin')} className="cursor-pointer text-slate-600 hover:text-indigo-600 nav-underline transition">Sign in</span>
            <span onClick={() => this.onClick('dashboard')} className="cursor-pointer text-slate-600 hover:text-indigo-600 nav-underline transition">Dashboard</span>
            {authed ? <span className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow text-xs">Signed in</span> : null}
          </div>
        </div>
      </nav>
    )
  }
}