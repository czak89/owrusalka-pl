# Rusałka Design System

**Ośrodek Wypoczynkowy „Rusałka"** — a family seaside resort in Łazy near Mielno, on the Polish Baltic coast. The brand is warm, welcoming and lightly retro: it sells *summer with a soul*, not luxury minimalism. Imagine sunshine on sand, kids running between pine trees, dinner at the wooden picnic table, a faded postcard from your parents' holiday album — but rendered with modern craft.

This design system is the toolkit for designing Rusałka's website, social posts, printed flyers, signage and any future digital surfaces. It is intentionally compact: one brand, one resort, one voice.

---

## Source materials

These were provided when the system was created. They live under `source/` and `assets/` in this project. The original uploads were:

- **`uploads/logo-full2.png`** — primary horizontal lockup (sun + waves + handwritten "rusałka"). Copied to `assets/logo-rusalka-full.png`. A transparent on-dark version, `assets/logo-rusalka-on-dark.png`, is derived from it; SVG versions are the target format and still need the vector artwork.
- **`uploads/Rusalka-paleta-barw-9-kolorow.svg`** — official 9-colour palette card with hex values, names and intended use. Copied to `assets/palette-reference.svg`.
- **`uploads/rusalka-info.md`** — long-form product copy from the resort's existing website (Polish). Copied to `source/rusalka-info.md`. Includes pricing context, room types and contact info.

No Figma file or slide template was attached. The system was first built from the logo, palette card and copy alone, and from the written brand brief in the original kickoff message. It has since been checked against the website code (the `owrusalka` and `owrusalka-pl` repositories): tokens and fonts that no version of the site uses were removed. Still missing: the logo as vector artwork (SVG) and real photography.

Contact (from source copy): Ośrodek Wypoczynkowy „Rusałka", ul. Leśna 22, 76-002 Łazy. +48 94 318 29 76. recepcja@owrusalka.pl.

---

## Index — what's in this project

| Path | What it is |
|---|---|
| `README.md` | This file. Brand context, content + visual foundations, iconography. |
| `assets/notes/SKILL.from-standalone.md` | Agent-skill manifest. Lets this folder work as a Claude Code skill. |
| `tokens.json` | All design tokens: colors, type scale, spacing, radii, shadows. |
| `colors_and_type.css` | Entry stylesheet: imports `tokens.css` (compiled from `tokens.json`) and `components/bundle.css` (element styles, motion). Import this in every new artifact. |
| `components/` | One folder per component card (guidelines and live preview), plus the cover. |
| `assets/` | Logos, palette reference SVG, illustration placeholders. |
| `source/` | Original brand copy, untouched, for reference and tone-of-voice mining. |
| `ui_kits/website/` | Recreation of the marketing website surfaces (homepage, rooms, booking, contact). |
| `archived/` | Earlier specimen pages, the previous stylesheet and the unused Caveat font, kept for reference. Not part of the system. |
| `fonts/` | The official, self-hosted brand typefaces (`.ttf`), wired up from `tokens.json` (compiled to `@font-face` in `tokens.css`). No CDN. |

---

## Content fundamentals

### Voice

Warm. Direct. Like a host who's been running the same resort for years and wants you to have a good week. Slightly nostalgic, never old-fashioned. Friendly, never childish. Professional, never stiff.

The voice is the host's, not the building's. Rusałka talks **to** guests, in plural-formal Polish (*Państwo*, *zapraszamy*), but the tone underneath is informal — short sentences, concrete details, the occasional small joke.

### Person & address

- **Polish — formal plural.** *„Zapraszamy Państwa", „Przygotowaliśmy dla Państwa", „Nasi goście"*. This is how the source copy already speaks; keep it.
- **English — second-person singular, friendly.** *„Come and stay", „You'll find"*. Reserve for translations.
- First-person plural for the resort itself: *„my", „nasz ośrodek", „u nas"* — never the third-person corporate „Rusałka oferuje…".

### Casing

- Sentence case for headings and buttons. *„Sprawdź pokoje"* not *„Sprawdź Pokoje"*.
- The brand name appears as **„Rusałka"** in Polish-style smart quotes inside running copy, and as **rusałka** (lowercase, handwritten) in the logo and short script call-outs.
- ALL CAPS is reserved for tiny eyebrow labels (≤14px), section numbers and small UI tags. Never for headlines.

