'use client'

import { useEffect, useMemo, useState } from 'react'
import { Calculator, Clock3, Copy, Delete, History, Keyboard, Settings2, Trash2 } from 'lucide-react'
import { evaluateExpression, type AngleMode } from '@/lib/calculator'

type HistoryItem = { id: number; expression: string; result: string }
const keyRows = [['2nd','(',')','%','÷'],['sin','cos','tan','√','×'],['log','ln','x²','xʸ','−'],['7','8','9','⌫','+'],['4','5','6','AC','='],['1','2','3','±',''],['0','.','π','e','']]
const primaryFunctions = ['sin','cos','tan','log','ln']
const secondary = ['asin','acos','atan','sinh','cosh','tanh','abs','floor','ceil','!','1/x','10ˣ']

export function ScientificCalculator() {
  const [expression,setExpression] = useState('')
  const [result,setResult] = useState('0')
  const [mode,setMode] = useState<AngleMode>('DEG')
  const [memory,setMemory] = useState(0)
  const [history,setHistory] = useState<HistoryItem[]>([])
  const [showAdvanced,setShowAdvanced] = useState(false)
  const [secondFunction,setSecondFunction] = useState(false)
  const [error,setError] = useState('')


  const displayResult = useMemo(() => error || result, [error,result])
  const append = (value:string) => { setError(''); setExpression(v=>v+value) }
  const calculate = () => {
    if (!expression.trim()) return
    try {
      const value=evaluateExpression(expression,mode)
      setResult(value); setError(''); setHistory(h=>[{id:Date.now(),expression,result:value},...h].slice(0,50))
    } catch(e) { setError(e instanceof Error ? e.message : 'Invalid expression') }
  }
  const clear = () => { setExpression(''); setResult('0'); setError('') }
  const backspace = () => { setError(''); setExpression(v=>v.slice(0,-1)) }
  const memoryValue = () => { try { return Number(evaluateExpression(expression || result,mode)) || 0 } catch { return 0 } }
  const press = (key:string) => {
    if(key==='=') return calculate(); if(key==='AC') return clear(); if(key==='⌫') return backspace()
    if(key==='2nd') return setSecondFunction(v=>!v); if(key==='±') return setExpression(v=>v.startsWith('-')?v.slice(1):`-(${v})`)
    if(key==='√') return append('sqrt('); if(key==='x²') return append('^2'); if(key==='xʸ') return append('^')
    if(key==='÷') return append('/'); if(key==='×') return append('*'); if(key==='−') return append('-'); if(key==='π') return append('π'); if(key==='e') return append('e')
    if(key==='%') return append('%'); if(key==='!') return append('!'); if(key==='1/x') return setExpression(v=>`1/(${v || '0'})`); if(key==='10ˣ') return append('10^')
    if(['sin','cos','tan','log','ln','asin','acos','atan','sinh','cosh','tanh','abs','floor','ceil'].includes(key)) return append(`${key}(`)
    append(key)
  }
  useEffect(() => {
    const listener=(e:KeyboardEvent)=>{
      const target=e.target as HTMLElement|null
      if(target?.tagName==='INPUT'||target?.tagName==='TEXTAREA'||target?.isContentEditable) return
      if(e.ctrlKey||e.metaKey||e.altKey) return
      if(e.key==='Enter'){e.preventDefault();calculate();return}
      if(/^[0-9.]$/.test(e.key)) append(e.key)
      else if(['+','-','*','/','(',')','^'].includes(e.key)) append(e.key)
      else if(e.key==='Backspace') backspace()
      else if(e.key==='=') calculate()
      else if(e.key==='Escape') clear()
    }
    window.addEventListener('keydown',listener); return ()=>window.removeEventListener('keydown',listener)
  })
  const copy = async()=>{ await navigator.clipboard?.writeText(displayResult) }
  const visiblePrimary = secondFunction ? ['asin','acos','atan','sinh','cosh'] : primaryFunctions

  return <div className="mx-auto max-w-6xl">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
        {(['DEG','RAD','GRAD'] as AngleMode[]).map(m=><button key={m} type="button" onClick={()=>setMode(m)} className={`rounded-md px-3 py-1.5 text-xs font-medium ${mode===m?'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950':'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>{m}</button>)}
      </div>
      <div className="flex items-center gap-2 text-xs text-zinc-500"><span className={`size-2 rounded-full ${memory!==0?'bg-emerald-500':'bg-zinc-300 dark:bg-zinc-700'}`}/>M {memory}</div>
    </div>
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <section className="min-w-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 p-5 dark:border-zinc-800 sm:p-7">
          <label htmlFor="expression" className="sr-only">Mathematical expression</label>
          <input id="expression" value={expression} onChange={e=>{setExpression(e.target.value);setError('')}} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();calculate()}}} placeholder="Type or paste an expression, e.g. (1/2) + 3/4" spellCheck={false} autoComplete="off" className="block w-full min-h-8 bg-transparent text-right text-sm text-zinc-500 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
          <div className={`mt-2 min-h-14 overflow-x-auto whitespace-nowrap text-right text-4xl font-semibold tracking-tight sm:text-5xl ${error?'text-xl text-red-500':''}`}>{displayResult}</div>
          <div className="mt-3 flex justify-between gap-2"><span className="self-center text-xs text-zinc-400">Paste with Ctrl+V · Fractions/division: x/y</span><div className="flex gap-1"><button type="button" aria-label="Copy result" onClick={copy} className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"><Copy size={15}/></button><button type="button" aria-label="Backspace" onClick={backspace} className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"><Delete size={15}/></button></div></div>
        </div>
        <div className="p-3 sm:p-4">
          <div className="mb-3 grid grid-cols-4 gap-2">{['MC','MR','M+','M−'].map(k=><button type="button" key={k} onClick={()=>{const v=memoryValue(); if(k==='MC')setMemory(0); if(k==='MR')append(String(memory)); if(k==='M+')setMemory(m=>m+v); if(k==='M−')setMemory(m=>m-v)}} className="rounded-xl border border-zinc-200 bg-zinc-50 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">{k}</button>)}</div>
          <button type="button" onClick={()=>setShowAdvanced(v=>!v)} className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 py-2 text-xs font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"><Settings2 size={14}/> {showAdvanced?'Hide functions':'More functions'}</button>
          {showAdvanced&&<div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-6">{secondary.map(k=><button type="button" key={k} onClick={()=>press(k)} className="rounded-xl border border-zinc-200 bg-white py-3 text-xs font-medium hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950">{k}</button>)}</div>}
          <div className="mb-2 grid grid-cols-5 gap-2">{visiblePrimary.map(k=><button type="button" key={k} onClick={()=>press(k)} className="rounded-xl border border-zinc-200 bg-white py-3 text-xs font-medium hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950">{k}</button>)}</div>
          <div className="grid grid-cols-5 gap-2">{keyRows.flat().map((key,i)=>key===''?<div key={i}/>:<button type="button" key={`${key}-${i}`} onClick={()=>press(key)} className={`rounded-xl border text-sm font-medium transition active:scale-[.98] ${key==='='?'min-h-16 text-lg border-zinc-950 bg-zinc-950 text-white hover:bg-zinc-800 dark:border-white dark:bg-white dark:text-zinc-950':'min-h-12'} ${['÷','×','−','+'].includes(key)?'border-zinc-200 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white':['AC','⌫'].includes(key)?'border-zinc-200 bg-white text-red-500 hover:bg-red-50 dark:border-zinc-800 dark:bg-zinc-950':key!=='='?'border-zinc-200 bg-white hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950':''}`}>{key}</button>)}</div>
        </div>
      </section>
      <aside className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800"><div className="flex items-center gap-2 text-sm font-semibold"><History size={16}/>History</div><button type="button" onClick={()=>setHistory([])} aria-label="Clear history" className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"><Trash2 size={15}/></button></div>
        <div className="max-h-[620px] overflow-y-auto p-2">{history.length===0?<div className="px-4 py-14 text-center text-sm text-zinc-400"><Clock3 className="mx-auto mb-3 opacity-50" size={22}/>Your calculations will appear here.</div>:history.map(item=><button type="button" key={item.id} onClick={()=>{setExpression(item.expression);setResult(item.result);setError('')}} className="w-full rounded-xl p-3 text-right hover:bg-zinc-50 dark:hover:bg-zinc-800"><div className="truncate text-xs text-zinc-500">{item.expression}</div><div className="mt-1 font-medium">{item.result}</div></button>)}</div>
      </aside>
    </div>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500"><span className="flex items-center gap-1.5"><Keyboard size={14}/>Keyboard supported</span><span className="flex items-center gap-1.5"><Calculator size={14}/>Math engine: math.js</span></div>
  </div>
}
