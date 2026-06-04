import { PURPOSE_CARDS, VISION_MISSION_SECTION } from '@/data/brand'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { ArrowRight, Check, ChevronRight, Circle } from 'lucide-react'
import { useEffect, useState, type CSSProperties } from 'react'

const easeSmooth = [0.22, 1, 0.36, 1] as const

type PurposeCard = (typeof PURPOSE_CARDS)[number]

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

function useCycle(length: number, intervalMs: number) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced || length <= 1) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % length), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs, length, reduced])

  return index
}

function PipelineVisual({
  steps,
  accent,
}: {
  steps: readonly string[]
  accent: string
}) {
  const activeIndex = useCycle(steps.length, 2600)

  return (
    <div className="w-full max-w-[280px]">
      <div className="overflow-hidden rounded-lg border border-black/[0.08] bg-white/90 shadow-lg dark:border-white/[0.1] dark:bg-zinc-900/95">
        <div className="border-b border-black/[0.06] px-3 py-2.5 dark:border-white/[0.08]">
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Project pipeline</p>
        </div>
        <ul className="m-0 list-none space-y-0 p-2" aria-live="polite">
          {steps.map((step, index) => {
            const isActive = index === activeIndex
            const isDone = index < activeIndex

            return (
              <li key={step} className="relative">
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden
                    className={`absolute left-[17px] top-9 h-[calc(100%-4px)] w-px ${
                      isDone ? 'bg-brand-primary/40' : 'bg-zinc-200 dark:bg-zinc-700'
                    }`}
                  />
                ) : null}
                <div
                  className={`flex items-center gap-2.5 rounded-md px-2 py-2 transition-colors duration-300 ${
                    isActive ? 'bg-brand-primary/[0.08] dark:bg-brand-primary/15' : ''
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
                      isDone
                        ? 'border-brand-primary/30 bg-brand-primary text-white'
                        : isActive
                          ? 'border-brand-primary bg-white text-brand-primary dark:bg-zinc-900'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800'
                    }`}
                    style={isActive ? ({ borderColor: accent, color: accent } as CSSProperties) : undefined}
                  >
                    {isDone ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : index + 1}
                  </span>
                  <span
                    className={`min-w-0 truncate text-sm font-medium ${
                      isActive
                        ? 'text-zinc-900 dark:text-white'
                        : isDone
                          ? 'text-zinc-600 dark:text-zinc-300'
                          : 'text-zinc-400 dark:text-zinc-500'
                    }`}
                    style={isActive ? ({ color: accent } as CSSProperties) : undefined}
                  >
                    {step}
                  </span>
                  {isActive ? (
                    <ChevronRight
                      className="ml-auto h-4 w-4 shrink-0 opacity-60"
                      style={{ color: accent }}
                      aria-hidden
                    />
                  ) : null}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function AudienceVisual({
  audiences,
  accent,
}: {
  audiences: readonly { label: string; detail: string }[]
  accent: string
}) {
  const activeIndex = useCycle(audiences.length, 2800)

  return (
    <div className="w-full max-w-[280px] space-y-2">
      {audiences.map((audience, index) => {
        const isActive = index === activeIndex

        return (
          <motion.div
            key={audience.label}
            animate={{
              opacity: isActive ? 1 : 0.45,
              scale: isActive ? 1 : 0.98,
            }}
            transition={{ duration: 0.35, ease: easeSmooth }}
            className={`rounded-lg border px-3 py-2.5 shadow-sm transition-shadow duration-300 ${
              isActive
                ? 'border-black/[0.1] bg-white dark:border-white/[0.12] dark:bg-zinc-900/95'
                : 'border-black/[0.06] bg-white/70 dark:border-white/[0.06] dark:bg-zinc-900/60'
            }`}
            style={
              isActive
                ? ({ boxShadow: `0 8px 24px -8px ${accent}44` } as CSSProperties)
                : undefined
            }
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${isActive ? '' : 'bg-zinc-300 dark:bg-zinc-600'}`}
                style={isActive ? ({ backgroundColor: accent } as CSSProperties) : undefined}
              />
              <span
                className={`text-sm font-semibold ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}
                style={isActive ? ({ color: accent } as CSSProperties) : undefined}
              >
                {audience.label}
              </span>
            </div>
            <p
              className={`mt-1 pl-4 text-xs leading-snug ${
                isActive ? 'text-zinc-600 dark:text-zinc-300' : 'text-zinc-400 dark:text-zinc-500'
              }`}
            >
              {audience.detail}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}

function MilestonesVisual({
  milestones,
  accent,
}: {
  milestones: readonly { label: string; time: string }[]
  accent: string
}) {
  const activeIndex = useCycle(milestones.length, 2400)

  return (
    <div className="w-full max-w-[270px]">
      <div className="mb-2.5 flex items-center gap-2 rounded-lg border border-black/[0.08] bg-white/90 px-3 py-2 shadow-md dark:border-white/[0.1] dark:bg-zinc-900/95">
        <Circle className="h-3.5 w-3.5 shrink-0" style={{ color: accent }} fill={accent} aria-hidden />
        <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Mentorship track</span>
      </div>
      <ul className="m-0 list-none space-y-1.5 p-0" aria-live="polite">
        {milestones.map((item, index) => {
          const isComplete = index <= activeIndex

          return (
            <motion.li
              key={item.label}
              animate={{ opacity: isComplete ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-lg border border-black/[0.07] bg-white/85 dark:border-white/[0.08] dark:bg-zinc-900/80"
            >
              <div className="flex items-center gap-2.5 px-3 py-2.5">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    isComplete
                      ? 'border-transparent text-white'
                      : 'border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800'
                  }`}
                  style={
                    isComplete ? ({ backgroundColor: accent } as CSSProperties) : undefined
                  }
                >
                  {isComplete ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-sm font-medium leading-tight ${
                      isComplete ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">{item.time}</p>
                </div>
              </div>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

function PurposeCardVisual({ card }: { card: PurposeCard }) {
  if (card.animation === 'pipeline' && 'steps' in card) {
    return <PipelineVisual steps={card.steps} accent={card.accent} />
  }

  if (card.animation === 'audience' && 'audiences' in card) {
    return <AudienceVisual audiences={card.audiences} accent={card.accent} />
  }

  if (card.animation === 'milestones' && 'milestones' in card) {
    return <MilestonesVisual milestones={card.milestones} accent={card.accent} />
  }

  return null
}

function PurposeFeatureCard({ card, index }: { card: PurposeCard; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: easeSmooth }}
      className="purpose-feature-card flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white/60 dark:border-white/[0.08] dark:bg-black/35"
    >
      <div className="flex flex-1 flex-col px-6 pb-4 pt-6 sm:px-7 sm:pt-7">
        <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white sm:text-xl">
          {card.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[15px]">
          {card.description}
        </p>
      </div>

      <figure className="mt-auto px-4 pb-4 pt-2 sm:px-5 sm:pb-5">
        <div
          className="purpose-card-media relative overflow-hidden rounded-xl border border-black/[0.06] dark:border-white/[0.08]"
          style={
            {
              '--purpose-media-bg': card.mediaLight,
              '--purpose-media-bg-dark': card.mediaDark,
            } as CSSProperties
          }
        >
          <div className="relative flex min-h-[220px] items-center justify-center px-4 py-6 sm:min-h-[240px] sm:px-5 sm:py-7">
            <PurposeCardVisual card={card} />
          </div>
        </div>
      </figure>
    </motion.article>
  )
}

interface VisionMissionProps {
  variant?: 'section' | 'embedded'
}

export function VisionMission({ variant = 'section' }: VisionMissionProps) {
  const content = (
    <div className="container-wide">
      <div className="max-w-prose text-left">
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
              {VISION_MISSION_SECTION.eyebrow}
            </p>
          </div>
          <h2 id="vision-mission-heading" className="section-display-title mt-5 text-balance">
            {VISION_MISSION_SECTION.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.06, ease: easeSmooth }}
          className="mt-4"
        >
          <p className="text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300 text-balance">
            {VISION_MISSION_SECTION.lead}
          </p>
          <div className="mt-6">
            <Button to="/about" variant="primary" className="shadow-glow-sm">
              Explore our purpose
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 lg:mt-14 xl:grid-cols-3 xl:gap-6">
        {PURPOSE_CARDS.map((card, index) => (
          <PurposeFeatureCard key={card.title} card={card} index={index} />
        ))}
      </div>
    </div>
  )

  if (variant === 'embedded') {
    return content
  }

  return (
    <section
      className="section-padding section-alt overflow-hidden"
      aria-labelledby="vision-mission-heading"
    >
      {content}
    </section>
  )
}
