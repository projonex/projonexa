import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { SERVICE_VERTICALS, SERVICE_VERTICALS_SECTION } from '@/data/brand'
import { Button } from '@/components/ui/Button'
import { easeSmooth } from '@/lib/motion'

export function ServiceVerticals() {
  return (
    <section className="section-padding" aria-labelledby="service-verticals-heading">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: easeSmooth }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
        >
          <div className="flex items-center justify-center gap-3">
            <span
              className="h-px w-10 bg-gradient-to-r from-transparent to-brand-primary"
              aria-hidden
            />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {SERVICE_VERTICALS_SECTION.eyebrow}
            </p>
            <span
              className="h-px w-10 bg-gradient-to-l from-transparent to-brand-primary"
              aria-hidden
            />
          </div>
          <h2
            id="service-verticals-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl"
          >
            {SERVICE_VERTICALS_SECTION.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {SERVICE_VERTICALS_SECTION.lead}
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {SERVICE_VERTICALS.map((vertical, i) => (
            <motion.article
              key={vertical.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-24px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: easeSmooth }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white/55 shadow-card backdrop-blur-xl transition-all duration-300 hover:border-brand-primary/25 hover:shadow-glow-sm dark:border-white/[0.09] dark:bg-black/45 dark:shadow-card-dark sm:rounded-3xl"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-80"
                style={{ background: `linear-gradient(90deg, ${vertical.accent}, transparent)` }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `${vertical.accent}22` }}
                aria-hidden
              />

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  {vertical.subtitle}
                </p>
                <h3 className="mt-2 text-xl font-bold text-zinc-900 transition-colors group-hover:text-brand-mid dark:text-white dark:group-hover:text-brand-accent sm:text-2xl">
                  {vertical.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                  {vertical.description}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {vertical.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: vertical.accent }}
                        aria-hidden
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button to={vertical.path} variant="primary" className="shadow-glow-sm">
                    {vertical.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button to={vertical.inquiryPath} variant="secondary">
                    Submit inquiry
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
