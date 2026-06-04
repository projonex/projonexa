import type { Metadata } from 'next'
import { BRAND, FOUNDER, GEO } from '@/data/brand'
import { AEO_HOME_FAQ } from '@/data/seo'
import type { PageSEO } from './seo-types'
import { resolveShareMeta } from './social-share'
import { buildStructuredData } from './structured-data'

export function buildPageMetadata(seo: PageSEO): Metadata {
  const share = resolveShareMeta(seo)
  const robots = seo.robotsNoIndex
    ? {
        index: false as const,
        follow: true as const,
        googleBot: { index: false, follow: true },
      }
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
    title: { absolute: seo.title },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: FOUNDER.name, url: `${BRAND.url}/about` }],
    creator: FOUNDER.name,
    publisher: BRAND.name,
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
