import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, CalendarClock, CheckCircle2, Mail, X } from 'lucide-react'
import { FormSelectField } from '@/components/careers/FormSelectField'
import {
  inquiryInputClass,
  inquiryLabelClass,
  InquiryRequired,
} from '@/components/inquiry/inquiryFormShared'
import { Button } from '@/components/ui/Button'
import { FormSubmitError } from '@/components/forms/FormSubmitError'
import { OtpInputField, OTP_CODE_LENGTH } from '@/components/forms/OtpInputField'
import {
  confirmCorporateSchedule,
  CorporateInquiryError,
  fetchConsultationSlots,
  initiateCorporateSchedule,
} from '@/lib/api/corporateInquiry'
import {
  CORPORATE_BUDGET_OPTIONS,
  CORPORATE_BUILD_OPTIONS,
  CORPORATE_ROLE_OPTIONS,
  CORPORATE_TIMELINE_OPTIONS,
  formatMeetingDate,
  MEETING_TIME_SLOTS,
  minMeetingDateIso,
} from '@/data/projectInquiry'

const easeSmooth = [0.22, 1, 0.36, 1] as const

type Step = 'form' | 'otp' | 'success'

export function CorporateProjectInquiryForm() {
  const [step, setStep] = useState<Step>('form')
  const [buildType, setBuildType] = useState<string>(CORPORATE_BUILD_OPTIONS[0].value)
  const [role, setRole] = useState<string>(CORPORATE_ROLE_OPTIONS[0].value)
  const [timeline, setTimeline] = useState<string>(CORPORATE_TIMELINE_OPTIONS[1].value)
  const [budget, setBudget] = useState<string>(CORPORATE_BUDGET_OPTIONS[0].value)
  const [meetingDate, setMeetingDate] = useState('')
  const [meetingTime, setMeetingTime] = useState<string>(MEETING_TIME_SLOTS[3].value)
  const [bookedTimes, setBookedTimes] = useState<string[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState('')
  const [bookingId, setBookingId] = useState('')
  const [pendingEmail, setPendingEmail] = useState('')
  const [otpMessage, setOtpMessage] = useState('')
  const [otp, setOtp] = useState('')
  const [meetLink, setMeetLink] = useState('')
  const [scheduleLabel, setScheduleLabel] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const minDate = useMemo(() => minMeetingDateIso(), [])

  const loadSlots = useCallback(async (date: string) => {
    if (!date) {
      setBookedTimes([])
      return
    }
    setSlotsLoading(true)
    try {
      const data = await fetchConsultationSlots(date)
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    const website = String(data.get('website') ?? '').trim()
    const description = String(data.get('description') ?? '').trim()
    const selectedDate = String(data.get('meetingDate') ?? '').trim()
    const selectedTime = String(data.get('meetingTime') ?? '').trim()

    if (bookedTimes.includes(selectedTime)) {
      setError('This time slot is no longer available. Please choose another time.')
      return
    }

    setSubmitting(true)
    try {
      const result = await initiateCorporateSchedule({
        name,
        email,
        phone,
        payload: {
          company,
          role: String(data.get('role') ?? '').trim(),
          buildType: String(data.get('buildType') ?? '').trim(),
          timeline: String(data.get('timeline') ?? '').trim(),
          budget: String(data.get('budget') ?? '').trim(),
          meetingDate: selectedDate,
          meetingTime: selectedTime,
          website,
          description,
        },
      })
      setBookingId(result.bookingId)
      setPendingEmail(email)
      setOtpMessage(result.message)
      setOtp('')
      setStep('otp')
    } catch (err) {
      setError(err instanceof CorporateInquiryError ? err.message : 'Something went wrong.')
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
      const result = await confirmCorporateSchedule({
        bookingId,
        email: pendingEmail,
        otp,
      })
      setMeetLink(result.meetLink)
      setScheduleLabel(result.scheduleLabel)
      setSuccessMessage(result.message)
      setStep('success')
    } catch (err) {
      setError(err instanceof CorporateInquiryError ? err.message : 'Verification failed.')
    } finally {
      setConfirming(false)
    }
  }

  const resetForm = () => {
    setStep('form')
    setBookingId('')
    setPendingEmail('')
    setOtp('')
    setOtpMessage('')
    setMeetLink('')
    setScheduleLabel('')
    setSuccessMessage('')
    setError('')
  }

  if (step === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeSmooth }}
        className="careers-form-panel mx-auto flex w-full max-w-2xl flex-col items-center rounded-2xl px-5 py-12 text-center sm:rounded-3xl sm:px-10 sm:py-14"
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
            'Your Google Meet consultation is confirmed. Check your email and WhatsApp for the invite.'}
        </p>
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
        id="corporate-inquiry-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeSmooth }}
        onSubmit={handleSubmit}
        className="careers-form-panel mx-auto w-full min-w-0 max-w-2xl rounded-2xl p-5 sm:rounded-3xl sm:p-8"
      >
        <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:mb-6">
          Fields marked with <InquiryRequired /> are required. After you submit, we will verify your
          email with a one-time code before creating your Google Meet invite.
        </p>

        <div className="flex flex-col gap-5">
          <div className="careers-form-field w-full min-w-0">
            <label htmlFor="corp-name" className={inquiryLabelClass}>
              Full name <InquiryRequired />
            </label>
            <input
              id="corp-name"
              name="name"
              required
              autoComplete="name"
              className={inquiryInputClass}
              placeholder="Your full name"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="careers-form-field min-w-0">
              <label htmlFor="corp-email" className={inquiryLabelClass}>
                Work email <InquiryRequired />
              </label>
              <input
                id="corp-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inquiryInputClass}
                placeholder="you@company.com"
              />
            </div>
            <div className="careers-form-field min-w-0">
              <label htmlFor="corp-phone" className={inquiryLabelClass}>
                Phone <InquiryRequired />
              </label>
              <input
                id="corp-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                className={inquiryInputClass}
                placeholder="+91 …"
              />
            </div>
          </div>

          <div className="careers-form-field w-full min-w-0">
            <label htmlFor="corp-company" className={inquiryLabelClass}>
              Company / Organization name <InquiryRequired />
            </label>
            <input
              id="corp-company"
              name="company"
              required
              className={inquiryInputClass}
              placeholder="Startup, business, or agency name"
            />
          </div>

          <FormSelectField
            id="corp-role"
            name="role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label={
              <>
                Your role <InquiryRequired />
              </>
            }
          >
            {CORPORATE_ROLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </FormSelectField>

          <FormSelectField
            id="corp-build-type"
            name="buildType"
            required
            value={buildType}
            onChange={(e) => setBuildType(e.target.value)}
            label={
              <>
                What do you want to build? <InquiryRequired />
              </>
            }
          >
            {CORPORATE_BUILD_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </FormSelectField>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormSelectField
              id="corp-timeline"
              name="timeline"
              required
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              label={
                <>
                  Expected timeline <InquiryRequired />
                </>
              }
            >
              {CORPORATE_TIMELINE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </FormSelectField>

            <FormSelectField
              id="corp-budget"
              name="budget"
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              label={
                <>
                  Budget range <InquiryRequired />
                </>
              }
            >
              {CORPORATE_BUDGET_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </FormSelectField>
          </div>

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
                <label htmlFor="corp-meeting-date" className={inquiryLabelClass}>
                  Date <InquiryRequired />
                </label>
                <input
                  id="corp-meeting-date"
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
                id="corp-meeting-time"
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
            <label htmlFor="corp-website" className={inquiryLabelClass}>
              Website or existing product link
            </label>
            <input
              id="corp-website"
              name="website"
              type="url"
              className={inquiryInputClass}
              placeholder="https://…"
            />
          </div>

          <div className="careers-form-field w-full min-w-0">
            <label htmlFor="corp-description" className={inquiryLabelClass}>
              Project scope & requirements <InquiryRequired />
            </label>
            <textarea
              id="corp-description"
              name="description"
              required
              rows={5}
              className={`${inquiryInputClass} resize-none`}
              placeholder="Goals, core features, integrations, target users, and success criteria…"
            />
          </div>
        </div>

        <FormSubmitError message={error} />

        <p className="mt-5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 sm:mt-6">
          By scheduling, you agree to share this information with Projonexa for business consultation
          purposes only.
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
            aria-labelledby="corp-otp-title"
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
                <h2 id="corp-otp-title" className="mt-4 text-lg font-bold text-zinc-900 dark:text-white">
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
                disabled={confirming || otp.length !== OTP_CODE_LENGTH}
                className="mt-6 w-full"
              >
                {confirming ? 'Confirming & scheduling…' : 'Confirm & schedule Google Meet'}
              </Button>

              <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
                Your selected time slot is reserved for a few minutes while you verify.
              </p>
            </motion.form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
