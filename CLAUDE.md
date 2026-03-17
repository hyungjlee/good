# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Korean wedding invitation single-page web app for 이형준 & 이아름 (2026-09-13). Mobile-first design constrained to 430px max-width, deployed on Vercel at hj-areum.vercel.app.

## Commands

```bash
npm run dev      # Start dev server (Next.js)
npm run build    # Production build
npm run lint     # ESLint
```

No test framework is configured.

## Tech Stack

- **Next.js 16** (App Router) with React 19, TypeScript
- **Tailwind CSS v4** — configured via `@import "tailwindcss"` + `@theme` block in `globals.css` (not `tailwind.config.js`)
- **Supabase** — Postgres backend with RLS; client (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) for reads, server (`SUPABASE_SERVICE_ROLE_KEY`) for writes/deletes
- **Motion** (framer-motion successor) — scroll-triggered animations via `AnimatedSection` wrapper
- **Kakao JS SDK** — loaded via `<script>` in layout, initialized lazily in `src/lib/kakao.ts`
- **Naver Maps** — loaded via `next/script` in `MapEmbed` component
- **bcryptjs** — guestbook password hashing (server-side only)
- **date-fns** — countdown/date calculations

## Architecture

### Data Flow

All wedding content is driven by a single config object: `src/config/wedding.ts` (typed by `src/types/wedding.ts`). Sections read from this config directly — there is no CMS or database for content.

### Page Structure

`src/app/page.tsx` renders 8 vertically stacked sections separated by decorative dividers:
Hero → Greeting → Calendar → Gallery → Location → Account → Guestbook → Footer

Each section is a `"use client"` component in `src/components/sections/`.

### API Routes (`src/app/api/`)

| Route | Methods | Purpose |
|-------|---------|---------|
| `/api/guestbook` | GET, POST, DELETE | Guestbook CRUD; DELETE requires bcrypt password verification |
| `/api/rsvp` | POST | RSVP submission (insert only) |
| `/api/map` | GET | Proxies Naver Static Map API to hide `NAVER_MAP_CLIENT_SECRET` |

All API routes use the **server** Supabase client (`service_role` key). The browser client in `src/lib/supabase/client.ts` is currently unused but available.

### Database (Supabase)

Two tables with RLS enabled — migrations in `supabase/migrations/`:
- `rsvp` — anyone can INSERT; only service_role can SELECT
- `guestbook` — anyone can INSERT/SELECT; only service_role can DELETE

### Environment Variables

See `.env.example`. Required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_KAKAO_APP_KEY`. Optional: `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`, `NAVER_MAP_CLIENT_SECRET`.

## Key Conventions

- **Korean locale** — all user-facing text is Korean; date formatting avoids `Date` timezone issues by parsing ISO strings directly (`src/lib/date.ts:parseDateParts`)
- **Fonts** — Pretendard (body) and Cormorant Garamond (accent) loaded via CDN `<link>` tags in `layout.tsx`, not via `next/font` (Safari compatibility decision per commit history)
- **Design tokens** — colors and fonts defined as CSS custom properties in `globals.css` `@theme` block, referenced via Tailwind classes (e.g., `text-primary`, `bg-bg-card`, `font-accent`)
- **All images are SVG placeholders** in `public/images/` — meant to be replaced with real wedding photos
