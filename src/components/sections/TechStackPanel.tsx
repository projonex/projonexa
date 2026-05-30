import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Brain,
  Cloud,
  Code2,
  Cpu,
  Database,
  Layers3,
  Smartphone,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { TechLogo } from '@/components/ui/TechLogo'
import {
  TECH_CATEGORIES,
  TECHNOLOGIES,
  type TechCategory,
  type TechItem,
} from '@/data/technologies'

const CATEGORY_META: Record<
  TechCategory,
  { icon: LucideIcon; tagline: string; accent: string }
> = {
  frontend: {
    icon: Code2,
    tagline: 'Interfaces users love',
    accent: '#61DAFB',
  },
  backend: {
    icon: Layers3,
    tagline: 'APIs built to scale',
    accent: '#339933',
  },
  mobile: {
    icon: Smartphone,
    tagline: 'Native & cross-platform apps',
    accent: '#02569B',
  },
  database: {
    icon: Database,
    tagline: 'Reliable data layers',
    accent: '#4169E1',
  },
  ai: {
    icon: Brain,
    tagline: 'Intelligent systems & ML',
    accent: '#FF6F00',
  },
  iot: {
    icon: Cpu,
    tagline: 'Connected hardware solutions',
    accent: '#00979D',
  },
  cloud: {
    icon: Cloud,
    tagline: 'Deploy anywhere, scale fast',
    accent: '#4285F4',
  },
  devops: {
    icon: Layers3,
    tagline: 'Ship with confidence',
    accent: '#326CE5',
  },
  tools: {
    icon: Wrench,
    tagline: 'Design, test & deliver',
    accent: '#F24E1E',
  },
}

const AUTO_CYCLE_MS = 5500

