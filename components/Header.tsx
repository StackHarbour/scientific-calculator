import Link from 'next/link'
import { Calculator, Menu } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"><Calculator size={18} /></span>
          <span className="min-w-0">
            <span className="block truncate font-semibold tracking-tight">Scientific Calculator</span>
            <span className="block truncate text-xs text-zinc-500">Accurate everyday mathematics</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-zinc-600 md:flex dark:text-zinc-300" aria-label="Primary navigation">
          <Link href="/calculators" className="hover:text-zinc-950 dark:hover:text-white">Calculators</Link>
          <Link href="/guides" className="hover:text-zinc-950 dark:hover:text-white">Guides</Link>
          <Link href="/about" className="hover:text-zinc-950 dark:hover:text-white">About</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <details className="relative md:hidden">
            <summary className="flex size-9 cursor-pointer list-none items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 dark:border-zinc-800 dark:text-zinc-300"><Menu size={17} /></summary>
            <div className="absolute right-0 top-11 w-52 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <Link href="/scientific-calculator" className="block rounded-lg px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Calculators</Link>
              <Link href="/guides/scientific-notation" className="block rounded-lg px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Guides</Link>
              <Link href="/about" className="block rounded-lg px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">About</Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
