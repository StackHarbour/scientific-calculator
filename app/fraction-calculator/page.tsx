import type { Metadata } from 'next'
import { CalculatorPage } from '@/components/CalculatorPage'
import { SimpleTool } from '@/components/SimpleTool'

export const metadata: Metadata = { title: 'Fraction Calculator', description: 'Calculate, combine, and simplify fractions online.', alternates: { canonical: '/fraction-calculator' } }

export default function Page() {
  return <CalculatorPage title='Fraction Calculator' description='Calculate, combine, and simplify fractions online.' path="/fraction-calculator" intro='Enter the numerators and denominators of two fractions, choose an operation, and get the reduced fraction together with its decimal value.' tool={<SimpleTool type="fraction" />} sections={[{title: 'Adding and subtracting fractions', content: <><p>Find a common denominator, convert each fraction, then add or subtract the numerators. For example, <code>1/3 + 1/6 = 1/2</code>.</p></>},{title: 'Multiplying and dividing fractions', content: <><p>For multiplication, multiply numerators and denominators. For division, multiply by the reciprocal of the second fraction.</p></>},{title: 'Fractions in the scientific calculator', content: <><p>You can also type expressions such as <code>((3/7) + (5/11)) / ((2/9) - (1/6))</code> into the full scientific calculator.</p></>}]} exclude="/fraction-calculator" />
}
