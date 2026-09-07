'use client'

import { useState, type ReactNode } from 'react'

type ToolType = 'basic' | 'fraction' | 'percentage' | 'trigonometry' | 'logarithm' | 'exponent' | 'square-root' | 'factorial' | 'statistics'

function gcd(a: number, b: number) {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) [a, b] = [b, a % b]
  return a || 1
}

function formatFraction(n: number, d: number) {
  if (d === 0) throw new Error('Denominator cannot be zero.')
  if (!Number.isInteger(n) || !Number.isInteger(d)) return `${n}/${d}`
  if (d < 0) { n = -n; d = -d }
  const g = gcd(n, d)
  return `${n / g}/${d / g}`
}

export function SimpleTool({ type }: { type: ToolType }) {
  if (type === 'fraction') return <FractionTool />
  if (type === 'percentage') return <PercentageTool />
  if (type === 'trigonometry') return <TrigTool />
  if (type === 'logarithm') return <LogTool />
  if (type === 'exponent') return <ExponentTool />
  if (type === 'square-root') return <RootTool />
  if (type === 'factorial') return <FactorialTool />
  if (type === 'statistics') return <StatisticsTool />
  return <BasicTool />
}

function Panel({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">{children}</div>
}

function Result({ value, error }: { value: string; error?: string }) {
  return <div className={`mt-5 rounded-xl bg-zinc-50 p-4 text-right dark:bg-zinc-950 ${error ? 'text-red-500' : ''}`}><div className="text-xs uppercase tracking-wide text-zinc-400">Result</div><div className="mt-1 break-all text-2xl font-semibold">{error || value}</div></div>
}

function Field({ label, value, onChange, placeholder = '0', step = 'any' }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; step?: string }) {
  return <label className="grid gap-2 text-sm font-medium"><span>{label}</span><input inputMode="decimal" type="number" step={step} value={value} onChange={event => onChange(event.target.value)} placeholder={placeholder} className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950" /></label>
}

function BasicTool() {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [op, setOp] = useState('+')
  let value = 'Enter two numbers'
  let error = ''
  try {
    if (a && b) {
      const x = Number(a), y = Number(b)
      if (op === '+') value = String(x + y)
      else if (op === '−') value = String(x - y)
      else if (op === '×') value = String(x * y)
      else {
        if (y === 0) throw new Error('Cannot divide by zero.')
        value = String(x / y)
      }
    }
  } catch (e) { error = e instanceof Error ? e.message : 'Invalid input' }
  return <Panel><div className="grid gap-4 sm:grid-cols-3"><Field label="First number" value={a} onChange={setA} /><label className="grid gap-2 text-sm font-medium"><span>Operation</span><select value={op} onChange={event => setOp(event.target.value)} className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-950"><option>+</option><option>−</option><option>×</option><option>÷</option></select></label><Field label="Second number" value={b} onChange={setB} /></div><Result value={value} error={error} /></Panel>
}

function FractionTool() {
  const [an, setAn] = useState(''), [ad, setAd] = useState(''), [bn, setBn] = useState(''), [bd, setBd] = useState(''), [op, setOp] = useState('+')
  let value = 'Enter four integers', error = ''
  try {
    if (an && ad && bn && bd) {
      const a = Number(an), d = Number(ad), b = Number(bn), e = Number(bd)
      if (![a, d, b, e].every(Number.isInteger)) throw new Error('Use whole numbers for numerator and denominator.')
      if (d === 0 || e === 0) throw new Error('Denominator cannot be zero.')
      let n = 0, den = 1
      if (op === '+') { n = a * e + b * d; den = d * e }
      else if (op === '−') { n = a * e - b * d; den = d * e }
      else if (op === '×') { n = a * b; den = d * e }
      else { if (b === 0) throw new Error('The second numerator cannot be zero when dividing.'); n = a * e; den = d * b }
      value = `${formatFraction(n, den)}  =  ${n / den}`
    }
  } catch (e) { error = e instanceof Error ? e.message : 'Invalid fraction' }
  return <Panel><div className="grid gap-4 sm:grid-cols-2"><div className="grid grid-cols-2 gap-3"><Field label="Numerator A" value={an} onChange={setAn} step="1" /><Field label="Denominator A" value={ad} onChange={setAd} step="1" /></div><div className="grid grid-cols-2 gap-3"><Field label="Numerator B" value={bn} onChange={setBn} step="1" /><Field label="Denominator B" value={bd} onChange={setBd} step="1" /></div></div><div className="mt-4"><select value={op} onChange={event => setOp(event.target.value)} className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-950"><option>+</option><option>−</option><option>×</option><option>÷</option></select></div><Result value={value} error={error} /></Panel>
}

