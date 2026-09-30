# Security Rules (draft, review before use)

Principles:

- All access requires login (single operator, see ADR-0005). Data is not public.
- Master items and tare config: the operator reads and writes.
- Sessions: the operator creates and changes status.
- Lines: `count`, `note`, `countedBy`, `countedAt` (and the recomputed `diff`) may change only while the session status is `counting`.
- An `approved` session cannot be changed by anyone.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    function signedIn() { return request.auth != null; }

    match /items/{id}  { allow read: if signedIn(); allow write: if signedIn(); }
    match /config/{id} { allow read: if signedIn(); allow write: if signedIn(); }

    match /sessions/{sid} {
      allow read: if signedIn();
      allow create: if signedIn();
      allow update: if signedIn() && resource.data.status != 'approved';

      match /lines/{lid} {
        allow read: if signedIn();
        allow create: if signedIn();
        allow update: if signedIn()
          && get(/databases/$(db)/documents/sessions/$(sid)).data.status == 'counting'
          && request.resource.data.diff(resource.data).affectedKeys()
               .hasOnly(['count','diff','note','countedBy','countedAt']);
      }
    }
  }
}
```

Note: `diff` is recomputed on approval so the final numbers never depend on a transient device state.
