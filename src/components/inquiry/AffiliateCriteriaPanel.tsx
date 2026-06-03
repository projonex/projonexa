import { AFFILIATE_ELIGIBILITY_CRITERIA } from '@/data/affiliateProgram'
import { CircleCheck } from 'lucide-react'

export function AffiliateCriteriaPanel() {
  return (
    <section
      className="rounded-2xl border border-black/[0.08] bg-black/[0.02] p-4 dark:border-white/[0.08] dark:bg-white/[0.03] sm:p-5"
      aria-labelledby="affiliate-criteria-heading"
    >
      <h2
        id="affiliate-criteria-heading"
        className="text-sm font-semibold text-zinc-900 dark:text-white sm:text-base"
      >
        Eligibility criteria
      </h2>
      <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-sm">
        You must meet all of the following to be considered for the affiliate program.
      </p>
      <ul className="mt-4 space-y-3">
        {AFFILIATE_ELIGIBILITY_CRITERIA.map((item) => (
          <li key={item.title} className="flex gap-3 text-sm">
            <CircleCheck
              className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary dark:text-brand-accent"
              aria-hidden
            />
            <div>
              <p className="font-medium text-zinc-800 dark:text-zinc-200">{item.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
