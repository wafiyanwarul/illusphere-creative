import AdminLayout from '../../components/admin/AdminLayout'
import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
import {
  dummyProjects,
  getTotalRevenue,
  getProjectsByStatus
} from '../../data/dummyProjects'

const AdminDashboard = () => {

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 15;

  // Calculate statistics
  const totalProjects = dummyProjects.length
  const totalRevenue = getTotalRevenue()
  const inProgressProjects = getProjectsByStatus('in_progress').length
  const completedProjects = getProjectsByStatus('completed').length
  // const pendingProjects = getProjectsByStatus('pending_review').length

  // Pagination calculations
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = dummyProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(totalProjects / projectsPerPage);
  
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

      {/* Recent Projects with Pagination */}
      <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-bold text-white'>All Projects</h2>
          <div className='flex items-center space-x-3'>
            <span className='text-gray-400 text-sm'>
              Showing {(currentPage - 1) * projectsPerPage + 1}-
              {Math.min(currentPage * projectsPerPage, totalProjects)} of{' '}
              {totalProjects}
            </span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-[#2A2A2A]'>
                <th className='text-left py-3 px-3 text-gray-400 text-sm font-medium'>
                  #
                </th>
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
                  Start Date
                </th>
                <th className='text-left py-3 px-4 text-gray-400 text-sm font-medium'>
                  End Date
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
              {currentProjects.map((project, index) => (
                <tr
                  key={project.id}
                  className='border-b border-[#2A2A2A] hover:bg-[#2A2A2A] transition-colors'
                >
                  {/* Nomor Urut */}
                  <td className='py-4 px-3 text-gray-500 text-sm font-semibold'>
                    {(currentPage - 1) * projectsPerPage + index + 1}
                  </td>
                  {/* Project ID */}
                  <td className='py-4 px-4 text-gray-300 text-sm font-mono'>
                    {project.id}
                  </td>
                  {/* Client */}
                  <td className='py-4 px-4 text-white'>{project.clientName}</td>
                  {/* Project Name */}
                  <td className='py-4 px-4 text-gray-300'>
                    {project.projectName}
                  </td>
                  {/* Start Date */}
                  <td className='py-4 px-4 text-gray-400 text-sm'>
                    {project.startDate
                      ? new Date(project.startDate).toLocaleDateString(
                          'id-ID',
                          {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          }
                        )
                      : '—'}
                  </td>
                  {/* End Date */}
                  <td className='py-4 px-4 text-gray-400 text-sm'>
                    {project.completedDate ? (
                      new Date(project.completedDate).toLocaleDateString(
                        'id-ID',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }
                      )
                    ) : project.estimatedCompletion ? (
                      <span className='text-yellow-400'>
                        Est:{' '}
                        {new Date(
                          project.estimatedCompletion
                        ).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'short'
                        })}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  {/* Status */}
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
                  {/* Revenue */}
                  <td className='py-4 px-4 text-[#C9A25F] font-semibold'>
                    {formatIDR(project.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className='mt-6 flex items-center justify-between border-t border-[#2A2A2A] pt-4'>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentPage === 1
                ? 'bg-[#2A2A2A] text-gray-600 cursor-not-allowed'
                : 'bg-[#2A2A2A] text-white hover:bg-[#C9A25F] hover:text-black'
            }`}
          >
            ← Previous
          </button>

          <div className='flex items-center space-x-2'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  currentPage === page
                    ? 'bg-[#C9A25F] text-black'
                    : 'bg-[#2A2A2A] text-gray-400 hover:bg-[#3A3A3A] hover:text-white'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentPage === totalPages
                ? 'bg-[#2A2A2A] text-gray-600 cursor-not-allowed'
                : 'bg-[#2A2A2A] text-white hover:bg-[#C9A25F] hover:text-black'
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
