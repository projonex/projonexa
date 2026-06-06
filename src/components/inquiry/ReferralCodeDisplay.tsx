import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ReferralCodeDisplayProps {
  code: string
  shareUrl: string
  corporateShareUrl?: string
}

export function ReferralCodeDisplay({ code, shareUrl, corporateShareUrl }: ReferralCodeDisplayProps) {
  const [copiedField, setCopiedField] = useState<'code' | 'student' | 'corporate' | null>(null)

  const copy = async (text: string, field: 'code' | 'student' | 'corporate') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      window.setTimeout(() => setCopiedField(null), 2000)
    } catch {
      /* fallback: user can select manually */
    }
  }

  return (
    <div className="affiliate-referral-card mt-6 w-full max-w-md rounded-2xl border border-brand-primary/25 bg-brand-primary/[0.06] p-5 text-left dark:border-brand-primary/30 dark:bg-brand-primary/[0.08]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-mid dark:text-brand-accent">
        Your referral code
      </p>
      <p
        className="mt-2 font-mono text-2xl font-bold tracking-wide text-zinc-900 dark:text-white sm:text-3xl"
        aria-label={`Referral code ${code}`}
      >
        {code}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
        Share this code when students or corporate clients book a project inquiry (optional field on
        the form).
      </p>
      <div className="mt-4 flex flex-col gap-2">
        <Button
          type="button"
          variant="primary"
          className="w-full"
          onClick={() => copy(code, 'code')}
        >
          {copiedField === 'code' ? (
            <>
              <Check className="h-4 w-4" aria-hidden />
              Code copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden />
              Copy code
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={() => copy(shareUrl, 'student')}
        >
          {copiedField === 'student' ? (
            <>
              <Check className="h-4 w-4" aria-hidden />
              Student link copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden />
              Copy student inquiry link
            </>
          )}
        </Button>
        {corporateShareUrl ? (
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => copy(corporateShareUrl, 'corporate')}
          >
            {copiedField === 'corporate' ? (
              <>
                <Check className="h-4 w-4" aria-hidden />
                Corporate link copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" aria-hidden />
                Copy corporate inquiry link
              </>
            )}
          </Button>
        ) : null}
      </div>
      <p className="mt-3 break-all font-mono text-[11px] text-zinc-500 dark:text-zinc-500">{shareUrl}</p>
      {corporateShareUrl ? (
        <p className="mt-1 break-all font-mono text-[11px] text-zinc-500 dark:text-zinc-500">
          {corporateShareUrl}
        </p>
      ) : null}
    </div>
  )
}
