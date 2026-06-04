import Image from 'next/image'
import { BRAND_LOGO, BRAND_LOGO_SIZES } from '@/constants/brand-assets'

interface BrandLogoImageProps {
  className?: string
  /** Decorative images should not duplicate accessible names from nearby labels */
  decorative?: boolean
  /** Prioritize loading for header / above-the-fold marks */
  priority?: boolean
}

export function BrandLogoImage({
  className = '',
  decorative = false,
  priority = false,
}: BrandLogoImageProps) {
  return (
    <Image
      src={BRAND_LOGO_SIZES.md}
      alt={decorative ? '' : BRAND_LOGO.alt}
      fill
      className={`site-logo-image object-contain ${className}`.trim()}
      sizes="(max-width: 640px) 40px, 42px"
      priority={priority}
      draggable={false}
      {...(decorative ? { 'aria-hidden': true } : {})}
    />
  )
}
