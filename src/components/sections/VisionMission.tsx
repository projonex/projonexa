import { PURPOSE_CARDS, VISION_MISSION_SECTION } from '@/data/brand'
import { Button } from '@/components/ui/Button'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, ChevronRight, Circle } from 'lucide-react'
import { useEffect, useState, type CSSProperties, type KeyboardEvent } from 'react'

const easeSmooth = [0.22, 1, 0.36, 1] as const

type PurposeCard = (typeof PURPOSE_CARDS)[number]

interface InteractiveVisualProps {
  accent: string
  activeIndex: number
  selectedIndex: number | null
  onSelect: (index: number) => void
  onBack: () => void
}

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

function useCycle(length: number, intervalMs: number, paused: boolean) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced || length <= 1 || paused) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % length), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs, length, paused, reduced])

  return index
}

function DetailPanel({
  accent,
  title,
  subtitle,
  summary,
  points,
  onBack,
}: {
  accent: string
  title: string
  subtitle?: string
  summary: string
  points: readonly string[]
  onBack: () => void
}) {
  return (
    <div className="purpose-detail-panel w-full max-w-[280px]">
      <div className="overflow-hidden rounded-lg border border-black/[0.08] bg-white/95 shadow-lg dark:border-white/[0.1] dark:bg-zinc-900/98">
        <div className="flex items-center gap-2 border-b border-black/[0.06] px-3 py-2.5 dark:border-white/[0.08]">
          <button
            type="button"
            onClick={onBack}
            className="purpose-interactive-item flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-black/[0.08] bg-zinc-50 text-zinc-600 hover:bg-white hover:text-zinc-900 dark:border-white/[0.1] dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
            aria-label="Back to list"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">{title}</p>
            {subtitle ? (
              <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">{subtitle}</p>
            ) : null}
          </div>
        </div>
        <div className="space-y-3 px-3 py-3">
          <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">{summary}</p>
          <ul className="m-0 list-none space-y-1.5 p-0">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-200">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: accent }}
                  aria-hidden
                />
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function handleItemKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number, onSelect: (i: number) => void) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    onSelect(index)
  }
}

