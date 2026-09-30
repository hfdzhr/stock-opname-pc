# 02: Firebase wiring (Auth + Firestore + offline persistence)

**What to build:** the app connected to Firebase so a user can log in and out from a phone and read/write Firestore, staying usable on poor signal.

**Blocked by:** 01 (Scaffold Next.js + shadcn + Indonesian string layer).

**Status:** resolved

- [x] Login/logout round-trip works on a phone browser against the real Firebase project
- [x] Firestore read/write works from the device
- [x] Offline persistence is enabled (writes made offline sync when signal returns)
- [x] Credentials live in env config with a documented template; no secrets committed

## Answer

Wired Google sign-in (popup) plus Firestore with persistent local cache (`persistentLocalCache` + `persistentMultipleTabManager`) in `lib/firebase.ts`; the `FirebaseStatus` component handles sign-in/out with pending and error states. Verified in a laptop browser against project `stock-opname-pc`: sign-in/out round-trip, write/read round-trip, and the 3-step offline flow (online write, offline write read back from cache, `enableNetwork` + `waitForPendingWrites` sync verified from the server). Credentials come from `NEXT_PUBLIC_*` env with an `.env.example` template; `.env.local` is git-ignored. The temporary `/cek-firestore` verification page and its `messages/id.ts` `check` strings were removed after verification, since the `connectionChecks` collection it wrote to is outside the `docs/SECURITY_RULES.md` draft.

## Comments

- Step 1 first failed with `Missing or insufficient permissions`: the offline flow wrote to `connectionChecks/{uid}-offline` while only `{uid}` was permitted. Fixed by using one document id (`connectionChecks/{uid}`) for all steps.
- Step 2 failed with `offline-write-timeout`: awaiting `setDoc` while offline never resolves (it waits for server acknowledgement). Fixed by firing the write without awaiting it and proving it via `getDocFromCache`.
- Step 3 failed with `sync-timeout`: the Firestore stream had not reconnected yet after airplane mode was switched off. Fixed with an explicit `enableNetwork` nudge and a 45s sync timeout.
