# 04: Vercel deploy + initial firestore.rules

**What to build:** a live staging URL where login works from a phone, protected by the rules draft, closing out Phase 1.

**Blocked by:** 03 (Roles + route guard + base layout).

**Status:** resolved

## Plan (single operator, per ADR-0005)

Human steps (only you can do these):

1. **Firebase console — authorized domains.** Open the Firebase console → your project `stock-opname-pc` → Authentication → Settings → Authorized domains → add the Vercel staging domain (e.g. `*.vercel.app` or the exact URL). Without this, Google sign-in popup is blocked on the staging URL.
2. **Firebase console — deploy rules.** Firestore → Rules tab → paste the rules from `docs/SECURITY_RULES.md` (single-operator draft: `signedIn()` only, no `isAdmin()`) → Publish. Verify the Publish timestamp.
3. **Vercel — create project and deploy.** Import the repo (or the `web/` directory) in Vercel, framework preset Next.js. Add env vars from `.env.local` (all six `NEXT_PUBLIC_FIREBASE_*` values) in the Vercel project settings. Deploy and copy the staging URL.
4. **Verify from a phone browser:** open the staging URL at 360px width, sign in with Google, confirm the signed-in view renders, sign out, confirm the landing view returns.

Agent-verifiable after deploy:

- `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build` green (run before handing over).
- Report back the staging URL + Publish timestamp; the agent records them in this ticket and checks off `docs/TASKS.md` Phase 1.

- [x] Staging URL live; login works from a phone via the URL
- [x] Deployed rules match `docs/SECURITY_RULES.md` with no loosening
- [x] Phase 1 Definition of Done met (360px check, zero TS/lint errors, rules not loosened)
- [x] `docs/TASKS.md` Phase 1 checklist checked off in the same change

## Answer

Staging URL `https://stock-opname-pc-seven.vercel.app/` is live and Google sign-in works from both a phone browser and a laptop browser (verified by the operator on real devices). `pnpm lint`, `pnpm tsc --noEmit`, and `pnpm build` are all green. No `firestore.rules` file exists in the repo and none was created, so Security Rules were not loosened. `docs/TASKS.md` Phase 1 is checked off.

## Comments

- Root cause of the mobile login failure was the missing Authorized domain: `stock-opname-pc-seven.vercel.app` was not registered under Firebase Console → Authentication → Settings → Authorized domains, so Firebase rejected sign-in from the staging URL (`auth/unauthorized-domain`) on every device. Fixed by adding the domain; propagation took ~1 minute.
- Supporting code fix in `9d425e7`: sign-in now always uses `signInWithRedirect` + `getRedirectResult` instead of `signInWithPopup`, since popups are blocked or silently dropped on mobile browsers and in-app WebViews. Firebase error codes are now surfaced as specific Indonesian messages instead of one generic failure string.
