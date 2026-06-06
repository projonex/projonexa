export interface ConsultationSlotsResponse {
  date: string
  available: string[]
  booked: string[]
}

export interface CorporateScheduleInitResponse {
  bookingId: string
  message: string
}

export interface CorporateScheduleConfirmResponse {
  id: string
  message: string
  meetLink: string
  scheduleLabel: string
  notifications?: {
    adminEmail: boolean
    userEmail: boolean
    whatsapp: boolean
    userEmailConfigured: boolean
    whatsappConfigured: boolean
  }
}

export class CorporateInquiryError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CorporateInquiryError'
  }
}

function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (!url) {
    throw new CorporateInquiryError(
      'Consultation scheduling is not configured. Please contact us directly by email.',
    )
  }
  return url.replace(/\/$/, '')
}

async function parseError(response: Response): Promise<string> {
  const data = (await response.json().catch(() => null)) as { error?: string } | null
  if (data?.error) return String(data.error)
  return 'Something went wrong. Please try again.'
}

export async function fetchConsultationSlots(date: string): Promise<ConsultationSlotsResponse> {
  const baseUrl = getApiBaseUrl()
  let response: Response
  try {
    response = await fetch(
      `${baseUrl}/api/v1/consultation/slots?date=${encodeURIComponent(date)}`,
      {
        headers: { Accept: 'application/json', 'X-Platform': 'website' },
      },
    )
  } catch {
    throw new CorporateInquiryError('Could not load available times. Check your connection.')
  }

  if (!response.ok) {
    throw new CorporateInquiryError(await parseError(response))
  }

  return (await response.json()) as ConsultationSlotsResponse
}

export interface InitiateCorporateScheduleInput {
  name: string
  email: string
  phone: string
  payload: Record<string, string>
}

export async function initiateCorporateSchedule(
  input: InitiateCorporateScheduleInput,
): Promise<CorporateScheduleInitResponse> {
  const baseUrl = getApiBaseUrl()
  let response: Response
  try {
    response = await fetch(`${baseUrl}/api/v1/forms/corporate-inquiry/schedule`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Platform': 'website',
      },
      body: JSON.stringify({ ...input, _hp: '' }),
    })
  } catch {
    throw new CorporateInquiryError('Could not reach the server. Check your connection.')
  }

  if (!response.ok) {
    throw new CorporateInquiryError(await parseError(response))
  }

  return (await response.json()) as CorporateScheduleInitResponse
}

export async function confirmCorporateSchedule(input: {
  bookingId: string
  email: string
  otp: string
}): Promise<CorporateScheduleConfirmResponse> {
  const baseUrl = getApiBaseUrl()
  let response: Response
  try {
    response = await fetch(`${baseUrl}/api/v1/forms/corporate-inquiry/confirm`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Platform': 'website',
      },
      body: JSON.stringify(input),
    })
  } catch {
    throw new CorporateInquiryError('Could not reach the server. Check your connection.')
  }

  if (!response.ok) {
    throw new CorporateInquiryError(await parseError(response))
  }

  return (await response.json()) as CorporateScheduleConfirmResponse
}
