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

/** Card 2 — scrolling pill rows with animated progress bars */
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

  const progressTargets = [92, 88, 95, 90, 85]

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
    const target =
      progressTargets[(windowStart + fillingRow) % progressTargets.length] ?? 90

    const animateFill = () => {
      const elapsed = performance.now() - startTime
      const nextProgress = Math.min(target, (elapsed / FILL_DURATION_MS) * target)
      setProgress(nextProgress)

      if (nextProgress < target) {
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
    <div className="mx-auto w-full max-w-[290px] px-1">
      <div className="relative h-[220px] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={windowStart}
            initial={{ opacity: 0.85, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.85, y: -16 }}
            transition={{ duration: 0.45, ease: easeSmooth }}
            className="flex flex-col gap-2.5"
          >
            {visibleItems.map((label, row) => {
              const isComplete = completedRows[row]
              const isFilling = row === fillingRow && !isComplete
              const target =
                progressTargets[(windowStart + row) % progressTargets.length] ?? 90
              const rowProgress = isComplete ? target : isFilling ? progress : 0
              const isActive = isComplete || isFilling

              return (
                <div
                  key={`${label}-${row}`}
                  className={`why-crisp-text flex min-h-[52px] items-center gap-3 rounded-full border px-2 py-1.5 pr-5 transition-all duration-300 sm:min-h-[56px] ${
                    isActive
                      ? 'border-white/40 bg-white shadow-[0_8px_28px_-8px_rgba(0,0,0,0.45)]'
                      : 'border-white/15 bg-white/[0.08]'
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border sm:h-10 sm:w-10 ${
                      isActive ? 'border-zinc-100 bg-zinc-50' : 'border-white/20 bg-white/10'
                    }`}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: isActive ? accent : 'rgba(255,255,255,0.35)' }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`truncate text-[13px] font-semibold leading-tight sm:text-sm ${
                          isActive ? 'text-zinc-900' : 'text-white/75'
                        }`}
                        style={isActive ? ({ color: accent } as CSSProperties) : undefined}
                      >
                        {label}
                      </span>
                      <span
                        className={`shrink-0 text-xs font-semibold tabular-nums ${
                          isActive ? 'text-zinc-600' : 'text-white/40'
                        }`}
                      >
                        {Math.round(rowProgress)}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-200/80">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: accent, width: `${rowProgress}%` }}
                        transition={{ duration: 0.15, ease: 'linear' }}
                      />
                    </div>
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

/** Card 1 — rotating orbit of highlight pills (Slice-style carousel) */
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
  const radius = 88

  useEffect(() => {
    if (reducedMotion || count <= 1) return
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count)
    }, 2800)
    return () => window.clearInterval(id)
  }, [count, reducedMotion])

  return (
    <div className="relative mx-auto flex h-[230px] w-full max-w-[280px] items-center justify-center">
      <motion.div
        className="relative h-[190px] w-[190px]"
        animate={{ rotate: -activeIndex * stepAngle }}
        transition={{ duration: 0.75, ease: easeSmooth }}
        aria-live="polite"
      >
        {items.map((item, index) => {
          const angleDeg = index * stepAngle
          const rad = (angleDeg * Math.PI) / 180
          const x = Math.cos(rad) * radius
          const y = Math.sin(rad) * radius
          const isActive = index === activeIndex

          return (
            <motion.div
              key={item}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{ x, y, opacity: isActive ? 1 : 0.38, scale: isActive ? 1.08 : 0.92 }}
              transition={{ duration: 0.45, ease: easeSmooth }}
            >
              <motion.div
                animate={{ rotate: activeIndex * stepAngle }}
                transition={{ duration: 0.75, ease: easeSmooth }}
              >
                {isActive ? (
                  <div className="-ml-2 -mt-1 inline-flex items-center rounded-full border border-white/40 bg-white/20 py-1 pl-2 pr-6 backdrop-blur-sm">
                    <span className="why-crisp-text inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-zinc-100 bg-white px-3 py-2 text-xs font-semibold text-zinc-900 shadow-sm sm:text-sm">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: accent }}
                      />
                      {item}
                    </span>
                  </div>
                ) : (
                  <span className="why-crisp-text inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-zinc-100/80 bg-white px-3 py-2 text-xs font-medium text-zinc-800 sm:text-sm">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-zinc-300" />
                    {item}
                  </span>
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

const CHART_PATH =
  'M-38 81.7729L27.7914 106.358C29.211 106.889 30.7787 106.862 32.1796 106.284L67.8275 91.5797C69.2242 91.0036 70.3521 89.9218 70.9859 88.5504L94.558 37.549C96.1035 34.2052 100.269 33.0307 103.334 35.0747L166.533 77.2287C166.897 77.4717 167.287 77.6741 167.695 77.8323L210.446 94.3882C211.772 94.9017 213.237 94.9276 214.581 94.4613L261.5 78.1736C262.589 77.7954 263.764 77.7392 264.885 78.0117L334.143 94.8537C335.036 95.0707 335.966 95.08 336.863 94.8807L392.952 82.416C394.776 82.0106 396.307 80.7787 397.094 79.0838L433 1.68359'

/** Card 3 — animated growth line with moving highlight */
function ChartLineAnimation({
  accent,
  metric = 'Fast delivery',
}: {
  accent: string
  metric?: string
}) {
  const reducedMotion = useReducedMotion()
  const [cursorX, setCursorX] = useState(55)
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(900)

  useEffect(() => {
    const path = pathRef.current
    if (path) setPathLength(path.getTotalLength())
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setCursorX(83)
      return
    }

    let frame = 0
    let start = performance.now()
    const duration = 4200

    const tick = (now: number) => {
      const elapsed = (now - start) % (duration * 2)
      const t = elapsed < duration ? elapsed / duration : 2 - elapsed / duration
      setCursorX(18 + t * 72)
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reducedMotion])

  const dashOffset = pathLength * (1 - cursorX / 100)

  return (
    <div className="relative mx-auto w-full max-w-[290px] px-2">
      <div className="relative aspect-[370/111] w-full">
        <svg
          viewBox="0 0 370 111"
          fill="none"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <path
            ref={pathRef}
            d={CHART_PATH}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <motion.path
            d={CHART_PATH}
            stroke="#fff"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={pathLength}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />
        </svg>

        <motion.div
          className="pointer-events-none absolute top-0 bottom-0 rounded bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.28)_50%,rgba(255,255,255,0)_100%)]"
          style={{ width: 28 }}
          animate={{ left: `calc(${cursorX}% - 14px)` }}
          transition={{ duration: 0.12, ease: 'linear' }}
        />

        <motion.div
          className="absolute z-10 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/30 bg-white px-3 py-1.5 shadow-sm sm:px-4 sm:py-2"
          animate={{
            left: `${cursorX}%`,
            top: `${36 - Math.sin((cursorX / 100) * Math.PI) * 18}%`,
          }}
          style={{ x: '-100%', y: '-120%' }}
          transition={{ duration: 0.12, ease: 'linear' }}
        >
          <span
            className="why-crisp-text text-xs font-semibold tabular-nums text-zinc-800 sm:text-sm"
            style={{ color: accent }}
          >
            {metric}
          </span>
        </motion.div>
      </div>
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

  if (animation === 'chart') {
    return (
      <ChartLineAnimation
        accent={card.accent}
        metric={'chartMetric' in card ? card.chartMetric : undefined}
      />
    )
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
          ? `section-padding section-frosted overflow-hidden pb-16 sm:pb-20 lg:pb-24 ${className}`
          : 'section-padding section-frosted overflow-hidden pb-16 sm:pb-20 lg:pb-24'
      }
      aria-labelledby="why-projonexa-heading"
    >
      {content}
    </section>
  )
}
