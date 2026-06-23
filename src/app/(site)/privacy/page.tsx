import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/seo/page-metadata'
import { PrivacyPage } from '@/views/PrivacyPage'

export const metadata = buildPageMetadata(PAGE_SEO.privacy)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.privacy} />
      <PrivacyPage />
    </>
  )
}
