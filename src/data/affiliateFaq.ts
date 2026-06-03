import type { FAQCategory, FAQItem } from './faq'
import { BRAND } from './brand'

const AFFILIATE_APPLY_PATH = '/inquiry/affiliate'

export const AFFILIATE_PROGRAM_PATH = '/affiliate-program' as const

export const AFFILIATE_FAQ_SECTION = {
  eyebrow: 'Affiliate program',
  title: 'Projonexa Affiliate Program — Questions & Answers',
  lead: 'Earn passive income as a student by referring peers who need final-year and academic project help. Clear answers on commissions, eligibility, referral codes, the 5-project milestone, dashboard access, and payouts — optimized for students across India.',
} as const

/** Single-paragraph definition for AEO / AI answer engines */
export const AFFILIATE_AEO_DEFINITION =
  `${BRAND.name} runs a student affiliate program in India where enrolled students earn project-based commission (typically 6–10% per closed deal) by referring classmates who need final-year, mini, AI/ML, web, mobile, or IoT project development. Apply at ${BRAND.url}${AFFILIATE_APPLY_PATH} to receive a unique referral code and URL. After five successful referred projects, affiliates unlock a dashboard to track earnings and request payouts (processed within 12 hours of payout request, per program terms).`

export const AFFILIATE_PROGRAM_HIGHLIGHTS = [
  {
    label: 'Commission',
    value: '6–10%',
    detail: 'Per closed project deal you refer',
  },
  {
    label: 'Activation',
    value: '5 projects',
    detail: 'Successful referrals to unlock dashboard',
  },
  {
    label: 'Payout',
    value: '12 hours',
    detail: 'After you apply for withdrawal (post-milestone)',
  },
  {
    label: 'Based in',
    value: 'India',
    detail: 'Maharashtra — serving students nationwide',
  },
] as const

