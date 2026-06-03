/** Open Graph / Twitter card images (1200×630 PNG — generated via npm run og:generate) */
export const SOCIAL_IMAGES = {
  default: '/og/og-default.png',
  home: '/og/og-home.png',
  college: '/og/og-college-projects.png',
  client: '/og/og-client-projects.png',
  affiliate: '/og/og-affiliate-program.png',
  contact: '/og/og-contact.png',
} as const

export type SocialImageKey = keyof typeof SOCIAL_IMAGES
