import { useCallback, useEffect, useRef, useState } from 'react'
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
}: {
  service: (typeof SERVICES)[number]
  index: number
}) {
  const Icon = service.icon
  const accent = getServiceAccent(index)
  const indexLabel = String(index + 1).padStart(2, '0')

  return (
    <article className="group relative flex h-full w-full flex-col">
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

        <div className="relative flex flex-1 flex-col p-5 sm:p-6">
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
                style={{ color: accent, backgroundColor: `${accent}18` }}
              >
                {indexLabel}
              </span>
              <h3 className="mt-2 text-base font-semibold leading-snug text-zinc-900 transition-colors duration-300 group-hover:text-brand-mid dark:text-white dark:group-hover:text-brand-accent sm:text-lg">
                {service.title}
              </h3>
            </div>
          </div>

          <p className="relative flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {service.description}
          </p>

          <div className="relative mt-5">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              What&apos;s included
            </p>
            <ul className="flex flex-wrap gap-2">
              {service.deliverables.map((d) => (
                <li key={d}>
                  <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-black/[0.06] bg-white/60 px-2.5 py-1.5 text-[11px] font-medium leading-tight text-zinc-600 backdrop-blur-sm transition-colors duration-300 group-hover:border-brand-primary/15 group-hover:bg-white/80 dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-zinc-300 dark:group-hover:border-brand-primary/20 sm:text-xs">
                    <Check className="h-3 w-3 shrink-0" style={{ color: accent }} aria-hidden />
                    {d}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}

function ServiceCardSlide({
  service,
  index,
  onVisible,
}: {
  service: (typeof SERVICES)[number]
  index: number
  onVisible: (index: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          onVisible(index)
        }
      },
      { threshold: [0.45, 0.6] },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [index, onVisible])

  return (
    <motion.div
      ref={ref}
      className="services-snap-item flex min-h-[min(400px,72vh)] w-full snap-start snap-always items-stretch py-1"
      initial={{ opacity: 0, x: 48, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: easeSmooth }}
    >
      <ServiceCard service={service} index={index} />
    </motion.div>
  )
}

function ServicesScrollStack({ items }: { items: typeof SERVICES }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleVisible = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current
    const target = container?.querySelector(`[data-service-index="${index}"]`)
    if (container && target instanceof HTMLElement) {
      container.scrollTo({ top: target.offsetTop - container.offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative lg:pl-2">
      <div
        className="pointer-events-none absolute -left-3 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-brand-primary/30 to-transparent lg:block"
        aria-hidden
      />

      <nav
        className="mb-4 hidden items-center justify-between gap-4 lg:flex"
        aria-label="Service cards progress"
      >
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
          Scroll to explore services
        </p>
        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-8 bg-brand-gradient'
                  : 'w-1.5 bg-zinc-300 hover:bg-brand-primary/40 dark:bg-zinc-600'
              }`}
              aria-label={`Go to service ${i + 1}`}
              aria-current={i === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </nav>

      <div
        ref={scrollRef}
        className="services-scroll-stack -mr-1 flex max-h-none flex-col gap-4 overflow-visible pr-1 lg:max-h-[min(72vh,680px)] lg:overflow-y-auto lg:gap-0"
      >
        {items.map((service, i) => (
          <div key={service.id} data-service-index={i}>
            <ServiceCardSlide service={service} index={i} onVisible={handleVisible} />
          </div>
        ))}
      </div>

      <p className="mt-4 hidden text-center text-xs text-zinc-500 lg:block">
        {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
      </p>
    </div>
  )
}

function ServicesIntro({ showViewAll }: { showViewAll: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: easeSmooth }}
      className="max-w-xl lg:sticky lg:top-28 lg:self-start"
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

      <p className="mt-6 hidden text-sm text-zinc-500 lg:block">
        Scroll through each service on the right — cards swipe in as you explore.
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
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-24px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.06, ease: easeSmooth }}
                whileHover={{ y: -4 }}
                className="h-full"
              >
                <ServiceCard service={service} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="mb-10 lg:hidden">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
            {SERVICES_SECTION.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-zinc-900 dark:text-white">
            {SERVICES_SECTION.title}
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">{SERVICES_SECTION.lead}</p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16 xl:gap-20">
          <div className="hidden lg:block">
            <ServicesIntro showViewAll={showViewAll} />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.06, ease: easeSmooth }}
          >
            <ServicesScrollStack items={items} />

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
