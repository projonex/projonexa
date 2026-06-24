import { AEO_DEFINITION, BRAND, FOUNDER, GEO } from '@/data/brand';
import type { ArticleMeta, BreadcrumbItem, SearchIntent } from './seo-types'

import { SERVICES } from '@/data/services';
import { brandLogoImageObject } from './brand-logo-schema';

type FAQ = { question: string; answer: string }

/** Pages with SpeakableSpecification for voice / AI answer engines (AEO). */
const SPEAKABLE_PAGES: Record<string, string[]> = {
  '/': ['h2', '[itemProp="description"]', '#aeo-overview-heading'],
  '/college-projects': ['h1', '[itemProp="headline"]', '[itemProp="description"]'],
  '/client-projects': ['h1', '[itemProp="headline"]', '[itemProp="description"]'],
  '/services': ['h1', '[itemProp="description"]'],
  '/faq': ['h1', '[itemProp="name"]'],
  '/pricing': ['h1', '[itemProp="description"]'],
  '/about': ['h1', '[itemProp="description"]'],
}

function geoAreaServedSchema() {
  return [
    { '@type': 'Country', name: GEO.country },
    { '@type': 'Place', name: 'Global' },
    ...GEO.serviceCities.map((city) => ({
      '@type': 'City',
      name: city,
      containedInPlace: { '@type': 'Country', name: GEO.country },
    })),
  ]
}

/** Full-detail Person schema for founder — EEAT signal for Google Quality Rater guidelines */
export function founderPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BRAND.url}/#founder`,
    name: FOUNDER.name,
    jobTitle: 'Founder & CEO',
    worksFor: { '@id': `${BRAND.url}/#organization` },
    url: FOUNDER.linkedin,
    email: FOUNDER.email,
    sameAs: [
      FOUNDER.linkedin,
      FOUNDER.github,
    ],
    knowsAbout: [
      'Software Engineering',
      'Startup MVP Development',
      'Custom Software Development',
      'Artificial Intelligence',
      'Machine Learning',
      'Web Application Development',
      'Mobile Application Development',
      'Final Year Engineering Projects',
      'Academic Project Delivery',
      'Technical Documentation',
    ],
    nationality: { '@type': 'Country', name: GEO.country },
  }
}

