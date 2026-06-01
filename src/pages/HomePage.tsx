import { SEO } from '@/components/seo/SEO'
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { AEOOverview } from '@/components/sections/AEOOverview'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { TechnologyWhySection } from '@/components/sections/TechnologyWhySection'
import { ServiceFounderSection } from '@/components/sections/ServiceFounderSection'
import { VisionMission } from '@/components/sections/VisionMission'
import { CTA } from '@/components/sections/CTA'
import { Button } from '@/components/ui/Button'
import { PAGE_SEO } from '@/data/seo'

export function HomePage() {
  return (
    <>
      <SEO seo={PAGE_SEO.home} />
      <Hero />
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
              Projonexa builds final year projects, AI/ML systems, startup MVPs, and custom software
              with complete documentation, deployment guidance, and mentor support.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/services" variant="secondary">
                Explore services
              </Button>
              <Button to="/pricing" variant="secondary">
                View pricing
              </Button>
              <Button to="/faq" variant="secondary">
                Read FAQ
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
      <VisionMission />
      <CTA />
    </>
  )
}
