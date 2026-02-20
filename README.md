# Move Out Help Out

A production-ready web platform that connects **college move-out surplus** to **local nonprofits** serving families in crisis. Multi-role app with scheduling, logistics coordination, and inventory management.

## Roles

- **Donor** — Campuses or students post surplus items and create pickup windows.
- **Nonprofit** — Browse and claim inventory, manage pickups.
- **Coordinator** — Match donors to nonprofits, manage logistics and schedule.

## Tech stack

- **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS**
- **Prisma** (SQLite for dev; switch `DATABASE_URL` to PostgreSQL for production)
- **NextAuth.js** (session + role-based access)

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment

Copy the example env and set a secret:

```bash
cp .env.example .env
```

Edit `.env`:

- `DATABASE_URL="file:./dev.db"` — SQLite for local dev.
- `NEXTAUTH_SECRET` — Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL="http://localhost:3000"` for local dev.

### 3. Database

```bash
npm run db:push
npm run db:seed
```

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo sign-in

Use **password: `demo`** with any email. Choose role on the login page.

Pre-seeded accounts (after `npm run db:seed`):

| Email                         | Role        | Password |
|-------------------------------|------------|----------|
| donor@moveouthelpout.org      | Donor      | demo     |
| nonprofit@moveouthelpout.org  | Nonprofit  | demo     |
| coordinator@moveouthelpout.org| Coordinator| demo     |

Donor and Nonprofit accounts are linked to demo organizations so you can add inventory, create pickups, claim items, and assign logistics.

## Project structure

```
src/
  app/
    (auth)           login
    dashboard/       role-based dashboards
      donor/         inventory, schedule
      nonprofit/     available, claims, pickups
      coordinator/   logistics, schedule, inventory
    api/             REST endpoints (inventory, pickup-windows, claims, logistics)
  components/        shared UI and forms
  lib/               db, auth, auth-utils
  types/             roles, categories
prisma/
  schema.prisma      data model
  seed.ts            demo data
