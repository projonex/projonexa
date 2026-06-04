import projonexaPreset from './src/theme/tailwind.preset.js'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [projonexaPreset],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx}',
  ],
}
