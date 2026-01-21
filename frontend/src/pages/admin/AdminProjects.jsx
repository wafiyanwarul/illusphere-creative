import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import {
  dummyProjects,
  PROJECT_STATUS,
  searchProjects,
  filterProjects
} from '../../data/dummyProjects'

const AdminProjects = () => {
  // State Management
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    timeline: 'all',
    dateFrom: '',
    dateTo: ''
  })
  const [sortConfig, setSortConfig] = useState({
    key: 'submittedDate',
    direction: 'desc'
  })
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 15

  // Format currency
  const formatIDR = amount => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  // Apply filters and search
  const filteredProjects = useMemo(() => {
    let result = dummyProjects

    // Apply search
    if (searchQuery.trim()) {
      result = searchProjects(searchQuery)
    }

    // Apply filters
    result = filterProjects(filters)

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue = a[sortConfig.key]
        let bValue = b[sortConfig.key]

        // Handle date sorting
        if (
          sortConfig.key === 'submittedDate' ||
          sortConfig.key === 'startDate'
        ) {
          aValue = aValue ? new Date(aValue).getTime() : 0
          bValue = bValue ? new Date(bValue).getTime() : 0
        }

        // Handle revenue sorting
        if (sortConfig.key === 'revenue') {
          aValue = aValue || 0
          bValue = bValue || 0
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }

    return result
  }, [searchQuery, filters, sortConfig])

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  )
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)

  // Handle sort
  const handleSort = key => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }))
    setCurrentPage(1) // Reset to first page
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: 'all',
      category: 'all',
      timeline: 'all',
      dateFrom: '',
      dateTo: ''
    })
    setSearchQuery('')
    setCurrentPage(1)
  }

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      'Project ID',
      'Client Name',
      'Email',
      'Phone',
      'Project Name',
      'Category',
      'Status',
      'Timeline',
      'Submitted Date',
      'Start Date',
      'End Date',
      'Final Price',
      'Paid',
      'Revenue'
    ]

    const rows = filteredProjects.map(p => [
      p.id,
      p.clientName,
      p.email,
      p.phone,
      p.projectName,
      p.category,
      p.status,
      p.timeline,
      p.submittedDate,
      p.startDate || '-',
      p.completedDate || p.estimatedCompletion || '-',
      p.finalPrice || '-',
      p.paid,
      p.revenue
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(r => r.join(','))].join('\n')

    const link = document.createElement('a')
    link.setAttribute('href', encodeURI(csvContent))
    link.setAttribute(
      'download',
      `projects_export_${new Date().toISOString().split('T')[0]}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Statistics
  const stats = {
    total: filteredProjects.length,
    pending: filteredProjects.filter(p => p.status === 'pending_review').length,
    dealing: filteredProjects.filter(p => p.status === 'dealing').length,
    inProgress: filteredProjects.filter(p => p.status === 'in_progress').length,
    inRevision: filteredProjects.filter(p => p.status === 'in_revision').length,
    completed: filteredProjects.filter(p => p.status === 'completed').length
  }

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <div>
            <h1 className='text-3xl font-bold text-white mb-2'>
              Project Management
            </h1>
            <p className='text-gray-400'>
              Manage all client projects and track their progress
            </p>
          </div>
          <button
            onClick={exportToCSV}
            className='px-4 py-2 bg-[#C9A25F] text-black rounded-lg hover:bg-[#E0C080] transition-all font-medium flex items-center space-x-2'
          >
            <span>📥</span>
            <span>Export to CSV</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
          <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4'>
            <div className='text-gray-400 text-xs mb-1'>Total</div>
            <div className='text-2xl font-bold text-white'>{stats.total}</div>
          </div>
          <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4'>
            <div className='text-gray-400 text-xs mb-1'>Pending</div>
            <div className='text-2xl font-bold text-gray-400'>
              {stats.pending}
            </div>
          </div>
          <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4'>
            <div className='text-gray-400 text-xs mb-1'>Dealing</div>
            <div className='text-2xl font-bold text-yellow-400'>
              {stats.dealing}
            </div>
          </div>
          <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4'>
            <div className='text-gray-400 text-xs mb-1'>In Progress</div>
            <div className='text-2xl font-bold text-blue-400'>
              {stats.inProgress}
            </div>
          </div>
          <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4'>
            <div className='text-gray-400 text-xs mb-1'>In Revision</div>
            <div className='text-2xl font-bold text-orange-400'>
              {stats.inRevision}
            </div>
          </div>
          <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4'>
            <div className='text-gray-400 text-xs mb-1'>Completed</div>
            <div className='text-2xl font-bold text-green-400'>
              {stats.completed}
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 mb-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
          {/* Search */}
          <div className='lg:col-span-2'>
            <label className='block text-sm text-gray-400 mb-2'>
              Search Projects
            </label>
            <input
              type='text'
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder='Search by ID, client name, or project name...'
              className='w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-500 focus:border-[#C9A25F] focus:outline-none'
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className='block text-sm text-gray-400 mb-2'>Status</label>
            <select
              value={filters.status}
              onChange={e => handleFilterChange('status', e.target.value)}
              className='w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A25F] focus:outline-none'
            >
              <option value='all'>All Status</option>
              <option value='pending_review'>Pending Review</option>
              <option value='dealing'>Dealing</option>
              <option value='in_progress'>In Progress</option>
              <option value='in_revision'>In Revision</option>
              <option value='completed'>Completed</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className='block text-sm text-gray-400 mb-2'>Category</label>
            <select
              value={filters.category}
              onChange={e => handleFilterChange('category', e.target.value)}
              className='w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A25F] focus:outline-none'
            >
              <option value='all'>All Categories</option>
              <option value='tech'>Tech Services</option>
              <option value='creative'>Creative Services</option>
            </select>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* Timeline Filter */}
          <div>
            <label className='block text-sm text-gray-400 mb-2'>Timeline</label>
            <select
              value={filters.timeline}
              onChange={e => handleFilterChange('timeline', e.target.value)}
              className='w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A25F] focus:outline-none'
            >
              <option value='all'>All Timelines</option>
              <option value='Rush (1-2 weeks)'>Rush (1-2 weeks)</option>
              <option value='Standard (4-8 weeks)'>Standard (4-8 weeks)</option>
              <option value='Flexible (8-12 weeks)'>
                Flexible (8-12 weeks)
              </option>
              <option value='No Deadline'>No Deadline</option>
            </select>
          </div>

          {/* Date From */}
          <div>
            <label className='block text-sm text-gray-400 mb-2'>
              From Date
            </label>
            <input
              type='date'
              value={filters.dateFrom}
              onChange={e => handleFilterChange('dateFrom', e.target.value)}
              className='w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A25F] focus:outline-none'
            />
          </div>

          {/* Date To */}
          <div>
            <label className='block text-sm text-gray-400 mb-2'>To Date</label>
            <input
              type='date'
              value={filters.dateTo}
              onChange={e => handleFilterChange('dateTo', e.target.value)}
              className='w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A25F] focus:outline-none'
            />
          </div>
        </div>

        {/* Reset Button */}
        <div className='mt-4 flex justify-end'>
          <button
            onClick={resetFilters}
            className='px-4 py-2 bg-[#2A2A2A] text-gray-300 rounded-lg hover:bg-[#3A3A3A] transition-all text-sm'
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-bold text-white'>
            Projects ({filteredProjects.length})
          </h2>
          <div className='text-gray-400 text-sm'>
            Showing {indexOfFirstProject + 1}-
            {Math.min(indexOfLastProject, filteredProjects.length)} of{' '}
            {filteredProjects.length}
          </div>
        </div>

        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-[#2A2A2A]'>
                <th className='text-left py-3 px-3 text-gray-400 text-sm font-medium'>
                  #
                </th>
                <th
                  className='text-left py-3 px-4 text-gray-400 text-sm font-medium cursor-pointer hover:text-white transition-colors'
                  onClick={() => handleSort('id')}
                >
                  Project ID{' '}
                  {sortConfig.key === 'id' &&
                    (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className='text-left py-3 px-4 text-gray-400 text-sm font-medium cursor-pointer hover:text-white transition-colors'
                  onClick={() => handleSort('clientName')}
                >
                  Client{' '}
                  {sortConfig.key === 'clientName' &&
                    (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className='text-left py-3 px-4 text-gray-400 text-sm font-medium'>
                  Project Name
                </th>
                <th className='text-left py-3 px-4 text-gray-400 text-sm font-medium'>
                  Category
                </th>
                <th
                  className='text-left py-3 px-4 text-gray-400 text-sm font-medium cursor-pointer hover:text-white transition-colors'
                  onClick={() => handleSort('submittedDate')}
                >
                  Submitted{' '}
                  {sortConfig.key === 'submittedDate' &&
                    (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className='text-left py-3 px-4 text-gray-400 text-sm font-medium'>
                  Status
                </th>
                <th
                  className='text-left py-3 px-4 text-gray-400 text-sm font-medium cursor-pointer hover:text-white transition-colors'
                  onClick={() => handleSort('revenue')}
                >
                  Revenue{' '}
                  {sortConfig.key === 'revenue' &&
                    (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className='text-left py-3 px-4 text-gray-400 text-sm font-medium'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.length === 0 ? (
                <tr>
                  <td colSpan='9' className='py-8 text-center text-gray-500'>
                    No projects found. Try adjusting your filters.
                  </td>
                </tr>
              ) : (
                currentProjects.map((project, index) => (
                  <tr
                    key={project.id}
                    className='border-b border-[#2A2A2A] hover:bg-[#2A2A2A] transition-colors'
                  >
                    {/* Number */}
                    <td className='py-4 px-3 text-gray-500 text-sm font-semibold'>
                      {indexOfFirstProject + index + 1}
                    </td>
                    {/* Project ID */}
                    <td className='py-4 px-4 text-gray-300 text-sm font-mono'>
                      {project.id}
                    </td>
                    {/* Client */}
                    <td className='py-4 px-4'>
                      <div>
                        <div className='text-white font-medium'>
                          {project.clientName}
                        </div>
                        <div className='text-xs text-gray-500'>
                          {project.email}
                        </div>
                      </div>
                    </td>
                    {/* Project Name */}
                    <td className='py-4 px-4 text-gray-300'>
                      {project.projectName}
                    </td>
                    {/* Category */}
                    <td className='py-4 px-4'>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          project.category === 'tech'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-purple-500/20 text-purple-400'
                        }`}
                      >
                        {project.category === 'tech' ? 'Tech' : 'Creative'}
                      </span>
                    </td>
                    {/* Submitted Date */}
                    <td className='py-4 px-4 text-gray-400 text-sm'>
                      {new Date(project.submittedDate).toLocaleDateString(
                        'id-ID',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }
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
                    {/* Actions */}
                    <td className='py-4 px-4'>
                      <Link
                        to={`/admin-projects/${project.id}`}
                        className='px-3 py-1 bg-[#C9A25F] text-black rounded-lg hover:bg-[#E0C080] transition-all text-sm font-medium inline-block'
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
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
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminProjects
