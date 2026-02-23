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

## If you’re testing the **live site** (not localhost)

- **Videos:** The live site will only show the hero videos if the same three files (**hero-bg.mp4**, **hero-bg-2.mp4**, **hero-bg-3.mp4**) are in the **public** folder in the code you deploy (e.g. on Railway). Push your latest code (including those files) and redeploy.  
- **Sign-in:** The **production** database must also have the demo users. You need to run the seed **once** against the production database (using the production **DATABASE_URL**). How you do that depends on your host (e.g. Railway run command or a one-off script). After the seed runs, use the same three emails and password **demo** on the live site.

---

## Quick checklist

- [ ] Three files in **public**: **hero-bg.mp4**, **hero-bg-2.mp4**, **hero-bg-3.mp4**  
- [ ] **.env** exists and has **DATABASE_URL**  
- [ ] Ran `npx prisma db push`  
- [ ] Ran `npx tsx prisma/seed.ts`  
- [ ] Restarted the app (`npm run dev`)  
- [ ] Sign-in with **donor@moveouthelpout.org** (or nonprofit@ / coordinator@) and password **demo**
