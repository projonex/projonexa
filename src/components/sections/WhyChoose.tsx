import { WHY_CARDS, WHY_SECTION } from '@/data/brand'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

const easeSmooth = [0.22, 1, 0.36, 1] as const
const ROW_HEIGHT = 48
const VISIBLE_ROWS = 3
const FILL_DURATION_MS = 1400
const HOLD_AFTER_FILL_MS = 450
const SCROLL_AFTER_BATCH_MS = 500

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

function CrispLabel({
  children,
  active,
  accent,
  className = '',
}: {
  children: ReactNode
  active?: boolean
  accent: string
  className?: string
}) {
  return (
    <span
      className={`why-crisp-text inline-block whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold leading-none tracking-tight transition-all duration-300 ${className} ${
        active
          ? 'bg-white text-zinc-900 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.35)]'
          : 'bg-white/[0.08] text-white/80'
      }`}
      style={active ? ({ color: accent } as CSSProperties) : undefined}
    >
      {children}
    </span>
  )
}

/** Card 1 — vertical ticker, active item locked to vertical center */
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
    }, 2400)
    return () => window.clearInterval(id)
  }, [items.length, reducedMotion])

  return (
    <div className="relative mx-auto flex w-full max-w-[260px] items-center justify-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-2 top-1/2 z-10 h-12 -translate-y-1/2 rounded-full border border-white/25 bg-white/[0.1]"
        style={{ boxShadow: `inset 0 0 0 1px ${accent}45` }}
      />
      <div
        className="relative overflow-hidden"
        style={{ height: viewportHeight, width: '100%' }}
      >
        <motion.ul
          className="relative m-0 list-none p-0"
          animate={{ y: offsetY }}
          transition={{ duration: 0.55, ease: easeSmooth }}
          aria-live="polite"
        >
          {items.map((item, index) => (
            <li key={item} className="flex h-12 items-center justify-center px-2">
              <CrispLabel active={index === activeIndex} accent={accent}>
                {item}
              </CrispLabel>
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  )
}

/** Card 2 — three rows fill to 100% one-by-one, then scroll window */
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
    let startTime = performance.now()

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
    <div className="mx-auto w-full max-w-[270px] px-1">
      <div className="relative h-[220px] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={windowStart}
            initial={{ opacity: 0.85, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.85, y: -14 }}
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
                  className={`why-crisp-text rounded-2xl border px-3 py-2.5 transition-colors duration-300 ${
                    isActive
                      ? 'border-white/30 bg-white shadow-[0_8px_28px_-8px_rgba(0,0,0,0.45)]'
                      : 'border-white/10 bg-white/[0.07]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`truncate text-[13px] font-semibold leading-tight sm:text-sm ${
                        isActive ? 'text-zinc-900' : 'text-white/80'
                      }`}
                      style={isActive ? ({ color: accent } as CSSProperties) : undefined}
                    >
                      {label}
                    </span>
                    <span
                      className={`shrink-0 text-xs font-semibold tabular-nums ${
                        isActive ? 'text-zinc-700' : 'text-white/45'
                      }`}
                    >
                      {Math.round(rowProgress)}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-200/80">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: accent, width: `${rowProgress}%` }}
                      transition={{ duration: 0.15, ease: 'linear' }}
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

/** Card 3 — circular orbit, one highlighted petal at a time */
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
  const radius = 78

  useEffect(() => {
    if (reducedMotion || count <= 1) return
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count)
    }, 2600)
    return () => window.clearInterval(id)
  }, [count, reducedMotion])

  return (
    <div className="relative mx-auto flex h-[220px] w-full max-w-[260px] items-center justify-center">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[12%] left-1/2 z-20 flex -translate-x-1/2 items-center justify-center rounded-full border border-white/30 bg-white/[0.1] px-3 py-1.5"
        style={{
          boxShadow: `0 0 0 1px ${accent}40, 0 12px 32px -10px ${accent}55`,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={items[activeIndex]}
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.92 }}
            transition={{ duration: 0.35, ease: easeSmooth }}
          >
            <CrispLabel active accent={accent} className="text-[11px] sm:text-xs">
              {items[activeIndex]}
            </CrispLabel>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        className="relative h-[170px] w-[170px]"
        animate={{ rotate: -activeIndex * stepAngle }}
        transition={{ duration: 0.7, ease: easeSmooth }}
        aria-live="polite"
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
                opacity: isActive ? 0 : 0.42,
                scale: isActive ? 1 : 0.88,
              }}
              transition={{ duration: 0.45, ease: easeSmooth }}
            >
              <motion.div
                animate={{ rotate: activeIndex * stepAngle }}
                transition={{ duration: 0.7, ease: easeSmooth }}
              >
                <CrispLabel
                  active={isActive}
                  accent={accent}
                  className="text-[11px] sm:text-xs"
                >
                  {item}
                </CrispLabel>
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
      className={`why-premium-card group relative flex min-w-0 cursor-default flex-col justify-end overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)] transition-[transform,box-shadow] duration-500 ease-out aspect-[370/446] ${
        featured ? 'z-10 flex-[1.05] sm:flex-[1.08]' : 'flex-[0.92] sm:scale-[0.99]'
      }`}
      style={{ background: card.gradient }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 38%, ${card.accent}33 0%, transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,20,0)_0%,rgba(0,0,0,0.55)_58%,rgba(0,0,0,0.92)_100%)]"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-[26%] top-[10%] z-[1] flex items-center justify-center px-4 sm:px-5">
        <CardAnimation card={card} />
      </div>

      <div className="why-premium-card-footer relative z-10 px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-8">
        <h3 className="why-crisp-text text-center text-xl font-bold leading-tight text-white transition-opacity duration-300 ease-out group-hover:opacity-0 sm:text-2xl">
          {card.title}
        </h3>
        <p className="why-crisp-text absolute inset-x-4 bottom-6 flex items-end justify-center px-2 text-center text-sm leading-snug text-white/90 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 sm:inset-x-6 sm:bottom-8 sm:text-[15px]">
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
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-brand-primary/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-brand-secondary/10 blur-[90px]"
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
        className={className ? `relative pb-10 sm:pb-14 lg:pb-16 ${className}` : 'relative pb-10 sm:pb-14 lg:pb-16'}
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
          ? `section-padding section-frosted overflow-hidden pb-16 sm:pb-20 lg:pb-24 ${className}`
          : 'section-padding section-frosted overflow-hidden pb-16 sm:pb-20 lg:pb-24'
      }
      aria-labelledby="why-projonexa-heading"
    >
      {content}
    </section>
  )
}
