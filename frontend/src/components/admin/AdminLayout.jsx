import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      // Auto-hide sidebar on mobile
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigation = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: '📊' },
    { name: 'Projects', path: '/admin-projects', icon: '📁' },
    { name: 'Clients', path: '/admin-clients', icon: '👥' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_login_time');
    window.location.href = '/admin-login';
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Admin-Only Top Bar */}
      <nav className="bg-[#1A1A1A] border-b border-[#2A2A2A] sticky top-0 z-50">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo + Sidebar Toggle */}
            <div className="flex items-center space-x-4">
              {/* Sidebar Toggle - Always visible on desktop too */}
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-[#2A2A2A] text-gray-400 hover:text-white transition-colors"
                title="Toggle Sidebar"
              >
                {sidebarOpen ? (
                  // Close icon
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  // Hamburger icon
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>

              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="text-[#C9A25F] text-2xl font-bold">IC</div>
                <div className="text-white text-sm hidden sm:block">
                  <div className="font-semibold">Illusphere Creative</div>
                  <div className="text-xs text-gray-400">Admin Dashboard</div>
                </div>
              </div>
            </div>

            {/* Right: User + Logout */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <div className="text-white text-sm font-medium">Admin User</div>
                <div className="text-gray-400 text-xs">Project Manager</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#C9A25F] flex items-center justify-center text-black font-bold">
                A
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all text-sm font-medium"
                title="Logout"
              >
                🚪 <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar + Content Layout */}
      <div className="flex relative">
        {/* Sidebar */}
        <aside 
          className={`
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            fixed lg:relative
            w-64 bg-[#1A1A1A] h-[calc(100vh-64px)] border-r border-[#2A2A2A]
            transition-transform duration-300 ease-in-out
            z-40
            overflow-y-auto
          `}
        >
          <div className="p-6">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(item.path)
                      ? 'bg-[#C9A25F] text-black font-semibold'
                      : 'text-gray-400 hover:bg-[#2A2A2A] hover:text-white'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-[#2A2A2A]"></div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <div className="text-gray-500 text-xs uppercase font-semibold px-4 mb-3">
                Quick Actions
              </div>
              <Link
                to="/order-services"
                onClick={() => isMobile && setSidebarOpen(false)}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-[#2A2A2A] hover:text-white transition-all text-sm"
              >
                <span>➕</span>
                <span>New Project (Manual)</span>
              </Link>
              <Link
                to="/"
                onClick={() => isMobile && setSidebarOpen(false)}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-[#2A2A2A] hover:text-white transition-all text-sm"
              >
                <span>🏠</span>
                <span>Back to Website</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile when sidebar open */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content Area - Adjust margin based on sidebar state */}
        <main className={`
          flex-1 p-4 sm:p-6 lg:p-8 
          transition-all duration-300
          ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}
        `}>
          <div className="max-w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;