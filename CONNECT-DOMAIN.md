# Connect Your GoDaddy Domain to Railway

Do these steps **after** you’ve bought the domain on GoDaddy and your app is live on Railway (with the default `*.up.railway.app` URL).

---

## 1. What to buy on GoDaddy

- Buy the name you want (e.g. **moveouthelpout.com**).
- You **don’t** need GoDaddy’s “hosting” or “website builder” for this. Just the domain.
- During checkout, **privacy protection** (Whois privacy) is optional; it won’t break connecting to Railway.

---

## 2. Add the domain in Railway (get the target)

1. In **Railway**, open your project and click your **app service** (not the database).
2. Go to **Settings** → **Networking** (or **Domains** / **Public Networking**).
3. Under **Custom Domains**, click **Add domain** or **Add custom domain**.
4. Enter your domain **exactly** as you’ll use it:
   - For **moveouthelpout.com** (no www): type **moveouthelpout.com**
   - For **www.moveouthelpout.com**: type **www.moveouthelpout.com**
   - You can add both later if you want; do one first.
5. Click **Add** (or similar). Railway will show you a **target**:
   - Often a **CNAME** target like: **`your-app-name.up.railway.app`**
   - Or instructions for an **A** record (an IP address).
6. **Copy or keep that page open** — you’ll need this target in GoDaddy in the next step.  
   Railway may say the domain is “pending” or “not configured” until DNS is set up. That’s normal.

---

## 3. Point the domain at Railway in GoDaddy (DNS)

1. Log in at **https://www.godaddy.com** → **My Products**.
2. Find your domain and click **DNS** (or **Manage DNS**).
3. You’ll see a list of **Records** (A, CNAME, etc.).

**If Railway gave you a CNAME target (e.g. `something.up.railway.app`):**

- **For the root domain (moveouthelpout.com, no www):**
  - Add or edit an **A** record:  
    - **Type:** A  
    - **Name:** `@` (or leave blank if that’s how GoDaddy shows “root”)  
    - **Value:** Railway sometimes gives you an IP; if they only gave CNAME, use a **CNAME** for `@` only if GoDaddy allows it. Many registrars do **not** allow CNAME on `@`. In that case, Railway may tell you to use an **ALIAS** or **ANAME** if GoDaddy has it, or to use **www** instead.  
  - **Easiest and most reliable:** Point **www** first (see below), then in Railway add **moveouthelpout.com** and use Railway’s recommended record (they often support CNAME flattening or give an IP for root).
- **For www (www.moveouthelpout.com):**
  - Add or edit a **CNAME** record:  
    - **Type:** CNAME  
    - **Name:** `www`  
    - **Value:** paste Railway’s target (e.g. **`your-app-name.up.railway.app`**) — no `https://`, no trailing slash, no extra dots.  
    - **TTL:** 600 or 1 Hour is fine.  
  - Save.

**If Railway gave you an A record (IP address):**

- Add or edit an **A** record:  
  - **Name:** `@` for root, or `www` for www  
  - **Value:** the IP Railway gave you.  
- Save.

**Summary:** Use the **exact** record type and value Railway shows. If Railway only shows a CNAME target, start with **www** (CNAME from `www` to that target); then add the root domain in Railway and follow whatever they show for the root.

---

## 4. Wait for DNS to update

- DNS can take from **a few minutes** up to **24–48 hours** (often 10–30 minutes).
- In Railway, the domain status should change from “pending” to “active” or show a green check when it’s working.
- You can check progress at **https://dnschecker.org** (enter your domain and look for the CNAME or A record).

---

## 5. Update your app’s URL (Railway env var)

Once the domain is working (e.g. **https://www.moveouthelpout.com** or **https://moveouthelpout.com**):

1. In **Railway** → your app service → **Variables**.
2. Find **NEXTAUTH_URL**.
3. Set it to your **live** URL:
   - **https://www.moveouthelpout.com** (no trailing slash), or  
   - **https://moveouthelpout.com** (no trailing slash)  
   — whichever one you actually use to open the site.
4. Save. Railway will redeploy. Sign-in and redirects will then use your real domain.

---

## 6. Optional: Redirect root to www (or the other way)

- If you only set up **www**: many registrars let you add a “forwarding” rule so **moveouthelpout.com** redirects to **www.moveouthelpout.com** (or the opposite). In GoDaddy: **My Products** → domain → **Forwarding** (or **Domain forwarding**). Point the bare domain to the version you’re using.
- If you only set up the **root** domain: you can later add **www** as a CNAME to the same Railway target if you want both to work.

---

## Checklist

- [ ] Domain bought on GoDaddy (no extra hosting needed).
- [ ] Custom domain added in Railway (Settings → Networking → Add domain).
- [ ] Railway’s target (CNAME or A record) copied.
- [ ] In GoDaddy DNS: CNAME for **www** (or A for root) set to Railway’s value; saved.
- [ ] Waited for DNS (up to 24–48 hours; often 10–30 min).
- [ ] Railway shows domain as active; site loads at **https://yourdomain.com**.
- [ ] **NEXTAUTH_URL** in Railway set to **https://yourdomain.com** (or **https://www.yourdomain.com**), then redeploy.
- [ ] Signed in on the new URL to confirm everything works.

If something doesn’t match (e.g. Railway shows “ALIAS” or “ANAME”), follow what Railway’s UI says for that domain; the steps above are the same idea. If you tell me your exact domain and what Railway shows (CNAME target or A record), I can give you the exact GoDaddy entries.
