const REFERRAL_PREFIX = 'PX'

/** Client-generated affiliate referral code (e.g. PX-A1B2C3D4). */
export function generateReferralCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(4))
  const segment = Array.from(bytes, (b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
    .slice(0, 8)
  return `${REFERRAL_PREFIX}-${segment}`
}

export function normalizeReferralCode(input: string): string {
  return input.trim().toUpperCase().replace(/\s+/g, '')
}

export function isValidReferralCodeFormat(code: string): boolean {
  const normalized = normalizeReferralCode(code)
  if (!normalized) return true
  return /^PX-[A-Z0-9]{6,12}$/.test(normalized)
}
