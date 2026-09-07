import type { Metadata } from 'next'
import { CalculatorPage } from '@/components/CalculatorPage'
import { SimpleTool } from '@/components/SimpleTool'

export const metadata: Metadata = { title: 'Exponent Calculator', description: 'Calculate powers, negative exponents, roots, and other expressions involving exponents.', alternates: { canonical: '/exponent-calculator' } }

export default function Page() {
  return <CalculatorPage title='Exponent Calculator' description='Calculate powers, negative exponents, roots, and other expressions involving exponents.' path="/exponent-calculator" intro='Enter a base and exponent to calculate the power accurately, including decimal and negative exponents.' tool={<SimpleTool type="exponent" />} sections={[{title: 'Exponent rules', content: <><p>For positive integers, <code>a^n</code> means multiplying a by itself n times. A negative exponent represents a reciprocal: <code>a^-n = 1/a^n</code>.</p></>},{title: 'Fractional exponents', content: <><p>A fractional exponent represents a root. For example, <code>x^(1/2)</code> is the square root of x.</p></>}]} exclude="/exponent-calculator" />
}
