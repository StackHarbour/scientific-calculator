import { describe, expect, it } from 'vitest'
import { evaluateExpression } from './calculator'

describe('scientific calculator engine', () => {
  it('handles scientific notation', () => {
    expect(evaluateExpression('1.23456789e-12 × 9.87654321e8', 'DEG')).toBe('0.0012193263111264')
  })
  it('respects operator precedence', () => {
    expect(evaluateExpression('2^10 + 3^5 / sqrt(17)', 'DEG')).toBe('1082.9361568838')
  })
  it('handles fractions', () => {
    expect(evaluateExpression('((3/7)+(5/11))/((2/9)-(1/6))', 'DEG')).toBe('15.896103896104')
  })
  it('uses angle mode for trigonometry', () => {
    expect(evaluateExpression('sin(90)', 'DEG')).toBe('1')
    expect(evaluateExpression('sin(pi/2)', 'RAD')).toBe('1')
    expect(evaluateExpression('sin(100)', 'GRAD')).toBe('1')
    expect(evaluateExpression('cos(60)', 'DEG')).toBe('0.5')
  })
  it('rejects unknown identifiers', () => {
    expect(() => evaluateExpression('unknown(2)', 'DEG')).toThrow('Unknown function: unknown')
  })
})
