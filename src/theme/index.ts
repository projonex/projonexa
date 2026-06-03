import tokens from './colors.json' with { type: 'json' }

/** Projonexa theme tokens — source: src/theme/colors.json */
export const theme = tokens

export const brand = tokens.brand
export const surface = tokens.surface
export const text = tokens.text
export const border = tokens.border
export const effects = tokens.effects
export const gradient = tokens.gradient
export const shadow = tokens.shadow
export const font = tokens.font

export type BrandColor = keyof typeof brand
export type SurfaceColor = keyof typeof surface
