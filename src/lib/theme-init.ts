export const THEME_STORAGE_KEY = 'projonexa-theme'

export type Theme = 'light' | 'dark'

/** Runs before React hydrates — keeps `html` class aligned with stored / system preference. */
export const THEME_INIT_SCRIPT = `(function(){try{var k='${THEME_STORAGE_KEY}',s=localStorage.getItem(k),t=s==='light'||s==='dark'?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);}catch(e){document.documentElement.classList.add('dark');}})();`

export function readThemeFromDocument(): Theme {
  if (typeof document === 'undefined') return 'dark'
  if (document.documentElement.classList.contains('light')) return 'light'
  if (document.documentElement.classList.contains('dark')) return 'dark'
  return 'dark'
}

export function applyThemeToDocument(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
}
