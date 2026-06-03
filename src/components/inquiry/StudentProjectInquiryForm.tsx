import { FormSelectField } from '@/components/careers/FormSelectField'
import {
    inquiryInputClass,
    inquiryLabelClass,
    InquiryRequired,
} from '@/components/inquiry/inquiryFormShared'
import { Button } from '@/components/ui/Button'
import {
    formatMeetingDate,
    INQUIRY_TIMELINE_OPTIONS,
    labelForOption,
    MEETING_TIME_SLOTS,
    minMeetingDateIso,
    PROJECT_INQUIRY_EMAIL,
    STUDENT_BUDGET_OPTIONS,
    STUDENT_PROJECT_TYPES,
} from '@/data/projectInquiry'
import { isValidReferralCodeFormat, normalizeReferralCode } from '@/lib/referralCode'
import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarClock, CheckCircle2, Tag } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'

const easeSmooth = [0.22, 1, 0.36, 1] as const

interface StudentProjectInquiryFormProps {
  /** Full width on desktop split layout (student inquiry page). */
  layout?: 'default' | 'split'
  /** Pre-fill from ?ref= affiliate share link */
  initialReferralCode?: string
}

export function StudentProjectInquiryForm({
  layout = 'default',
  initialReferralCode = '',
}: StudentProjectInquiryFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [projectType, setProjectType] = useState<string>(STUDENT_PROJECT_TYPES[0].value)
  const [timeline, setTimeline] = useState<string>(INQUIRY_TIMELINE_OPTIONS[2].value)
  const [budget, setBudget] = useState<string>('undecided')
  const [meetingDate, setMeetingDate] = useState('')
  const [meetingTime, setMeetingTime] = useState<string>(MEETING_TIME_SLOTS[2].value)
  const [referralCode, setReferralCode] = useState(() =>
    initialReferralCode ? normalizeReferralCode(initialReferralCode) : '',
  )
  const [referralError, setReferralError] = useState('')

  const minDate = useMemo(() => minMeetingDateIso(), [])

  const panelClass =
    layout === 'split'
      ? 'careers-form-panel w-full min-w-0 rounded-2xl p-5 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none'
      : 'careers-form-panel mx-auto w-full min-w-0 max-w-2xl rounded-2xl p-5 sm:rounded-3xl sm:p-8'

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const rawReferral = normalizeReferralCode(referralCode)
    if (rawReferral && !isValidReferralCodeFormat(rawReferral)) {
      setReferralError('Use format PX-XXXXXXXX (letters and numbers only).')
      return
    }
    setReferralError('')
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const description = String(data.get('description') ?? '').trim()
    const date = String(data.get('meetingDate') ?? '').trim()
    const time = String(data.get('meetingTime') ?? '').trim()
    const meetingDateLabel = formatMeetingDate(date)
    const meetingTimeLabel = labelForOption(MEETING_TIME_SLOTS, time)

    const body = encodeURIComponent(
      [
        'Projonexa — Student Consultation Meeting Request',
        '────────────────────────',
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone / WhatsApp: ${phone}` : null,
        '',
        'Meeting schedule',
        `Date: ${meetingDateLabel}`,
        `Time: ${meetingTimeLabel}`,
        '',
        'Project details',
        `Project type: ${labelForOption(STUDENT_PROJECT_TYPES, String(data.get('projectType') ?? ''))}`,
        `Timeline: ${labelForOption(INQUIRY_TIMELINE_OPTIONS, String(data.get('timeline') ?? ''))}`,
        `Budget: ${labelForOption(STUDENT_BUDGET_OPTIONS, String(data.get('budget') ?? ''))}`,
        rawReferral ? `Referral code: ${rawReferral}` : null,
        '',
        'Project idea & requirements:',
        description,
      ]
        .filter(Boolean)
        .join('\n'),
    )

    const subject = encodeURIComponent(
      `Meeting Request — ${labelForOption(STUDENT_PROJECT_TYPES, String(data.get('projectType') ?? ''))} — ${name}`,
    )
    window.location.href = `mailto:${PROJECT_INQUIRY_EMAIL}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeSmooth }}
        className={`${panelClass} flex flex-col items-center px-5 py-12 text-center sm:px-10 sm:py-14`}
      >
        <CheckCircle2 className="h-14 w-14 text-emerald-500" aria-hidden />
        <h2 className="mt-5 text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
          Meeting request ready
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Your email client should open with your preferred date, time, and project details. Send
          the message and our team will confirm your consultation shortly.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-8 w-full sm:w-auto"
          onClick={() => setSubmitted(false)}
        >
          Schedule another meeting
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.form
      id="student-inquiry-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeSmooth }}
      onSubmit={handleSubmit}
      className={panelClass}
    >
      <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:mb-6">
        Fields marked with <InquiryRequired /> are required.
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
            Meeting schedule <InquiryRequired />
          </legend>
          <p className="mb-4 mt-1 px-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            Choose your preferred consultation date first, then select an available time slot (IST).
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="careers-form-field min-w-0">
              <label htmlFor="student-meeting-date" className={inquiryLabelClass}>
                Preferred date <InquiryRequired />
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
            </div>

            <FormSelectField
              id="student-meeting-time"
              name="meetingTime"
              required
              value={meetingTime}
              onChange={(e) => setMeetingTime(e.target.value)}
              label={
                <>
                  Preferred time <InquiryRequired />
                </>
              }
            >
              {MEETING_TIME_SLOTS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
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
              placeholder="PX-XXXXXXXX"
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

      <p className="mt-5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 sm:mt-6">
        By scheduling, you agree to share this information with Projonexa for consultation and
        project planning purposes only.
      </p>

      <div className="mt-6 sm:mt-8">
        <Button type="submit" variant="primary" className="w-full shadow-glow-sm sm:min-w-[260px]">
          <CalendarClock className="h-4 w-4" aria-hidden />
          Schedule a meet
          <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
        </Button>
      </div>
    </motion.form>
  )
}
