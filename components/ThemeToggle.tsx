'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'scientific-calculator-theme'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    const value = saved === 'dark' || (saved !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDark(value)
    document.documentElement.classList.toggle('dark', value)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
  }, [dark, ready])

  return (
    <button
      type="button"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setDark(value => !value)}
      className="rounded-lg border border-zinc-200 p-2 text-zinc-600 transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  )
}
