# Fix sign-in (Internal Server Error) — step by step on Mac

Do these steps in order. Use Cursor and the Terminal on your Mac.

---

## Step 1: Create a free database online

1. Open **Safari** (or Chrome) and go to: **https://neon.tech**
2. Click **Sign up** (or **Login** if you have an account).
3. Sign up with **GitHub** or **Email** — your choice. Finish signing up.
4. You’ll see “Create a project” or a dashboard. Click **New Project** or **Create a project**.
5. **Project name:** type **moveout** (or anything).
6. **Region:** pick one (e.g. **US East**). Leave the rest as-is.
7. Click **Create project**.
8. On the next screen you’ll see a box with a long line that starts with **postgresql://** and has words like **user**, **password**, **ep-...**, **neon.tech**. That’s your “connection string.”
9. Click the **Copy** button next to that line (or select the whole line and press **Cmd+C**). You’ve copied the database address. Leave the browser tab open in case you need to copy again.

---

## Step 2: Put that address into your project

1. Open **Cursor** and open your project folder: **move_out_help_out** (the one that has **.env** in it).
2. In the **left sidebar** in Cursor, click the file **.env** to open it.
3. Find the line that says:
   ```env
   DATABASE_URL="file:./dev.db"
   ```
4. **Delete** that whole line and replace it with this (paste your copied line between the quotes):
   ```env
   DATABASE_URL="PASTE YOUR COPIED LINE HERE"
   ```
   So it will look something like (your line will be different):
   ```env
   DATABASE_URL="postgresql://neondb_owner:abc123@ep-cool-name-12345.us-east-1.aws.neon.tech/neondb?sslmode=require"
   ```
   Don’t add extra spaces. Don’t remove the quotes. Save the file (**Cmd+S**).

---

## Step 3: Tell the database how to store your app’s data

1. On your Mac, open **Terminal** (press **Cmd+Space**, type **Terminal**, press **Enter**).
2. Copy this line, paste it into Terminal, press **Enter**:
   ```bash
   cd /Users/liorazarin/Desktop/move_out_help_out
   ```
3. Then copy this line, paste into Terminal, press **Enter**:
   ```bash
   npx prisma db push
   ```
   Wait until it says something like “Your database is now in sync” or finishes without errors.
4. Then copy this line, paste into Terminal, press **Enter**:
   ```bash
   npx tsx prisma/seed.ts
   ```
   Wait until it says “Seed complete” or similar.

---

## Step 4: Restart the app and try signing in

1. If your app is running (you ran **npm run dev** before), go to the Terminal window where it’s running and press **Ctrl+C** to stop it.
2. In Terminal, run (paste and press **Enter**):
   ```bash
   cd /Users/liorazarin/Desktop/move_out_help_out
   npm run dev
   ```
3. Wait until it says something like “Ready” and shows a URL like **http://localhost:3000** (or 3002).
4. Open that URL in your browser (e.g. **http://localhost:3000**).
5. Click **Get started** (or go to the sign-in page).
6. Sign in with:
   - **Email:** **donor@moveouthelpout.org**
   - **Password:** **demo**

If that works, sign-in is fixed. If you still see an error, say what you see (the exact message or a screenshot) and we can fix it.
