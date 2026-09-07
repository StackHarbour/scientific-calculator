import Link from 'next/link'
import { calculatorPages } from '@/lib/site'

export function RelatedCalculators({ exclude = '' }: { exclude?: string }) {
  const pages = calculatorPages.filter(page => page.href !== exclude).slice(0, 6)
  return (
    <section className="mt-14">
      <h2 className="text-xl font-semibold tracking-tight">Related calculators</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map(page => (
          <Link key={page.href} href={page.href} className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
            <div className="font-medium">{page.name}</div>
            <p className="mt-1 text-sm leading-5 text-zinc-500">{page.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
