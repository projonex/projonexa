export interface AffiliateInitResponse {
  applicationId: string
  message: string
}

export interface AffiliateConfirmResponse {
  id: string
  referralCode: string
  message: string
  notifications?: {
    adminEmail: boolean
    userEmail: boolean
    whatsapp: boolean
    userEmailConfigured: boolean
    whatsappConfigured: boolean
  }
}

export interface AffiliateEligibilityResponse {
  affiliateCode: string
  name: string
  email: string
  totalReferrals: number
  successfulReferrals: number
  requiredReferrals: number
  eligible: boolean
  referralsRemaining: number
  message: string
  studentShareUrl: string
  corporateShareUrl: string
  eligibilityCheckUrl: string
}

export class AffiliateApplicationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AffiliateApplicationError'
  }
}

function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (!url) {
    throw new AffiliateApplicationError(
      'Affiliate applications are not configured. Please contact us directly by email.',
    )
  }
  return url.replace(/\/$/, '')
}

async function parseError(response: Response): Promise<string> {
  const data = (await response.json().catch(() => null)) as { error?: string } | null
  if (data?.error) return String(data.error)
  return 'Something went wrong. Please try again.'
}

export interface InitiateAffiliateInput {
  name: string
  email: string
  phone: string
  payload: Record<string, string | boolean>
}

export async function initiateAffiliateApplication(
  input: InitiateAffiliateInput,
): Promise<AffiliateInitResponse> {
  const baseUrl = getApiBaseUrl()
  let response: Response
  try {
    response = await fetch(`${baseUrl}/api/v1/forms/affiliate-application/initiate`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Platform': 'website',
      },
      body: JSON.stringify({ ...input, _hp: '' }),
    })
  } catch {
    throw new AffiliateApplicationError('Could not reach the server. Check your connection.')
  }

  if (!response.ok) {
    throw new AffiliateApplicationError(await parseError(response))
  }

  return (await response.json()) as AffiliateInitResponse
}

export async function confirmAffiliateApplication(input: {
  applicationId: string
  email: string
  otp: string
}): Promise<AffiliateConfirmResponse> {
  const baseUrl = getApiBaseUrl()
  let response: Response
  try {
    response = await fetch(`${baseUrl}/api/v1/forms/affiliate-application/confirm`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Platform': 'website',
      },
      body: JSON.stringify(input),
    })
  } catch {
    throw new AffiliateApplicationError('Could not reach the server. Check your connection.')
  }

  if (!response.ok) {
    throw new AffiliateApplicationError(await parseError(response))
  }

  return (await response.json()) as AffiliateConfirmResponse
}

export async function resendAffiliateApplicationOtp(input: {
  applicationId: string
  email: string
}): Promise<AffiliateInitResponse> {
  const baseUrl = getApiBaseUrl()
  let response: Response
  try {
    response = await fetch(`${baseUrl}/api/v1/forms/affiliate-application/resend-otp`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Platform': 'website',
      },
      body: JSON.stringify(input),
    })
  } catch {
    throw new AffiliateApplicationError('Could not reach the server. Check your connection.')
  }

  if (!response.ok) {
    throw new AffiliateApplicationError(await parseError(response))
  }

  return (await response.json()) as AffiliateInitResponse
}

export async function fetchAffiliateEligibility(params: {
  code?: string
  email?: string
}): Promise<AffiliateEligibilityResponse> {
  const baseUrl = getApiBaseUrl()
  const search = new URLSearchParams()
  if (params.code?.trim()) search.set('code', params.code.trim())
  if (params.email?.trim()) search.set('email', params.email.trim())

  let response: Response
  try {
    response = await fetch(`${baseUrl}/api/v1/affiliate/eligibility?${search.toString()}`, {
      headers: { Accept: 'application/json', 'X-Platform': 'website' },
    })
  } catch {
    throw new AffiliateApplicationError('Could not reach the server. Check your connection.')
  }

  if (!response.ok) {
    throw new AffiliateApplicationError(await parseError(response))
  }

  return (await response.json()) as AffiliateEligibilityResponse
}
