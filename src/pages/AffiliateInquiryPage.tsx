import { AffiliateCriteriaPanel } from '@/components/inquiry/AffiliateCriteriaPanel'
import { AffiliateProgramInquiryForm } from '@/components/inquiry/AffiliateProgramInquiryForm'
import { InquiryStandaloneShell } from '@/components/inquiry/InquiryStandaloneShell'
import { AFFILIATE_PROGRAM_PATH } from '@/data/affiliateFaq'
import { AFFILIATE_INQUIRY_SECTION } from '@/data/affiliateProgram'
import { Link } from 'react-router-dom'
import { PAGE_SEO } from '@/data/seo'

export function AffiliateInquiryPage() {
  return (
    <InquiryStandaloneShell
      seo={PAGE_SEO.affiliateInquiry}
      eyebrow={AFFILIATE_INQUIRY_SECTION.eyebrow}
      title={AFFILIATE_INQUIRY_SECTION.title}
      description={AFFILIATE_INQUIRY_SECTION.description}
      headerExtra={
        <Link
          to={AFFILIATE_PROGRAM_PATH}
          className="mx-auto mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline dark:text-brand-accent lg:mx-0"
        >
          Read affiliate program Q&amp;A (commission, payouts, eligibility)
          <span aria-hidden>→</span>
        </Link>
      }
      backTo="/contact"
      backLabel="Back to contact"
      desktopSplit
      sidebarAside={<AffiliateCriteriaPanel variant="sidebar" />}
    >
      <AffiliateProgramInquiryForm layout="split" />
    </InquiryStandaloneShell>
  )
}
