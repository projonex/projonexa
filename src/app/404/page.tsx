import { SiteNotFound } from '@/components/layout/SiteNotFound'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/page-metadata'

export const metadata = buildPageMetadata(PAGE_SEO.notFound)

export default function Page() {
  return <SiteNotFound />
}
