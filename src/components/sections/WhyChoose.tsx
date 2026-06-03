import { WHY_CARDS, WHY_SECTION } from '@/data/brand'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState, type CSSProperties } from 'react'

const easeSmooth = [0.22, 1, 0.36, 1] as const
const ITEM_HEIGHT = 44
const SCROLL_INTERVAL_MS = 2200

function ScrollingHighlights({
  items,
  accent,
}: {
  items: readonly string[]
  accent: string
}) {
  const loopItems = useMemo(() => [...items, ...items.slice(0, 2)], [items])
  const [activeIndex, setActiveIndex] = useState(0)
  const offsetY = (1 - activeIndex) * ITEM_HEIGHT

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return

    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, SCROLL_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [items.length])

  return (
    <div className="why-scroll-viewport relative mx-auto w-full max-w-[240px]">
      <div
        aria-hidden
        className="why-scroll-highlight pointer-events-none absolute inset-x-0 top-1/2 z-10 h-11 -translate-y-1/2 rounded-full border border-white/20 bg-white/[0.12] backdrop-blur-md"
        style={{ boxShadow: `inset 0 0 0 1px ${accent}33, 0 8px 24px -8px ${accent}55` }}
      />
      <div className="why-scroll-mask relative h-[132px] overflow-hidden">
        <motion.ul
          className="relative m-0 list-none p-0"
          animate={{ y: offsetY }}
          transition={{ duration: 0.55, ease: easeSmooth }}
          aria-live="polite"
        >
          {loopItems.map((item, index) => {
            const isActive = index === activeIndex

            return (
              <li key={`${item}-${index}`} className="flex h-11 items-center justify-center px-3">
                <span
                  className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-500 ${
                    isActive
                      ? 'scale-[1.03] bg-white shadow-lg'
                      : 'text-white/50'
                  }`}
                  style={isActive ? ({ color: accent } as CSSProperties) : undefined}
                >
                  {item}
                </span>
              </li>
            )
          })}
        </motion.ul>
      </div>
    </div>
  )
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
      whileHover={{ scale: featured ? 1 : 1.015 }}
      className={`why-premium-card group relative flex min-w-0 cursor-default flex-col justify-end overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)] transition-[transform,box-shadow] duration-500 ease-out aspect-[370/446] ${
        featured ? 'z-10 flex-[1.05] sm:flex-[1.08]' : 'flex-[0.92] scale-[0.99]'
      }`}
      style={{ background: card.gradient }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 20%, ${card.accent}33 0%, transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,20,0)_0%,rgba(0,0,0,0.85)_100%)]"
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 pt-6 sm:px-6">
        <ScrollingHighlights items={card.highlights} accent={card.accent} />
      </div>

      <div className="relative z-10 min-h-[5.5rem] px-4 pb-5 pt-3 backdrop-blur-[2px] sm:min-h-0 sm:px-6 sm:pb-8 sm:pt-10">
        <h3 className="text-center text-xl font-bold leading-[0.94] text-white transition-opacity duration-300 ease-out group-hover:opacity-0 sm:text-2xl">
          {card.title}
        </h3>
        <p className="absolute inset-x-4 bottom-5 flex items-end justify-center px-2 text-center text-sm leading-[1.35] text-white/80 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 sm:inset-x-6 sm:bottom-8 sm:text-[15px]">
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
        <div className="mx-auto flex max-w-[120rem] flex-col items-center justify-center gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeSmooth }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 bg-gradient-to-r from-brand-primary to-transparent"
                aria-hidden
              />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {WHY_SECTION.eyebrow}
              </p>
              <span
                className="h-px w-10 bg-gradient-to-l from-brand-primary to-transparent"
                aria-hidden
              />
            </div>
            <h2 id="why-projonexa-heading" className="section-display-title mt-5 max-w-4xl">
              {WHY_SECTION.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-xl">
              {WHY_SECTION.lead}
            </p>
          </motion.div>

          <div className="mt-10 flex w-full justify-center overflow-visible sm:mt-14 lg:mt-16">
            <div className="flex w-full max-w-6xl flex-col items-stretch justify-center gap-4 overflow-visible sm:flex-row sm:items-center sm:gap-5 lg:gap-6 xl:px-8">
              {WHY_CARDS.map((card, index) => (
                <WhyPremiumCard key={card.title} card={card} index={index} />
              ))}
            </div>
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
          ? `section-padding section-frosted overflow-hidden ${className}`
          : 'section-padding section-frosted overflow-hidden'
      }
      aria-labelledby="why-projonexa-heading"
    >
      {content}
    </section>
  )
}
