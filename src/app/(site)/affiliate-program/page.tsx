import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/seo/page-metadata'
import { AffiliateProgramPage } from '@/views/AffiliateProgramPage'

export const metadata = buildPageMetadata(PAGE_SEO.affiliateProgram)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.affiliateProgram} />
      <AffiliateProgramPage />
    </>
  )
}
