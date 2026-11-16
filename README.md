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

## Build variables

| Variable | Meaning | Default |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | Folder the site is served from | empty (domain root) |
| `NEXT_PUBLIC_SITE_URL` | Public origin, used for canonical links, Open Graph and the sitemap | `https://owrusalka.pl` |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Where the forms are posted (JSON): `https://owrusalka.pl/api/wyslij.php` | empty: demo mode, nothing is sent |
| `NEXT_PUBLIC_FORM_KEY` | Access key, sent as `access_key`. Only for a form service such as Web3Forms; the own endpoint does not use it | empty |

## Form endpoint

The booking modal, the `/rezerwacja` wizard and the `/kontakt` form post to `public/api/wyslij.php`, a single PHP file that mails the reception. It holds no passwords and needs PHP 7.4 or newer with a working `mail()`.

1. Upload it to the web root of the server as `api/wyslij.php` (the build also copies it to `out/api/`).
2. Open `https://owrusalka.pl/api/wyslij.php` in a browser: a JSON line saying the endpoint is up means PHP runs it.
3. Send a test message, with your own address in place of `you@example.com`, and check the reception's mailbox, spam folder included. PowerShell:

```powershell
Invoke-RestMethod -Method Post -Uri "https://owrusalka.pl/api/wyslij.php" -ContentType "application/json" -Headers @{ Origin = "https://owrusalka.pl" } -Body '{"name":"Test strony","email":"you@example.com","subject":"Test formularza","message":"Proba wysylki z nowego formularza."}'
```

The answer should show `success` as `True`. Sites allowed to post are listed in `ALLOWED_ORIGINS` at the top of the file; at most 5 messages per 10 minutes are accepted from one IP address.

## Structure

```
design-system/   Rusałka Design System: tokens.json, tokens.css, fonts, component cards. The single source of colours, type and spacing.
app/             Routes: /, /pokoje, /cennik, /atrakcje, /lato, /galeria, /kontakt, /rezerwacja
components/      kit.jsx (atoms, nav, hero), sections.jsx, content-*.jsx, rez-*.jsx (booking wizard)
styles/          Layout and component CSS. No colour or font values of its own: it reads the design-system tokens.
public/          Logos, backdrop, photos; api/wyslij.php (the form endpoint for the company server)
```

## Design system

`app/layout.jsx` imports `design-system/tokens.css` and `design-system/components/bundle.css` before the site styles. To change a colour, a font or a shadow, change `design-system/tokens.json` (and its compiled `tokens.css`), not the site CSS.

Light and dark themes are the `light` and `dark` themes of the tokens, switched by `data-theme` on `<html>`. The nav button toggles it; the choice is kept in `localStorage`.

## Photos

Slots show a labelled placeholder until a photo exists. To add one, put the file in `public/photos/` and add its slot id to `components/photos.js`.

## Icons

Lucide, via `lucide-react`. `components/icons.js` lists the icons in use; after adding a new icon name run `node scripts/gen-icons.cjs <names.json>` or add the import by hand.

## Checks

```bash
npm run build && npx serve out -l 8732
node scripts/check-pages.cjs http://localhost:8732/ ",pokoje/,cennik/,atrakcje/,galeria/,lato/,kontakt/,rezerwacja/" "" light 1280
node scripts/check-interactions.cjs http://localhost:8732/
node scripts/check-forms.cjs http://localhost:8732/ demo
node scripts/check-endpoint.cjs     # the PHP endpoint, against a fake sendmail; needs php
npm run lint:css
```

The browser scripts need Playwright (`npx playwright install chromium`).

## Status and next steps

- `TODO.md` — what is left, in priority order (Polish).
- `docs/DECISIONS.md` — decisions and their reasons.
- `docs/Rusalka-przewodnik-po-stylu-PL-EN.docx` — the style guide, Polish and English.
- `CLAUDE.md`, `AGENTS.md` — context and rules for AI agents.

The main gap: **the form endpoint is not on the server yet.** Sending is built and tested locally; until `api/wyslij.php` is uploaded and a build sets `NEXT_PUBLIC_FORM_ENDPOINT`, the forms run in demo mode: they post nothing and say so on the confirmation.
