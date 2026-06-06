export interface RescheduleDetailsResponse {
  name: string
  email: string
  company?: string
  previousSchedule: string
}

export interface RescheduleConfirmResponse {
  scheduleLabel: string
  meetLink: string
  message: string
}

export class ConsultationRescheduleError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ConsultationRescheduleError'
  }
}

function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (!url) {
    throw new ConsultationRescheduleError(
      'Rescheduling is not configured. Please contact us directly by email.',
    )
  }
  return url.replace(/\/$/, '')
}

async function parseError(response: Response): Promise<string> {
  const data = (await response.json().catch(() => null)) as { error?: string } | null
  if (data?.error) return String(data.error)
  return 'Something went wrong. Please try again.'
}

export async function fetchRescheduleDetails(token: string): Promise<RescheduleDetailsResponse> {
  const baseUrl = getApiBaseUrl()
  let response: Response
  try {
    response = await fetch(
      `${baseUrl}/api/v1/consultation/reschedule?token=${encodeURIComponent(token)}`,
      { headers: { Accept: 'application/json', 'X-Platform': 'website' } },
    )
  } catch {
    throw new ConsultationRescheduleError('Could not load your reschedule link. Check your connection.')
  }
  if (!response.ok) {
    throw new ConsultationRescheduleError(await parseError(response))
  }
  return (await response.json()) as RescheduleDetailsResponse
}

export async function confirmConsultationReschedule(input: {
  token: string
  meetingDate: string
  meetingTime: string
}): Promise<RescheduleConfirmResponse> {
  const baseUrl = getApiBaseUrl()
  let response: Response
  try {
    response = await fetch(`${baseUrl}/api/v1/consultation/reschedule`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Platform': 'website',
      },
      body: JSON.stringify(input),
    })
  } catch {
    throw new ConsultationRescheduleError('Could not reach the server. Check your connection.')
  }
  if (!response.ok) {
    throw new ConsultationRescheduleError(await parseError(response))
  }
  return (await response.json()) as RescheduleConfirmResponse
}

export { fetchConsultationSlots } from '@/lib/api/corporateInquiry'
