import { all, create } from 'mathjs'

const math = create(all, {})
math.config({ number: 'number' })

export type AngleMode = 'DEG' | 'RAD' | 'GRAD'

function toRadians(value: number, mode: AngleMode) {
  if (mode === 'DEG') return value * Math.PI / 180
  if (mode === 'GRAD') return value * Math.PI / 200
  return value
}

function fromRadians(value: number, mode: AngleMode) {
  if (mode === 'DEG') return value * 180 / Math.PI
  if (mode === 'GRAD') return value * 200 / Math.PI
  return value
}

function preprocess(expression: string) {
  return expression
    .replaceAll('×', '*')
    .replaceAll('÷', '/')
    .replaceAll('−', '-')
    .replaceAll('π', 'pi')
    .replaceAll('⁄', '/')
    .replace(/(\d+(?:\.\d+)?)%/g, '($1/100)')
    .replace(/\blog\(/g, 'log10(')
    .replace(/\bsec\(/g, 'sec_angle(')
    .replace(/\bcsc\(/g, 'csc_angle(')
    .replace(/\bcot\(/g, 'cot_angle(')
    .replace(/\bsin\(/g, 'sin_angle(')
    .replace(/\bcos\(/g, 'cos_angle(')
    .replace(/\btan\(/g, 'tan_angle(')
    .replace(/\basin\(/g, 'asin_angle(')
    .replace(/\bacos\(/g, 'acos_angle(')
    .replace(/\batan\(/g, 'atan_angle(')
}

function findIdentifiers(expression: string) {
  // Remove complete scientific-notation numbers before checking identifiers.
  // This prevents values such as 6.022e23 from being mistaken for an
  // identifier named "e23".
  const withoutScientificNotation = expression.replace(
    /(?:\d+(?:\.\d*)?|\.\d+)[eE][+-]?\d+/g,
    '',
  )

  return withoutScientificNotation.match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? []
}

export function evaluateExpression(input: string, mode: AngleMode): string {
  const expression = input.trim()
  if (!expression) return ''

  const expr = preprocess(expression)

  const allowed = new Set([
    'pi', 'e', 'log10', 'ln',
    'sin_angle', 'cos_angle', 'tan_angle',
    'cot_angle', 'sec_angle', 'csc_angle',
    'asin_angle', 'acos_angle', 'atan_angle',
    'sinh', 'cosh', 'tanh',
    'asinh', 'acosh', 'atanh',
    'sqrt', 'abs', 'floor', 'ceil', 'exp',
    'factorial', 'combinations', 'permutations',
  ])

  const identifiers = findIdentifiers(expr)

  for (const identifier of identifiers) {
    if (!allowed.has(identifier)) {
      throw new Error(`Unknown function: ${identifier}`)
    }
  }

  const scope = {
    log10: (x: number) => Math.log10(x),
    ln: (x: number) => Math.log(x),

    sin_angle: (x: number) => Math.sin(toRadians(x, mode)),
    cos_angle: (x: number) => Math.cos(toRadians(x, mode)),
    tan_angle: (x: number) => Math.tan(toRadians(x, mode)),

    cot_angle: (x: number) => 1 / Math.tan(toRadians(x, mode)),
    sec_angle: (x: number) => 1 / Math.cos(toRadians(x, mode)),
    csc_angle: (x: number) => 1 / Math.sin(toRadians(x, mode)),

    asin_angle: (x: number) => fromRadians(Math.asin(x), mode),
    acos_angle: (x: number) => fromRadians(Math.acos(x), mode),
    atan_angle: (x: number) => fromRadians(Math.atan(x), mode),

    sinh: Math.sinh,
    cosh: Math.cosh,
    tanh: Math.tanh,
    asinh: Math.asinh,
    acosh: Math.acosh,
    atanh: Math.atanh,
  }

  let result: unknown

  try {
    result = math.evaluate(expr, scope)
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Invalid expression')
  }

  if (typeof result === 'number') {
    if (!Number.isFinite(result)) {
      throw new Error('Result is not finite.')
    }

    if (Math.abs(result) < 1e-12) {
      return '0'
    }

    return math.format(result, { precision: 14 })
  }

  if (Array.isArray(result)) {
    return result.map(String).join(', ')
  }

  return String(result)
}
