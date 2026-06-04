import { AEO_HOME_FAQ } from '@/data/seo'
import type { PageSEO } from '@/lib/seo-types'
import { buildStructuredData } from '@/lib/structured-data'

export function JsonLd({ seo }: { seo: PageSEO }) {
  const faqItems = seo.faqItems ?? (seo.path === '/' ? [...AEO_HOME_FAQ] : undefined)
  const schemas = buildStructuredData({
    title: seo.title,
    description: seo.description,
    path: seo.path,
    intent: seo.intent,
    breadcrumb: seo.breadcrumb,
    faqSchema: seo.faqSchema,
    serviceSchema: seo.serviceSchema,
    faqItems,
  })

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={JSON.stringify(schema).slice(0, 48)}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
