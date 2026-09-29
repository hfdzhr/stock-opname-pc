# 02: Firebase wiring (Auth + Firestore + offline persistence)

**What to build:** the app connected to Firebase so a user can log in and out from a phone and read/write Firestore, staying usable on poor signal.

**Blocked by:** 01 (Scaffold Next.js + shadcn + Indonesian string layer).

**Status:** ready-for-agent

- [ ] Login/logout round-trip works on a phone browser against the real Firebase project
- [ ] Firestore read/write works from the device
- [ ] Offline persistence is enabled (writes made offline sync when signal returns)
- [ ] Credentials live in env config with a documented template; no secrets committed
