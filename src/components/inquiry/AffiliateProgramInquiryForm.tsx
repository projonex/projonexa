import { useMemo, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, HandCoins } from 'lucide-react'
import { FormSelectField } from '@/components/careers/FormSelectField'
import { AffiliateCriteriaPanel } from '@/components/inquiry/AffiliateCriteriaPanel'
import {
  inquiryInputClass,
  inquiryLabelClass,
  InquiryRequired,
} from '@/components/inquiry/inquiryFormShared'
import { ReferralCodeDisplay } from '@/components/inquiry/ReferralCodeDisplay'
import { Button } from '@/components/ui/Button'
import {
  AFFILIATE_HEAR_ABOUT_OPTIONS,
  AFFILIATE_PROMOTION_CHANNEL_OPTIONS,
  AFFILIATE_YEAR_OPTIONS,
  labelForAffiliateOption,
} from '@/data/affiliateProgram'
import { PROJECT_INQUIRY_EMAIL, studentInquiryPath } from '@/data/projectInquiry'
import { BRAND } from '@/data/brand'
import { generateReferralCode } from '@/lib/referralCode'

const easeSmooth = [0.22, 1, 0.36, 1] as const

interface AffiliateProgramInquiryFormProps {
  layout?: 'default' | 'split'
}

export function AffiliateProgramInquiryForm({ layout = 'default' }: AffiliateProgramInquiryFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [issuedReferralCode, setIssuedReferralCode] = useState('')
  const [year, setYear] = useState<string>(AFFILIATE_YEAR_OPTIONS[2].value)
  const [hearAbout, setHearAbout] = useState<string>(AFFILIATE_HEAR_ABOUT_OPTIONS[3].value)
  const [promotionChannel, setPromotionChannel] = useState<string>(
    AFFILIATE_PROMOTION_CHANNEL_OPTIONS[2].value,
  )
  const [criteriaAck, setCriteriaAck] = useState(false)
  const [termsAck, setTermsAck] = useState(false)

  const panelClass =
    layout === 'split'
      ? 'careers-form-panel w-full min-w-0 rounded-2xl p-5 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none'
      : 'careers-form-panel mx-auto w-full min-w-0 max-w-2xl rounded-2xl p-5 sm:rounded-3xl sm:p-8'

  const shareUrl = useMemo(() => {
    if (!issuedReferralCode) return ''
    const path = studentInquiryPath(issuedReferralCode)
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${path}`
    }
    return `${BRAND.url}${path}`
  }, [issuedReferralCode])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const college = String(data.get('college') ?? '').trim()
    const branch = String(data.get('branch') ?? '').trim()
    const social = String(data.get('socialProfile') ?? '').trim()
    const motivation = String(data.get('motivation') ?? '').trim()
    const referralCode = generateReferralCode()

    const body = encodeURIComponent(
      [
        'Projonexa — Affiliate Program Application',
        '────────────────────────',
        `Applicant: ${name}`,
        `Email: ${email}`,
        `Phone / WhatsApp: ${phone}`,
        `College / University: ${college}`,
        branch ? `Branch / Department: ${branch}` : null,
        `Year: ${labelForAffiliateOption(AFFILIATE_YEAR_OPTIONS, String(data.get('year') ?? ''))}`,
        `Primary social profile: ${social}`,
        `How they heard about us: ${labelForAffiliateOption(AFFILIATE_HEAR_ABOUT_OPTIONS, String(data.get('hearAbout') ?? ''))}`,
        `Planned promotion channel: ${labelForAffiliateOption(AFFILIATE_PROMOTION_CHANNEL_OPTIONS, String(data.get('promotionChannel') ?? ''))}`,
        '',
        `Assigned referral code: ${referralCode}`,
        '',
        'Why they want to join:',
        motivation,
        '',
        'Confirmations:',
        '✓ Meets eligibility criteria',
        '✓ Agrees to affiliate program terms',
      ]
        .filter(Boolean)
        .join('\n'),
    )

    const subject = encodeURIComponent(`Affiliate Application — ${name} — ${referralCode}`)
    window.location.href = `mailto:${PROJECT_INQUIRY_EMAIL}?subject=${subject}&body=${body}`
    setIssuedReferralCode(referralCode)
    setSubmitted(true)
  }

  if (submitted && issuedReferralCode) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeSmooth }}
        className={`${panelClass} flex flex-col items-center px-5 py-12 text-center sm:px-10 sm:py-14`}
      >
        <CheckCircle2 className="h-14 w-14 text-emerald-500" aria-hidden />
        <h2 className="mt-5 text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
          Application submitted
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Your email client should open with your application details. Send the message to complete
          your request — our team will verify eligibility and confirm your affiliate status.
        </p>
        <ReferralCodeDisplay code={issuedReferralCode} shareUrl={shareUrl} />
        <p className="mt-6 max-w-md text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          Save your referral code now. Commission and payouts apply only after Projonexa approves your
          application and a referred student inquiry converts per program terms.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-8 w-full sm:w-auto"
          onClick={() => {
            setSubmitted(false)
            setIssuedReferralCode('')
            setCriteriaAck(false)
            setTermsAck(false)
          }}
        >
          Submit another application
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.form
      id="affiliate-inquiry-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeSmooth }}
      onSubmit={handleSubmit}
      className={panelClass}
    >
      <AffiliateCriteriaPanel />

      <p className="mb-5 mt-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:mb-6">
        Fields marked with <InquiryRequired /> are required.
      </p>

      <div className="flex flex-col gap-5">
        <div className="careers-form-field w-full min-w-0">
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

        <div className="careers-form-field w-full min-w-0">
          <label htmlFor="affiliate-college" className={inquiryLabelClass}>
            College / University <InquiryRequired />
          </label>
          <input
            id="affiliate-college"
            name="college"
            required
            className={inquiryInputClass}
            placeholder="Institution name"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormSelectField
            id="affiliate-year"
            name="year"
            required
            value={year}
            onChange={(e) => setYear(e.target.value)}
            label={
              <>
                Year of study <InquiryRequired />
              </>
            }
          >
            {AFFILIATE_YEAR_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </FormSelectField>

          <div className="careers-form-field min-w-0">
            <label htmlFor="affiliate-branch" className={inquiryLabelClass}>
              Branch / Department
            </label>
            <input
              id="affiliate-branch"
              name="branch"
              className={inquiryInputClass}
              placeholder="e.g. Computer Engineering"
            />
          </div>
        </div>

        <div className="careers-form-field w-full min-w-0">
          <label htmlFor="affiliate-social" className={inquiryLabelClass}>
            Primary social profile <InquiryRequired />
          </label>
          <input
            id="affiliate-social"
            name="socialProfile"
            type="url"
            required
            className={inquiryInputClass}
            placeholder="LinkedIn or Instagram profile URL"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
            placeholder="Tell us how you plan to refer students ethically and why this program fits you…"
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
              I agree to promote Projonexa ethically and accept that commissions apply only on
              verified conversions per the affiliate program terms shared after approval.
            </span>
          </label>
        </fieldset>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 sm:mt-6">
        After you submit, you will receive a unique referral code to share with students. Send the
        email message to complete your application.
      </p>

      <div className="mt-6 sm:mt-8">
        <Button type="submit" variant="primary" className="w-full shadow-glow-sm sm:min-w-[260px]">
          <HandCoins className="h-4 w-4" aria-hidden />
          Apply for affiliate program
          <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
        </Button>
      </div>
    </motion.form>
  )
}
