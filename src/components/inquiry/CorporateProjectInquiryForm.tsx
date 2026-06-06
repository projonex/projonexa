import { useMemo, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarClock, CheckCircle2 } from 'lucide-react'
import { FormSelectField } from '@/components/careers/FormSelectField'
import {
  inquiryInputClass,
  inquiryLabelClass,
  InquiryRequired,
} from '@/components/inquiry/inquiryFormShared'
import { Button } from '@/components/ui/Button'
import { FormSubmitError } from '@/components/forms/FormSubmitError'
import { useFormSubmission } from '@/hooks/useFormSubmission'
import { FORM_CATEGORIES } from '@/lib/api/forms'
import {
  CORPORATE_BUDGET_OPTIONS,
  CORPORATE_BUILD_OPTIONS,
  CORPORATE_ROLE_OPTIONS,
  CORPORATE_TIMELINE_OPTIONS,
  MEETING_TIME_SLOTS,
  minMeetingDateIso,
} from '@/data/projectInquiry'

const easeSmooth = [0.22, 1, 0.36, 1] as const

export function CorporateProjectInquiryForm() {
  const [submitted, setSubmitted] = useState(false)
  const [buildType, setBuildType] = useState<string>(CORPORATE_BUILD_OPTIONS[0].value)
  const [role, setRole] = useState<string>(CORPORATE_ROLE_OPTIONS[0].value)
  const [timeline, setTimeline] = useState<string>(CORPORATE_TIMELINE_OPTIONS[1].value)
  const [budget, setBudget] = useState<string>(CORPORATE_BUDGET_OPTIONS[0].value)
  const [meetingDate, setMeetingDate] = useState('')
  const [meetingTime, setMeetingTime] = useState<string>(MEETING_TIME_SLOTS[3].value)
  const { submitting, error, submit, clearError } = useFormSubmission()

  const minDate = useMemo(() => minMeetingDateIso(), [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    clearError()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    const website = String(data.get('website') ?? '').trim()
    const description = String(data.get('description') ?? '').trim()

    try {
      await submit({
        category: FORM_CATEGORIES.corporateInquiry,
        name,
        email,
        phone,
        payload: {
          company,
          role: String(data.get('role') ?? '').trim(),
          buildType: String(data.get('buildType') ?? '').trim(),
          timeline: String(data.get('timeline') ?? '').trim(),
          budget: String(data.get('budget') ?? '').trim(),
          meetingDate: String(data.get('meetingDate') ?? '').trim(),
          meetingTime: String(data.get('meetingTime') ?? '').trim(),
          website,
          description,
        },
      })
      setSubmitted(true)
    } catch {
      // Error state handled by hook
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeSmooth }}
        className="careers-form-panel mx-auto flex w-full max-w-2xl flex-col items-center rounded-2xl px-5 py-12 text-center sm:rounded-3xl sm:px-10 sm:py-14"
      >
        <CheckCircle2 className="h-14 w-14 text-emerald-500" aria-hidden />
        <h2 className="mt-5 text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
          Inquiry submitted
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Thank you. Our team has received your corporate inquiry and will confirm your consultation
          shortly.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-8 w-full sm:w-auto"
          onClick={() => setSubmitted(false)}
        >
          Submit another inquiry
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.form
      id="corporate-inquiry-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeSmooth }}
      onSubmit={handleSubmit}
      className="careers-form-panel mx-auto w-full min-w-0 max-w-2xl rounded-2xl p-5 sm:rounded-3xl sm:p-8"
    >
      <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:mb-6">
        Fields marked with <InquiryRequired /> are required.
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
            Pick a date and time for your discovery call. All times are in IST.
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
        By submitting, you agree to share this information with Projonexa for business consultation
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
          {submitting ? 'Submitting…' : 'Submit corporate inquiry'}
          <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
        </Button>
      </div>
    </motion.form>
  )
}
