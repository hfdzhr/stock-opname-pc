# 03: Roles + route guard + base layout (admin/counter)

**What to build:** two roles with enforced boundaries — a counter cannot open admin screens and vice versa — inside a base layout per role.

**Blocked by:** 02 (Firebase wiring).

**Status:** ready-for-agent

- [ ] Role stored on the user record and enforced as the Firebase Auth custom claim (source of truth for rules)
- [ ] Admin-only and counter-only areas redirect unauthorized roles
- [ ] Verified with one account per role: each sees only its own layout and routes
- [ ] All role/permission strings Indonesian via the string layer
