#!/usr/bin/env node
/**
 * Generate favicon / PWA icons and nav-sized logo variants from public/logo.png.
 * Uses macOS `sips` when available; run after updating the primary logo asset.
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '../public')
const source = path.join(publicDir, 'logo.png')

const outputs = [
  { file: 'favicon-16.png', size: 16 },
  { file: 'favicon-32.png', size: 32 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
  { file: 'logo-128.png', size: 128 },
  { file: 'logo-256.png', size: 256 },
]

function hasSips() {
  try {
    execFileSync('which', ['sips'], { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

function resizeWithSips(size, outPath) {
  execFileSync('sips', ['-z', String(size), String(size), source, '--out', outPath], {
    stdio: 'inherit',
  })
}

if (!existsSync(source)) {
  console.error('Missing source logo:', source)
  process.exit(1)
}

if (!hasSips()) {
  console.error('`sips` is required to generate brand icons (macOS). Install logo.png variants manually.')
  process.exit(1)
}

console.log('Generating brand icons from public/logo.png …')
for (const { file, size } of outputs) {
  const outPath = path.join(publicDir, file)
  resizeWithSips(size, outPath)
  console.log(`  ✓ ${file} (${size}×${size})`)
}

console.log('Done.')
