import { BRAND_LOGO } from '@/constants/brand-assets'

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
    <img
      src={BRAND_LOGO.src}
      alt={decorative ? '' : BRAND_LOGO.alt}
      width={BRAND_LOGO.width}
      height={BRAND_LOGO.height}
      className={className}
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      draggable={false}
      {...(decorative ? { 'aria-hidden': true } : {})}
    />
  )
}
