export const FORM_CATEGORIES = {
  contact: 'contact',
  studentInquiry: 'student_inquiry',
  corporateInquiry: 'corporate_inquiry',
  affiliateApplication: 'affiliate_application',
  careerApplication: 'career_application',
} as const

export type FormCategory = (typeof FORM_CATEGORIES)[keyof typeof FORM_CATEGORIES]

export interface SubmitFormInput {
  category: FormCategory
  name: string
  email: string
  phone?: string
  payload: Record<string, string | boolean>
}

export interface FormNotificationStatus {
  adminEmail: boolean
  userEmail: boolean
  whatsapp: boolean
  userEmailConfigured: boolean
  whatsappConfigured: boolean
}

export interface SubmitFormResponse {
  id: string
  category: FormCategory
  status: string
  message: string
  referralCode?: string
  notifications?: FormNotificationStatus
}

export class FormSubmissionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FormSubmissionError'
  }
}

function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (!url) {
    throw new FormSubmissionError(
      'Form submission is not configured. Please contact us directly by email.',
    )
  }
  return url.replace(/\/$/, '')
}

export async function submitForm(input: SubmitFormInput): Promise<SubmitFormResponse> {
  const baseUrl = getApiBaseUrl()

  let response: Response
  try {
    response = await fetch(`${baseUrl}/api/v1/forms/submit`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Platform': 'website',
      },
      body: JSON.stringify({
        category: input.category,
        name: input.name,
        email: input.email,
        phone: input.phone ?? '',
        payload: input.payload,
        _hp: '',
      }),
    })
  } catch {
    throw new FormSubmissionError(
      'Could not reach the server. Check your connection and try again.',
    )
  }

  const data = (await response.json().catch(() => null)) as
    | SubmitFormResponse
    | { error?: string }
    | null

  if (!response.ok) {
    const message =
      data && typeof data === 'object' && 'error' in data && data.error
        ? String(data.error)
        : 'Something went wrong. Please try again.'
    throw new FormSubmissionError(message)
  }

  if (!data || typeof data !== 'object' || !('id' in data)) {
    throw new FormSubmissionError('Unexpected response from server.')
  }

  return data as SubmitFormResponse
}
