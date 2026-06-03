import { AffiliateCriteriaPanel } from '@/components/inquiry/AffiliateCriteriaPanel'
import { AffiliateProgramInquiryForm } from '@/components/inquiry/AffiliateProgramInquiryForm'
import { InquiryStandaloneShell } from '@/components/inquiry/InquiryStandaloneShell'
import { AFFILIATE_INQUIRY_SECTION } from '@/data/affiliateProgram'
import { PAGE_SEO } from '@/data/seo'

export function AffiliateInquiryPage() {
  return (
    <InquiryStandaloneShell
      seo={PAGE_SEO.affiliateInquiry}
      eyebrow={AFFILIATE_INQUIRY_SECTION.eyebrow}
      title={AFFILIATE_INQUIRY_SECTION.title}
      description={AFFILIATE_INQUIRY_SECTION.description}
      backTo="/contact"
      backLabel="Back to contact"
      desktopSplit
      sidebarAside={<AffiliateCriteriaPanel variant="sidebar" />}
    >
      <AffiliateProgramInquiryForm layout="split" />
    </InquiryStandaloneShell>
  )
}
