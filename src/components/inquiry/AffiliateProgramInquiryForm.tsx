import { useCallback, useMemo, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, HandCoins, Mail } from 'lucide-react'
import { FormSelectField } from '@/components/careers/FormSelectField'
import {
  inquiryInputClass,
  inquiryLabelClass,
  InquiryRequired,
} from '@/components/inquiry/inquiryFormShared'
import { ReferralCodeDisplay } from '@/components/inquiry/ReferralCodeDisplay'
import { Button } from '@/components/ui/Button'
import { FormSubmitError } from '@/components/forms/FormSubmitError'
import { OtpInputField, OTP_CODE_LENGTH } from '@/components/forms/OtpInputField'
import {
  AFFILIATE_HEAR_ABOUT_OPTIONS,
  AFFILIATE_PROMOTION_CHANNEL_OPTIONS,
} from '@/data/affiliateProgram'
import { corporateInquiryPath, studentInquiryPath } from '@/data/projectInquiry'
import { BRAND } from '@/data/brand'
import {
  AffiliateApplicationError,
  confirmAffiliateApplication,
  initiateAffiliateApplication,
  resendAffiliateApplicationOtp,
} from '@/lib/api/affiliateApplication'

const easeSmooth = [0.22, 1, 0.36, 1] as const

type Step = 'form' | 'otp' | 'success'

interface AffiliateProgramInquiryFormProps {
  layout?: 'default' | 'split'
}

