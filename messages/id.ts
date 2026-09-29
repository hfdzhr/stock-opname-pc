export const id = {
  app: {
    name: "Stok Opname",
    tagline:
      "Aplikasi hitung fisik persediaan coffee point: hitung, bandingkan dengan LPPTK, dan hasilkan laporan selisih.",
    foundationNote:
      "Fondasi aplikasi sudah berdiri. Fitur opname menyusul di fase berikutnya.",
  },
  auth: {
    signedInAs: "Masuk sebagai",
    notSignedIn: "Belum masuk. Masuk untuk mulai menghitung.",
    signOut: "Keluar",
  },
} as const;

export type IndonesianStrings = typeof id;
