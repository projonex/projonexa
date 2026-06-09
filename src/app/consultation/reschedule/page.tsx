import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BRAND } from '@/data/brand'
import { RescheduleConsultationForm } from '@/components/inquiry/RescheduleConsultationForm'

export const metadata: Metadata = {
  title: `Reschedule Consultation | ${BRAND.name}`,
  description:
    'Reschedule your Projonexa consultation using your secure email link. Pick a new date and time for your Google Meet session.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${BRAND.url}/consultation/reschedule` },
}

export default function RescheduleConsultationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-primary/30 border-t-brand-primary" />
        </div>
      }
    >
      <RescheduleConsultationForm />
    </Suspense>
  )
}
