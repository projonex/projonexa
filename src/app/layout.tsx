import type { Viewport } from 'next'
import { Inter, Nunito } from 'next/font/google'
import Script from 'next/script'
import { AppProviders } from '@/components/providers/AppProviders'
import { GEO } from '@/data/brand'
import { buildRootSiteMetadata } from '@/lib/seo/site-metadata'
import { THEME_INIT_SCRIPT } from '@/lib/theme-init'
import '@/theme/theme.css'
import '@/index.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata = buildRootSiteMetadata()

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0A0F1C',
  colorScheme: 'dark light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={GEO.language} className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${nunito.variable} font-sans antialiased`}>
        <Script
          id="projonexa-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
