'use client'

import { StandaloneAppBar } from '@/components/layout/StandaloneAppBar'
import { BrandWordmark } from '@/components/ui/BrandWordmark'
import { motion } from 'framer-motion'
import { useEffect, type ReactNode } from 'react'

const easeSmooth = [0.22, 1, 0.36, 1] as const

interface InquiryStandaloneShellProps {
  eyebrow: string
  title: string
  description?: string
  badge?: string
  backTo: string
  backLabel: string
  /** Desktop: intro left, form right. Mobile stays stacked (unchanged). */
  desktopSplit?: boolean
  /** Custom bullet list for split layout sidebar (defaults to student inquiry copy). */
  sidebarItems?: string[]
  /** Rich sidebar block (e.g. eligibility criteria) — replaces sidebarItems when set. */
  sidebarAside?: ReactNode
  /** Optional link or note below the page description (e.g. FAQ link). */
  headerExtra?: ReactNode
  children: ReactNode
}

export function InquiryStandaloneShell({
  eyebrow,
  title,
  description,
  badge,
  backTo,
  backLabel,
  desktopSplit = false,
  sidebarItems,
  sidebarAside,
  headerExtra,
  children,
}: InquiryStandaloneShellProps) {
  const splitBullets =
    sidebarAside != null
      ? null
      : (sidebarItems ??
        (desktopSplit
          ? [
              'Final year, mini, AI/ML, IoT & more',
              'Pick a date & time for your consultation',
              'Confirmation within 24 hours on business days',
            ]
          : null))
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const headerClassName = desktopSplit
    ? 'mb-6 shrink-0 text-center sm:mb-8 lg:sticky lg:top-14 lg:mb-0 lg:self-start lg:text-left lg:pt-2'
    : 'mb-6 shrink-0 text-center sm:mb-8'

  const descriptionClassName = desktopSplit
    ? 'mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 lg:mx-0 lg:max-w-sm'
    : 'mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400'

  return (
    <div
      className={`careers-apply-standalone relative min-h-screen text-zinc-900 dark:text-zinc-100${desktopSplit ? ' inquiry-standalone-split' : ''}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/[0.06] via-transparent to-brand-secondary/[0.08] dark:from-brand-primary/[0.08] dark:to-brand-secondary/[0.06]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[min(100%,720px)] -translate-x-1/2 rounded-full bg-brand-primary/10 blur-[100px] dark:bg-brand-primary/15 lg:left-[25%]"
      />

      <StandaloneAppBar backTo={backTo} backLabel={backLabel} />

      <div
        className={`relative z-10 mx-auto flex min-h-screen w-full flex-col px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 sm:px-6 sm:py-10 sm:pb-12 sm:pt-10${
          desktopSplit
            ? ' max-w-2xl lg:max-w-6xl lg:px-10 xl:max-w-7xl xl:px-12'
            : ' max-w-2xl'
        }`}
      >
        <div
          className={
            desktopSplit
              ? `flex flex-1 flex-col lg:grid lg:items-start lg:gap-12 xl:gap-16${
                  sidebarAside
                    ? ' lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]'
                    : ' lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]'
                }`
              : 'flex flex-1 flex-col'
          }
        >
          <motion.header
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeSmooth }}
            className={headerClassName}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-primary dark:text-brand-accent sm:text-xs">
              {eyebrow}
            </p>
            <h1 className="mt-2 text-lg font-bold tracking-tight text-zinc-900 dark:text-white sm:mt-3 sm:text-2xl lg:text-3xl xl:text-[2rem]">
              {title}
            </h1>
            {description && <p className={descriptionClassName}>{description}</p>}
            {headerExtra}
            {badge && (
              <p className="mx-auto mt-3 max-w-full break-words rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3 py-1.5 text-xs font-semibold text-brand-mid dark:text-brand-accent sm:mt-4 sm:px-4 sm:text-sm lg:mx-0 lg:inline-block">
                {badge}
              </p>
            )}
            {desktopSplit && sidebarAside}
            {desktopSplit && splitBullets && (
              <ul className="mx-auto mt-6 hidden max-w-md space-y-2.5 text-left text-sm text-zinc-600 dark:text-zinc-400 lg:mx-0 lg:block lg:max-w-sm">
                {splitBullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {desktopSplit && (
              <BrandWordmark
                variant="subtle"
                className={`inquiry-sidebar-wordmark hidden lg:flex${sidebarAside ? ' mt-6' : ' mt-8'}`}
              />
            )}
          </motion.header>

          <main className="w-full min-w-0 flex-1 lg:min-h-0">{children}</main>
        </div>

        <footer className="inquiry-standalone-footer mt-8 shrink-0 pb-1 sm:mt-10">
          <BrandWordmark
            variant="subtle"
            className={`inquiry-footer-wordmark${desktopSplit ? ' lg:hidden' : ''}`}
          />
        </footer>
      </div>
    </div>
  )
}