### Tone moves we *do*

- Concrete, sensory detail: *„50 metrów od plaży", „sosnowy las za płotem", „ognisko po kolacji"*.
- Soft welcome: *„Zapraszamy"*, *„Czekamy na Państwa"*.
- Plain numbers: prices in PLN, distances in metres, room sizes in m².
- The occasional dry, host-y aside: *„W razie niepogody pożyczamy termowentylatory"*.

### Tone moves we *don't*

- No corporate puff: avoid *„wyjątkowa oferta", „premium experience", „luksusowy SPA"*.
- No exclamation cascades, no all-caps shouting, no exclamation-mark-driven sales energy.
- No emoji in body copy or buttons. (See Iconography.)
- No childish diminutives outside of context — *„słoneczko, rybeczka"* are fine in a kids-programme callout, not in the rooms description.
- No infinity-pool, marble-floor, Bali-retreat language. Rusałka is wooden steps, sand on the porch, kettle in the room.

### Specimens (from source copy, lightly edited)

> *„Nasi goście mogą także liczyć na dobre wyżywienie i atrakcje dedykowane najmłodszym. Bogate programy animacyjne dla dzieci, biesiady przy ognisku oraz pyszna, domowa kuchnia, to kolejne atuty naszego obiektu."*

> *„Niewątpliwą zaletą naszego obiektu jest jego malownicza lokalizacja. „Rusałka" znajduje się w otoczeniu sosnowych lasów i w odległości 50 metrów od morza."*

Headline-length voice examples we'd write:
- *Wakacje, które pachną sosną.*
- *Pięćdziesiąt metrów do plaży. Reszta — Państwa.*
- *Domowa kuchnia, ognisko, plac zabaw.*

---

## Visual foundations

### Mood

Sun, sand, Baltic blue, paper-cream backgrounds. A bit of nostalgia for the family-album vacations of the 80s and 90s — but rendered cleanly, with modern spacing, modern type, and no kitsch. **Avoid:** sterile hotel-SPA minimalism (cold white + thin sans), aggressive gradients, neons, sharp corners, slick stock-photo gloss.

### Colour

The palette is fixed at 9 hexes (see `tokens.json`), plus derived tones for surfaces, small text and errors. Usage rules:

- **Paper `#FFF8E8`** is the default canvas. Almost never use pure white. Sub-surfaces step warmer (`--c-paper-2`, `--c-paper-3`) — they read as sand-tinted, not gray.
- **Deep Sea `#003B59`** is the body and heading text colour, and the strong contrast fill. Headings are *Deep Sea on Paper*, not pure black on white.
- **Baltic Blue `#0A9CCC`** is the primary accent: primary button fills, larger icons, focus rings, navigation indicators. It is not a text colour on Paper (2.99:1): eyebrow labels and text links use the derived **Baltic Dark `#007399`** (5.07:1) or Deep Sea.
- **Sun Yellow `#FFD500`** and **Amber `#FFAA00`** are warm energy: highlights, hover halos, the sun in marks, ribbons, badges. Yellow is bright/optimistic; Amber is grounded/golden-hour.
- **Coral `#FF6F3C`** is the CTA / social colour. Reserve it for booking buttons, key calls to action, script callouts, social-post focal points. Don't dilute it across the whole UI, and never use it for errors.
- **Text on Coral, Sun Yellow, Amber and Baltic Blue fills is dark** (Ink, or Deep Sea on the yellows), never light: Ink on Coral is 5.35:1, Paper on Coral only 2.61:1.
- **Errors** have their own pair: **Brick Red `#C83E2B`** for the border of an invalid field, warning icons and the helper line, on a soft **`#FDECE9`** message background with Ink text.
- **Seafoam `#2EC4A6`** is a quieter additional accent — success states, tags, small graphic elements.
- **Light Sky `#99E6FF`** is for soft fills behind imagery, decorative waves, illustration backgrounds.
- **Ink `#1B2A2F`** is full-strength contrast — used sparingly when Deep Sea isn't dark enough (e.g. against very light yellow).

Rule of thumb: in any composition, **~60% Paper, ~25% Deep Sea (mostly type), ~10% one warm accent (Sun/Amber/Coral), ~5% Baltic Blue.** Don't paint with all colours at once.

