# Push to production (one platform, step-by-step)

**Stack:** Next.js 15, React, Prisma, PostgreSQL, NextAuth, Tailwind CSS, TypeScript. Your app runs as one Next.js app (frontend + API routes) and needs a database. Everything can live on **one platform**.

**Recommended host:** **Railway**. One place for your app and your database. No free-tier limits; your school can pay. You’ll connect your GoDaddy domain later.

Do the steps below in order. Don’t skip any.

---

## Step 1: Switch the app to PostgreSQL (one-time)

Right now the app uses SQLite on your computer. Production will use PostgreSQL on Railway.

1. In **Cursor**, open **`prisma/schema.prisma`**.
2. Find this block:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
3. Change **`sqlite`** to **`postgresql`** so it looks like:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Save the file (**Cmd+S**).

Your app on your Mac will still use SQLite until you change it back (your `.env` still has `file:./dev.db`). That’s fine. We only need Postgres for production on Railway.

---

## Step 2: Put your code on GitHub

1. Go to **https://github.com** and sign in.
2. Click the **+** (top right) → **New repository**.
3. **Repository name:** `move-out-help-out` (or any name you like).
4. Leave “Add a README” **unchecked**. Click **Create repository**.
5. On your Mac, open **Terminal** and run these commands **one at a time** (replace **YOUR_GITHUB_USERNAME** with your real GitHub username):

   ```bash
   cd /Users/liorazarin/Desktop/move_out_help_out
   git add .
   git commit -m "Ready for production"
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/move-out-help-out.git
   git branch -M main
   git push -u origin main
   ```

   If it asks for a password, use a **Personal Access Token** from GitHub (Settings → Developer settings → Personal access tokens → Generate new token; give it **repo** access). Paste the token when Terminal asks for the password.

6. When the last command finishes, your code is on GitHub.

---

## Step 3: Create a project on Railway

1. Go to **https://railway.app** and sign in (use **Login with GitHub**).
2. Click **New Project**.
3. Choose **Deploy from GitHub repo**.
4. If Railway asks to install the GitHub app, allow it. Then pick your repo: **move-out-help-out** (or whatever you named it).
5. Railway will create a **service** for your app and start building. Wait until the build finishes (you may see “Success” or a green check). Don’t worry about errors yet; we still need to add the database and env vars.

---

## Step 4: Add the database on Railway

1. On the same **project** page (where you see your app service), click **+ New**.
2. Click **Database** → **Add PostgreSQL** (or **Postgres**).
3. Wait until the database service appears (a second box/card). You now have two services: **your app** and **PostgreSQL**.

---

## Step 5: Connect the database to your app

1. Click the **app service** (the first one, not the database).
2. Open the **Variables** tab (or **Settings** → **Variables**).
3. Add the database URL:
   - If you see **Add variable reference** or **Reference**: use it, choose the **PostgreSQL** service, then select **DATABASE_URL**. That fills in the database URL for you.
   - If not: click the **PostgreSQL** service, open **Variables** or **Connect**, copy the value of **DATABASE_URL** (the long line starting with `postgresql://`). Go back to the app service → **Variables** → **Add variable** → Name: **DATABASE_URL**, Value: paste that URL → Save.
4. Add two more variables for the app:
   - **NEXTAUTH_SECRET** — On your Mac, in Terminal run:  
     `openssl rand -base64 32`  
     Copy the output. In Railway, add variable: Name **NEXTAUTH_SECRET**, Value paste that string.
   - **NEXTAUTH_URL** — Leave this for the next step; we’ll set it after we get the app URL.

---

## Step 6: Get your app’s public URL and set NEXTAUTH_URL

1. In the **app service**, open **Settings** (or the **Deployments** / **Networking** tab).
2. Find **Public Networking** or **Generate domain** (or **Settings** → **Networking**). Click **Generate domain** (or **Add domain**). Railway will give you a URL like **https://move-out-help-out-production-xxxx.up.railway.app**. Copy that **entire** URL.
3. Go back to the app’s **Variables** tab. Add (or edit):
   - Name: **NEXTAUTH_URL**
   - Value: the URL you just copied (e.g. `https://move-out-help-out-production-xxxx.up.railway.app`) — no space, no slash at the end.
4. Save. Railway will redeploy the app with the new variable (or click **Redeploy** if you see it).

---

## Step 7: Create the database tables and demo data (one time, from your computer)

Railway runs your app; it doesn’t run Prisma for you. So you run the migration once from your Mac, pointed at the production database.

1. In **Railway**, click the **PostgreSQL** service. Open **Variables** or **Connect** and copy the **DATABASE_URL** value (the full `postgresql://...` line).
2. On your Mac, open your project in Cursor. Open the **`.env`** file.
3. **Temporarily** change the **DATABASE_URL** line to the Railway Postgres URL you copied. It should look like:
   ```env
   DATABASE_URL="postgresql://postgres:xxxxx@xxxxx.railway.app:5432/railway?sslmode=require"
   ```
   Save the file. (Don’t change anything else in `.env`.)
4. In **Terminal**, run:
   ```bash
   cd /Users/liorazarin/Desktop/move_out_help_out
   npx prisma db push
   npx tsx prisma/seed.ts
   ```
   Wait until you see something like “Your database is now in sync” and “Seed complete.”
5. **Change `.env` back** to your local database so your Mac keeps using SQLite for development. Put the line back to:
   ```env
   DATABASE_URL="file:./dev.db"
   ```
   Save the file.

Production now has tables and demo users. Your local setup is unchanged.

---

## Step 8: Check that production works

1. In your browser, open the **Railway app URL** (the one you used for **NEXTAUTH_URL**).
2. You should see your Move Out Help Out home page.
3. Click **Get started** (or go to the sign-in page). Sign in with:
   - Email: **donor@moveouthelpout.org**
   - Password: **demo**

If that works, you’re in production.

---

## Summary

- **Stack:** Next.js, React, Prisma, PostgreSQL, NextAuth, Tailwind, TypeScript.
- **Host:** Railway (one platform for frontend, backend, and database).
- **Steps:** Switch schema to Postgres → Push code to GitHub → Create Railway project from GitHub → Add Postgres database → Set DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL on the app → Generate public URL → Run `prisma db push` and `prisma/seed.ts` once from your Mac with the Railway DB URL → Set `.env` back to local → Open the app URL and test sign-in.

**Domain (GoDaddy):** When you’re ready, add your domain in Railway: app service → **Settings** → **Domains** → Add your domain and follow Railway’s instructions to point GoDaddy at Railway.
