import { BRAND } from '@/data/brand'

/**
 * Square brand logos for Google Search (Organization logo) and schema.org.
 * Google requires: square, ≥112×112, crawlable HTTPS URL, PNG/JPG/GIF.
 * @see https://developers.google.com/search/docs/appearance/site-names
 */
export const BRAND_LOGO_SCHEMA = {
  /** Primary logo for Google Search site icon / Organization markup (512×512, optimized) */
  primary: {
    path: '/icon-512.png',
    width: 512,
    height: 512,
  },
  /** High-resolution variant for rich results */
  large: {
    path: '/logo.png',
    width: 1024,
    height: 1024,
  },
} as const

export function brandLogoAbsoluteUrl(variant: keyof typeof BRAND_LOGO_SCHEMA = 'primary'): string {
  return `${BRAND.url}${BRAND_LOGO_SCHEMA[variant].path}`
}

/** schema.org ImageObject — used in Organization JSON-LD for Google logo indexing */
export function brandLogoImageObject(variant: keyof typeof BRAND_LOGO_SCHEMA = 'primary') {
  const { path, width, height } = BRAND_LOGO_SCHEMA[variant]
  const url = `${BRAND.url}${path}`
  return {
    '@type': 'ImageObject' as const,
    '@id': `${url}#logo`,
    url,
    contentUrl: url,
    width,
    height,
    caption: `${BRAND.name} logo`,
  }
}
