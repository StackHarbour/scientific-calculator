import type { Metadata, Viewport } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { siteConfig } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: 'Scientific Calculator Online', template: '%s | Scientific Calculator' },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ['scientific calculator', 'online calculator', 'math calculator'],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: siteConfig.locale, siteName: siteConfig.name, title: 'Scientific Calculator Online', description: siteConfig.description, url: siteConfig.url },
  twitter: { card: 'summary_large_image', title: 'Scientific Calculator Online', description: siteConfig.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, colorScheme: 'light dark', themeColor: '#09090b' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className="bg-zinc-50 text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-50"><Header/><main>{children}</main><Footer/></body></html>
}
