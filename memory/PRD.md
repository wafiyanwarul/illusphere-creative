# Illusphere Creative - Product Requirements Document

## Original Problem Statement
Build a premium, dark-themed, one-page website for "Illusphere Creative" tech and creative agency.

## Core Requirements
- Single-page website with smooth-scrolling sections
- Dark theme (#0A0A0A background) with gold accents (#C9A25F)
- Glassmorphism for cards, sharp-cornered buttons
- "Space Grotesk" font for headings
- Mobile responsive design

## Homepage Sections (in order)
1. Hero - IC logo, 3D Spline element, CTA buttons
2. Services - Grid of 6 services (3 tech, 3 creative)
3. Portfolio - Grid with filter buttons (All, Tech, Creative)
4. About - Founder bio, company story, vision/mission
5. Partnership - AIkara AI strategic partner
6. Testimonials - Client testimonials
7. Tech Stack - Infinite scroll marquees with brand logos
8. Contact/CTA - Final call to action
9. Footer

## What's Been Implemented

### December 2025
- ✅ One-page website structure with all sections
- ✅ Scroll-spy navigation with IntersectionObserver
- ✅ Tech Stack marquees with hover color effects
- ✅ Spline 3D integration in hero
- ✅ URL redirects from old pages to section anchors

### January 2026
- ✅ **Background Effects** - Animated gradients, floating particles, custom cursor with trail
- ✅ **Order Services Page** (`/order-services`) - 4-step form with IDR pricing
  - Service selection with complexity dropdowns
  - Real-time price calculation with bundle discount
  - Timeline modifiers (Rush +30%, Flexible -10%, No Deadline -15%)
  - Contact form with Indonesia country code
  - Review page with price breakdown
  - Success screen with Project ID generation

## Prioritized Backlog

### P1 - High Priority
- [ ] Portfolio filtering logic ("All | Tech | Creative" buttons)
- [ ] Backend for Order Form (POST /api/orders, MongoDB storage, email notifications)

### P2 - Medium Priority
- [ ] Portfolio "View Details" modal/overlay functionality
- [ ] Link external URLs (social media, AIkara AI button)
- [ ] Terms of Service and Privacy Policy pages

### P3 - Low Priority (Refactoring)
- [ ] Modularize CSS (split App.css into component files)
- [ ] Add proper image assets for portfolio items
- [ ] Add actual testimonial photos

## Tech Stack
- **Frontend**: React, React Router, Tailwind CSS
- **Animation**: CSS keyframes, IntersectionObserver, Spline 3D
- **Backend**: FastAPI (Python)
- **Database**: MongoDB

## Key Files
- `/app/frontend/src/App.js` - Main app structure
- `/app/frontend/src/components/BackgroundEffects.jsx` - Background effects
- `/app/frontend/src/pages/OrderServicesPage.jsx` - Order form
- `/app/frontend/src/components/Navigation.jsx` - Scroll-spy nav
- `/app/frontend/src/components/TechStackShowcase.jsx` - Tech marquees

## Design System
- Background: #0A0A0A
- Gold Accent: #C9A25F
- Gold Hover: #A8863D
- Text Primary: #FFFFFF
- Text Secondary: #888888
- Card Background: rgba(26, 26, 26, 0.6)
- Border: rgba(255, 255, 255, 0.05)
