import { TechnologyShowcase } from '@/components/sections/TechnologyShowcase'

/** Technology stack showcase on home */
export function TechnologyWhySection() {
  return (
    <section
      className="tech-why-band section-padding section-frosted overflow-hidden"
      aria-labelledby="tech-showcase-heading"
    >
      <TechnologyShowcase variant="grouped" />
    </section>
  )
}
