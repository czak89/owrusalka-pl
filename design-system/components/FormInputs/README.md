Form inputs are soft, rounded fields with a bold label above, an optional helper line below, and checkboxes for options.

**You provide** the label, the value or placeholder, and for an error the message in Polish (*Podaj pełny adres e-mail.*).

## Field

- Default: `c-paper-2` fill, 1px `border`, `radius-md`, `c-deep-sea` text.
- Focused: a 2px solid `focus-ring` outline with a 2px offset, `bg` fill.
- Error: `error` border, `error-surface` fill, `fg` text, and a bold `error` helper line under the field. Always keep the message, never colour alone. Coral is never an error colour: it belongs to the CTA.
- Placeholder and plain helper text: `fg-3`.

Field text is 16px (smaller text makes phones zoom in on focus) and a field is 44px tall, a comfortable touch target. Labels and helper lines are 12px, option labels 14px.

## Checkbox

18px box, 5px corners, 1.5px `c-deep-sea`. Checked: `primary` fill with an `on-accent` tick (4.68:1).

## Contrast

The field border `border` is 1.36:1 on `c-paper`; where a control needs a visible edge use a `c-deep-sea` border (11.21:1). The `c-brick-red` helper is 4.75:1 on `c-paper`. Inside an error message on `c-error-wash` the text is `c-ink`; `c-brick-red` there is 4.39:1, enough for an icon or border but not for small text.
