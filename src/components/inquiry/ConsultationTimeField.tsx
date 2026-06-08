'use client'

import { FormSelectField } from '@/components/careers/FormSelectField'
import { InquiryRequired } from '@/components/inquiry/inquiryFormShared'
import {
  consultationSlotOptionSuffix,
  type ConsultationSlotState,
} from '@/lib/hooks/useConsultationSlotAvailability'
import { MEETING_TIME_SLOTS } from '@/data/projectInquiry'

type ConsultationTimeFieldProps = {
  id: string
  name?: string
  value: string
  onChange: (value: string) => void
  slots: ConsultationSlotState
  required?: boolean
}

export function ConsultationTimeField({
  id,
  name = 'meetingTime',
  value,
  onChange,
  slots,
  required = true,
}: ConsultationTimeFieldProps) {
  const { availableSlots, bookedSlots, blockedSlots, wholeDayBlocked, loading } = slots
  const noOpenSlots = !loading && availableSlots.length === 0

  return (
    <div>
      <FormSelectField
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading || noOpenSlots}
        label={
          <>
            Time <InquiryRequired />
            {loading ? (
              <span className="ml-1 font-normal text-zinc-400">(checking availability…)</span>
            ) : null}
          </>
        }
      >
        {MEETING_TIME_SLOTS.map((opt) => {
          const available = availableSlots.includes(opt.value)
          const suffix = consultationSlotOptionSuffix(
            opt.value,
            availableSlots,
            bookedSlots,
            blockedSlots,
            wholeDayBlocked,
          )
          return (
            <option key={opt.value} value={opt.value} disabled={!available}>
              {opt.label}
              {suffix}
            </option>
          )
        })}
      </FormSelectField>
      {loading ? (
        <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">Loading availability…</p>
      ) : wholeDayBlocked ? (
        <p className="mt-1.5 text-xs text-amber-600 dark:text-amber-400">
          This day is fully unavailable — please choose another date.
        </p>
      ) : noOpenSlots ? (
        <p className="mt-1.5 text-xs text-amber-600 dark:text-amber-400">
          No open slots on this date — try another day.
        </p>
      ) : (
        <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          Booked and blocked slots are shown as unavailable.
        </p>
      )}
    </div>
  )
}
