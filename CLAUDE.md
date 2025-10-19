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
old/                   # Legacy static HTML files (archived)
public/                # Static assets
```

## Path Aliases

- `@/*` maps to `src/*` (configured in `tsconfig.json`)

## TypeScript Configuration

- Target: ES2017
- Strict mode enabled
- Module resolution: bundler
- Next.js plugin enabled for type checking

## Architecture Notes

- Uses Next.js App Router (not Pages Router)
- Server Components by default (React 19)
- Turbopack enabled for faster builds and development
- No custom Next.js configuration currently (default settings)
