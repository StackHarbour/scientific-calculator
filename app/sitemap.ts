import type { MetadataRoute } from 'next'
import { siteConfig, allIndexablePages } from '@/lib/site'
export default function sitemap(): MetadataRoute.Sitemap { return allIndexablePages.map(page => ({ url: `${siteConfig.url}${page.href}`, changeFrequency: page.href.startsWith('/guides/') ? 'monthly' : 'weekly', priority: page.href === '/' ? 1 : page.href.startsWith('/guides/') ? 0.7 : 0.85 })) }
