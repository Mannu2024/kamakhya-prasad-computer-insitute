# Kamakhya Prasad Computer Institute Website

A full-stack web application for Kamakhya Prasad Computer Institute built with Next.js 14, TypeScript, Tailwind CSS, Prisma ORM, and NextAuth.js.

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM + SQLite
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

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and update the values as needed.

### 3. Set up the database

```bash
npx prisma migrate dev
npx tsx prisma/seed.ts
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

### Default Admin Credentials

- **Email**: admin@kpci.edu.in
- **Password**: admin123

> ⚠️ Change these credentials after first login in production!

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
└── prisma/
    ├── schema.prisma      # Database schema
    └── seed.ts            # Sample data
```
