import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, Sparkles, Brain, Shield } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  })
  
  const formRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Entrance animations
    const tl = gsap.timeline()
    tl.fromTo('.signup-header',
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    )
    .fromTo('.signup-form',
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.6'
    )
    .fromTo('.signup-footer',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )

    // Floating background elements animation
    gsap.to('.floating-orb-1', {
      y: -30,
      x: 20,
      rotation: 360,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    })

    gsap.to('.floating-orb-2', {
      y: 25,
      x: -15,
      rotation: -360,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign up logic here
    console.log('Sign up:', formData)
  }

  const passwordsMatch = formData.password === formData.confirmPassword
  const isFormValid = formData.firstName && formData.lastName && formData.email && 
                     formData.password && passwordsMatch && formData.agreeToTerms

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb-1 absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
        <div className="floating-orb-2 absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        {/* Header */}
        <div className="signup-header text-center" ref={headerRef}>
          <div className="relative mx-auto w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/25">
            <User className="w-10 h-10 text-white" />
            <div className="absolute -top-2 -right-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400/30 animate-pulse"></div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Create Your{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Account
            </span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Join Rretoriq and unlock the power of AI-driven communication mastery
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="signup-form bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 shadow-2xl" ref={formRef}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-300 mb-3">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 backdrop-blur-sm"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-300 mb-3">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-3">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 backdrop-blur-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-3">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-14 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300 mb-3">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`block w-full pl-12 pr-14 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm ${
                    formData.confirmPassword && !passwordsMatch
                      ? 'border-red-500 focus:ring-red-500/50 focus:border-red-400'
                      : 'border-gray-600 focus:ring-emerald-500/50 focus:border-emerald-500'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && !passwordsMatch && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-gradient-to-r from-gray-800/30 to-gray-700/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
              <p className="text-sm font-semibold text-gray-300 mb-4 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-emerald-400" />
                Password requirements:
              </p>
              <div className="space-y-3">
                <div className={`flex items-center text-sm ${formData.password.length >= 8 ? 'text-emerald-400' : 'text-gray-400'}`}>
                  <CheckCircle className={`w-4 h-4 mr-3 ${formData.password.length >= 8 ? 'text-emerald-400' : 'text-gray-500'}`} />
                  At least 8 characters
                </div>
                <div className={`flex items-center text-sm ${/[A-Z]/.test(formData.password) ? 'text-emerald-400' : 'text-gray-400'}`}>
                  <CheckCircle className={`w-4 h-4 mr-3 ${/[A-Z]/.test(formData.password) ? 'text-emerald-400' : 'text-gray-500'}`} />
                  One uppercase letter
                </div>
                <div className={`flex items-center text-sm ${/[0-9]/.test(formData.password) ? 'text-emerald-400' : 'text-gray-400'}`}>
                  <CheckCircle className={`w-4 h-4 mr-3 ${/[0-9]/.test(formData.password) ? 'text-emerald-400' : 'text-gray-500'}`} />
                  One number
                </div>
              </div>
            </div>

            {/* Terms and Newsletter */}
            <div className="space-y-6">
              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-emerald-500 focus:ring-emerald-500/20 bg-gray-700 border-gray-600 rounded mt-0.5 transition-colors"
                />
                <label htmlFor="agreeToTerms" className="ml-4 text-sm text-gray-300 leading-relaxed">
                  I agree to the{' '}
                  <Link to="/terms" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  id="subscribeNewsletter"
                  name="subscribeNewsletter"
                  type="checkbox"
                  checked={formData.subscribeNewsletter}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-orange-500 focus:ring-orange-500/20 bg-gray-700 border-gray-600 rounded mt-0.5 transition-colors"
                />
                <label htmlFor="subscribeNewsletter" className="ml-4 text-sm text-gray-300 leading-relaxed">
                  Send me AI communication tips, platform updates, and exclusive offers
                </label>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 ${
                isFormValid
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg hover:shadow-emerald-500/25'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Brain className="w-5 h-5 mr-2" />
              Create Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </form>

          {/* Social Sign Up */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 text-gray-400 font-medium">Or continue with</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button className="group w-full inline-flex justify-center py-4 px-6 border border-gray-600 rounded-xl bg-gray-700/30 backdrop-blur-sm text-sm font-semibold text-gray-300 hover:bg-gray-600/30 hover:border-gray-500 transition-all duration-300 transform hover:scale-105">
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="ml-3">Google</span>
              </button>

              <button className="group w-full inline-flex justify-center py-4 px-6 border border-gray-600 rounded-xl bg-gray-700/30 backdrop-blur-sm text-sm font-semibold text-gray-300 hover:bg-gray-600/30 hover:border-gray-500 transition-all duration-300 transform hover:scale-105">
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-3">Facebook</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sign In Link */}
        <div className="signup-footer text-center">
          <div className="bg-gradient-to-r from-gray-800/30 to-gray-700/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
            <p className="text-gray-300">
              Already have an account?{' '}
              <Link to="/signin" className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
                Sign in here
              </Link>
            </p>
            <div className="mt-4 flex items-center justify-center space-x-6 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>No Spam</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Free Forever</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage