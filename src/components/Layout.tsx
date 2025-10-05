import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import NewsletterSubscription from './NewsletterSubscription'
import { 
  Brain, 
  Menu, 
  X, 
  Users, 
  Target, 
  BarChart3, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Facebook, 
  Star,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Play,
  HelpCircle,
  Info,
  TrendingUp,
  MessageSquare,
  BookOpen
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [userMenuOpen, setUserMenuOpen] = React.useState(false)
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const location = useLocation()
  const { user, logout } = useAuthStore()

  const publicNavigation = [
    { name: 'Home', href: '/', icon: Brain },
    { name: 'Demo', href: '/demo', icon: Play },
    { name: 'Business', href: '/business', icon: Users },
    { name: 'Schools', href: '/schools', icon: Target },
    { name: 'Pricing', href: '/pricing', icon: BarChart3 },
  ]

  const authenticatedNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Mock Interviews', href: '/interview', icon: Users },
    { name: 'Communication Skills', href: '/ielts', icon: MessageSquare },
    { name: 'Grammar & Vocabulary', href: '/ai-interview', icon: BookOpen },
    { name: 'Progress', href: '/progress', icon: BarChart3 },
    { name: 'Plan Upgrade', href: '/plans', icon: TrendingUp },
  ]

  const supportNavigation = [
    { name: 'FAQ', href: '/faq', icon: HelpCircle },
    { name: 'Help Center', href: '/help', icon: Info },
    { name: 'About Us', href: '/about', icon: Users },
  ]

  const navigation = user ? authenticatedNavigation : publicNavigation

  const isActive = (href: string) => {
    return location.pathname === href
  }

  // Modern Sana.ai inspired layout for authenticated users
  if (user) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Desktop Sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-100">
            {/* Logo */}
            <div className="flex items-center px-6 py-6">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-medium text-gray-900">Rretoriq</span>
            </div>

            {/* Navigation */}
            <nav className="mt-8 px-4 flex-1">
              {/* Main Navigation */}
              <div className="mb-6">
                {authenticatedNavigation.map((item) => {
                  const Icon = item.icon
                  const isCurrentActive = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-3 py-2.5 mb-1 text-sm font-medium rounded-lg transition-all duration-150 ${
                        isCurrentActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mr-3 ${
                        isCurrentActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'
                      }`} />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Support Section */}
              <div className="border-t border-gray-100 pt-4">
                <div className="px-3 mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Support</span>
                </div>
                {supportNavigation.map((item) => {
                  const Icon = item.icon
                  const isCurrentActive = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-3 py-2.5 mb-1 text-sm font-medium rounded-lg transition-all duration-150 ${
                        isCurrentActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mr-3 ${
                        isCurrentActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'
                      }`} />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-100">
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium text-gray-900">{user.firstName}</p>
                    <p className="text-xs text-gray-500">Premium Member</p>
                  </div>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setUserMenuOpen(false)
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex min-h-0 flex-1 flex-col">
            {/* Mobile Logo with Close Button */}
            <div className="flex items-center justify-between px-6 py-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="ml-3 text-xl font-medium text-gray-900">Rretoriq</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="mt-4 px-4 flex-1">
              {/* Main Navigation */}
              <div className="mb-6">
                {authenticatedNavigation.map((item) => {
                  const Icon = item.icon
                  const isCurrentActive = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`group flex items-center px-3 py-2.5 mb-1 text-sm font-medium rounded-lg transition-all duration-150 ${
                        isCurrentActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mr-3 ${
                        isCurrentActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'
                      }`} />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Support Section */}
              <div className="border-t border-gray-100 pt-4">
                <div className="px-3 mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Support</span>
                </div>
                {supportNavigation.map((item) => {
                  const Icon = item.icon
                  const isCurrentActive = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`group flex items-center px-3 py-2.5 mb-1 text-sm font-medium rounded-lg transition-all duration-150 ${
                        isCurrentActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mr-3 ${
                        isCurrentActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'
                      }`} />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </nav>

            {/* Mobile User Profile */}
            <div className="p-4 border-t border-gray-100">
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium text-gray-900">{user.firstName}</p>
                    <p className="text-xs text-gray-500">Premium Member</p>
                  </div>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setUserMenuOpen(false)
                        setSidebarOpen(false)
                      }}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setUserMenuOpen(false)
                        setSidebarOpen(false)
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Top Bar */}
        <div className="lg:hidden">
          <div className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="ml-3 flex items-center">
                  <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
                    <Brain className="w-3 h-3 text-white" />
                  </div>
                  <span className="ml-2 text-lg font-medium text-gray-900">Rretoriq</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:ml-64 flex-1">
          <main className="min-h-screen pt-16 lg:pt-0 p-4 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    )
  }

  // Public layout for non-authenticated users
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Clean Professional Header */}
      <header className="fixed w-full top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Professional Logo and Brand */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-semibold text-gray-900">
                  Rretoriq
                </h1>
              </div>
              <div className="md:hidden">
                <h1 className="text-lg font-semibold text-gray-900">
                  Rretoriq
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              
              <div className="flex items-center space-x-4 ml-6 pl-6 border-l-2 border-violet-200/50">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-3 px-4 py-3 text-sm font-bold text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-pink-500 rounded-2xl transition-all duration-300 border-2 border-violet-200 hover:border-violet-400 shadow-lg hover:shadow-violet-500/25 transform hover:scale-105"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/25">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <span>Hey, {(user as any)?.displayName || (user as any)?.firstName || 'User'}! 👋</span>
                    </button>
                    
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-3 w-60 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-violet-500/20 border-2 border-violet-200/50 py-4 z-50">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 px-6 py-3 text-sm font-semibold text-gray-700 hover:text-violet-600 hover:bg-violet-100/50 transition-all duration-200"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Profile Settings</span>
                        </Link>
                        <button
                          onClick={() => {
                            logout()
                            setUserMenuOpen(false)
                          }}
                          className="flex items-center space-x-3 w-full px-6 py-3 text-sm font-semibold text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-rose-500 rounded-2xl transition-all duration-200 border-t-2 border-red-100 mt-2"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </nav>

            {/* Tablet Navigation */}
            <nav className="hidden md:flex lg:hidden items-center space-x-4">
              {navigation.slice(0, 2).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition-all ${
                    isActive(item.href)
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-emerald-600" />
                </div>
              ) : (
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-4 py-2 text-sm font-medium rounded-lg transition-all hover:scale-105"
                >
                  Sign Up
                </Link>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative p-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50 rounded-lg transition-all duration-200"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation Menu */}
          <div className={`md:hidden absolute top-full left-0 right-0 bg-gray-900/98 backdrop-blur-xl border-t border-gray-700/50 shadow-2xl transform transition-all duration-300 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
            <div className="px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 shadow-lg'
                        : 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                    {isActive(item.href) && (
                      <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                )
              })}
              
              <div className="pt-4 border-t border-gray-700 mt-4 space-y-3">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-sm font-semibold text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50 rounded-xl transition-all duration-200"
                    >
                      <Settings className="w-5 h-5" />
                      <span>Profile Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-sm font-semibold text-gray-300 hover:text-red-400 hover:bg-gray-800/50 rounded-xl transition-all duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center w-full border-2 border-gray-600 hover:border-emerald-400 hover:bg-gray-800/50 text-gray-300 hover:text-emerald-400 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-4 py-3 text-sm font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-200"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Clean Professional Footer */}
      <footer className="bg-white border-t border-gray-200 text-gray-600">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Rretoriq
                  </h3>
                  <p className="text-gray-500 text-sm">AI Communication Platform</p>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed max-w-md">
                Providing enterprise-grade AI communication training to institutions and professionals. Comprehensive mock interview preparation, professional communication skills, grammar excellence, and vocabulary enhancement for career success.
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">50K+</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">95%</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">4.9★</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">Rating</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="https://twitter.com/rretoriq" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/25">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/company/rretoriq" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-teal-500/25">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/rretoriq" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/25">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://facebook.com/rretoriq" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider">Features</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/interview" className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors text-sm group">
                    <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Mock Interviews</span>
                  </Link>
                </li>
                <li>
                  <Link to="/ielts" className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors text-sm group">
                    <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Communication Skills</span>
                  </Link>
                </li>
                <li>
                  <Link to="/progress" className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors text-sm group">
                    <BarChart3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Progress Tracking</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider">Support</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/help" className="text-gray-600 hover:text-emerald-600 transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-emerald-600 transition-colors">Contact Support</Link></li>
                <li><Link to="/about" className="text-gray-600 hover:text-emerald-600 transition-colors">About Us</Link></li>
                <li><Link to="/privacy" className="text-gray-600 hover:text-emerald-600 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-emerald-600 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Email</div>
                    <div className="text-sm text-gray-600">support@rretoriq.com</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Phone</div>
                    <div className="text-sm text-gray-600">+91 98765 43210</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Location</div>
                    <div className="text-sm text-gray-600">Mumbai, India</div>
                  </div>
                </li>
              </ul>
              
              {/* Newsletter */}
              <div className="mt-6">
                <NewsletterSubscription />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="text-gray-600 text-sm">
                  © 2025 Rretoriq. All rights reserved.
                </div>
                <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-600">
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span>🇮🇳 Made in India</span>
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>Trusted by 50,000+ professionals</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout