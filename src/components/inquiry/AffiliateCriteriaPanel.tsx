import { AFFILIATE_ELIGIBILITY_CRITERIA } from '@/data/affiliateProgram'

interface AffiliateCriteriaPanelProps {
  /** Sidebar layout on affiliate apply (left column on desktop). */
  variant?: 'sidebar' | 'compact'
}

export function AffiliateCriteriaPanel({ variant = 'sidebar' }: AffiliateCriteriaPanelProps) {
  const isSidebar = variant === 'sidebar'

  return (
    <section
      className={
        isSidebar
          ? 'affiliate-criteria-sidebar mx-auto mt-6 w-full max-w-md lg:mx-0 lg:mt-8 lg:max-w-none'
          : 'rounded-2xl border border-black/[0.08] bg-black/[0.02] p-4 dark:border-white/[0.08] dark:bg-white/[0.03] sm:p-5'
      }
      aria-labelledby="affiliate-criteria-heading"
    >
      <div
        className={
          isSidebar
            ? 'rounded-2xl border border-black/[0.08] bg-white/60 p-4 shadow-sm backdrop-blur-sm dark:border-white/[0.1] dark:bg-white/[0.04] sm:p-5 lg:rounded-3xl lg:p-6'
            : undefined
        }
      >
        <h2
          id="affiliate-criteria-heading"
          className={
            isSidebar
              ? 'text-base font-bold tracking-tight text-zinc-900 dark:text-white lg:text-lg'
              : 'text-sm font-semibold text-zinc-900 dark:text-white sm:text-base'
          }
        >
          Eligibility criteria
        </h2>
        <p
          className={
            isSidebar
              ? 'mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400'
              : 'mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-sm'
          }
        >
          You must meet all of the following to be considered for the affiliate program.
        </p>
        <ol className="mt-5 space-y-4 lg:mt-6">
          {AFFILIATE_ELIGIBILITY_CRITERIA.map((item, index) => (
            <li key={item.title} className="flex gap-3 sm:gap-3.5">
              <span
                className="affiliate-criteria-index flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold tabular-nums sm:h-8 sm:w-8 sm:text-sm"
                aria-hidden
              >
                {index + 1}
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white sm:text-[15px]">
                  {item.title}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm sm:leading-relaxed">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
