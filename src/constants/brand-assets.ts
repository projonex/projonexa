/** Canonical brand logo served from /public */
export const BRAND_LOGO = {
  src: '/logo.png',
  alt: 'Projonexa',
  width: 1024,
  height: 1024,
} as const

/** Smaller logo variants for header/footer (generated from logo.png) */
export const BRAND_LOGO_SIZES = {
  sm: '/logo-128.png',
  md: '/logo-256.png',
} as const

/** Browser tab, home screen, and PWA icons (generated from logo.png) */
export const BRAND_ICONS = {
  favicon16: '/favicon-16.png',
  favicon32: '/favicon-32.png',
  appleTouch: '/apple-touch-icon.png',
  pwa192: '/icon-192.png',
  pwa512: '/icon-512.png',
} as const

/** @deprecated Use BRAND_ICONS.favicon32 */
export const BRAND_ICON_32 = BRAND_ICONS.favicon32

/** @deprecated Use BRAND_ICONS.appleTouch */
export const BRAND_ICON_180 = BRAND_ICONS.appleTouch

/** @deprecated Use BRAND_ICONS.pwa512 */
export const BRAND_ICON_512 = BRAND_ICONS.pwa512
