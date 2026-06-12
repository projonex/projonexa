import { AEO_HOME_FAQ } from '@/data/seo'
import type { PageSEO } from '@/lib/seo/seo-types'
import { buildStructuredData } from '@/lib/seo/structured-data'

function schemaReactKey(schema: object, index: number): string {
  const record = schema as Record<string, unknown>
  if (typeof record['@id'] === 'string') return record['@id']
  if (typeof record['@type'] === 'string') return `${record['@type']}-${index}`
  return `schema-${index}`
}

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
      {schemas.map((schema, index) => (
        <script
          key={schemaReactKey(schema, index)}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
