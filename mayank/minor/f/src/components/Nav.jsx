import React from 'react'


export default class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      darkMode: false,
      mobileMenuOpen: false
    }
    this.onClick = this.onClick.bind(this)
    this.toggleDarkMode = this.toggleDarkMode.bind(this)
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
  }

  onClick(route) {
    if (this.props.navigate) this.props.navigate(route)
    this.setState({ mobileMenuOpen: false }) // Close menu after navigation
  }

  toggleDarkMode() {
    this.setState({ darkMode: !this.state.darkMode })
    // TODO: Implement actual dark mode functionality
  }

  toggleMobileMenu() {
    this.setState({ mobileMenuOpen: !this.state.mobileMenuOpen })
  }

  render() {
    const { authed } = this.props
    const { darkMode, mobileMenuOpen } = this.state

    return (
      <nav className="w-full backdrop-blur-sm border-b sticky top-0 z-50" style={{ backgroundColor: 'rgba(245, 242, 237, 0.8)', borderColor: '#d6d3d1' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => this.onClick('landing')}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF6B4A' }}>
              <span className="text-white font- text-lg leading-none">D</span>
            </div>
            <span className="text-lg sm:text-xl font-semibold transition-opacity group-hover:opacity-70" style={{ color: '#2D2D2D' }}>
              DeepDraft
            </span>
          </div>

          {/* Desktop Center Nav Items */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8 text-sm font-medium" style={{ color: '#2D2D2D' }}>
            <button
              onClick={() => this.onClick('landing')}
              className="transition-opacity hover:opacity-60"
            >
              Home
            </button>
            {authed ? (
              <>
                <button
                  onClick={() => this.onClick('dashboard')}
                  className="transition-opacity hover:opacity-60 flex items-center gap-1"
                  style={{ color: '#FF6B4A' }}
                >
                  Dashboard
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button
                  onClick={() => this.props.logout && this.props.logout()}
                  className="transition-opacity hover:opacity-60"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => this.onClick('register')}
                  className="transition-opacity hover:opacity-60"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => this.onClick('signin')}
                  className="transition-opacity hover:opacity-60"
                >
                  Sign In
                </button>
              </>
            )}
          </div>

          {/* Right Side - Dashboard Button (Desktop) & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Dashboard Button - Desktop Only */}
            <button
              onClick={() => this.onClick('dashboard')}
              className="hidden lg:flex px-5 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 items-center gap-2"
              style={{ backgroundColor: '#2D2D2D', color: 'white' }}
            >
              Dashboard
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={this.toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg transition-opacity hover:opacity-60"
              style={{ color: '#2D2D2D' }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t" style={{ borderColor: '#d6d3d1', backgroundColor: '#F5F2ED' }}>
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => this.onClick('landing')}
                className="block w-full text-left px-4 py-2 rounded-lg transition-colors hover:bg-black/5 text-sm font-medium"
                style={{ color: '#2D2D2D' }}
              >
                Home
              </button>
              {authed ? (
                <>
                  <button
                    onClick={() => this.onClick('dashboard')}
                    className="block w-full text-left px-4 py-2 rounded-lg transition-colors hover:bg-black/5 text-sm font-medium flex items-center gap-2"
                    style={{ color: '#FF6B4A' }}
                  >
                    Dashboard
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => this.props.logout && this.props.logout()}
                    className="block w-full text-left px-4 py-2 rounded-lg transition-colors hover:bg-black/5 text-sm font-medium"
                    style={{ color: '#2D2D2D' }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => this.onClick('register')}
                    className="block w-full text-left px-4 py-2 rounded-lg transition-colors hover:bg-black/5 text-sm font-medium"
                    style={{ color: '#2D2D2D' }}
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => this.onClick('signin')}
                    className="block w-full text-left px-4 py-2 rounded-lg transition-colors hover:bg-black/5 text-sm font-medium"
                    style={{ color: '#2D2D2D' }}
                  >
                    Sign In
                  </button>
                </>
              )}
              <button
                onClick={() => this.onClick('dashboard')}
                className="block w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: '#2D2D2D', color: 'white' }}
              >
                Dashboard
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </nav>
    )
  }
}