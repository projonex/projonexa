import type { Metadata } from 'next'
import { BRAND_ICONS, BRAND_LOGO } from '@/constants/brand-assets'
import { BRAND, FOUNDER, GEO } from '@/data/brand'
import { PAGE_SEO } from '@/data/seo'
import { resolveShareMeta } from './social-share'

/** Shared favicon / PWA icons — set once on the root layout. */
export const SITE_ICONS: NonNullable<Metadata['icons']> = {
  icon: [
    { url: BRAND_ICONS.favicon32, sizes: '32x32', type: 'image/png' },
    { url: BRAND_ICONS.favicon16, sizes: '16x16', type: 'image/png' },
    { url: BRAND_LOGO.src, sizes: '512x512', type: 'image/png' },
  ],
  shortcut: BRAND_ICONS.favicon32,
  apple: { url: BRAND_ICONS.appleTouch, sizes: '180x180', type: 'image/png' },
  other: [
    { rel: 'icon', url: BRAND_ICONS.pwa192, sizes: '192x192', type: 'image/png' },
  ],
}

const DEFAULT_ROBOTS: Metadata['robots'] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
}

const GEO_OTHER: Metadata['other'] = {
  'geo.region': GEO.countryCode,
  'geo.placename': GEO.placename,
  'geo.position': `${GEO.latitude};${GEO.longitude}`,
  ICBM: `${GEO.latitude}, ${GEO.longitude}`,
  language: 'English',
  'content-language': GEO.language,
  coverage: GEO.country,
  distribution: 'global',
  target: 'all',
}

/** Root layout defaults — inherited and overridden by per-route metadata. */
export function buildRootSiteMetadata(): Metadata {
  const home = PAGE_SEO.home
  const share = resolveShareMeta(home)

  return {
    metadataBase: new URL(BRAND.url),
    title: {
      default: home.title,
      template: `%s | ${BRAND.name}`,
    },
    description: home.description,
    keywords: home.keywords,
    authors: [{ name: FOUNDER.name, url: `${BRAND.url}/about` }],
    creator: FOUNDER.name,
    publisher: BRAND.name,
    category: 'technology',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: DEFAULT_ROBOTS,
    alternates: {
      canonical: BRAND.url,
      languages: { 'en-IN': BRAND.url },
      types: {
        'text/plain': '/llms.txt',
      },
    },
    openGraph: {
      type: 'website',
      url: BRAND.url,
      title: share.title,
      description: share.description,
      siteName: BRAND.name,
      locale: GEO.locale,
      alternateLocale: ['en_US'],
      images: [
        {
          url: share.image,
          secureUrl: share.image,
          type: 'image/png',
          width: 1200,
          height: 630,
          alt: share.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: share.title,
      description: share.description,
      images: [{ url: share.image, alt: share.imageAlt }],
    },
    icons: SITE_ICONS,
    manifest: '/site.webmanifest',
    applicationName: BRAND.name,
    appleWebApp: {
      capable: true,
      title: BRAND.name,
      statusBarStyle: 'black-translucent',
    },
    other: GEO_OTHER,
  }
}
