<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project rules (all agents)

Read `CLAUDE.md` for the architecture and the rules, `TODO.md` for the next tasks and `docs/DECISIONS.md` for decisions already made. In short:

- Work on the `next` branch. Never push to `main`; push anywhere only when the owner asks.
- `design-system/` is the single source of colours, type, spacing and shadows. Site CSS reads tokens and roles; do not add raw values for what a token covers.
- Both themes must work: `data-theme="light"` and `data-theme="dark"` on `<html>`.
- Internal links and assets go through `withBase()` from `components/base.js`.
- Copy is Polish, formal plural. Code, comments and docs are English.
- After a change: `npm run build`, then `scripts/check-pages.cjs` and `scripts/check-interactions.cjs` (see `CLAUDE.md`). Report what you ran and what you did not.
- Do not re-run a mechanical port from `html-prototype`: the files in `components/` and `styles/` have hand edits on top.