```

## Production notes

- Set `DATABASE_URL` to a PostgreSQL connection string.
- Use a real auth provider (e.g. Google, GitHub) in `src/lib/auth.ts` or add credentials with hashed passwords.
- Run `npm run db:push` or migrations on your production DB and avoid running seed in prod.

## License

MIT.

---

## Phil Notes

*(Everything your professor should know to grade this project.)*

### What this project is

**Move Out Help Out** is a full-stack web application that connects college move-out surplus (donors) to local nonprofits serving families in crisis. It supports three roles—Donor, Nonprofit, and Coordinator—with role-based dashboards, inventory management, claims, pickup windows, and logistics assignment. The app is deployed to production (Railway) with a custom domain.

### Tech stack (for grading)

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Prisma ORM — SQLite locally; PostgreSQL in production |
| Auth | NextAuth.js (Credentials provider, JWT session, role in session) |
| UI | React 18, Lucide icons, custom components |
| Validation | Zod (API routes) |
| Hosting | Railway (app + PostgreSQL); custom domain via GoDaddy DNS |

### How to run it locally (for grading)

1. **Clone the repo** (or download and open in the project directory.)
2. **Install:** `npm install`
3. **Environment:** Ensure `.env` exists with:
   - `DATABASE_URL="file:./dev.db"`
   - `NEXTAUTH_SECRET` (any 32+ character string; e.g. run `openssl rand -base64 32`)
   - `NEXTAUTH_URL="http://localhost:3000"` (or the port you use)
4. **Database:** `npm run db:push` then `npm run db:seed`
5. **Run:** `npm run dev` → open http://localhost:3000

### Demo sign-in (for grading)

**Password for all demo accounts:** `demo`

| Role | Email | Purpose |
|------|--------|---------|
| Donor | donor@moveouthelpout.org | Add inventory, create pickup windows; linked to a demo campus org |
| Nonprofit | nonprofit@moveouthelpout.org | Browse available items (filtered by area), claim items, see pickups; linked to a demo nonprofit org |
| Coordinator | coordinator@moveouthelpout.org | View logistics, assign pickups to nonprofits, manage schedule and inventory by area |

Donors and nonprofits can set their **area** (e.g. “Bay Area, CA”) on the dashboard; “Available to claim” is filtered by that area. Coordinators can filter inventory by area.

### Production / live site

- **Live URL:** https://www.moveouthelpout.com (or the root domain if configured).
- **Host:** Railway (single platform for app + PostgreSQL).
- **Domain:** GoDaddy DNS (CNAME for www, optional TXT for Railway verification). `NEXTAUTH_URL` in Railway is set to the production URL so sign-in and redirects work.

### Features implemented (grading checklist)

- **Multi-role auth:** Login page with role selection; session includes `role` and `organizationId`; dashboard redirect by role; middleware protects routes by role.
- **Donor flow:** Dashboard, add/edit inventory (with categories, quantity, images), create pickup windows; area setting on dashboard.
- **Nonprofit flow:** Dashboard, browse “Available to claim” (filtered by org area), claim items, view My claims and Pickups; area setting on dashboard.
- **Coordinator flow:** Dashboard, view and assign logistics (match pickup windows to nonprofits), update assignment status; inventory view filterable by area; schedule view.
- **Area/location:** Organizations have an optional `area`; donors and nonprofits set it after sign-in; available items and coordinator inventory filter by area.
- **API routes:** REST-style endpoints under `src/app/api/` for auth, inventory, pickup-windows, claims, logistics, organization (PATCH for area).
- **Data model:** Users, Organizations (CAMPUS / NONPROFIT), InventoryItems, PickupWindows, Claims, LogisticsAssignments; Prisma schema in `prisma/schema.prisma`, seed in `prisma/seed.ts`.
- **UI/UX:** Responsive layout, Tailwind-based design, hero section with optional background video (`public/hero-bg.mp4`), role-specific nav, forms with validation and feedback.
- **Deployment:** Build succeeds (`prisma generate && next build`); deployed on Railway with PostgreSQL; custom domain connected; env vars documented (see `PUSH-TO-PRODUCTION.md`, `CONNECT-DOMAIN.md`).

### Where to look in the codebase (for grading)

- **Auth & session:** `src/lib/auth.ts` (NextAuth config, credentials, callbacks), `src/app/api/auth/[...nextauth]/route.ts`, `src/app/login/page.tsx`, `src/lib/auth-utils.ts` (role checks).
- **Role-based routing & layout:** `src/app/dashboard/page.tsx` (redirect by role), `src/app/dashboard/[role]/layout.tsx` (or per-role layouts), `src/components/dashboard-nav.tsx`, `src/middleware.ts`.
- **Donor:** `src/app/dashboard/donor/` (page, inventory, schedule), `src/components/add-inventory-form.tsx`, `src/app/api/inventory/route.ts`, `src/app/api/pickup-windows/route.ts`.
- **Nonprofit:** `src/app/dashboard/nonprofit/` (page, available, claims, pickups), `src/app/api/claims/route.ts`, `src/components/claim-button.tsx`.
- **Coordinator:** `src/app/dashboard/coordinator/` (page, logistics, schedule, inventory), `src/app/api/logistics/route.ts`, `src/components/area-filter-links.tsx`.
- **Area/location:** `src/types/index.ts` (AREAS), `src/components/area-setting.tsx`, `src/app/api/organization/route.ts` (PATCH area); filtering in `src/app/dashboard/nonprofit/available/page.tsx` and coordinator inventory.
- **Database:** `prisma/schema.prisma`, `prisma/seed.ts`, `src/lib/db.ts`.
- **Home page & hero:** `src/app/page.tsx`, `src/components/hero-with-video.tsx`, `src/components/hero-cta.tsx`.

### Known limitations / scope (for fair grading)

- **Auth:** Credentials-only; password is a single shared “demo” for local/dev; no email verification or password reset. Production would use a proper credentials store (e.g. hashed passwords) or OAuth.
- **Images:** Upload and image URLs are supported for inventory; storage is configurable (e.g. local or cloud); no in-app image processing beyond display.
- **Email:** No transactional or notification emails (e.g. on claim or assignment); no newsletter system in this codebase.
- **Local vs production DB:** Schema uses SQLite locally (`file:./dev.db`); for production deploy the schema is switched to PostgreSQL and `DATABASE_URL` is set on the host (see `PUSH-TO-PRODUCTION.md`). Seed is intended for local/demo only.

### Documentation in the repo

- **README.md** — This file; overview, stack, getting started, demo logins, structure.
- **PUSH-TO-PRODUCTION.md** — Step-by-step deploy to Railway (one platform, app + Postgres).
- **CONNECT-DOMAIN.md** — Connecting a GoDaddy domain to Railway (DNS, NEXTAUTH_URL).
- **DEPLOY-STEPS.md** / **DEPLOY.md** — Alternative deploy notes (Vercel + Neon, Railway).
- **FIX-SIGN-IN.md** — Troubleshooting sign-in / DB URL issues locally.
- **public/HERO-VIDEO-README.md** — How to add the optional hero background video.

### Build and lint

- **Build:** `npm run build` (runs `prisma generate && next build`). Must succeed for Railway deploy.
- **Lint:** `npm run lint` (Next.js ESLint). Some `<img>` warnings may remain; no blocking errors introduced for deployment.

If you need a specific scenario tested (e.g. “donor adds item, nonprofit claims it, coordinator assigns pickup”), use the demo accounts above and the production site or a local run after `db:seed`.
