# PLU as item identity

An item's identity is its PLU (PLU BAG when present), never its name. Names may repeat: across categories (ALMOND in bahan_baku and bahan_toko are two different items) and across rows in one file (two `OAT1000ml` rows, two `MUFFIN BANANA` rows).

A single-code row is read as PLU BAG with PLU KONVERSI null. The importer and master must never merge or match by name.
