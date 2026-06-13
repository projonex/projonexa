'use client'

import { SiteAeoBlock } from '@/components/seo/SiteAeoBlock'
import { PageHeader } from '@/components/ui/PageHeader'
import { VisionFounderSection } from '@/components/sections/VisionFounderSection'
import { Stats } from '@/components/sections/Stats'
import { CTA } from '@/components/sections/CTA'
import { ABOUT_PAGE_FAQ } from '@/data/seo'
import { BRAND } from '@/data/brand'

export function AboutPage() {
  return (
    <>      <PageHeader
        eyebrow="About"
        title={`About ${BRAND.name}`}
        description="A premium software and project development company — delivering custom software, product builds, and specialized academic projects under one trusted brand."
      />
      <SiteAeoBlock
        headline="What is Projonexa — premium technology partner?"
        faqItems={ABOUT_PAGE_FAQ}
        className="!border-b-0 !pb-0"
      />
      <section className="section-padding">
        <div className="container-narrow prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {BRAND.name} is a premium technology company that helps businesses, startups, and
            students transform ideas into production-ready software and projects.
          </p>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            From custom software and startup MVPs to AI/ML systems, web and mobile apps, and
            specialized college project tracks — Projonexa delivers everything under one roof with
            structured delivery, expert mentorship, and professional documentation.
          </p>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Our network of 150+ skilled developers and domain experts ensures every engagement —
            whether a business product or a final-year submission — ships with scalable architecture,
            industry-grade quality, and mentor support throughout the journey.
          </p>
        </div>
      </section>
      <div className="about-stats-before-purpose">
        <Stats />
      </div>
      <VisionFounderSection />
      <CTA />
    </>
  )
}
