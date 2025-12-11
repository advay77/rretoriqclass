import React, { useState } from 'react'
import { CheckCircle, Loader } from 'lucide-react'

const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    
    // Simulate API call - replace with actual newsletter service
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For now, just show success message
      setStatus('success')
      setMessage('Successfully subscribed! Check your email for confirmation.')
      setEmail('')
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
      
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    }
  }

  if (status === 'success') {
    return (
      <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
        <div className="flex items-center space-x-2 text-emerald-400">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Subscribed Successfully!</span>
        </div>
        <p className="text-xs text-emerald-300 mt-1">Welcome to our newsletter!</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
      <h5 className="text-sm font-semibold text-white mb-2">Stay Updated</h5>
      <p className="text-xs text-gray-300 mb-4">Get the latest tips and updates</p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            disabled={status === 'loading'}
            className="flex-1 px-3 py-2.5 bg-gray-700 text-white placeholder-gray-400 rounded-lg text-sm border border-gray-600 focus:border-emerald-500 focus:outline-none transition-colors min-w-0 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button 
            type="submit"
            disabled={status === 'loading' || !email}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-lg text-sm font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 whitespace-nowrap disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {status === 'loading' ? (
              <>
                <Loader className="w-4 h-4 animate-spin inline mr-1" />
                Subscribing...
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
        
        {message && (
          <p className={`text-xs ${status === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}

export default NewsletterSubscription