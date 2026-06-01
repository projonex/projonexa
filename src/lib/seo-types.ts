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
}
