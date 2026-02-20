# Push Move Out Help Out to Production

**Important:** The app now uses **PostgreSQL** (not SQLite). You’ll use a free Neon database for both local development and production. Your old `dev.db` file is no longer used. Until you set `DATABASE_URL` in `.env` to a Postgres URL (from Neon), local `npm run build` may show Prisma errors—that’s expected; the Vercel build will work once you add the Neon URL in Vercel’s environment variables.

---

## What stack is this?

- **Next.js 15** (React framework)
- **React 18** (UI)
- **Prisma** (database layer)
- **PostgreSQL** (database — required for production; SQLite is for local only)
- **NextAuth** (sign-in)
- **Tailwind CSS** (styling)
- **TypeScript**

## Easiest hosts for this stack

You can use either:

- **Vercel + Neon** — Very common for Next.js. Free tiers. App on Vercel, database on Neon (two places).
- **Railway** — One place for app and database. Add Postgres with one click; Railway sets `DATABASE_URL` for you. Free trial, then pay-as-you-go (~$5/mo for a small app).

Both work. Use **Option A** (Vercel + Neon) for free tiers, or **Option B** (Railway) if you prefer a single dashboard.

---

## Option A: Vercel + Neon

Do these in order. You’ll need: a **GitHub** account, a **Vercel** account, and a **Neon** account (all free).

---

### Step 1: Put your code on GitHub

