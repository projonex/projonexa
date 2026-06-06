import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, CalendarClock, CheckCircle2, Mail, MessageCircle, Tag, X } from 'lucide-react'
import { FormSelectField } from '@/components/careers/FormSelectField'
import {
  inquiryInputClass,
  inquiryLabelClass,
  InquiryRequired,
} from '@/components/inquiry/inquiryFormShared'
import { Button } from '@/components/ui/Button'
import { FormSubmitError } from '@/components/forms/FormSubmitError'
import { OtpInputField, OTP_CODE_LENGTH } from '@/components/forms/OtpInputField'
import { fetchConsultationSlots } from '@/lib/api/consultationSchedule'
import {
  confirmStudentSchedule,
  initiateStudentSchedule,
  resendStudentScheduleOtp,
  StudentInquiryError,
} from '@/lib/api/studentInquiry'
import { formatStudentSuccessMessage } from '@/lib/formNotifications'
import {
  formatMeetingDate,
  INQUIRY_TIMELINE_OPTIONS,
  MEETING_TIME_SLOTS,
  minMeetingDateIso,
  STUDENT_BUDGET_OPTIONS,
  STUDENT_PROJECT_TYPES,
} from '@/data/projectInquiry'
import { isValidReferralCodeFormat, normalizeReferralCode, referralCodeFormatHint } from '@/lib/referralCode'

const easeSmooth = [0.22, 1, 0.36, 1] as const

type Step = 'form' | 'otp' | 'success'

interface StudentProjectInquiryFormProps {
  layout?: 'default' | 'split'
  initialReferralCode?: string
}

