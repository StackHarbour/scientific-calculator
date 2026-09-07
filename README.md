# Scientific Calculator

A single-page React + TypeScript scientific calculator designed for accuracy, usability, and deployment as a static Vite application.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- math.js
- Lucide React

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

Import the repository into Vercel. The project is a standard Vite application; Vercel will detect the build configuration automatically.

## Notes

The calculation engine uses `mathjs` rather than JavaScript `eval()`. Trigonometric functions respect the selected DEG/RAD/GRAD mode.
