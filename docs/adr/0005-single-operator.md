# Single operator, login required

The app is operated end to end by one person: import, counting, review, approval, and export are all done by the same operator on their own device.

There are no roles and no second user type. The earlier admin/counter split (PRD, DATA_MODEL, SECURITY_RULES draft) is dropped:

- No `role` custom claim; Firebase Auth login alone gates access.
- The `users/{uid}` collection is removed from the data model. The operator's identity is the Auth UID already stored in `createdBy`, `countedBy`, and `approvedBy`.
- Security Rules require only `signedIn()` for reads and writes; the `isAdmin()` helper and role checks are removed. Data is not public: every rule still requires login.
- ADR-0002's one-document-per-line structure is kept. With a single operator it still gives clean per-item offline merge and avoids one contended session document.

If a second user type is ever needed, reintroduce a `role` claim then; the `*By` UID fields already support attribution.
