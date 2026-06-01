const [major, minor] = process.versions.node.split('.').map(Number)
const ok = major > 20 || (major === 20 && minor >= 19) || major >= 22

if (!ok) {
  console.error(
    `\nProjonexa requires Node.js 20.19+ or 22.12+ (you have ${process.versions.node}).\n` +
      `Vite 8 uses Rolldown and will not run on older Node versions.\n\n` +
      `Fix options:\n` +
      `  1. Upgrade Node: https://nodejs.org/ (LTS 22 recommended)\n` +
      `  2. With nvm: nvm install 22 && nvm use 22\n` +
      `  3. For daily work on Vite 5: git checkout main && npm ci\n`,
  )
  process.exit(1)
}
