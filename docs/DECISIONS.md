# Decisions

What was decided, by whom, and why. Newest context first. Dates are 2026.

## Owner's answers (15 Nov, second session)
- **Card copy may be 14–15px.** The 16px rule is relaxed for supporting copy inside cards; running text stays 16px. No layout change.
- **The "PL · EN" label stays** in the nav as it is until there is an English version.
- **Form endpoint: not chosen yet.** The site stays in demo mode.
- **Push of `next` and a draft pull request to `main` approved** for this session's work, to run CI. Not a standing permission.

## Forms, SEO and CI (15 Nov, second session)
- **Form sending is provider-neutral.** `components/send-form.jsx` posts JSON to `NEXT_PUBLIC_FORM_ENDPOINT` and treats 2xx without `{ "success": false }` as sent. That is the Web3Forms contract, so either choice (Web3Forms or an own endpoint) is a build variable, not a code change. The owner has not chosen yet.
- **No endpoint = demo mode,** not a silent fake: the flow completes so the design can be reviewed, nothing is posted, and the confirmation says the enquiry was not sent.
- **Spam:** a honeypot field plus a 3-second minimum fill time; a caught bot gets the normal "sent" answer. No captcha until spam shows it is needed.
- **Consent wording is a proposal.** It names the resort and its address as the data controller; the legal entity name and the privacy policy must come from the owner.
- **The confirmation no longer says "we sent a confirmation to your e-mail":** nothing mails the guest, the enquiry goes to the reception.
- **Stylelint checks for mistakes, not layout.** The CSS is a compact port (several declarations per line); the rules that only reformat it are off, so the hand-edited files are not rewritten. Vendor prefixes stay for `-webkit-backdrop-filter` (Safari).
- **Accent as small text uses `--accent-text`** in the booking wizard (`--bk-accent-text`). Coral on Paper is 2.61:1; step counter, weekend labels, selected dates, "Zmień" links and option subtitles carried information in it.
- **Canonical address** comes from `NEXT_PUBLIC_SITE_URL` (default `https://owrusalka.pl`) plus the base path. Structured data states only facts already on the site: no coordinates, prices or opening dates.
- **Favicon** is a square crop of the logo centred on the sun; the left tail of the wave is cut. The full mark was too small to read at 16px.
- **"Zarezerwuj" on the 404 page** goes to `/rezerwacja/` instead of opening the modal.

## Repository and process (15 Nov, owner)
- **One repository**, the existing `czak89/owrusalka-pl`: keeps history, CI and the site address.
- **Merge base = the newer prototype** (the non-git working folder), plus what only the older repo had: booking wizard, admin-panel mockup, intro video.
- **`main` stays untouched** until the owner accepts the Next.js site. Work goes to `next`; the merged prototype is `html-prototype`.
- **Design system in the same repo** (`design-system/`), not a separate one. A second repo was considered and dropped: one site, one maintainer, two commits per token change for no gain.
- **Scope of the rebuild:** 7 pages plus the booking wizard. **The admin panel is out**: it needs a server, login and a data store, which a static site cannot give, and nothing else depends on it.
- **Hosting:** GitHub Pages now, the company server later. Hence the base-path variable instead of a hard-coded path.
- **No push without the owner's explicit word.** An automated "unpushed commits" notice does not count.

