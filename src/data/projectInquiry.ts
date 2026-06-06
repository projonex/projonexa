import { CONTACT_EMAIL } from '@/data/contact'
import { normalizeReferralCode } from '@/lib/referralCode'
import { minMeetingDateIso } from '@/lib/meetingDate'

export { minMeetingDateIso }

export const PROJECT_INQUIRY_EMAIL = CONTACT_EMAIL

export const INQUIRY_PATHS = {
  students: '/inquiry/students',
  corporate: '/inquiry/corporate',
  affiliate: '/inquiry/affiliate',
} as const

export type InquiryAudience = keyof typeof INQUIRY_PATHS

export function studentInquiryPath(referralCode?: string) {
  const base = INQUIRY_PATHS.students
  if (!referralCode) return base
  const ref = normalizeReferralCode(referralCode)
  if (!ref) return base
  return `${base}?ref=${encodeURIComponent(ref)}`
}

export function corporateInquiryPath() {
  return INQUIRY_PATHS.corporate
}

export const STUDENT_INQUIRY_SECTION = {
  eyebrow: 'Student project inquiry',
  title: 'Start your academic project',
  description:
    'Share your idea and schedule a consultation — we will confirm your meeting and next steps.',
} as const

/** Consultation slots (IST) — shown after the student picks a date. */
export const MEETING_TIME_SLOTS = [
  { value: '10:00', label: '10:00 AM IST' },
  { value: '11:00', label: '11:00 AM IST' },
  { value: '12:00', label: '12:00 PM IST' },
  { value: '14:00', label: '2:00 PM IST' },
  { value: '15:00', label: '3:00 PM IST' },
  { value: '16:00', label: '4:00 PM IST' },
  { value: '17:00', label: '5:00 PM IST' },
  { value: '18:00', label: '6:00 PM IST' },
] as const

export function formatMeetingDate(isoDate: string): string {
  if (!isoDate) return ''
  const [year, month, day] = isoDate.split('-').map(Number)
  if (!year || !month || !day) return isoDate
  return new Date(year, month - 1, day).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const RESCHEDULE_CONSULTATION_PATH = '/consultation/reschedule' as const

export const CORPORATE_INQUIRY_SECTION = {
  eyebrow: 'Corporate & startup inquiry',
  title: 'Build your product with Projonexa',
  description:
    'MVPs, websites, apps, and custom software — share what you want to build, your timeline, and book a consultation.',
} as const

/** Corporate / startup delivery timeline (form only). */
export const CORPORATE_TIMELINE_OPTIONS = [
  { value: 'urgent-4w', label: 'Urgent — within 4 weeks' },
  { value: 'standard-6-8w', label: 'Standard — 6 to 8 weeks' },
  { value: 'extended-8-12w', label: 'Extended — 8 to 12 weeks' },
  { value: 'quarter-plus', label: '3 months or more' },
  { value: 'flexible', label: 'Flexible / exploring options' },
] as const

/** Corporate / startup budget ranges (form only). */
export const CORPORATE_BUDGET_OPTIONS = [
  { value: 'under-50k', label: 'Under ₹50,000' },
  { value: '50k-1l', label: '₹50,000 – ₹1,00,000' },
  { value: '1l-2l', label: '₹1,00,000 – ₹2,00,000' },
  { value: '2l-5l', label: '₹2,00,000 – ₹5,00,000' },
  { value: '5l-plus', label: '₹5,00,000+' },
  { value: 'undecided', label: 'Not decided yet' },
] as const

export const INQUIRY_TIMELINE_OPTIONS = [
  { value: 'urgent-1-2w', label: 'Urgent — within 2 weeks' },
  { value: 'standard-3-6w', label: 'Standard — 3 to 6 weeks' },
  { value: 'extended-6-10w', label: 'Extended — 6 to 10 weeks' },
  { value: 'semester', label: 'Full semester timeline' },
  { value: 'flexible', label: 'Flexible / exploring options' },
] as const

export const INQUIRY_BUDGET_OPTIONS = [
  { value: 'under-15k', label: 'Under ₹15,000' },
  { value: '15k-30k', label: '₹15,000 – ₹30,000' },
  { value: '30k-60k', label: '₹30,000 – ₹60,000' },
  { value: '60k-plus', label: '₹60,000+' },
  { value: 'undecided', label: 'Not decided yet' },
] as const

/** Student inquiry budget ranges (student form only). */
export const STUDENT_BUDGET_OPTIONS = [
  { value: 'under-5k', label: 'Under ₹5,000' },
  { value: '5k-10k', label: '₹5,000 – ₹10,000' },
  { value: '10k-15k', label: '₹10,000 – ₹15,000' },
  { value: '15k-20k', label: '₹15,000 – ₹20,000' },
  { value: '20k-30k', label: '₹20,000 – ₹30,000' },
  { value: '30k-60k', label: '₹30,000 – ₹60,000' },
  { value: 'undecided', label: 'Not decided yet' },
] as const

export const STUDENT_PROJECT_TYPES = [
  { value: 'final-year', label: 'Final Year Project' },
  { value: 'mini', label: 'Mini Project' },
  { value: 'ai-ml', label: 'AI / ML Project' },
  { value: 'web', label: 'Web Application' },
  { value: 'mobile', label: 'Mobile Application' },
  { value: 'iot', label: 'IoT / Embedded' },
  { value: 'research', label: 'Research / Seminar' },
  { value: 'other', label: 'Other' },
] as const

export const STUDENT_YEAR_OPTIONS = [
  { value: 'second', label: '2nd year' },
  { value: 'third', label: '3rd year' },
  { value: 'final', label: 'Final year (BE / B.Tech / BCA)' },
  { value: 'pg', label: 'Postgraduate (MCA / M.Tech / MSc)' },
  { value: 'other', label: 'Other' },
] as const

export const STUDENT_VIVA_SUPPORT_OPTIONS = [
  { value: 'full', label: 'Full — report, PPT, demo & viva prep' },
  { value: 'docs', label: 'Documentation & PPT only' },
  { value: 'code-only', label: 'Code & deployment only' },
  { value: 'unsure', label: 'Not sure yet' },
] as const

export const CORPORATE_BUILD_OPTIONS = [
  { value: 'website', label: 'Website' },
  { value: 'app', label: 'Mobile / Web App' },
  { value: 'crm', label: 'CRM / ERP System' },
  { value: 'ecommerce', label: 'E-commerce Platform' },
  { value: 'custom-software', label: 'Custom Software' },
  { value: 'ai-ml', label: 'AI / ML Solution' },
  { value: 'other', label: 'Other' },
] as const

export const CORPORATE_ROLE_OPTIONS = [
  { value: 'founder', label: 'Founder / Co-founder' },
  { value: 'product', label: 'Product / Project Manager' },
  { value: 'engineering', label: 'Engineering Lead' },
  { value: 'business', label: 'Business / Operations' },
  { value: 'other', label: 'Other' },
] as const

export function labelForOption<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string | null | undefined,
): string {
  return options.find((o) => o.value === value)?.label ?? ''
}
