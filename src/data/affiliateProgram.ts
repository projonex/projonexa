import { INQUIRY_PATHS } from './projectInquiry'

export const AFFILIATE_INQUIRY_PATH = INQUIRY_PATHS.affiliate

export function affiliateInquiryPath() {
  return AFFILIATE_INQUIRY_PATH
}

export const AFFILIATE_INQUIRY_SECTION = {
  eyebrow: 'Affiliate program',
  title: 'Earn while you help fellow students',
  description:
    'Join Projonexa’s student affiliate program — refer genuine final-year and academic project inquiries and build a passive income stream alongside your studies.',
} as const

export const AFFILIATE_SIDEBAR_ITEMS = [
  'Passive income from verified student referrals',
  'Your own unique referral code after you apply',
  'Transparent commission on completed projects',
  'Built for students — flexible, ethical promotion',
] as const

export const AFFILIATE_ELIGIBILITY_CRITERIA = [
  {
    title: 'Enrolled student in India',
    description:
      'You must be actively enrolled in an undergraduate or postgraduate program (BE, B.Tech, BCA, MCA, M.Tech, or equivalent).',
  },
  {
    title: 'Genuine referrals only',
    description:
      'Refer students who actually need project help — no spam, fake leads, or misleading promises about pricing or delivery.',
  },
  {
    title: 'Active online presence',
    description:
      'Maintain at least one channel where you can share ethically — LinkedIn, Instagram, WhatsApp groups, or your college network.',
  },
  {
    title: 'Understand our services',
    description:
      'You should be familiar with what Projonexa offers (final-year projects, documentation, deployment, viva support) before referring others.',
  },
  {
    title: 'Accept program terms',
    description:
      'Commission is paid only on verified, completed conversions per the affiliate agreement shared after approval.',
  },
] as const

export const AFFILIATE_HEAR_ABOUT_OPTIONS = [
  { value: 'friend', label: 'Friend or classmate' },
  { value: 'social', label: 'Social media' },
  { value: 'college', label: 'College / campus' },
  { value: 'projonexa-site', label: 'Projonexa website' },
  { value: 'other', label: 'Other' },
] as const

export const AFFILIATE_PROMOTION_CHANNEL_OPTIONS = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'whatsapp', label: 'WhatsApp / college groups' },
  { value: 'offline', label: 'In-person (classmates, clubs)' },
  { value: 'other', label: 'Other' },
] as const

export function labelForAffiliateOption<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string | null | undefined,
): string {
  return options.find((o) => o.value === value)?.label ?? ''
}
