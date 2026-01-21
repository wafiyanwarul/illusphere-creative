import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import { getProjectById, PROJECT_STATUS } from '../../data/dummyProjects'

const AdminProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = getProjectById(id)

  // State for editable fields
  const [editMode, setEditMode] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(project?.status || '')
  const [adminNote, setAdminNote] = useState('')

  // If project not found
  if (!project) {
    return (
      <AdminLayout>
        <div className='flex flex-col items-center justify-center min-h-[60vh]'>
          <div className='text-6xl mb-4'>❌</div>
          <h1 className='text-2xl font-bold text-white mb-2'>
            Project Not Found
          </h1>
          <p className='text-gray-400 mb-6'>
            The project ID "{id}" does not exist.
          </p>
          <button
            onClick={() => navigate('/admin-projects')}
            className='px-6 py-3 bg-[#C9A25F] text-black rounded-lg hover:bg-[#E0C080] transition-all font-semibold'
          >
            ← Back to Projects
          </button>
        </div>
      </AdminLayout>
    )
  }

  // Format currency
  const formatIDR = amount => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return '—'
    const date = new Date(dateString)
    if (includeTime) {
      return date.toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  // Get status color
  const getStatusColor = status => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'in_revision':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'dealing':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  // Handle status change
  const handleStatusChange = () => {
    // In production, this would call API
    console.log('Status changed to:', currentStatus)
    setEditMode(false)
    // Show success notification
    alert(`Status updated to: ${currentStatus.replace('_', ' ')}`)
  }

  // Handle add note
  const handleAddNote = () => {
    if (!adminNote.trim()) return
    console.log('New note:', adminNote)
    setAdminNote('')
    alert('Note added successfully!')
  }

  // Calculate payment progress
  const paymentProgress = project.finalPrice
    ? (project.paid / project.finalPrice) * 100
    : 0

  return (
    <AdminLayout>
      {/* Header */}
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-4'>
            <button
              onClick={() => navigate('/admin-projects')}
              className='p-2 hover:bg-[#2A2A2A] rounded-lg transition-colors'
            >
              <span className='text-gray-400 text-xl'>←</span>
            </button>
            <div>
              <h1 className='text-3xl font-bold text-white'>
                {project.projectName}
              </h1>
              <p className='text-gray-400 text-sm mt-1'>
                Project ID: <span className='font-mono'>{project.id}</span>
              </p>
            </div>
          </div>

          <div className='flex items-center space-x-3'>
            {/* Status Badge */}
            <div
              className={`px-4 py-2 rounded-lg border font-semibold ${getStatusColor(
                project.status
              )}`}
            >
              {project.status.replace('_', ' ').toUpperCase()}
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => setEditMode(!editMode)}
              className='px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-[#3A3A3A] transition-all'
            >
              {editMode ? '✕ Cancel' : '✏️ Edit Status'}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Status Section */}
      {editMode && (
        <div className='bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-6'>
          <h3 className='text-lg font-bold text-yellow-400 mb-4'>
            Change Project Status
          </h3>
          <div className='flex items-end space-x-4'>
            <div className='flex-1'>
              <label className='block text-sm text-gray-400 mb-2'>
                New Status
              </label>
              <select
                value={currentStatus}
                onChange={e => setCurrentStatus(e.target.value)}
                className='w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white focus:border-yellow-500 focus:outline-none'
              >
                <option value='pending_review'>Pending Review</option>
                <option value='dealing'>Price Negotiation</option>
                <option value='in_progress'>In Progress</option>
                <option value='in_revision'>In Revision</option>
                <option value='completed'>Completed</option>
              </select>
            </div>
            <button
              onClick={handleStatusChange}
              className='px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-all font-semibold'
            >
              Update Status
            </button>
          </div>
        </div>
      )}

      {/* Main Grid Layout */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Column - Main Info */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Client Information */}
          <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6'>
            <h2 className='text-xl font-bold text-white mb-4 flex items-center'>
              <span className='mr-2'>👤</span> Client Information
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <div className='text-sm text-gray-400 mb-1'>Client Name</div>
                <div className='text-white font-medium'>
                  {project.clientName}
                </div>
              </div>
              <div>
                <div className='text-sm text-gray-400 mb-1'>Email</div>
                <div className='text-white'>{project.email}</div>
              </div>
              <div>
                <div className='text-sm text-gray-400 mb-1'>Phone</div>
                <div className='text-white'>{project.phone}</div>
              </div>
              <div>
                <div className='text-sm text-gray-400 mb-1'>Company</div>
                <div className='text-white'>{project.companyName || '—'}</div>
              </div>
              {project.companyWebsite && (
                <div className='md:col-span-2'>
                  <div className='text-sm text-gray-400 mb-1'>Website</div>
                  <a
                    href={project.companyWebsite}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-[#C9A25F] hover:underline'
                  >
                    {project.companyWebsite}
                  </a>
                </div>
              )}
              <div>
                <div className='text-sm text-gray-400 mb-1'>
                  Preferred Contact
                </div>
                <div className='text-white capitalize'>
                  {project.contactMethod}
                </div>
              </div>
              <div>
                <div className='text-sm text-gray-400 mb-1'>Contact Time</div>
                <div className='text-white capitalize'>
                  {project.contactTime}
                </div>
              </div>
              {project.referralSource && (
                <div className='md:col-span-2'>
                  <div className='text-sm text-gray-400 mb-1'>
                    Referral Source
                  </div>
                  <div className='text-white capitalize'>
                    {project.referralSource.replace('_', ' ')}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6'>
            <h2 className='text-xl font-bold text-white mb-4 flex items-center'>
              <span className='mr-2'>📋</span> Project Details
            </h2>
            <div className='space-y-4'>
              <div>
                <div className='text-sm text-gray-400 mb-1'>Description</div>
                <div className='text-white leading-relaxed'>
                  {project.description}
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <div className='text-sm text-gray-400 mb-1'>Category</div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      project.category === 'tech'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-purple-500/20 text-purple-400'
                    }`}
                  >
                    {project.category === 'tech'
                      ? 'Tech Services'
                      : 'Creative Services'}
                  </span>
                </div>
                <div>
                  <div className='text-sm text-gray-400 mb-1'>Timeline</div>
                  <div className='text-white'>{project.timeline}</div>
                </div>
                <div>
                  <div className='text-sm text-gray-400 mb-1'>Project Type</div>
                  <div className='text-white capitalize'>
                    {project.projectStatus.replace('_', ' ')}
                  </div>
                </div>
                <div>
                  <div className='text-sm text-gray-400 mb-1'>
                    Revisions Used
                  </div>
                  <div className='text-white'>
                    {project.revisionCount} / {project.maxRevisions}
                    {project.revisionCount === project.maxRevisions && (
                      <span className='ml-2 text-red-400 text-xs'>
                        (Max reached)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Breakdown */}
          <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6'>
            <h2 className='text-xl font-bold text-white mb-4 flex items-center'>
              <span className='mr-2'>🛠️</span> Services Ordered
            </h2>
            <div className='space-y-3'>
              {project.services.map((service, index) => (
                <div
                  key={index}
                  className='bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg p-4'
                >
                  <div className='flex justify-between items-start mb-2'>
                    <div>
                      <div className='font-semibold text-white'>
                        {service.name}
                      </div>
                      <div className='text-sm text-gray-400'>
                        {service.type}
                      </div>
                    </div>
                    <div className='text-right'>
                      {service.price.min !== undefined ? (
                        <div className='text-[#C9A25F] font-semibold'>
                          {formatIDR(service.price.min)} -{' '}
                          {formatIDR(service.price.max)}
                        </div>
                      ) : (
                        <div className='text-[#C9A25F] font-semibold'>
                          {formatIDR(service.price)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {project.additionalServices &&
                project.additionalServices.length > 0 && (
                  <>
                    <div className='border-t border-[#2A2A2A] pt-3 mt-3'>
                      <div className='text-sm text-gray-400 mb-2'>
                        Additional Services:
                      </div>
                      <div className='flex flex-wrap gap-2'>
                        {project.additionalServices.map((serviceId, index) => (
                          <span
                            key={index}
                            className='px-3 py-1 bg-[#2A2A2A] text-gray-300 rounded-full text-xs'
                          >
                            {serviceId.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
            </div>
          </div>

          {/* Status History / Timeline */}
          <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6'>
            <h2 className='text-xl font-bold text-white mb-4 flex items-center'>
              <span className='mr-2'>📅</span> Project Timeline
            </h2>
            <div className='space-y-4'>
              {project.statusHistory.map((history, index) => (
                <div key={index} className='flex items-start space-x-4'>
                  <div
                    className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                      index === 0 ? 'bg-[#C9A25F]' : 'bg-gray-600'
                    }`}
                  ></div>
                  <div className='flex-1'>
                    <div className='flex items-center justify-between mb-1'>
                      <span
                        className={`font-semibold ${
                          index === 0 ? 'text-[#C9A25F]' : 'text-gray-300'
                        }`}
                      >
                        {history.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className='text-xs text-gray-500'>
                        {formatDate(history.timestamp, true)}
                      </span>
                    </div>
                    <div className='text-sm text-gray-400'>{history.note}</div>
                    <div className='text-xs text-gray-500 mt-1'>
                      by {history.changedBy}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Notes */}
          <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6'>
            <h2 className='text-xl font-bold text-white mb-4 flex items-center'>
              <span className='mr-2'>📝</span> Admin Notes (Internal)
            </h2>

            {/* Add Note */}
            <div className='mb-4'>
              <textarea
                value={adminNote}
                onChange={e => setAdminNote(e.target.value)}
                placeholder='Add internal note about this project...'
                rows={3}
                className='w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-500 focus:border-[#C9A25F] focus:outline-none resize-none'
              />
              <button
                onClick={handleAddNote}
                disabled={!adminNote.trim()}
                className={`mt-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  adminNote.trim()
                    ? 'bg-[#C9A25F] text-black hover:bg-[#E0C080]'
                    : 'bg-[#2A2A2A] text-gray-600 cursor-not-allowed'
                }`}
              >
                Add Note
              </button>
            </div>

            {/* Notes List */}
            <div className='space-y-3'>
              {project.notes && project.notes.length > 0 ? (
                project.notes.map(note => (
                  <div
                    key={note.id}
                    className='bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg p-4'
                  >
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-sm font-semibold text-gray-300'>
                        {note.author}
                      </span>
                      <span className='text-xs text-gray-500'>
                        {formatDate(note.timestamp, true)}
                      </span>
                    </div>
                    <div className='text-white'>{note.text}</div>
                  </div>
                ))
              ) : (
                <div className='text-center text-gray-500 py-4'>
                  No notes yet. Add one above!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className='space-y-6'>
          {/* Quick Info */}
          <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6'>
            <h3 className='font-bold text-white mb-4'>Quick Info</h3>
            <div className='space-y-3'>
              <div>
                <div className='text-xs text-gray-400 mb-1'>Submitted</div>
                <div className='text-white text-sm'>
                  {formatDate(project.submittedDate)}
                </div>
              </div>
              {project.startDate && (
                <div>
                  <div className='text-xs text-gray-400 mb-1'>Start Date</div>
                  <div className='text-white text-sm'>
                    {formatDate(project.startDate)}
                  </div>
                </div>
              )}
              {project.estimatedCompletion && (
                <div>
                  <div className='text-xs text-gray-400 mb-1'>
                    Est. Completion
                  </div>
                  <div className='text-white text-sm'>
                    {formatDate(project.estimatedCompletion)}
                  </div>
                </div>
              )}
              {project.completedDate && (
                <div>
                  <div className='text-xs text-gray-400 mb-1'>Completed</div>
                  <div className='text-green-400 text-sm font-semibold'>
                    {formatDate(project.completedDate)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Status */}
          <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6'>
            <h3 className='font-bold text-white mb-4 flex items-center'>
              <span className='mr-2'>💰</span> Payment Status
            </h3>

            {project.finalPrice ? (
              <>
                <div className='mb-4'>
                  <div className='flex justify-between text-sm mb-2'>
                    <span className='text-gray-400'>Progress</span>
                    <span className='text-white font-semibold'>
                      {paymentProgress.toFixed(0)}%
                    </span>
                  </div>
                  <div className='w-full bg-[#2A2A2A] rounded-full h-2'>
                    <div
                      className='bg-[#C9A25F] h-2 rounded-full transition-all'
                      style={{ width: `${paymentProgress}%` }}
                    ></div>
                  </div>
                </div>

                <div className='space-y-3 mb-4'>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-400'>Final Price</span>
                    <span className='text-white font-semibold'>
                      {formatIDR(project.finalPrice)}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-400'>Paid</span>
                    <span className='text-green-400 font-semibold'>
                      {formatIDR(project.paid)}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-400'>Remaining</span>
                    <span className='text-orange-400 font-semibold'>
                      {formatIDR(project.finalPrice - project.paid)}
                    </span>
                  </div>
                </div>

                {/* Payment Breakdown */}
                <div className='border-t border-[#2A2A2A] pt-4'>
                  <div className='text-sm font-semibold text-gray-400 mb-3'>
                    Payment Breakdown
                  </div>
                  <div className='space-y-2'>
                    {project.paymentHistory.map(payment => (
                      <div
                        key={payment.id}
                        className='flex items-center justify-between text-sm'
                      >
                        <div className='flex items-center space-x-2'>
                          <span
                            className={`w-2 h-2 rounded-full ${
                              payment.status === 'paid'
                                ? 'bg-green-400'
                                : 'bg-gray-600'
                            }`}
                          ></span>
                          <span className='text-gray-300'>{payment.type}</span>
                        </div>
                        <span
                          className={
                            payment.status === 'paid'
                              ? 'text-green-400'
                              : 'text-gray-500'
                          }
                        >
                          {formatIDR(payment.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className='text-center py-4'>
                <div className='text-gray-500 text-sm mb-2'>
                  Price not finalized yet
                </div>
                <div className='text-xs text-gray-600'>
                  Estimated: {formatIDR(project.estimatedTotal.min)} -{' '}
                  {formatIDR(project.estimatedTotal.max)}
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className='bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6'>
            <h3 className='font-bold text-white mb-4'>Quick Actions</h3>
            <div className='space-y-2'>
              <button className='w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-[#3A3A3A] transition-all text-sm text-left flex items-center'>
                <span className='mr-2'>📧</span> Send Email to Client
              </button>
              <button className='w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-[#3A3A3A] transition-all text-sm text-left flex items-center'>
                <span className='mr-2'>📄</span> Generate Invoice
              </button>
              <button className='w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-[#3A3A3A] transition-all text-sm text-left flex items-center'>
                <span className='mr-2'>📥</span> Export Project Data
              </button>
              <button className='w-full px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all text-sm text-left flex items-center border border-red-500/30'>
                <span className='mr-2'>🗑️</span> Archive Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminProjectDetail
