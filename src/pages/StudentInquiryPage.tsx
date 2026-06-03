import { StudentProjectInquiryForm } from '@/components/inquiry/StudentProjectInquiryForm'
import { InquiryStandaloneShell } from '@/components/inquiry/InquiryStandaloneShell'
import { STUDENT_INQUIRY_SECTION } from '@/data/projectInquiry'
import { PAGE_SEO } from '@/data/seo'
import { normalizeReferralCode } from '@/lib/referralCode'
import { useSearchParams } from 'react-router-dom'

export function StudentInquiryPage() {
  const [searchParams] = useSearchParams()
  const refParam = searchParams.get('ref') ?? searchParams.get('referral')
  const referralCode = refParam ? normalizeReferralCode(refParam) : ''

  return (
    <InquiryStandaloneShell
      seo={PAGE_SEO.studentInquiry}
      eyebrow={STUDENT_INQUIRY_SECTION.eyebrow}
      title={STUDENT_INQUIRY_SECTION.title}
      description={STUDENT_INQUIRY_SECTION.description}
      badge={
        referralCode ? `Referred by affiliate · ${referralCode}` : undefined
      }
      backTo="/contact"
      backLabel="Back to contact"
      desktopSplit
    >
      <StudentProjectInquiryForm layout="split" initialReferralCode={referralCode} />
    </InquiryStandaloneShell>
  )
}
