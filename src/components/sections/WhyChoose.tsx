import { WHY_CARDS, WHY_SECTION } from '@/data/brand'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'

const easeSmooth = [0.22, 1, 0.36, 1] as const
const ROW_HEIGHT = 48
const CYCLE_MS = 2400

const STACKED_PROGRESS = [92, 88, 95, 84, 90] as const

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

function useCyclingIndex(length: number, intervalMs = CYCLE_MS) {
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || length <= 1) return
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [length, intervalMs, reducedMotion])

  return activeIndex
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
      className={`why-crisp-text inline-block whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold leading-none tracking-tight transition-colors duration-300 ${className} ${
        active
          ? 'bg-white text-zinc-900 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.35)]'
          : 'bg-transparent text-white/75'
      }`}
      style={active ? ({ color: accent } as CSSProperties) : undefined}
    >
      {children}
    </span>
  )
}

/** Card 1 — vertical ticker with a fixed center highlight slot */
function VerticalScrollAnimation({
  items,
  accent,
}: {
  items: readonly string[]
  accent: string
}) {
  const activeIndex = useCyclingIndex(items.length)
  const offsetY = (1 - activeIndex) * ROW_HEIGHT

  return (
    <div className="relative mx-auto w-full max-w-[250px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-1 top-1/2 z-0 h-12 -translate-y-1/2 rounded-full border border-white/25 bg-white/[0.08]"
        style={{ boxShadow: `inset 0 0 0 1px ${accent}40` }}
      />
      <div className="relative h-[144px] overflow-hidden">
        <motion.ul
          className="relative m-0 list-none p-0"
          animate={{ y: offsetY }}
          transition={{ duration: 0.5, ease: easeSmooth }}
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

/** Card 2 — stacked rows with progress bars, one highlighted at a time */
function StackedProgressAnimation({
  items,
  accent,
}: {
  items: readonly string[]
  accent: string
}) {
  const activeIndex = useCyclingIndex(items.length)

  return (
    <div className="mx-auto flex w-full max-w-[270px] flex-col gap-2.5 px-1">
      {items.slice(0, 3).map((_, index) => {
        const itemIndex = (activeIndex + index) % items.length
        const label = items[itemIndex]
        const progress = STACKED_PROGRESS[itemIndex % STACKED_PROGRESS.length]
        const isActive = index === 0

        return (
          <motion.div
            key={`${label}-${activeIndex}`}
            layout
            animate={{
              opacity: isActive ? 1 : 0.55,
              y: 0,
            }}
            transition={{ duration: 0.45, ease: easeSmooth }}
            className={`why-crisp-text rounded-2xl border px-3 py-2.5 transition-colors duration-300 ${
              isActive
                ? 'border-white/30 bg-white shadow-[0_8px_28px_-8px_rgba(0,0,0,0.45)]'
                : 'border-white/10 bg-white/[0.07]'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`truncate text-[13px] font-semibold leading-tight sm:text-sm ${
                  isActive ? 'text-zinc-900' : 'text-white/85'
                }`}
                style={isActive ? ({ color: accent } as CSSProperties) : undefined}
              >
                {label}
              </span>
              {isActive ? (
                <span className="shrink-0 text-xs font-semibold tabular-nums text-zinc-700">
                  {progress}%
                </span>
              ) : null}
            </div>
            {isActive ? (
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-200/80">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: accent }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: easeSmooth }}
                />
              </div>
            ) : (
              <div className="mt-2 h-1.5 rounded-full bg-white/10" />
            )}
          </motion.div>
        )
      })}
      <AnimatePresence mode="wait">
        <motion.p
          key={items[activeIndex]}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: easeSmooth }}
          className="why-crisp-text mt-1 text-center text-xs font-medium text-white/70"
        >
          Next: {items[(activeIndex + 1) % items.length]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

/** Card 3 — horizontal marquee with a centered highlight pill */
function MarqueeAnimation({
  items,
  accent,
}: {
  items: readonly string[]
  accent: string
}) {
  const activeIndex = useCyclingIndex(items.length, 2800)
  const doubled = [...items, ...items]

  return (
    <div className="relative mx-auto w-full max-w-[280px] overflow-hidden py-2">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-[148px] -translate-x-1/2 rounded-full border border-white/25 bg-white/[0.08]"
        style={{ boxShadow: `inset 0 0 0 1px ${accent}35` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-[#0a1f18] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-[#145a42] to-transparent"
      />
      <motion.ul
        className="relative m-0 flex list-none gap-3 p-0"
        animate={{ x: -(activeIndex * 132 + 66 - 140) }}
        transition={{ duration: 0.55, ease: easeSmooth }}
        aria-live="polite"
      >
        {doubled.map((item, index) => (
            <li key={`${item}-${index}`} className="flex w-[120px] shrink-0 items-center justify-center">
              <CrispLabel
                active={index === activeIndex}
                accent={accent}
                className="w-full text-center text-xs sm:text-sm"
              >
                {item}
              </CrispLabel>
            </li>
          ))}
      </motion.ul>
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

  if (animation === 'marquee') {
    return <MarqueeAnimation items={card.highlights} accent={card.accent} />
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
          background: `radial-gradient(ellipse 80% 60% at 50% 22%, ${card.accent}33 0%, transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,20,0)_0%,rgba(0,0,0,0.55)_58%,rgba(0,0,0,0.92)_100%)]"
      />

      <div className="pointer-events-none absolute inset-x-0 top-[14%] z-[1] flex items-start justify-center px-4 sm:top-[16%] sm:px-5">
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
        <div className="mb-8 grid items-end gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 lg:mb-10">
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
