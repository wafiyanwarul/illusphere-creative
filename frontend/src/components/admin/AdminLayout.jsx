import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const AdminLayout = ({ children }) => {
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: '📊' },
    { name: 'Projects', path: '/admin-projects', icon: '📁' },
    { name: 'Clients', path: '/admin-clients', icon: '👥' }
  ]

  const isActive = path => location.pathname === path

  return (
    <div className='min-h-screen bg-[#0A0A0A]'>
      {/* Top Navigation Bar */}
      <nav className='bg-[#1A1A1A] border-b border-[#2A2A2A] sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo */}
            <Link to='/' className='flex items-center space-x-3'>
              <div className='text-[#C9A25F] text-2xl font-bold'>IC</div>
              <div className='text-white text-sm'>
                <div className='font-semibold'>Illusphere Creative</div>
                <div className='text-xs text-gray-400'>Admin Dashboard</div>
              </div>
            </Link>

            {/* Right Side - User & Logout */}
            <div className='flex items-center space-x-4'>
              <div className='text-right'>
                <div className='text-white text-sm font-medium'>Admin User</div>
                <div className='text-gray-400 text-xs'>Project Manager</div>
              </div>
              <div className='w-10 h-10 rounded-full bg-[#C9A25F] flex items-center justify-center text-black font-bold'>
                A
              </div>

              {/* Logout Button */}
              <button
                onClick={() => {
                  sessionStorage.removeItem('admin_authenticated')
                  sessionStorage.removeItem('admin_login_time')
                  window.location.href = '/admin-login'
                }}
                className='ml-4 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all text-sm font-medium'
                title='Logout'
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar + Content Layout */}
      <div className='flex'>
        {/* Sidebar */}
        <aside className='w-64 bg-[#1A1A1A] min-h-[calc(100vh-64px)] border-r border-[#2A2A2A]'>
          <div className='p-6'>
            <div className='space-y-2'>
              {navigation.map(item => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(item.path)
                      ? 'bg-[#C9A25F] text-black font-semibold'
                      : 'text-gray-400 hover:bg-[#2A2A2A] hover:text-white'
                  }`}
                >
                  <span className='text-xl'>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className='my-6 border-t border-[#2A2A2A]'></div>

            {/* Quick Actions */}
            <div className='space-y-2'>
              <div className='text-gray-500 text-xs uppercase font-semibold px-4 mb-3'>
                Quick Actions
              </div>
              <Link
                to='/order-services'
                className='flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-[#2A2A2A] hover:text-white transition-all text-sm'
              >
                <span>➕</span>
                <span>New Project (Manual)</span>
              </Link>
              <Link
                to='/'
                className='flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-[#2A2A2A] hover:text-white transition-all text-sm'
              >
                <span>🏠</span>
                <span>Back to Website</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className='flex-1 p-8'>
          <div className='max-w-7xl mx-auto'>{children}</div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
