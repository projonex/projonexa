import projonexaPreset from './src/theme/tailwind.preset.js'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [projonexaPreset],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
}
