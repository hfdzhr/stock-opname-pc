# Domain

Terms are defined in [`CONTEXT.md`](../CONTEXT.md). This file holds the details: sheet layout, formulas, tare table, and raw-data quirks.

## Sheet layout

The source sheet has grouped columns: `DES | PLU (BAG, KONVERSI) | LPPTK (BAG, KONVERSI) | PERHITUNGAN (BAG, KONVERSI) | SELISIH (BAG, KONVERSI)`.

## The three categories

- **bahan_baku**: syrups, powders, milk, sugar, tea (BEANS, VANILLA, GULA 5kg, FRESHMILK, …)
- **bahan_toko**: oats, ice, whip cream, packaged drinks, muffins, cakes, espresso and cold brew variants (OAT, CLEO 19L, MUFFIN, COLDB, …)
- **sarana**: cups, straws, lids, packaging, condiments, N20 (CUP 8oz, STRAW, LID DOME, …)

## SELISIH formula

Resolved from the formulas embedded in `SO_Rekap.xlsx` (identical on all three sheets):

```
SELISIH = IF(PERHITUNGAN = "", "", PERHITUNGAN − LPPTK)
```

Computed separately for the BAG and KONVERSI columns. A blank PERHITUNGAN yields a blank SELISIH (not zero). Implementation in code is deferred (no formula work needed yet); when implemented, recompute on approval so the final numbers never depend on a counter's device.

## Conversion

`konversi = bag × conversionFactor` (+ any loose small-unit remainder). The factor is stored per master item (`conversionFactor`) and is nullable — when null, the counter enters BAG and KONVERSI manually.

## Tare (container weight), from the "RUMUS SO" block on the sarana sheet

When weighing a filled container, subtract the container weight first. Values in grams:

| Container   | Tare (g) |
|-------------|----------|
| Botol       | 78       |
| Jelly 2kg   | 82       |
| Jelly 1kg   | 62       |
| Powder      | 180      |
| Seasoning   | 40       |
| Tupperware  | 180      |
| Gula        | 190      |
| Sauce       | 160      |

Standard weight per 1 liter: **ESP1L = 306 g**, **CB1L = 200 g** (to convert grams to liters or back).

The `x 0,80` suffix on the Botol row is unresolved (Open Question 2 in PRD). Until the sheet author clarifies, the tare calculator treats Botol as a plain −78 g like every other container.

## Raw-data quirks the importer must handle

- Duplicate rows in one file: `MUFFIN BANANA` twice with the identical PLU `20122564`; `OAT1000ml` twice, once with dual PLU (`20122061` + `20122239`) and once with only `20122061`.
- Single-code items (read as PLU BAG): CUP 8oz (`20069607`), EBT, GREENFIELDS, … — the majority of the sarana and bahan_toko lists.
- Dual-code items: GULA 5kg (`20101055` and `20069644`).
- Same name, different categories: ALMOND in bahan_baku (`20131238` + `20131338`) and in bahan_toko (`20078771`, single). These are two different items; never merge by name (see ADR-0003).
