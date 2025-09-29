import React, { useEffect, useRef } from 'react'
import { Eye, Sparkles, Video, Camera, ArrowRight, Brain, Zap, Target } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GlimpsePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero section animations
    const heroTimeline = gsap.timeline()
    heroTimeline.fromTo('.hero-icon', 
      { opacity: 0, scale: 0.5, rotateY: 180 },
      { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: 'back.out(1.7)' }
    )
    .fromTo('.hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '-=0.6'
    )
    .fromTo('.hero-description',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo('.feature-preview',
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('.coming-soon-badge',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.2'
    )
    .fromTo('.notification-form',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.2'
    )

    // Floating animations for decorative elements
    gsap.to('.floating-sparkle-1', {
      y: -20,
      x: 10,
      rotation: 360,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    })

    gsap.to('.floating-sparkle-2', {
      y: 15,
      x: -15,
      rotation: -360,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen py-24 px-4" ref={heroRef}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon and Animation */}
          <div className="mb-12">
            <div className="relative inline-flex items-center justify-center">
              <div className="hero-icon w-32 h-32 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/25">
                <Eye className="w-16 h-16 text-white" />
              </div>
              <div className="floating-sparkle-1 absolute -top-4 -right-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="floating-sparkle-2 absolute -bottom-4 -left-4">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                  <Video className="w-5 h-5 text-white" />
                </div>
              </div>
              
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-3xl border-2 border-cyan-400/30 animate-ping"></div>
              <div className="absolute inset-0 rounded-3xl border border-purple-400/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="hero-title text-6xl sm:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Glimpse
            </span>
            <span className="block text-4xl sm:text-5xl text-white mt-4">
              The Future of Communication AI
            </span>
          </h1>

          {/* Description */}
          <p className="hero-description text-xl sm:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Get a revolutionary sneak peek into your communication skills with advanced AI-powered video analysis, 
            real-time feedback, and personalized insights that will transform how you connect and communicate.
          </p>

          {/* Features Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
            <div className="feature-preview group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Advanced Video Analysis</h3>
              <p className="text-gray-400 leading-relaxed">
                AI-powered analysis of body language, facial expressions, and micro-expressions for comprehensive communication insights
              </p>
              <div className="mt-6 text-cyan-400 font-semibold text-sm">
                98% Accuracy Rate
              </div>
            </div>

            <div className="feature-preview group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Lightning-Fast Feedback</h3>
              <p className="text-gray-400 leading-relaxed">
                Instant, real-time insights on your communication style, confidence levels, and emotional intelligence
              </p>
              <div className="mt-6 text-purple-400 font-semibold text-sm">
                &lt; 0.5s Response Time
              </div>
            </div>

            <div className="feature-preview group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Smart Insights</h3>
              <p className="text-gray-400 leading-relaxed">
                Personalized AI recommendations and improvement strategies tailored to your unique communication patterns
              </p>
              <div className="mt-6 text-emerald-400 font-semibold text-sm">
                50+ Insight Categories
              </div>
            </div>
          </div>

          {/* Coming Soon Badge */}
          <div className="coming-soon-badge inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm text-white px-8 py-4 rounded-full border border-cyan-500/30 mb-12 shadow-lg">
            <div className="relative">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <div className="absolute inset-0 animate-ping">
                <Sparkles className="w-6 h-6 text-cyan-400/50" />
              </div>
            </div>
            <span className="text-lg font-bold">Launching Q2 2025</span>
            <Target className="w-6 h-6 text-purple-400" />
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <div className="text-3xl font-bold text-cyan-400 mb-2">100K+</div>
              <div className="text-gray-400">Early Access Signups</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <div className="text-3xl font-bold text-purple-400 mb-2">15+</div>
              <div className="text-gray-400">AI Models Trained</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
              <div className="text-3xl font-bold text-emerald-400 mb-2">99.2%</div>
              <div className="text-gray-400">Beta User Satisfaction</div>
            </div>
          </div>

          {/* Notification Signup */}
          <div className="notification-form max-w-2xl mx-auto p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 shadow-2xl">
            <h4 className="text-2xl font-bold text-white mb-4">Be the First to Experience the Future</h4>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Join our exclusive early access program and be among the first to experience revolutionary AI-powered communication insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
              />
              <button className="group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center">
                Get Early Access
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>Exclusive Beta Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>No Spam, Ever</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>

          {/* Additional CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">
              Want to learn more about our current AI communication tools?
            </p>
            <button className="group border-2 border-gray-600 hover:border-gray-500 hover:bg-gray-700/20 backdrop-blur-sm text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
              Explore Rretoriq Platform
              <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlimpsePage