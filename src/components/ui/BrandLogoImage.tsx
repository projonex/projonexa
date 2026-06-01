import { BRAND_LOGO } from '@/constants/brand-assets'

interface BrandLogoImageProps {
  className?: string
  /** Decorative watermarks should not duplicate accessible names from nearby headings */
  decorative?: boolean
}

export function BrandLogoImage({ className = '', decorative = false }: BrandLogoImageProps) {
  return (
    <img
      src={BRAND_LOGO.src}
      alt={decorative ? '' : BRAND_LOGO.alt}
      width={BRAND_LOGO.width}
      height={BRAND_LOGO.height}
      className={className}
      decoding="async"
      draggable={false}
      {...(decorative ? { 'aria-hidden': true } : {})}
    />
  )
}
