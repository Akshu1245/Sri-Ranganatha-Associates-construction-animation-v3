# Sri Ranganatha Associates — Website

Production-ready website for **Sri Ranganatha Associates** — Registered Civil Engineers, Architects, Approved Valuers & Contractors in Halasru, Bengaluru.

## What's inside

```
sri-ranganatha-associates/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Home
│   ├── services/         # Services page
│   ├── portfolio/        # Portfolio gallery
│   ├── process/          # How it works
│   ├── about/            # About + founder story
│   ├── contact/          # Contact + enquiry form
│   ├── admin/            # Admin panel
│   │   ├── login/        # Admin login
│   │   └── dashboard/    # Admin dashboard
│   ├── sitemap.ts
│   ├── robots.ts
│   └── not-found.tsx
├── components/
│   ├── layout/           # Navbar, Footer, WhatsApp FAB
│   └── sections/         # Hero, StatsBar, ServicesGrid, etc.
├── lib/
│   ├── constants.ts      # Site-wide config (edit this!)
│   └── admin-store.ts    # LocalStorage admin data layer
├── public/
│   ├── portfolio/        # All portfolio images + PDFs
│   └── favicon.svg
└── package.json
```

## Quick start

```bash
# 1. Install
npm install

# 2. Configure environment variables
cp .env.example .env.local
# then edit .env.local with real values (see below)

# 3. Run dev server
npm run dev
# open http://localhost:3000

# 4. Build for production
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local` (gitignored, never commit it) and fill in:

| Variable | Purpose |
|---|---|
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Admin login credentials. Checked server-side only — never shipped to the browser. |
| `ADMIN_SESSION_SECRET` | Random secret used to sign the admin session cookie. Generate with `openssl rand -base64 32`. |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` | SMTP credentials used to email contact-form enquiries. Works with a Gmail App Password, Zoho Mail, or any SMTP provider. |
| `LEAD_TO_EMAIL` | The inbox that receives new enquiries. |

Set the same variables in your hosting provider's dashboard (e.g. Vercel → Settings → Environment Variables) before deploying.

## Admin panel

- **URL**: `/admin/login`
- Credentials come from `ADMIN_USERNAME` / `ADMIN_PASSWORD` in your environment — set these before first use.
- Login is verified server-side (`app/api/admin/login/route.ts`) and issues a signed, `httpOnly` session cookie. `middleware.ts` blocks `/admin/dashboard` for anyone without a valid session — it can no longer be bypassed from the browser console.

Admin features:
- ✅ Add / edit / delete portfolio items
- ✅ Drag-and-drop reorder
- ✅ Upload files (PDFs, images) — for working plans, sanction plans, structure details
- ✅ View & manage enquiry leads from the contact form
- ✅ All in one dashboard

> Portfolio/files/leads data is cached in browser `localStorage` per-device (so the dashboard works with zero database setup), but real contact-form enquiries are always emailed to `LEAD_TO_EMAIL` immediately on submission — that's the reliable copy, not the localStorage cache. To sync portfolio/file data across devices too, swap `lib/admin-store.ts` for a real backend (Supabase, Firebase, custom API) — the function signatures stay the same.

## Customization

### Brand info (name, phone, address, services)
→ Edit `lib/constants.ts` — the whole site updates from this single file.

### Colors & typography
→ Edit `tailwind.config.ts` (colors: `navy`, `amber`, `paper`, etc.) and `app/globals.css`.

### Services list
→ Edit the `SERVICES` array in `lib/constants.ts`.

### Portfolio
- **Default items**: `DEFAULT_PORTFOLIO` in `lib/constants.ts`
- **Add new items**: Use the admin dashboard at `/admin/login`

## Pages

| Path | Purpose |
|------|---------|
| `/` | Home — hero, services, portfolio preview, process, testimonials, CTA |
| `/services` | Full list of all 10 services with detail |
| `/portfolio` | 3D elevation gallery with filters & lightbox |
| `/process` | 5-step process + why-us section |
| `/about` | Founder story, credentials, timeline |
| `/contact` | Pre-qualification form + map + direct contact |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Admin dashboard |

## Tech stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **react-hook-form** + **zod** for form validation
- **lucide-react** for icons
- **LocalStorage** for admin data (MVP)

## Deployment

This is a static Next.js site. Deploy to:
- **Vercel** (recommended) — `vercel deploy`
- **Netlify** — `netlify deploy`
- **Hostinger / cPanel** — `npm run build` then upload `.next` and `node_modules`

Domain suggestion: `sriranganathaassociates.in` (₹800/year at GoDaddy/Hostinger)

## Contact info (edit `lib/constants.ts`)

```
Sri Ranganatha Associates
No.129/7, Cauvery Complex, 1st Floor
Opp. Metro Railway Station, Halasru
Bengaluru – 560008
Ph: +91 9448537346
Email: mrkravi2006@gmail.com
```

---

© Sri Ranganatha Associates · Built with Next.js
