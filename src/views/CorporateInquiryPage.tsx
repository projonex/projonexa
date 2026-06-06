'use client'

import { CorporateProjectInquiryForm } from '@/components/inquiry/CorporateProjectInquiryForm'
import { InquiryStandaloneShell } from '@/components/inquiry/InquiryStandaloneShell'
import { CLIENT_PROJECTS_PATH } from '@/data/clientProjectsFaq'
import { CORPORATE_INQUIRY_SECTION } from '@/data/projectInquiry'
import { normalizeReferralCode } from '@/lib/referralCode'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export function CorporateInquiryPage() {
  const searchParams = useSearchParams()
  const refParam = searchParams.get('ref') ?? searchParams.get('referral')
  const referralCode = refParam ? normalizeReferralCode(refParam) : ''

  return (
    <InquiryStandaloneShell
      eyebrow={CORPORATE_INQUIRY_SECTION.eyebrow}
      title={CORPORATE_INQUIRY_SECTION.title}
      description={CORPORATE_INQUIRY_SECTION.description}
      headerExtra={
        <Link
          href={CLIENT_PROJECTS_PATH}
          className="mx-auto mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline dark:text-brand-accent lg:mx-0"
        >
          Client &amp; MVP guide (production-ready builds)
          <span aria-hidden>→</span>
        </Link>
      }
      badge={referralCode ? `Referred by affiliate · ${referralCode}` : undefined}
      backTo="/contact"
      backLabel="Back to contact"
    >
      <CorporateProjectInquiryForm initialReferralCode={referralCode} />
    </InquiryStandaloneShell>
  )
}
