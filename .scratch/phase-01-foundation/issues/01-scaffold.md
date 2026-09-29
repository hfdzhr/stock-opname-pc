# 01: Scaffold Next.js + shadcn + Indonesian string layer

**What to build:** a blank app shell whose visible strings are Indonesian and flow through one string layer, rendering cleanly at 360px width.

**Blocked by:** None (can start immediately).

**Status:** resolved

- [x] Production build, typecheck, and lint all pass with zero errors
- [x] Blank landing page renders correctly at 360px width (mobile-first)
- [x] Every user-facing string resolves through the single Indonesian string layer; no hardcoded UI text outside it
- [x] Code, identifiers, and comments in English per ADR-0004

## Answer

Scaffolded with `pnpm create next-app@latest --use-pnpm --typescript --tailwind --eslint --app --yes` (Next 16.3.6, React 19, Tailwind v4) per Context7 `/vercel/next.js` docs, then `pnpm dlx shadcn@latest init -d`. App shell: `messages/id.ts` string layer + Indonesian landing page (`app/page.tsx`, `lang="id"`). `pnpm build` and `pnpm lint` green. AGENTS.md merged with Next.js agent-rules block.
