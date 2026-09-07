import type { Metadata } from 'next'
import { CalculatorPage } from '@/components/CalculatorPage'
import { SimpleTool } from '@/components/SimpleTool'

export const metadata: Metadata = { title: 'Basic Calculator', description: 'A fast online basic calculator for addition, subtraction, multiplication, and division.', alternates: { canonical: '/basic-calculator' } }

export default function Page() {
  return <CalculatorPage title='Basic Calculator' description='A fast online basic calculator for addition, subtraction, multiplication, and division.' path="/basic-calculator" intro='Use this calculator for everyday arithmetic when you do not need advanced scientific functions. It handles decimal values and common arithmetic operations directly in the browser.' tool={<SimpleTool type="basic" />} sections={[{title: 'How to use the basic calculator', content: <><p>Enter two numbers, choose an operation, and the result updates immediately. For longer expressions or scientific functions, use the full scientific calculator.</p></>},{title: 'Order of operations', content: <><p>When you need a longer expression such as <code>12 + 8 × 3</code>, use the scientific calculator. It follows standard mathematical precedence.</p></>}]} exclude="/basic-calculator" />
}
