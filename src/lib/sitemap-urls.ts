import { BRAND } from '@/data/brand'
import { MY_PROJECTS, projectPath } from '@/data/projects'
import { PAGE_SEO } from '@/data/seo'
import type { PageSEO } from '@/lib/seo-types'

/** Paths omitted from sitemap (redirects or non-indexable). */
const EXCLUDED_PATHS = new Set(['/research', '/404'])

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

  const seen = new Set<string>()
  return [...fromSeo, ...fromProjects].filter((entry) => {
    if (seen.has(entry.path)) return false
    seen.add(entry.path)
    return true
  })
}

export function sitemapPriority(pathname: string, intent: PageSEO['intent']): number {
  if (pathname === '/') return 1
  if (intent === 'transactional') return 0.95
  if (intent === 'commercial') return 0.9
  if (intent === 'navigational') return 0.7
  return 0.8
}

export function sitemapChangeFrequency(intent: PageSEO['intent']): 'weekly' | 'monthly' {
  return intent === 'transactional' || intent === 'commercial' ? 'weekly' : 'monthly'
}

export function absoluteUrl(path: string): string {
  return `${BRAND.url}${path === '/' ? '' : path}`
}
