'use client'

import { CheckCircle2, Loader2, Tag } from 'lucide-react'
import {
  inquiryInputClass,
  inquiryLabelClass,
} from '@/components/inquiry/inquiryFormShared'
import type { ReferralCodeFieldState } from '@/lib/hooks/useReferralCodeField'
import { referralCodeFormatHint } from '@/lib/referralCode'

type ReferralCodeFieldProps = {
  id: string
  field: ReferralCodeFieldState
}

export function ReferralCodeField({ id, field }: ReferralCodeFieldProps) {
  const { code, setCode, error, verified, verifying } = field
  const hintId = `${id}-hint`
  const errorId = `${id}-error`

  return (
    <div className="careers-form-field w-full min-w-0">
      <label htmlFor={id} className={inquiryLabelClass}>
        Referral code{' '}
        <span className="font-normal text-zinc-500 dark:text-zinc-500">(optional)</span>
      </label>
      <div className="relative">
        <Tag
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          aria-hidden
        />
        <input
          id={id}
          name="referralCode"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoComplete="off"
          className={`${inquiryInputClass} pl-10 pr-10 font-mono uppercase tracking-wide ${
            verified ? 'border-emerald-500/60 ring-1 ring-emerald-500/25' : ''
          }`}
          placeholder={referralCodeFormatHint()}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : hintId}
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          {verifying ? (
            <Loader2 className="h-4 w-4 animate-spin text-zinc-400" aria-hidden />
          ) : verified ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden />
          ) : null}
        </span>
      </div>
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : verified ? (
        <p id={hintId} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
          Referral code verified
        </p>
      ) : (
        <p id={hintId} className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          Referred by a Projonexa affiliate? Enter their code here. If you do not have one, leave
          this field blank.
        </p>
      )}
    </div>
  )
}
