import type { MetadataRoute } from 'next'
import {
  absoluteUrl,
  collectSitemapEntries,
  sitemapChangeFrequency,
  sitemapPriority,
  sortSitemapEntries,
} from '@/lib/seo/sitemap-urls'

export default function sitemap(): MetadataRoute.Sitemap {
  return sortSitemapEntries(collectSitemapEntries()).map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: entry.lastModified,
    changeFrequency: sitemapChangeFrequency(entry.path, entry.intent),
    priority: sitemapPriority(entry.path, entry.intent),
  }))
}
