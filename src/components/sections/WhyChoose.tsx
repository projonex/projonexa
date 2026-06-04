import { WHY_CARDS, WHY_SECTION } from '@/data/brand'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

const easeSmooth = [0.22, 1, 0.36, 1] as const
const ROW_HEIGHT = 52
const VISIBLE_ROWS = 3
const FILL_DURATION_MS = 1500
const HOLD_AFTER_FILL_MS = 500
const SCROLL_AFTER_BATCH_MS = 550

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return reduced
}

function Pill({
  children,
  active,
  accent,
  className = '',
  size = 'md',
}: {
  children: ReactNode
  active?: boolean
  accent: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizeClass =
    size === 'lg'
      ? 'px-5 py-2.5 text-sm sm:text-base'
      : size === 'sm'
        ? 'px-3 py-1.5 text-[11px] sm:text-xs'
        : 'px-4 py-2 text-xs sm:text-sm'

  return (
    <span
      className={`why-crisp-text why-pill inline-flex max-w-full items-center justify-center whitespace-nowrap rounded-full border font-semibold leading-none tracking-tight transition-all duration-300 ${sizeClass} ${className} ${
        active
          ? 'why-pill--active border-black/[0.12] bg-white text-zinc-900 shadow-[0_8px_28px_-10px_rgba(0,80,120,0.22)] dark:border-white/50 dark:bg-white dark:shadow-[0_6px_24px_-6px_rgba(0,0,0,0.4)]'
          : 'border-black/[0.06] bg-white/60 text-zinc-500 opacity-80 dark:border-white/15 dark:bg-white/[0.1] dark:text-white/70 dark:opacity-100'
      }`}
      style={
        active
          ? ({ color: accent, borderColor: `color-mix(in srgb, ${accent} 45%, transparent)` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </span>
  )
}

/** Card 1 — vertical ticker, active label centered */
function VerticalScrollAnimation({
  items,
  accent,
}: {
  items: readonly string[]
  accent: string
}) {
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const viewportHeight = ROW_HEIGHT * 3
  const centerOffset = (viewportHeight - ROW_HEIGHT) / 2
  const offsetY = centerOffset - activeIndex * ROW_HEIGHT

  useEffect(() => {
    if (reducedMotion || items.length <= 1) return
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, 2600)
    return () => window.clearInterval(id)
  }, [items.length, reducedMotion])

  const activeLabel = items[activeIndex] ?? items[0]

  return (
    <div className="why-vertical-ticker relative mx-auto w-full">
      <div
        className="why-vertical-ticker-window relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:border-white/[0.1] dark:bg-black/25"
        style={{ height: viewportHeight, ['--why-ticker-accent' as string]: accent }}
      >
        <div
          aria-hidden
          className="why-vertical-ticker-slot pointer-events-none absolute inset-x-2 top-1/2 z-[1] h-[52px] -translate-y-1/2 rounded-full"
        />
        <div className="why-vertical-fade-top" aria-hidden />
        <div className="why-vertical-fade-bottom" aria-hidden />
        <motion.ul
          className="why-vertical-ticker-list relative z-[2] m-0 list-none p-0"
          animate={{ y: offsetY }}
          transition={{ duration: 0.55, ease: easeSmooth }}
          aria-live="polite"
        >
          {items.map((item, index) => (
            <li key={item} className="flex h-[52px] items-center justify-center px-2 sm:px-3">
              <Pill active={index === activeIndex} accent={accent} className="max-w-full">
                {item}
              </Pill>
            </li>
          ))}
        </motion.ul>
      </div>
      <div className="why-vertical-ticker-status mt-3 space-y-1 text-center">
        <p className="why-crisp-text text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
          Core stack
        </p>
        <p
          className="why-vertical-ticker-active why-crisp-text text-sm font-bold sm:text-base"
          style={{ color: accent }}
          aria-live="polite"
        >
          {activeLabel}
        </p>
      </div>
    </div>
  )
}

/** Card 2 — rows fill to 100% sequentially, then scroll */
function StackedProgressAnimation({
  items,
  accent,
}: {
  items: readonly string[]
  accent: string
}) {
  const reducedMotion = useReducedMotion()
  const [windowStart, setWindowStart] = useState(0)
  const [fillingRow, setFillingRow] = useState(0)
  const [progress, setProgress] = useState(0)
  const [completedRows, setCompletedRows] = useState<boolean[]>([false, false, false])
  const rafRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  const clearTimers = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const resetBatch = useCallback((start: number) => {
    setWindowStart(start)
    setFillingRow(0)
    setProgress(0)
    setCompletedRows([false, false, false])
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setProgress(100)
      setCompletedRows([true, true, true])
      return
    }

    clearTimers()
    setProgress(0)
    const startTime = performance.now()

    const animateFill = () => {
      const elapsed = performance.now() - startTime
      const nextProgress = Math.min(100, (elapsed / FILL_DURATION_MS) * 100)
      setProgress(nextProgress)

      if (nextProgress < 100) {
        rafRef.current = requestAnimationFrame(animateFill)
        return
      }

      setCompletedRows((prev) => {
        const next = [...prev]
        next[fillingRow] = true
        return next
      })

      timeoutRef.current = window.setTimeout(() => {
        if (fillingRow < VISIBLE_ROWS - 1) {
          setFillingRow((row) => row + 1)
          return
        }

        const nextStart = windowStart + 1
        if (nextStart + VISIBLE_ROWS <= items.length) {
          timeoutRef.current = window.setTimeout(() => resetBatch(nextStart), SCROLL_AFTER_BATCH_MS)
        } else {
          timeoutRef.current = window.setTimeout(() => resetBatch(0), HOLD_AFTER_FILL_MS)
        }
      }, HOLD_AFTER_FILL_MS)
    }

    rafRef.current = requestAnimationFrame(animateFill)
    return clearTimers
  }, [clearTimers, fillingRow, items.length, reducedMotion, resetBatch, windowStart])

  const visibleItems = Array.from({ length: VISIBLE_ROWS }, (_, row) => {
    const itemIndex = Math.min(windowStart + row, items.length - 1)
    return items[itemIndex]
  })

  return (
    <div className="w-full">
      <div className="relative min-h-[228px] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={windowStart}
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.9, y: -12 }}
            transition={{ duration: 0.45, ease: easeSmooth }}
            className="flex flex-col gap-2.5"
          >
            {visibleItems.map((label, row) => {
              const isComplete = completedRows[row]
              const isFilling = row === fillingRow && !isComplete
              const rowProgress = isComplete ? 100 : isFilling ? progress : 0
              const isActive = isComplete || isFilling

              return (
                <div
                  key={`${label}-${row}`}
                  className={`why-crisp-text rounded-2xl border px-3 py-2.5 transition-all duration-300 sm:px-3.5 sm:py-3 ${
                    isActive
                      ? 'border-black/[0.1] bg-white shadow-[0_8px_28px_-10px_rgba(0,80,120,0.18)] dark:border-white/35 dark:shadow-[0_8px_28px_-8px_rgba(0,0,0,0.45)]'
                      : 'border-black/[0.06] bg-white/55 dark:border-white/12 dark:bg-white/[0.07]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`min-w-0 truncate text-[13px] font-semibold leading-tight sm:text-sm ${
                        isActive ? 'text-zinc-900' : 'text-zinc-500 dark:text-white/75'
                      }`}
                      style={isActive ? ({ color: accent } as CSSProperties) : undefined}
                    >
                      {label}
                    </span>
                    <span
                      className={`shrink-0 text-[11px] font-bold tabular-nums sm:text-xs ${
                        isActive ? 'text-zinc-500' : 'text-zinc-400 dark:text-white/40'
                      }`}
                    >
                      {Math.round(rowProgress)}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-200/95 dark:bg-zinc-200/90">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: accent, width: `${rowProgress}%` }}
                      transition={{ duration: 0.12, ease: 'linear' }}
                    />
                  </div>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/** Card 3 — circular orbit with a fixed highlighted petal */
function OrbitAnimation({
  items,
  accent,
}: {
  items: readonly string[]
  accent: string
}) {
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const count = items.length
  const stepAngle = 360 / count
  const radius = 84

  useEffect(() => {
    if (reducedMotion || count <= 1) return
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count)
    }, 2800)
    return () => window.clearInterval(id)
  }, [count, reducedMotion])

  return (
    <div className="relative mx-auto flex h-[228px] w-full items-center justify-center">
      <div
        className="pointer-events-none absolute bottom-[6%] left-1/2 z-20 min-w-[170px] -translate-x-1/2 sm:min-w-[190px]"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={items[activeIndex]}
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.92 }}
            transition={{ duration: 0.35, ease: easeSmooth }}
            className="flex justify-center"
          >
            <Pill active accent={accent} size="lg">
              {items[activeIndex]}
            </Pill>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        className="relative h-[178px] w-[178px]"
        animate={{ rotate: -activeIndex * stepAngle }}
        transition={{ duration: 0.7, ease: easeSmooth }}
        aria-hidden
      >
        {items.map((item, index) => {
          const angleDeg = index * stepAngle + 90
          const rad = (angleDeg * Math.PI) / 180
          const x = Math.cos(rad) * radius
          const y = Math.sin(rad) * radius
          const isActive = index === activeIndex

          return (
            <motion.div
              key={item}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ x, y }}
              animate={{
                opacity: isActive ? 0 : 0.5,
                scale: isActive ? 0.85 : 0.92,
              }}
              transition={{ duration: 0.4, ease: easeSmooth }}
            >
              <motion.div
                animate={{ rotate: activeIndex * stepAngle }}
                transition={{ duration: 0.7, ease: easeSmooth }}
              >
                <Pill accent={accent} size="sm">
                  {item}
                </Pill>
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

function CardAnimation({
  card,
}: {
  card: (typeof WHY_CARDS)[number]
}) {
  const animation = 'animation' in card ? card.animation : 'vertical'

  if (animation === 'stacked') {
    return <StackedProgressAnimation items={card.highlights} accent={card.accent} />
  }

  if (animation === 'orbit') {
    return <OrbitAnimation items={card.highlights} accent={card.accent} />
  }

  return <VerticalScrollAnimation items={card.highlights} accent={card.accent} />
}

function WhyPremiumCard({
  card,
  index,
}: {
  card: (typeof WHY_CARDS)[number]
  index: number
}) {
  const featured = 'featured' in card && card.featured

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.08, ease: easeSmooth }}
      whileHover={{ scale: featured ? 1 : 1.012 }}
      className={`why-premium-card group relative flex min-w-0 cursor-default flex-col overflow-hidden rounded-[1.75rem] border border-black/[0.08] bg-white transition-[transform,box-shadow] duration-500 ease-out aspect-[370/446] dark:border-white/10 dark:bg-transparent${
        featured ? ' why-premium-card--featured z-10 flex-[1.05] sm:flex-[1.08]' : ' flex-[0.92] sm:scale-[0.99]'
      }`}
      style={
        {
          '--why-accent': card.accent,
          '--why-bg-light': card.gradientLight,
          '--why-bg-dark': card.gradient,
        } as CSSProperties
      }
    >
      <div className="why-card-media relative flex min-h-0 flex-1 flex-col">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90 dark:opacity-80"
          style={{
            background: `radial-gradient(ellipse 85% 65% at 50% 32%, color-mix(in srgb, ${card.accent} 22%, transparent) 0%, transparent 72%)`,
          }}
        />
        <div
          aria-hidden
          className="why-card-media-scrim pointer-events-none absolute inset-0 dark:bg-[linear-gradient(180deg,rgba(8,12,20,0)_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.72)_100%)]"
        />

        <div className="why-card-stage relative z-[1] flex flex-1 items-center px-4 py-5 sm:px-5 sm:py-6">
          <div className="why-card-stage-inner mx-auto w-full">
            <CardAnimation card={card} />
          </div>
        </div>
      </div>

      <div className="why-premium-card-footer relative z-10 shrink-0 px-4 pb-6 pt-4 sm:px-6 sm:pb-7 sm:pt-5">
        <h3 className="why-crisp-text text-center text-xl font-bold leading-tight text-zinc-900 transition-opacity duration-300 ease-out group-hover:opacity-0 dark:text-white sm:text-2xl">
          {card.title}
        </h3>
        <p className="why-crisp-text absolute inset-x-4 bottom-6 flex items-end justify-center px-2 text-center text-sm leading-snug text-zinc-600 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 dark:text-white/90 sm:inset-x-6 sm:bottom-7 sm:text-[15px]">
          {card.hoverDescription}
        </p>
      </div>
    </motion.article>
  )
}

interface WhyChooseProps {
  variant?: 'section' | 'grouped'
  className?: string
}

export function WhyChoose({ variant = 'section', className }: WhyChooseProps) {
  const content = (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-brand-primary/[0.14] blur-[100px] dark:bg-brand-primary/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-brand-secondary/[0.12] blur-[90px] dark:bg-brand-secondary/10"
      />

      <div className="container-wide relative">
        <div className="mb-8 grid items-end gap-6 lg:mb-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeSmooth }}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 bg-gradient-to-r from-brand-primary to-transparent"
                aria-hidden
              />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {WHY_SECTION.eyebrow}
              </p>
            </div>
            <h2 id="why-projonexa-heading" className="section-display-title mt-5">
              {WHY_SECTION.title}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06, ease: easeSmooth }}
            className="max-w-xl text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300"
          >
            {WHY_SECTION.lead}
          </motion.p>
        </div>

        <div className="why-cards-row flex w-full justify-center overflow-visible">
          <div className="flex w-full max-w-6xl flex-col items-stretch justify-center gap-5 overflow-visible sm:flex-row sm:items-center sm:gap-5 lg:gap-6 xl:px-8">
            {WHY_CARDS.map((card, index) => (
              <WhyPremiumCard key={card.title} card={card} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  )

  if (variant === 'grouped') {
    return (
      <div
        className={className ? `relative ${className}` : 'relative'}
        aria-labelledby="why-projonexa-heading"
      >
        {content}
      </div>
    )
  }

  return (
    <section
      className={
        className
          ? `why-section section-padding section-frosted overflow-hidden pb-16 sm:pb-20 lg:pb-24 ${className}`
          : 'why-section section-padding section-frosted overflow-hidden pb-16 sm:pb-20 lg:pb-24'
      }
      aria-labelledby="why-projonexa-heading"
    >
      {content}
    </section>
  )
}
