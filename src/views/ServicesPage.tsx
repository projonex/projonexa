'use client'

import { PageHeader } from '@/components/ui/PageHeader'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { CTA } from '@/components/sections/CTA'
import { Button } from '@/components/ui/Button'
import { SERVICES_PAGE_FAQ } from '@/data/seo'

export function ServicesPage() {
  return (
    <>      <PageHeader
        eyebrow="Services"
        title="Complete Technology Services"
        description="Custom software, startup MVPs, AI/ML, web and mobile apps, IoT, and academic projects — every service includes expert mentorship, professional documentation, and production-ready deliverables."
      />
      <section className="section-padding border-y border-black/[0.05] bg-zinc-50/50 dark:border-white/[0.05] dark:bg-transparent">
        <div className="container-wide grid gap-6 md:grid-cols-3">
          {SERVICES_PAGE_FAQ.map((item, index) => (
            <article key={item.question} className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{item.question}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.answer}</p>
              {index === SERVICES_PAGE_FAQ.length - 1 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button to="/services" variant="secondary" className="px-4 py-2 text-xs">
                    All services
                  </Button>
                  <Button to="/client-projects" variant="secondary" className="px-4 py-2 text-xs">
                    Client solutions
                  </Button>
                  <Button to="/college-projects" variant="secondary" className="px-4 py-2 text-xs">
                    College projects
                  </Button>
                  <Button to="/contact" variant="secondary" className="px-4 py-2 text-xs">
                    Contact
                  </Button>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>
      <ServicesGrid />
      <CTA />
    </>
  )
}
