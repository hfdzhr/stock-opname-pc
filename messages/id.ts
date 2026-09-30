export const id = {
  app: {
    name: "Stok Opname",
    tagline:
      "Aplikasi hitung fisik persediaan coffee point: hitung, bandingkan dengan LPPTK, dan hasilkan laporan selisih.",
    foundationNote:
      "Fondasi aplikasi sudah berdiri. Fitur opname menyusul di fase berikutnya.",
  },
  guard: {
    checking: "Memeriksa sesi masuk...",
  },
  home: {
    title: "Beranda",
  },
  auth: {
    signedInAs: "Masuk sebagai",
    notSignedIn: "Belum masuk. Masuk untuk mulai menghitung.",
    signInWithGoogle: "Masuk dengan Google",
    signingIn: "Memproses masuk...",
    signInFailed: "Gagal masuk. Coba lagi.",
    signOutFailed: "Gagal keluar. Coba lagi.",
    signOut: "Keluar",
  },
} as const;

export type IndonesianStrings = typeof id;
