# Deployment Guide — Sri Ranganatha Associates Website

This is a production-ready Next.js 14 static site. You can deploy it to **any** static host.

---

## Option 1: Vercel (Recommended — Free, 5 min)

1. Push the project to a GitHub repository
2. Go to https://vercel.com → Sign in with GitHub
3. Click "Add New Project" → Import your repo
4. **Before deploying**, add these Environment Variables in the Vercel import screen (Settings → Environment Variables works too, post-deploy): `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `LEAD_TO_EMAIL` — see `.env.example` for what each does
5. Click **Deploy**
6. Buy a domain (₹800/year) at GoDaddy/Hostinger — `sriranganathaassociates.in`
7. In Vercel → Settings → Domains → Add the custom domain
8. Done. Site is live on HTTPS in 10 minutes. Admin login and the contact form will not work until the environment variables above are set.

---

## Option 2: Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=.next
```

---

## Option 3: Hostinger / cPanel / Shared hosting (₹200/month)

⚠️ **Note:** the admin login and contact-form email delivery are server-side API routes (`app/api/*`) and middleware — they require a Node.js server and will **not** work with `output: 'export'` (static export). Use a host that runs `npm start` (Node.js hosting, e.g. Hostinger's Node.js app feature, Railway, Render), and set the environment variables from `.env.example` there:

```bash
npm install
npm run build
npm start
```

If you specifically need pure static hosting (no admin login, no email — leads would fall back to nothing), remove `app/api/*`, `middleware.ts`, and the admin pages first, then add `output: 'export'` to `next.config.js`.

---

## Local development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# Open http://localhost:3000

# 3. Build for production
npm run build

# 4. Start production server
npm start
```

---

## Before going live — checklist

- [ ] Set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` in your hosting provider's environment variables (see `.env.example`)
- [ ] Set up a custom email like info@sriranganathaassociates.in (₹100/year Zoho) or use Gmail with an App Password, and set `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` / `LEAD_TO_EMAIL`
- [ ] Update real phone number / address if different
- [ ] Add real Google Maps embed (currently placeholder) in `app/about/page.tsx` and `components/sections/ContactForm.tsx`
- [ ] Add real social media links in `components/layout/Footer.tsx`
- [ ] Add Google Analytics 4 (replace `YOUR_GA_ID` placeholder in `app/layout.tsx`)
- [ ] Add your own real testimonials (currently placeholder)
- [ ] Update brand stats (plans sanctioned, years) in `lib/constants.ts`
- [ ] Test the contact form on mobile + desktop — confirm the enquiry email actually arrives
- [ ] Test admin login at `/admin/login`
- [ ] Submit sitemap to Google Search Console (https://search.google.com/search-console)

---

## What's where

| Need to change…                  | Edit file                          |
|----------------------------------|------------------------------------|
| Phone / email / address          | `lib/constants.ts`                 |
| Brand colors                     | `tailwind.config.ts`               |
| Services list                    | `lib/constants.ts` → `SERVICES`    |
| Portfolio default items          | `lib/constants.ts` → `DEFAULT_PORTFOLIO` |
| Admin login                      | Environment variables `ADMIN_USERNAME` / `ADMIN_PASSWORD` |
| WhatsApp number                  | `lib/constants.ts` → `BRAND.whatsapp` |
| Social links                     | `components/layout/Footer.tsx`     |

---

## Tech stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS (with custom navy/amber/paper palette)
- Framer Motion (scroll animations, hero, lightbox)
- react-hook-form + zod (validated contact form, validated again server-side)
- nodemailer (contact-form emails via SMTP)
- lucide-react (icons)

No CMS, no database. Portfolio/services/brand copy lives in `lib/constants.ts` (shipped with the site). Admin portfolio/files/leads are cached in the browser's localStorage per-device. Contact-form enquiries are emailed server-side via `app/api/contact/route.ts` — that's the reliable delivery path, independent of any browser's localStorage. Admin auth is verified server-side against environment variables (`app/api/admin/login/route.ts`), never shipped to the client.

---

## Backup: replace LocalStorage admin with a real backend

The admin currently uses browser localStorage. To sync across devices:

1. **Easiest**: Supabase (free tier)
   - Sign up at https://supabase.com
   - Create a `portfolio` table and a `files` table
   - Replace the localStorage functions in `lib/admin-store.ts` with Supabase calls
   - Same function signatures, swap implementation

2. **No-code**: Airtable + Next.js API routes
   - Store portfolio items in Airtable
   - Use `app/api/portfolio/route.ts` to read/write

3. **Custom**: Any REST API
   - Replace the `fetch` calls in `lib/admin-store.ts` with your endpoints

---

Questions? Email: mrkravi2006@gmail.com · Call: +91 9448537346
