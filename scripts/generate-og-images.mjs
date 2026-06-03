#!/usr/bin/env node
/**
 * Generate 1200×630 PNG Open Graph thumbnails for social link previews.
 * Requires: sharp, public/logo.png
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '../public')
const ogDir = path.join(publicDir, 'og')
const logoPath = path.join(publicDir, 'logo.png')

const cards = [
  {
    file: 'og-default.png',
    headline: 'Projonexa',
    subline: 'Where Innovation Meets Execution',
    tag: 'Final Year · MVP · AI — Pan-India',
  },
  {
    file: 'og-home.png',
    headline: 'Projonexa',
    subline: 'Innovation Platform — India',
    tag: 'College Projects · MVP · AI/ML · IoT',
  },
  {
    file: 'og-college-projects.png',
    headline: 'College Projects',
    subline: 'Final Year & Mini Engineering',
    tag: 'Code · Report · PPT · Viva Prep',
  },
  {
    file: 'og-client-projects.png',
    headline: 'Client & MVP',
    subline: 'Production-Ready Software',
    tag: 'Startups · Web · Mobile · AI',
  },
  {
    file: 'og-affiliate-program.png',
    headline: 'Affiliate Program',
    subline: 'Student Referrals — India',
    tag: 'Earn 6–10% Commission',
  },
  {
    file: 'og-contact.png',
    headline: 'Contact Projonexa',
    subline: 'Start Your Project Today',
    tag: 'Reply within 24 hours',
  },
]

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('"', '&quot;')
}

function buildCardSvg({ headline, subline, tag }) {
  return Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A0F1C"/>
      <stop offset="55%" style="stop-color:#121a2e"/>
      <stop offset="100%" style="stop-color:#1a1040"/>
    </linearGradient>
    <radialGradient id="glow" cx="85%" cy="15%" r="55%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.4"/>
      <stop offset="100%" style="stop-color:#6366f1;stop-opacity:0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="600" y="330" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="58" font-weight="800" fill="#ffffff">${escapeXml(headline)}</text>
  <text x="600" y="400" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="34" font-weight="600" fill="#c7d2fe">${escapeXml(subline)}</text>
  <text x="600" y="458" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="24" font-weight="500" fill="#94a3b8">${escapeXml(tag)}</text>
  <text x="600" y="568" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="20" font-weight="600" fill="#64748b">projonexa.com</text>
</svg>`)
}

async function generateCard(card) {
  const svg = buildCardSvg(card)
  const logo = await sharp(logoPath)
    .resize(150, 150, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
  const base = await sharp(svg).png().toBuffer()
  const outPath = path.join(ogDir, card.file)
  await sharp(base)
    .composite([{ input: logo, top: 108, left: 525 }])
    .png({ quality: 92, compressionLevel: 9 })
    .toFile(outPath)
  console.log(`  ✓ og/${card.file}`)
}

await mkdir(ogDir, { recursive: true })
console.log('Generating Open Graph thumbnails (1200×630)…')
for (const card of cards) {
  await generateCard(card)
}
console.log('Done.')
