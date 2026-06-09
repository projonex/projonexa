import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/seo/page-metadata'
import { Suspense } from 'react'
import { AffiliateEligibilityPage } from '@/views/AffiliateEligibilityPage'

export const metadata = buildPageMetadata(PAGE_SEO.affiliateProgramEligibility)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.affiliateProgramEligibility} />
      <Suspense fallback={null}>
        <AffiliateEligibilityPage />
      </Suspense>
    </>
  )
}
