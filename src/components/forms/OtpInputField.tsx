import { useCallback, useRef, type KeyboardEvent } from 'react'
import { inquiryInputClass } from '@/components/inquiry/inquiryFormShared'

const OTP_LENGTH = 6

interface OtpInputFieldProps {
  id?: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  autoFocus?: boolean
}

export function OtpInputField({
  id = 'otp-input',
  value,
  onChange,
  disabled = false,
  autoFocus = false,
}: OtpInputFieldProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const digits = value.padEnd(OTP_LENGTH, ' ').slice(0, OTP_LENGTH).split('')

  const updateDigit = useCallback(
    (index: number, digit: string) => {
      const clean = digit.replace(/\D/g, '').slice(-1)
      const next = digits.map((d, i) => (i === index ? clean : d.trim())).join('').slice(0, OTP_LENGTH)
      onChange(next)
      if (clean && index < OTP_LENGTH - 1) {
        inputsRef.current[index + 1]?.focus()
      }
    },
    [digits, onChange],
  )

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !digits[index]?.trim() && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (pasted) onChange(pasted)
  }

  return (
    <div className="flex justify-center gap-2 sm:gap-3" role="group" aria-label="Verification code">
      {Array.from({ length: OTP_LENGTH }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el
          }}
          id={index === 0 ? id : undefined}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          value={digits[index]?.trim() ?? ''}
          onChange={(e) => updateDigit(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={`${inquiryInputClass} h-12 w-10 text-center text-lg font-semibold tracking-widest sm:h-14 sm:w-12`}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  )
}

export const OTP_CODE_LENGTH = OTP_LENGTH
