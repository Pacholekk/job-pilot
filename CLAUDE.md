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

### API layer

REST routes under `app/api/applications/`:
- `route.ts` — `GET` (list all) and `POST` (create)
- `[id]/route.ts` — `PUT` (update) and `DELETE`

All routes validate request bodies with the shared `applicationSchema` from `lib/validations/application.ts`, then write to Postgres via the Prisma singleton.

### Data flow

```
Page (app/applications/) → fetch → API route (app/api/applications/)
                                      ↓
                              lib/validations/   (Zod parse)
                                      ↓
                              lib/prisma.ts      (Prisma + pg adapter)
                                      ↓
                                 PostgreSQL
```

### Component organisation

- `components/applications/` — feature components tied to the applications domain (table, form, badges, row actions).
- `components/<Feature>/` — other domain-specific UI blocks (Dashboard, NavBar, StatCard, etc.).
- `components/ui/` — shadcn/ui primitives only; don't put custom logic here.

### Domain types

`lib/applications/types.ts` defines `ApplicationRow` — the shape used by UI components after mapping from raw Prisma output. `lib/applications/map-application.ts` handles that mapping. Prisma enums (`JobType`, `Status`) are imported from `lib/generated/prisma/enums`.
