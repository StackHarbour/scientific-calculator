import type { Metadata } from 'next'
import { CalculatorPage } from '@/components/CalculatorPage'
import { SimpleTool } from '@/components/SimpleTool'

export const metadata: Metadata = { title: 'Square Root Calculator', description: 'Calculate square roots quickly and understand how roots relate to powers.', alternates: { canonical: '/square-root-calculator' } }

export default function Page() {
  return <CalculatorPage title='Square Root Calculator' description='Calculate square roots quickly and understand how roots relate to powers.' path="/square-root-calculator" intro='Enter a non-negative number to calculate its real square root.' tool={<SimpleTool type="square-root" />} sections={[{title: 'What is a square root?', content: <><p>The square root of x is the number that produces x when multiplied by itself. For example, <code>√49 = 7</code>.</p></>},{title: 'Perfect squares', content: <><p>Numbers such as 1, 4, 9, 16, and 25 are perfect squares because their square roots are integers.</p></>}]} exclude="/square-root-calculator" />
}
