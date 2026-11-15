# owrusalka-pl — project context

HTML prototype of owrusalka.pl (Ośrodek Wypoczynkowy „Rusałka", Łazy — family seaside resort). Bound to the **Rusałka Design System** (tokens in `colors_and_type.css`, self-hosted fonts, Lucide icons, Polish formal-plural voice). 7 pages: index, pokoje, cennik, atrakcje, galeria, lato, kontakt (`*.html`, all React+Babel).

## Architecture
- `kit.jsx` — shared atoms: Icon (React-safe lucide wrapper — span owns innerHTML, never let React own the swapped `<svg>`), TopNav (incl. ModeToggle sun/moon button), PageHero, Footer, BookCtaBand, BookingModal, Button, Badge, ROOMS, useBooking. Shared via `Object.assign(window, ...)`.
- `app.jsx` (index), `page.jsx` (5 subpages), `pokoje.jsx` — entry files; each has a `/*EDITMODE-BEGIN*/` JSON tweak-defaults block.
- `tweaks-shared.jsx` — single source of truth for the Tweaks panel + `useSiteTheme(tweaks, setTweak)` which maps tweaks → `<body>` data-attrs and listens for `rusalka:toggle-mode` / dispatches `rusalka:modechange`.
- `styles.css` — site styles; theming via `body[data-emphasis|data-corners|data-texture|data-mode]` selectors. `pokoje.css` extra.

## Tweaks (all pages)
mode light/dark ("Motyw"), accent (coral #FF6F3C default / amber / baltic / seafoam), corners soft/sharp, texture on/off, stickyCta; index adds hero layout switch, pokoje adds jumpNav toggle.

## Dark mode (done, verified)
`body[data-mode="dark"]` remaps tonal ladder to night-sea darks (paper #0C222C ladder, --c-deep-sea inverts to warm foam #F6EFD9, baltic brightens #1FAEDD, --emphasis-fg #0B1F28 ink on warm CTAs), plus targeted patches (nav, hero glow, timeline-band, footer, amenity.wide, map-card, modal, pokoje-jump, ultrawide backdrop). Toggle in nav syncs with Tweaks panel via window events; persists.

## Migration plan
`MIGRATION.md` — Next.js static export (`output:"export"`) + Tailwind on Cloudflare Workers free tier; FB Graph API news fetched at build (never-expiring Page token as GH Actions secret, download images to public/news), Markdown pricing (gray-matter + react-markdown), Web3Forms contact, GH Actions push+daily-cron deploy. Actual build happens in Claude Code; prototypes here are the spec. Design finalization stays here.

## Open items
- Pre-existing hero h1 line-height overlap ("sosną/i Bałtykiem") — user hasn't asked to fix.
- Lucide icons = documented substitution pending brand-owner OK.
