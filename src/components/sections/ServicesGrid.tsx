import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { getServiceAccent, SERVICES, SERVICES_SECTION } from '@/data/services'
import { Button } from '@/components/ui/Button'

interface ServicesGridProps {
  limit?: number
  showViewAll?: boolean
}

const easeSmooth = [0.22, 1, 0.36, 1] as const

function ServiceCard({
  service,
  index,
  compact,
}: {
  service: (typeof SERVICES)[number]
  index: number
  compact: boolean
}) {
  const Icon = service.icon
  const accent = getServiceAccent(index)
  const indexLabel = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.48, delay: (index % (compact ? 2 : 3)) * 0.08, ease: easeSmooth }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col"
    >
      <div
        className="absolute inset-0 rounded-[1.25rem] opacity-40 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${accent}55, transparent 45%, ${accent}33)`,
        }}
        aria-hidden
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.2rem] border border-black/[0.07] bg-white/55 shadow-card backdrop-blur-xl transition-all duration-300 group-hover:border-brand-primary/25 group-hover:shadow-glow-sm dark:border-white/[0.09] dark:bg-black/45 dark:shadow-card-dark">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-80 transition-opacity group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
          aria-hidden
        />

        <span
          className="pointer-events-none absolute -right-1 -top-3 select-none text-[4.5rem] font-bold leading-none tabular-nums text-black/[0.04] dark:text-white/[0.05]"
          aria-hidden
        >
          {indexLabel}
        </span>

        <div
          className="pointer-events-none absolute -left-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `${accent}28` }}
          aria-hidden
        />

        <div className={`relative flex flex-1 flex-col ${compact ? 'p-5' : 'p-6'}`}>
          <div className="mb-4 flex items-start gap-3">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ring-black/[0.06] transition-transform duration-300 group-hover:scale-105 dark:ring-white/[0.08]"
              style={{
                background: `linear-gradient(145deg, ${accent}40, ${accent}12)`,
                boxShadow: `0 8px 28px -10px ${accent}88`,
              }}
            >
              <Icon className="h-5 w-5" style={{ color: accent }} strokeWidth={2} aria-hidden />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <span
                className="inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold tabular-nums tracking-widest"
                style={{
                  color: accent,
                  backgroundColor: `${accent}18`,
                }}
              >
                {indexLabel}
              </span>
              <h3 className="mt-2 text-base font-semibold leading-snug text-zinc-900 transition-colors duration-300 group-hover:text-brand-mid dark:text-white dark:group-hover:text-brand-accent sm:text-[1.05rem]">
                {service.title}
              </h3>
            </div>
          </div>

          <p className="relative flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {service.description}
          </p>

          <div className="relative mt-5">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500">
              What&apos;s included
            </p>
            <ul className="flex flex-wrap gap-2">
              {service.deliverables.map((d) => (
                <li key={d}>
                  <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-black/[0.06] bg-white/60 px-2.5 py-1.5 text-[11px] font-medium leading-tight text-zinc-600 backdrop-blur-sm transition-colors duration-300 group-hover:border-brand-primary/15 group-hover:bg-white/80 dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-zinc-300 dark:group-hover:border-brand-primary/20 sm:text-xs">
                    <Check
                      className="h-3 w-3 shrink-0"
                      style={{ color: accent }}
                      aria-hidden
                    />
                    {d}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function ServicesIntro({ showViewAll }: { showViewAll: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: easeSmooth }}
      className="max-w-xl lg:sticky lg:top-28"
    >
      <div className="flex items-center gap-3">
        <span
          className="h-px w-10 bg-gradient-to-r from-brand-primary to-transparent"
          aria-hidden
        />
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {SERVICES_SECTION.eyebrow}
        </p>
      </div>

      <h2 className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-[2.65rem]">
        {SERVICES_SECTION.title}
      </h2>

      <p className="mt-4 text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
        {SERVICES_SECTION.lead}
      </p>

      <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        {SERVICES_SECTION.body}
      </p>

      {showViewAll && (
        <div className="mt-8 hidden lg:block">
          <Button to="/services" variant="primary" className="shadow-glow-sm">
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </motion.div>
  )
}

export function ServicesGrid({ limit, showViewAll = false }: ServicesGridProps) {
  const items = limit ? SERVICES.slice(0, limit) : SERVICES
  const isHomePreview = Boolean(limit)

  if (!isHomePreview) {
    return (
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {SERVICES_SECTION.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              {SERVICES_SECTION.title}
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              {SERVICES_SECTION.lead}
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} compact={false} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16 xl:gap-20">
          <ServicesIntro showViewAll={showViewAll} />

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.06, ease: easeSmooth }}
          >
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {items.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} compact />
              ))}
            </div>

            {showViewAll && (
              <div className="mt-8 text-center lg:hidden">
                <Button to="/services" variant="primary" className="w-full shadow-glow-sm sm:w-auto">
                  View All Services
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
