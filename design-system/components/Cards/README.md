Cards are generously rounded containers in three flavours, each with a small uppercase tag, a Newsreader title, a short Nunito text and a price row at the bottom.

**You provide** the tag, title, text and the price line (*od 220 zł / noc*, or a phrase such as *w pakiecie*).

## Flavours

1. **Paper:** `c-paper-2`, no border, `shadow-md`. The default content card.
2. **Outline:** `bg` background, 1px `border`, `shadow-sm`. For lists of comparable items (rooms, amenities).
3. **Marine:** `surface-strong` with `on-strong` text, tag and price in `c-sun-yellow`. For testimonials, key CTAs, footer. Set the title and text colours explicitly so global heading colours do not bleed through.

All three use `radius-lg` or larger, `space-5` and up of padding, and a dashed divider above the price row. Do not blur card backgrounds; keep them solid Paper.

## Contrast

The Outline tag is `c-coral` on `c-paper` at 2.61:1, below 4.5:1: the source pair, kept as it is. The Paper card tag is `c-baltic-blue` on `c-paper-2` at 2.81:1, below 4.5:1: the source pair, kept as it is.
