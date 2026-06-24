import type { MetadataRoute } from 'next'
import { BRAND } from '@/data/brand'

/** Paths that should never be crawled or indexed. */
const PRIVATE_PATHS = [
  '/api/',
  '/consultation/reschedule',
  '/affiliate-program/eligibility',
  '/404',
]

/** Allow-all rules for AI crawlers — all public content is citable. */
const AI_ALLOW_RULE = (userAgent: string): MetadataRoute.Robots['rules'][number] => ({
  userAgent,
  allow: '/',
  disallow: PRIVATE_PATHS,
})

export default function robots(): MetadataRoute.Robots {
  return {
    host: BRAND.url,
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      AI_ALLOW_RULE('GPTBot'),
      AI_ALLOW_RULE('ChatGPT-User'),
      AI_ALLOW_RULE('Google-Extended'),
      AI_ALLOW_RULE('anthropic-ai'),
      AI_ALLOW_RULE('ClaudeBot'),
      AI_ALLOW_RULE('PerplexityBot'),
      AI_ALLOW_RULE('Applebot-Extended'),
      AI_ALLOW_RULE('cohere-ai'),
    ],
    sitemap: `${BRAND.url}/sitemap.xml`,
  }
}
