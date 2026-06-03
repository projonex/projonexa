import { CorporateProjectInquiryForm } from '@/components/inquiry/CorporateProjectInquiryForm'
import { InquiryStandaloneShell } from '@/components/inquiry/InquiryStandaloneShell'
import { CLIENT_PROJECTS_PATH } from '@/data/clientProjectsFaq'
import { CORPORATE_INQUIRY_SECTION } from '@/data/projectInquiry'
import { PAGE_SEO } from '@/data/seo'
import { Link } from 'react-router-dom'

export function CorporateInquiryPage() {
  return (
    <InquiryStandaloneShell
      seo={PAGE_SEO.corporateInquiry}
      eyebrow={CORPORATE_INQUIRY_SECTION.eyebrow}
      title={CORPORATE_INQUIRY_SECTION.title}
      description={CORPORATE_INQUIRY_SECTION.description}
      headerExtra={
        <Link
          to={CLIENT_PROJECTS_PATH}
          className="mx-auto mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline dark:text-brand-accent lg:mx-0"
        >
          Client &amp; MVP guide (production-ready builds)
          <span aria-hidden>→</span>
        </Link>
      }
      backTo="/contact"
      backLabel="Back to contact"
    >
      <CorporateProjectInquiryForm />
    </InquiryStandaloneShell>
  )
}