export function AffiliateProgramInquiryForm({ layout = 'default' }: AffiliateProgramInquiryFormProps) {
  const [step, setStep] = useState<Step>('form')
  const [hearAbout, setHearAbout] = useState<string>(AFFILIATE_HEAR_ABOUT_OPTIONS[3].value)
  const [promotionChannel, setPromotionChannel] = useState<string>(
    AFFILIATE_PROMOTION_CHANNEL_OPTIONS[2].value,
  )
  const [criteriaAck, setCriteriaAck] = useState(false)
  const [termsAck, setTermsAck] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState('')
  const [applicationId, setApplicationId] = useState('')
  const [pendingEmail, setPendingEmail] = useState('')
  const [otpMessage, setOtpMessage] = useState('')
  const [otp, setOtp] = useState('')
  const [issuedReferralCode, setIssuedReferralCode] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [whatsappSent, setWhatsappSent] = useState(false)

  const panelClass =
    layout === 'split'
      ? 'careers-form-panel w-full min-w-0 rounded-2xl p-5 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none'
      : 'careers-form-panel mx-auto w-full min-w-0 max-w-2xl rounded-2xl p-5 sm:rounded-3xl sm:p-8'

  const studentShareUrl = useMemo(() => {
    if (!issuedReferralCode) return ''
    const path = studentInquiryPath(issuedReferralCode)
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${path}`
    }
    return `${BRAND.url}${path}`
  }, [issuedReferralCode])

  const corporateShareUrl = useMemo(() => {
    if (!issuedReferralCode) return ''
    const path = corporateInquiryPath(issuedReferralCode)
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${path}`
    }
    return `${BRAND.url}${path}`
  }, [issuedReferralCode])

  const resetForm = useCallback(() => {
    setStep('form')
    setApplicationId('')
    setPendingEmail('')
    setOtp('')
    setOtpMessage('')
    setIssuedReferralCode('')
    setSuccessMessage('')
    setEmailSent(false)
    setWhatsappSent(false)
    setError('')
    setCriteriaAck(false)
    setTermsAck(false)
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const motivation = String(data.get('motivation') ?? '').trim()

    setSubmitting(true)
    try {
      const result = await initiateAffiliateApplication({
        name,
        email,
        phone,
        payload: {
          hearAbout: String(data.get('hearAbout') ?? '').trim(),
          promotionChannel: String(data.get('promotionChannel') ?? '').trim(),
          motivation,
          criteriaAck,
          termsAck,
        },
      })
      setApplicationId(result.applicationId)
      setPendingEmail(email)
      setOtpMessage(result.message)
      setOtp('')
      setStep('otp')
    } catch (err) {
      setError(err instanceof AffiliateApplicationError ? err.message : 'Something went wrong.')
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
      const result = await confirmAffiliateApplication({
        applicationId,
        email: pendingEmail,
        otp,
      })
      setIssuedReferralCode(result.referralCode)
      setSuccessMessage(result.message)
      setEmailSent(Boolean(result.notifications?.userEmail))
      setWhatsappSent(Boolean(result.notifications?.whatsapp))
      setStep('success')
    } catch (err) {
      setError(
        err instanceof AffiliateApplicationError ? err.message : 'Verification failed.',
      )
    } finally {
      setConfirming(false)
    }
  }

  const handleResendOtp = async () => {
    if (!applicationId || !pendingEmail) return
    setError('')
    setResending(true)
    try {
      const result = await resendAffiliateApplicationOtp({
        applicationId,
        email: pendingEmail,
      })
      setOtpMessage(result.message)
      setOtp('')
    } catch (err) {
      setError(err instanceof AffiliateApplicationError ? err.message : 'Could not resend code.')
    } finally {
      setResending(false)
    }
  }

  if (step === 'success' && issuedReferralCode) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeSmooth }}
        className={`${panelClass} flex flex-col items-center px-5 py-12 text-center sm:px-10 sm:py-14`}
      >
        <CheckCircle2 className="h-14 w-14 text-emerald-500" aria-hidden />
        <h2 className="mt-5 text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
          Email verified — your code is ready
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {successMessage ||
            'Your unique affiliate referral code has been issued. Share it with students and corporate clients when they book a project inquiry.'}
        </p>
        {(emailSent || whatsappSent) && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {emailSent ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/80 px-3 py-1.5 text-xs font-medium text-zinc-500 dark:border-white/[0.1] dark:bg-zinc-900/80 dark:text-zinc-400">
                <Mail className="h-3.5 w-3.5" aria-hidden />
                Code sent to your email
              </span>
            ) : null}
          </div>
        )}
        <ReferralCodeDisplay
          code={issuedReferralCode}
          shareUrl={studentShareUrl}
          corporateShareUrl={corporateShareUrl}
        />
        <p className="mt-6 max-w-md text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          Complete <strong className="font-semibold text-zinc-700 dark:text-zinc-300">5 successful referrals</strong>{' '}
          (student or corporate projects) to become eligible for the full Projonexa Affiliate Program.
        </p>
        <Link
          href={`/affiliate-program/eligibility?code=${encodeURIComponent(issuedReferralCode)}`}
          className="mt-4 text-sm font-semibold text-brand-primary hover:underline dark:text-brand-accent"
        >
          Track your eligibility &amp; referrals →
        </Link>
        <Button type="button" variant="secondary" className="mt-8 w-full sm:w-auto" onClick={resetForm}>
          Submit another application
        </Button>
      </motion.div>
    )
  }

  return (
    <>
      <motion.form
        id="affiliate-inquiry-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeSmooth }}
        onSubmit={handleSubmit}
        className={panelClass}
        hidden={step === 'otp'}
      >
        <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:mb-6">
          Fields marked with <InquiryRequired /> are required. After you verify your email, you will
          receive a unique code like <span className="font-mono font-semibold">NS109001</span>.
        </p>

        <div className="flex flex-col gap-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-primary dark:text-brand-accent">
            Contact details
          </p>

          <div className="careers-form-field w-full min-w-0 -mt-2">
            <label htmlFor="affiliate-name" className={inquiryLabelClass}>
              Full name <InquiryRequired />
            </label>
            <input
              id="affiliate-name"
              name="name"
              required
              autoComplete="name"
              className={inquiryInputClass}
              placeholder="Your full name"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="careers-form-field min-w-0">
              <label htmlFor="affiliate-email" className={inquiryLabelClass}>
                Email <InquiryRequired />
              </label>
              <input
                id="affiliate-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inquiryInputClass}
                placeholder="you@email.com"
              />
            </div>
            <div className="careers-form-field min-w-0">
              <label htmlFor="affiliate-phone" className={inquiryLabelClass}>
                Phone / WhatsApp <InquiryRequired />
              </label>
              <input
                id="affiliate-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                className={inquiryInputClass}
                placeholder="+91 …"
              />
            </div>
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-primary dark:text-brand-accent">
            How you will promote
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 -mt-2">
            <FormSelectField
              id="affiliate-hear-about"
              name="hearAbout"
              value={hearAbout}
              onChange={(e) => setHearAbout(e.target.value)}
              label="How did you hear about us?"
            >
              {AFFILIATE_HEAR_ABOUT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </FormSelectField>

            <FormSelectField
              id="affiliate-promotion-channel"
              name="promotionChannel"
              required
              value={promotionChannel}
              onChange={(e) => setPromotionChannel(e.target.value)}
              label={
                <>
                  Main promotion channel <InquiryRequired />
                </>
              }
            >
              {AFFILIATE_PROMOTION_CHANNEL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </FormSelectField>
          </div>

          <div className="careers-form-field w-full min-w-0">
            <label htmlFor="affiliate-motivation" className={inquiryLabelClass}>
              Why do you want to join? <InquiryRequired />
            </label>
            <textarea
              id="affiliate-motivation"
              name="motivation"
              required
              rows={4}
              className={`${inquiryInputClass} resize-none`}
              placeholder="Tell us how you plan to refer students and corporate clients ethically…"
            />
          </div>

          <fieldset className="space-y-3 rounded-2xl border border-black/[0.08] bg-black/[0.02] p-4 dark:border-white/[0.08] dark:bg-white/[0.03] sm:p-5">
            <legend className="px-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              Confirmations <InquiryRequired />
            </legend>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <input
                type="checkbox"
                name="criteriaAck"
                required
                checked={criteriaAck}
                onChange={(e) => setCriteriaAck(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-zinc-300 text-brand-primary focus:ring-brand-primary/30"
              />
              <span>
                I confirm that I meet all{' '}
                <strong className="font-semibold text-zinc-900 dark:text-white">
                  eligibility criteria
                </strong>{' '}
                listed above.
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <input
                type="checkbox"
                name="termsAck"
                required
                checked={termsAck}
                onChange={(e) => setTermsAck(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-zinc-300 text-brand-primary focus:ring-brand-primary/30"
              />
              <span>
                I agree to promote Projonexa ethically and accept that full program benefits unlock
                after 5 successful referrals per program terms.
              </span>
            </label>
          </fieldset>
        </div>

        <FormSubmitError message={error} />

        <div className="mt-6 sm:mt-8">
          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            className="w-full shadow-glow-sm sm:min-w-[260px]"
          >
            <HandCoins className="h-4 w-4" aria-hidden />
            {submitting ? 'Sending verification…' : 'Apply & verify email'}
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </Button>
        </div>
      </motion.form>

      <AnimatePresence>
        {step === 'otp' ? (
          <motion.div
            key="affiliate-otp"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: easeSmooth }}
            className={panelClass}
          >
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white sm:text-xl">
              Verify your email
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {otpMessage ||
                `Enter the 6-digit code we sent to ${pendingEmail} to receive your affiliate referral code.`}
            </p>
            <form onSubmit={handleConfirmOtp} className="mt-6 space-y-5">
              <OtpInputField value={otp} onChange={setOtp} disabled={confirming} />
              <FormSubmitError message={error} />
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit" variant="primary" disabled={confirming} className="w-full sm:flex-1">
                  {confirming ? 'Verifying…' : 'Confirm & get referral code'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={resending}
                  className="w-full sm:flex-1"
                  onClick={() => void handleResendOtp()}
                >
                  {resending ? 'Resending…' : 'Resend code'}
                </Button>
              </div>
              <button
                type="button"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                onClick={resetForm}
              >
                ← Edit application
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
