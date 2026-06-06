import { Suspense } from 'react'
import { RescheduleConsultationForm } from '@/components/inquiry/RescheduleConsultationForm'

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
