import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/seo/page-metadata'
import { ContactPage } from '@/views/ContactPage'

export const metadata = buildPageMetadata(PAGE_SEO.contact)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.contact} />
      <ContactPage />
    </>
  )
}
