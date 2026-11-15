Buttons are pills with a bold Nunito label, in five variants; Coral is for booking and key calls to action only.

**You provide** the label, in sentence case (*Sprawdź pokoje*, not *Sprawdź Pokoje*), and for the CTA an optional trailing arrow icon.

## Variants

- **CTA:** `action` (Coral) pill with an `on-accent` label. Booking and key actions; do not spread it across the interface. Hover is `action-hover` (one step lighter) with `shadow-glow-sun`.
- **Primary:** `primary` (Baltic Blue) pill with an `on-accent` label. Hover is `primary-hover`.
- **Secondary:** transparent with a 1.5px `c-deep-sea` outline and `c-deep-sea` label.
- **Warm:** `c-sun-yellow` fill with an `on-accent` label, `radius-md` corners.
- **Ghost:** link-style button, `accent-text` label, no fill.
- **Disabled:** opacity 0.45. Never grey it out.

## States

- Hover: a filled button goes one tonal step lighter, never darker, so the dark label stays readable. Not opacity.
- Press: scale 0.98 over 80ms.
- Focus: a 2px solid `focus-ring` outline with a 2px offset (5.07:1 on Paper, 11.80:1 in the dark theme). `components/bundle.css` sets it for every `:focus-visible`.

## Contrast

Labels on warm and marine fills are dark, never light: `c-ink` on `c-coral` is 5.35:1, on `c-baltic-blue` 4.68:1, on the hover steps 6.37:1 and 7.02:1; `c-deep-sea` on `c-sun-yellow` is 8.35:1. `c-deep-sea` on `c-coral` is only 4.29:1, so the CTA label is `c-ink`. The Ghost label is 5.07:1 on `c-paper`. In the dark theme `on-accent` is `#0B1F28`: 6.12:1 on Coral, 6.57:1 on Baltic Blue.

Labels are 14px and never smaller.
