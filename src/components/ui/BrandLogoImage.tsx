import Image from 'next/image'
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
    <Image
      src={BRAND_LOGO.src}
      alt={decorative ? '' : BRAND_LOGO.alt}
      width={256}
      height={256}
      className={className}
      sizes="(max-width: 640px) 44px, 42px"
      priority={priority}
      draggable={false}
      {...(decorative ? { 'aria-hidden': true } : {})}
    />
  )
}
