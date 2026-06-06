import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Mail, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { FormSubmitError } from '@/components/forms/FormSubmitError'
import { useFormSubmission } from '@/hooks/useFormSubmission'
import { FORM_CATEGORIES, type FormNotificationStatus } from '@/lib/api/forms'
import { formatContactSuccessMessage } from '@/lib/formNotifications'

const easeSmooth = [0.22, 1, 0.36, 1] as const

const inputClass =
  'careers-form-input w-full min-w-0 rounded-xl border border-black/[0.1] bg-white px-4 py-3 text-zinc-900 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-white/[0.12] dark:bg-zinc-900/90 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-brand-accent dark:focus:ring-brand-accent/20'

const labelClass = 'mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const { submitting, error, submit, clearError } = useFormSubmission()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    clearError()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const subject = String(data.get('subject') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    try {
      const response = await submit({
        category: FORM_CATEGORIES.contact,
        name,
        email,
        phone,
        payload: { subject, message },
      })
      setSuccessMessage(formatContactSuccessMessage(response.message, response.notifications))
      setEmailSent(Boolean(response.notifications?.userEmail))
      setSubmitted(true)
    } catch {
      // Error state handled by hook
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: easeSmooth }}
        className="contact-form-panel flex flex-col items-center rounded-3xl px-6 py-14 text-center sm:px-10"
      >
        <CheckCircle2 className="h-14 w-14 text-emerald-500" aria-hidden />
        <h2 className="mt-5 text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
          Message sent
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {successMessage}
        </p>
        {emailSent && (
          <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/80 px-3 py-1.5 text-xs font-medium text-zinc-500 dark:border-white/[0.1] dark:bg-zinc-900/80 dark:text-zinc-400">
            <Mail className="h-3.5 w-3.5" aria-hidden />
            Confirmation email sent
          </span>
        )}
        <Button
          type="button"
          variant="secondary"
          className="mt-8 w-full sm:w-auto"
          onClick={() => {
            setSubmitted(false)
            setSuccessMessage('')
            setEmailSent(false)
          }}
        >
          Send another message
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeSmooth }}
      onSubmit={handleSubmit}
      className="contact-form-panel w-full rounded-3xl p-5 sm:p-8 lg:p-10"
    >
      <div className="mb-6 border-b border-black/[0.06] pb-6 dark:border-white/[0.08] sm:mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary dark:text-brand-accent">
          Contact us
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
          Send us a message
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Fill in your details and we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Full name <span className="text-brand-primary dark:text-brand-accent">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Your full name"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="contact-email" className={labelClass}>
              Email <span className="text-brand-primary dark:text-brand-accent">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputClass}
              placeholder="you@email.com"
            />
          </div>
          <div className="min-w-0">
            <label htmlFor="contact-phone" className={labelClass}>
              Phone <span className="font-normal text-zinc-500">(optional)</span>
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={inputClass}
              placeholder="+91 …"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-subject" className={labelClass}>
            Subject <span className="text-brand-primary dark:text-brand-accent">*</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            required
            className={inputClass}
            placeholder="What is your message about?"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClass}>
            Message <span className="text-brand-primary dark:text-brand-accent">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            className={`${inputClass} resize-none`}
            placeholder="Tell us how we can help you…"
          />
        </div>
      </div>

      <FormSubmitError message={error} />

      <p className="mt-6 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
        By submitting, you agree to share this information with Projonexa so we can respond to your
        inquiry. You will receive a confirmation email shortly.
      </p>

      <Button
        type="submit"
        variant="primary"
        disabled={submitting}
        className="mt-6 w-full shadow-glow-sm sm:w-auto"
      >
        <Send className="h-4 w-4" aria-hidden />
        {submitting ? 'Sending…' : 'Send message'}
        <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
      </Button>
    </motion.form>
  )
}
