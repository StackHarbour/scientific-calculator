import type { ReactNode } from 'react'
import { siteConfig } from './site'

export function jsonLd(data: Record<string, unknown>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

export function websiteJsonLd() {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  })
}

export function softwareJsonLd(name: string, description: string, url: string) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'EducationalApplication',
    applicationSubCategory: 'Calculator',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  })
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  })
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  })
}

export function StructuredData({ children }: { children: ReactNode }) {
  return <>{children}</>
}
