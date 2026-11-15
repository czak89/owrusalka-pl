# owrusalka.pl

Website of Ośrodek Wypoczynkowy „Rusałka" (Łazy near Mielno): Next.js, exported as static files.

## Branches

| Branch | What it holds |
|---|---|
| `main` | The published HTML prototype (GitHub Pages). Untouched until the Next.js site is accepted. |
| `html-prototype` | Both prototypes merged: 7 pages, dark mode, the booking wizard, the admin-panel mockup. The design spec. |
| `next` | This site: Next.js + the Rusałka Design System. |

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
npm start        # serve out/ locally
```

## Where the site lives (base path)

The build is plain files in `out/` and runs on any web server. One variable says which folder it is served from:

```bash
npm run build                                           # domain root (company server)
NEXT_PUBLIC_BASE_PATH=/owrusalka-pl npm run build       # GitHub Pages project site
```

Links and images go through `withBase()` (`components/base.js`), so nothing else changes.

## Structure

```
design-system/   Rusałka Design System: tokens.json, tokens.css, fonts, component cards. The single source of colours, type and spacing.
app/             Routes: /, /pokoje, /cennik, /atrakcje, /lato, /galeria, /kontakt, /rezerwacja
components/      kit.jsx (atoms, nav, hero), sections.jsx, content-*.jsx, rez-*.jsx (booking wizard)
styles/          Layout and component CSS. No colour or font values of its own: it reads the design-system tokens.
public/          Logos, backdrop, photos
```

## Design system

`app/layout.jsx` imports `design-system/tokens.css` and `design-system/components/bundle.css` before the site styles. To change a colour, a font or a shadow, change `design-system/tokens.json` (and its compiled `tokens.css`), not the site CSS.

Light and dark themes are the `light` and `dark` themes of the tokens, switched by `data-theme` on `<html>`. The nav button toggles it; the choice is kept in `localStorage`.

## Photos

Slots show a labelled placeholder until a photo exists. To add one, put the file in `public/photos/` and add its slot id to `components/photos.js`.

## Icons

Lucide, via `lucide-react`. `components/icons.js` lists the icons in use; after adding a new icon name run `node scripts/gen-icons.cjs <names.json>` or add the import by hand.

## Not built yet

- Forms do not send anything: the booking modal and the `/rezerwacja` wizard end in an on-screen confirmation only.
- No real availability data; the calendar uses the season rules in `components/rez-data.jsx`.
- English version (the `PL · EN` switch is a label).
- Facebook news feed, Markdown price list and the Cloudflare deploy from `MIGRATION.md`.
- The admin panel (mockup on `html-prototype`).
