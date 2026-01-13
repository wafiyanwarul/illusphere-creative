// Dummy project data for admin dashboard
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
    submittedDate: '2026-01-05',
    startDate: '2026-01-10',
    estimatedCompletion: '2026-03-05',
    estimatedTotal: { min: 19000000, max: 43000000 },
    finalPrice: 32000000,
    paid: 16000000, // 50% DP
    revenue: 16000000, // Revenue = amount paid so far
    category: 'tech',
    revisionCount: 1,
    maxRevisions: 3
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
    submittedDate: '2025-10-15',
    startDate: '2025-10-20',
    completedDate: '2026-01-08',
    estimatedTotal: 7000000,
    finalPrice: 7000000,
    paid: 7000000, // Fully paid
    revenue: 7000000,
    category: 'creative',
    revisionCount: 2,
    maxRevisions: 3
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
    submittedDate: '2025-11-20',
    startDate: '2025-11-25',
    estimatedCompletion: '2026-02-15',
    estimatedTotal: { min: 31000000, max: 62000000 },
    finalPrice: 45000000,
    paid: 22500000, // 50% DP
    revenue: 22500000,
    category: 'tech',
    revisionCount: 2,
    maxRevisions: 3
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
    submittedDate: '2026-01-10',
    startDate: null,
    estimatedCompletion: null,
    estimatedTotal: { min: 6500000, max: 15600000 }, // +30% rush fee
    finalPrice: null, // Not yet negotiated
    paid: 0,
    revenue: 0, // No revenue yet (pending)
    category: 'creative',
    revisionCount: 0,
    maxRevisions: 3
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
    submittedDate: '2026-01-08',
    startDate: null,
    estimatedCompletion: null,
    estimatedTotal: { min: 15000000, max: 30000000 },
    finalPrice: null, // Under negotiation
    paid: 0,
    revenue: 0,
    category: 'tech',
    revisionCount: 0,
    maxRevisions: 3
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
    submittedDate: '2025-09-15',
    startDate: '2025-09-20',
    completedDate: '2025-12-18',
    estimatedTotal: { min: 9000000, max: 18000000 }, // -10% flexible discount
    finalPrice: 14000000,
    paid: 14000000,
    revenue: 14000000,
    category: 'creative',
    revisionCount: 1,
    maxRevisions: 3
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
