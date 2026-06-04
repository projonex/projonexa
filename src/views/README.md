# Views

Page-level UI components. Each file maps to a route via `src/app/**/page.tsx`.

- **Do not** add routing here — use the App Router under `src/app/`.
- **Do** keep sections and data imports here; route files only wire metadata + `PageSeo` + the view.

Example: `src/app/(site)/about/page.tsx` renders `<AboutPage />` from `AboutPage.tsx`.
