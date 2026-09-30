# 04: Vercel deploy + initial firestore.rules

**What to build:** a live staging URL where login works from a phone, protected by the rules draft, closing out Phase 1.

**Blocked by:** 03 (Roles + route guard + base layout).

**Status:** claimed

## Plan (single operator, per ADR-0005)

Human steps (only you can do these):

1. **Firebase console — authorized domains.** Open the Firebase console → your project `stock-opname-pc` → Authentication → Settings → Authorized domains → add the Vercel staging domain (e.g. `*.vercel.app` or the exact URL). Without this, Google sign-in popup is blocked on the staging URL.
2. **Firebase console — deploy rules.** Firestore → Rules tab → paste the rules from `docs/SECURITY_RULES.md` (single-operator draft: `signedIn()` only, no `isAdmin()`) → Publish. Verify the Publish timestamp.
3. **Vercel — create project and deploy.** Import the repo (or the `web/` directory) in Vercel, framework preset Next.js. Add env vars from `.env.local` (all six `NEXT_PUBLIC_FIREBASE_*` values) in the Vercel project settings. Deploy and copy the staging URL.
4. **Verify from a phone browser:** open the staging URL at 360px width, sign in with Google, confirm the signed-in view renders, sign out, confirm the landing view returns.

Agent-verifiable after deploy:

- `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build` green (run before handing over).
- Report back the staging URL + Publish timestamp; the agent records them in this ticket and checks off `docs/TASKS.md` Phase 1.

- [ ] Staging URL live; login works from a phone via the URL
- [ ] Deployed rules match `docs/SECURITY_RULES.md` with no loosening
- [ ] Phase 1 Definition of Done met (360px check, zero TS/lint errors, rules not loosened)
- [ ] `docs/TASKS.md` Phase 1 checklist checked off in the same change
