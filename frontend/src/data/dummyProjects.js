// Enhanced dummy project data for admin dashboard
export const dummyProjects = [
  {
    id: 'ILS-2026-8A7F2B9D',
    clientName: 'PT Teknologi Maju',
    email: 'contact@tekmaju.com',
    phone: '+62 812-3456-7890',
    services: [
      {
        name: 'Web Development',
        type: 'E-Commerce Platform',
        price: { min: 15000000, max: 35000000 }
      },
      {
        name: 'UI/UX Design',
        type: 'Website Design (5-8 pages)',
        price: { min: 4000000, max: 8000000 }
      }
    ],
    projectName: 'E-Commerce Platform Redesign',
    description:
      'Modern e-commerce platform with integrated payment gateway and inventory management',
    status: 'in_progress',
    timeline: 'Standard (4-8 weeks)',
    projectStatus: 'new',
    submittedDate: '2026-01-05',
    startDate: '2026-01-10',
    estimatedCompletion: '2026-03-05',
    estimatedTotal: { min: 19000000, max: 43000000 },
    finalPrice: 32000000,
    paid: 16000000,
    revenue: 16000000,
    category: 'tech',
    revisionCount: 1,
    maxRevisions: 3,
    // NEW FIELDS
    contactMethod: 'email',
    contactTime: 'morning',
    companyName: 'PT Teknologi Maju',
    companyWebsite: 'https://tekmaju.com',
    additionalServices: ['seo', 'maintenance'],
    referralSource: 'google',
    files: [],
    notes: [
      {
        id: 1,
        author: 'Admin User',
        text: 'Client sangat responsif, progress lancar',
        timestamp: '2026-01-15T10:30:00Z',
        type: 'internal'
      }
    ],
    statusHistory: [
      {
        status: 'pending_review',
        timestamp: '2026-01-05T14:22:00Z',
        changedBy: 'System',
        note: 'Project request submitted'
      },
      {
        status: 'dealing',
        timestamp: '2026-01-06T09:15:00Z',
        changedBy: 'Admin User',
        note: 'Initial consultation scheduled'
      },
      {
        status: 'in_progress',
        timestamp: '2026-01-10T08:00:00Z',
        changedBy: 'Admin User',
        note: 'DP received, project started'
      }
    ],
    paymentHistory: [
      {
        id: 1,
        type: 'DP (50%)',
        amount: 16000000,
        status: 'paid',
        paidDate: '2026-01-09T15:20:00Z',
        method: 'Bank Transfer',
        note: 'BCA - Verified'
      },
      {
        id: 2,
        type: 'Milestone (30%)',
        amount: 9600000,
        status: 'pending',
        dueDate: '2026-02-10',
        method: null,
        note: null
      },
      {
        id: 3,
        type: 'Final (20%)',
        amount: 6400000,
        status: 'pending',
        dueDate: '2026-03-05',
        method: null,
        note: null
      }
    ]
  },
  {
    id: 'ILS-2026-3C9E1F4A',
    clientName: 'Budi Santoso',
    email: 'budi@example.com',
    phone: '+62 821-9876-5432',
    services: [
      {
        name: 'Social Media Management',
        type: '3 Months (45 posts)',
        price: 7000000
      }
    ],
    projectName: 'Social Media Campaign - Fashion Brand',
    description:
      'Complete social media management for 3 months including content creation and strategy',
    status: 'completed',
    timeline: 'Flexible (8-12 weeks)',
    projectStatus: 'new',
    submittedDate: '2025-10-15',
    startDate: '2025-10-20',
    completedDate: '2026-01-08',
    estimatedTotal: 7000000,
    finalPrice: 7000000,
    paid: 7000000,
    revenue: 7000000,
    category: 'creative',
    revisionCount: 2,
    maxRevisions: 3,
    contactMethod: 'whatsapp',
    contactTime: 'flexible',
    companyName: '',
    companyWebsite: '',
    additionalServices: [],
    referralSource: 'social',
    files: [],
    notes: [
      {
        id: 1,
        author: 'Admin User',
        text: 'Project completed successfully, client very satisfied',
        timestamp: '2026-01-08T16:45:00Z',
        type: 'internal'
      }
    ],
    statusHistory: [
      {
        status: 'pending_review',
        timestamp: '2025-10-15T11:20:00Z',
        changedBy: 'System',
        note: 'Project request submitted'
      },
      {
        status: 'dealing',
        timestamp: '2025-10-16T10:00:00Z',
        changedBy: 'Admin User',
        note: 'Price agreed via WhatsApp'
      },
      {
        status: 'in_progress',
        timestamp: '2025-10-20T09:00:00Z',
        changedBy: 'Admin User',
        note: 'Full payment received'
      },
      {
        status: 'in_revision',
        timestamp: '2025-12-05T14:30:00Z',
        changedBy: 'Admin User',
        note: 'Client requested content revisions'
      },
      {
        status: 'in_progress',
        timestamp: '2025-12-10T10:15:00Z',
        changedBy: 'Admin User',
        note: 'Revisions completed'
      },
      {
        status: 'completed',
        timestamp: '2026-01-08T16:00:00Z',
        changedBy: 'Admin User',
        note: 'Final delivery approved'
      }
    ],
    paymentHistory: [
      {
        id: 1,
        type: 'Full Payment',
        amount: 7000000,
        status: 'paid',
        paidDate: '2025-10-19T14:30:00Z',
        method: 'Bank Transfer',
        note: 'Mandiri - Verified'
      }
    ]
  },
  {
    id: 'ILS-2026-5D2A8E6C',
    clientName: 'CV Digital Solusi',
    email: 'info@digitalsolusi.id',
    phone: '+62 813-2468-1357',
    services: [
      {
        name: 'Mobile App Development',
        type: 'Standard App (10-15 screens)',
        price: { min: 25000000, max: 50000000 }
      },
      {
        name: 'UI/UX Design',
        type: 'App Design (10-15 screens)',
        price: { min: 6000000, max: 12000000 }
      }
    ],
    projectName: 'Fitness Tracking Mobile App',
    description:
      'iOS and Android app for fitness tracking with workout plans and nutrition guide',
    status: 'in_revision',
    timeline: 'Standard (4-8 weeks)',
    projectStatus: 'new',
    submittedDate: '2025-11-20',
    startDate: '2025-11-25',
    estimatedCompletion: '2026-02-15',
    estimatedTotal: { min: 31000000, max: 62000000 },
    finalPrice: 45000000,
    paid: 22500000,
    revenue: 22500000,
    category: 'tech',
    revisionCount: 2,
    maxRevisions: 3,
    contactMethod: 'video',
    contactTime: 'afternoon',
    companyName: 'CV Digital Solusi',
    companyWebsite: 'https://digitalsolusi.id',
    additionalServices: ['training', 'priority-support'],
    referralSource: 'referral',
    files: [],
    notes: [
      {
        id: 1,
        author: 'Admin User',
        text: 'Client requesting UI changes, 1 revision left',
        timestamp: '2026-01-18T11:20:00Z',
        type: 'internal'
      }
    ],
    statusHistory: [
      {
        status: 'pending_review',
        timestamp: '2025-11-20T09:45:00Z',
        changedBy: 'System',
        note: 'Project request submitted'
      },
      {
        status: 'dealing',
        timestamp: '2025-11-21T14:00:00Z',
        changedBy: 'Admin User',
        note: 'Video meeting scheduled'
      },
      {
        status: 'in_progress',
        timestamp: '2025-11-25T08:30:00Z',
        changedBy: 'Admin User',
        note: 'Contract signed, DP received'
      },
      {
        status: 'in_revision',
        timestamp: '2026-01-12T15:40:00Z',
        changedBy: 'Admin User',
        note: 'First revision: Navigation flow changes'
      },
      {
        status: 'in_progress',
        timestamp: '2026-01-14T10:00:00Z',
        changedBy: 'Admin User',
        note: 'Revision 1 completed'
      },
      {
        status: 'in_revision',
        timestamp: '2026-01-18T09:20:00Z',
        changedBy: 'Admin User',
        note: 'Second revision: Color scheme adjustment'
      }
    ],
    paymentHistory: [
      {
        id: 1,
        type: 'DP (50%)',
        amount: 22500000,
        status: 'paid',
        paidDate: '2025-11-24T16:45:00Z',
        method: 'Bank Transfer',
        note: 'BNI - Verified'
      },
      {
        id: 2,
        type: 'Milestone (30%)',
        amount: 13500000,
        status: 'pending',
        dueDate: '2026-01-25',
        method: null,
        note: null
      },
      {
        id: 3,
        type: 'Final (20%)',
        amount: 9000000,
        status: 'pending',
        dueDate: '2026-02-15',
        method: null,
        note: null
      }
    ]
  },
  {
    id: 'ILS-2026-7F4B9C1E',
    clientName: 'Sarah Wijaya',
    email: 'sarah.w@gmail.com',
    phone: '+62 856-7890-1234',
    services: [
      {
        name: 'Graphic Design',
        type: 'Brand Identity Package',
        price: { min: 5000000, max: 12000000 }
      }
    ],
    projectName: 'Coffee Shop Branding',
    description:
      'Complete brand identity including logo, color palette, typography, and brand guidelines',
    status: 'pending_review',
    timeline: 'Rush (1-2 weeks)',
    projectStatus: 'new',
    submittedDate: '2026-01-10',
    startDate: null,
    estimatedCompletion: null,
    estimatedTotal: { min: 6500000, max: 15600000 },
    finalPrice: null,
    paid: 0,
    revenue: 0,
    category: 'creative',
    revisionCount: 0,
    maxRevisions: 3,
    contactMethod: 'phone',
    contactTime: 'evening',
    companyName: '',
    companyWebsite: '',
    additionalServices: ['content'],
    referralSource: 'instagram',
    files: [],
    notes: [],
    statusHistory: [
      {
        status: 'pending_review',
        timestamp: '2026-01-10T13:55:00Z',
        changedBy: 'System',
        note: 'Project request submitted - Rush timeline'
      }
    ],
    paymentHistory: []
  },
  {
    id: 'ILS-2026-2E8D5A3F',
    clientName: 'PT Inovasi Digital',
    email: 'business@inovasidigital.com',
    phone: '+62 811-5555-6666',
    services: [
      {
        name: 'AI Solutions & Chatbot',
        type: 'AI Chatbot (NLP)',
        price: { min: 15000000, max: 30000000 }
      }
    ],
    projectName: 'Customer Service AI Chatbot',
    description: 'AI-powered chatbot with NLP for customer support automation',
    status: 'dealing',
    timeline: 'Standard (4-8 weeks)',
    projectStatus: 'integration',
    submittedDate: '2026-01-08',
    startDate: null,
    estimatedCompletion: null,
    estimatedTotal: { min: 15000000, max: 30000000 },
    finalPrice: null,
    paid: 0,
    revenue: 0,
    category: 'tech',
    revisionCount: 0,
    maxRevisions: 3,
    contactMethod: 'video',
    contactTime: 'morning',
    companyName: 'PT Inovasi Digital',
    companyWebsite: 'https://inovasidigital.com',
    additionalServices: ['training', 'maintenance'],
    referralSource: 'aikara',
    files: [],
    notes: [
      {
        id: 1,
        author: 'Admin User',
        text: 'Waiting for client approval on proposal',
        timestamp: '2026-01-16T14:10:00Z',
        type: 'internal'
      }
    ],
    statusHistory: [
      {
        status: 'pending_review',
        timestamp: '2026-01-08T10:30:00Z',
        changedBy: 'System',
        note: 'Project request submitted'
      },
      {
        status: 'dealing',
        timestamp: '2026-01-10T11:45:00Z',
        changedBy: 'Admin User',
        note: 'Initial meeting held, proposal sent'
      }
    ],
    paymentHistory: []
  },
  {
    id: 'ILS-2026-9B6F4D8A',
    clientName: 'Rina Kusuma',
    email: 'rina.kusuma@yahoo.com',
    phone: '+62 822-3333-4444',
    services: [
      {
        name: 'Videography & Motion Graphics',
        type: 'Brand Video (2-3 min)',
        price: { min: 10000000, max: 20000000 }
      }
    ],
    projectName: 'Company Profile Video',
    description:
      'Professional company profile video with motion graphics and drone footage',
    status: 'completed',
    timeline: 'Flexible (8-12 weeks)',
    projectStatus: 'new',
    submittedDate: '2025-09-15',
    startDate: '2025-09-20',
    completedDate: '2025-12-18',
    estimatedTotal: { min: 9000000, max: 18000000 },
    finalPrice: 14000000,
    paid: 14000000,
    revenue: 14000000,
    category: 'creative',
    revisionCount: 1,
    maxRevisions: 3,
    contactMethod: 'email',
    contactTime: 'flexible',
    companyName: '',
    companyWebsite: '',
    additionalServices: [],
    referralSource: 'previous-client',
    files: [],
    notes: [
      {
        id: 1,
        author: 'Admin User',
        text: 'Excellent collaboration, repeat client potential',
        timestamp: '2025-12-18T17:30:00Z',
        type: 'internal'
      }
    ],
    statusHistory: [
      {
        status: 'pending_review',
        timestamp: '2025-09-15T15:10:00Z',
        changedBy: 'System',
        note: 'Project request submitted'
      },
      {
        status: 'dealing',
        timestamp: '2025-09-16T09:30:00Z',
        changedBy: 'Admin User',
        note: 'Quote accepted'
      },
      {
        status: 'in_progress',
        timestamp: '2025-09-20T08:00:00Z',
        changedBy: 'Admin User',
        note: 'Shooting scheduled'
      },
      {
        status: 'completed',
        timestamp: '2025-12-18T14:00:00Z',
        changedBy: 'Admin User',
        note: 'Final video delivered and approved'
      }
    ],
    paymentHistory: [
      {
        id: 1,
        type: 'DP (50%)',
        amount: 7000000,
        status: 'paid',
        paidDate: '2025-09-19T13:20:00Z',
        method: 'Bank Transfer',
        note: 'BCA - Verified'
      },
      {
        id: 2,
        type: 'Final (50%)',
        amount: 7000000,
        status: 'paid',
        paidDate: '2025-12-18T15:30:00Z',
        method: 'Bank Transfer',
        note: 'BCA - Verified'
      }
    ]
  }
]