export function organizationSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BRAND.url}/#organization`,
    name: BRAND.name,
    alternateName: ['Projonexa India', 'Projonexa Technologies'],
    url: BRAND.url,
    logo: brandLogoImageObject('primary'),
    image: brandLogoImageObject('primary'),
    description,
    slogan: BRAND.tagline,
    email: BRAND.email,
    foundingDate: '2026',
    founder: { '@id': `${BRAND.url}/#founder` },
    address: {
      '@type': 'PostalAddress',
      addressCountry: GEO.countryCode,
      addressRegion: 'India',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    areaServed: geoAreaServedSchema(),
    sameAs: [
      FOUNDER.linkedin,
      FOUNDER.github,
      'https://github.com/projonexa/projonexa',
      'https://github.com/nikobuddy',
    ],
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
      'Engineering Projects for Students',
      'BCA MCA Final Year Projects',
      'MBA Project Help India',
      'Pharmacy College Projects',
      'Python Machine Learning Projects',
      'React MERN Stack Projects',
      'Flutter Mobile App Projects',
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
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 10,
      maxValue: 200,
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
    image: `${BRAND.url}/icon-512.png`,
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
    areaServed: geoAreaServedSchema(),
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
        areaServed: geoAreaServedSchema(),
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
    name: 'College & Academic Project Development — All Streams',
    serviceType: 'Affordable Final Year, Mini, and Major College Projects',
    provider: { '@id': `${BRAND.url}/#organization` },
    areaServed: geoAreaServedSchema(),
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
    description:
      'Affordable end-to-end college projects in India for Engineering, Diploma, BCA, MCA, MBA, Pharmacy, Commerce, Science, Law, and more — source code, SRS, report, PPT, deployment support, and viva preparation.',
    url: `${BRAND.url}/college-projects`,
    offers: {
      '@type': 'Offer',
      url: `${BRAND.url}/inquiry/students`,
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'INR',
        description: 'Scope-based student-friendly pricing — transparent quote before development',
      },
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
    areaServed: geoAreaServedSchema(),
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

/** HowTo schema — student inquiry process; renders as rich result with numbered steps in Google */
export function studentInquiryHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Get Your College Project from Projonexa',
    description:
      'A step-by-step guide to getting an affordable, complete final year or college project from Projonexa — from inquiry to viva preparation.',
    totalTime: 'P7D',
    supply: [
      { '@type': 'HowToSupply', name: 'Project requirements (topic, branch, deadline)' },
      { '@type': 'HowToSupply', name: 'University guidelines (if specific format needed)' },
    ],
    tool: [
      { '@type': 'HowToTool', name: 'Student inquiry form at projonexa.com/inquiry/students' },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Submit Student Inquiry',
        text: 'Go to https://www.projonexa.com/inquiry/students. Select your category (Engineering, BCA, MCA, MBA, Pharmacy, etc.), program, branch, and project domain. Add your timeline and any specific requirements.',
        url: `${BRAND.url}/inquiry/students`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Receive Scoped Quote',
        text: 'Projonexa responds within 24 hours with topic suggestions, full scope, pricing, and timeline. You discuss and finalise the project topic and deliverables together.',
        url: `${BRAND.url}/contact`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Confirm & Project Begins',
        text: 'After you confirm the quote, the assigned developer starts the project. You receive milestone updates — design, development, testing, and documentation.',
        url: `${BRAND.url}/college-projects`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Receive Deliverables',
        text: 'You receive complete source code, SRS, project report, PPT, and deployment guidance — all formatted to your university guidelines.',
        url: `${BRAND.url}/college-projects`,
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Viva Preparation',
        text: 'Projonexa conducts a code walkthrough and mock viva session — covering expected questions, demo script, and presentation coaching so you can explain the project confidently.',
        url: `${BRAND.url}/college-projects`,
      },
    ],
  }
}

/** HowTo schema for the client/startup inquiry process */
export function clientInquiryHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Build Your Startup MVP with Projonexa',
    description:
      'How founders and businesses submit a product inquiry and get a production-ready MVP or custom software built by Projonexa.',
    totalTime: 'P21D',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Submit Corporate Inquiry',
        text: 'Go to https://www.projonexa.com/inquiry/corporate. Describe your product vision, required features, target users, tech preferences, and delivery timeline.',
        url: `${BRAND.url}/inquiry/corporate`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Discovery & Scoping',
        text: 'Projonexa reviews your requirements and schedules a discovery call. You receive a detailed scope document, recommended tech stack, milestone plan, and transparent quote.',
        url: `${BRAND.url}/client-projects`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Development Milestones',
        text: 'Sprint-based development with regular updates, demos, and review checkpoints. Architecture, backend, frontend, and integrations delivered iteratively.',
        url: `${BRAND.url}/client-projects`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Deployment & Handover',
        text: 'Production deployment, technical documentation, architecture diagrams, and a clean handover with post-launch support window so your team can maintain and iterate.',
        url: `${BRAND.url}/client-projects`,
      },
    ],
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
    founderPersonSchema(),
    organizationSchema(options.description),
    webSiteSchema(),
    localBusinessSchema(),
    webPageSchema(options.title, options.description, options.path),
  ]

  if (options.path === '/college-projects') {
    schemas.push(collegeProjectsServiceSchema())
    schemas.push(studentInquiryHowToSchema())
  }

  if (options.path === '/client-projects') {
    schemas.push(clientProjectsServiceSchema())
    schemas.push(clientInquiryHowToSchema())
  }

  if (options.path === '/inquiry/students') {
    schemas.push(studentInquiryHowToSchema())
  }

  if (options.path === '/inquiry/corporate') {
    schemas.push(clientInquiryHowToSchema())
  }

  const speakableSelectors = SPEAKABLE_PAGES[options.path]
  if (speakableSelectors) {
    schemas.push(speakableWebPageSchema(options.path, speakableSelectors))
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