## Rebuild (15 Nov)
- **Static export** (`output: "export"`, `trailingSlash: true`): the site is plain files and runs anywhere.
- **No Tailwind**, although `MIGRATION.md` planned it. The prototype has about 100 KB of working CSS; rewriting it into utility classes would add risk and no benefit. The CSS stays and reads design-system tokens.
- **The port was mechanical**, then hand-edited: prototype scripts that shared globals through `window` became ES modules with imports; `Object.assign(window, …)` became exports; `x.html` links became `withBase("/x/")`. Do not re-run a port over `components/` or `styles/`.
- **Tweaks panel removed.** It was a design-time tool. Accent (Coral), corners (soft) and texture (on) are fixed; only the theme is interactive.
- **Theme:** default light, as in the prototype; the visitor's choice is kept in `localStorage` (`rusalka-theme`). The system preference is deliberately not followed: the brand is a sunny one and a dark first impression is not wanted.
- **Icons:** `lucide-react` with an explicit name map instead of the Lucide CDN script, so nothing is fetched at runtime and unused icons are not shipped.
- **Photos:** the prototype's drag-and-drop `image-slot` element became `ImageSlot`, a placeholder that shows a photo when `components/photos.js` has one for the slot id.
- **Booking wizard is browser-only** (`ssr: false`): it depends on today's date and a build-time render would be stale.
- **Dark theme borders differ from the prototype on purpose.** In the prototype `--border` was resolved at `:root` and stayed sand-coloured in the dark; here it follows the token (`#24485A`).
- **Fixed, pre-existing bug:** on phones the hero was wider than the screen because the polaroid stack forced 460px. Grid tracks are now `minmax(0, 1fr)` and the stack shrinks.

## Design system v1.2 (13 Nov)
- **Dark theme** added to the tokens, values from the site prototype („wieczór nad morzem").
- **Role layer** added (`action`, `on-accent`, `surface-strong`, `accent-text`, `error`, `focus-ring`, …) so components do not name raw colours where the themes differ. `surface-strong` replaces the prototype's hand patches for dark bands.
- **Dark error pair** `#FF8F7A` on `#3A1F1C` is new; the prototype had none. Awaiting the owner's confirmation.
- **Focus** is a solid 2px outline, not a translucent glow. **Minimum text sizes** 16 / 14 / 12. **Pacifico** is never faux-bold.

## Design system v1.1 (13 Nov, owner's brief)
- **Text on Coral, Baltic Blue, Sun Yellow and Amber is dark.** Measured: Ink on Coral 5.35:1, Deep Sea on Coral 4.29:1, so the CTA label is Ink, not Deep Sea. Ink on Baltic Blue 4.68:1.
- **Hover lightens** (`#FF8A5C`, `#45C0E8`) instead of darkening. Not in the brief; needed because a dark label on a darker fill drops below 4.5:1. Awaiting the owner's confirmation.
- **Baltic Dark `#007399`** for small marine text (5.07:1 on Paper; 4.32:1 on the darker sand, where Deep Sea is used instead).
- **Brick Red `#C83E2B`** and **`#FDECE9`** for errors; Coral is never an error colour. Brick Red on the error wash is 4.39:1, so text there is Ink.
- **Shadows** replaced with the three steps and the sun-glow from the brief.
- **Mobile type scale** below 640px (the breakpoint was not in the brief).
- **Logo:** SVG is the target format; only PNGs exist. The transparent on-dark PNG was derived from the primary one.
- **Coral script callouts** on Paper are 2.61:1; kept as decoration that carries no information.

## Design system clean-up (12–13 Nov)
- **Removed what no site version used:** the Caveat font, 13 semantic colour aliases, unused scale steps, the deprecated `.faux-l` helpers. Kept all 21 raw colours: the site uses every one.
- **Nothing a person made was deleted;** superseded files were moved to `archived/` in the artifact.

## How things were verified
- Every page in a headless browser: light and dark at 1280px, light at 390px. No console errors, no failed requests, no unresolved icons, no text under 12px, no horizontal overflow.
- Interaction script: theme toggle and persistence, booking modal, navigation, focus ring, date selection.
- Both builds (root and `/owrusalka-pl`) complete; the base-path build was checked for rewritten links, not opened in a browser.
- Form script (`scripts/check-forms.cjs`): both forms in demo mode and against an intercepted endpoint (error, retry, success, payload).
- The workflows ran on GitHub against `next` through `workflow_dispatch` (15 Nov): build and CSS, Lighthouse, link check and secret scan pass. The first link check failed on the Google Maps link (403 to bots), now excluded.
- Not verified: the workflows on a pull request event, a real form service, the design-system artifact page (cards were rendered locally), real devices.
