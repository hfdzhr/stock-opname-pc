# Data Model (Firestore)

```
items/{itemId}
sessions/{sessionId}
sessions/{sessionId}/lines/{itemId}
users/{uid}
```

## items/{itemId}

`itemId` = PLU BAG when present, otherwise the single PLU (which by convention is the BAG code — see ADR-0003).

```json
{
  "name": "GULA 5kg",
  "category": "bahan_baku",
  "pluBag": "20101055",
  "pluKonversi": "20069644",
  "conversionFactor": null,
  "tareKey": "gula",
  "displayOrder": 25,
  "active": true,
  "updatedAt": "<timestamp>"
}
```

Single-code example:

```json
{ "name": "CUP 8oz", "category": "sarana", "pluBag": "20069607", "pluKonversi": null,
  "conversionFactor": null, "tareKey": null, "displayOrder": 1, "active": true }
```

`conversionFactor` is nullable: null means the counter enters BAG and KONVERSI manually. Sessions containing items with a null factor show a warning badge but still open.

## tare (configuration, single document `config/tare`)

```json
{ "botol": 78, "jelly2kg": 82, "jelly1kg": 62, "powder": 180,
  "seasoning": 40, "tupperware": 180, "gula": 190, "sauce": 160,
  "density": { "ESP1L": 306, "CB1L": 200 } }
```

## sessions/{sessionId}

One session may cover multiple categories; the phone UI filters per category.

```json
{
  "date": "2026-09-29",
  "categories": ["bahan_baku", "bahan_toko", "sarana"],
  "status": "draft | counting | review | approved",
  "createdBy": "<uid>",
  "approvedBy": null,
  "importId": "<string>"
}
```

## sessions/{sessionId}/lines/{itemId}

One document per item so several counters can write concurrently without overwriting each other (see ADR-0002).

```json
{
  "itemId": "20101055",
  "nameSnapshot": "GULA 5kg",
  "lpptk": { "bag": 3, "konversi": 15000 },
  "count": { "bag": 2, "konversi": 4500 },
  "diff":  { "bag": -1, "konversi": -10500 },
  "countedBy": "<uid>",
  "countedAt": "<timestamp>",
  "note": ""
}
```

`lpptk` is a snapshot taken at import. Later master changes must not alter old sessions.

## users/{uid}

```json
{ "name": "...", "role": "admin | petugas" }
```

The role is also stored as a Firebase Auth custom claim (source of truth for Security Rules).
