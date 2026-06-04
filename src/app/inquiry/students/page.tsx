import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/page-metadata'
import { Suspense } from 'react'
import { StudentInquiryPage } from '@/views/StudentInquiryPage'

export const metadata = buildPageMetadata(PAGE_SEO.studentInquiry)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.studentInquiry} />
      <Suspense fallback={null}>
        <StudentInquiryPage />
      </Suspense>
    </>
  )
}
