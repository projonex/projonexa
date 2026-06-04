import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/page-metadata'
import { AffiliateInquiryPage } from '@/views/AffiliateInquiryPage'

export const metadata = buildPageMetadata(PAGE_SEO.affiliateInquiry)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.affiliateInquiry} />
      <AffiliateInquiryPage />
    </>
  )
}
