> **Status (November 2026).** The Next.js port exists on the `next` branch: static export, 7 pages plus `/rezerwacja`, styles on the design-system tokens. Not done from this plan: Tailwind (the site keeps its CSS, now reading tokens, so a rewrite into utility classes was not needed), the Facebook news fetch, Markdown pricing, Web3Forms and the Cloudflare deploy. Hosting is GitHub Pages for now and a company server later; see `README.md` for the base-path switch.

# owrusalka.pl — Next.js migration plan

Goal: fully static Next.js + Tailwind site, zero runtime servers, $0/month hosting, news baked in at build time, scheduled rebuilds.

## 1. Hosting: Cloudflare Workers (static assets)

- The site (7 pages, prices, news feed, contact form) needs no SSR → use `output: "export"`.
- **Why not free Vercel:** Hobby plan is restricted to non-commercial personal use; a resort website is commercial → would require Pro ($20/mo).
- **Why Cloudflare:** static asset requests are free, commercial use allowed on the free tier. Workers with static assets is Cloudflare's recommended path for new projects (Pages still works, but Workers is the forward path).
- Config:
  - `next.config.ts`: `output: "export"`, `images: { unoptimized: true }`
  - `wrangler.toml`:
    ```toml
    name = "owrusalka"
    compatibility_date = "2026-07-17"
    [assets]
    directory = "./out"
    not_found_handling = "404-page"
    ```
  - Deploy: `npm run build && npx wrangler deploy`
- Cache defaults are sensible out of the box: ~1 year for hashed assets, no-cache for HTML.
- CI/CD: GitHub Actions with `cloudflare/wrangler-action` — push to `main` → build → deploy.

## 2. News from Facebook — build-time fetch, no backend

- Node script `scripts/fetch-news.mjs`, run as `prebuild`:
  - `GET https://graph.facebook.com/v23.0/{page-id}/posts?fields=message,created_time,full_picture,permalink_url&limit=12&access_token=$FB_PAGE_TOKEN`
  - **Download each `full_picture` into `public/news/`** — FB CDN URLs are signed and expire after days; hotlinking breaks silently. Self-hosting also lets you optimize.
  - Write normalized result to `content/news.json`. Custom Rusałka-styled components render from it.
  - Commit a fallback `content/news.json` so local builds work without the token.
- **Never-expiring Page token (one-time setup):**
  1. Meta developer portal → create a Business app, note App ID + Secret.
  2. Graph API Explorer → User access token with `pages_read_engagement` (+ `pages_read_user_content`).
  3. Exchange short-lived → long-lived user token: `GET /oauth/access_token?grant_type=fb_exchange_token&client_id={app-id}&client_secret={app-secret}&fb_exchange_token={token}` (server-side only — app secret in the call).
  4. `GET /{user-id}/accounts` with the long-lived user token → the page's `access_token` in the response is the long-lived Page token (no expiration).
  5. Verify in Access Token Debugger: "Expires: Never".
  - Caveat: invalidated if the page-admin user changes their password or loses page access → regenerate once.
- Token lives ONLY as a GitHub Actions secret (`FB_PAGE_TOKEN`). Never in the repo, never shipped to the browser.
- Freshness: GitHub Actions `schedule:` cron (daily, e.g. 06:00) rebuilds + redeploys → new FB posts appear automatically.

## 3. Pricing in Markdown (no CMS)

- `content/cennik/*.md` with YAML frontmatter (season dates, notes) + GFM pipe tables for price lists.
- Parse in server components at build time: `fs.readFileSync` → **gray-matter** (frontmatter) → **react-markdown + remark-gfm**.
- With static export this all runs at build → 0 KB parser in the client bundle.
- Editing workflow: GitHub web editor (works on phone) → commit → auto-deploy in ~90 s.
- Skip MDX / Contentlayer — overkill for price tables.

## 4. Contact form: Web3Forms (zero backend)

- Free tier: 250 submissions/month straight to inbox, hCaptcha included free.
- Plain HTML, works without JS:
  ```html
  <form action="https://api.web3forms.com/submit" method="POST">
    <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
    <input type="checkbox" name="botcheck" class="hidden" style="display:none">
    <!-- fields... -->
  </form>
  ```
- Progressively enhance with `fetch()` for an inline "Dziękujemy! Odezwiemy się wkrótce." state styled to the design system.
- The access key is public by design (it can only email you) — nothing to hide.
- GDPR note: Web3Forms is US-hosted, no DPA. If formality matters, **Forminit** (EU/Ireland, DPA, 100/mo free) is a drop-in alternative.

## 5. Step-by-step

1. `npx create-next-app@latest` (App Router, Tailwind, TS) → set `output: "export"`, `images.unoptimized`.
2. Port Rusałka design tokens: `styles.css` custom properties → Tailwind theme (`--c-paper #FFF8E8`, `--c-deep-sea #003B59`, `--c-baltic-blue #0A9CCC`, `--c-coral #FF6F3C`, etc.); self-host Pacifico / Newsreader / Nunito / Caveat in `public/fonts` via `@font-face` (keep `font-feature-settings: "ss01" 1` on Pacifico for Polish ł).
3. Rebuild pages as static routes from the HTML prototypes (index, pokoje, cennik, atrakcje, galeria, lato, kontakt).
4. Meta app → never-expiring Page token (§2) → verify in debugger.
5. `scripts/fetch-news.mjs` + `"prebuild": "node scripts/fetch-news.mjs"`.
6. Web3Forms access key for recepcja@owrusalka.pl → kontakt form.
7. Push to GitHub. Secrets: `FB_PAGE_TOKEN`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`. One workflow: `on: [push, schedule]` → build → `wrangler deploy`.
8. Move owrusalka.pl nameservers to Cloudflare (required for custom domains on Workers) → attach domain → live.

## Reference: current prototype

The HTML prototypes in this project are the design source of truth: `styles.css` (tokens incl. tweak attributes `--accent`, corners, texture), shared header/footer/nav patterns, page layouts, and the Tweaks panel decisions (accent = coral default, soft corners, texture on, mobile sticky CTA). Port measurements and tokens 1:1 rather than re-inventing.
