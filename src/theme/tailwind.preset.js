import tokens from './colors.json' with { type: 'json' }

/** Tailwind preset — source: src/theme/colors.json */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: tokens.brand,
        surface: {
          DEFAULT: tokens.surface.default,
          raised: tokens.surface.raised,
          elevated: tokens.surface.elevated,
          card: tokens.surface.card,
          hover: tokens.surface.hover,
          muted: tokens.surface.muted,
        },
      },
      fontFamily: {
        sans: tokens.font.sans,
      },
      boxShadow: {
        glow: tokens.shadow.glow,
        'glow-sm': tokens.shadow.glowSm,
        card: tokens.shadow.card,
        'card-dark': tokens.shadow.cardDark,
        'card-dark-lg': tokens.shadow.cardDarkLg,
      },
    },
  },
}
