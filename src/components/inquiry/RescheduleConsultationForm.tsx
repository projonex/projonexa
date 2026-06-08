'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CalendarClock, CheckCircle2, ExternalLink, Loader2 } from 'lucide-react'
import { InquiryStandaloneShell } from '@/components/inquiry/InquiryStandaloneShell'
import {
  inquiryInputClass,
  inquiryLabelClass,
} from '@/components/inquiry/inquiryFormShared'
import { Button } from '@/components/ui/Button'
import {
  ConsultationRescheduleError,
  confirmConsultationReschedule,
  fetchRescheduleDetails,
  type RescheduleDetailsResponse,
} from '@/lib/api/consultationReschedule'
import {
  consultationSlotOptionSuffix,
  useConsultationSlotAvailability,
} from '@/lib/hooks/useConsultationSlotAvailability'
import {
  formatMeetingDate,
  MEETING_TIME_SLOTS,
  minMeetingDateIso,
  RESCHEDULE_CONSULTATION_PATH,
} from '@/data/projectInquiry'

const easeSmooth = [0.22, 1, 0.36, 1] as const

export function RescheduleConsultationForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const [details, setDetails] = useState<RescheduleDetailsResponse | null>(null)
  const [loadingDetails, setLoadingDetails] = useState(true)
  const [loadError, setLoadError] = useState('')

  const [meetingDate, setMeetingDate] = useState(minMeetingDateIso())
  const [meetingTime, setMeetingTime] = useState<string>(MEETING_TIME_SLOTS[3].value)
  const slotAvailability = useConsultationSlotAvailability(
    meetingDate,
    'corporate',
    meetingTime,
    setMeetingTime,
  )

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [success, setSuccess] = useState<{ scheduleLabel: string; meetLink: string; message: string } | null>(null)

  useEffect(() => {
    if (!token) {
      setLoadError('This reschedule link is missing or invalid.')
      setLoadingDetails(false)
      return
    }
    fetchRescheduleDetails(token)
      .then(setDetails)
      .catch((err) =>
        setLoadError(err instanceof ConsultationRescheduleError ? err.message : 'Invalid link'),
      )
      .finally(() => setLoadingDetails(false))
  }, [token])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!token) return
    const slotError = slotAvailability.validateSelectedTime(meetingTime)
    if (slotError) {
      setSubmitError(slotError)
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      const result = await confirmConsultationReschedule({
        token,
        meetingDate,
        meetingTime,
      })
      setSuccess(result)
    } catch (err) {
      setSubmitError(err instanceof ConsultationRescheduleError ? err.message : 'Could not reschedule')
    } finally {
      setSubmitting(false)
    }
  }

  if (loadingDetails) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" aria-hidden />
      </div>
    )
  }

  if (loadError || !details) {
    return (
      <InquiryStandaloneShell
        eyebrow="Consultation"
        title="Link unavailable"
        description={loadError || 'This reschedule link is invalid or has expired.'}
        backTo="/"
        backLabel="Back to home"
      >
        <div className="careers-form-panel mx-auto max-w-lg rounded-2xl p-8 text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Please reply to your Projonexa email or contact us if you still need to reschedule.
          </p>
        </div>
      </InquiryStandaloneShell>
    )
  }

  if (success) {
    return (
      <InquiryStandaloneShell
        eyebrow="Consultation rescheduled"
        title="Your new time is confirmed"
        description={success.message}
        backTo="/"
        backLabel="Back to home"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeSmooth }}
          className="careers-form-panel mx-auto flex max-w-lg flex-col items-center rounded-2xl px-6 py-12 text-center sm:px-10"
        >
          <CheckCircle2 className="h-14 w-14 text-emerald-500" aria-hidden />
          <p className="mt-5 text-lg font-semibold text-zinc-900 dark:text-white">{success.scheduleLabel}</p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            A updated confirmation has been sent to {details.email}. Join your session using the link below.
          </p>
          {success.meetLink ? (
            <a
              href={success.meetLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Join Google Meet
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </motion.div>
      </InquiryStandaloneShell>
    )
  }

  return (
    <InquiryStandaloneShell
      eyebrow="Reschedule consultation"
      title={`Hi ${details.name.split(' ')[0] ?? details.name}, pick a new time`}
      description={
        details.company
          ? `${details.company} · Previous slot: ${details.previousSchedule}`
          : `Previous slot: ${details.previousSchedule}`
      }
      backTo="/inquiry/corporate"
      backLabel="Corporate inquiry"
      desktopSplit
      sidebarItems={[
        'Choose any available IST slot',
        'Instant Google Meet confirmation',
        'Same secure booking as your original inquiry',
      ]}
    >
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="careers-form-panel w-full min-w-0 rounded-2xl p-5 sm:rounded-3xl sm:p-8"
      >
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-brand-primary/20 bg-brand-primary/[0.06] px-4 py-3">
          <CalendarClock className="h-5 w-5 shrink-0 text-brand-primary" aria-hidden />
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Select a future date and time that works for you. Past slots are not shown.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="reschedule-date" className={inquiryLabelClass}>
              New date
            </label>
            <input
              id="reschedule-date"
              type="date"
              required
              min={minMeetingDateIso()}
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
              className={inquiryInputClass}
            />
            {meetingDate ? (
              <p className="mt-1.5 text-xs text-zinc-500">{formatMeetingDate(meetingDate)}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="reschedule-time" className={inquiryLabelClass}>
              New time (IST)
            </label>
            <select
              id="reschedule-time"
              required
              value={meetingTime}
              onChange={(e) => setMeetingTime(e.target.value)}
              className={inquiryInputClass}
              disabled={slotAvailability.loading || slotAvailability.availableSlots.length === 0}
            >
              {MEETING_TIME_SLOTS.map((opt) => {
                const suffix = consultationSlotOptionSuffix(
                  opt.value,
                  slotAvailability.availableSlots,
                  slotAvailability.bookedSlots,
                  slotAvailability.blockedSlots,
                  slotAvailability.wholeDayBlocked,
                )
                return (
                  <option key={opt.value} value={opt.value} disabled={!slotAvailability.availableSlots.includes(opt.value)}>
                    {opt.label}
                    {suffix}
                  </option>
                )
              })}
            </select>
            {slotAvailability.loading ? (
              <p className="mt-1.5 text-xs text-zinc-500">Loading availability…</p>
            ) : slotAvailability.wholeDayBlocked ? (
              <p className="mt-1.5 text-xs text-amber-600">This day is fully unavailable — try another date.</p>
            ) : slotAvailability.availableSlots.length === 0 ? (
              <p className="mt-1.5 text-xs text-amber-600">No open slots on this date — try another day.</p>
            ) : null}
          </div>
        </div>

        {submitError ? (
          <p className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
            {submitError}
          </p>
        ) : null}

        <Button type="submit" disabled={submitting || slotAvailability.availableSlots.length === 0} className="mt-8 w-full sm:w-auto">
          {submitting ? 'Confirming…' : 'Confirm new consultation time'}
        </Button>

        <p className="mt-4 text-xs text-zinc-500">
          Secure link · {RESCHEDULE_CONSULTATION_PATH}?token=…
        </p>
      </form>
    </InquiryStandaloneShell>
  )
}