1. Go to [github.com](https://github.com) and sign in.
2. Click **+** (top right) → **New repository**.
3. Name: `move-out-help-out` (or any name).
4. Leave “Add a README” **unchecked** (you already have code).
5. Click **Create repository**.
6. On your computer, open **Terminal** (Mac) or **Command Prompt** (Windows) and run (replace `YOUR_USERNAME` with your GitHub username):

   ```bash
   cd /Users/liorazarin/Desktop/move_out_help_out
   git add .
   git commit -m "Ready for production"
   git remote add origin https://github.com/YOUR_USERNAME/move-out-help-out.git
   git branch -M main
   git push -u origin main
   ```

   If it asks for login, use GitHub’s **Personal Access Token** as the password (GitHub → Settings → Developer settings → Personal access tokens → Generate new token).

Your code is now on GitHub.

---

### Step 2: Create a free database (Neon)

1. Go to [neon.tech](https://neon.tech) and sign up (free).
2. Click **Create a project**.
3. Name: `move-out-help-out` (or anything). Region: pick one close to you.
4. Click **Create project**.
5. On the project page you’ll see a **Connection string** (starts with `postgresql://...`). Click **Copy** and save it somewhere (you’ll paste it into Vercel later).  
   It looks like:  
   `postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`

You now have a production database.

---

### Step 3: Deploy the app on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up (use “Continue with GitHub”).
2. Click **Add New…** → **Project**.
3. **Import** your `move-out-help-out` repo (select it from the list). Click **Import**.
4. **Configure Project** (don’t click Deploy yet):
   - **Framework Preset:** Next.js (should be auto-detected).
   - **Root Directory:** leave as `.`
   - **Build Command:** leave as `next build` (or set to `npx prisma generate && next build` if you prefer).
   - **Output Directory:** leave default.

5. **Environment Variables** — click **Add** and add these one by one:

   | Name              | Value                                                                 |
   |-------------------|-----------------------------------------------------------------------|
   | `DATABASE_URL`    | Paste the **full** Neon connection string you copied in Step 2.      |
   | `NEXTAUTH_SECRET` | A long random string. Generate one: run `openssl rand -base64 32` in Terminal and paste the result. |
   | `NEXTAUTH_URL`    | `https://your-project-name.vercel.app` (replace with your **actual** Vercel URL; you’ll see it after the first deploy, then edit this and redeploy). For the first deploy you can use `https://move-out-help-out.vercel.app` or whatever name Vercel shows. |

6. Click **Deploy**.
7. Wait a few minutes. When it’s done, open your site (e.g. `https://move-out-help-out.vercel.app`).

---

### Step 4: Apply the database schema and seed (one time)

Vercel only runs your app; it doesn’t run Prisma for you. So you run Prisma **once** from your computer, pointed at your Neon database.

1. On your computer, open `.env` and set `DATABASE_URL` to your **Neon** connection string (the same one you added in Vercel).  
   Your `.env` should look like (with your real values):
   ```env
   DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-at-least-32-chars"
   ```
2. In Terminal, from your project folder, run:

   ```bash
   cd /Users/liorazarin/Desktop/move_out_help_out
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

3. Leave `DATABASE_URL` as the Neon URL. You’ll use the same database for local development and production (or create a second Neon project later for production only).

After this, your database has tables and demo users.

---

### Step 5: Set the correct production URL and redeploy

1. In Vercel, open your project → **Settings** → **Environment Variables**.
2. Edit `NEXTAUTH_URL` and set it to your **real** Vercel URL (e.g. `https://move-out-help-out.vercel.app` — no trailing slash).
3. Save, then go to **Deployments** → click the **⋯** on the latest deployment → **Redeploy**.

Sign-in and redirects will now use the correct URL. You can test sign-in with the demo users (e.g. `donor@moveouthelpout.org` / `demo`).

---

## Option B: Railway (app + database in one place)

You’ll need: **GitHub** account and **Railway** account (railway.app). Code must be on GitHub first (do **Step 1** from Option A if you haven’t).

1. **Go to [railway.app](https://railway.app)** and sign up (e.g. “Login with GitHub”).
2. Click **New Project**.
3. Choose **Deploy from GitHub repo**. Select your `move-out-help-out` repo (you may need to grant Railway access to GitHub). Railway will create a new **service** for your app.
4. **Add a database:** In the same project, click **+ New** → **Database** → **Add PostgreSQL**. Railway creates a Postgres database and shows it as a second service.
5. **Connect the app to the database:**  
   - Click your **app service** (the first one, not the database).  
   - Go to **Variables** (or **Settings** → **Variables**).  
   - Click **Add variable** or **Reference**. You should see an option to reference the Postgres service’s `DATABASE_URL` (e.g. “Add reference” → choose the Postgres service → select `DATABASE_URL`). That way Railway sets `DATABASE_URL` for you.  
   - If there’s no “reference” option, open the **Postgres service** → **Connect** or **Variables** tab, copy the `DATABASE_URL` value, then in the app service add a variable: Name `DATABASE_URL`, Value = that URL.
6. **Add the other env vars** in the app service’s **Variables** tab:
   - `NEXTAUTH_SECRET` — run `openssl rand -base64 32` in Terminal and paste the result.
   - `NEXTAUTH_URL` — leave empty for now; you’ll set it after the first deploy.
7. **Deploy:** Railway usually deploys automatically when you connect the repo. If not, click **Deploy** or push a new commit. Wait for the build to finish.
8. **Get your app URL:** In the app service, open **Settings** → **Networking** (or **Public Networking**). Click **Generate domain** (or similar). You’ll get a URL like `https://move-out-help-out-production.up.railway.app`. Copy it.
9. **Set NEXTAUTH_URL:** In the app service → **Variables**, add or edit `NEXTAUTH_URL` = your Railway URL (e.g. `https://move-out-help-out-production.up.railway.app`). Trigger a **Redeploy** so the app picks it up.
10. **Apply schema and seed (one time):** On your computer, set `.env`’s `DATABASE_URL` to the **Railway Postgres** connection string (from the Postgres service → **Connect** or **Variables** in Railway). Then run:
    ```bash
    cd /Users/liorazarin/Desktop/move_out_help_out
    npx prisma db push
    npx tsx prisma/seed.ts
    ```
    After that you can switch `.env` back to Neon or keep using the Railway URL for local if you prefer.

You’re in production on Railway. Add your GoDaddy domain later in the app service’s **Settings** → **Domains**.

---

## Summary

- **Stack:** Next.js, React, Prisma, PostgreSQL, NextAuth, Tailwind, TypeScript.
- **Option A:** Vercel (app) + Neon (database) — free tiers, two services.
- **Option B:** Railway — app + Postgres in one project; one dashboard, pay-after-trial.
- **Steps (either option):** Code on GitHub → Create/connect Postgres → Deploy app with `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` → Run `prisma db push` and `prisma/seed.ts` once → Set `NEXTAUTH_URL` to your real app URL and redeploy.

Connecting your GoDaddy domain later: **Vercel** → Settings → Domains; **Railway** → app service → Settings → Domains.
