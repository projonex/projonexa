import { BRAND, FOUNDER } from './brand'

export const PRIVACY_SECTIONS = [
  {
    title: 'Overview',
    paragraphs: [
      `${BRAND.name} ("we", "us") operates ${BRAND.url}. This Privacy Policy explains how we collect, use, and protect information when you use our website, contact forms, inquiry flows, and consultation booking.`,
    ],
  },
  {
    title: 'Information we collect',
    bullets: [
      'Contact and inquiry details you submit (name, email, phone, project scope, college or business information).',
      'Consultation scheduling preferences (date, time, meeting scope).',
      'Affiliate program application details when you apply to refer students.',
      'Career application details when you apply to join our network.',
      'Basic technical data such as browser type and pages visited when analytics is enabled (see Analytics below).',
    ],
  },
  {
    title: 'How we use your information',
    bullets: [
      'Respond to project inquiries, quotes, and support requests.',
      'Schedule and manage Google Meet consultations.',
      'Deliver student, client, and affiliate program services you request.',
      'Improve our website, SEO visibility, and user experience.',
      'Send transactional emails related to your submission (confirmations, consultation invites).',
    ],
  },
  {
    title: 'Analytics',
    paragraphs: [
      'We may use privacy-friendly analytics (such as Plausible) or Google Analytics 4 to understand traffic and improve the site. Analytics is only loaded when configured in production. You can use browser extensions or settings to limit tracking.',
    ],
  },
  {
    title: 'Data sharing',
    paragraphs: [
      'We do not sell your personal information. We share data only with service providers needed to operate the site (hosting, email delivery, form processing API) and when required by law.',
    ],
  },
  {
    title: 'Data retention',
    paragraphs: [
      'Inquiry and form submissions are retained as long as needed to deliver services, handle follow-ups, and meet legal or business record requirements.',
    ],
  },
  {
    title: 'Your rights',
    paragraphs: [
      `You may request access, correction, or deletion of your personal data by emailing ${FOUNDER.email}. We will respond within a reasonable time on business days.`,
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      `Questions about this policy: ${FOUNDER.email} or ${BRAND.url}/contact.`,
      `Last updated: June 2026.`,
    ],
  },
] as const
