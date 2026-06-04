import { BRAND } from '@/data/brand'
import { SOCIAL_IMAGES, type SocialImageKey } from '@/constants/social-images'
import type { PageSEO } from './seo-types'

const PATH_IMAGE_KEY: Record<string, SocialImageKey> = {
  '/': 'home',
  '/college-projects': 'college',
  '/inquiry/students': 'college',
  '/client-projects': 'client',
  '/inquiry/corporate': 'client',
  '/affiliate-program': 'affiliate',
  '/inquiry/affiliate': 'affiliate',
  '/contact': 'contact',
}

const MAX_SHARE_TITLE = 70
const MAX_SHARE_DESCRIPTION = 200

function truncate(text: string, max: number): string {
  const trimmed = text.trim()
  if (trimmed.length <= max) return trimmed
  const slice = trimmed.slice(0, max - 1)
  const lastSpace = slice.lastIndexOf(' ')
  return `${(lastSpace > 40 ? slice.slice(0, lastSpace) : slice).trim()}…`
}

export function resolveOgImagePath(seo: PageSEO): string {
  if (seo.ogImage?.startsWith('/')) return seo.ogImage
  if (seo.ogImage?.startsWith('http')) return seo.ogImage
  const key = PATH_IMAGE_KEY[seo.path] ?? 'default'
  return SOCIAL_IMAGES[key]
}

export interface ResolvedShareMeta {
  title: string
  description: string
  url: string
  image: string
  imagePath: string
  imageAlt: string
}

export function resolveShareMeta(seo: PageSEO): ResolvedShareMeta {
  const title = truncate(seo.shareTitle ?? seo.title, MAX_SHARE_TITLE)
  const description = truncate(seo.shareDescription ?? seo.description, MAX_SHARE_DESCRIPTION)
  const imagePath = resolveOgImagePath(seo)
  const image = imagePath.startsWith('http') ? imagePath : `${BRAND.url}${imagePath}`
  const imageAlt =
    seo.ogImageAlt ?? `${BRAND.name} — ${title.replace(` | ${BRAND.name}`, '').trim() || BRAND.tagline}`

  return {
    title,
    description,
    url: `${BRAND.url}${seo.path}`,
    image,
    imagePath,
    imageAlt,
  }
}
