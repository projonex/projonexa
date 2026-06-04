'use client'

import { SiteAeoBlock } from '@/components/seo/SiteAeoBlock'
import { PageHeader } from '@/components/ui/PageHeader'
import { Stats } from '@/components/sections/Stats'
import { TechnologyShowcase } from '@/components/sections/TechnologyShowcase'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { CTA } from '@/components/sections/CTA'
import { PORTFOLIO_PAGE_FAQ } from '@/data/seo'

export function PortfolioPage() {
  return (
    <>      <PageHeader
        eyebrow="Portfolio"
        title="100+ Projects. Proven Excellence."
        description="Live products and shipped work from our team — including apps built for real student communities."
      />
      <SiteAeoBlock
        headline="Projonexa portfolio — engineering, AI, web, mobile & MVP projects"
        faqItems={PORTFOLIO_PAGE_FAQ}
        className="!border-b-0 !pb-0"
      />
      <Stats />
      <section className="section-padding !pt-0">
        <ProjectsGrid showSectionIntro />
      </section>
      <TechnologyShowcase />
      <CTA />
    </>
  )
}
