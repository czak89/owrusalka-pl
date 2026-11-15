# owrusalka-pl — project context

Next.js (App Router, static export) site for Ośrodek Wypoczynkowy „Rusałka", Łazy. Bound to the **Rusałka Design System** in `design-system/`. Polish formal-plural voice. Read `AGENTS.md` first: this Next.js version differs from older ones.

## Architecture
- `app/` — one folder per route; each `page.jsx` is a server component that sets `metadata` and renders a client component from `components/`.
- `components/kit.jsx` — atoms and shared pieces: `Icon` (lucide-react by name, map in `icons.js`), `ImageSlot` (placeholder or photo from `photos.js`), `Button`, `Badge`, `TopNav` (with `ModeToggle`), `PageHero`, `Hero`, `BookingBar`, `RoomsSection`, `ROOMS`, `useBooking`.
- `components/sections.jsx`, `content-*.jsx` — page sections. `home-page.jsx`, `sub-page.jsx` (cennik, atrakcje, lato, galeria, kontakt, picked by the `page` prop), `pokoje-page.jsx` — page shells.
- `components/rez-*.jsx` — booking wizard at `/rezerwacja`, browser-only (`rez-client.jsx`, `ssr: false`) because it depends on today's date.
- `components/site-theme.jsx` — fixed site options (accent, corners, texture) and the light/dark switch. The prototype's Tweaks panel is stubbed out here.
- `components/base.js` — `withBase()` for every internal link and asset; base path comes from `NEXT_PUBLIC_BASE_PATH`.
- `styles/*.css` — global CSS imported in `app/layout.jsx` after the design-system files.

## Rules
- Colours, fonts, spacing, radii and shadows come from `design-system/tokens.css`. Do not add raw hex values for anything a token or role covers.
- Use roles where the themes differ: `--action`, `--action-hover`, `--primary`, `--primary-hover`, `--on-accent` (label on Coral, Baltic, yellow fills: always dark), `--accent-text` (small marine text), `--surface-strong` / `--on-strong`, `--error` / `--error-surface`, `--focus-ring`, `--success-text`.
- `--c-deep-sea` is the heading colour and inverts to warm foam in the dark theme. A band that must stay dark uses `--surface-strong`.
- Dark theme = `[data-theme="dark"]` on `<html>`. Theme-specific patches are written as `[data-theme="dark"] body .x`.
- Text sizes: body 16px, captions 14px, labels and badges 12px, nothing smaller. Label on an accent fill is never light.
- Pacifico (`--font-script`) always with `font-feature-settings: "ss01" 1`, weight 400, short callouts only.
- Keyboard focus: 2px solid `--focus-ring`, 2px offset.
- No SSR-unsafe code at module top level or during render (`window`, `document`): use effects.

## Open items
- Forms send nothing yet; no availability backend.
- Real photography: only two small hero photos exist (`public/photos/`).
- Lucide icons are a stand-in pending brand-owner approval. Logo exists as PNG only; SVG needs the vector artwork.
- CI workflows were rewritten for the Next.js build but have not run yet.
