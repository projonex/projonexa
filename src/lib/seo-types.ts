export type SearchIntent = 'informational' | 'commercial' | 'transactional' | 'navigational'

export type Audience = 'students' | 'startups' | 'businesses' | 'mixed'

export interface BreadcrumbItem {
  name: string
  path: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface CTRVariantSet {
  titles: string[]
  descriptions: string[]
}

export interface PageSEO {
  title: string
  description: string
  keywords: string[]
  path: string
  primaryKeyword: string
  secondaryKeywords: string[]
  intent: SearchIntent
  audience: Audience
  conversionGoal: string
  aeoQuestions?: string[]
  ctrVariants?: CTRVariantSet
  faqItems?: FAQItem[]
  breadcrumb?: BreadcrumbItem[]
  faqSchema?: boolean
  serviceSchema?: boolean
  /** Shorter title for WhatsApp / LinkedIn / X link previews */
  shareTitle?: string
  /** Shorter description for social crawlers (≤200 chars recommended) */
  shareDescription?: string
  /** Path or absolute URL; defaults from route → /og/*.png */
  ogImage?: string
  ogImageAlt?: string
  /** When true, adds noindex for error/utility pages */
  robotsNoIndex?: boolean
}
