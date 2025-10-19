# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the flipperselskapet.no website, built with Next.js 15.5 and React 19. The project recently migrated from static HTML files (now in `old/` directory) to a modern Next.js application using the App Router architecture.

## Package Manager

This project uses **pnpm** (version 10.18.3+). Always use `pnpm` commands, not npm or yarn.

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server with Turbopack
pnpm dev

# Build for production with Turbopack
pnpm build

# Start production server
pnpm start

# Lint code with Biome
pnpm lint

# Format code with Biome
pnpm format

# Database commands (Drizzle ORM)
pnpm run db:generate  # Generate migration files after schema changes
pnpm run db:push      # Push schema changes to local dev database
pnpm run db:migrate   # Run migrations
pnpm run db:studio    # Open Drizzle Studio (database GUI)
```

Development server runs at http://localhost:3000

## Tooling

- **Linter/Formatter**: Biome (not ESLint/Prettier)
  - Config: `biome.json`
  - Uses recommended rules for Next.js and React
  - Auto-organizes imports on format
  - Indentation: 2 spaces

- **Styling**: Tailwind CSS v4 with PostCSS
  - Uses inline theme configuration in `src/app/globals.css`
  - Dark mode via `prefers-color-scheme`
  - Custom color tokens: `--background` and `--foreground`

- **Fonts**: Geist Sans and Geist Mono via `next/font/google`
  - Loaded in `src/app/layout.tsx`
  - Available as CSS variables: `--font-geist-sans` and `--font-geist-mono`

## Project Structure

```
src/
  app/                 # Next.js App Router
    layout.tsx         # Root layout with font loading and metadata
    page.tsx           # Homepage
    globals.css        # Tailwind imports and theme tokens
    xmas/              # XMAS Tournament pages
      page.tsx         # Tournament information page
      register/        # Registration functionality
        page.tsx       # Registration page
        registration-form.tsx  # Client-side form with Turnstile captcha
        actions.ts     # Server action for registration submission
      admin/           # Admin panel (password protected)
        page.tsx       # Admin dashboard
        actions.ts     # Admin actions (verify, paid, delete)
        login-actions.ts # Authentication actions
        admin-login.tsx  # Login form
        registration-row.tsx # Table row component
        logout-button.tsx # Logout button
      players/         # Public player list
        page.tsx       # Registered players list
  db/                  # Database configuration and schema
    index.ts           # Database connection and Drizzle client
    schema.ts          # Database schema definitions
  env.ts               # Environment variables validation (T3 Env)
old/                   # Legacy static HTML files (archived)
public/                # Static assets
supabase/
  migrations/          # Database migration files
```

## Path Aliases

- `~/*` maps to `src/*` (configured in `tsconfig.json`)

## TypeScript Configuration

- Target: ES2017
- Strict mode enabled
- Module resolution: bundler
- Next.js plugin enabled for type checking

## Database

- **ORM**: Drizzle ORM with PostgreSQL
- **Schema Location**: `src/db/schema.ts`
- **Database Client**: `postgres` package
- **Configuration**: `drizzle.config.ts` at project root
- **Environment Variables**: Validated via T3 Env (`src/env.ts`)
- **Migrations**: Stored in `supabase/migrations/`

### Database Schema

**Registrations Table** (`registrations`):
- Tournament selections: `mainTournament`, `warmupTournament`, `sideTournament` (boolean)
- Personal info: `firstName`, `lastName`, `email`, `phone`, `ifpaNumber` (text)
- Admin fields: `verifiedAt`, `paidAt`, `deletedAt` (timestamp, nullable)
- Metadata: `createdAt`, `updatedAt` (timestamp)

### Database Workflow

1. **Update Schema**: Edit `src/db/schema.ts` to define tables and relations
2. **Generate Migrations**: Run `pnpm run db:generate` to create migration files
3. **Apply Changes**: Run `pnpm run db:push` to push changes to local dev database
4. **GUI Access**: Run `pnpm run db:studio` to open Drizzle Studio for visual database management

The database connection is initialized in `src/db/index.ts` and exported as a Drizzle client instance for use throughout the application.

## XMAS Tournament Registration System

The project includes a complete tournament registration system for the XMAS Matchplay Open 2025 tournament:

### Features

1. **Public Pages**:
   - `/xmas` - Tournament information and schedule
   - `/xmas/register` - Registration form with Cloudflare Turnstile captcha
   - `/xmas/players` - List of verified registered players

2. **Admin Panel** (`/xmas/admin`):
   - Password protected (cookie-based auth)
   - View all registrations with statistics
   - Mark players as verified/paid
   - Soft-delete registrations
   - Logout functionality

3. **Auto-Verification**:
   - First N registrations are automatically verified (configured via `AUTO_VERIFY_LIMIT`)
   - Based on count of non-deleted registrations
   - Admins can manually verify beyond the limit

4. **Security**:
   - Cloudflare Turnstile captcha prevents spam
   - Admin password via environment variable
   - HTTP-only cookies for admin auth
   - Server-side validation

### Environment Variables

Required environment variables (add to `.env`):
- `DATABASE_POSTGRES_URL` - PostgreSQL connection string
- `TURNSTILE_SECRET_KEY` - Cloudflare Turnstile secret key
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - Cloudflare Turnstile site key (public)
- `ADMIN_PASSWORD` - Admin panel password (min 8 characters)
- `AUTO_VERIFY_LIMIT` - Number of auto-verified registrations (default: 50)

## Architecture Notes

- Uses Next.js App Router (not Pages Router)
- Server Components by default (React 19)
- Turbopack enabled for faster builds and development
- No custom Next.js configuration currently (default settings)
- PostgreSQL database managed via Drizzle ORM
- Cookie-based authentication for admin panel
