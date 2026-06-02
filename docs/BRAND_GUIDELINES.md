# Projonexa Brand Guidelines

## Brand Identity

**Name:** Projonexa  
**Tagline:** Where Innovation Meets Execution.

Projonexa positions itself as a premium technology startup — not a generic academic service. Visual and verbal identity should feel comparable to Stripe, Vercel, Linear, and Apple: clean, confident, minimal, and futuristic.

## Color Palette

| Role       | Hex       | Usage                                      |
|------------|-----------|--------------------------------------------|
| Primary    | `#00C8FF` | CTAs, links, accents, highlights             |
| Secondary  | `#6C63FF` | Gradients, secondary accents               |
| Dark       | `#0A0F1C` | Dark mode background                       |
| Light      | `#FFFFFF` | Light mode background                      |
| Accent     | `#67E8F9` | Hover states, subtle highlights            |
| Mid Blue   | `#3D8BFF` | Gradient midpoint                          |

### Official Gradient

```css
linear-gradient(135deg, #00C8FF 0%, #3D8BFF 50%, #6C63FF 100%);
```

## Typography

- **Primary font:** Inter (400, 500, 600, 700, 800)
- **Headlines:** Bold, tight tracking (`tracking-tight`)
- **Body:** Regular/Medium, relaxed line height for readability
- **Eyebrows:** Uppercase, wide letter-spacing (`tracking-widest`), brand primary color

## Logo

### Assets (repository)

| Asset | Path | Use |
|-------|------|-----|
| Primary mark | `public/logo.png` | Navbar, footer, OG image, structured data |
| Favicon | `public/favicon-32.png` | Browser tab |
| Apple touch icon | `public/apple-touch-icon.png` | iOS home screen |
| PWA icon | `public/icon-512.png` | `site.webmanifest` |
| Social preview | `public/og-image.svg` | Open Graph / Twitter cards |

### Wordmark (UI)

- Display: **Projone** + gradient **x** + **a** (capital **P** → “Projonexa”)
- Font: Nunito (800), inline next to the logo mark in header/footer
- Gradient on **x:** `#00C8FF` → `#3D8BFF` → `#6C63FF`
- Implementation: `BrandNameWordmark` component

### Logo mark (UI)

- Frosted dark-glass container in light mode; translucent panel in dark mode
- Image uses `mix-blend-mode: screen` so the PNG black plate blends on the tile
- Do not place the raw PNG on white without the mark container

### Clear space

- Minimum padding: equal to the height of the logo mark on all sides
- Do not crowd the wordmark with nav items or badges

### Horizontal variation (planned)

- Wide lockup: mark + wordmark on one line for print, email headers, and banners  
- Track under **Milestone 1** in [GITHUB_MILESTONES.md](./GITHUB_MILESTONES.md)

## Voice & Tone

- **Professional** — credible to investors and institutions
- **Empowering** — speaks to student ambition without condescension
- **Clear** — no jargon without purpose
- **Confident** — outcomes-focused, not salesy

## UI Patterns

- **Glassmorphism:** `border-white/10`, `bg-white/5`, `backdrop-blur-xl`
- **Cards:** Rounded `2xl`, subtle border, hover glow on primary actions
- **Buttons:** Pill-shaped (`rounded-full`), gradient primary, outline secondary
- **Motion:** Framer Motion — fade-up on scroll, subtle scale on hover (max 1.02–1.05)
- **Dark/Light:** System preference default; user toggle persisted in `localStorage`

## Imagery

- Prefer abstract gradients, grid overlays, and soft blurs over stock photos
- Founder section uses initials avatar until professional headshot is available
- Technology section uses branded initial badges per stack (replace with SVG logos when assets are ready)

## Do / Don't

| Do | Don't |
|----|-------|
| Use brand gradient for primary CTAs | Use flat random colors |
| Keep sections spacious with clear hierarchy | Crowd pages with dense text blocks |
| Highlight metrics (100+, 150+) | Use vague “many clients” language |
| Link to real founder social profiles | Use placeholder lorem ipsum |

## Contact & Social

- **Email:** nisargalokhande@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/nslokhande/
- **GitHub:** https://github.com/nikobuddy/
- **Location:** Maharashtra, India
