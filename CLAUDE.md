# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # start dev server at localhost:3000
npm run build     # production build
npm run lint      # ESLint (v9 flat config via eslint.config.mjs)
```

No test runner is installed yet — Vitest or Jest is planned.

Prisma CLI (run from project root, reads `prisma.config.ts`):
```bash
npx prisma migrate dev --name <name>   # create and apply a migration
npx prisma generate                    # regenerate client after schema change
npx prisma studio                      # GUI for the database
```

Requires `DATABASE_URL` set in `.env` (PostgreSQL connection string).

## Architecture

### Stack versions — read before writing code

- **Next.js 16** (App Router). Route params are Promises: `{ params }: { params: Promise<{ id: string }> }` — always `await params`.
- **Prisma 7** — client is generated to `lib/generated/prisma/`, not the default `@prisma/client`. Import from `@/lib/generated/prisma/client`, `@/lib/generated/prisma/enums`, etc. Uses a driver adapter (`PrismaPg` from `@prisma/adapter-pg`) — the client singleton is in `lib/prisma.ts`.
- **Zod v4** — API differs from v3: use `z.url()` (not `z.string().url()`), `z.flattenError(error)` (not `error.flatten()`).
- **shadcn/ui** — primitives live in `components/ui/`. Add new ones with `npx shadcn add <component>`.
- **Tailwind CSS v4** — configured via PostCSS (`postcss.config.mjs`), no `tailwind.config.js`.

### Path alias

`@/` resolves to the project root (configured in `tsconfig.json`).

### Data access — two patterns in use

**Server pages query Prisma directly** (no HTTP hop):
```
app/applications/page.tsx  →  lib/prisma.ts  →  PostgreSQL
                                    ↓
                         lib/applications/map-application.ts
                                    ↓
                           ApplicationRow[]  →  Client component
```

**Mutations use Server Actions** (`app/applications/actions.ts`, `"use server"`):
- Validate with `applicationSchema`, write via Prisma, then call `revalidatePath()` to bust the page cache.
- Client components call the action directly — no `fetch` needed.

**REST routes** (`app/api/applications/`) still exist for `POST` (create) and `PUT`/`DELETE` (update/delete), validated via `applicationSchema` from `lib/validations/application.ts`.

### Filtering

Filtering is **client-side only** — all rows are passed as `initialRows` props at SSR time. `ApplicationList` syncs active filters to URL search params (so links are shareable) and memoises the filtered subset. Filter helpers:
- `filters/parse-filters.ts` — `URLSearchParams` → `ApplicationFilters`
- `filters/serialize-filters.ts` — `ApplicationFilters` → `URLSearchParams`
- `filters/matches-search.ts` — text search predicate over an `ApplicationRow`

Search input is debounced via `hooks/useDebouncedValue.tsx` before being written to the URL.

### Component organisation

- `components/applications/` — feature components for the applications domain (table, form, badges, row actions, per-application header).
- `components/<Feature>/` — other domain-specific UI blocks (Dashboard, NavBar, StatCard, etc.).
- `components/ui/` — shadcn/ui primitives only; no custom logic here.
- `components/providers.tsx` — wraps the tree with `QueryClientProvider` (TanStack Query); mounted in the root layout.
- `hooks/` — project-wide React hooks (currently `useDebouncedValue`).

### Domain types

`lib/applications/types.ts` defines `ApplicationRow` — the shape used by UI components after mapping from raw Prisma output. `lib/applications/map-application.ts` handles that mapping. Prisma enums (`JobType`, `Status`) are imported from `lib/generated/prisma/enums`.

`techStack` is stored in Postgres as a single delimited string (`,` `;` `|` `/`) and split into an array by `parseStack()` in `map-application.ts` — never store or expect an array from the DB.
