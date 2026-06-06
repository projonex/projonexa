import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/seo/page-metadata'
import { AffiliateEligibilityPage } from '@/views/AffiliateEligibilityPage'

export const metadata = buildPageMetadata({
  ...PAGE_SEO.affiliateProgram,
  title: 'Affiliate Eligibility & Referral Tracker | Projonexa',
  description:
    'Check your Projonexa affiliate referral progress, successful referrals, and eligibility for the full affiliate program after 5 completed projects.',
  path: '/affiliate-program/eligibility',
})

export default function Page() {
  return (
    <>
      <PageSeo
        seo={{
          ...PAGE_SEO.affiliateProgram,
          title: 'Affiliate Eligibility & Referral Tracker | Projonexa',
          path: '/affiliate-program/eligibility',
        }}
      />
      <AffiliateEligibilityPage />
    </>
  )
}
