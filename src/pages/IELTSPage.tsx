import React, { useEffect, useRef } from 'react'
import { Target, Mic, Award, BookOpen, Users, CheckCircle, Play, ArrowRight, Sparkles, TrendingUp, Clock, Brain } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const IELTSPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaButtonsRef = useRef<HTMLDivElement>(null)
  const partsRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 100 })
      gsap.set(ctaButtonsRef.current?.children || [], { opacity: 0, y: 30 })

      const tl = gsap.timeline({ delay: 0.3 })
      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.6")
        .to(ctaButtonsRef.current?.children || [], { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" }, "-=0.4")

      // Scroll animations
      gsap.set(".part-card", { opacity: 0, y: 100 })
      gsap.to(".part-card", {
        opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: "power3.out",
        scrollTrigger: { trigger: partsRef.current, start: "top 80%", toggleActions: "play none none reverse" }
      })

      gsap.set(".feature-item", { opacity: 0, y: 50 })
      gsap.to(".feature-item", {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: featuresRef.current, start: "top 80%", toggleActions: "play none none reverse" }
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 rounded-full text-sm font-semibold mb-8 border border-emerald-500/30 backdrop-blur-sm">
            <Target className="w-4 h-4 mr-2" />
            AI-Powered IELTS Speaking Simulator
          </div>
          
          <h1 ref={titleRef} className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight">
            Master IELTS Speaking
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              with AI Examiner
            </span>
          </h1>
          
          <p ref={subtitleRef} className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Practice all three parts of IELTS Speaking test with our advanced AI examiner. Get instant band score predictions, 
            detailed feedback, and personalized improvement suggestions designed specifically for{' '}
            <span className="text-emerald-400 font-semibold">Indian test-takers</span>.
          </p>

          <div ref={ctaButtonsRef} className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25 flex items-center justify-center">
              <Brain className="w-6 h-6 mr-3" />
              Start Free IELTS Test
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-emerald-500/50 hover:border-emerald-400 hover:bg-emerald-500/10 backdrop-blur-sm text-emerald-400 hover:text-emerald-300 px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <Play className="w-6 h-6 mr-3" />
              Watch AI Demo
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">8.5+</div>
              <div className="text-sm text-gray-400">Average Band Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400 mb-2">50K+</div>
              <div className="text-sm text-gray-400">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
              <div className="text-sm text-gray-400">AI Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* IELTS Test Parts */}
      <section ref={partsRef} className="py-24 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-emerald-500/30 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Complete IELTS Experience</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-8 leading-tight">
              Three Parts, One{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Perfect Score
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Practice all three parts with authentic questions and get detailed AI feedback on every aspect of your performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Part 1 */}
            <div className="part-card group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 border border-emerald-500/20 hover:border-emerald-400/40 overflow-hidden backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 rounded-full blur-2xl"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Part 1: Introduction</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Answer questions about yourself, your family, work, studies, and interests. Perfect your fluency and natural responses.
                </p>
                <ul className="space-y-3 text-sm text-left">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                    Personal information questions
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                    Familiar topics practice
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                    4-5 minutes duration
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <button className="text-emerald-400 font-bold group-hover:translate-x-2 transition-transform flex items-center">
                    Practice Part 1 <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>

            {/* Part 2 */}
            <div className="part-card group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 border border-orange-500/20 hover:border-orange-400/40 overflow-hidden backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 transform md:scale-110 md:z-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-pink-500/10 rounded-full blur-2xl"></div>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-pink-400 text-white px-4 py-1 rounded-full text-xs font-bold">
                MOST CHALLENGING
              </div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Mic className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Part 2: Cue Card</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Speak for 1-2 minutes on a given topic. Master organizing ideas and speaking continuously with confidence.
                </p>
                <ul className="space-y-3 text-sm text-left">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 text-orange-400 mr-3 flex-shrink-0" />
                    Topic card with prompts
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 text-orange-400 mr-3 flex-shrink-0" />
                    1 minute preparation time
                  </li>
                  <li className="flex items-center text-gray-300">
                    <TrendingUp className="w-4 h-4 text-orange-400 mr-3 flex-shrink-0" />
                    2 minute speaking time
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <button className="text-orange-400 font-bold group-hover:translate-x-2 transition-transform flex items-center">
                    Practice Part 2 <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>

            {/* Part 3 */}
            <div className="part-card group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 border border-purple-500/20 hover:border-purple-400/40 overflow-hidden backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-indigo-500/10 rounded-full blur-2xl"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Part 3: Discussion</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Engage in detailed discussion about abstract ideas. Practice advanced vocabulary and complex grammar structures.
                </p>
                <ul className="space-y-3 text-sm text-left">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                    Abstract topic discussion
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                    Opinion and analysis
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                    4-5 minutes duration
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <button className="text-purple-400 font-bold group-hover:translate-x-2 transition-transform flex items-center">
                    Practice Part 3 <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features for IELTS */}
      <section ref={featuresRef} className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-emerald-500/30 backdrop-blur-sm">
              <Brain className="w-4 h-4" />
              <span>Advanced AI Analysis</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-8 leading-tight">
              Four Criteria,{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Perfect Feedback
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Get detailed, instant feedback on all four IELTS Speaking assessment criteria with personalized improvement strategies designed for Indian learners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-item text-center group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Mic className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Fluency & Coherence</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                AI analyzes speech rate, pauses, linking words, and overall flow. Get specific tips to improve your natural speaking rhythm.
              </p>
              <div className="mt-4 flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-xs text-emerald-400 font-medium">Real-time Analysis</span>
              </div>
            </div>

            <div className="feature-item text-center group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Lexical Resource</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Vocabulary range, accuracy, and appropriateness evaluation. Discover advanced words to boost your band score.
              </p>
              <div className="mt-4 flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-xs text-teal-400 font-medium">Vocabulary Enhancement</span>
              </div>
            </div>

            <div className="feature-item text-center group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Target className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Grammar Range</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Assessment of grammatical structures, accuracy, and complexity. Fix common Indian grammar patterns.
              </p>
              <div className="mt-4 flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-xs text-orange-400 font-medium">Grammar Perfection</span>
              </div>
            </div>

            <div className="feature-item text-center group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Pronunciation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Clarity, stress patterns, intonation analysis. Specialized feedback for Indian accent improvement.
              </p>
              <div className="mt-4 flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-xs text-purple-400 font-medium">Accent Training</span>
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-3xl p-8 border border-emerald-500/20 backdrop-blur-sm max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-8">Proven Results for Indian Students</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                    2.5+
                  </div>
                  <div className="text-gray-400">Average Band Improvement</div>
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    92%
                  </div>
                  <div className="text-gray-400">Students Achieve Target Score</div>
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                    30 Days
                  </div>
                  <div className="text-gray-400">Average Time to Improvement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indian-Specific IELTS Tips */}
      <section className="py-24 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-400 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-orange-500/30 backdrop-blur-sm">
                <span>🇮🇳</span>
                <span>Made for Indians</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight">
                Designed for{' '}
                <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Indian Test-Takers
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Our AI understands the unique challenges faced by Indian IELTS candidates and provides targeted feedback to help you improve faster than ever before.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">Indian Accent Analysis</h4>
                    <p className="text-gray-400 leading-relaxed">Specific feedback on pronunciation patterns common among Indian speakers, helping you sound more natural and confident.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">Cultural Context Training</h4>
                    <p className="text-gray-400 leading-relaxed">Practice with topics and examples relevant to Indian culture, festivals, traditions, and contemporary experiences.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">Mother Tongue Influence Detection</h4>
                    <p className="text-gray-400 leading-relaxed">Identify and correct grammar patterns influenced by Hindi, Bengali, Tamil, and other regional languages.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 border border-emerald-500/20 backdrop-blur-sm shadow-2xl">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3">
                    Band 8.5
                  </div>
                  <div className="text-gray-400 text-lg">Average score achieved by our Indian students</div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">Fluency & Coherence</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-1000" style={{ width: '90%' }}></div>
                      </div>
                      <span className="text-lg font-bold text-emerald-400 min-w-[2rem]">9.0</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">Lexical Resource</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-lg font-bold text-teal-400 min-w-[2rem]">8.5</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">Grammar Range</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-500 to-pink-500 h-3 rounded-full transition-all duration-1000" style={{ width: '80%' }}></div>
                      </div>
                      <span className="text-lg font-bold text-orange-400 min-w-[2rem]">8.0</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">Pronunciation</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-1000" style={{ width: '87%' }}></div>
                      </div>
                      <span className="text-lg font-bold text-purple-400 min-w-[2rem]">8.7</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="flex items-center justify-center space-x-2 text-gray-400">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Based on 10,000+ Indian students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-teal-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-pink-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500/20 to-orange-500/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-white/20">
            <Sparkles className="w-4 h-4" />
            <span>Join 50,000+ Successful Students</span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Achieve Your
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Target IELTS Band?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join thousands of Indian students who have achieved their IELTS goals with our AI-powered practice platform. 
            Start your journey to Band 8+ today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25 flex items-center justify-center">
              <Brain className="w-6 h-6 mr-3" />
              Start Free IELTS Practice
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-orange-500/50 hover:border-orange-400 hover:bg-orange-500/10 backdrop-blur-sm text-orange-400 hover:text-orange-300 px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105">
              View Success Stories
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="font-medium">No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="font-medium">Instant AI Feedback</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="font-medium">Band Score Prediction</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default IELTSPage