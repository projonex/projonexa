/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#00C8FF',
          secondary: '#6C63FF',
          dark: '#000000',
          light: '#FFFFFF',
          accent: '#67E8F9',
          mid: '#3D8BFF',
        },
        surface: {
          DEFAULT: '#000000',
          raised: '#050505',
          elevated: '#0A0A0A',
          card: '#111111',
          hover: '#1A1A1A',
          muted: '#141414',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(0, 200, 255, 0.35)',
        'glow-sm': '0 0 30px -8px rgba(0, 200, 255, 0.25)',
        card: '0 4px 24px -4px rgba(0, 0, 0, 0.12)',
        'card-dark': '0 4px 24px -4px rgba(0, 0, 0, 0.6)',
        'card-dark-lg': '0 8px 40px -8px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
}