export function TechStackPanel() {
  const grouped = useMemo(
    () =>
      [...TECH_CATEGORIES]
        .sort((a, b) => a.order - b.order)
        .map((category) => ({
          ...category,
          meta: CATEGORY_META[category.id],
          items: TECHNOLOGIES.filter((t) => t.category === category.id),
        }))
        .filter((group) => group.items.length > 0),
    [],
  )

  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const active = grouped[activeIndex]
  const hoveredTech =
    hoveredId != null
      ? TECHNOLOGIES.find((t) => t.id === hoveredId) ?? active.items[0]
      : active.items[0]

  const advance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % grouped.length)
  }, [grouped.length])

  useEffect(() => {
    if (paused || grouped.length <= 1) return
    const timer = window.setInterval(advance, AUTO_CYCLE_MS)
    return () => window.clearInterval(timer)
  }, [paused, advance, grouped.length])

  const marqueeRowA = useMemo(
    () => [...TECHNOLOGIES, ...TECHNOLOGIES].slice(0, TECHNOLOGIES.length * 2),
    [],
  )
  const marqueeRowB = useMemo(
    () => [...TECHNOLOGIES].reverse().concat([...TECHNOLOGIES].reverse()),
    [],
  )

  return (
    <div
      className="tech-stack-premium relative overflow-hidden rounded-3xl shadow-[0_24px_80px_-24px_rgba(0,200,255,0.25)] dark:shadow-[0_24px_80px_-24px_rgba(0,200,255,0.15)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false)
        setHoveredId(null)
      }}
    >
      {/* Gradient border shell */}
      <div className="absolute inset-0 rounded-3xl bg-brand-gradient p-px">
        <div className="h-full w-full rounded-[calc(1.5rem-1px)] bg-zinc-50 dark:bg-zinc-950" />
      </div>

      {/* Inner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-brand-primary/20 blur-[80px] dark:bg-brand-primary/25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-20 h-48 w-48 rounded-full bg-brand-secondary/15 blur-[70px]"
      />

      <div className="relative z-10 flex flex-col p-5 sm:p-6 lg:p-7">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
              </span>
              Live stack
            </div>
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
              Tools we ship with
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Production-ready technologies for academic projects, startups, and enterprise
              delivery — curated across every layer of the stack.
            </p>
          </div>

          <div className="flex gap-2">
            {[
              { value: TECHNOLOGIES.length, label: 'Tools' },
              { value: TECH_CATEGORIES.length, label: 'Layers' },
            ].map((pill) => (
              <div
                key={pill.label}
                className="rounded-2xl border border-black/5 bg-white/80 px-3 py-2 text-center backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/80"
              >
                <p className="text-lg font-bold tabular-nums text-gradient">{pill.value}</p>
                <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                  {pill.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Category spotlight */}
        <div className="relative mb-5 overflow-hidden rounded-2xl border border-black/5 bg-white/60 p-4 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/50 sm:p-5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-700"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 20% 0%, ${active.meta.accent}22, transparent 70%)`,
            }}
          />

          <div className="relative mb-4 flex items-center justify-between gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.35 }}
                className="flex min-w-0 items-center gap-3"
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${active.meta.accent}33, ${active.meta.accent}11)`,
                    boxShadow: `0 8px 32px -8px ${active.meta.accent}55`,
                  }}
                >
                  <active.meta.icon className="h-5 w-5" style={{ color: active.meta.accent }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                    Spotlight
                  </p>
                  <h4 className="truncate text-base font-bold text-zinc-900 dark:text-white sm:text-lg">
                    {active.label}
                  </h4>
                  <p className="text-xs text-zinc-500">{active.meta.tagline}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
              {grouped.map((group, i) => (
                <button
                  key={group.id}
                  type="button"
                  aria-label={`Show ${group.label}`}
                  aria-current={i === activeIndex ? 'true' : undefined}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-6 bg-brand-gradient'
                      : 'w-1.5 bg-zinc-300 hover:bg-brand-primary/50 dark:bg-zinc-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bento grid for active category */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="relative grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-2.5"
            >
              {active.items.map((tech, index) => (
                <PremiumTechTile
                  key={tech.id}
                  tech={tech}
                  index={index}
                  featured={index === 0}
                  isHovered={hoveredId === tech.id}
                  onHover={setHoveredId}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Featured hover preview strip */}
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredTech.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="relative mt-4 flex items-center gap-3 overflow-hidden rounded-xl border border-black/5 bg-zinc-50/90 px-3 py-2.5 dark:border-white/10 dark:bg-zinc-950/60"
            >
              <div
                className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
                style={{
                  backgroundColor: hoveredTech.color.startsWith('#')
                    ? hoveredTech.color
                    : `#${hoveredTech.color}`,
                }}
              />
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-zinc-800">
                <TechLogo tech={hoveredTech} size="sm" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                  {hoveredTech.name}
                </p>
                <p className="text-xs text-zinc-500">
                  {TECH_CATEGORIES.find((c) => c.id === hoveredTech.category)?.label}
                </p>
              </div>
              <span className="hidden rounded-full bg-brand-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-primary sm:inline">
                In production
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile category dots */}
        <div className="mb-4 flex justify-center gap-1.5 sm:hidden">
          {grouped.map((group, i) => (
            <button
              key={group.id}
              type="button"
              aria-label={`Show ${group.label}`}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex ? 'w-5 bg-brand-gradient' : 'w-1.5 bg-zinc-300 dark:bg-zinc-600'
              }`}
            />
          ))}
        </div>

        {/* Dual marquee — premium motion strip */}
        <div className="relative space-y-2.5 overflow-hidden rounded-2xl border border-black/5 bg-zinc-900/[0.03] py-3 dark:border-white/10 dark:bg-white/[0.02]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-zinc-50 to-transparent dark:from-zinc-950"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-zinc-50 to-transparent dark:from-zinc-950"
          />

          <MarqueeRow items={marqueeRowA} direction="left" speed={38} />
          <MarqueeRow items={marqueeRowB} direction="right" speed={44} />
        </div>

        <p className="mt-4 text-center text-[11px] text-zinc-500">
          Hover any logo to preview · Categories auto-rotate ·{' '}
          <span className="text-brand-primary">70+ technologies</span> in our delivery stack
        </p>
      </div>
    </div>
  )
}

function PremiumTechTile({
  tech,
  index,
  featured,
  isHovered,
  onHover,
}: {
  tech: TechItem
  index: number
  featured: boolean
  isHovered: boolean
  onHover: (id: string | null) => void
}) {
  const glow = tech.color.startsWith('#') ? tech.color : `#${tech.color}`

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      onMouseEnter={() => onHover(tech.id)}
      onFocus={() => onHover(tech.id)}
      onMouseLeave={() => onHover(null)}
      onBlur={() => onHover(null)}
      tabIndex={0}
      className={`group relative outline-none ${featured ? 'col-span-2 row-span-2 sm:col-span-1' : ''}`}
    >
      <div
        className={`relative flex h-full flex-col items-center justify-center overflow-hidden rounded-xl border transition-all duration-300 ${
          isHovered
            ? 'border-brand-primary/40 shadow-glow scale-[1.03]'
            : 'border-black/5 dark:border-white/10'
        } ${
          featured
            ? 'min-h-[88px] bg-white/90 p-4 dark:bg-zinc-900/90 sm:min-h-[72px]'
            : 'min-h-[72px] bg-white/70 p-3 dark:bg-zinc-900/70 sm:min-h-[68px]'
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${glow}25, transparent 70%)`,
          }}
        />

        <div
          className={`relative flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${
            featured ? 'h-12 w-12' : 'h-9 w-9'
          }`}
          style={{ filter: isHovered ? `drop-shadow(0 0 12px ${glow}88)` : undefined }}
        >
          <TechLogo tech={tech} size={featured ? 'md' : 'sm'} />
        </div>

        <span
          className={`relative mt-2 truncate text-center font-semibold text-zinc-800 transition-colors group-hover:text-brand-primary dark:text-zinc-100 ${
            featured ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-xs'
          }`}
        >
          {tech.name}
        </span>
      </div>
    </motion.article>
  )
}

function MarqueeRow({
  items,
  direction,
  speed,
}: {
  items: TechItem[]
  direction: 'left' | 'right'
  speed: number
}) {
  return (
    <div className="flex overflow-hidden">
      <div
        className={`tech-marquee flex shrink-0 items-center gap-3 ${
          direction === 'left' ? 'tech-marquee-left' : 'tech-marquee-right'
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...items, ...items].map((tech, i) => (
          <div
            key={`${tech.id}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-black/5 bg-white/90 px-3 py-1.5 shadow-sm dark:border-white/10 dark:bg-zinc-900/90"
          >
            <TechLogo tech={tech} size="sm" className="h-5 w-5" />
            <span className="whitespace-nowrap text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
