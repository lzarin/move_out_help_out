# Baby steps: Fix videos + sign-in

Do these in order. Check each step before going to the next.

---

## Part A: Get the video files on your computer

The hero needs the actual `.mp4` files inside your project’s `public/` folder. Right now they’re not there.

### Step A1: Get the three videos into `public/`

Choose one:

**Option 1 – You already have them on GitHub**  
1. Open your repo on GitHub in the browser.  
2. Go into the `public` folder.  
3. Click `hero-bg.mp4`, then click **Download** (or right‑click → Save link as).  
4. Save it into your project’s `public` folder:  
   `.../move_out_help_out/public/`  
   Name must be exactly: **hero-bg.mp4** (with a dash, not underscore).  
5. Repeat for **hero-bg-2.mp4** and **hero-bg-3.mp4** — same folder, same names.

**Option 2 – You have the files somewhere else (Desktop, Downloads, etc.)**  
1. Open Finder and go to your project folder, then into **public**.  
2. Copy your three video files into **public**.  
3. Rename them so they are exactly:  
   - **hero-bg.mp4**  
   - **hero-bg-2.mp4**  
   - **hero-bg-3.mp4**  
   (Use a dash between words, not a space or underscore.)

### Step A2: Confirm the files are there

1. In Cursor, in the left sidebar, expand the **public** folder.  
2. You should see: **hero-bg.mp4**, **hero-bg-2.mp4**, **hero-bg-3.mp4**.  
3. If you don’t see all three, repeat Step A1 until they’re in **public** with those exact names.

### Step A3: Restart the app and refresh the page

1. In the terminal where the app is running, press **Ctrl+C** to stop it.  
2. Run: `npm run dev`  
3. When it says “Ready”, open the site in your browser (e.g. http://localhost:3000).  
4. Do a **hard refresh**: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows).  
5. The hero should show the first video; when it ends, the second and third should play, then repeat.

If the videos still don’t play, open Developer Tools (F12 or right‑click → Inspect), go to the **Console** tab, and see if there are red errors (e.g. 404 for one of the video files). That usually means the filename or folder is wrong.

---

## Part B: Fix sign-in (emails + password “demo”)

Sign-in only works if the database has the demo users and you use the exact emails and password below.

### Step B1: Open your project in the terminal

1. Open **Terminal** (Mac) or **Command Prompt** / **PowerShell** (Windows).  
2. Go to your project folder, for example:  
   ```bash
   cd /Users/liorazarin/Desktop/move_out_help_out
   ```
   (Use your real path if it’s different.)

### Step B2: Check your `.env` file

1. In Cursor, open the file **.env** in the project root (same level as **package.json**).  
2. You should see something like:  
   - `DATABASE_URL="file:./dev.db"` (for local SQLite), or  
   - `DATABASE_URL="postgresql://..."` (for Neon/Railway, etc.).  
3. If **.env** is missing or **DATABASE_URL** is missing, copy **.env.example** to **.env** and set **DATABASE_URL** (e.g. `DATABASE_URL="file:./dev.db"` for local).

### Step B3: Create/update the database and add demo users

In the same terminal (from Step B1), run these **one at a time** and wait until each finishes:

```bash
npx prisma db push
```

(Wait for “in sync” or no errors.)

```bash
npx tsx prisma/seed.ts
```

(Wait for “Seed complete” or similar.)

If you see errors, read them: often it’s a wrong **DATABASE_URL** (e.g. typo, or SQLite vs Postgres mismatch).

### Step B4: Restart the app

1. If the app is running, stop it with **Ctrl+C** in the terminal.  
2. Start it again:  
   ```bash
   npm run dev
   ```  
3. Wait until it says “Ready”.

### Step B5: Sign in with the exact demo emails and password

