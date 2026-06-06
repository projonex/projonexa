'use client'

import { useCallback, useState } from 'react'
import {
  FormSubmissionError,
  submitForm,
  type FormCategory,
  type SubmitFormResponse,
} from '@/lib/api/forms'

interface SubmitOptions {
  category: FormCategory
  name: string
  email: string
  phone?: string
  payload: Record<string, string | boolean>
}

export function useFormSubmission() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const submit = useCallback(async (options: SubmitOptions): Promise<SubmitFormResponse> => {
    setSubmitting(true)
    setError('')
    try {
      return await submitForm(options)
    } catch (err) {
      const message =
        err instanceof FormSubmissionError
          ? err.message
          : 'Something went wrong. Please try again.'
      setError(message)
      throw err
    } finally {
      setSubmitting(false)
    }
  }, [])

  const clearError = useCallback(() => setError(''), [])

  return { submitting, error, submit, clearError }
}
