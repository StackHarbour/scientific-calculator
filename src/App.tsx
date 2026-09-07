import { useEffect, useMemo, useState } from 'react'
import {
  Backspace, Calculator, Check, Clock3, Copy, Delete, Eraser, History,
  Keyboard, Moon, RotateCcw, Settings2, Sun, Trash2
} from 'lucide-react'
import { evaluateExpression, factorial, type AngleMode } from './lib/calculator'

type HistoryItem = { id: number; expression: string; result: string }

const keyRows = [
  ['2nd', '(', ')', '%', '÷'],
  ['sin', 'cos', 'tan', '√', '×'],
  ['log', 'ln', 'x²', 'xʸ', '−'],
  ['7', '8', '9', '⌫', '+'],
  ['4', '5', '6', 'AC', '='],
  ['1', '2', '3', '±', ''],
  ['0', '.', 'π', 'e', ''],
]

const secondary = ['asin', 'acos', 'atan', 'sinh', 'cosh', 'tanh', 'abs', 'floor', 'ceil', '!', '1/x', '10ˣ']

function App() {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('0')
  const [mode, setMode] = useState<AngleMode>('DEG')
  const [memory, setMemory] = useState(0)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [showHistory, setShowHistory] = useState(true)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [dark, setDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false)
  const [error, setError] = useState('')

  const displayResult = useMemo(() => error || result, [error, result])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const append = (value: string) => {
    setError('')
    setExpression(v => v + value)
  }

  const calculate = () => {
    if (!expression.trim()) return
    try {
      const value = evaluateExpression(expression, mode)
      setResult(value)
      setError('')
      setHistory(h => [{ id: Date.now(), expression, result: value }, ...h].slice(0, 30))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid expression')
    }
  }

  const clear = () => {
    setExpression('')
    setResult('0')
    setError('')
  }

  const backspace = () => {
    setError('')
    setExpression(v => v.slice(0, -1))
  }

  const handleKey = (key: string) => {
    if (/^[0-9.]$/.test(key)) append(key)
    else if (['+', '-', '*', '/', '(', ')', '^'].includes(key)) append(key)
    else if (key === 'Enter' || key === '=') calculate()
    else if (key === 'Backspace') backspace()
    else if (key === 'Escape') clear()
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === 'Enter') { e.preventDefault(); calculate(); return }
      handleKey(e.key)
    }
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  })

  const press = (key: string) => {
    if (key === '=') return calculate()
    if (key === 'AC') return clear()
    if (key === '⌫') return backspace()
    if (key === '±') return setExpression(v => v.startsWith('-') ? v.slice(1) : `-(${v})`)
    if (key === 'π') return append('π')
    if (key === 'e') return append('e')
    if (key === '√') return append('sqrt(')
    if (key === 'x²') return append('^2')
    if (key === 'xʸ') return append('^')
    if (key === '÷') return append('÷')
    if (key === '×') return append('×')
    if (key === '−') return append('−')
    if (key === '%') return append('%')
    if (key === '!') return append('!')
    if (key === '1/x') return setExpression(v => `1/(${v})`)
    if (key === '10ˣ') return append('10^')
    if (['sin', 'cos', 'tan', 'log', 'ln', 'asin', 'acos', 'atan', 'sinh', 'cosh', 'tanh', 'abs', 'floor', 'ceil'].includes(key)) return append(`${key}(`)
    append(key)
  }

  const copyResult = async () => { await navigator.clipboard?.writeText(displayResult) }

  const memoryValue = () => {
    try { return Number(evaluateExpression(expression || result, mode)) || 0 } catch { return 0 }
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
              <Calculator size={18} />
            </div>
            <div>
              <div className="font-semibold tracking-tight">Scientific Calculator</div>
              <div className="text-xs text-zinc-500">Accurate everyday mathematics</div>
            </div>
          </div>
          <button aria-label="Toggle theme" onClick={() => setDark(v => !v)} className="rounded-lg border border-zinc-200 p-2 text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900">
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
              {(['DEG', 'RAD', 'GRAD'] as AngleMode[]).map(m => (
                <button key={m} onClick={() => setMode(m)} className={`rounded-md px-3 py-1.5 text-xs font-medium ${mode === m ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>{m}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className={`size-2 rounded-full ${memory !== 0 ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
              M {memory}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="border-b border-zinc-200 p-5 dark:border-zinc-800 sm:p-7">
              <div className="display-scroll min-h-7 overflow-x-auto whitespace-nowrap text-right text-sm text-zinc-500">{expression || 'Ready'}</div>
              <div className={`display-scroll mt-2 min-h-14 overflow-x-auto whitespace-nowrap text-right text-4xl font-semibold tracking-tight sm:text-5xl ${error ? 'text-red-500 text-xl' : ''}`}>
                {displayResult}
              </div>
              <div className="mt-3 flex justify-end gap-1">
                <button onClick={copyResult} className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"><Copy size={15} /></button>
                <button onClick={backspace} className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"><Backspace size={15} /></button>
              </div>
            </div>

            <div className="p-3 sm:p-4">
              <div className="mb-3 grid grid-cols-4 gap-2">
                {['MC', 'MR', 'M+', 'M−'].map(k => (
                  <button key={k} onClick={() => {
                    const v = memoryValue()
                    if (k === 'MC') setMemory(0)
                    if (k === 'MR') append(String(memory))
                    if (k === 'M+') setMemory(m => m + v)
                    if (k === 'M−') setMemory(m => m - v)
                  }} className="rounded-xl border border-zinc-200 bg-zinc-50 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900">{k}</button>
                ))}
              </div>

              <div className="mb-3 flex gap-2">
                <button onClick={() => setShowAdvanced(v => !v)} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 py-2 text-xs font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"><Settings2 size={14} /> {showAdvanced ? 'Hide functions' : 'More functions'}</button>
              </div>

              {showAdvanced && <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {secondary.map(k => <button key={k} onClick={() => press(k)} className="rounded-xl border border-zinc-200 bg-white py-3 text-xs font-medium hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800">{k}</button>)}
              </div>}

              <div className="grid grid-cols-5 gap-2">
                {keyRows.flat().map((key, i) => key === '' ? <div key={i} /> : (
                  <button key={`${key}-${i}`} onClick={() => press(key)} className={`min-h-12 rounded-xl border text-sm font-medium transition active:scale-[.98] ${key === '=' ? 'border-zinc-950 bg-zinc-950 text-white hover:bg-zinc-800 dark:border-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200' :
                    ['÷', '×', '−', '+'].includes(key) ? 'border-zinc-200 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white' :
                      ['AC', '⌫'].includes(key) ? 'border-zinc-200 bg-white text-red-500 hover:bg-red-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-red-950/30' :
                        'border-zinc-200 bg-white hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800'
                    }`}>{key}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5"><Keyboard size={14} /> Keyboard supported</span>
            <span>Math engine: math.js</span>
          </div>
        </section>

        <aside className={`rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 ${showHistory ? '' : 'hidden lg:block'}`}>
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-sm font-semibold"><History size={16} /> History</div>
            <div className="flex gap-1">
              <button onClick={() => setHistory([])} aria-label="Clear history" className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"><Trash2 size={15} /></button>
              <button onClick={() => setShowHistory(false)} className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 lg:hidden"><Delete size={15} /></button>
            </div>
          </div>
          <div className="max-h-[620px] overflow-y-auto p-2">
            {history.length === 0 ? (
              <div className="px-4 py-14 text-center text-sm text-zinc-400">
                <Clock3 className="mx-auto mb-3 opacity-50" size={22} />
                Your calculations will appear here.
              </div>
            ) : history.map(item => (
              <button key={item.id} onClick={() => { setExpression(item.expression); setResult(item.result); setError('') }} className="w-full rounded-xl p-3 text-right hover:bg-zinc-50 dark:hover:bg-zinc-800">
                <div className="truncate text-xs text-zinc-500">{item.expression}</div>
                <div className="mt-1 font-medium">{item.result}</div>
              </button>
            ))}
          </div>
        </aside>

        {!showHistory && <button onClick={() => setShowHistory(true)} className="fixed bottom-5 right-5 rounded-full bg-zinc-950 p-3 text-white shadow-lg dark:bg-white dark:text-zinc-950 lg:hidden"><History size={19} /></button>}
      </main>

      <footer className="border-t border-zinc-200 py-6 dark:border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-xs text-zinc-500 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <span>Scientific Calculator</span>
          <span>Fast, private, and runs entirely in your browser.</span>
        </div>
      </footer>
    </div>
  )
}

export default App
