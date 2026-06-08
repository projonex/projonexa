'use client'

import { useCallback, useEffect, useState } from 'react'
import { fetchConsultationSlots } from '@/lib/api/consultationSchedule'

export type ConsultationSlotState = {
  availableSlots: string[]
  bookedSlots: string[]
  blockedSlots: string[]
  wholeDayBlocked: boolean
  loading: boolean
}

export function useConsultationSlotAvailability(
  date: string,
  scope: 'student' | 'corporate',
  meetingTime: string,
  onMeetingTimeChange: (value: string) => void,
) {
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [blockedSlots, setBlockedSlots] = useState<string[]>([])
  const [wholeDayBlocked, setWholeDayBlocked] = useState(false)
  const [loading, setLoading] = useState(false)

  const loadSlots = useCallback(async () => {
    if (!date) {
      setAvailableSlots([])
      setBookedSlots([])
      setBlockedSlots([])
      setWholeDayBlocked(false)
      return
    }
    setLoading(true)
    try {
      const data = await fetchConsultationSlots(date, scope)
      setAvailableSlots(data.available)
      setBookedSlots(data.booked)
      setBlockedSlots(data.blocked ?? [])
      setWholeDayBlocked(Boolean(data.wholeDayBlocked))
      if (data.available.length > 0 && !data.available.includes(meetingTime)) {
        onMeetingTimeChange(data.available[0])
      }
    } catch {
      setAvailableSlots([])
      setBookedSlots([])
      setBlockedSlots([])
      setWholeDayBlocked(false)
    } finally {
      setLoading(false)
    }
  }, [date, scope, meetingTime, onMeetingTimeChange])

  useEffect(() => {
    void loadSlots()
  }, [loadSlots])

  function isSlotAvailable(time: string) {
    return availableSlots.includes(time)
  }

  function validateSelectedTime(time: string) {
    if (!date) return 'Please choose a consultation date.'
    if (wholeDayBlocked || availableSlots.length === 0) {
      return 'No consultation slots are available on this date. Please choose another day.'
    }
    if (!isSlotAvailable(time)) {
      if (bookedSlots.includes(time)) {
        return 'This time slot is already booked. Please choose another time.'
      }
      if (blockedSlots.includes(time)) {
        return 'This time slot is unavailable. Please choose another time.'
      }
      return 'This time slot is not available. Please choose another time.'
    }
    return ''
  }

  return {
    availableSlots,
    bookedSlots,
    blockedSlots,
    wholeDayBlocked,
    loading,
    isSlotAvailable,
    validateSelectedTime,
  }
}

export function consultationSlotOptionSuffix(
  value: string,
  availableSlots: string[],
  bookedSlots: string[],
  blockedSlots: string[],
  wholeDayBlocked: boolean,
): string {
  if (wholeDayBlocked) return ' — Unavailable'
  if (bookedSlots.includes(value)) return ' — Booked'
  if (blockedSlots.includes(value)) return ' — Unavailable'
  if (!availableSlots.includes(value)) return ' — Unavailable'
  return ''
}
