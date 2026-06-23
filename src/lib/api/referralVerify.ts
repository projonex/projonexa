import { INVALID_REFERRAL_CODE_MESSAGE } from '@/lib/referralCode'

export interface ReferralVerifyResponse {
  valid: boolean
  code?: string
  optional?: boolean
  message?: string
}

export class ReferralVerifyError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ReferralVerifyError'
  }
}

function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (!url) {
    throw new ReferralVerifyError('API is not configured.')
  }
  return url.replace(/\/$/, '')
}

export async function verifyReferralCode(code: string): Promise<ReferralVerifyResponse> {
  const normalized = code.trim()
  if (!normalized) {
    return { valid: true, optional: true }
  }

  const baseUrl = getApiBaseUrl()
  let response: Response
  try {
    response = await fetch(
      `${baseUrl}/api/v1/referral/verify?code=${encodeURIComponent(normalized)}`,
      { headers: { Accept: 'application/json', 'X-Platform': 'website' } },
    )
  } catch {
    throw new ReferralVerifyError('Could not verify referral code. Check your connection.')
  }

  if (!response.ok) {
    throw new ReferralVerifyError(INVALID_REFERRAL_CODE_MESSAGE)
  }

  const data = (await response.json()) as ReferralVerifyResponse
  if (!data.valid) {
    return {
      valid: false,
      message: data.message?.trim() || INVALID_REFERRAL_CODE_MESSAGE,
    }
  }
  return data
}