// Status definitions
export const PROJECT_STATUS = {
  PENDING_REVIEW: {
    value: 'pending_review',
    label: 'Pending Review',
    color: 'bg-gray-500',
    description: 'Request submitted, waiting for team review'
  },
  DEALING: {
    value: 'dealing',
    label: 'Price Negotiation',
    color: 'bg-yellow-500',
    description: 'Under price negotiation with client'
  },
  IN_PROGRESS: {
    value: 'in_progress',
    label: 'In Progress',
    color: 'bg-blue-500',
    description: 'Project is being worked on'
  },
  IN_REVISION: {
    value: 'in_revision',
    label: 'In Revision',
    color: 'bg-orange-500',
    description: 'Client requested revisions'
  },
  COMPLETED: {
    value: 'completed',
    label: 'Completed',
    color: 'bg-green-500',
    description: 'Project completed and delivered'
  }
}

// Helper functions
export const getProjectsByStatus = status => {
  return dummyProjects.filter(p => p.status === status)
}

export const getTotalRevenue = () => {
  return dummyProjects.reduce((sum, p) => sum + p.revenue, 0)
}

export const getProjectsByCategory = category => {
  return dummyProjects.filter(p => p.category === category)
}

export const getProjectById = id => {
  return dummyProjects.find(p => p.id === id)
}

export const searchProjects = (query) => {
  const lowerQuery = query.toLowerCase()
  return dummyProjects.filter(
    p =>
      p.id.toLowerCase().includes(lowerQuery) ||
      p.clientName.toLowerCase().includes(lowerQuery) ||
      p.projectName.toLowerCase().includes(lowerQuery) ||
      p.email.toLowerCase().includes(lowerQuery)
  )
}

export const filterProjects = (filters) => {
  let filtered = [...dummyProjects]

  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(p => p.status === filters.status)
  }

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(p => p.category === filters.category)
  }

  if (filters.timeline && filters.timeline !== 'all') {
    filtered = filtered.filter(p => p.timeline === filters.timeline)
  }

  if (filters.dateFrom) {
    filtered = filtered.filter(
      p => new Date(p.submittedDate) >= new Date(filters.dateFrom)
    )
  }

  if (filters.dateTo) {
    filtered = filtered.filter(
      p => new Date(p.submittedDate) <= new Date(filters.dateTo)
    )
  }

  return filtered
}