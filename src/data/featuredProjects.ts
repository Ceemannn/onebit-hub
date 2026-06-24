export type FeaturedProject = {
  slug: 'aura' | 'attendos' | 'omugwo'
  name: string
  tagline: string
  category: string
  accent: string
  summary: string
  features: string[]
  liveUrl: string
  metrics: { label: string; value: string }[]
}

/**
 * Flagship products Onebit has shipped — featured on the Build page with a live
 * in-browser demo mockup styled in each product's real theme.
 */
export const featuredProjects: FeaturedProject[] = [
  {
    slug: 'aura',
    name: 'Aura',
    tagline: 'Where masterpieces are perfected.',
    category: 'Music collaboration',
    accent: '#F97316',
    summary:
      'A high-fidelity collaboration sandbox for unreleased music — immersive frequency-reactive visualizers, precision timestamped feedback, and instant mobile sync for top-tier producers.',
    features: [
      'Frequency-reactive visualizer engine',
      'Timestamped studio feedback',
      'Real-time collaborator sync',
      'Private, invite-only sessions',
    ],
    liveUrl: 'https://aura.onebithub.com',
    metrics: [
      { label: 'Producers', value: '500+' },
      { label: 'Sync latency', value: '<80ms' },
      { label: 'Visualizers', value: '6' },
    ],
  },
  {
    slug: 'attendos',
    name: 'AttendOS',
    tagline: 'Attendance, without ambiguity.',
    category: 'Attendance platform',
    accent: '#FB6514',
    summary:
      'One platform for QR check-ins, geo-verified presence, kiosk mode, and recurring events — real-time, auditable and effortless for any organization.',
    features: [
      'QR & badge check-in',
      'Geo-verified presence',
      'Kiosk mode for events',
      'Auditable real-time logs',
    ],
    liveUrl: 'https://attendance-os.vercel.app',
    metrics: [
      { label: 'People tracked', value: '50K+' },
      { label: 'Organizations', value: '2,000+' },
      { label: 'Uptime', value: '99.9%' },
    ],
  },
  {
    slug: 'omugwo',
    name: 'Academy Admin',
    tagline: 'Run your whole school from one portal.',
    category: 'School admin portal',
    accent: '#7C3AED',
    summary:
      'A standalone administration platform for schools — manage students, classes, attendance, results and revenue with live analytics, a course catalog and a built-in site builder.',
    features: [
      'Student & staff management',
      'Attendance & results tracking',
      'Revenue & enrollment analytics',
      'Course catalog & site builder',
    ],
    liveUrl: 'https://omugwo-academy.vercel.app/admin',
    metrics: [
      { label: 'Students', value: '480+' },
      { label: 'Modules', value: '16' },
      { label: 'Setup', value: 'Days' },
    ],
  },
]
