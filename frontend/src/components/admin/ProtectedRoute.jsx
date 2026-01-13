import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const isAuthenticated =
    sessionStorage.getItem('admin_authenticated') === 'true'
  const loginTime = sessionStorage.getItem('admin_login_time')

  // Session timeout: 8 hours
  const SESSION_TIMEOUT = 8 * 60 * 60 * 1000 // 8 hours in milliseconds
  const isSessionValid =
    loginTime && new Date().getTime() - parseInt(loginTime) < SESSION_TIMEOUT

  if (!isAuthenticated || !isSessionValid) {
    // Clear invalid session
    sessionStorage.removeItem('admin_authenticated')
    sessionStorage.removeItem('admin_login_time')

    // Redirect to login
    return <Navigate to='/admin-login' replace />
  }

  return children
}

export default ProtectedRoute
