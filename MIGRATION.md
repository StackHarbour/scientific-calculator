# Migration from the Vite version

This release intentionally moves the project from the previous Vite SPA architecture to Next.js 16 App Router so the product can have real route-level metadata, server-rendered indexable page content, file-system routes, generated sitemap/robots metadata, and Vercel-native deployment.

## Replace the project, do not merge folders

The previous repository contains generated `dist/` files and a committed `node_modules/` tree. Do not merge the new folder into the old one.

1. Back up any local work you have made after the last calculator build.
2. Replace the repository working tree with this folder.
3. Commit the replacement.
4. Push to GitHub.
5. Let Vercel detect Next.js automatically.

The old Vite files (`index.html`, `vite.config.*`, `src/`, and generated `dist/`) are intentionally absent from this folder.

## Install and verify

```powershell
npm.cmd install
npm.cmd run typecheck
npm.cmd run test
npm.cmd run build
npm.cmd run dev
```

## Canonical production URL

The app supports `NEXT_PUBLIC_SITE_URL` for an explicit canonical origin. On Vercel, the code also falls back to Vercel's `VERCEL_PROJECT_PRODUCTION_URL` system variable, so the sitemap/canonical URLs can follow the project's production domain without hard-coding a guessed URL.

If you add a custom domain and want an explicit override, set `NEXT_PUBLIC_SITE_URL` in Vercel Project Settings for Production and redeploy.
