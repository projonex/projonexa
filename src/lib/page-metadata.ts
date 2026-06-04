import type { Metadata } from 'next'
import { BRAND_ICONS } from '@/constants/brand-assets'
import { BRAND, FOUNDER, GEO } from '@/data/brand'
import { AEO_HOME_FAQ } from '@/data/seo'
import type { PageSEO } from '@/lib/seo-types'
import { resolveShareMeta } from '@/lib/social-share'
import { buildStructuredData } from '@/lib/structured-data'

export function buildPageMetadata(seo: PageSEO): Metadata {
  const share = resolveShareMeta(seo)
  const robots = seo.robotsNoIndex
    ? { index: false as const, follow: true as const }
    : {
        index: true as const,
        follow: true as const,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      }

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: FOUNDER.name }],
    creator: FOUNDER.name,
    robots,
    alternates: { canonical: share.url },
    openGraph: {
      type: 'website',
      url: share.url,
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
    other: {
      'geo.region': GEO.countryCode,
      'geo.placename': GEO.placename,
      'geo.position': `${GEO.latitude};${GEO.longitude}`,
      ICBM: `${GEO.latitude}, ${GEO.longitude}`,
      language: 'English',
      'content-language': GEO.language,
    },
    icons: {
      icon: [
        { url: BRAND_ICONS.favicon16, sizes: '16x16', type: 'image/png' },
        { url: BRAND_ICONS.favicon32, sizes: '32x32', type: 'image/png' },
      ],
      shortcut: BRAND_ICONS.favicon32,
      apple: { url: BRAND_ICONS.appleTouch, sizes: '180x180' },
    },
    applicationName: BRAND.name,
    appleWebApp: { title: BRAND.name },
    manifest: '/site.webmanifest',
    metadataBase: new URL(BRAND.url),
  }
}

/** Structured data schemas for JsonLd component (paired with buildPageMetadata). */
export function structuredDataForPage(seo: PageSEO) {
  const faqItems = seo.faqItems ?? (seo.path === '/' ? [...AEO_HOME_FAQ] : undefined)
  return buildStructuredData({
    title: seo.title,
    description: seo.description,
    path: seo.path,
    intent: seo.intent,
    breadcrumb: seo.breadcrumb,
    faqSchema: seo.faqSchema,
    serviceSchema: seo.serviceSchema,
    faqItems,
  })
}
