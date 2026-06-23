'use client'

import { Hero } from '@/components/sections/Hero'
import { ServiceVerticals } from '@/components/sections/ServiceVerticals'
import { Stats } from '@/components/sections/Stats'
import { AEOOverview } from '@/components/sections/AEOOverview'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { TechnologyWhySection } from '@/components/sections/TechnologyWhySection'
import { ServiceFounderSection } from '@/components/sections/ServiceFounderSection'
import { VisionMission } from '@/components/sections/VisionMission'
import { BlogPreview } from '@/components/sections/BlogPreview'
import { CTA } from '@/components/sections/CTA'
import { Button } from '@/components/ui/Button'
import { AEO_DEFINITION } from '@/data/brand'

export function HomePage() {
  return (
    <>
      <Hero />
      <ServiceVerticals />
      <section className="section-padding border-y border-black/[0.05] bg-zinc-50/60 dark:border-white/[0.06] dark:bg-transparent">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary dark:text-brand-accent">
              Quick answer
            </p>
            <h2 className="mt-3 text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl">
              What does Projonexa do?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
              {AEO_DEFINITION}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/services" variant="primary" className="shadow-glow-sm">
                All services
              </Button>
              <Button to="/client-projects" variant="secondary">
                Client solutions
              </Button>
              <Button to="/college-projects" variant="secondary">
                College projects
              </Button>
              <Button to="/contact" variant="secondary">
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Stats />
      <AEOOverview />
      <ServicesGrid limit={6} showViewAll />
      <TechnologyWhySection />
      <ServiceFounderSection />
      <BlogPreview />
      <VisionMission />
      <CTA />
    </>
  )
}
