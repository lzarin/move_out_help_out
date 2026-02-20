# Deploy Move Out Help Out — Do Exactly This (in order)

Follow every step in order. Don’t skip any. If something doesn’t look the same on your screen, do the step that’s closest to what you see.

---

## Fix: “Internal Server Error” or “URL must start with postgresql://” when signing in or opening the dashboard

The app is set up to use **SQLite** on your computer (the `file:./dev.db` in your `.env`). You don’t need to change anything for local use. If you see an error about Postgres or “URL must start with postgresql://”, it usually means the schema was switched to Postgres; the project is back to SQLite now, so restart your dev server (**Ctrl+C**, then **npm run dev**) and try again.

---

## Part 1: Put your code on GitHub

### 1.1 Create a GitHub account (if you don’t have one)

1. Open a browser and go to: **https://github.com**
2. Click **Sign up** and create an account. Remember your username and password.

### 1.2 Create a new empty repository

1. Stay on **github.com**. Make sure you’re logged in (your profile picture or username is top right).
2. Click the **+** icon (top right) → click **New repository**.
3. Under **Repository name** type: **move-out-help-out**
4. Leave everything else as-is. Do **not** check “Add a README file”.
5. Scroll down and click the green **Create repository** button.

### 1.3 Push your project from your computer

1. On your Mac, open **Terminal** (search for “Terminal” in Spotlight, or find it in Applications → Utilities).
2. Copy and paste this **entire block** into Terminal, then press **Enter**:

   ```bash
   cd /Users/liorazarin/Desktop/move_out_help_out
   ```

3. Then copy and paste this block and press **Enter** (replace **YOUR_GITHUB_USERNAME** with your real GitHub username, e.g. if your username is `jane` then type `jane`):

   ```bash
   git add .
   git status
   ```

   You should see a list of files. That’s fine.

4. Then run:

   ```bash
   git commit -m "Ready for production"
   ```

5. Then run (again replace **YOUR_GITHUB_USERNAME** with your GitHub username):

   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/move-out-help-out.git
   git branch -M main
   git push -u origin main
   ```

6. If it asks for **Username**: type your GitHub username and press Enter.
7. If it asks for **Password**: you **cannot** use your normal GitHub password. You need a **Personal Access Token**:
   - Open a new browser tab → go to **https://github.com** → click your profile picture (top right) → **Settings**.
   - In the left sidebar, scroll down and click **Developer settings**.
   - Click **Personal access tokens** → **Tokens (classic)**.
   - Click **Generate new token** → **Generate new token (classic)**.
   - Under **Note** type: **deploy**
   - Under **Expiration** pick **90 days** (or whatever you prefer).
   - Under **Scopes** check **repo** (full control of private repositories).
   - Scroll down and click **Generate token**.
   - **Copy the token** (it looks like `ghp_xxxxxxxxxxxx`). You won’t see it again.
   - Back in Terminal, when it asks for **Password**, **paste this token** and press Enter (you won’t see anything as you paste — that’s normal).

8. When the command finishes without errors, your code is on GitHub. You can close Terminal for now.

---

## Part 2: Deploy on Railway (app + database)

**Before you deploy:** The app uses SQLite on your Mac. Railway needs **PostgreSQL**. So right before your first deploy, in Cursor open **prisma/schema.prisma**, find the line `provider = "sqlite"`, and change it to `provider = "postgresql"`. Save the file, then in Terminal run `git add .`, `git commit -m "Use Postgres for production"`, and `git push`. After that, continue below. (Your local `.env` still uses `file:./dev.db`; that’s fine for local. Railway will use its own Postgres URL.)

### 2.1 Sign up and create a project

1. Open a browser and go to: **https://railway.app**
2. Click **Login** (or **Start a New Project**). Choose **Login with GitHub** and allow Railway to access your GitHub if it asks.
3. Click **New Project**.
4. Click **Deploy from GitHub repo**.
5. If you see “Configure GitHub App” or “Install GitHub App”, click it and allow Railway to see your repositories. Then go back to Railway and click **Deploy from GitHub repo** again.
6. Click your repo: **move-out-help-out**. Railway will start deploying. Wait until you see a **service** (a box with your app name). This can take 1–2 minutes.

### 2.2 Add the database

1. On the same project screen, click **+ New** (or **Add a service**).
2. Click **Database** → **Add PostgreSQL** (or **Postgres**). Wait a few seconds until you see a second box (the database).
3. You now have two boxes: one is your **app**, one is **PostgreSQL**.

### 2.3 Connect the database to your app

1. Click the **first box** (your app — it might say “move-out-help-out” or “Web Service”), **not** the database box.
2. Click the **Variables** tab (or **Settings** then **Variables**).
3. Look for **Add variable** or **New variable** or **Reference**.  
   - If you see **Add a variable reference** or **Reference**: click it, choose the **PostgreSQL** service, then choose **DATABASE_URL**. That adds the database link.  
   - If you don’t see that: click the **PostgreSQL** box → open the **Variables** or **Connect** tab → find **DATABASE_URL** and copy its value (the long line that starts with `postgresql://`). Go back to your **app** box → **Variables** → **Add variable** → Name: **DATABASE_URL**, Value: paste that long line → Save.

