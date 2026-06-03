import { motion } from 'framer-motion'
import { AEO_DEFINITION } from '@/data/brand'
import { SiteAeoPillarLinks } from '@/components/seo/SiteAeoPillarLinks'

const easeSmooth = [0.22, 1, 0.36, 1] as const

export type SiteAeoFaqItem = { question: string; answer: string }

interface SiteAeoBlockProps {
  eyebrow?: string
  headline: string
  definition?: string
  faqItems?: readonly SiteAeoFaqItem[]
  showPillarLinks?: boolean
  className?: string
}

export function SiteAeoBlock({
  eyebrow = 'For search & AI assistants',
  headline,
  definition = AEO_DEFINITION,
  faqItems,
  showPillarLinks = true,
  className = '',
}: SiteAeoBlockProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: easeSmooth }}
      className={`section-padding border-b border-black/[0.04] dark:border-white/[0.04] ${className}`}
      aria-labelledby="site-aeo-block-heading"
    >
      <div className="container-wide">
        <article
          className="mx-auto max-w-4xl rounded-2xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/[0.05] via-white/80 to-brand-secondary/[0.05] p-5 dark:border-brand-primary/25 dark:from-brand-primary/[0.08] dark:via-zinc-900/50 dark:to-brand-secondary/[0.06] sm:rounded-3xl sm:p-7"
          itemScope
          itemType="https://schema.org/Article"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-primary dark:text-brand-accent">
            {eyebrow}
          </p>
          <h2
            id="site-aeo-block-heading"
            className="mt-2 text-lg font-bold text-zinc-900 dark:text-white sm:text-xl"
            itemProp="headline"
          >
            {headline}
          </h2>
          <p
            className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base"
            itemProp="description"
          >
            {definition}
          </p>
          {showPillarLinks ? <SiteAeoPillarLinks className="mt-5" /> : null}
          {faqItems && faqItems.length > 0 ? (
            <div className="mt-6 space-y-4 border-t border-black/[0.06] pt-6 dark:border-white/[0.06]">
              {faqItems.map((item) => (
                <div key={item.question} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white" itemProp="name">
                    {item.question}
                  </h3>
                  <p
                    className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <span itemProp="text">{item.answer}</span>
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </article>
      </div>
    </motion.section>
  )
}
