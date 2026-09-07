# Scientific Calculator

Production-oriented scientific calculator built with **Next.js 16 App Router**, React 19, TypeScript, Tailwind CSS 4, math.js, and Vitest 5.

## What is included

- Scientific calculator with DEG/RAD/GRAD modes
- Fractions, scientific notation, powers, roots, logarithms, trigonometry, factorials, combinations and permutations
- Keyboard input, paste support, memory, history, copy result, light/dark mode
- Dedicated calculator pages for common search intents
- Mathematics guides with practical explanations
- Metadata, canonical URLs, Open Graph/Twitter metadata, JSON-LD, sitemap, robots.txt, manifest, breadcrumbs, and 404 page
- Automated calculator-engine tests
- Responsive and accessible controls

## Development

Requires Node.js 22.12+.

```bash
npm install
npm run dev
npm run typecheck
npm run test
npm run build
```

For PowerShell environments where `npm.ps1` is blocked, use `npm.cmd` instead.

## Production URL

Set `NEXT_PUBLIC_SITE_URL` in Vercel to the canonical production origin, for example:

`https://your-domain.com`

This value is used by canonical URLs, Open Graph metadata, sitemap, robots.txt, and JSON-LD.
