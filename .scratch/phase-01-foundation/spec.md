# Phase 1: Foundation — Spec

Source of truth: `docs/TASKS.md` (Phase 1), `docs/DATA_MODEL.md` (users), `docs/SECURITY_RULES.md` (rules draft), ADR-0004 (Indonesian UI / English project).

## Scope

Standing up the runnable skeleton everything else builds on: Next.js app, Firebase backend connection, roles, and a live staging URL. No domain logic (no master items, no import, no counting) — that belongs to Phases 2+.

## Out of scope

- Item CRUD, categories, tare config (Phase 2)
- Any parser or preview screen (Phase 3)
- Session / count screens (Phase 4)
- SELISIH computation (Phase 5)

## Phase Definition of Done

- Runs on a phone (tested at 360px width)
- No TypeScript/lint errors
- Security Rules not loosened relative to `docs/SECURITY_RULES.md`
- `docs/TASKS.md` Phase 1 checklist checked off
