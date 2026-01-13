import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const AdminLogin = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Simple hardcoded password (production nanti pake auth proper)
  const ADMIN_PASSWORD = 'illusphere2026' // Ganti sesuai kebutuhan

  const handleLogin = e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate API call delay
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        // Set session
        sessionStorage.setItem('admin_authenticated', 'true')
        sessionStorage.setItem('admin_login_time', new Date().getTime())

        // Redirect to dashboard
        navigate('/admin-dashboard')
      } else {
        setError('Invalid password. Please try again.')
        setPassword('')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className='min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4'>
      {/* Background Effects */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A25F] opacity-5 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C9A25F] opacity-5 rounded-full blur-3xl'></div>
      </div>

      <div className='relative w-full max-w-md'>
        {/* Logo & Header */}
        <div className='text-center mb-8'>
          <Link to='/' className='inline-flex items-center justify-center mb-4'>
            <div className='text-[#C9A25F] text-4xl font-bold'>IC</div>
          </Link>
          <h1 className='text-2xl font-bold text-white mb-2'>
            Admin Dashboard
          </h1>
          <p className='text-gray-400'>Enter password to access admin panel</p>
        </div>

        {/* Login Card */}
        <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 shadow-2xl'>
          <form onSubmit={handleLogin} className='space-y-6'>
            {/* Password Input */}
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-300 mb-2'
              >
                Password
              </label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Enter admin password'
                className='w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-500 focus:border-[#C9A25F] focus:outline-none focus:ring-2 focus:ring-[#C9A25F]/20 transition-all'
                required
                autoFocus
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center space-x-2'>
                <span className='text-red-400 text-sm'>❌</span>
                <span className='text-red-400 text-sm'>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading || !password}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                loading || !password
                  ? 'bg-[#2A2A2A] text-gray-500 cursor-not-allowed'
                  : 'bg-[#C9A25F] text-black hover:bg-[#E0C080] active:scale-95'
              }`}
            >
              {loading ? (
                <span className='flex items-center justify-center'>
                  <svg
                    className='animate-spin h-5 w-5 mr-2'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                      fill='none'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Authenticating...
                </span>
              ) : (
                'Access Dashboard →'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className='mt-6 pt-6 border-t border-[#2A2A2A] text-center'>
            <Link
              to='/'
              className='text-sm text-gray-400 hover:text-[#C9A25F] transition-colors'
            >
              ← Back to Website
            </Link>
          </div>
        </div>

        {/* Security Note */}
        <div className='mt-6 text-center'>
          <p className='text-xs text-gray-500'>
            🔒 Secure admin area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
