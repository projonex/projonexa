export interface ConsultationSlotsResponse {
  date: string
  scope?: string
  available: string[]
  booked: string[]
  blocked?: string[]
  wholeDayBlocked?: boolean
}

export interface ScheduleInitResponse {
  bookingId: string
  message: string
}

export interface ScheduleConfirmResponse {
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

export class ConsultationScheduleError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ConsultationScheduleError'
  }
}

function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (!url) {
    throw new ConsultationScheduleError(
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

export async function fetchConsultationSlots(
  date: string,
  scope: 'corporate' | 'student' = 'corporate',
): Promise<ConsultationSlotsResponse> {
  const baseUrl = getApiBaseUrl()
  let response: Response
  try {
    response = await fetch(
      `${baseUrl}/api/v1/consultation/slots?date=${encodeURIComponent(date)}&scope=${encodeURIComponent(scope)}`,
      {
        headers: { Accept: 'application/json', 'X-Platform': 'website' },
      },
    )
  } catch {
    throw new ConsultationScheduleError('Could not load available times. Check your connection.')
  }

  if (!response.ok) {
    throw new ConsultationScheduleError(await parseError(response))
  }

  return (await response.json()) as ConsultationSlotsResponse
}

export interface InitiateScheduleInput {
  name: string
  email: string
  phone: string
  payload: Record<string, string>
}

async function postSchedule(
  path: string,
  input: InitiateScheduleInput,
): Promise<ScheduleInitResponse> {
  const baseUrl = getApiBaseUrl()
  let response: Response
  try {
    response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Platform': 'website',
      },
      body: JSON.stringify({ ...input, _hp: '' }),
    })
  } catch {
    throw new ConsultationScheduleError('Could not reach the server. Check your connection.')
  }

  if (!response.ok) {
    throw new ConsultationScheduleError(await parseError(response))
  }

  return (await response.json()) as ScheduleInitResponse
}

async function postConfirm(
  path: string,
  input: { bookingId: string; email: string; otp: string },
): Promise<ScheduleConfirmResponse> {
  const baseUrl = getApiBaseUrl()
  let response: Response
  try {
    response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Platform': 'website',
      },
      body: JSON.stringify(input),
    })
  } catch {
    throw new ConsultationScheduleError('Could not reach the server. Check your connection.')
  }

  if (!response.ok) {
    throw new ConsultationScheduleError(await parseError(response))
  }

  return (await response.json()) as ScheduleConfirmResponse
}

async function postResendOtp(
  path: string,
  input: { bookingId: string; email: string },
): Promise<ScheduleInitResponse> {
  const baseUrl = getApiBaseUrl()
  let response: Response
  try {
    response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Platform': 'website',
      },
      body: JSON.stringify(input),
    })
  } catch {
    throw new ConsultationScheduleError('Could not reach the server. Check your connection.')
  }

  if (!response.ok) {
    throw new ConsultationScheduleError(await parseError(response))
  }

  return (await response.json()) as ScheduleInitResponse
}

export function initiateCorporateSchedule(input: InitiateScheduleInput) {
  return postSchedule('/api/v1/forms/corporate-inquiry/schedule', input)
}

export function confirmCorporateSchedule(input: {
  bookingId: string
  email: string
  otp: string
}) {
  return postConfirm('/api/v1/forms/corporate-inquiry/confirm', input)
}

export function resendCorporateScheduleOtp(input: { bookingId: string; email: string }) {
  return postResendOtp('/api/v1/forms/corporate-inquiry/resend-otp', input)
}

export function initiateStudentSchedule(input: InitiateScheduleInput) {
  return postSchedule('/api/v1/forms/student-inquiry/schedule', input)
}

export function confirmStudentSchedule(input: {
  bookingId: string
  email: string
  otp: string
}) {
  return postConfirm('/api/v1/forms/student-inquiry/confirm', input)
}

export function resendStudentScheduleOtp(input: { bookingId: string; email: string }) {
  return postResendOtp('/api/v1/forms/student-inquiry/resend-otp', input)
}

/** @deprecated Use ConsultationScheduleError */
export class CorporateInquiryError extends ConsultationScheduleError {
  constructor(message: string) {
    super(message)
    this.name = 'CorporateInquiryError'
  }
}

/** @deprecated Use ConsultationScheduleError */
export class StudentInquiryError extends ConsultationScheduleError {
  constructor(message: string) {
    super(message)
    this.name = 'StudentInquiryError'
  }
}

export type CorporateScheduleInitResponse = ScheduleInitResponse
export type CorporateScheduleConfirmResponse = ScheduleConfirmResponse
