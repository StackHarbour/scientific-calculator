import { all, create, type MathJsStatic } from 'mathjs'

const math = create(all, {})
math.config({ number: 'number' })

export type AngleMode = 'DEG' | 'RAD' | 'GRAD'

const functions = [
  'sin', 'cos', 'tan', 'asin', 'acos', 'atan',
  'sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh',
  'log', 'ln', 'sqrt', 'abs', 'floor', 'ceil', 'exp',
  'factorial', 'combinations', 'permutations'
]

function convertAngle(value: number, mode: AngleMode) {
  if (mode === 'DEG') return value * Math.PI / 180
  if (mode === 'GRAD') return value * Math.PI / 200
  return value
}

function convertFromRadians(value: number, mode: AngleMode) {
  if (mode === 'DEG') return value * 180 / Math.PI
  if (mode === 'GRAD') return value * 200 / Math.PI
  return value
}

function preprocess(expression: string, mode: AngleMode) {
  let expr = expression
    .replaceAll('×', '*')
    .replaceAll('÷', '/')
    .replaceAll('−', '-')
    .replaceAll('π', 'pi')
    .replaceAll('√', 'sqrt')
    .replace(/\b(\d+(?:\.\d+)?)%/g, '($1/100)')
    .replace(/\blog\(/g, 'log10(')

  const angleFunctions = ['sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'asin', 'acos', 'atan']
  for (const fn of angleFunctions) {
    const pattern = new RegExp(`\\b${fn}\\(`, 'g')
    if (fn === 'asin' || fn === 'acos' || fn === 'atan') {
      const base = fn === 'asin' ? 'asin' : fn === 'acos' ? 'acos' : 'atan'
      expr = expr.replace(pattern, `${base}_angle(`)
    } else {
      expr = expr.replace(pattern, `${fn}_angle(`)
    }
  }

  expr = expr.replace(/\^/g, '^')
  return { expr, mode }
}

function formatValue(value: unknown) {
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new Error('Result is not finite.')
    if (Math.abs(value) < 1e-12) return '0'
    return math.format(value, { precision: 14 })
  }
  if (Array.isArray(value)) return value.map(formatValue).join(', ')
  return String(value)
}

export function evaluateExpression(input: string, mode: AngleMode): string {
  const raw = input.trim()
  if (!raw) return ''

  const { expr } = preprocess(raw, mode)

  const scope: Record<string, unknown> = {
    log10: (x: number) => Math.log10(x),
    ln: (x: number) => Math.log(x),
    sin_angle: (x: number) => Math.sin(convertAngle(x, mode)),
    cos_angle: (x: number) => Math.cos(convertAngle(x, mode)),
    tan_angle: (x: number) => Math.tan(convertAngle(x, mode)),
    cot_angle: (x: number) => 1 / Math.tan(convertAngle(x, mode)),
    sec_angle: (x: number) => 1 / Math.cos(convertAngle(x, mode)),
    csc_angle: (x: number) => 1 / Math.sin(convertAngle(x, mode)),
    asin_angle: (x: number) => convertFromRadians(Math.asin(x), mode),
    acos_angle: (x: number) => convertFromRadians(Math.acos(x), mode),
    atan_angle: (x: number) => convertFromRadians(Math.atan(x), mode),
    sinh: Math.sinh,
    cosh: Math.cosh,
    tanh: Math.tanh,
    asinh: Math.asinh,
    acosh: Math.acosh,
    atanh: Math.atanh,
  }

  // Explicitly reject unsupported identifiers before mathjs parsing.
  const identifierPattern = /[A-Za-z_][A-Za-z0-9_]*/g
  const allowed = new Set([
    'pi', 'e', 'log10', 'ln', 'sin_angle', 'cos_angle', 'tan_angle',
    'cot_angle', 'sec_angle', 'csc_angle', 'asin_angle', 'acos_angle',
    'atan_angle', 'sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh',
    'sqrt', 'abs', 'floor', 'ceil', 'exp', 'factorial',
    'combinations', 'permutations'
  ])
  for (const identifier of expr.match(identifierPattern) ?? []) {
    if (!allowed.has(identifier)) throw new Error(`Unknown function: ${identifier}`)
  }

  const result = math.evaluate(expr, scope)
  return formatValue(result)
}

export function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0 || n > 170) throw new Error('Factorial requires an integer from 0 to 170.')
  let result = 1
  for (let i = 2; i <= n; i++) result *= i
  return result
}

export function insertFunction(current: string, fn: string) {
  return `${current}${fn}(`
}

export { functions }
