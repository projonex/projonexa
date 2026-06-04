'use client'

import { StudentProjectInquiryForm } from '@/components/inquiry/StudentProjectInquiryForm'
import { InquiryStandaloneShell } from '@/components/inquiry/InquiryStandaloneShell'
import { COLLEGE_PROJECTS_PATH } from '@/data/studentProjectsFaq'
import { STUDENT_INQUIRY_SECTION } from '@/data/projectInquiry'
import { normalizeReferralCode } from '@/lib/referralCode'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export function StudentInquiryPage() {
  const searchParams = useSearchParams()
  const refParam = searchParams.get('ref') ?? searchParams.get('referral')
  const referralCode = refParam ? normalizeReferralCode(refParam) : ''

  return (
    <InquiryStandaloneShell
      eyebrow={STUDENT_INQUIRY_SECTION.eyebrow}
      title={STUDENT_INQUIRY_SECTION.title}
      description={STUDENT_INQUIRY_SECTION.description}
      headerExtra={
        <Link
          href={COLLEGE_PROJECTS_PATH}
          className="mx-auto mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline dark:text-brand-accent lg:mx-0"
        >
          College project doubts &amp; deliverables (Q&amp;A)
          <span aria-hidden>→</span>
        </Link>
      }
      badge={referralCode ? `Referred by affiliate · ${referralCode}` : undefined}
      backTo="/contact"
      backLabel="Back to contact"
      desktopSplit
    >
      <StudentProjectInquiryForm layout="split" initialReferralCode={referralCode} />
    </InquiryStandaloneShell>
  )
}