function PipelineVisual({
  steps,
  accent,
  activeIndex,
  selectedIndex,
  onSelect,
  onBack,
  onHover,
}: InteractiveVisualProps & {
  steps: (typeof PURPOSE_CARDS)[0]['steps']
  onHover: (index: number | null) => void
}) {
  if (selectedIndex !== null) {
    const step = steps[selectedIndex]
    return (
      <DetailPanel
        accent={accent}
        title={step.label}
        subtitle={`Step ${selectedIndex + 1} of ${steps.length}`}
        summary={step.summary}
        points={step.points}
        onBack={onBack}
      />
    )
  }

  return (
    <div className="purpose-interactive-panel w-full max-w-[280px]">
      <div className="overflow-hidden rounded-lg border border-black/[0.08] bg-white/90 shadow-lg dark:border-white/[0.1] dark:bg-zinc-900/95">
        <div className="border-b border-black/[0.06] px-3 py-2.5 dark:border-white/[0.08]">
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Project pipeline</p>
          <p className="mt-0.5 text-[11px] text-zinc-400 dark:text-zinc-500">Click a step to explore</p>
        </div>
        <ul className="m-0 list-none space-y-0 p-2" aria-live="polite">
          {steps.map((step, index) => {
            const isActive = index === activeIndex

            return (
              <li key={step.label} className="relative">
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute left-[17px] top-9 h-[calc(100%-4px)] w-px bg-zinc-200 dark:bg-zinc-700"
                  />
                ) : null}
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  onMouseEnter={() => onHover(index)}
                  onMouseLeave={() => onHover(null)}
                  onKeyDown={(event) => handleItemKeyDown(event, index, onSelect)}
                  className={`purpose-interactive-item flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left ${
                    isActive ? 'bg-brand-primary/[0.08] dark:bg-brand-primary/15' : 'hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                  }`}
                  aria-label={`View details for ${step.label}`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
                      isActive
                        ? 'border-brand-primary bg-white text-brand-primary dark:bg-zinc-900'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800'
                    }`}
                    style={isActive ? ({ borderColor: accent, color: accent } as CSSProperties) : undefined}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`min-w-0 flex-1 truncate text-sm font-medium ${
                      isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                    style={isActive ? ({ color: accent } as CSSProperties) : undefined}
                  >
                    {step.label}
                  </span>
                  <ChevronRight
                    className="ml-auto h-4 w-4 shrink-0 opacity-50"
                    style={isActive ? ({ color: accent } as CSSProperties) : undefined}
                    aria-hidden
                  />
                </button>
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
  activeIndex,
  selectedIndex,
  onSelect,
  onBack,
  onHover,
}: InteractiveVisualProps & {
  audiences: (typeof PURPOSE_CARDS)[1]['audiences']
  onHover: (index: number | null) => void
}) {
  if (selectedIndex !== null) {
    const audience = audiences[selectedIndex]
    return (
      <DetailPanel
        accent={accent}
        title={audience.label}
        subtitle={audience.detail}
        summary={audience.summary}
        points={audience.points}
        onBack={onBack}
      />
    )
  }

  return (
    <div className="purpose-interactive-panel w-full max-w-[280px] space-y-2">
      <p className="px-1 text-[11px] text-zinc-500 dark:text-zinc-400">Click an audience to explore</p>
      {audiences.map((audience, index) => {
        const isActive = index === activeIndex

        return (
          <button
            key={audience.label}
            type="button"
            onClick={() => onSelect(index)}
            onMouseEnter={() => onHover(index)}
            onMouseLeave={() => onHover(null)}
            onKeyDown={(event) => handleItemKeyDown(event, index, onSelect)}
            className={`purpose-interactive-item w-full rounded-lg border px-3 py-2.5 text-left shadow-sm ${
              isActive
                ? 'border-black/[0.1] bg-white dark:border-white/[0.12] dark:bg-zinc-900/95'
                : 'border-black/[0.06] bg-white/70 dark:border-white/[0.06] dark:bg-zinc-900/60'
            } hover:border-black/[0.12] hover:bg-white dark:hover:border-white/[0.14] dark:hover:bg-zinc-900/95`}
            style={
              isActive ? ({ boxShadow: `0 8px 24px -8px ${accent}44` } as CSSProperties) : undefined
            }
            aria-label={`View details for ${audience.label}`}
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
              <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-zinc-400" aria-hidden />
            </div>
            <p
              className={`mt-1 pl-4 text-xs leading-snug ${
                isActive ? 'text-zinc-600 dark:text-zinc-300' : 'text-zinc-400 dark:text-zinc-500'
              }`}
            >
              {audience.detail}
            </p>
          </button>
        )
      })}
    </div>
  )
}

function MilestonesVisual({
  milestones,
  accent,
  activeIndex,
  selectedIndex,
  onSelect,
  onBack,
  onHover,
}: InteractiveVisualProps & {
  milestones: (typeof PURPOSE_CARDS)[2]['milestones']
  onHover: (index: number | null) => void
}) {
  if (selectedIndex !== null) {
    const milestone = milestones[selectedIndex]
    return (
      <DetailPanel
        accent={accent}
        title={milestone.label}
        subtitle={milestone.time}
        summary={milestone.summary}
        points={milestone.points}
        onBack={onBack}
      />
    )
  }

  return (
    <div className="purpose-interactive-panel w-full max-w-[270px]">
      <div className="mb-2.5 flex items-center gap-2 rounded-lg border border-black/[0.08] bg-white/90 px-3 py-2 shadow-md dark:border-white/[0.1] dark:bg-zinc-900/95">
        <Circle className="h-3.5 w-3.5 shrink-0" style={{ color: accent }} fill={accent} aria-hidden />
        <div className="min-w-0 flex-1">
          <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Mentorship track</span>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Click a milestone to explore</p>
        </div>
      </div>
      <ul className="m-0 list-none space-y-1.5 p-0" aria-live="polite">
        {milestones.map((item, index) => {
          const isActive = index === activeIndex

          return (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                onMouseEnter={() => onHover(index)}
                onMouseLeave={() => onHover(null)}
                onKeyDown={(event) => handleItemKeyDown(event, index, onSelect)}
                className={`purpose-interactive-item w-full overflow-hidden rounded-lg border text-left ${
                  isActive
                    ? 'border-black/[0.1] bg-white dark:border-white/[0.1] dark:bg-zinc-900/90'
                    : 'border-black/[0.07] bg-white/85 dark:border-white/[0.08] dark:bg-zinc-900/80'
                } hover:border-black/[0.12] hover:bg-white dark:hover:border-white/[0.12] dark:hover:bg-zinc-900/95`}
                aria-label={`View details for ${item.label}`}
              >
                <div className="flex items-center gap-2.5 px-3 py-2.5">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      isActive
                        ? 'border-transparent text-white'
                        : 'border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800'
                    }`}
                    style={isActive ? ({ backgroundColor: accent } as CSSProperties) : undefined}
                  >
                    {isActive ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm font-medium leading-tight ${
                        isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">{item.time}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden />
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function PurposeCardVisual({
  card,
  activeIndex,
  selectedIndex,
  onSelect,
  onBack,
  onHover,
}: {
  card: PurposeCard
  activeIndex: number
  selectedIndex: number | null
  onSelect: (index: number) => void
  onBack: () => void
  onHover: (index: number | null) => void
}) {
  const shared = { accent: card.accent, activeIndex, selectedIndex, onSelect, onBack, onHover }

  if (card.animation === 'pipeline') {
    return <PipelineVisual steps={card.steps} {...shared} />
  }

  if (card.animation === 'audience') {
    return <AudienceVisual audiences={card.audiences} {...shared} />
  }

  if (card.animation === 'milestones') {
    return <MilestonesVisual milestones={card.milestones} {...shared} />
  }

  return null
}

function PurposeFeatureCard({ card, index }: { card: PurposeCard; index: number }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [isMediaHovered, setIsMediaHovered] = useState(false)

  const itemCount =
    card.animation === 'pipeline'
      ? card.steps.length
      : card.animation === 'audience'
        ? card.audiences.length
        : card.milestones.length

  const cycleInterval =
    card.animation === 'pipeline' ? 2600 : card.animation === 'audience' ? 2800 : 2400

  const isPaused = isMediaHovered || selectedIndex !== null
  const cycleIndex = useCycle(itemCount, cycleInterval, isPaused)
  const activeIndex = hoverIndex ?? cycleIndex

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
          onMouseEnter={() => setIsMediaHovered(true)}
          onMouseLeave={() => {
            setIsMediaHovered(false)
            setHoverIndex(null)
          }}
        >
          <div className="relative flex min-h-[260px] items-center justify-center px-4 py-6 sm:min-h-[280px] sm:px-5 sm:py-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex ?? 'list'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: easeSmooth }}
                className="flex w-full justify-center"
              >
                <PurposeCardVisual
                  card={card}
                  activeIndex={activeIndex}
                  selectedIndex={selectedIndex}
                  onSelect={setSelectedIndex}
                  onBack={() => setSelectedIndex(null)}
                  onHover={setHoverIndex}
                />
              </motion.div>
            </AnimatePresence>
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
