import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/seo/page-metadata'
import { ServicesPage } from '@/views/ServicesPage'

export const metadata = buildPageMetadata(PAGE_SEO.services)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.services} />
      <ServicesPage />
    </>
  )
}
