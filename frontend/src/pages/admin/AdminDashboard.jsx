import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import {
  dummyProjects,
  getTotalRevenue,
  getProjectsByStatus
} from '../../data/dummyProjects'

const AdminDashboard = () => {
  // Calculate statistics
  const totalProjects = dummyProjects.length
  const totalRevenue = getTotalRevenue()
  const inProgressProjects = getProjectsByStatus('in_progress').length
  const completedProjects = getProjectsByStatus('completed').length
  const pendingProjects = getProjectsByStatus('pending_review').length

  // Format currency
  const formatIDR = amount => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-white mb-2'>
          Dashboard Overview
        </h1>
        <p className='text-gray-400'>
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {/* Total Projects */}
        <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='text-gray-400 text-sm font-medium'>
              Total Projects
            </div>
            <div className='text-2xl'>📁</div>
          </div>
          <div className='text-3xl font-bold text-white mb-2'>
            {totalProjects}
          </div>
          <div className='text-xs text-gray-500'>All time</div>
        </div>

        {/* Total Revenue */}
        <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='text-gray-400 text-sm font-medium'>
              Total Revenue
            </div>
            <div className='text-2xl'>💰</div>
          </div>
          <div className='text-2xl font-bold text-[#C9A25F] mb-2'>
            {formatIDR(totalRevenue)}
          </div>
          <div className='text-xs text-gray-500'>
            From completed & ongoing projects
          </div>
        </div>

        {/* In Progress */}
        <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='text-gray-400 text-sm font-medium'>In Progress</div>
            <div className='text-2xl'>🚀</div>
          </div>
          <div className='text-3xl font-bold text-blue-500 mb-2'>
            {inProgressProjects}
          </div>
          <div className='text-xs text-gray-500'>Active projects</div>
        </div>

        {/* Completed */}
        <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='text-gray-400 text-sm font-medium'>Completed</div>
            <div className='text-2xl'>✅</div>
          </div>
          <div className='text-3xl font-bold text-green-500 mb-2'>
            {completedProjects}
          </div>
          <div className='text-xs text-gray-500'>Successfully delivered</div>
        </div>
      </div>

      {/* Recent Projects Preview */}
      <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-bold text-white'>Recent Projects</h2>
          <button className='text-[#C9A25F] hover:text-[#E0C080] text-sm font-medium'>
            View All →
          </button>
        </div>

        {/* Simple Table */}
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-[#2A2A2A]'>
                <th className='text-left py-3 px-4 text-gray-400 text-sm font-medium'>
                  Project ID
                </th>
                <th className='text-left py-3 px-4 text-gray-400 text-sm font-medium'>
                  Client
                </th>
                <th className='text-left py-3 px-4 text-gray-400 text-sm font-medium'>
                  Project Name
                </th>
                <th className='text-left py-3 px-4 text-gray-400 text-sm font-medium'>
                  Status
                </th>
                <th className='text-left py-3 px-4 text-gray-400 text-sm font-medium'>
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {dummyProjects.slice(0, 5).map(project => (
                <tr
                  key={project.id}
                  className='border-b border-[#2A2A2A] hover:bg-[#2A2A2A] transition-colors'
                >
                  <td className='py-4 px-4 text-gray-300 text-sm font-mono'>
                    {project.id}
                  </td>
                  <td className='py-4 px-4 text-white'>{project.clientName}</td>
                  <td className='py-4 px-4 text-gray-300'>
                    {project.projectName}
                  </td>
                  <td className='py-4 px-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'completed'
                          ? 'bg-green-500/20 text-green-400'
                          : project.status === 'in_progress'
                          ? 'bg-blue-500/20 text-blue-400'
                          : project.status === 'in_revision'
                          ? 'bg-orange-500/20 text-orange-400'
                          : project.status === 'dealing'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {project.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className='py-4 px-4 text-[#C9A25F] font-semibold'>
                    {formatIDR(project.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
