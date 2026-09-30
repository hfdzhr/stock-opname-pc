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
    signInFailedUnauthorizedDomain:
      "Domain aplikasi belum diizinkan di Firebase. Tambahkan domain ini di Authentication → Settings → Authorized domains, lalu coba lagi.",
    signInFailedPopupBlocked:
      "Popup login diblokir browser. Izinkan popup untuk situs ini, lalu coba lagi.",
    signInFailedPopupClosed:
      "Jendela login Google ditutup sebelum selesai. Coba lagi.",
    signInFailedNetwork:
      "Jaringan bermasalah. Periksa koneksi lalu coba lagi.",
    signInFailedProviderDisabled:
      "Login Google belum aktif di Firebase. Aktifkan Google di Authentication → Sign-in method.",
    signOutFailed: "Gagal keluar. Coba lagi.",
    signOut: "Keluar",
  },
} as const;

export type IndonesianStrings = typeof id;