### Type

| Role | Family | Weights | Notes |
|---|---|---|---|
| Script | **Pacifico** | 400 | Official brand script. Reserve for the wordmark and very short callouts (3–4 words). One weight only: never set it bold, the browser fakes it. Sits 8–12% larger than equivalent body type because of its tall caps and looping descenders — adjust line-height accordingly. |
| Display | **Newsreader** | 400 / 600 | Warm humanist serif for H1–H3 and hero leads. Slight italic for ledes. Official, self-hosted variable font (opsz + wght axes). |
| Body / UI | **Nunito** | 400 / 600 / 700 / 800 | Rounded sans, friendly without being childish. Body, navigation, buttons. Official, self-hosted variable font. |

Pairings: a hero might be a short Pacifico ribbon over a Newsreader headline, with Nunito body underneath. Don't stack three faces in a small element — pick one or two.

**⚠ Pacifico's default `ł` / `Ł` are wrong for Polish.** The default glyph draws a macron *above* the letter (Romanian style); the proper Polish form — a diagonal stroke *through* the letter — lives in Pacifico's OpenType **stylistic set 1 (`ss01`)**. Always enable it:

```css
.script,
.my-script-element {
  font-family: var(--font-script);
  font-feature-settings: "ss01" 1;
}
```

The `.script` utility class in `components/bundle.css` already does this — use it whenever you can. If you set `font-family: var(--font-script)` by hand on a custom element, add `font-feature-settings: "ss01" 1` next to it (see the website kit's `.hero-text .ribbon`, `.story-text .pre`, `.story-text .signed` for examples). The "Script" component card shows the default-vs-ss01 difference side-by-side. A reference image of the proper glyphs lives at `assets/pacifico-polish-ligatures-reference.png`.

Sizes: see `tokens.json` (`--fs-xs` 12 → `--fs-5xl` 60). Minimum sizes: body 16px (24px in slides), captions and secondary lines 14px, eyebrow labels and badges 12px. Nothing below 12px. Form fields are 16px. Body line-height is a generous 1.55.

On phones (under 640px) the headings step down so long Polish words do not break; `components/bundle.css` does this for bare elements:

| Style | Mobile | Desktop | Notes |
|---|---|---|---|
| H1 | 36px | 60px | Newsreader 600, line height 1.15 / 1.1 |
| H2 | 28px | 38px | Newsreader 600, line height 1.25 |
| H3 | 24px | 30px | Newsreader 600, line height 1.3 |
| Lede | 20px | 24px | Newsreader 400 italic |
| H4 | 18px | 20px | Nunito 700 |
| Body | 16px | 16px | never below 16px |
| Caption | 14px | 14px | |
| Eyebrow | 12px | 12px | caps, Baltic Dark |

### Dark theme: „wieczór nad morzem"

`tokens.json` carries two themes, `light` and `dark`; set `data-theme="dark"` on the root element. The dark values come from the website prototype:

- Paper becomes a night-sea ladder (`#0C222C`, `#11303F`, `#1A4051`, edge `#24485A`), never neutral grey.
- `--c-deep-sea`, the heading colour, inverts to warm foam `#F6EFD9`; text is `#E7E2CF`.
- Baltic Blue brightens to `#1FAEDD`. Coral, Sun Yellow, Amber and Seafoam stay as they are.
- Shadows turn black-based (set in `components/bundle.css`, because themes only cover colours).

Components use **roles** rather than raw colours wherever the two themes differ:

| Role | Light | Dark | Use |
|---|---|---|---|
| `surface-strong` / `on-strong` | Deep Sea / Paper | `#0A2A3C` / `#F6EFD9` | dark bands, marine cards, footer; does not invert |
| `action` / `action-hover` | Coral / `#FF8A5C` | same | CTA fill |
| `primary` / `primary-hover` | Baltic Blue / `#45C0E8` | `#1FAEDD` / `#45C0E8` | primary button, checked checkbox |
| `on-accent` | Ink | `#0B1F28` | label on Coral, Baltic, Sun Yellow, Amber |
| `accent-text` | Baltic Dark | `#1FAEDD` | eyebrow labels, ghost button |
| `error` / `error-surface` | Brick Red / `#FDECE9` | `#FF8F7A` / `#3A1F1C` | invalid field, error message |
| `success-text` | `#0A6D5A` | `#7FE0CB` | text of a success badge |
| `focus-ring` | Baltic Dark | Light Sky | keyboard focus outline |

The dark error pair (`#FF8F7A`, `#3A1F1C`) is new in this system; the prototype had no error colour of its own.

### Type substitutions — ✅ all official

All brand fonts are now official and self-hosted from `fonts/` via `@font-face` compiled from `tokens.json` into `tokens.css` — **no CDN, no substitutes**:

- **Pacifico** (script) — `fonts/Pacifico-Regular.ttf`
- **Newsreader** (display) — `fonts/Newsreader-VariableFont_opsz_wght.ttf`
- **Nunito** (body/UI) — `fonts/Nunito-VariableFont_wght.ttf`

There is nothing left to swap. If a family is ever updated, drop the new file into `fonts/` and update the matching entry in `type.fonts` of `tokens.json`.

### Spacing & rhythm

8-point base scale (`--space-2` 8px … `--space-9` 96px), with 12px as the in-between step. Layouts breathe. Default page gutters are `--space-7` (48px) on desktop, `--space-5` (24px) on mobile. Cards have generous internal padding (`--space-5`/`--space-6`).

### Corner radii

Generous and soft. Never sharp.
- Inputs and small chips: `--radius-md` (12px).
- Buttons: `--radius-pill` (fully rounded) for primary CTAs, `--radius-md` for secondary.
- Cards: `--radius-lg` (20px) to `--radius-xl` (28px).
- Hero panels and image masks: `--radius-2xl` (40px) or organic blob shapes.

### Shadows

Soft, warm, low-contrast — tinted with Deep Sea, not black. No hard drop shadows, no neumorphism.

| Step | Token | Value | Use |
|---|---|---|---|
| 1 | `--shadow-sm` | `0 4px 12px rgba(0, 59, 89, 0.06)` | Cards, fields |
| 2 | `--shadow-md` | `0 8px 24px rgba(0, 59, 89, 0.10)` | Hover, floating elements |
| 3 | `--shadow-lg` | `0 16px 40px rgba(0, 59, 89, 0.14)` | Modals, menus |
| Sun-glow | `--shadow-glow-sun` | `0 6px 20px rgba(255, 170, 0, 0.35)` | Hovered or focused CTA |

### Borders

Borders are warm and quiet — `--border` (sand-edge `#E8D6A8`) on Paper surfaces, a Deep Sea border (`--c-deep-sea`) when we need to anchor. 1px in product UI, occasionally 2px on emphasis cards.

### Backgrounds

- Default: **Paper** with a barely-there paper-grain texture (CSS `radial-gradient`/noise SVG) is welcome.
- Hero: **soft sea gradients** — Light Sky → Paper, or Sun Yellow → Amber. Keep them gentle, never harsh.
- Sections: occasional **full-bleed photo** of beach / pine / interior, with an organic blob mask and a soft Deep Sea overlay (40–60%) for type contrast.
- Decorative motifs: **wave shapes** (echoing the logo), **sun discs**, **dotted/dashed paths** suggesting a trail to the beach.

### Imagery

- Real photos of the actual resort whenever possible: families, kids, pine forest, beach, plates of food, the wooden ganek.
- Warm, lightly golden white-balance. Light film grain is welcome. No heavy desaturation, no cold tones.
- Avoid stock-plastic: shiny couples in white linen, drone-shot infinity pools, identical happy-family poses.
- Always crop with intent — a slice of plate edge, a foot in the sand. Postcard energy.
- Use organic / blob / soft-arch masks more often than rectangles.
- **Text on photos:** never set type straight onto a bright, multicoloured photograph. Put a paper card (Paper or sand) under it, or a soft Deep Sea (`#003B59`) panel or gradient at 40–60% opacity.

### Animation

Quiet and tactile. Like a curtain moving in the breeze, not like an app loading bar.
- Default duration: 200ms; slow accents up to 400ms.
- Easing: `--ease-out` for entrances and state changes. Avoid bouncy springs.
- Fades + small slide-ups (8–12px) for content entrance.
- Wave or sun motifs can have an idle drift — 4–6s loop, ±2px.
- Hover on imagery: a tiny scale (1.02–1.03), 300ms `ease-out`.

### Interactive states

- **Hover (filled button):** one step lighter (Baltic → `--c-baltic-2`, Coral → `--c-coral-2`), never darker, so the dark label stays readable; not opacity. Sun-glow (`--shadow-glow-sun`) on a hovered or focused CTA.
- **Hover (link):** colour shifts to `--link-hover` (Deep Sea); underline thickens slightly.
- **Press:** scale to 0.98 over 80ms.
- **Disabled:** lower opacity to 0.45, never gray out.
- **Focus ring:** a 2px solid outline in `--focus-ring` (Baltic Dark by day, Light Sky in the dark theme) with a 2px offset. Solid, not translucent: it has to read at 3:1 or better for keyboard users.

### Transparency & blur

Used rarely. A faint Paper-tinted overlay (`rgba(255, 248, 232, 0.7)`) with a 12–16px `backdrop-filter: blur(...)` is acceptable for a sticky nav on photo backgrounds. Don't blur card backgrounds — they should be solid Paper.

### Layout

- 12-column grid, 1200–1280px content max-width.
- Asymmetric hero layouts welcome: a script ribbon top-left, big serif headline, photo card off-axis.
- Fixed elements: a slim top nav (Paper, soft bottom border) and a sticky "Zarezerwuj" coral button on mobile. Both stay quiet — they don't shout.

### Cards

Three card flavours, all share generous padding and `--radius-lg`+:
1. **Paper card** — `--c-paper-2` (`#FBF1D8`), no border, `--shadow-md`. Default content card.
2. **Outline card** — Paper background, `--border` 1px, `--shadow-sm`. For lists of comparable items (rooms, amenities).
3. **Marine card** — `--c-baltic-blue` (Baltic) or `--c-deep-sea` (Deep Sea), Paper text. For testimonials, key CTAs, footer.

---

## Iconography

Rusałka has **no official icon system**. The brand's existing visual language is photographic + logotype + the sun/wave mark — it doesn't lean on a stamped icon set.

**Our approach** for any new digital surface:

- **System of choice: [Lucide](https://lucide.dev) icons.** Stroke-based, ~1.75px stroke, rounded caps. They match Rusałka's soft, friendly character without feeling techy. Default size 20–24px, stroke colour = current text colour. ⚠ This is a **substitution** — flag to the brand owner; replace with an official set when one exists.
- **Sun + wave** from the logo can act as a brand-mark stand-in for "Rusałka" wherever a circular avatar / favicon / map pin is needed. Extracted versions live in `assets/`.
- **Emoji:** *not used* in product copy, buttons or UI labels. They clash with the hand-lettered + warm-serif voice. The single exception is "✨"-style decorations in informal social captions — and even there, we prefer a small Pacifico call-out over an emoji.
- **Unicode glyphs:** an occasional bullet (•), en-dash (–) or arrow (→) is fine — they read as typography, not as icons.
- **Decorative SVG motifs** (waves, sun rays, dotted-line beach trail, deck-chair silhouette) live in `assets/decor/` if/when we create them. These are illustrations, not icons — they don't appear in tight UI lockups.

To use Lucide in an artifact, inline the icon's SVG (the Iconography card does this, from Lucide 0.469.0). If you load the script instead, pin the version:

```html
<script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.js"></script>
<script>lucide.createIcons();</script>
<!-- then: <i data-lucide="map-pin"></i> -->
```

Preferred icons for Rusałka surfaces: `map-pin`, `phone`, `mail`, `calendar`, `users`, `bed`, `utensils`, `wifi`, `waves`, `sun`, `tent`, `tree-pine`, `arrow-right`.

---

## How to use this system

Drop `colors_and_type.css` into the `<head>` of any new artifact (HTML, slide deck, prototype). The CSS variables and the default element styles cover ~80% of design decisions. For the remaining 20%, look at the `components/` cards and the `ui_kits/website/` reference for patterns.

All brand typefaces are **official and self-hosted** (see **Type** above) — there is no font caveat to resolve. The remaining caveat at the top of the chat is the **icon-set substitution** flag (Lucide), which still wants a brand-owner review.

---

*Złóż się tu cieniem sosny. — Rusałka, Łazy.*
