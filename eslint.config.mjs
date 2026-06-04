import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

/** @type {import('eslint').Linter.Config[]} */
const nextCoreWebVitals = require('eslint-config-next/core-web-vitals')

const eslintConfig = [
  {
    ignores: ['dist/**', '.next/**', 'node_modules/**', 'out/**'],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      // React 19 / Next 16 plugin flags common mount & URL-sync patterns used across this codebase.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
      '@next/next/no-img-element': 'warn',
      'import/no-anonymous-default-export': 'off',
    },
  },
]

export default eslintConfig
