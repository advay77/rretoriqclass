import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Users, Briefcase, CheckCircle } from 'lucide-react'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-500"></div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          {/* Brand Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full border border-blue-200 mb-8 shadow-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold tracking-wide">AI-POWERED • MADE FOR INDIA</span>
          </div>

          {/* Main Brand Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="text-neutral-900">Transform Your</span>
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mt-2">
              Communication Excellence
            </span>
          </h1>

          {/* Brand Slogan */}
          <div className="mb-8">
            <p className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-2">
              रेतोरिक़ • Rretoriq
            </p>
            <p className="text-lg sm:text-xl text-blue-700 font-semibold italic">
              "Where Words Meet Wisdom, Skills Meet Success"
            </p>
          </div>

          {/* Value Proposition */}
          <p className="text-xl sm:text-2xl text-neutral-700 mb-16 max-w-4xl mx-auto leading-relaxed font-medium">
            Unlock your potential with India's most advanced AI communication coach. 
            <span className="text-blue-600 font-semibold"> Master IELTS, ace interviews, and excel in business English</span> with 
            personalized feedback designed for Indian professionals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link
              to="/ielts"
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 inline-flex items-center justify-center shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              Start Your Journey
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/glimpse"
              className="group bg-white border-2 border-neutral-300 hover:border-blue-400 hover:bg-blue-50 text-neutral-900 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Explore AI Features
            </Link>
          </div>
          
          {/* Enhanced Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-neutral-200/50 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">Free to Start</h3>
              <p className="text-sm text-neutral-600 text-center">Begin your journey with our comprehensive free tier</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-neutral-200/50 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-lg">🇮🇳</span>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">Made for India</h3>
              <p className="text-sm text-neutral-600 text-center">Hindi & English support with Indian context</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-neutral-200/50 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-sm">50K+</span>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">Trusted Users</h3>
              <p className="text-sm text-neutral-600 text-center">Join thousands of successful professionals</p>
            </div>
          </div>

          {/* Brand Promise */}
          <div className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl text-white shadow-2xl">
            <p className="text-xl sm:text-2xl font-bold mb-4">
              🚀 Your Success Story Starts Here
            </p>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Join the revolution of AI-powered communication training. Whether you're preparing for IELTS, 
              mastering job interviews, or elevating your business English - Rretoriq is your partner in excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Practice with AI-powered feedback designed for Indian English speakers and career goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* IELTS Practice */}
            <Link to="/ielts" className="bg-white rounded-lg p-8 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">IELTS Preparation</h3>
              <p className="text-neutral-600 mb-4">
                Practice all four skills with AI feedback. Designed for Indian test-takers with local context and examples.
              </p>
              <div className="text-blue-600 font-medium text-sm flex items-center">
                Start practicing <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* Interview Practice */}
            <Link to="/interview" className="bg-white rounded-lg p-8 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Job Interview Prep</h3>
              <p className="text-neutral-600 mb-4">
                Practice with questions from top Indian companies. Get feedback on your confidence and communication style.
              </p>
              <div className="text-green-600 font-medium text-sm flex items-center">
                Start practicing <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* Business English */}
            <Link to="/business" className="bg-white rounded-lg p-8 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Business English</h3>
              <p className="text-neutral-600 mb-4">
                Master professional communication for Indian corporate culture and international business.
              </p>
              <div className="text-purple-600 font-medium text-sm flex items-center">
                Coming soon <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-12">
            Trusted across India
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-sm text-neutral-600">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-sm text-neutral-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">500K+</div>
              <div className="text-sm text-neutral-600">Practice Sessions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-sm text-neutral-600">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to improve your communication?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of Indians who have already improved their English skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ielts"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              Start Free Practice
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to="/about"
              className="border border-blue-400 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home