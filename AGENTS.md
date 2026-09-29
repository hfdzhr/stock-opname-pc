## Project
Web app for stock opname (physical inventory count) at a coffee point. Used by admins and counters, mostly on phones. Details in `docs/`.

## Stack
- Next.js (App Router) + React + TypeScript
- shadcn/ui + Tailwind
- Firebase Auth + Firestore (offline persistence on)
- Deploy: Vercel
- Import files (PDF/Excel/CSV) parsed in the **client** (pdf.js, SheetJS), never on a server

## Rules
1. Items always match by **PLU**, never by row order or name.
2. Mobile-first: 360px target, big buttons, numeric input uses `inputMode="decimal"`.
3. Do not change `firestore.rules` without explicit confirmation.
4. Do not guess business formulas or terms. Read `docs/DOMAIN.md`; if missing, add to Open Questions and ask.
5. Work one phase from `docs/TASKS.md` per session. Do not start the next phase unasked.
6. All UI strings in Indonesian, isolated in one layer (see ADR-0004). Code, identifiers, comments, commits, and docs in English.
7. No new dependencies without a written reason.

## Quick references
- What is built: `docs/PRD.md`
- Terms and formulas: `docs/DOMAIN.md` (glossary: `CONTEXT.md`)
- Firestore schema: `docs/DATA_MODEL.md`
- Import: `docs/IMPORT_SPEC.md`
- Progress: `docs/TASKS.md`

## Agent skills

### Issue tracker

Issues live as markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Using the default triage label vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
