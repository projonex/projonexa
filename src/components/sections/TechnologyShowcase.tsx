import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe2, Layers, LayoutGrid, Sparkles } from 'lucide-react'
import {
  TECH_CATEGORIES,
  TECHNOLOGIES,
  getTechnologiesByCategory,
  type TechCategory,
} from '@/data/technologies'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TechIconCloud } from '@/components/sections/TechIconCloud'
import { TechCard } from '@/components/sections/TechCard'

type Filter = TechCategory | 'all'

const STATS = [
  {
    label: 'Technologies',
    getValue: () => String(TECHNOLOGIES.length),
    icon: Sparkles,
  },
  {
    label: 'Categories',
    getValue: () => String(TECH_CATEGORIES.length),
    icon: Layers,
  },
  {
    label: 'Domains',
    getValue: () => '10+',
    icon: LayoutGrid,
  },
  {
    label: 'Global Reach',
    getValue: () => 'India & Worldwide',
    icon: Globe2,
  },
] as const

export function TechnologyShowcase() {
  const [active, setActive] = useState<Filter>('all')

  const filtered = useMemo(() => getTechnologiesByCategory(active), [active])

  const sortedCategories = useMemo(
    () => [...TECH_CATEGORIES].sort((a, b) => a.order - b.order),
    [],
  )

  const categoryCounts = useMemo(() => {
    const counts = new Map<TechCategory, number>()
    for (const cat of TECH_CATEGORIES) {
      counts.set(cat.id, TECHNOLOGIES.filter((t) => t.category === cat.id).length)
    }
    return counts
  }, [])

  const activeLabel =
    active === 'all'
      ? 'All Technologies'
      : (TECH_CATEGORIES.find((c) => c.id === active)?.label ?? active)

  return (
    <section
      className="relative overflow-hidden section-padding bg-zinc-50 dark:bg-zinc-950/50"
      aria-labelledby="tech-showcase-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,200,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-wide relative z-10">
        <SectionHeading
          eyebrow="Technology"
          title="Built With Industry-Leading Stack"
          description="Modern technologies across frontend, AI, cloud, IoT, and more — powering projects for students and clients worldwide."
        />

        {/* Split: controls left · globe right */}
        <div className="mb-14 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
          {/* Left panel */}
          <div className="order-2 flex flex-col gap-6 lg:order-1 lg:sticky lg:top-24">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {STATS.map((stat) => (
                <StatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.getValue()}
                  icon={stat.icon}
                />
              ))}
            </div>

            <div className="glass rounded-2xl border border-black/5 p-4 dark:border-white/10 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
                    Browse by category
                  </p>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Select a stack to filter the grid below
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-brand-primary/10 px-2.5 py-1 text-xs font-semibold text-brand-primary">
                  {filtered.length} shown
                </span>
              </div>

              <nav
                className="flex max-h-[min(52vh,420px)] flex-col gap-1.5 overflow-y-auto pr-1 scrollbar-thin"
                aria-label="Technology categories"
              >
                <CategoryFilter
                  label="All"
                  count={TECHNOLOGIES.length}
                  active={active === 'all'}
                  onClick={() => setActive('all')}
                />
                {sortedCategories.map((cat) => (
                  <CategoryFilter
                    key={cat.id}
                    label={cat.label}
                    count={categoryCounts.get(cat.id) ?? 0}
                    active={active === cat.id}
                    onClick={() => setActive(cat.id)}
                  />
                ))}
              </nav>
            </div>
          </div>

          {/* Right: rotating icon cloud */}
          <div className="order-1 lg:order-2">
            <TechIconCloud variant="side" />
          </div>
        </div>

        {/* Filtered tech grid */}
        <div className="border-t border-black/5 pt-12 dark:border-white/10">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
                Technology grid
              </p>
              <h3 className="mt-1 text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
                {activeLabel}
              </h3>
            </div>
            <p className="text-sm text-zinc-500">
              {filtered.length} of {TECHNOLOGIES.length} technologies
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
            >
              {filtered.map((tech, i) => (
                <TechCard key={tech.id} tech={tech} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          <p className="mt-10 text-center text-sm text-zinc-500">
            Logos provided via{' '}
            <a
              href="https://simpleicons.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              Simple Icons
            </a>
            . Custom stacks available for every college syllabus and project requirement.
          </p>
        </div>
      </div>
    </section>
  )
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: typeof Sparkles
}) {
  const compactValue = value.length > 14

  return (
    <div className="glass group relative overflow-hidden rounded-2xl border border-black/5 p-4 transition-shadow hover:shadow-glow dark:border-white/10 sm:p-5">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 rounded-full bg-brand-primary/5 transition-transform duration-300 group-hover:scale-110 dark:bg-brand-primary/10"
      />
      <div className="relative flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0">
          <p
            className={`font-bold leading-tight text-gradient ${
              compactValue ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'
            }`}
          >
            {value}
          </p>
          <p className="mt-1 text-xs font-medium text-zinc-500 sm:text-sm">{label}</p>
        </div>
      </div>
    </div>
  )
}

function CategoryFilter({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-left transition-all duration-200 sm:px-4 ${
        active
          ? 'bg-brand-gradient text-white shadow-glow'
          : 'border border-transparent bg-white/60 text-zinc-700 hover:border-brand-primary/20 hover:bg-white dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:border-brand-primary/30 dark:hover:bg-zinc-900'
      }`}
    >
      <span className={`text-sm font-semibold sm:text-[15px] ${active ? '' : 'group-hover:text-brand-primary'}`}>
        {label}
      </span>
      <span
        className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold tabular-nums ${
          active ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
        }`}
      >
        {count}
      </span>
    </button>
  )
}
