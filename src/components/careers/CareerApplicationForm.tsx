import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Send } from 'lucide-react'
import { FormSelectField } from '@/components/careers/FormSelectField'
import { Button } from '@/components/ui/Button'
import { FormSubmitError } from '@/components/forms/FormSubmitError'
import { useFormSubmission } from '@/hooks/useFormSubmission'
import { FORM_CATEGORIES } from '@/lib/api/forms'
import {
  CAREER_AVAILABILITY_OPTIONS,
  CAREER_EXPERIENCE_LEVELS,
  CAREER_ROLES,
} from '@/data/careers'

const easeSmooth = [0.22, 1, 0.36, 1] as const

const inputClass =
  'careers-form-input w-full min-w-0 rounded-xl border border-black/[0.1] bg-white px-4 py-3 text-zinc-900 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-white/[0.12] dark:bg-zinc-900/90 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-brand-accent dark:focus:ring-brand-accent/20'

const labelClass = 'mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200'

interface CareerApplicationFormProps {
  initialRoleId?: string
  variant?: 'standalone' | 'embedded'
}

export function CareerApplicationForm({
  initialRoleId = 'open-application',
  variant = 'embedded',
}: CareerApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [roleId, setRoleId] = useState(initialRoleId)
  const [experience, setExperience] = useState('student')
  const [availability, setAvailability] = useState('freelance')
  const isStandalone = variant === 'standalone'
  const { submitting, error, submit, clearError } = useFormSubmission()

  useEffect(() => {
    setRoleId(initialRoleId)
  }, [initialRoleId])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    clearError()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const location = String(data.get('location') ?? '').trim()
    const portfolio = String(data.get('portfolio') ?? '').trim()
    const skills = String(data.get('skills') ?? '').trim()
    const motivation = String(data.get('motivation') ?? '').trim()

    try {
      await submit({
        category: FORM_CATEGORIES.careerApplication,
        name,
        email,
        phone,
        payload: {
          role: String(data.get('role') ?? '').trim(),
          experience: String(data.get('experience') ?? '').trim(),
          availability: String(data.get('availability') ?? '').trim(),
          location,
          portfolio,
          skills,
          motivation,
        },
      })
      setSubmitted(true)
    } catch {
      // Error state handled by hook
    }
  }

  const motionProps = isStandalone
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: easeSmooth } }
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.45, ease: easeSmooth },
      }

  if (submitted) {
    return (
      <motion.div
        {...motionProps}
        className="careers-form-panel mx-auto flex w-full max-w-2xl flex-col items-center rounded-2xl px-5 py-12 text-center sm:rounded-3xl sm:px-10 sm:py-14"
      >
        <CheckCircle2 className="h-14 w-14 text-emerald-500" aria-hidden />
        <h2 className="mt-5 text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
          Application submitted
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Thank you for applying. Our team has received your application and will review it soon.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-8 w-full sm:w-auto"
          onClick={() => setSubmitted(false)}
        >
          Submit another application
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.form
      id="apply-form"
      {...motionProps}
      onSubmit={handleSubmit}
      className={`careers-form-panel mx-auto w-full min-w-0 rounded-2xl p-5 sm:rounded-3xl sm:p-8 ${
        isStandalone ? 'max-w-2xl' : 'max-w-none lg:p-10'
      }`}
    >
      {!isStandalone && (
        <div className="mb-8 border-b border-black/[0.06] pb-6 dark:border-white/[0.08]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary dark:text-brand-accent">
            Application form
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
            Apply to join the team
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Fields marked with <span className="text-brand-primary dark:text-brand-accent">*</span>{' '}
            are required.
          </p>
        </div>
      )}

      {isStandalone && (
        <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:mb-6">
          Fields marked with{' '}
          <span className="font-semibold text-brand-primary dark:text-brand-accent">*</span> are
          required.
        </p>
      )}

      <div className="flex flex-col gap-5">
        <div className="careers-form-field w-full min-w-0">
          <label htmlFor="career-name" className={labelClass}>
            Full name <span className="text-brand-primary dark:text-brand-accent">*</span>
          </label>
          <input
            id="career-name"
            name="name"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Your full name"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="careers-form-field min-w-0">
            <label htmlFor="career-email" className={labelClass}>
              Email <span className="text-brand-primary dark:text-brand-accent">*</span>
            </label>
            <input
              id="career-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputClass}
              placeholder="you@email.com"
            />
          </div>

          <div className="careers-form-field min-w-0">
            <label htmlFor="career-phone" className={labelClass}>
              Phone / WhatsApp
            </label>
            <input
              id="career-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={inputClass}
              placeholder="+91 …"
            />
          </div>
        </div>

        <FormSelectField
          id="career-role"
          name="role"
          required
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          label={
            <>
              Role you&apos;re applying for{' '}
              <span className="text-brand-primary dark:text-brand-accent">*</span>
            </>
          }
        >
          {CAREER_ROLES.map((role) => (
            <option key={role.id} value={role.id}>
              {role.title}
            </option>
          ))}
        </FormSelectField>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormSelectField
            id="career-experience"
            name="experience"
            required
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            label={
              <>
                Experience level{' '}
                <span className="text-brand-primary dark:text-brand-accent">*</span>
              </>
            }
          >
            {CAREER_EXPERIENCE_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </FormSelectField>

          <FormSelectField
            id="career-availability"
            name="availability"
            required
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            label={
              <>
                Availability <span className="text-brand-primary dark:text-brand-accent">*</span>
              </>
            }
          >
            {CAREER_AVAILABILITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </FormSelectField>
        </div>

        <div className="careers-form-field w-full min-w-0">
          <label htmlFor="career-location" className={labelClass}>
            City / Country
          </label>
          <input
            id="career-location"
            name="location"
            className={inputClass}
            placeholder="e.g. Pune, Karnataka, India"
          />
        </div>

        <div className="careers-form-field w-full min-w-0">
          <label htmlFor="career-portfolio" className={labelClass}>
            Portfolio, LinkedIn, GitHub, or resume link
          </label>
          <input
            id="career-portfolio"
            name="portfolio"
            type="url"
            className={inputClass}
            placeholder="https://linkedin.com/in/…"
          />
        </div>

        <div className="careers-form-field w-full min-w-0">
          <label htmlFor="career-skills" className={labelClass}>
            Skills & technologies <span className="text-brand-primary dark:text-brand-accent">*</span>
          </label>
          <textarea
            id="career-skills"
            name="skills"
            required
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="e.g. React, Node.js, Figma, Python…"
          />
        </div>

        <div className="careers-form-field w-full min-w-0">
          <label htmlFor="career-motivation" className={labelClass}>
            Why do you want to join Projonexa?{' '}
            <span className="text-brand-primary dark:text-brand-accent">*</span>
          </label>
          <textarea
            id="career-motivation"
            name="motivation"
            required
            rows={4}
            className={`${inputClass} resize-none`}
            placeholder="Your goals, what you can contribute, and the work you're looking for…"
          />
        </div>
      </div>

      <FormSubmitError message={error} />

      <p className="mt-5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 sm:mt-6">
        By submitting, you agree to share this information with the Projonexa team for recruitment
        purposes only.
      </p>

      <div className={isStandalone ? 'mt-6 sm:mt-8' : 'mt-6'}>
        <Button
          type="submit"
          variant="primary"
          disabled={submitting}
          className="w-full shadow-glow-sm sm:min-w-[260px]"
        >
          <Send className="h-4 w-4" aria-hidden />
          {submitting ? 'Submitting…' : 'Submit application'}
          <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
        </Button>
      </div>
    </motion.form>
  )
}
