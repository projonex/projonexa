'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { verifyReferralCode } from '@/lib/api/referralVerify'
import {
  INVALID_REFERRAL_CODE_MESSAGE,
  isValidReferralCodeFormat,
  normalizeReferralCode,
  referralCodeFormatHint,
} from '@/lib/referralCode'

export type ReferralCodeFieldState = {
  code: string
  setCode: (value: string) => void
  reset: (nextCode?: string) => void
  error: string
  verified: boolean
  verifying: boolean
  validateBeforeSubmit: () => Promise<boolean>
}

export function useReferralCodeField(initialCode = ''): ReferralCodeFieldState {
  const [code, setCodeState] = useState(() =>
    initialCode ? normalizeReferralCode(initialCode) : '',
  )
  const [error, setError] = useState('')
  const [verified, setVerified] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const requestId = useRef(0)

  const runVerify = useCallback(async (raw: string) => {
    const normalized = normalizeReferralCode(raw)
    const currentRequest = ++requestId.current

    if (!normalized) {
      setError('')
      setVerified(false)
      setVerifying(false)
      return true
    }

    if (!isValidReferralCodeFormat(normalized)) {
      setError(`Use format ${referralCodeFormatHint()}.`)
      setVerified(false)
      setVerifying(false)
      return false
    }

    setVerifying(true)
    setError('')
    setVerified(false)

    try {
      const result = await verifyReferralCode(normalized)
      if (currentRequest !== requestId.current) return false

      if (!result.valid) {
        setError(result.message || INVALID_REFERRAL_CODE_MESSAGE)
        setVerified(false)
        return false
      }

      setVerified(true)
      setError('')
      return true
    } catch (err) {
      if (currentRequest !== requestId.current) return false
      setError(err instanceof Error ? err.message : INVALID_REFERRAL_CODE_MESSAGE)
      setVerified(false)
      return false
    } finally {
      if (currentRequest === requestId.current) {
        setVerifying(false)
      }
    }
  }, [])

  const setCode = useCallback(
    (value: string) => {
      setCodeState(normalizeReferralCode(value))
      setError('')
      setVerified(false)
    },
    [],
  )

  useEffect(() => {
    if (!code) return

    const timer = window.setTimeout(() => {
      void runVerify(code)
    }, 450)

    return () => window.clearTimeout(timer)
  }, [code, runVerify])

  useEffect(() => {
    if (initialCode) {
      void runVerify(initialCode)
    }
    // Only verify prefilled code on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validateBeforeSubmit = useCallback(async () => {
    const normalized = normalizeReferralCode(code)
    if (!normalized) {
      setError('')
      setVerified(false)
      return true
    }
    return runVerify(normalized)
  }, [code, runVerify])

  const reset = useCallback((nextCode = '') => {
    requestId.current += 1
    const normalized = nextCode ? normalizeReferralCode(nextCode) : ''
    setCodeState(normalized)
    setError('')
    setVerified(false)
    setVerifying(false)
    if (normalized) {
      void runVerify(normalized)
    }
  }, [runVerify])

  return {
    code,
    setCode,
    reset,
    error,
    verified,
    verifying,
    validateBeforeSubmit,
  }
}
