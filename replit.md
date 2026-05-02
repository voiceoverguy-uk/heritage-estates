# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Heritage Estates (`artifacts/heritage-estates/`)
- **Kind**: React + Vite static web app (no backend)
- **Preview path**: `/` (port 25889)
- **Purpose**: SEO-preserving replica of heritageestates.co.uk
- **Brand**: Open Sans font, `#006AC1` / `#2EA3F2` blue palette, 0px border radius, white background
- **Router**: `wouter` (client-side only)
- **SEO**: `react-helmet-async` for per-page `<title>` and `<meta description>`
- **14 pages**:
  - `/` — Home (hero, service grid, about, commitment)
  - `/faq/` — FAQ (accordion, 10 questions)
  - `/news/` — Latest News (PDF links to original site CDN)
  - `/our-team/` — Our Team (Julia Towarianskyj profile)
  - `/contact/` — Contact (enquiry form with maths captcha)
  - `/residential-mortgages/` — Residential Mortgages
  - `/buy-to-let-mortgages/` — Buy To Let Mortgages
  - `/mortgages-for-first-time-buyers/` — First Time Buyers
  - `/remortgaging/` — Remortgaging
  - `/mortgages-for-self-employed/` — Self Employed
  - `/insurance-protection/` — Insurance & Protection
  - `/mortgages-for-company-directors/` — Company Directors
  - `/privacy-cookies/` — Privacy & Cookies
  - `/mortgage-calculator/` — Mortgage Calculator (new; repayment/interest-only, stress test)
- **Shared components**: `Layout.tsx`, `PageWrapper.tsx`, `CtaBoxes.tsx`, `CommitmentSection.tsx`
- **Images**: served from `heritageestates.co.uk/wp-content/uploads/` CDN
