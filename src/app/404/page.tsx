import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/page-metadata'
import { NotFoundPage } from '@/views/NotFoundPage'

export const metadata = buildPageMetadata(PAGE_SEO.notFound)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.notFound} />
      <NotFoundPage />
    </>
  )
}