### 2.4 Add NEXTAUTH_SECRET

1. Still in your **app** service → **Variables**.
2. On your Mac, open **Terminal** again. Run:

   ```bash
   openssl rand -base64 32
   ```

   Copy the line it prints (no spaces, one long string).

3. Back in Railway, click **Add variable** (or **New variable**).  
   - Name: **NEXTAUTH_SECRET**  
   - Value: paste what you copied from Terminal  
   - Save.

### 2.5 Get your app URL and set NEXTAUTH_URL

1. In your **app** service, open the **Settings** tab (or the **Deployments** or **Networking** tab).
2. Find **Public Networking** or **Generate domain** or **Settings** → **Networking**. Click **Generate domain** (or **Add domain**). Railway will give you a URL like **https://move-out-help-out-production-xxxx.up.railway.app**. Copy that **entire** URL.
3. Go back to the **Variables** tab for your app.
4. Add another variable:  
   - Name: **NEXTAUTH_URL**  
   - Value: paste the URL you just copied (e.g. `https://move-out-help-out-production-xxxx.up.railway.app`) — no space at the end, no slash at the end.  
   - Save.
5. Trigger a new deploy so the app uses the new variable: open the **Deployments** tab, click the **⋯** (three dots) on the latest deployment, then **Redeploy** (or push a small change to GitHub and Railway will redeploy).

### 2.6 Create the database tables and demo users (one time, from your computer)

1. Get the database URL from Railway:  
   - In Railway, click the **PostgreSQL** box (the database).  
   - Open **Variables** or **Connect**.  
   - Find **DATABASE_URL** (or **Postgres Connection URL**). Click **Copy** (or select and copy the full line).

2. On your Mac, open the **move_out_help_out** project in Cursor (or any text editor). Open the **.env** file.

3. Find the line that says **DATABASE_URL=**. Replace everything after the `=` with your **Railway database URL** (paste it and keep the quotes). The line should look like:

   ```
   DATABASE_URL="postgresql://postgres:xxxxx@xxxxx.railway.app:5432/railway?sslmode=require"
   ```

   Save the file.

4. Open **Terminal**. Run these three commands **one at a time** (press Enter after each):

   ```bash
   cd /Users/liorazarin/Desktop/move_out_help_out
   ```

   ```bash
   npx prisma db push
   ```

   Wait until it says something like “Your database is now in sync”. Then run:

   ```bash
   npx tsx prisma/seed.ts
   ```

   Wait until it says “Seed complete”.

5. (Optional) If you want to use your old local database again for development, you can change **DATABASE_URL** in **.env** back to your old value (e.g. `file:./dev.db` if you had that). For production, Railway already has the correct URL.

---

## Part 3: Check that it works

1. In Railway, open your **app** service and copy the **public URL** again (the one you used for **NEXTAUTH_URL**).
2. Paste that URL into your browser and press Enter. You should see your Move Out Help Out home page.
3. Click **Get started** (or go to the login page). Sign in with:
   - Email: **donor@moveouthelpout.org**
   - Password: **demo**

If that works, you’re in production.

---

## If something goes wrong

- **“git: command not found”**  
  You need to install Git: go to **https://git-scm.com**, download and install, then try again from step 1.3.

- **GitHub says “repository not found” or “access denied”**  
  Make sure you replaced **YOUR_GITHUB_USERNAME** with your real username, and that you created the repo **move-out-help-out** on GitHub.

- **Railway build fails**  
  In Railway, click the failed deployment and read the error. Often it’s a missing variable: check that **DATABASE_URL**, **NEXTAUTH_SECRET**, and **NEXTAUTH_URL** are all set in the app’s **Variables** tab.

- **Sign-in doesn’t work on the live site**  
  Check that **NEXTAUTH_URL** in Railway is **exactly** your app’s public URL (the one in the browser), with **https://**, no trailing slash.

- **“Database” or “Prisma” error**  
  Make sure you ran **npx prisma db push** and **npx tsx prisma/seed.ts** (step 2.6) with the **Railway** database URL in your **.env**.

---

## Summary checklist

- [ ] GitHub account created  
- [ ] Repo **move-out-help-out** created on GitHub  
- [ ] Code pushed from Terminal (git add, commit, remote, push)  
- [ ] Railway account + New Project from GitHub repo  
- [ ] PostgreSQL database added in same project  
- [ ] **DATABASE_URL** set on the app (reference or paste from Postgres)  
- [ ] **NEXTAUTH_SECRET** set (from `openssl rand -base64 32`)  
- [ ] **NEXTAUTH_URL** set to your Railway app URL  
- [ ] App domain generated in Railway  
- [ ] **npx prisma db push** and **npx tsx prisma/seed.ts** run once with Railway DB URL in .env  
- [ ] Opened live URL in browser and signed in with donor@moveouthelpout.org / demo  

When all are done, you’re live. You can connect your GoDaddy domain later in Railway (app service → Settings → Domains).