1. Open the sign-in page (e.g. http://localhost:3000/login).  
2. Use **one** of these emails (copy–paste to avoid typos):  
   - **donor@moveouthelpout.org**  
   - **nonprofit@moveouthelpout.org**  
   - **coordinator@moveouthelpout.org**  
3. Password: **demo** (all lowercase, no spaces).  
4. Choose the role that matches the email (Donor / Nonprofit / Volunteer).  
5. Click **Sign in**.

If it still says “Sign in failed”:

- Make sure you ran **Step B3** (`db push` and `seed`) **after** fixing **.env**.  
- Try again with **donor@moveouthelpout.org** and password **demo**, role **Donor**.

---

## Part C: Fix sign-in on the **live site** (www.moveouthelpout.com)

If the email field clears when you click Sign in and nothing happens (or you get sent back to the login page), it’s usually one of these:

1. **The form was reloading the page** — The login form was updated so it no longer does a full-page submit; the email and error message should stay visible. Deploy the latest code (see “Sync and deploy” below).
2. **Demo users don’t exist in production** — The live site uses a **different database** than your laptop. That database must be seeded once with the demo accounts.
3. **NEXTAUTH_URL is wrong** — On the host (e.g. Railway), `NEXTAUTH_URL` must be exactly your live URL, e.g. `https://www.moveouthelpout.com`, and `NEXTAUTH_SECRET` must be set.

### Step C1: Sync Git and deploy

1. In Cursor, click **Sync Changes** (or run `git pull origin main --no-rebase`, then fix any conflicts, then `git push origin main`) so the live site gets the latest login form and auth code.
2. Redeploy the app on Railway (or your host) so the new code is live.

### Step C2: Set environment variables on the host

1. In **Railway** (or your host), open your project → **Variables** (or **Environment**).
2. Ensure these are set:
   - **NEXTAUTH_URL** = `https://www.moveouthelpout.com` (use your exact live URL, with https).
   - **NEXTAUTH_SECRET** = any long random string (e.g. run `openssl rand -base64 32` locally and paste the result).
   - **DATABASE_URL** = your **production** PostgreSQL connection string (from Railway Postgres or your DB provider).
3. Save and redeploy if the host doesn’t auto-redeploy.

### Step C3: Seed the production database (one-time)

The live site needs the three demo users in **its** database. From your **local** machine, run the seed against the **production** database:

1. **Temporarily** point your local `.env` at production (or use a separate `.env.production` that’s not committed):
   - Set **DATABASE_URL** to the **same** PostgreSQL URL you use in Railway for the app.
2. In the terminal:
   ```bash
   cd /Users/liorazarin/Desktop/move_out_help_out
   npx prisma db push
   npm run db:seed
   ```
3. **Restore** your local **DATABASE_URL** in `.env` back to `file:./dev.db` (or your usual local DB) so you don’t overwrite local data.

After this, the live site’s database will have donor@moveouthelpout.org, nonprofit@moveouthelpout.org, and coordinator@moveouthelpout.org with password **demo**.

### Step C4: Try sign-in on the live site again

1. Open https://www.moveouthelpout.com/login (or your live URL).
2. Email: **donor@moveouthelpout.org** (copy–paste).
3. Password: **demo**.
4. Sign in as: **Donor**.
5. Click **Sign in**.

If it still fails, you should now see an error message under the button instead of the email clearing. Use that message to debug (e.g. “Wrong email or password” = DB not seeded or wrong URL; “Database error” = DATABASE_URL or connectivity).

---

## If you’re testing the **live site** (not localhost) — short version

- **Videos:** Deploy code that includes **hero-bg.mp4**, **hero-bg-2.mp4**, **hero-bg-3.mp4** in **public/**.
- **Sign-in:** Set **NEXTAUTH_URL** and **NEXTAUTH_SECRET** on the host; run the seed **once** against the production **DATABASE_URL**; use the three demo emails and password **demo**.

---

## Quick checklist

- [ ] Three files in **public**: **hero-bg.mp4**, **hero-bg-2.mp4**, **hero-bg-3.mp4**  
- [ ] **.env** exists and has **DATABASE_URL**  
- [ ] Ran `npx prisma db push`  
- [ ] Ran `npx tsx prisma/seed.ts`  
- [ ] Restarted the app (`npm run dev`)  
- [ ] Sign-in with **donor@moveouthelpout.org** (or nonprofit@ / coordinator@) and password **demo**
