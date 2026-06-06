'use client'

import { useCallback, useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  CircleDashed,
  HandCoins,
  Search,
  Target,
  Users,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { FormSubmitError } from '@/components/forms/FormSubmitError'
import { inquiryInputClass, inquiryLabelClass } from '@/components/inquiry/inquiryFormShared'
import { AFFILIATE_INQUIRY_PATH } from '@/data/affiliateProgram'
import {
  AffiliateApplicationError,
  fetchAffiliateEligibility,
  type AffiliateEligibilityResponse,
} from '@/lib/api/affiliateApplication'
import { normalizeReferralCode, referralCodeFormatHint } from '@/lib/referralCode'

const easeSmooth = [0.22, 1, 0.36, 1] as const

export function AffiliateEligibilityPage() {
  const searchParams = useSearchParams()
  const [code, setCode] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<AffiliateEligibilityResponse | null>(null)

  const runLookup = useCallback(async (lookup: { code?: string; email?: string }) => {
    setError('')
    setLoading(true)
    try {
      const data = await fetchAffiliateEligibility(lookup)
      setResult(data)
    } catch (err) {
      setResult(null)
      setError(err instanceof AffiliateApplicationError ? err.message : 'Could not load eligibility.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const initialCode = searchParams.get('code') ?? searchParams.get('ref') ?? ''
    const initialEmail = searchParams.get('email') ?? ''
    if (initialCode) {
      const normalized = normalizeReferralCode(initialCode)
      setCode(normalized)
      void runLookup({ code: normalized })
    } else if (initialEmail) {
      setEmail(initialEmail.trim())
      void runLookup({ email: initialEmail.trim() })
    }
  }, [searchParams, runLookup])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const normalizedCode = normalizeReferralCode(code)
    const trimmedEmail = email.trim()
    if (!normalizedCode && !trimmedEmail) {
      setError('Enter your affiliate code or the email you used when applying.')
      return
    }
    void runLookup({
      code: normalizedCode || undefined,
      email: trimmedEmail || undefined,
    })
  }

  const progressPercent = result
    ? Math.min(100, Math.round((result.successfulReferrals / result.requiredReferrals) * 100))
    : 0

  return (
    <>
      <PageHeader
        eyebrow="Affiliate program"
        title="Check your eligibility"
        description="Track successful referrals and see whether you have unlocked full Projonexa Affiliate Program eligibility. A successful referral is counted when a referred student or corporate inquiry completes their consultation per program terms."
      />

      <section className="section-padding border-b border-black/[0.04] dark:border-white/[0.04]">
        <div className="container-wide">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
            <motion.form
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: easeSmooth }}
              onSubmit={handleSubmit}
              className="careers-form-panel rounded-2xl p-5 sm:rounded-3xl sm:p-8"
            >
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Look up your status</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Use the affiliate code issued after email verification, or the email address on your
                application.
              </p>

              <div className="mt-6 space-y-5">
                <div className="careers-form-field">
                  <label htmlFor="eligibility-code" className={inquiryLabelClass}>
                    Affiliate code
                  </label>
                  <input
                    id="eligibility-code"
                    name="code"
                    value={code}
                    onChange={(e) => setCode(normalizeReferralCode(e.target.value))}
                    autoComplete="off"
                    className={`${inquiryInputClass} font-mono uppercase tracking-wide`}
                    placeholder={referralCodeFormatHint()}
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden>
                    <div className="w-full border-t border-black/[0.08] dark:border-white/[0.08]" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase tracking-wider">
                    <span className="bg-white px-3 text-zinc-400 dark:bg-zinc-950">or</span>
                  </div>
                </div>

                <div className="careers-form-field">
                  <label htmlFor="eligibility-email" className={inquiryLabelClass}>
                    Application email
                  </label>
                  <input
                    id="eligibility-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className={inquiryInputClass}
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <FormSubmitError message={error} />

              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="mt-6 w-full shadow-glow-sm"
              >
                <Search className="h-4 w-4" aria-hidden />
                {loading ? 'Checking…' : 'Check eligibility'}
              </Button>

              <p className="mt-5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Don&apos;t have a code yet?{' '}
                <Link href={AFFILIATE_INQUIRY_PATH} className="font-semibold text-brand-primary dark:text-brand-accent">
                  Apply for the affiliate program
                </Link>{' '}
                and verify your email to receive one.
              </p>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: easeSmooth }}
              className="rounded-2xl border border-black/[0.08] bg-white/70 p-5 dark:border-white/[0.08] dark:bg-zinc-900/40 sm:rounded-3xl sm:p-8"
            >
              {!result ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                  <Target className="h-12 w-12 text-zinc-300 dark:text-zinc-600" aria-hidden />
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    Enter your affiliate code or email to view referral progress and eligibility for
                    the full program.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-primary dark:text-brand-accent">
                        Affiliate account
                      </p>
                      <p className="mt-1 font-mono text-2xl font-bold text-zinc-900 dark:text-white">
                        {result.affiliateCode}
                      </p>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{result.name}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        result.eligible
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                          : 'bg-amber-500/15 text-amber-800 dark:text-amber-200'
                      }`}
                    >
                      {result.eligible ? (
                        <>
                          <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                          Eligible
                        </>
                      ) : (
                        <>
                          <CircleDashed className="h-3.5 w-3.5" aria-hidden />
                          In progress
                        </>
                      )}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {result.message}
                  </p>

                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      <span>Successful referrals</span>
                      <span>
                        {result.successfulReferrals} / {result.requiredReferrals}
                      </span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-200/80 dark:bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-500 dark:from-brand-accent dark:to-brand-primary"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-black/[0.06] bg-black/[0.02] p-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
                      <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                        <Users className="h-4 w-4" aria-hidden />
                        <span className="text-xs font-semibold uppercase tracking-wide">Total</span>
                      </div>
                      <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
                        {result.totalReferrals}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">Referrals recorded</p>
                    </div>
                    <div className="rounded-xl border border-black/[0.06] bg-black/[0.02] p-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
                      <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                        <CheckCircle2 className="h-4 w-4" aria-hidden />
                        <span className="text-xs font-semibold uppercase tracking-wide">Successful</span>
                      </div>
                      <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
                        {result.successfulReferrals}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">Completed per terms</p>
                    </div>
                  </div>

                  {!result.eligible && result.referralsRemaining > 0 ? (
                    <p className="mt-5 rounded-xl border border-brand-primary/20 bg-brand-primary/[0.05] px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300">
                      <strong className="font-semibold">{result.referralsRemaining}</strong> more
                      successful referral{result.referralsRemaining === 1 ? '' : 's'} needed for full
                      program eligibility.
                    </p>
                  ) : null}

                  <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    <Button to={AFFILIATE_INQUIRY_PATH} variant="secondary" className="w-full sm:flex-1">
                      <HandCoins className="h-4 w-4" aria-hidden />
                      Apply / get code
                    </Button>
                    <a
                      href={result.studentShareUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-white/[0.1] dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 sm:flex-1"
                    >
                      Share student link
                      <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
                    </a>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
