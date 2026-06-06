export function formatContactSuccessMessage(
  message: string,
  notifications?: { userEmail?: boolean },
): string {
  if (message.trim()) {
    return message
  }

  const parts = [
    'Thank you for contacting us. We have received your message and will respond as soon as possible.',
  ]

  if (notifications?.userEmail) {
    parts.push('A confirmation email has been sent to your inbox.')
  }

  return parts.join(' ')
}

export function formatCareerSuccessMessage(
  message: string,
  notifications?: { userEmail?: boolean },
): string {
  if (message.trim()) {
    return message
  }

  const parts = [
    'Thank you for applying. We have received your application and will review it soon.',
  ]

  if (notifications?.userEmail) {
    parts.push('A confirmation email has been sent to your inbox.')
  }

  return parts.join(' ')
}

export function formatCorporateSuccessMessage(
  message: string,
  notifications?: { userEmail?: boolean; whatsapp?: boolean; whatsappConfigured?: boolean },
): string {
  if (message.trim()) {
    return message
  }

  const parts = ['Your consultation is confirmed.']

  if (notifications?.userEmail && notifications?.whatsapp) {
    parts.push('Meeting details have been sent to your email and WhatsApp.')
  } else if (notifications?.userEmail) {
    parts.push('A confirmation email with your Google Meet link has been sent.')
  } else if (notifications?.whatsapp) {
    parts.push('Meeting details have been sent to your WhatsApp.')
  }

  return parts.join(' ')
}

export function formatStudentSuccessMessage(
  message: string,
  notifications?: { userEmail?: boolean; whatsapp?: boolean },
): string {
  if (message.trim()) {
    return message
  }

  const parts = ['Your consultation is confirmed.']

  if (notifications?.userEmail && notifications?.whatsapp) {
    parts.push('Meeting details have been sent to your email and WhatsApp.')
  } else if (notifications?.userEmail) {
    parts.push('A confirmation email with your Google Meet link has been sent.')
  } else if (notifications?.whatsapp) {
    parts.push('Meeting details have been sent to your WhatsApp.')
  }

  return parts.join(' ')
}
