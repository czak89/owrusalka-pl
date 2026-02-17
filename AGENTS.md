# Repository Guidelines

## Project Structure & Module Organization
- `src/app/` contains Next.js App Router pages, layouts, and API routes (`src/app/api/*/route.ts`).
- `src/components/` holds feature and UI components; keep reusable primitives under `src/components/ui/`.
- `src/contexts/` stores React providers (auth, language), and `src/lib/` contains helpers and data utilities.
- `public/` is for static assets and PWA files.
- `old-site/` and `exports/` contain migration/scraping artifacts; do not import runtime code from these folders.

## Build, Test, and Development Commands
- `bun install`: install dependencies from `bun.lock`.
- `bun dev`: run local development server (Turbopack).
- `bun run build`: production build and TypeScript validation (required before PR).
- `bun start`: run the built app locally.
- `bun lint`: run Biome lint fixes plus `tsc --noEmit`.
- `bun format`: format code with Biome.

## Coding Style & Naming Conventions
- Use TypeScript and React functional components.
- Prefer `@/` path alias imports (example: `import Contact from "@/components/Contact"`).
- Component files use PascalCase (example: `Header.tsx`); route handlers use `route.ts`.
- Keep styling utility-first with Tailwind; shared tokens and base styles belong in `src/app/globals.css`.
- Keep changes ASCII unless a file already requires non-ASCII content.

## Testing Guidelines
- No dedicated automated test framework is configured yet.
- Minimum validation for code changes:
  - `bun run build`
  - Manual smoke test in `bun dev` for `/`, `/admin`, and affected API routes (for contact changes: `POST /api/contact`).
- For UI changes, verify desktop and mobile layouts and include screenshots in the PR.

## Commit & Pull Request Guidelines
- Current history mostly follows Conventional Commit prefixes (`feat:`, `fix:`, `docs:`, `chore:`). Keep using them.
- Write short, imperative commit subjects (example: `feat: add contact api fallback logging`).
- PRs should include: summary, impacted routes/files, env var changes, manual test notes, and screenshots for visual updates.

## Security & Configuration Tips
- Copy `.env.example` to `.env.local`; never commit real secrets.
- Contact form delivery depends on `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (optional: `CONTACT_FROM_EMAIL`, `CONTACT_WEBHOOK_URL`).
- Validate and sanitize all external input in API routes.
