import { BLOG_POSTS, blogPath } from '@/data/blog'
import { BRAND } from '@/data/brand'
import { MY_PROJECTS, projectPath } from '@/data/projects'
import { PAGE_SEO } from '@/data/seo'
import type { PageSEO } from './seo-types'

/** Paths omitted from sitemap (redirects or non-indexable). */
const EXCLUDED_PATHS = new Set(['/research', '/404'])

/** High-intent landing pages refreshed more often in search signals. */
const WEEKLY_PATHS = new Set([
  '/',
  '/college-projects',
  '/client-projects',
  '/services',
  '/pricing',
  '/portfolio',
  '/faq',
  '/blog',
  '/contact',
])

export type SitemapEntry = {
  path: string
  intent: PageSEO['intent']
  lastModified: Date
}

function isIndexablePath(pathname: string) {
  if (!pathname || EXCLUDED_PATHS.has(pathname)) return false
  if (pathname.includes(':') || pathname.includes('*') || pathname.includes('[')) return false
  return true
}

export function collectSitemapEntries(date = new Date()): SitemapEntry[] {
  const fromSeo = Object.values(PAGE_SEO)
    .filter((page) => isIndexablePath(page.path) && !page.robotsNoIndex)
    .map((page) => ({
      path: page.path,
      intent: page.intent,
      lastModified: date,
    }))

  const fromProjects = MY_PROJECTS.map((project) => ({
    path: projectPath(project.id),
    intent: 'informational' as const,
    lastModified: date,
  }))

  const fromBlog = BLOG_POSTS.map((post) => ({
    path: blogPath(post.id),
    intent: 'informational' as const,
    lastModified: new Date(post.date),
  }))

  const seen = new Set<string>()
  return [...fromSeo, ...fromProjects, ...fromBlog].filter((entry) => {
    if (seen.has(entry.path)) return false
    seen.add(entry.path)
    return true
  })
}

export function sitemapPriority(pathname: string, intent: PageSEO['intent']): number {
  if (pathname === '/') return 1
  if (pathname === '/college-projects' || pathname === '/client-projects') return 0.98
  if (pathname === '/inquiry/students' || pathname === '/inquiry/corporate') return 0.96
  if (pathname === '/services') return 0.95
  if (intent === 'transactional') return 0.95
  if (pathname === '/faq') return 0.88
  if (pathname === '/blog') return 0.85
  if (intent === 'commercial') return 0.9
  if (pathname.startsWith('/blog/')) return 0.75
  if (intent === 'navigational') return 0.7
  return 0.8
}

export function sitemapChangeFrequency(
  pathname: string,
  intent: PageSEO['intent'],
): 'weekly' | 'monthly' {
  if (WEEKLY_PATHS.has(pathname)) return 'weekly'
  if (intent === 'transactional' || intent === 'commercial') return 'weekly'
  return 'monthly'
}

/** ISO 8601 date (YYYY-MM-DD) for static sitemap.xml output. */
export function formatSitemapLastMod(date: Date): string {
  return date.toISOString().slice(0, 10)
}

/** Sort entries: highest priority first, then path alphabetically. */
export function sortSitemapEntries(entries: SitemapEntry[]): SitemapEntry[] {
  return [...entries].sort((a, b) => {
    const priorityDiff =
      sitemapPriority(b.path, b.intent) - sitemapPriority(a.path, a.intent)
    if (priorityDiff !== 0) return priorityDiff
    return a.path.localeCompare(b.path)
  })
}

export function absoluteUrl(path: string): string {
  return `${BRAND.url}${path === '/' ? '' : path}`
}
