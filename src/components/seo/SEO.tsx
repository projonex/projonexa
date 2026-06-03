import { Helmet } from 'react-helmet-async'
import { BRAND_ICONS } from '@/constants/brand-assets'
import { BRAND, FOUNDER, GEO } from '@/data/brand'
import { AEO_HOME_FAQ, type PageSEO } from '@/data/seo'
import { buildStructuredData } from '@/lib/structured-data'

interface SEOProps {
  seo: PageSEO
}

export function SEO({ seo }: SEOProps) {
  const url = `${BRAND.url}${seo.path}`
  const image = `${BRAND.url}/og-image.svg`
  const imageAlt = `${BRAND.name} — ${BRAND.tagline} Final year projects & innovation platform India`

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
    <Helmet>
      {/* Primary SEO */}
      <html lang={GEO.language} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords.join(', ')} />
      <meta name="author" content={FOUNDER.name} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Geographic SEO (GEO) */}
      <meta name="geo.region" content={`${GEO.countryCode}-${GEO.regionCode}`} />
      <meta name="geo.placename" content={GEO.placename} />
      <meta name="geo.position" content={`${GEO.latitude};${GEO.longitude}`} />
      <meta name="ICBM" content={`${GEO.latitude}, ${GEO.longitude}`} />
      <meta name="language" content="English" />
      <meta httpEquiv="content-language" content={GEO.language} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={BRAND.name} />
      <meta property="og:locale" content={GEO.locale} />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Twitter / X Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* App / theme */}
      <meta name="theme-color" content="#0A0F1C" />
      <meta name="application-name" content={BRAND.name} />
      <meta name="apple-mobile-web-app-title" content={BRAND.name} />
      <link rel="icon" type="image/png" sizes="16x16" href={BRAND_ICONS.favicon16} />
      <link rel="icon" type="image/png" sizes="32x32" href={BRAND_ICONS.favicon32} />
      <link rel="shortcut icon" href={BRAND_ICONS.favicon32} />
      <link rel="apple-touch-icon" sizes="180x180" href={BRAND_ICONS.appleTouch} />

      {/* Structured data — SEO + AEO + GEO */}
      {schemas.map((schema) => (
        <script key={JSON.stringify(schema).slice(0, 48)} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
