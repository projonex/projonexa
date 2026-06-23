import { BLOG_POSTS_COMPANY } from './blog-posts-company'
import { BLOG_POSTS_GUIDES } from './blog-posts'

export type BlogCategoryId =
  | 'company'
  | 'academic'
  | 'ai-ml'
  | 'startups'
  | 'web-mobile'
  | 'iot'
  | 'career'
  | 'best-practices'

export interface BlogCategory {
  id: BlogCategoryId
  label: string
  description: string
  color: string
}

export interface BlogSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export interface BlogFAQ {
  question: string
  answer: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: BlogCategoryId
  readTime: string
  date: string
  author: string
  featured?: boolean
  tags: string[]
  keywords: string[]
  /** Concise answer for AEO / featured snippets */
  quickAnswer: string
  sections: BlogSection[]
  faq: BlogFAQ[]
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: 'company',
    label: 'About Projonexa',
    description: 'Who we are, what we deliver, and how our premium technology services help students, startups, and businesses across India.',
    color: '#0EA5E9',
  },
  {
    id: 'academic',
    label: 'Academic & Final Year',
    description: 'Topic selection, mini projects, and college engineering guides for BE, B.Tech, BCA, and MCA students in India.',
    color: '#6C63FF',
  },
  {
    id: 'ai-ml',
    label: 'AI & Machine Learning',
    description: 'Practical AI/ML project ideas, model selection, and implementation pathways for students and startups.',
    color: '#00C8FF',
  },
  {
    id: 'startups',
    label: 'Startups & MVP',
    description: 'Lean MVP strategy, validation, tech stacks, and product development for founders in India.',
    color: '#10B981',
  },
  {
    id: 'web-mobile',
    label: 'Web & Mobile',
    description: 'Full-stack, React, Flutter, and mobile-first development guides for academic and client projects.',
    color: '#F59E0B',
  },
  {
    id: 'iot',
    label: 'IoT & Embedded',
    description: 'Connected devices, sensors, edge computing, and cloud dashboards for engineering projects.',
    color: '#8B5CF6',
  },
  {
    id: 'career',
    label: 'Career & Placements',
    description: 'How projects impact placements, internships, and your engineering portfolio in India.',
    color: '#EC4899',
  },
  {
    id: 'best-practices',
    label: 'Best Practices',
    description: 'SRS, reports, diagrams, testing, and documentation that elevate project evaluation scores.',
    color: '#6366F1',
  },
]

export const BLOG_SECTION = {
  eyebrow: 'Blog',
  title: 'Knowledge Hub for Technology & Project Success',
  lead: 'In-depth articles on Projonexa services, engineering projects, AI, startups, and software development — written so students, founders, and teams get clear answers before they build.',
} as const

export const BLOG_POSTS = [...BLOG_POSTS_COMPANY, ...BLOG_POSTS_GUIDES]

export function blogPath(slug: string) {
  return `/blog/${slug}`
}

export function getBlogBySlug(slug: string | undefined): BlogPost | undefined {
  if (!slug) return undefined
  return BLOG_POSTS.find((post) => post.id === slug)
}

export function getBlogCategory(id: BlogCategoryId): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((cat) => cat.id === id)
}

export function getPostsByCategory(categoryId: BlogCategoryId | 'all'): BlogPost[] {
  const sorted = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
  if (categoryId === 'all') return sorted
  return sorted.filter((post) => post.category === categoryId)
}

export function getFeaturedPost(): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.featured) ?? BLOG_POSTS[0]
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const sameCategory = BLOG_POSTS.filter((p) => p.id !== post.id && p.category === post.category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (sameCategory.length >= limit) return sameCategory.slice(0, limit)

  const others = BLOG_POSTS.filter((p) => p.id !== post.id && p.category !== post.category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return [...sameCategory, ...others].slice(0, limit)
}
