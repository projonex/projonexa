import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { PageHeader } from '@/components/ui/PageHeader'
import { CTA } from '@/components/sections/CTA'
import { Button } from '@/components/ui/Button'
import { PRICING_PLANS } from '@/data/pricing'
import { PAGE_SEO, PRICING_PAGE_FAQ } from '@/data/seo'

export function PricingPage() {
  return (
    <>
      <SEO seo={PAGE_SEO.pricing} />
      <PageHeader
        eyebrow="Pricing"
        title="Transparent Plans for Every Ambition"
        description="Student-friendly pricing with enterprise-grade deliverables. Every plan is customized to your scope — contact us for a detailed quote."
      />
      <section className="section-padding border-y border-black/[0.05] bg-zinc-50/50 dark:border-white/[0.05] dark:bg-transparent">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl rounded-3xl border border-black/[0.08] bg-white/70 p-6 dark:border-white/[0.1] dark:bg-white/[0.03]">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">How pricing works</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
              Pricing is based on project complexity, timeline, and documentation depth. You get a clear
              quote before development starts, with no hidden scope surprises.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button to="/services" variant="secondary">
                Compare services
              </Button>
              <Button to="/faq" variant="secondary">
                Read pricing FAQ
              </Button>
              <Button to="/contact" variant="secondary">
                Request custom quote
              </Button>
            </div>
          </div>
          <div className="mx-auto mt-6 grid max-w-4xl gap-4 md:grid-cols-3">
            {PRICING_PAGE_FAQ.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl border border-black/[0.07] bg-white/60 p-5 dark:border-white/[0.08] dark:bg-white/[0.03]"
              >
                <h2 className="text-base font-semibold text-zinc-900 dark:text-white">{item.question}</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-wide grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`flex flex-col rounded-2xl p-6 ${
                plan.highlighted
                  ? 'border-2 border-brand-primary bg-brand-primary/5 shadow-glow dark:bg-brand-primary/10 dark:shadow-glow-sm'
                  : 'glass'
              }`}
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{plan.description}</p>
              <p className="mt-6">
                <span className="text-3xl font-bold text-gradient">{plan.price}</span>
                <span className="ml-1 text-sm text-zinc-500">/{plan.period}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button to="/contact" variant={plan.highlighted ? 'primary' : 'secondary'} className="w-full">
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  )
}
