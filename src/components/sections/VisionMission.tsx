import { PURPOSE_CARDS, VISION_MISSION_SECTION } from '@/data/brand'
import { Button } from '@/components/ui/Button'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, ChevronRight } from 'lucide-react'
import { useEffect, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react'

const easeSmooth = [0.22, 1, 0.36, 1] as const

type PurposeCard = (typeof PURPOSE_CARDS)[number]

interface InteractiveVisualProps {
  accent: string
  panelTitle: string
  panelSubtitle: string
  activeIndex: number
  selectedIndex: number | null
  onSelect: (index: number) => void
  onBack: () => void
  onHover: (index: number | null) => void
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

function handleItemKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number, onSelect: (i: number) => void) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    onSelect(index)
  }
}

function PurposeTechWindow({
  accent,
  title,
  subtitle,
  badge,
  children,
}: {
  accent: string
  title: string
  subtitle?: string
  badge?: string
  children: ReactNode
}) {
  return (
    <div
      className="purpose-tech-window"
      style={{ '--purpose-accent': accent } as CSSProperties}
    >
      <div className="purpose-tech-titlebar">
        <div className="purpose-tech-dots" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div className="purpose-tech-titlebar-text">
          <span className="purpose-tech-titlebar-label">{title}</span>
          {subtitle ? <span className="purpose-tech-titlebar-sub">{subtitle}</span> : null}
        </div>
        {badge ? <span className="purpose-tech-badge">{badge}</span> : null}
      </div>
      <div className="purpose-tech-body">{children}</div>
    </div>
  )
}

