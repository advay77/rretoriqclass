import React, { useEffect, useRef } from 'react'
import { Users, Building2, Code, Briefcase, CheckCircle, Play, ArrowRight, Target, Award, Sparkles, Brain } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const JobInterviewPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const companiesRef = useRef<HTMLDivElement>(null)
  const roundsRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero section animations
    const heroTimeline = gsap.timeline()
    heroTimeline.fromTo('.hero-badge', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo('.hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo('.hero-description',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    )
    .fromTo('.hero-buttons',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo('.hero-stats',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.2'
    )

    // Scroll-triggered animations
    gsap.fromTo('.company-card',
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: companiesRef.current,
          start: 'top 80%',
        }
      }
    )

    gsap.fromTo('.round-card',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: roundsRef.current,
          start: 'top 75%',
        }
      }
    )

    gsap.fromTo('.feature-item',
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32" ref={heroRef}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="hero-badge inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur-sm text-orange-400 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-orange-500/30">
            <Briefcase className="w-4 h-4" />
            <span>AI-Powered Mock Interviews</span>
          </div>
          
          <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Master Job Interviews
            <span className="block bg-gradient-to-r from-orange-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              for Indian Companies
            </span>
          </h1>
          
          <p className="hero-description text-xl sm:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
            Practice with real interview questions from top Indian companies including TCS, Infosys, Wipro, Flipkart, and startups. 
            Get AI-powered feedback on your answers, confidence level, and communication skills.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button className="group bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 flex items-center justify-center">
              <Brain className="w-6 h-6 mr-3" />
              Start Mock Interview
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-orange-500/50 hover:border-orange-400 hover:bg-orange-500/10 backdrop-blur-sm text-orange-400 hover:text-orange-300 px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <Play className="w-6 h-6 mr-3" />
              Watch Demo
            </button>
          </div>

          <div className="hero-stats grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/20">
              <div className="text-3xl font-bold text-orange-400 mb-2">50,000+</div>
              <div className="text-gray-400">Mock Interviews Conducted</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/20">
              <div className="text-3xl font-bold text-pink-400 mb-2">85%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <div className="text-3xl font-bold text-purple-400 mb-2">200+</div>
              <div className="text-gray-400">Partner Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Categories */}
      <section className="py-24 bg-gradient-to-br from-gray-800 via-gray-900 to-black" ref={companiesRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-400 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-orange-500/30 backdrop-blur-sm">
              <Building2 className="w-4 h-4" />
              <span>200+ Partner Companies</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight">
              Practice with Real{' '}
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Company Questions
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Choose your industry and practice with authentic interview questions from leading Indian companies. 
              Each category includes role-specific scenarios and company culture insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* IT Services */}
            <div className="company-card group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-gradient-to-br hover:from-emerald-500/10 hover:to-teal-500/10 transition-all duration-500 cursor-pointer border border-gray-700/50 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transform hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Code className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">IT Services</h3>
              <p className="text-gray-400 text-sm mb-6 font-medium">
                TCS, Infosys, Wipro, HCL, Tech Mahindra
              </p>
              <ul className="space-y-2 text-sm text-gray-300 text-left">
                <li className="flex items-center"><span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>Technical round questions</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>System design discussions</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>Client interaction scenarios</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>Project management queries</li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <span className="text-emerald-400 font-semibold text-sm">1,200+ Questions Available</span>
              </div>
            </div>

            {/* Startups & Product */}
            <div className="company-card group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-gradient-to-br hover:from-orange-500/10 hover:to-pink-500/10 transition-all duration-500 cursor-pointer border border-gray-700/50 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transform hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Startups & Product</h3>
              <p className="text-gray-400 text-sm mb-6 font-medium">
                Flipkart, Paytm, Zomato, Byju's, Ola
              </p>
              <ul className="space-y-2 text-sm text-gray-300 text-left">
                <li className="flex items-center"><span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>Product thinking questions</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>Problem-solving scenarios</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>Growth strategy discussions</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>Innovation challenges</li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <span className="text-orange-400 font-semibold text-sm">800+ Questions Available</span>
              </div>
            </div>

            {/* Banking & Finance */}
            <div className="company-card group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-indigo-500/10 transition-all duration-500 cursor-pointer border border-gray-700/50 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Banking & Finance</h3>
              <p className="text-gray-400 text-sm mb-6 font-medium">
                HDFC, ICICI, SBI, Axis Bank, Kotak
              </p>
              <ul className="space-y-2 text-sm text-gray-300 text-left">
                <li className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>Risk assessment scenarios</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>Customer service situations</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>Regulatory compliance</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>Financial analysis questions</li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <span className="text-purple-400 font-semibold text-sm">600+ Questions Available</span>
              </div>
            </div>

            {/* Government & PSU */}
            <div className="company-card group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-gradient-to-br hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-500 cursor-pointer border border-gray-700/50 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transform hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Government & PSU</h3>
              <p className="text-gray-400 text-sm mb-6 font-medium">
                Railways, ISRO, DRDO, BHEL, NTPC
              </p>
              <ul className="space-y-2 text-sm text-gray-300 text-left">
                <li className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>Public policy discussions</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>Ethical dilemma scenarios</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>Leadership challenges</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>Social responsibility questions</li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <span className="text-cyan-400 font-semibold text-sm">400+ Questions Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interview Round Types */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800" ref={roundsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-400 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-purple-500/30 backdrop-blur-sm">
              <Target className="w-4 h-4" />
              <span>3 Interview Rounds</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight">
              Practice All{' '}
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Interview Rounds
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From technical rounds to HR discussions, master every type of interview you'll face. 
              Each round comes with tailored questions and expert guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Technical Round */}
            <div className="round-card group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 hover:bg-gradient-to-br hover:from-emerald-500/10 hover:to-teal-500/10 transition-all duration-500 border border-gray-700/50 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transform hover:scale-105">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Technical Round</h3>
                  <p className="text-emerald-400 font-semibold">30-60 minutes</p>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Programming language questions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">System design discussions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Problem-solving approach</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Project deep-dive questions</span>
                </li>
              </ul>
              
              <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white w-full py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
                Practice Technical Round
              </button>
              
              <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                <span className="text-emerald-400 font-semibold text-sm">500+ Technical Questions</span>
              </div>
            </div>

            {/* HR Round */}
            <div className="round-card group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 hover:bg-gradient-to-br hover:from-orange-500/10 hover:to-pink-500/10 transition-all duration-500 border-2 border-orange-500/50 hover:border-orange-400/70 hover:shadow-2xl hover:shadow-orange-500/20 transform hover:scale-105">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">HR Round</h3>
                  <p className="text-orange-400 font-semibold">20-30 minutes</p>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Tell me about yourself</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Strengths and weaknesses</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Career goals and motivation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Behavioral questions (STAR method)</span>
                </li>
              </ul>
              
              <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white w-full py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25">
                Practice HR Round
              </button>
              
              <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                <div className="inline-flex items-center space-x-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Most Popular</span>
                </div>
              </div>
            </div>

            {/* Managerial Round */}
            <div className="round-card group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-indigo-500/10 transition-all duration-500 border border-gray-700/50 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:scale-105">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Managerial Round</h3>
                  <p className="text-purple-400 font-semibold">45-90 minutes</p>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Leadership scenarios</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Team management questions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Strategic thinking</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Conflict resolution</span>
                </li>
              </ul>
              
              <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white w-full py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                Practice Managerial Round
              </button>
              
              <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                <span className="text-purple-400 font-semibold text-sm">300+ Leadership Questions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Analysis Features */}
      <section className="py-24 bg-gradient-to-br from-gray-800 via-gray-900 to-black" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-cyan-500/30 backdrop-blur-sm">
                <Brain className="w-4 h-4" />
                <span>AI-Powered Analysis</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight">
                Advanced{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Interview Analysis
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Get detailed feedback on your interview performance with insights tailored for Indian job market expectations. 
                Our AI analyzes every aspect of your response in real-time.
              </p>
              
              <div className="space-y-8">
                <div className="feature-item flex items-start space-x-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">Answer Quality Assessment</h4>
                    <p className="text-gray-400 leading-relaxed">Analyze content relevance, structure, and depth of your responses with industry-specific scoring criteria.</p>
                  </div>
                </div>
                
                <div className="feature-item flex items-start space-x-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">Confidence Level Detection</h4>
                    <p className="text-gray-400 leading-relaxed">Monitor vocal confidence, pace, and hesitation patterns in your speech using advanced voice analysis.</p>
                  </div>
                </div>
                
                <div className="feature-item flex items-start space-x-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">Communication Skills Evaluation</h4>
                    <p className="text-gray-400 leading-relaxed">Assess clarity, professional language use, and Indian business communication style preferences.</p>
                  </div>
                </div>
                
                <div className="feature-item flex items-start space-x-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">Industry-Specific Feedback</h4>
                    <p className="text-gray-400 leading-relaxed">Get insights based on specific industry expectations, company culture, and role requirements.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 border border-cyan-500/20 backdrop-blur-sm shadow-2xl">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
                    Interview Score: 92%
                  </div>
                  <div className="text-gray-400 text-lg">Excellent - Ready for final rounds</div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">Answer Quality</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-1000" style={{ width: '95%' }}></div>
                      </div>
                      <span className="text-lg font-bold text-emerald-400 min-w-[4rem]">Excellent</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">Confidence Level</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-500 to-pink-500 h-3 rounded-full transition-all duration-1000" style={{ width: '88%' }}></div>
                      </div>
                      <span className="text-lg font-bold text-orange-400 min-w-[4rem]">High</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">Communication</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-1000" style={{ width: '90%' }}></div>
                      </div>
                      <span className="text-lg font-bold text-purple-400 min-w-[4rem]">Very Good</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">Technical Depth</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-lg font-bold text-cyan-400 min-w-[4rem]">Good</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700">
                  <h5 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-orange-400" />
                    Key Improvements
                  </h5>
                  <ul className="text-sm text-gray-300 space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      Add more specific examples from your recent project experience
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      Reduce filler words like "um" and "actually" for clearer communication
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      Show more enthusiasm when discussing the company's mission and values
                    </li>
                  </ul>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="flex items-center justify-center space-x-2 text-gray-400">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Analysis completed in 2.3 seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-emerald-500/30 backdrop-blur-sm">
              <Award className="w-4 h-4" />
              <span>10,000+ Success Stories</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight">
              Real{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Real success stories from professionals who landed their dream jobs after practicing with our AI-powered platform. 
              Join the thousands who've transformed their careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 shadow-lg">
                  AK
                </div>
                <div>
                  <div className="text-lg font-bold text-white">Amit Kumar</div>
                  <div className="text-emerald-400 font-medium">Software Engineer at TCS</div>
                  <div className="text-xs text-gray-400 mt-1">Bangalore, India</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "Practiced 50+ technical interviews and improved my confidence significantly. The AI feedback was incredibly detailed. Got selected in TCS with 40% salary hike!"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="text-emerald-400 font-bold text-sm">Success Rate: 95%</div>
                <div className="flex items-center space-x-1">
                  {[1,2,3,4,5].map(star => (
                    <div key={star} className="w-4 h-4 bg-emerald-400 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 shadow-lg">
                  PS
                </div>
                <div>
                  <div className="text-lg font-bold text-white">Priya Sharma</div>
                  <div className="text-orange-400 font-medium">Product Manager at Flipkart</div>
                  <div className="text-xs text-gray-400 mt-1">Mumbai, India</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "The behavioral question practice was amazing. Learned to structure answers using STAR method and cracked Flipkart PM role. Best investment in my career!"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="text-orange-400 font-bold text-sm">Prep Time: 3 weeks</div>
                <div className="flex items-center space-x-1">
                  {[1,2,3,4,5].map(star => (
                    <div key={star} className="w-4 h-4 bg-orange-400 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 shadow-lg">
                  RG
                </div>
                <div>
                  <div className="text-lg font-bold text-white">Rahul Gupta</div>
                  <div className="text-purple-400 font-medium">Data Scientist at Paytm</div>
                  <div className="text-xs text-gray-400 mt-1">Delhi, India</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "AI feedback helped me identify my weak areas. Practiced system design questions extensively and landed my dream Data Science role!"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="text-purple-400 font-bold text-sm">Salary Increase: 60%</div>
                <div className="flex items-center space-x-1">
                  {[1,2,3,4,5].map(star => (
                    <div key={star} className="w-4 h-4 bg-purple-400 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <button className="group bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-xl font-semibold border border-gray-600 hover:border-gray-500 transition-all duration-300">
              View More Success Stories
              <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-indigo-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-white/20">
            <Sparkles className="w-4 h-4" />
            <span>Join 50,000+ Successful Professionals</span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Ace Your
            <span className="block bg-gradient-to-r from-orange-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Next Interview?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join thousands of professionals who have landed their dream jobs with our AI-powered interview practice platform. 
            Start practicing today and transform your career tomorrow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button className="group bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 flex items-center justify-center">
              <Briefcase className="w-6 h-6 mr-3" />
              Start Free Mock Interview
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-orange-500/50 hover:border-orange-400 hover:bg-orange-500/10 backdrop-blur-sm text-orange-400 hover:text-orange-300 px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105">
              View Sample Questions
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-orange-400" />
              <span className="font-medium">No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-orange-400" />
              <span className="font-medium">Instant AI Feedback</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-orange-400" />
              <span className="font-medium">Real Company Questions</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default JobInterviewPage