export function StudentProjectInquiryForm({
  layout = 'default',
  initialReferralCode = '',
}: StudentProjectInquiryFormProps) {
  const [step, setStep] = useState<Step>('form')
  const [projectType, setProjectType] = useState<string>(STUDENT_PROJECT_TYPES[0].value)
  const [timeline, setTimeline] = useState<string>(INQUIRY_TIMELINE_OPTIONS[2].value)
  const [budget, setBudget] = useState<string>('undecided')
  const [meetingDate, setMeetingDate] = useState('')
  const [meetingTime, setMeetingTime] = useState<string>(MEETING_TIME_SLOTS[2].value)
  const [referralCode, setReferralCode] = useState(() =>
    initialReferralCode ? normalizeReferralCode(initialReferralCode) : '',
  )
  const [referralError, setReferralError] = useState('')
  const [bookedTimes, setBookedTimes] = useState<string[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState('')
  const [bookingId, setBookingId] = useState('')
  const [pendingEmail, setPendingEmail] = useState('')
  const [otpMessage, setOtpMessage] = useState('')
  const [otp, setOtp] = useState('')
  const [meetLink, setMeetLink] = useState('')
  const [scheduleLabel, setScheduleLabel] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [whatsappSent, setWhatsappSent] = useState(false)

  const minDate = useMemo(() => minMeetingDateIso(), [])

  const panelClass =
    layout === 'split'
      ? 'careers-form-panel w-full min-w-0 rounded-2xl p-5 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none'
      : 'careers-form-panel mx-auto w-full min-w-0 max-w-2xl rounded-2xl p-5 sm:rounded-3xl sm:p-8'

  const loadSlots = useCallback(async (date: string) => {
    if (!date) {
      setBookedTimes([])
      return
    }
    setSlotsLoading(true)
    try {
      const data = await fetchConsultationSlots(date, 'student')
      setBookedTimes(data.booked)
      if (data.booked.includes(meetingTime) && data.available.length > 0) {
        setMeetingTime(data.available[0])
      }
    } catch {
      setBookedTimes([])
    } finally {
      setSlotsLoading(false)
    }
  }, [meetingTime])

  useEffect(() => {
    void loadSlots(meetingDate)
  }, [meetingDate, loadSlots])

  const resetForm = () => {
    setStep('form')
    setBookingId('')
    setPendingEmail('')
    setOtp('')
    setOtpMessage('')
    setMeetLink('')
    setScheduleLabel('')
    setSuccessMessage('')
    setEmailSent(false)
    setWhatsappSent(false)
    setError('')
    setReferralCode(initialReferralCode ? normalizeReferralCode(initialReferralCode) : '')
    setReferralError('')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const rawReferral = normalizeReferralCode(referralCode)
    if (rawReferral && !isValidReferralCodeFormat(rawReferral)) {
      setReferralError(`Use format ${referralCodeFormatHint()}.`)
      return
    }
    setReferralError('')

    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const description = String(data.get('description') ?? '').trim()
    const selectedDate = String(data.get('meetingDate') ?? '').trim()
    const selectedTime = String(data.get('meetingTime') ?? '').trim()

    if (bookedTimes.includes(selectedTime)) {
      setError('This time slot is no longer available. Please choose another time.')
      return
    }

    setSubmitting(true)
    try {
      const result = await initiateStudentSchedule({
        name,
        email,
        phone,
        payload: {
          projectType: String(data.get('projectType') ?? '').trim(),
          timeline: String(data.get('timeline') ?? '').trim(),
          budget: String(data.get('budget') ?? '').trim(),
          meetingDate: selectedDate,
          meetingTime: selectedTime,
          referralCode: rawReferral,
          description,
        },
      })
      setBookingId(result.bookingId)
      setPendingEmail(email)
      setOtpMessage(result.message)
      setOtp('')
      setStep('otp')
    } catch (err) {
      setError(err instanceof StudentInquiryError ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleConfirmOtp = async (e: FormEvent) => {
    e.preventDefault()
    if (otp.length !== OTP_CODE_LENGTH) {
      setError('Enter the 6-digit verification code from your email.')
      return
    }
    setError('')
    setConfirming(true)
    try {
      const result = await confirmStudentSchedule({
        bookingId,
        email: pendingEmail,
        otp,
      })
      setMeetLink(result.meetLink)
      setScheduleLabel(result.scheduleLabel)
      setSuccessMessage(formatStudentSuccessMessage(result.message, result.notifications))
      setEmailSent(Boolean(result.notifications?.userEmail))
      setWhatsappSent(Boolean(result.notifications?.whatsapp))
      setStep('success')
    } catch (err) {
      setError(err instanceof StudentInquiryError ? err.message : 'Verification failed.')
    } finally {
      setConfirming(false)
    }
  }

  const handleResendOtp = async () => {
    if (!bookingId || !pendingEmail) return
    setError('')
    setResending(true)
    try {
      const result = await resendStudentScheduleOtp({ bookingId, email: pendingEmail })
      setOtpMessage(result.message)
      setOtp('')
    } catch (err) {
      setError(err instanceof StudentInquiryError ? err.message : 'Could not resend code.')
    } finally {
      setResending(false)
    }
  }

  if (step === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeSmooth }}
        className={`${panelClass} flex flex-col items-center px-5 py-12 text-center sm:px-10 sm:py-14`}
      >
        <CheckCircle2 className="h-14 w-14 text-emerald-500" aria-hidden />
        <h2 className="mt-5 text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
          Consultation scheduled
        </h2>
        {scheduleLabel ? (
          <p className="mt-2 text-sm font-medium text-brand-primary dark:text-brand-accent">
            {scheduleLabel}
          </p>
        ) : null}
        <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {successMessage ||
            (emailSent
              ? 'Your Google Meet consultation is confirmed. Check your email for the calendar invite.'
              : 'Your Google Meet consultation is confirmed. Use the Meet link below to join.')}
        </p>
        {(emailSent || whatsappSent) && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {emailSent ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/80 px-3 py-1.5 text-xs font-medium text-zinc-500 dark:border-white/[0.1] dark:bg-zinc-900/80 dark:text-zinc-400">
                <Mail className="h-3.5 w-3.5" aria-hidden />
                Confirmation email sent
              </span>
            ) : null}
            {whatsappSent ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/80 px-3 py-1.5 text-xs font-medium text-zinc-500 dark:border-white/[0.1] dark:bg-zinc-900/80 dark:text-zinc-400">
                <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                WhatsApp message sent
              </span>
            ) : null}
          </div>
        )}
        {meetLink ? (
          <a
            href={meetLink}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-semibold text-white shadow-glow-sm hover:opacity-95 dark:bg-brand-accent dark:text-zinc-900"
          >
            Join Google Meet
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        ) : null}
        <Button type="button" variant="secondary" className="mt-8 w-full sm:w-auto" onClick={resetForm}>
          Schedule another consultation
        </Button>
      </motion.div>
    )
  }

  return (
    <>
      <motion.form
        id="student-inquiry-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeSmooth }}
        onSubmit={handleSubmit}
        className={panelClass}
      >
        <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:mb-6">
          Fields marked with <InquiryRequired /> are required. After you submit, we will verify your
          email with a one-time code before creating your Google Meet invite.
        </p>

        <div className="flex flex-col gap-5">
          <div className="careers-form-field w-full min-w-0">
            <label htmlFor="student-name" className={inquiryLabelClass}>
              Full name <InquiryRequired />
            </label>
            <input
              id="student-name"
              name="name"
              required
              autoComplete="name"
              className={inquiryInputClass}
              placeholder="Your full name"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="careers-form-field min-w-0">
              <label htmlFor="student-email" className={inquiryLabelClass}>
                Email <InquiryRequired />
              </label>
              <input
                id="student-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inquiryInputClass}
                placeholder="you@email.com"
              />
            </div>
            <div className="careers-form-field min-w-0">
              <label htmlFor="student-phone" className={inquiryLabelClass}>
                Phone / WhatsApp <InquiryRequired />
              </label>
              <input
                id="student-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                className={inquiryInputClass}
                placeholder="+91 …"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormSelectField
              id="student-project-type"
              name="projectType"
              required
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              label={
                <>
                  Project type <InquiryRequired />
                </>
              }
            >
              {STUDENT_PROJECT_TYPES.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </FormSelectField>

            <FormSelectField
              id="student-timeline"
              name="timeline"
              required
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              label={
                <>
                  Submission deadline / timeline <InquiryRequired />
                </>
              }
            >
              {INQUIRY_TIMELINE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </FormSelectField>
          </div>

          <FormSelectField
            id="student-budget"
            name="budget"
            required
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            label="Estimated budget"
          >
            {STUDENT_BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </FormSelectField>

          <fieldset className="rounded-2xl border border-black/[0.08] bg-black/[0.02] p-4 dark:border-white/[0.08] dark:bg-white/[0.03] sm:p-5">
            <legend className="px-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              Preferred consultation <InquiryRequired />
            </legend>
            <p className="mb-4 mt-1 px-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              Pick a date and time for your discovery call. Booked slots are unavailable. All times are
              IST.
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="careers-form-field min-w-0">
                <label htmlFor="student-meeting-date" className={inquiryLabelClass}>
                  Date <InquiryRequired />
                </label>
                <input
                  id="student-meeting-date"
                  name="meetingDate"
                  type="date"
                  required
                  min={minDate}
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className={`${inquiryInputClass} careers-form-date`}
                />
                {meetingDate ? (
                  <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                    {formatMeetingDate(meetingDate)}
                  </p>
                ) : null}
              </div>

              <FormSelectField
                id="student-meeting-time"
                name="meetingTime"
                required
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                label={
                  <>
                    Time <InquiryRequired />
                    {slotsLoading ? (
                      <span className="ml-1 font-normal text-zinc-400">(checking availability…)</span>
                    ) : null}
                  </>
                }
              >
                {MEETING_TIME_SLOTS.map((opt) => {
                  const taken = bookedTimes.includes(opt.value)
                  return (
                    <option key={opt.value} value={opt.value} disabled={taken}>
                      {taken ? `${opt.label} — Booked` : opt.label}
                    </option>
                  )
                })}
              </FormSelectField>
            </div>
          </fieldset>

          <div className="careers-form-field w-full min-w-0">
            <label htmlFor="student-referral" className={inquiryLabelClass}>
              Referral code{' '}
              <span className="font-normal text-zinc-500 dark:text-zinc-500">(optional)</span>
            </label>
            <div className="relative">
              <Tag
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                aria-hidden
              />
              <input
                id="student-referral"
                name="referralCode"
                value={referralCode}
                onChange={(e) => {
                  setReferralCode(normalizeReferralCode(e.target.value))
                  setReferralError('')
                }}
                autoComplete="off"
                className={`${inquiryInputClass} pl-10 font-mono uppercase tracking-wide`}
                placeholder={referralCodeFormatHint()}
                aria-invalid={referralError ? true : undefined}
                aria-describedby={referralError ? 'student-referral-error' : 'student-referral-hint'}
              />
            </div>
            {referralError ? (
              <p id="student-referral-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                {referralError}
              </p>
            ) : (
              <p id="student-referral-hint" className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                Referred by a Projonexa affiliate? Enter their code here.
              </p>
            )}
          </div>

          <div className="careers-form-field w-full min-w-0">
            <label htmlFor="student-description" className={inquiryLabelClass}>
              Project idea & requirements <InquiryRequired />
            </label>
            <textarea
              id="student-description"
              name="description"
              required
              rows={5}
              className={`${inquiryInputClass} resize-none`}
              placeholder="Describe your topic, features, and any reference links…"
            />
          </div>
        </div>

        <FormSubmitError message={error} />

        <p className="mt-5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 sm:mt-6">
          By scheduling, you agree to share this information with Projonexa for consultation and
          project planning purposes only.
        </p>

        <div className="mt-6 sm:mt-8">
          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            className="w-full shadow-glow-sm sm:min-w-[260px]"
          >
            <CalendarClock className="h-4 w-4" aria-hidden />
            {submitting ? 'Sending verification code…' : 'Schedule a meet'}
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </Button>
        </div>
      </motion.form>

      <AnimatePresence>
        {step === 'otp' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="student-otp-title"
          >
            <motion.form
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onSubmit={handleConfirmOtp}
              className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900 sm:p-8"
            >
              <button
                type="button"
                onClick={() => {
                  setStep('form')
                  setError('')
                }}
                className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary dark:bg-brand-accent/15 dark:text-brand-accent">
                  <Mail className="h-6 w-6" aria-hidden />
                </div>
                <h2 id="student-otp-title" className="mt-4 text-lg font-bold text-zinc-900 dark:text-white">
                  Verify your email
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {otpMessage || `Enter the 6-digit code sent to ${pendingEmail}`}
                </p>
              </div>

              <div className="mt-6">
                <OtpInputField value={otp} onChange={setOtp} autoFocus disabled={confirming} />
              </div>

              <FormSubmitError message={error} />

              <Button
                type="submit"
                variant="primary"
                disabled={confirming || resending || otp.length !== OTP_CODE_LENGTH}
                className="mt-6 w-full"
              >
                {confirming ? 'Confirming & scheduling…' : 'Confirm & schedule Google Meet'}
              </Button>

              <div className="mt-4 flex flex-col items-center gap-2 text-center">
                <button
                  type="button"
                  onClick={() => void handleResendOtp()}
                  disabled={confirming || resending}
                  className="text-sm font-medium text-brand-primary hover:underline disabled:cursor-not-allowed disabled:opacity-50 dark:text-brand-accent"
                >
                  {resending ? 'Sending new code…' : "Didn't receive a code? Resend"}
                </button>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Your time slot stays reserved while you verify. If scheduling fails, you can retry
                  with the same code.
                </p>
              </div>
            </motion.form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
