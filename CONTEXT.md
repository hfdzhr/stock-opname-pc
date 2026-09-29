# Stock Opname

Glossary for the coffee-point stock opname (physical inventory count) app. Canonical terms keep the operational Indonesian words because they appear in source files, column headers, and the UI.

## Counting

**LPPTK**:
The system-recorded stock used as the comparison baseline for a session.
_Avoid_: system stock, book stock

**PERHITUNGAN**:
The physical count entered by a counter during a session.
_Avoid_: actual stock, counted stock, count result

**SELISIH**:
The difference between PERHITUNGAN and LPPTK, computed per BAG and KONVERSI column.
_Avoid_: variance, delta, discrepancy

**BAG**:
The bulk unit of an item (sack, carton, bottle, pack).
_Avoid_: large unit, bulk

**KONVERSI**:
The small unit of an item (gram, ml, pcs) converted from BAG.
_Avoid_: small unit, converted unit

## Identity

**PLU**:
The numeric item code. An item has a PLU BAG and optionally a PLU KONVERSI.
_Avoid_: SKU, barcode, product code

**Item**:
A master-data entry identified by its PLU, not its name. Names may repeat across categories and rows.
_Avoid_: product, material, goods

**Category**:
One of `bahan_baku` (raw ingredients), `bahan_toko` (store goods), or `sarana` (supplies and packaging).
_Avoid_: group, type, department

## Session

**Session**:
One opname round covering one or more categories, from LPPTK import through counting, review, approval, and export.
_Avoid_: round, period, stocktake event

**Tare**:
The weight of an empty container, subtracted before converting a weighed gross into net content.
_Avoid_: container weight, packaging deduction
