# Move Out Help Out

A production-ready web platform that connects **college move-out surplus** to **local nonprofits** serving families in crisis. Multi-role app with scheduling, logistics coordination, and inventory management.

## Roles

- **Donor** — Campuses or students post surplus items and create pickup windows.
- **Nonprofit** — Browse and claim inventory, manage pickups.
- **Volunteer** — Pick up, deliver, sort items. Manage logistics and schedule.

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
