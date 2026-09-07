'use client'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center"><h1 className="text-2xl font-bold">Something went wrong</h1><p className="mt-2 text-zinc-500">The page encountered an unexpected error. You can try again without losing the rest of the site.</p><button type="button" onClick={() => reset()} className="mt-6 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white dark:bg-white dark:text-zinc-950">Try again</button></div>
}
