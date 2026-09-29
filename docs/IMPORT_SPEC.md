# Import Spec

## Sources

PDF is the primary source: operations sends a single PDF (e.g. `(SO) Stock Opname - Point Coffee 2026 - Bahan Baku.pdf`) containing all categories. Excel/CSV is the fallback. All four sample PDFs hold real text (not scans), so client-side extraction works.

## Rules

1. Parse in the client (pdf.js for PDF, SheetJS for Excel/CSV). No file upload to any server (see ADR-0001).
2. The match key is the **PLU**. Row order and column order may change and must never be relied on.
3. Read the header (`DES`/`DESKRIPSI`, `PLU`, `LPPTK`, `BAG`, `KONVERSI`) to map columns, never fixed positions.
4. Rows with two numeric codes parse as `[pluBag, pluKonversi]`; a single code parses as `pluBag` with `pluKonversi = null` (see ADR-0003).
5. Items missing from the master are flagged **NEW**; master items missing from the file are flagged **MISSING**.
6. Duplicate PLUs in one file are flagged **DUPLICATE** for the admin to merge or ignore. Two patterns exist in the wild: identical twin rows (`MUFFIN BANANA` twice with PLU `20122564`) and same-name-different-PLU rows (two `OAT1000ml` rows); never auto-merge either.
7. Show a **preview screen** with a summary (matched/new/missing/duplicate counts) before persisting anything.
8. Import results persist as LPPTK snapshots under `sessions/{id}/lines`.
9. **Category comes from the master, never from the file.** The main PDF titles every page "BAHAN BAKU" even when the rows are store goods and supplies. Match each row's PLU against the master to determine its category; rows whose PLU matches nothing are NEW (rule 5).
10. **PDF page breaks split rows.** Rows are cut mid-line at page boundaries (e.g. `TROPICAL … 20134358 2`, `PLASTIK SEAL … 201`). The PDF parser must join continued rows across pages, never treat a page-break fragment as its own row.
11. Non-data rows are skipped: titles, legend lines, header rows, and the `RUMUS SO` reference block (detect by the text `RUMUS SO`).

## Example raw rows (from the original sheets)

```
GULA 5kg       20101055  20069644
CUP 8oz        20069607
OAT1000ml      20122061  20122239
MUFFIN BANANA  20122564
```

The PERHITUNGAN and SELISIH columns on the original sheets are empty; they are filled in the app.
