import { AEO_DEFINITION, BRAND, FOUNDER, GEO } from '@/data/brand';
import type { ArticleMeta, BreadcrumbItem, SearchIntent } from './seo-types'

import { SERVICES } from '@/data/services';

type FAQ = { question: string; answer: string }

export function organizationSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BRAND.url}/#organization`,
    name: BRAND.name,
    url: BRAND.url,
    logo: {
      '@type': 'ImageObject',
      url: `${BRAND.url}/logo.png`,
      width: 1024,
      height: 1024,
    },
    description,
    slogan: BRAND.tagline,
    email: BRAND.email,
    foundingDate: '2026',
    founder: {
      '@type': 'Person',
      name: FOUNDER.name,
      jobTitle: 'Founder & CEO',
      url: FOUNDER.linkedin,
      sameAs: [FOUNDER.linkedin, FOUNDER.github],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: GEO.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    areaServed: GEO.areaServed.map((place) => ({
      '@type': 'Place',
      name: place,
    })),
    sameAs: [FOUNDER.linkedin, FOUNDER.github, 'https://github.com/projonexa/projonexa'],
    knowsAbout: [
      'Projonexa',
      'Custom Software Development',
      'Production-Ready Software Development',
      'Startup MVP Development',
      'Custom Software for Startups',
      'Artificial Intelligence',
      'Machine Learning',
      'Web Application Development',
      'Mobile Application Development',
      'IoT Development',
      'Technical Documentation',
      'Final Year Projects',
      'College Engineering Projects',
      'Engineering Projects',
      'Student Affiliate Program',
      'Referral Commission Programs',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: BRAND.email,
      availableLanguage: ['English', 'Hindi'],
      areaServed: GEO.countryCode,
    },
  }
}

/** Local / geographic business schema (GEO) */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BRAND.url}/#localbusiness`,
    name: BRAND.name,
    image: `${BRAND.url}/logo.png`,
    url: BRAND.url,
    email: BRAND.email,
    description: AEO_DEFINITION,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      addressCountry: GEO.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    areaServed: GEO.areaServed,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Projonexa Project Development Services',
      itemListElement: SERVICES.slice(0, 6).map((s, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
          provider: { '@id': `${BRAND.url}/#organization` },
          areaServed: GEO.country,
        },
      })),
    },
    parentOrganization: { '@id': `${BRAND.url}/#organization` },
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BRAND.url}/#website`,
    name: BRAND.name,
    url: BRAND.url,
    description: AEO_DEFINITION,
    inLanguage: GEO.language,
    publisher: { '@id': `${BRAND.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BRAND.url}/faq?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function webPageSchema(
  title: string,
  description: string,
  path: string,
) {
  const url = `${BRAND.url}${path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}/#webpage`,
    url,
    name: title,
    description,
    inLanguage: GEO.language,
    isPartOf: { '@id': `${BRAND.url}/#website` },
    about: { '@id': `${BRAND.url}/#organization` },
    publisher: { '@id': `${BRAND.url}/#organization` },
  }
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BRAND.url,
      },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: `${BRAND.url}${item.path}`,
      })),
    ],
  }
}

/** FAQ schema for AEO — consumed by Google, Bing, and AI answer engines */
export function faqPageSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function serviceCatalogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Projonexa Services',
    description: 'End-to-end project development services for students and businesses',
    numberOfItems: SERVICES.length,
    itemListElement: SERVICES.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.description,
        provider: { '@id': `${BRAND.url}/#organization` },
        areaServed: GEO.areaServed,
        serviceType: s.title,
      },
    })),
  }
}

export function collegeProjectsServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BRAND.url}/college-projects#service`,
    name: 'College Engineering Project Development',
    serviceType: 'Final Year and Mini Engineering Projects',
    provider: { '@id': `${BRAND.url}/#organization` },
    areaServed: GEO.areaServed,
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
    description:
      'End-to-end final year and mini engineering college projects in India with source code, SRS, report, PPT, deployment support, and viva preparation.',
    url: `${BRAND.url}/college-projects`,
    offers: {
      '@type': 'Offer',
      url: `${BRAND.url}/inquiry/students`,
      availability: 'https://schema.org/InStock',
    },
  }
}

export function clientProjectsServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BRAND.url}/client-projects#service`,
    name: 'Startup MVP and Custom App Development',
    serviceType: 'Web and Mobile Application Development for Startups',
    provider: { '@id': `${BRAND.url}/#organization` },
    areaServed: GEO.areaServed,
    audience: {
      '@type': 'BusinessAudience',
    },
    description:
      'Production-ready startup MVPs and custom web or mobile applications in India with scoped quotes, documentation, deployment, and handover.',
    url: `${BRAND.url}/client-projects`,
    offers: {
      '@type': 'Offer',
      url: `${BRAND.url}/inquiry/corporate`,
      availability: 'https://schema.org/InStock',
    },
  }
}

/** BlogPosting schema for article pages — AEO / rich results */
export function blogPostingSchema(path: string, article: ArticleMeta, description: string) {
  const url = `${BRAND.url}${path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}/#article`,
    headline: article.headline,
    description,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author,
      url: FOUNDER.linkedin,
    },
    publisher: { '@id': `${BRAND.url}/#organization` },
    mainEntityOfPage: { '@id': `${url}/#webpage` },
    inLanguage: GEO.language,
    keywords: article.keywords.join(', '),
    url,
  }
}

export function speakableWebPageSchema(path: string, cssSelectors: string[]) {
  const url = `${BRAND.url}${path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}/#speakable`,
    url,
    isPartOf: { '@id': `${BRAND.url}/#website` },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  }
}

export function buildStructuredData(options: {
  title: string
  description: string
  path: string
  intent: SearchIntent
  breadcrumb?: BreadcrumbItem[]
  faqSchema?: boolean
  serviceSchema?: boolean
  faqItems?: FAQ[]
  article?: ArticleMeta
}) {
  const schemas: object[] = [
    organizationSchema(options.description),
    webSiteSchema(),
    localBusinessSchema(),
    webPageSchema(options.title, options.description, options.path),
  ]

  if (options.path === '/college-projects') {
    schemas.push(collegeProjectsServiceSchema())
    schemas.push(
      speakableWebPageSchema(options.path, [
        'h1',
        '[itemProp="headline"]',
        '[itemProp="description"]',
      ]),
    )
  }

  if (options.path === '/client-projects') {
    schemas.push(clientProjectsServiceSchema())
    schemas.push(
      speakableWebPageSchema(options.path, [
        'h1',
        '[itemProp="headline"]',
        '[itemProp="description"]',
      ]),
    )
  }

  if (options.path === '/') {
    schemas.push(
      speakableWebPageSchema(options.path, [
        'h2',
        '[itemProp="description"]',
        '#aeo-overview-heading',
      ]),
    )
  }

  if (options.breadcrumb?.length) {
    schemas.push(breadcrumbSchema(options.breadcrumb))
  }

  if (options.article) {
    schemas.push(blogPostingSchema(options.path, options.article, options.description))
    schemas.push(
      speakableWebPageSchema(options.path, [
        'h1',
        '[itemProp="headline"]',
        '[data-aeo="quick-answer"]',
      ]),
    )
  }

  if (options.faqSchema) {
    const faqs = options.faqItems ?? []
    if (faqs.length > 0) {
      schemas.push(faqPageSchema(faqs))
    }
  }

  if (
    options.intent === 'commercial' ||
    options.intent === 'transactional' ||
    options.serviceSchema
  ) {
    schemas.push(serviceCatalogSchema())
  }

  return schemas
}
