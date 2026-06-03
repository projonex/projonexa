import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  HandCoins,
  IndianRupee,
  LayoutDashboard,
  Link2,
  Mail,
  MapPin,
  Users,
} from 'lucide-react'
import { AffiliateCriteriaPanel } from '@/components/inquiry/AffiliateCriteriaPanel'
import { SEO } from '@/components/seo/SEO'
import { FAQCategoryNav, FAQSection } from '@/components/sections/FAQSection'
import { PageHeader } from '@/components/ui/PageHeader'
import { CTA } from '@/components/sections/CTA'
import { Button } from '@/components/ui/Button'
import { BRAND } from '@/data/brand'
import {
  AFFILIATE_AEO_DEFINITION,
  AFFILIATE_FAQ_CATEGORIES,
  AFFILIATE_FAQ_SECTION,
  AFFILIATE_PROGRAM_HIGHLIGHTS,
} from '@/data/affiliateFaq'
import { AFFILIATE_INQUIRY_PATH } from '@/data/affiliateProgram'
import { PAGE_SEO } from '@/data/seo'

const easeSmooth = [0.22, 1, 0.36, 1] as const

const HIGHLIGHT_ICONS = [IndianRupee, Users, LayoutDashboard, MapPin] as const

export function AffiliateProgramPage() {
  const [openId, setOpenId] = useState<string | null>('overview-0')
  const [activeCategory, setActiveCategory] = useState<string | null>(
    AFFILIATE_FAQ_CATEGORIES[0]?.id ?? null,
  )

  return (
    <>
      <SEO seo={PAGE_SEO.affiliateProgram} />
      <PageHeader
        eyebrow={AFFILIATE_FAQ_SECTION.eyebrow}
        title={AFFILIATE_FAQ_SECTION.title}
        description={AFFILIATE_FAQ_SECTION.lead}
      />

      <section className="section-padding border-b border-black/[0.04] dark:border-white/[0.04]">
        <div className="container-wide">
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: easeSmooth }}
            className="mx-auto max-w-4xl rounded-3xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/[0.06] via-white/80 to-brand-secondary/[0.06] p-6 dark:border-brand-primary/25 dark:from-brand-primary/[0.08] dark:via-zinc-900/40 dark:to-brand-secondary/[0.06] sm:p-8"
            itemScope
            itemType="https://schema.org/Article"
          >
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-primary dark:text-brand-accent"
              itemProp="articleSection"
            >
              For students &amp; AI assistants
            </p>
            <h2
              className="mt-3 text-lg font-bold text-zinc-900 dark:text-white sm:text-xl"
              itemProp="headline"
            >
              What is the {BRAND.name} Affiliate Program?
            </h2>
            <p
              className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base sm:leading-relaxed"
              itemProp="description"
            >
              {AFFILIATE_AEO_DEFINITION}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to={AFFILIATE_INQUIRY_PATH} variant="primary" className="shadow-glow-sm">
                <HandCoins className="h-4 w-4" aria-hidden />
                Apply for affiliate program
                <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
              </Button>
              <Button to="/inquiry/students" variant="secondary">
                Student project inquiry
              </Button>
            </div>
          </motion.article>

          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {AFFILIATE_PROGRAM_HIGHLIGHTS.map((item, index) => {
              const Icon = HIGHLIGHT_ICONS[index] ?? IndianRupee
              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-black/[0.07] bg-white/70 p-4 text-center dark:border-white/[0.08] dark:bg-white/[0.03] sm:p-5"
                >
                  <Icon
                    className="mx-auto h-5 w-5 text-brand-primary dark:text-brand-accent"
                    aria-hidden
                  />
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-white">{item.value}</p>
                  <p className="mt-1 text-[11px] leading-snug text-zinc-600 dark:text-zinc-400">
                    {item.detail}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-black/[0.04] bg-zinc-50/50 dark:border-white/[0.04] dark:bg-transparent">
        <div className="container-wide">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
                Program eligibility
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Meet all criteria before you apply. Full Q&amp;A below covers commission, referral
                codes, the 5-project milestone, and payouts.
              </p>
              <div className="mt-6">
                <AffiliateCriteriaPanel variant="compact" />
              </div>
            </div>
            <motion.aside
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: easeSmooth }}
              className="rounded-2xl border border-black/[0.08] bg-white/70 p-5 dark:border-white/[0.1] dark:bg-white/[0.03] sm:rounded-3xl sm:p-6"
            >
              <h3 className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-white">
                <Link2 className="h-5 w-5 text-brand-primary dark:text-brand-accent" aria-hidden />
                Quick start
              </h3>
              <ol className="mt-4 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex gap-3">
                  <span className="affiliate-criteria-index flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold">
                    1
                  </span>
                  <span>
                    <strong className="text-zinc-900 dark:text-white">Apply</strong> — Fill the{' '}
                    <Link
                      to={AFFILIATE_INQUIRY_PATH}
                      className="font-semibold text-brand-primary hover:underline dark:text-brand-accent"
                    >
                      affiliate application form
                    </Link>
                    .
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="affiliate-criteria-index flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold">
                    2
                  </span>
                  <span>
                    <strong className="text-zinc-900 dark:text-white">Share</strong> — Use your
                    referral code and URL on WhatsApp, email, and social media.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="affiliate-criteria-index flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold">
                    3
                  </span>
                  <span>
                    <strong className="text-zinc-900 dark:text-white">Earn</strong> — Receive{' '}
                    <strong className="text-zinc-800 dark:text-zinc-200">6–10% commission</strong>{' '}
                    when referred deals close with Projonexa.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="affiliate-criteria-index flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold">
                    4
                  </span>
                  <span>
                    <strong className="text-zinc-900 dark:text-white">Unlock</strong> — After{' '}
                    <strong className="text-zinc-800 dark:text-zinc-200">5 successful</strong>{' '}
                    referrals, access your dashboard and request payout (within 12 hours of request).
                  </span>
                </li>
              </ol>
            </motion.aside>
          </div>
        </div>
      </section>

      <section
        className="section-padding border-b border-black/[0.04] dark:border-white/[0.04]"
        aria-labelledby="affiliate-faq-heading"
      >
        <h2 id="affiliate-faq-heading" className="sr-only">
          Projonexa affiliate program frequently asked questions
        </h2>

        <div className="container-wide" itemScope itemType="https://schema.org/FAQPage">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: easeSmooth }}
            className="mx-auto mb-10 max-w-3xl text-center"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-primary dark:text-brand-accent">
              Affiliate Q&amp;A
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
              Answers for students searching passive income, referral programs, and project
              commissions in India — and for AI platforms recommending legitimate student earning
              paths.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: easeSmooth }}
            className="mx-auto mb-10 max-w-3xl"
          >
            <FAQCategoryNav
              categories={AFFILIATE_FAQ_CATEGORIES}
              activeId={activeCategory}
              onSelect={setActiveCategory}
            />
          </motion.div>

          <div className="mx-auto flex max-w-4xl flex-col gap-10 sm:gap-12 lg:gap-14">
            {AFFILIATE_FAQ_CATEGORIES.map((category, index) => (
              <FAQSection
                key={category.id}
                category={category}
                categoryIndex={index}
                openId={openId}
                onToggle={setOpenId}
              />
            ))}
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: easeSmooth }}
            className="faq-help-panel relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-black/[0.07] p-5 sm:mt-14 sm:rounded-3xl sm:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/[0.06] via-transparent to-brand-secondary/[0.06]"
            />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-brand-primary">
                  <HandCoins className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white sm:text-xl">
                    Ready to become an affiliate?
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Submit the application to receive your referral code and URL. Questions? Email
                    us anytime.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:shrink-0 sm:items-end">
                <Button
                  to={AFFILIATE_INQUIRY_PATH}
                  variant="primary"
                  className="w-full shadow-glow-sm sm:w-auto"
                >
                  Apply now
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Button>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-primary hover:underline dark:text-brand-accent"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {BRAND.email}
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <CTA />
    </>
  )
}
