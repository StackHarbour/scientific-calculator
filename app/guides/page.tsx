import type { Metadata } from 'next'
import Link from 'next/link'
import { guidePages } from '@/lib/site'

export const metadata: Metadata = { title: 'Math Guides', description: 'Practical guides to scientific notation, fractions, percentages, degrees, radians, and common calculator methods.', alternates: { canonical: '/guides' } }

export default function Page(){return <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14"><p className="text-sm text-zinc-500"><Link href="/">Home</Link> / Guides</p><h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Math Guides</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">Short, practical explanations for the notation and formulas used by the calculators on this site.</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{guidePages.map(page=><Link key={page.href} href={page.href} className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900"><h2 className="font-semibold">{page.name}</h2><p className="mt-2 text-sm leading-6 text-zinc-500">{page.description}</p></Link>)}</div></div>}
