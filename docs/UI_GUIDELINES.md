# UI Guidelines

- Mobile-first, 360px reference width; desktop for admin screens (tables, import, reports).
- Count screen: one item per card, ordered by `displayOrder`, with search and category/status filters (uncounted, selisih, done). Multi-category sessions default to a per-category filter with an "all" option.
- BAG and KONVERSI inputs side by side; `inputMode="decimal"`; SELISIH shown live with color (green zero, yellow small, red large) **and** text/icon, never color alone.
- Tare calculator: pick a container type, enter the weighed gross, show the net result.
- Sync indicator (online/offline, pending) always visible.
- Session progress: counted items out of total.
- shadcn components in use: Button, Input, Card, Tabs, Sheet/Drawer, Badge, Table, Dialog, Toast, Select.
- Language: Indonesian. All user-facing strings live in one layer (e.g. `messages/id.ts`), never hardcoded inline — see ADR-0004.
