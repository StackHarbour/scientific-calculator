import type { Metadata } from 'next'
import { CalculatorPage } from '@/components/CalculatorPage'
import { SimpleTool } from '@/components/SimpleTool'

export const metadata: Metadata = { title: 'Logarithm Calculator', description: 'Calculate logarithms with a custom base, including common logarithms and natural logarithms.', alternates: { canonical: '/logarithm-calculator' } }

export default function Page() {
  return <CalculatorPage title='Logarithm Calculator' description='Calculate logarithms with a custom base, including common logarithms and natural logarithms.' path="/logarithm-calculator" intro='Enter a positive value and a valid logarithm base to calculate log base b of x.' tool={<SimpleTool type="logarithm" />} sections={[{title: 'What is a logarithm?', content: <><p>A logarithm answers what exponent is required to turn a base into a given value. For example, <code>log₂(8) = 3</code> because <code>2³ = 8</code>.</p></>},{title: 'Common and natural logarithms', content: <><p>The common logarithm uses base 10 and the natural logarithm uses base e. Both are available in the scientific calculator.</p></>}]} exclude="/logarithm-calculator" />
}
