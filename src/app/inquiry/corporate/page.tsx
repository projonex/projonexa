import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/seo/page-metadata'
import { Suspense } from 'react'
import { CorporateInquiryPage } from '@/views/CorporateInquiryPage'

export const metadata = buildPageMetadata(PAGE_SEO.corporateInquiry)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.corporateInquiry} />
      <Suspense fallback={null}>
        <CorporateInquiryPage />
      </Suspense>
    </>
  )
}
