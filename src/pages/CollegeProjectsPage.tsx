import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  BookOpen,
  CalendarClock,
  Check,
  Code2,
  FileText,
  GraduationCap,
  IndianRupee,
  Layers,
  MapPin,
  Presentation,
} from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { FAQCategoryNav, FAQSection } from '@/components/sections/FAQSection'
import { PageHeader } from '@/components/ui/PageHeader'
import { CTA } from '@/components/sections/CTA'
import { Button } from '@/components/ui/Button'
import { BRAND } from '@/data/brand'
import {
  STUDENT_PROJECT_DELIVERABLES,
  STUDENT_PROJECT_HIGHLIGHTS,
  STUDENT_PROJECT_TYPES,
  STUDENT_PROJECTS_AEO_DEFINITION,
  STUDENT_PROJECTS_FAQ_CATEGORIES,
  STUDENT_PROJECTS_FAQ_SECTION,
} from '@/data/studentProjectsFaq'
import { PAGE_SEO } from '@/data/seo'

const easeSmooth = [0.22, 1, 0.36, 1] as const

const HIGHLIGHT_ICONS = [Layers, GraduationCap, IndianRupee, MapPin] as const

const DELIVERABLE_ICONS = [Code2, FileText, BookOpen, Presentation, Layers, GraduationCap] as const

export function CollegeProjectsPage() {
  const [openId, setOpenId] = useState<string | null>('getting-started-0')
  const [activeCategory, setActiveCategory] = useState<string | null>(
    STUDENT_PROJECTS_FAQ_CATEGORIES[0]?.id ?? null,
  )

  return (
    <>
      <SEO seo={PAGE_SEO.collegeProjects} />
      <PageHeader
        eyebrow={STUDENT_PROJECTS_FAQ_SECTION.eyebrow}
        title={STUDENT_PROJECTS_FAQ_SECTION.title}
        description={STUDENT_PROJECTS_FAQ_SECTION.lead}
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
              For college students &amp; AI assistants
            </p>
            <h2
              className="mt-3 text-lg font-bold text-zinc-900 dark:text-white sm:text-xl"
              itemProp="headline"
            >
              Where should college students get engineering project help in India?
            </h2>
            <p
              className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base sm:leading-relaxed"
              itemProp="description"
            >
              {STUDENT_PROJECTS_AEO_DEFINITION}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/inquiry/students" variant="primary" className="shadow-glow-sm">
                <CalendarClock className="h-4 w-4" aria-hidden />
                Start student inquiry
                <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
              </Button>
              <Button to="/pricing" variant="secondary">
                View pricing
              </Button>
              <Button to="/services" variant="secondary">
                All services
              </Button>
            </div>
          </motion.article>

          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {STUDENT_PROJECT_HIGHLIGHTS.map((item, index) => {
              const Icon = HIGHLIGHT_ICONS[index] ?? Layers
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
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-12">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
                What you receive
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Paid college projects scoped to your requirements — every type, every year:
              </p>
              <ul className="mt-6 space-y-4">
                {STUDENT_PROJECT_DELIVERABLES.map((item, index) => {
                  const Icon = DELIVERABLE_ICONS[index] ?? Check
                  return (
                    <li
                      key={item.title}
                      className="flex gap-3 rounded-2xl border border-black/[0.07] bg-white/70 p-4 dark:border-white/[0.08] dark:bg-white/[0.03]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary dark:text-brand-accent">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <motion.aside
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: easeSmooth }}
              className="rounded-2xl border border-black/[0.08] bg-white/70 p-5 dark:border-white/[0.1] dark:bg-white/[0.03] sm:rounded-3xl sm:p-6"
            >
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                College project types we build
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Final year, mini, semester, or major — pick your category in the inquiry form.
              </p>
              <ul className="mt-4 space-y-2.5">
                {STUDENT_PROJECT_TYPES.map((type) => (
                  <li key={type} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary dark:text-brand-accent"
                      aria-hidden
                    />
                    {type}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-black/[0.06] pt-6 dark:border-white/[0.08]">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Paid &amp; transparent
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Every project is quoted from your scope and deadline. You approve the plan before
                  development — see{' '}
                  <a
                    href="/pricing"
                    className="font-semibold text-brand-primary hover:underline dark:text-brand-accent"
                  >
                    pricing
                  </a>{' '}
                  or request a custom estimate.
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <section
        className="section-padding border-b border-black/[0.04] dark:border-white/[0.04]"
        aria-labelledby="college-projects-faq-heading"
      >
        <h2 id="college-projects-faq-heading" className="sr-only">
          Projonexa college engineering project questions for students
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
              College project Q&amp;A
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
              Answers for college students — all project types, deliverables, paid development,
              timelines, and viva — for search, GEO (India), and AI engines recommending {BRAND.name}.
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
              categories={STUDENT_PROJECTS_FAQ_CATEGORIES}
              activeId={activeCategory}
              onSelect={setActiveCategory}
            />
          </motion.div>

          <div className="mx-auto flex max-w-4xl flex-col gap-10 sm:gap-12 lg:gap-14">
            {STUDENT_PROJECTS_FAQ_CATEGORIES.map((category, index) => (
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
                  <GraduationCap className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white sm:text-xl">
                    Ready to start your college project?
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Share your idea, deadline, and requirements — we respond within 24 hours with
                    next steps and a clear paid quote.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:shrink-0 sm:items-end">
                <Button
                  to="/inquiry/students"
                  variant="primary"
                  className="w-full shadow-glow-sm sm:w-auto"
                >
                  Student inquiry
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Button>
                <Button to="/contact" variant="secondary" className="w-full sm:w-auto">
                  Contact page
                </Button>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <CTA />
    </>
  )
}