function PercentageTool() {
  const [a, setA] = useState(''), [b, setB] = useState(''), [c, setC] = useState(''), [d, setD] = useState(''), [mode, setMode] = useState('of')
  let value = 'Enter values', error = ''
  try {
    if (mode === 'of' && a && b) value = (Number(a) * Number(b) / 100).toLocaleString()
    else if (mode === 'what' && a && b) {
      if (Number(b) === 0) throw new Error('The reference value cannot be zero.')
      value = `${(Number(a) / Number(b) * 100).toFixed(8).replace(/0+$/, '').replace(/\.$/, '')}%`
    } else if (mode === 'change' && c && d) {
      if (Number(c) === 0) throw new Error('The original value cannot be zero.')
      value = `${((Number(d) - Number(c)) / Number(c) * 100).toFixed(8).replace(/0+$/, '').replace(/\.$/, '')}%`
    }
  } catch (e) { error = e instanceof Error ? e.message : 'Invalid input' }
  return <Panel><label className="grid gap-2 text-sm font-medium"><span>Calculation</span><select value={mode} onChange={event => setMode(event.target.value)} className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-950"><option value="of">What is X% of Y?</option><option value="what">X is what percentage of Y?</option><option value="change">Percentage change from X to Y</option></select></label><div className="mt-4 grid gap-4 sm:grid-cols-2">{mode !== 'change' ? <><Field label={mode === 'of' ? 'Percentage X' : 'Value X'} value={a} onChange={setA} /><Field label={mode === 'of' ? 'Number Y' : 'Reference Y'} value={b} onChange={setB} /></> : <><Field label="Original value X" value={c} onChange={setC} /><Field label="New value Y" value={d} onChange={setD} /></>}</div><Result value={value} error={error} /></Panel>
}

function TrigTool() {
  const [value, setValue] = useState(''), [fn, setFn] = useState('sin'), [mode, setMode] = useState('DEG')
  let result = 'Enter an angle', error = ''
  try {
    if (value) {
      const x = Number(value)
      const rad = mode === 'DEG' ? x * Math.PI / 180 : mode === 'GRAD' ? x * Math.PI / 200 : x
      const inverse = ['asin', 'acos', 'atan'].includes(fn)
      const input = inverse ? x : rad
      let r = fn === 'sin' ? Math.sin(input) : fn === 'cos' ? Math.cos(input) : fn === 'tan' ? Math.tan(input) : fn === 'asin' ? Math.asin(input) : fn === 'acos' ? Math.acos(input) : Math.atan(input)
      if (!Number.isFinite(r)) throw new Error('Result is not finite for this angle.')
      if (inverse) r = mode === 'DEG' ? r * 180 / Math.PI : mode === 'GRAD' ? r * 200 / Math.PI : r
      result = String(Number(r.toPrecision(14)))
    }
  } catch (e) { error = e instanceof Error ? e.message : 'Invalid angle' }
  return <Panel><div className="grid gap-4 sm:grid-cols-3"><Field label="Angle" value={value} onChange={setValue} /><label className="grid gap-2 text-sm font-medium"><span>Function</span><select value={fn} onChange={event => setFn(event.target.value)} className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-950"><option>sin</option><option>cos</option><option>tan</option><option>asin</option><option>acos</option><option>atan</option></select></label><label className="grid gap-2 text-sm font-medium"><span>Angle unit</span><select value={mode} onChange={event => setMode(event.target.value)} className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-950"><option>DEG</option><option>RAD</option><option>GRAD</option></select></label></div><Result value={result} error={error} /></Panel>
}

