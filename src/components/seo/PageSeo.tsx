import { JsonLd } from '@/components/seo/JsonLd'
import type { PageSEO } from '@/lib/seo/seo-types'

/** Server-friendly SEO wrapper: JSON-LD only (metadata via generateMetadata in app routes). */
export function PageSeo({ seo }: { seo: PageSEO }) {
  return <JsonLd seo={seo} />
}
