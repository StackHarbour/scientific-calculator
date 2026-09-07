import type { Metadata } from 'next'
import { CalculatorPage } from '@/components/CalculatorPage'
import { SimpleTool } from '@/components/SimpleTool'

export const metadata: Metadata = { title: 'Statistics Calculator', description: 'Calculate descriptive statistics from a list of numerical values.', alternates: { canonical: '/statistics-calculator' } }

export default function Page() {
  return <CalculatorPage title='Statistics Calculator' description='Calculate descriptive statistics from a list of numerical values.' path="/statistics-calculator" intro='Enter comma-separated values to calculate the mean, median, minimum, maximum, and population standard deviation.' tool={<SimpleTool type="statistics" />} sections={[{title: 'Mean and median', content: <><p>The arithmetic mean is the sum of all observations divided by the number of observations. The median is the middle value after sorting the dataset.</p></>},{title: 'Standard deviation', content: <><p>Population standard deviation measures the typical distance of observations from the mean.</p></>}]} exclude="/statistics-calculator" />
}
