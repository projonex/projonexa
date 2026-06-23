'use client'

import { PageHeader } from '@/components/ui/PageHeader'
import { PRIVACY_SECTIONS } from '@/data/privacy'
import { BRAND } from '@/data/brand'

export function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description={`How ${BRAND.name} collects, uses, and protects your information when you use our website and services.`}
      />
      <section className="section-padding">
        <div className="container-narrow max-w-3xl space-y-10">
          {PRIVACY_SECTIONS.map((section) => (
            <article key={section.title}>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{section.title}</h2>
              {'paragraphs' in section &&
                section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                  >
                    {paragraph}
                  </p>
                ))}
              {'bullets' in section && section.bullets ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {section.bullets.map((item) => (
                    <li key={item.slice(0, 48)}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