function PurposeDetailView({
  accent,
  panelTitle,
  panelSubtitle,
  title,
  subtitle,
  summary,
  points,
  onBack,
}: {
  accent: string
  panelTitle: string
  panelSubtitle: string
  title: string
  subtitle?: string
  summary: string
  points: readonly string[]
  onBack: () => void
}) {
  return (
    <PurposeTechWindow
      accent={accent}
      title={panelTitle}
      subtitle={panelSubtitle}
      badge="Details"
    >
      <div className="purpose-tech-detail-header">
        <button type="button" onClick={onBack} className="purpose-tech-back" aria-label="Back to list">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        </button>
        <div className="purpose-tech-detail-title-wrap">
          <p className="purpose-tech-detail-title">{title}</p>
          {subtitle ? <p className="purpose-tech-detail-subtitle">{subtitle}</p> : null}
        </div>
      </div>

      <p className="purpose-tech-section-label">Overview</p>
      <p className="purpose-tech-summary">{summary}</p>

      <p className="purpose-tech-section-label">Includes</p>
      <ul className="purpose-tech-points">
        {points.map((point) => (
          <li key={point} className="purpose-tech-point">
            <span className="purpose-tech-point-icon" aria-hidden>
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </PurposeTechWindow>
  )
}

function PipelineVisual({
  steps,
  accent,
  panelTitle,
  panelSubtitle,
  activeIndex,
  selectedIndex,
  onSelect,
  onBack,
  onHover,
}: InteractiveVisualProps & {
  steps: (typeof PURPOSE_CARDS)[0]['steps']
}) {
  if (selectedIndex !== null) {
    const step = steps[selectedIndex]
    return (
      <PurposeDetailView
        accent={accent}
        panelTitle={panelTitle}
        panelSubtitle={panelSubtitle}
        title={step.label}
        subtitle={`Step ${selectedIndex + 1} of ${steps.length}`}
        summary={step.summary}
        points={step.points}
        onBack={onBack}
      />
    )
  }

  return (
    <PurposeTechWindow accent={accent} title={panelTitle} subtitle={panelSubtitle} badge="Pipeline">
      <p className="purpose-tech-hint">Select a phase to view deliverables</p>
      <ul className="purpose-tech-list" aria-live="polite">
        {steps.map((step, index) => {
          const isActive = index === activeIndex

          return (
            <li key={step.label} className="relative">
              {index < steps.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute left-[21px] top-10 h-[calc(100%-2px)] w-px bg-black/[0.06] dark:bg-white/[0.08]"
                />
              ) : null}
              <button
                type="button"
                onClick={() => onSelect(index)}
                onMouseEnter={() => onHover(index)}
                onMouseLeave={() => onHover(null)}
                onKeyDown={(event) => handleItemKeyDown(event, index, onSelect)}
                className={`purpose-tech-list-item ${isActive ? 'is-active' : ''}`}
                aria-label={`View details for ${step.label}`}
              >
                <span className="purpose-tech-index">{index + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="purpose-tech-item-label">{step.label}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
              </button>
            </li>
          )
        })}
      </ul>
    </PurposeTechWindow>
  )
}

function AudienceVisual({
  audiences,
  accent,
  panelTitle,
  panelSubtitle,
  activeIndex,
  selectedIndex,
  onSelect,
  onBack,
  onHover,
}: InteractiveVisualProps & {
  audiences: (typeof PURPOSE_CARDS)[1]['audiences']
}) {
  if (selectedIndex !== null) {
    const audience = audiences[selectedIndex]
    return (
      <PurposeDetailView
        accent={accent}
        panelTitle={panelTitle}
        panelSubtitle={panelSubtitle}
        title={audience.label}
        subtitle={audience.detail}
        summary={audience.summary}
        points={audience.points}
        onBack={onBack}
      />
    )
  }

  return (
    <PurposeTechWindow accent={accent} title={panelTitle} subtitle={panelSubtitle} badge="Profiles">
      <p className="purpose-tech-hint">Select a profile to view how we help</p>
      <ul className="purpose-tech-list space-y-1.5">
        {audiences.map((audience, index) => {
          const isActive = index === activeIndex

          return (
            <li key={audience.label}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                onMouseEnter={() => onHover(index)}
                onMouseLeave={() => onHover(null)}
                onKeyDown={(event) => handleItemKeyDown(event, index, onSelect)}
                className={`purpose-tech-list-item ${isActive ? 'is-active' : ''}`}
                aria-label={`View details for ${audience.label}`}
              >
                <span className="purpose-tech-status-dot" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="purpose-tech-item-label">{audience.label}</span>
                  <span className="purpose-tech-item-meta">{audience.detail}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
              </button>
            </li>
          )
        })}
      </ul>
    </PurposeTechWindow>
  )
}

function MilestonesVisual({
  milestones,
  accent,
  panelTitle,
  panelSubtitle,
  activeIndex,
  selectedIndex,
  onSelect,
  onBack,
  onHover,
}: InteractiveVisualProps & {
  milestones: (typeof PURPOSE_CARDS)[2]['milestones']
}) {
  if (selectedIndex !== null) {
    const milestone = milestones[selectedIndex]
    return (
      <PurposeDetailView
        accent={accent}
        panelTitle={panelTitle}
        panelSubtitle={panelSubtitle}
        title={milestone.label}
        subtitle={milestone.time}
        summary={milestone.summary}
        points={milestone.points}
        onBack={onBack}
      />
    )
  }

  return (
    <PurposeTechWindow accent={accent} title={panelTitle} subtitle={panelSubtitle} badge="Track">
      <p className="purpose-tech-hint">Select a milestone to view mentorship scope</p>
      <ul className="purpose-tech-list space-y-1.5" aria-live="polite">
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
                className={`purpose-tech-list-item ${isActive ? 'is-active' : ''}`}
                aria-label={`View details for ${item.label}`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    isActive
                      ? 'purpose-tech-check-badge border-transparent'
                      : 'border-black/[0.08] bg-white/80 dark:border-white/[0.1] dark:bg-white/[0.04]'
                  }`}
                  aria-hidden
                >
                  {isActive ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="purpose-tech-item-label">{item.label}</span>
                  <span className="purpose-tech-item-meta">{item.time}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
              </button>
            </li>
          )
        })}
      </ul>
    </PurposeTechWindow>
  )
}

const PANEL_META: Record<PurposeCard['animation'], { title: string; subtitle: string }> = {
  pipeline: { title: 'Projonexa · Delivery', subtitle: 'End-to-end project flow' },
  audience: { title: 'Projonexa · Innovators', subtitle: 'Tailored client workflows' },
  milestones: { title: 'Projonexa · Mentorship', subtitle: 'Guided delivery track' },
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
  const panel = PANEL_META[card.animation]
  const shared = {
    accent: card.accent,
    panelTitle: panel.title,
    panelSubtitle: panel.subtitle,
    activeIndex,
    selectedIndex,
    onSelect,
    onBack,
    onHover,
  }

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
      className="purpose-feature-card flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white/70 dark:border-white/[0.08] dark:bg-black/40"
      style={{ '--purpose-accent': card.accent } as CSSProperties}
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
              '--purpose-accent': card.accent,
            } as CSSProperties
          }
          onMouseEnter={() => setIsMediaHovered(true)}
          onMouseLeave={() => {
            setIsMediaHovered(false)
            setHoverIndex(null)
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background: `radial-gradient(ellipse 80% 55% at 50% 0%, color-mix(in srgb, ${card.accent} 18%, transparent), transparent 72%)`,
            }}
          />
          <div className="relative flex min-h-[280px] items-center justify-center px-3 py-5 sm:min-h-[300px] sm:px-4 sm:py-6">
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
