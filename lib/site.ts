export const siteConfig = {
  name: 'Scientific Calculator',
  shortName: 'SciCalc',
  description: 'A fast, accurate online scientific calculator for fractions, exponents, logarithms, trigonometry, percentages, and everyday mathematics.',
  url: process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
  locale: 'en_US',
}

export const calculatorPages = [
  { href: '/scientific-calculator', name: 'Scientific Calculator', description: 'Full scientific calculator with trigonometry, logarithms, powers, roots, fractions, and scientific notation.' },
  { href: '/basic-calculator', name: 'Basic Calculator', description: 'Fast calculator for addition, subtraction, multiplication, division, percentages, and everyday arithmetic.' },
  { href: '/fraction-calculator', name: 'Fraction Calculator', description: 'Calculate with fractions, including addition, subtraction, multiplication, division, and simplification.' },
  { href: '/percentage-calculator', name: 'Percentage Calculator', description: 'Calculate percentages, percentage changes, discounts, increases, and decreases.' },
  { href: '/trigonometry-calculator', name: 'Trigonometry Calculator', description: 'Calculate sine, cosine, tangent, inverse trig, and hyperbolic functions in degrees, radians, or gradians.' },
  { href: '/logarithm-calculator', name: 'Logarithm Calculator', description: 'Calculate common logarithms, natural logarithms, and logarithms with custom bases.' },
  { href: '/exponent-calculator', name: 'Exponent Calculator', description: 'Calculate powers, negative exponents, roots, and scientific notation expressions.' },
  { href: '/square-root-calculator', name: 'Square Root Calculator', description: 'Calculate square roots and explain the relationship between roots, powers, and perfect squares.' },
  { href: '/factorial-calculator', name: 'Factorial Calculator', description: 'Calculate factorials and understand factorial notation, combinations, and permutations.' },
  { href: '/statistics-calculator', name: 'Statistics Calculator', description: 'Calculate mean, median, minimum, maximum, range, variance, and standard deviation.' },
]

export const guidePages = [
  { href: '/guides/degrees-vs-radians', name: 'Degrees vs. Radians', description: 'Understand angle units and when to use degrees, radians, or gradians.' },
  { href: '/guides/scientific-notation', name: 'Scientific Notation', description: 'Learn how scientific notation works and how to enter it into a calculator.' },
  { href: '/guides/fractions', name: 'How to Calculate with Fractions', description: 'Learn how to add, subtract, multiply, divide, and simplify fractions.' },
  { href: '/guides/percentages', name: 'How to Calculate Percentages', description: 'Learn percentage formulas for changes, discounts, increases, and proportions.' },
]

export const allIndexablePages = [
  { href: '/', name: siteConfig.name },
  { href: '/calculators', name: 'Calculators' },
  { href: '/guides', name: 'Guides' },
  ...calculatorPages,
  ...guidePages,
  { href: '/about', name: 'About' },
  { href: '/contact', name: 'Contact' },
  { href: '/privacy', name: 'Privacy Policy' },
  { href: '/terms', name: 'Terms of Use' },
]
