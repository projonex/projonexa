'use client'

import { SiteAeoBlock } from '@/components/seo/SiteAeoBlock'
import { PageHeader } from '@/components/ui/PageHeader'
import { CTA } from '@/components/sections/CTA'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { PROJECTS_SECTION } from '@/data/projects'
import { PROJECTS_PAGE_FAQ } from '@/data/seo'

export function ProjectsPage() {
  return (
    <>      <PageHeader
        eyebrow="Projects"
        title={PROJECTS_SECTION.title}
        description={PROJECTS_SECTION.lead}
      />
      <SiteAeoBlock
        headline="What products and student apps has Projonexa built?"
        faqItems={PROJECTS_PAGE_FAQ}
        className="!border-b-0 !pb-0"
      />
      <section className="section-padding">
        <ProjectsGrid showSectionIntro={false} />
      </section>
      <CTA />
    </>
  )
}
