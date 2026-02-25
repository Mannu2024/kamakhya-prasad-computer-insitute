# Kamakhya Prasad Computer Institute Website

A full-stack web application for Kamakhya Prasad Computer Institute built with Next.js 14, TypeScript, Tailwind CSS, Prisma ORM, and NextAuth.js.

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Prisma ORM + PostgreSQL (Neon / Supabase / Railway)
- **Authentication**: NextAuth.js
- **UI Components**: Custom Radix UI components
- **Validation**: Zod

## Features

### Public Website
- 🏠 Home page with hero, courses preview, stats, and testimonials
- 📚 Courses listing and detail pages
- 📝 Admission enquiry form
- 🔍 Certificate verification system
- 🖼️ Gallery
- 📞 Contact page

### Admin Panel
- 👥 Student management (CRUD)
- 📖 Course management
- 📅 Batch management
- 💰 Fee payment tracking
- ✅ Attendance marking
- 🏆 Certificate management
- 📊 Dashboard with stats
- ⚙️ Site content management

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your local PostgreSQL connection string and a random `NEXTAUTH_SECRET`.

> **Tip**: For a free cloud database during development, sign up at [neon.tech](https://neon.tech) and paste the connection string into `.env`.

### 3. Set up the database

```bash
npx prisma migrate deploy   # apply migrations
npm run seed                 # seed default courses, admin user
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) · Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

### Default Admin Credentials

| Field | Value |
|-------|-------|
| Email | `admin@kpci.edu.in` |
| Password | `admin123` |

> ⚠️ **Change these credentials immediately after first login in production!**

---

## Deploying to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mannu2024/kamakhya-prasad-computer-insitute)

### Step-by-step

1. **Push this repo to GitHub** (if not already done).

2. **Create a PostgreSQL database** — [Neon](https://neon.tech) is recommended (free tier, serverless-friendly):
   - Sign up → create a project → copy the **Pooled connection string** and the **Direct connection string**.

3. **Import the project on Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo.
   - Vercel auto-detects Next.js — no framework settings needed.

4. **Set environment variables** in the Vercel dashboard (Settings → Environment Variables):

   | Variable | Value |
   |----------|-------|
   | `DATABASE_URL` | Neon connection string (copy from Neon dashboard) |
   | `NEXTAUTH_URL` | `https://your-project.vercel.app` |
   | `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` and paste the output |
   | `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name (for photo uploads) |
   | `CLOUDINARY_UPLOAD_PRESET` | Your Cloudinary unsigned upload preset name |

5. **Deploy** — Vercel runs `npm install` (which also runs `prisma generate` via the `postinstall` hook) then `next build`.

6. **Run the database migration once** after the first deploy:
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel env pull && npx prisma migrate deploy && npm run seed`
   - Or use the Neon/Supabase dashboard SQL editor to run `prisma/migrations/20260225182851_init/migration.sql` and then seed via a one-off script.

---

## Deploying to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Mannu2024/kamakhya-prasad-computer-insitute)

### Step-by-step

1. **Push this repo to GitHub** (if not already done).

2. **Create a PostgreSQL database** — [Neon](https://neon.tech) or [Supabase](https://supabase.com) (both have free tiers).

3. **Import the project on Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com) → *Add new site* → *Import an existing project* → connect GitHub.
   - Netlify reads `netlify.toml` automatically — no extra build settings needed.

4. **Set environment variables** in the Netlify dashboard (Site configuration → Environment variables):

   | Variable | Value |
   |----------|-------|
   | `DATABASE_URL` | PostgreSQL connection string |
   | `NEXTAUTH_URL` | `https://your-project.netlify.app` |
   | `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` and paste the output |
   | `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name (for photo uploads) |
   | `CLOUDINARY_UPLOAD_PRESET` | Your Cloudinary unsigned upload preset name |

5. **Deploy** — Netlify runs `npm install` then `npm run build`. The `postinstall` hook handles `prisma generate` automatically.

6. **Run the database migration once** using the Netlify CLI or your database provider's dashboard:
   ```bash
   npx netlify env:pull .env.prod
   DATABASE_URL=$(grep DATABASE_URL .env.prod | cut -d= -f2) npx prisma migrate deploy
   DATABASE_URL=$(grep DATABASE_URL .env.prod | cut -d= -f2) npm run seed
   ```

---

## Setting up Cloudinary (Photo Uploads)

Photo uploads in admin require Cloudinary. It's free for up to 25 GB storage.

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. In the dashboard, note your **Cloud Name**
3. Go to **Settings → Upload → Upload presets** → click *Add upload preset*
   - Set *Signing mode* to **Unsigned**
   - Note the preset name (e.g. `kpci_uploads`)
4. Set `CLOUDINARY_CLOUD_NAME` and `CLOUDINARY_UPLOAD_PRESET` in your deployment environment variables

> Without Cloudinary configured, the app works normally — only the admin photo upload button will return an error.

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `NEXTAUTH_URL` | ✅ | Full URL of your deployed site |
| `NEXTAUTH_SECRET` | ✅ | Random secret for JWT signing |
| `CLOUDINARY_CLOUD_NAME` | For uploads | Cloudinary cloud name |
| `CLOUDINARY_UPLOAD_PRESET` | For uploads | Cloudinary unsigned preset name |

---

## Project Structure

```
├── app/
│   ├── (public)/          # Public website pages
│   │   ├── page.tsx       # Home
│   │   ├── about/
│   │   ├── courses/
│   │   ├── admission/
│   │   ├── verify/
│   │   ├── gallery/
│   │   └── contact/
│   ├── admin/             # Admin panel
│   │   ├── login/
│   │   ├── students/
│   │   ├── courses/
│   │   ├── fees/
│   │   └── ...
│   └── api/               # API routes
├── components/
│   └── ui/                # UI components
├── lib/
│   ├── prisma.ts          # Prisma client
│   ├── auth.ts            # NextAuth config
│   └── utils.ts           # Utilities
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── migrations/        # PostgreSQL migrations
│   └── seed.ts            # Sample data
├── netlify.toml           # Netlify deployment config
└── vercel.json            # Vercel deployment config
```
