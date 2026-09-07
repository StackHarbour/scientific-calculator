import Link from 'next/link'
import { calculatorPages, guidePages } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="font-semibold">Scientific Calculator</div>
          <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">Fast, private, browser-based calculators and practical mathematics guides.</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Calculators</h2>
          <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2 text-sm text-zinc-500">
            {calculatorPages.slice(0, 6).map(page => <Link key={page.href} href={page.href} className="hover:text-zinc-950 dark:hover:text-white">{page.name.replace(' Calculator', '')}</Link>)}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Resources</h2>
          <div className="mt-3 grid gap-2 text-sm text-zinc-500">
            {guidePages.map(page => <Link key={page.href} href={page.href} className="hover:text-zinc-950 dark:hover:text-white">{page.name}</Link>)}
            <Link href="/about" className="hover:text-zinc-950 dark:hover:text-white">About</Link>
            <Link href="/contact" className="hover:text-zinc-950 dark:hover:text-white">Contact</Link>
            <Link href="/privacy" className="hover:text-zinc-950 dark:hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-950 dark:hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-200 py-5 text-center text-xs text-zinc-500 dark:border-zinc-800">© {new Date().getFullYear()} Scientific Calculator. Calculations run in your browser.</div>
    </footer>
  )
}
