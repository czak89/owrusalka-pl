# owrusalka-pl — project context

Website of Ośrodek Wypoczynkowy „Rusałka" (Łazy near Mielno, family seaside resort). Next.js App Router, static export, bound to the **Rusałka Design System** in `design-system/`. Copy is Polish, formal plural (*Państwo*). Code, comments and repo docs are English; `TODO.md` is Polish.

**Start here in a new session:** read `TODO.md` (what is next, in priority order) and `docs/DECISIONS.md` (what was decided and why). Read `AGENTS.md` before writing Next.js code: this version differs from older ones.

## Branches
- `main` — the published HTML prototype (GitHub Pages). Do not touch until the owner accepts the Next.js site.
- `html-prototype` — both prototypes merged; the design spec, the booking-wizard original and the admin-panel mockup. Read-only reference.
- `next` — this site. All work happens here.

Never push to `main`. Push to `next` only when the owner asks for it.

## Commands
```bash
npm install
npm run dev                                         # http://localhost:3000
npm run build                                       # static site in out/, domain root
NEXT_PUBLIC_BASE_PATH=/owrusalka-pl npm run build   # GitHub Pages project site
npx serve out -l 8732                               # serve the build
node scripts/check-pages.cjs http://localhost:8732/ ",pokoje/,cennik/,atrakcje/,galeria/,lato/,kontakt/,rezerwacja/" "" light 1280
node scripts/check-interactions.cjs http://localhost:8732/
```
After any change: build, then run both checks in light and dark and at 390px width. They must report no errors, `emptyIcons: 0`, `small: 0` and no horizontal overflow (`sw` equals the viewport width).

## Architecture
- `app/` — one folder per route; each `page.jsx` is a server component that sets `metadata` and renders a client component from `components/`. `layout.jsx` imports the CSS and sets the theme before first paint.
- `components/kit.jsx` — atoms and shared pieces: `Icon` (lucide-react by name, map in `icons.js`), `ImageSlot` (placeholder, or a photo from `photos.js`), `Button`, `Badge`, `TopNav` (with `ModeToggle`), `PageHero`, `Hero`, `BookingBar`, `RoomsSection`, `ROOMS`, `useBooking`.
- `components/sections.jsx`, `content-*.jsx` — page sections. `home-page.jsx`, `sub-page.jsx` (cennik, atrakcje, lato, galeria, kontakt; picked by the `page` prop), `pokoje-page.jsx` — page shells.
- `components/rez-*.jsx` — booking wizard at `/rezerwacja`, browser-only (`rez-client.jsx`, `ssr: false`) because it depends on today's date.
- `components/site-theme.jsx` — fixed site options (accent, corners, texture) and the light/dark switch. The prototype's Tweaks panel is stubbed out here; `useTweaks`, `SiteTweaks` and friends are kept as no-ops so the page shells stay close to the prototype.
- `components/base.js` — `withBase()` for every internal link and asset. Base path comes from `NEXT_PUBLIC_BASE_PATH`.
- `styles/*.css` — global CSS, imported in `app/layout.jsx` after the design-system files. `site.css` is the bulk; `content.css`, `pokoje.css`, `rez.css`, `placeholders.css` are per area.
- `design-system/` — tokens (`tokens.json`, compiled `tokens.css`), `components/bundle.css` (element defaults, focus, dark shadows, mobile type), fonts, component cards with READMEs, brand book (`README.md`).

## Rules
- Colours, fonts, spacing, radii and shadows come from `design-system/tokens.css`. No raw hex for anything a token or role covers.
- Use roles where the themes differ: `--action`, `--action-hover`, `--primary`, `--primary-hover`, `--on-accent` (label on Coral, Baltic and yellow fills: always dark), `--accent-text` (small marine text), `--surface-strong` / `--on-strong`, `--error` / `--error-surface`, `--focus-ring`, `--success-text`.
- `--c-deep-sea` is the heading colour and inverts to warm foam in the dark theme. A band that must stay dark uses `--surface-strong`.
- Dark theme = `data-theme="dark"` on `<html>`. Theme patches are written as `[data-theme="dark"] body .x`.
- Text sizes: body 16px, captions 14px, labels and badges 12px, nothing smaller. Form fields 16px.
- A label on an accent fill is never light. Hover on a filled button goes one step lighter, never darker.
- Coral is for CTAs and script callouts only, never for errors.
- Pacifico (`--font-script`) always with `font-feature-settings: "ss01" 1`, weight 400, short callouts only.
- Keyboard focus: 2px solid `--focus-ring`, 2px offset. Never remove outlines without a replacement.
- No `window` or `document` at module top level or during render; use effects.
- A new icon name must be added to `components/icons.js`; a missing one renders an empty span (the page check counts them).
- Grid tracks that hold text use `minmax(0, 1fr)`, not `1fr`, so phones do not overflow.

## Design system: two copies
The Rusałka Design System also lives as an artifact on claude.ai (type "Design System"), where the cards and tokens can be browsed and edited. `design-system/` in this repo is what the site builds from. They were identical on 2026-11-15, except that the repo copy leaves out `ui_kits/`, `source/`, `archived/`, `uploads/` and `scraps/`. Change both, or change one and copy it over; there is no sync script yet. `tokens.css` must be regenerated when `tokens.json` changes (first line: `/* Rusałka Design System — generated from tokens.json */`).

## State on 2026-11-15
Built and pushed: 7 pages plus `/rezerwacja`, both themes, base-path switch, design system v1.2. Checked in a browser: every page in light and dark at 1280px, light at 390px, plus the interaction script.
Not built: form sending, availability data, English version, real photography. Full list in `TODO.md`.
