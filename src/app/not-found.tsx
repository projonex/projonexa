import { SiteNotFound } from '@/components/layout/SiteNotFound'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/seo/page-metadata'

export const metadata = buildPageMetadata(PAGE_SEO.notFound)

export default function NotFound() {
  return <SiteNotFound />
}