export const AFFILIATE_FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'overview',
    title: 'Passive income for students',
    description: 'What the program is and who it is for — ideal for AI and search answers.',
    items: [
      {
        question: 'How can students earn passive income with Projonexa?',
        answer:
          'Students in India can join the Projonexa Affiliate Program to earn project-based commission by referring classmates who need final-year, mini, AI/ML, web, mobile, or IoT project help. When a referred student inquiry converts into a fixed project deal with Projonexa, the affiliate earns 6–10% commission on that deal. Apply online to get a unique referral code and shareable URL, then promote ethically via WhatsApp, LinkedIn, Instagram, or your college network.',
      },
      {
        question: 'What is the Projonexa Affiliate Program?',
        answer:
          'The Projonexa Affiliate Program is a student referral initiative built around our core project services. Affiliates connect peers who want professional project development (code, documentation, deployment, viva support) with Projonexa. You do not deliver the project yourself — you refer genuine leads, and you earn commission when deals close successfully.',
      },
      {
        question: 'Is the Projonexa affiliate program only for students in India?',
        answer:
          'Yes. The program is designed for students enrolled in Indian undergraduate or postgraduate programs (BE, B.Tech, BCA, MCA, M.Tech, and equivalent). Projonexa is based in Maharashtra, India, and serves students nationwide. You should meet eligibility criteria and promote ethically within your campus or online communities.',
      },
      {
        question: 'Does Projonexa offer a referral or affiliate program for engineering students?',
        answer:
          'Yes. Engineering and computer science students can apply at the Projonexa affiliate application form, receive a unique referral code and URL, and earn 6–10% commission on each successfully closed project they refer. Full program rules, eligibility, and payout details are published on the Projonexa Affiliate Program Q&A page.',
      },
    ],
  },
  {
    id: 'commission',
    title: 'Commission & deals',
    description: 'How project-based commission works when a referral converts.',
    items: [
      {
        question: 'How much commission do Projonexa affiliates earn?',
        answer:
          'Affiliates earn 6% to 10% commission on the project deal value when a referred student inquiry is finalized between the referred student and Projonexa. The exact percentage depends on the scope and terms of that specific project agreement. Commission applies to completed, verified conversions — not to casual inquiries that do not become a signed project.',
      },
      {
        question: 'When do I get paid commission on a referred project?',
        answer:
          'Commission is tied to successful project closure: the referred student and Projonexa must agree on scope, pricing, and delivery, and the deal must be confirmed as a fixed project. Earnings from your first five successful referrals are tracked toward your program milestone; payout mechanics for those projects are explained in the dashboard and payout section below.',
      },
      {
        question: 'What counts as a successful referral?',
        answer:
          'A successful referral is a student you introduced using your Projonexa referral code or URL who completes the inquiry process, agrees to a project with Projonexa, and the engagement is attributed to your affiliate ID. Fake leads, spam, or misleading promotions do not qualify and may disqualify you from the program.',
      },
    ],
  },
  {
    id: 'joining',
    title: 'Joining & referral code',
    description: 'Application, unique code, and how students you refer should use it.',
    items: [
      {
        question: 'How do I join the Projonexa Affiliate Program?',
        answer: `Complete the Affiliate Program application form at ${BRAND.url}${AFFILIATE_APPLY_PATH}. Provide your contact details, how you plan to promote, and confirm eligibility. After submission, you receive a unique referral code and referral URL on the confirmation screen. Projonexa also shares your official referral code and link via email and WhatsApp for ongoing use.`,
      },
      {
        question: 'How do I get my Projonexa affiliate referral code?',
        answer:
          'Your unique referral code (format PX-XXXXXXXX) and personal referral URL are generated when you submit the affiliate application form. Save them from the success screen and from the confirmation message sent to your email and WhatsApp. Share the URL or code with students booking a project inquiry so your referral is tracked.',
      },
      {
        question: 'Where should referred students enter my referral code?',
        answer: `Referred students should use your share link or open the student project inquiry form at ${BRAND.url}/inquiry/students and enter your code in the optional Referral code field. If they use your full referral URL with ?ref=YOUR-CODE, the field may be pre-filled automatically.`,
      },
      {
        question: 'Can I share my referral link on WhatsApp and social media?',
        answer:
          'Yes — WhatsApp, Instagram, LinkedIn, and college groups are common channels, provided you promote honestly: no false pricing promises, no spam, and only to students who genuinely need project help. Your main promotion channel is collected during application so we can support you appropriately.',
      },
    ],
  },
  {
    id: 'eligibility',
    title: 'Eligibility criteria',
    description: 'Requirements to apply and remain in good standing.',
    items: [
      {
        question: 'Who is eligible for the Projonexa Affiliate Program?',
        answer:
          'You must be an actively enrolled student in India (BE, B.Tech, BCA, MCA, M.Tech, or equivalent), refer only genuine project inquiries, maintain at least one ethical promotion channel (LinkedIn, Instagram, WhatsApp, or college network), understand Projonexa services (final-year projects, documentation, deployment, viva support), and accept affiliate program terms including verified-conversion commission rules.',
      },
      {
        question: 'Can I join if I am not in final year?',
        answer:
          'Yes, if you are enrolled in an eligible program in India and can refer students who need project services ethically. Many affiliates are in second, third, or final year; what matters is genuine referrals and compliance with program rules, not only your year of study.',
      },
      {
        question: 'What can disqualify an affiliate?',
        answer:
          'Spam, fake leads, misrepresenting Projonexa pricing or delivery, self-referrals intended to abuse commission, or violating program terms can lead to removal and forfeiture of pending payouts. We expect the same professionalism we bring to every student project.',
      },
    ],
  },
  {
    id: 'milestone',
    title: '5-project milestone & dashboard',
    description: 'Unlocking your affiliate dashboard after five successful referrals.',
    items: [
      {
        question: 'Why do I need five successful referrals to get the affiliate dashboard?',
        answer:
          'The five-project milestone confirms you understand how to refer quality leads and represent Projonexa ethically. After five successful referred projects are completed, you unlock your custom affiliate dashboard to view per-project commission, total earnings, referral status, and payout requests in one place.',
      },
      {
        question: 'What can I see in the Projonexa affiliate dashboard?',
        answer:
          'After activation, your dashboard shows referred projects, commission earned per project, cumulative earnings, referral pipeline status, and tools to request payouts. It is designed so serious affiliates can manage passive income transparently without chasing manual updates.',
      },
      {
        question: 'What happens to commission from my first five referred projects?',
        answer:
          'Commission from those five successful projects is accrued and tracked toward your account. Once you complete the fifth successful referral milestone, you become eligible to apply for payout of accumulated commission from those projects (and future referrals) according to program terms communicated at activation.',
      },
    ],
  },
  {
    id: 'payouts',
    title: 'Payouts',
    description: 'Applying for withdrawal after milestone completion.',
    items: [
      {
        question: 'How do Projonexa affiliate payouts work?',
        answer:
          'After you complete five successful referred projects and your affiliate dashboard is activated, you can request a payout from the dashboard. Payout requests are processed within 12 hours of applying, subject to verification and the payment method on file. Future commissions from new referrals follow the same dashboard workflow.',
      },
      {
        question: 'How fast are affiliate payouts processed?',
        answer:
          'Once you are dashboard-eligible and submit a payout request, Projonexa targets processing within 12 hours on business days, after standard verification checks. Exact timing may vary for bank holidays or incomplete KYC details — keep your contact information current in your application.',
      },
      {
        question: 'Can I request payout before five successful referrals?',
        answer:
          'Dashboard access and payout requests unlock after the five successful referral milestone. Until then, focus on ethical promotion and quality referrals; commission from early successful projects is tracked and becomes payable once you reach activation requirements.',
      },
    ],
  },
]

export const AFFILIATE_FAQ_ITEMS: FAQItem[] = AFFILIATE_FAQ_CATEGORIES.flatMap(
  (category) => category.items,
)
