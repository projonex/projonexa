export const REFERRAL_PREFIX = 'NS109'

/** Display example for affiliate referral codes (e.g. NS109001). */
export function exampleReferralCode(): string {
  return `${REFERRAL_PREFIX}001`
}

export function normalizeReferralCode(input: string): string {
  return input.trim().toUpperCase().replace(/\s+/g, '')
}

export function isValidReferralCodeFormat(code: string): boolean {
  const normalized = normalizeReferralCode(code)
  if (!normalized) return true
  return /^(NS109[0-9]{3,6}|PX-[A-Z0-9]{6,12})$/.test(normalized)
}

export function referralCodeFormatHint(): string {
  return 'NS109XXX (e.g. NS109001)'
}
