import type { Metadata } from 'next'
import Link from 'next/link'
import { calculatorPages } from '@/lib/site'

export const metadata: Metadata = { title: 'Online Calculators', description: 'Browse free online calculators for scientific math, fractions, percentages, trigonometry, logarithms, exponents, roots, factorials, and statistics.', alternates: { canonical: '/calculators' } }

export default function Page(){return <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14"><p className="text-sm text-zinc-500"><Link href="/">Home</Link> / Calculators</p><h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Online Calculators</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">Choose a calculator for the kind of mathematics you need. Each tool is designed around a specific problem instead of forcing every calculation into one interface.</p><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{calculatorPages.map(page=><Link key={page.href} href={page.href} className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900"><h2 className="font-semibold">{page.name}</h2><p className="mt-2 text-sm leading-6 text-zinc-500">{page.description}</p></Link>)}</div></div>}
