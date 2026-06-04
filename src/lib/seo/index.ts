export type {
  Audience,
  BreadcrumbItem,
  PageSEO,
  SearchIntent,
} from './seo-types'

export { buildPageMetadata, structuredDataForPage } from './page-metadata'
export { buildRootSiteMetadata, SITE_ICONS } from './site-metadata'
export { buildProjectSEO } from './project-seo'
export { buildCareersApplySeo } from './careers-apply-seo'
export {
  absoluteUrl,
  collectSitemapEntries,
  sitemapChangeFrequency,
  sitemapPriority,
} from './sitemap-urls'
export { buildStructuredData } from './structured-data'
export { resolveOgImagePath, resolveShareMeta } from './social-share'
export { SEO_RULES } from './seo-rules'
