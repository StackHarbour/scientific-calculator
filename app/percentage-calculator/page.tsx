import type { Metadata } from 'next'
import { CalculatorPage } from '@/components/CalculatorPage'
import { SimpleTool } from '@/components/SimpleTool'

export const metadata: Metadata = { title: 'Percentage Calculator', description: 'Calculate percentages, percentage changes, increases, decreases, and proportions.', alternates: { canonical: '/percentage-calculator' } }

export default function Page() {
  return <CalculatorPage title='Percentage Calculator' description='Calculate percentages, percentage changes, increases, decreases, and proportions.' path="/percentage-calculator" intro='Use the interactive tool to solve common percentage problems without writing the formula yourself.' tool={<SimpleTool type="percentage" />} sections={[{title: 'What is a percentage?', content: <><p>A percentage is a ratio expressed per hundred. Use <code>part / whole × 100</code> to determine what percentage one value represents of another.</p></>},{title: 'Percentage change', content: <><p>Percentage change is <code>(new − original) / original × 100</code>. A positive result indicates an increase and a negative result indicates a decrease.</p></>},{title: 'Example', content: <><p>10% of 250 is 25. If a price changes from 80 to 100, the percentage increase is 25%.</p></>}]} exclude="/percentage-calculator" />
}
