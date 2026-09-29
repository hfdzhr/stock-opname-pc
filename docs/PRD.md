# PRD

## Goal

Make stock opname easy for the crew: count physical stock, compare it against the system stock (LPPTK), and produce a SELISIH report — without paper sheets or manual spreadsheets.

## Users

- **Admin**: manages master items, imports LPPTK data, opens sessions, approves results, exports reports.
- **Counter** (_petugas_): enters count results on a phone.

## Main flow

1. Admin imports LPPTK data (PDF, or Excel/CSV as fallback), then reviews the preview.
2. Admin creates an opname session (date, categories).
3. Counters open the session and enter counts per item (BAG and KONVERSI). Weighed items use the tare calculator.
4. SELISIH appears immediately; problem items are highlighted.
5. Admin reviews and approves the session.
6. Admin exports the report (Excel/PDF) in a layout resembling the original sheet.

## MVP

- Login and roles (admin/counter)
- Master items (PLU, category, conversion factor, tare, display order)
- LPPTK import with preview and PLU matching
- Opname sessions, count entry, automatic SELISIH
- Works on poor signal (offline persistence)
- Report export

## Deferred

- SELISIH trend history and charts
- Notifications
- Barcode scanning
- Multi-branch

## MVP done criteria

One full opname session (three categories) runs from import to export without a manual spreadsheet, and keeps working when a phone loses signal mid-entry.

## Open Questions

1. Conversion factor per item: known from elsewhere (e.g. POS master) or entered manually in the item master? (Decided: manual entry, nullable — see Q6 resolution in TASKS Decision log. Badge warns when unset; never blocks opening a session.)
2. Meaning of `x 0,80` on the "RUMUS SO" Botol row.
