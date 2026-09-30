# Tasks

Work in order; one phase per agent session.

- [ ] **Phase 1: Foundation.** Next.js + shadcn + Firebase setup, Auth (single operator), base layout, Vercel deploy.
- [ ] **Phase 2: Master items.** Item CRUD, categories, display order, tare/density config.
- [ ] **Phase 3: Import.** PDF parser first (primary source), then Excel/CSV fallback; PLU matching; preview screen (matched/new/missing/duplicate). Must implement rules 9–11 of IMPORT_SPEC (category from master, page-break joins, non-data row skipping).
- [ ] **Phase 4: Sessions and counting.** Create sessions, mobile count screen, tare calculator, offline persistence, sync indicator.
- [ ] **Phase 5: Selisih and approval.** SELISIH computation (`count − lpptk`, blank-when-uncounted — resolved from source formulas; implementation deferred until this phase), problem-item highlighting, review and approve flow, final Security Rules.
- [ ] **Phase 6: Export.** Excel/PDF reports in a layout resembling the original sheets.

## Definition of Done per phase

- Runs on a phone (test at 360px width)
- No TypeScript/lint errors
- Security Rules not loosened
- Checklist above updated

## Decisions already taken

- Web app (not native), so updates reach the operator immediately.
- Firestore with one document per item per session, so per-item offline merging stays clean.
- File parsing in the client, so Vercel serverless limits never apply.
- Single operator, login required; no roles (see ADR-0005).
- PDF is the primary import source; Excel/CSV is the fallback (Phase 3 order flipped after confirming operations sends PDF).
- UI strings Indonesian, isolated in one layer; code, identifiers, comments, commits, and all docs in English (see ADR-0004).
