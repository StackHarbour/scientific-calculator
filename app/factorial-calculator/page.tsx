import type { Metadata } from 'next'
import { CalculatorPage } from '@/components/CalculatorPage'
import { SimpleTool } from '@/components/SimpleTool'

export const metadata: Metadata = { title: 'Factorial Calculator', description: 'Calculate factorials for non-negative integers and understand factorial notation.', alternates: { canonical: '/factorial-calculator' } }

export default function Page() {
  return <CalculatorPage title='Factorial Calculator' description='Calculate factorials for non-negative integers and understand factorial notation.' path="/factorial-calculator" intro='Enter a non-negative integer to calculate n factorial, written n!.' tool={<SimpleTool type="factorial" />} sections={[{title: 'What is a factorial?', content: <><p>The factorial of n is the product of every positive integer from 1 through n. For example, <code>5! = 120</code>.</p></>},{title: 'Factorials in combinatorics', content: <><p>Factorials are used in permutations and combinations. The scientific calculator supports functions such as <code>factorial(10)</code> and <code>combinations(10,4)</code>.</p></>}]} exclude="/factorial-calculator" />
}
