import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/page-metadata'
import { FAQPage } from '@/views/FAQPage'

export const metadata = buildPageMetadata(PAGE_SEO.faq)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.faq} />
      <FAQPage />
    </>
  )
}