function LogTool() {
  const [value, setValue] = useState(''), [base, setBase] = useState('10')
  let result = 'Enter a positive value', error = ''
  try {
    if (value) { const x = Number(value), b = Number(base); if (x <= 0 || b <= 0 || b === 1) throw new Error('Value and base must be positive; base cannot be 1.'); result = String(Number((Math.log(x) / Math.log(b)).toPrecision(14))) }
  } catch (e) { error = e instanceof Error ? e.message : 'Invalid logarithm' }
  return <Panel><div className="grid gap-4 sm:grid-cols-2"><Field label="Value" value={value} onChange={setValue} /><Field label="Base" value={base} onChange={setBase} /></div><Result value={result} error={error} /></Panel>
}

function ExponentTool() {
  const [a, setA] = useState(''), [b, setB] = useState('')
  let result = 'Enter base and exponent', error = ''
  try { if (a && b) { const r = Math.pow(Number(a), Number(b)); if (!Number.isFinite(r)) throw new Error('Result is outside the supported numeric range.'); result = String(Number(r.toPrecision(14))) } }
  catch (e) { error = e instanceof Error ? e.message : 'Invalid power' }
  return <Panel><div className="grid gap-4 sm:grid-cols-2"><Field label="Base" value={a} onChange={setA} /><Field label="Exponent" value={b} onChange={setB} /></div><Result value={result} error={error} /></Panel>
}

function RootTool() {
  const [a, setA] = useState('')
  let result = 'Enter a non-negative number', error = ''
  try { if (a) { const x = Number(a); if (x < 0) throw new Error('Real square roots require a non-negative number.'); result = String(Number(Math.sqrt(x).toPrecision(14))) } }
  catch (e) { error = e instanceof Error ? e.message : 'Invalid value' }
  return <Panel><Field label="Number" value={a} onChange={setA} /><Result value={result} error={error} /></Panel>
}

function FactorialTool() {
  const [a, setA] = useState('')
  let result = 'Enter a non-negative integer', error = ''
  try { if (a) { const n = Number(a); if (!Number.isInteger(n) || n < 0) throw new Error('Factorial requires a non-negative integer.'); if (n > 170) throw new Error('170! is the largest factorial representable as a JavaScript number.'); let r = 1; for (let i = 2; i <= n; i++) r *= i; result = String(r) } }
  catch (e) { error = e instanceof Error ? e.message : 'Invalid factorial' }
  return <Panel><Field label="Non-negative integer" value={a} onChange={setA} step="1" /><Result value={result} error={error} /></Panel>
}

function StatisticsTool() {
  const [data, setData] = useState('')
  let value = 'Enter comma-separated numbers', error = ''
  try {
    if (data.trim()) { const xs = data.split(',').map(v => Number(v.trim())); if (xs.some(v => !Number.isFinite(v))) throw new Error('Every value must be a valid number.'); const sorted = [...xs].sort((a,b) => a-b); const mean = xs.reduce((sum,x) => sum+x,0)/xs.length; const median = sorted.length % 2 ? sorted[(sorted.length-1)/2] : (sorted[sorted.length/2-1]+sorted[sorted.length/2])/2; const variance = xs.reduce((sum,x) => sum+(x-mean)**2,0)/xs.length; value = `Mean ${mean} · Median ${median} · Min ${sorted[0]} · Max ${sorted[sorted.length-1]} · SD ${Math.sqrt(variance)}` }
  } catch (e) { error = e instanceof Error ? e.message : 'Invalid dataset' }
  return <Panel><label className="grid gap-2 text-sm font-medium"><span>Dataset</span><textarea value={data} onChange={event => setData(event.target.value)} placeholder="12, 15, 18, 21, 24" rows={4} className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 outline-none dark:border-zinc-800 dark:bg-zinc-950" /></label><Result value={value} error={error} /></Panel>
}
