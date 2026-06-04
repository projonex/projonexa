import type { MetadataRoute } from 'next'
import {
  absoluteUrl,
  collectSitemapEntries,
  sitemapChangeFrequency,
  sitemapPriority,
} from '@/lib/sitemap-urls'

export default function sitemap(): MetadataRoute.Sitemap {
  return collectSitemapEntries().map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: entry.lastModified,
    changeFrequency: sitemapChangeFrequency(entry.intent),
    priority: sitemapPriority(entry.path, entry.intent),
  }))
}
