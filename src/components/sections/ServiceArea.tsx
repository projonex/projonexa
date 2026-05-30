import { motion } from 'framer-motion'
import { Globe, MapPin, Users } from 'lucide-react'
import { GEO } from '@/data/brand'
import { SectionHeading } from '@/components/ui/SectionHeading'

/** Geographic service area — supports local SEO (GEO) */
export function ServiceArea() {
  return (
    <section
      className="section-padding"
      aria-labelledby="service-area-heading"
      itemScope
      itemType="https://schema.org/ProfessionalService"
    >
      <meta itemProp="name" content="Projonexa" />
      <div className="container-wide">
        <SectionHeading
          eyebrow="Service Area"
          title="Serving Students & Clients Across India and Globally"
          description="Based in Maharashtra, India — delivering projects remotely to colleges, startups, and innovators nationwide."
        />

        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
          >
            <MapPin className="h-8 w-8 text-brand-primary" aria-hidden />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
              Headquarters
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span itemProp="addressRegion">{GEO.region}</span>,{' '}
              <span itemProp="addressCountry">{GEO.country}</span>
            </p>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
              Coordinates: {GEO.latitude}°N, {GEO.longitude}°E
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="glass rounded-2xl p-8"
          >
            <Globe className="h-8 w-8 text-brand-primary" aria-hidden />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
              Key Regions Served
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {GEO.areaServed.map((place) => (
                <li
                  key={place}
                  className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary"
                >
                  {place}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="glass rounded-2xl p-8"
          >
            <Users className="h-8 w-8 text-brand-primary" aria-hidden />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
              Who We Work With
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>Engineering &amp; CS students (BE, BTech, MCA, BCA)</li>
              <li>Colleges &amp; universities across India</li>
              <li>Startups &amp; student entrepreneurs</li>
              <li>Researchers &amp; MBA scholars</li>
              <li>Businesses &amp; international clients</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
