export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Client solutions', path: '/client-projects' },
  { label: 'College projects', path: '/college-projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Careers', path: '/careers' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
] as const

export const FOOTER_LINKS = {
  company: [
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Careers', path: '/careers' },
  ],
  resources: [
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Client solutions', path: '/client-projects' },
    { label: 'Affiliate program', path: '/affiliate-program' },
  ],
  support: [
    { label: 'College projects', path: '/college-projects' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact', path: '/contact' },
  ],
  legal: [{ label: 'Privacy Policy', path: '/privacy' }],
} as const
