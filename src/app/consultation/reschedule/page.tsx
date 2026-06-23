import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/seo/page-metadata'
import { RescheduleConsultationForm } from '@/components/inquiry/RescheduleConsultationForm'

export const metadata: Metadata = buildPageMetadata(PAGE_SEO.rescheduleConsultation)

export default function RescheduleConsultationPage() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.rescheduleConsultation} />
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-primary/30 border-t-brand-primary" />
          </div>
        }
      >
        <RescheduleConsultationForm />
      </Suspense>
    </>
  )
}
