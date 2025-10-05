import { useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Demo from './pages/Demo'
import Business from './pages/Business'
import Schools from './pages/Schools'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/Dashboardnew'
import IELTSPractice from './pages/ielts/IELTSPractice'

import Profile from './pages/profile/Profile'
import Progress from './pages/progress/Progress'
import Pricing from './pages/pricing/Pricing'
import ComingSoonPage from './components/ComingSoonPage'
import AIInterviewPage from './pages/ai-interview/AIInterviewPage.tsx'
import ProfileCompletionWizard from './components/ProfileCompletionWizard'
import { SessionResults } from './components/SessionResults'
import { AIInterviewErrorBoundary } from './components/ErrorBoundary'
import { initializeAuth } from './store/authStore'
import FAQ from './pages/FAQ'
import AboutUs from './pages/AboutUs'
import Help from './pages/Help'
import PlanUpgrade from './pages/PlanUpgrade'
import { MessageCircle, Shield, FileText } from 'lucide-react'

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  useEffect(() => {
    console.log('🚀 App component mounting...')
    try {
      // Initialize authentication state
      const unsubscribe = initializeAuth()
      console.log('✅ Auth initialized successfully')
      return unsubscribe
    } catch (error) {
      console.error('❌ Error initializing auth:', error)
    }
  }, [])

  console.log('📱 Rendering App component...')

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <ScrollToTop />
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/business" element={<Business />} />
          <Route path="/schools" element={<Schools />} />
          
          {/* Auth Routes (redirect to dashboard if already authenticated) */}
          <Route path="/login" element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          } />
          <Route path="/register" element={
            <ProtectedRoute requireAuth={false}>
              <Register />
            </ProtectedRoute>
          } />
          
          {/* Profile Completion (required for new users) */}
          <Route path="/complete-profile" element={
            <ProtectedRoute requireAuth={true} requireProfileCompletion={false}>
              <ProfileCompletionWizard />
            </ProtectedRoute>
          } />
          
          {/* Protected Routes (require authentication and profile completion) */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/ielts" element={
            <ProtectedRoute>
              <IELTSPractice />
            </ProtectedRoute>
          } />
          <Route path="/interview" element={
            <ProtectedRoute>
              <AIInterviewErrorBoundary>
                <AIInterviewPage />
              </AIInterviewErrorBoundary>
            </ProtectedRoute>
          } />
          {/* AI Interview Routes */}
          <Route path="/ai-interview/:type" element={
            <ProtectedRoute>
              <AIInterviewErrorBoundary>
                <AIInterviewPage />
              </AIInterviewErrorBoundary>
            </ProtectedRoute>
          } />
          <Route path="/session-results/:sessionId" element={
            <ProtectedRoute>
              <SessionResults />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/progress" element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          } />
          
          {/* Pricing (public but enhanced for authenticated users) */}
          <Route path="/pricing" element={<Pricing />} />
          
          {/* Plan Upgrade (protected route) */}
          <Route path="/plans" element={
            <ProtectedRoute>
              <PlanUpgrade />
            </ProtectedRoute>
          } />
          
          {/* Support Pages (protected routes for authenticated users) */}
          <Route path="/faq" element={
            <ProtectedRoute>
              <FAQ />
            </ProtectedRoute>
          } />
          <Route path="/help" element={
            <ProtectedRoute>
              <Help />
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <AboutUs />
            </ProtectedRoute>
          } />
          
          {/* Coming Soon Pages (remaining) */}
          <Route path="/contact" element={
            <ComingSoonPage
              title="Contact Us"
              description="Get in touch with our team for support and feedback"
              icon={<MessageCircle className="w-8 h-8 text-blue-600" />}
            />
          } />
          <Route path="/privacy" element={
            <ComingSoonPage
              title="Privacy Policy"
              description="Your privacy and data protection information"
              icon={<Shield className="w-8 h-8 text-blue-600" />}
            />
          } />
          <Route path="/terms" element={
            <ComingSoonPage
              title="Terms of Service"
              description="Terms and conditions for using our platform"
              icon={<FileText className="w-8 h-8 text-blue-600" />}
            />
          } />
          </Routes>
        </Layout>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
