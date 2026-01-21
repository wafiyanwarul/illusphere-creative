import React, { useEffect } from 'react'
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation
} from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { BackgroundEffects } from './components/BackgroundEffects'
import { HeroSection } from './components/HeroSection'
import { ServicesSection } from './components/ServicesSection'
import { PortfolioSection } from './components/PortfolioSection'
import { AboutSection } from './components/AboutSection'
import { PartnershipSection } from './components/PartnershipSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { TechStackShowcase } from './components/TechStackShowcase'
import { CTASection } from './components/CTASection'
import { Footer } from './components/Footer'
import { OrderServicesPage } from './pages/OrderServicesPage'
import AdminLogin from './pages/admin/AdminLogin'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProjects from './pages/admin/AdminProjects'
import AdminProjectDetail from './pages/admin/AdminProjectDetail'
// import { Analytics } from '@vercel/analytics/react'
// import { SpeedInsights } from '@vercel/speed-insights/react'

const Home = () => {
  return (
    <div className='page-wrapper'>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <PartnershipSection />
      <TestimonialsSection />
      <TechStackShowcase />
      <CTASection />
    </div>
  )
}

// Redirect component for old page URLs
const RedirectToHome = ({ section }) => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/#${section}`, { replace: true })
    setTimeout(() => {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }, [navigate, section])

  return null
}

function AppContent () {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <div>
      {/* <BrowserRouter> */}
      <BackgroundEffects />
      {/* Only show Navigation if NOT on admin pages */}
      {!isAdminPage && <Navigation />}
      <main className={isAdminPage ? '' : 'main-content'}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/order-services' element={<OrderServicesPage />} />
          {/* Admin Routes */}
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route
            path='/admin-dashboard'
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin-projects'
            element={
              <ProtectedRoute>
                <AdminProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin-projects/:id'
            element={
              <ProtectedRoute>
                <AdminProjectDetail />
              </ProtectedRoute>
            }
          />
          <Route path='/about' element={<RedirectToHome section='about' />} />
          <Route
            path='/partnership'
            element={<RedirectToHome section='partnership' />}
          />
          <Route
            path='/services'
            element={<RedirectToHome section='services' />}
          />
          <Route
            path='/portfolio'
            element={<RedirectToHome section='portfolio' />}
          />
          <Route
            path='/testimonials'
            element={<RedirectToHome section='testimonials' />}
          />
          <Route
            path='/tech-stack'
            element={<RedirectToHome section='tech-stack' />}
          />
          <Route
            path='/contact'
            element={<RedirectToHome section='contact' />}
          />
        </Routes>
      </main>
      {/* Only show Footer if NOT on admin pages */}
      {!isAdminPage && <Footer />}
      {/* </BrowserRouter> */}
    </div>
  )
}

function App () {
  return (
    <div className='App'>
      {/* <Analytics />
      <SpeedInsights /> */}
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  )
}

export default App
