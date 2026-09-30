# 03: Login guard + base layout (single operator)

**What to build:** every screen except the landing page requires login; one shared base layout (header with app name and sign-out) wraps the authenticated screens.

**Blocked by:** 02 (Firebase wiring).

**Status:** resolved

- [x] Unauthenticated visits see the landing page with sign-in
- [x] Authenticated operator sees the base layout with sign-out; sign-out returns to the landing view
- [x] Verified in a phone-width browser: both states render at 360px
- [x] All guard/layout strings Indonesian via the string layer; route paths stay English per ADR-0004

## Answer

Single-operator guard per ADR-0005, simplified to one route: `/` renders the sign-in landing view when signed out and the protected view (header with sign-out + Beranda content) when signed in. No separate `/beranda` route — route paths are code identifiers, so they stay English per ADR-0004; only the visible title "Beranda" is Indonesian. `components/app-header.tsx` holds the shared header; auth state comes from `onAuthStateChanged` in the page. All strings (`guard.checking`, `home.title`) in `messages/id.ts`. Lint, typecheck, and production build green; signed-out and signed-in renders verified at 360px in a real browser.

**Notes:** single operator per ADR-0005 — no roles, no custom claims, no per-role routes. Route groups stay flat for now; future phases add screens under the same guard.
