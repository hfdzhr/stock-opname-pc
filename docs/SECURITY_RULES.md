# Security Rules (draft, review before use)

Principles:

- All access requires login.
- Master items: all roles read, admin writes.
- Sessions: only admin creates and changes status.
- Lines: counters may only change `count`, `note`, `countedBy`, `countedAt`, and only while the session status is `counting`.
- An `approved` session cannot be changed by anyone.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    function signedIn() { return request.auth != null; }
    function isAdmin()  { return signedIn() && request.auth.token.role == 'admin'; }

    match /items/{id}  { allow read: if signedIn(); allow write: if isAdmin(); }
    match /config/{id} { allow read: if signedIn(); allow write: if isAdmin(); }

    match /sessions/{sid} {
      allow read: if signedIn();
      allow create: if isAdmin();
      allow update: if isAdmin() && resource.data.status != 'approved';

      match /lines/{lid} {
        allow read: if signedIn();
        allow create: if isAdmin();
        allow update: if signedIn()
          && get(/databases/$(db)/documents/sessions/$(sid)).data.status == 'counting'
          && request.resource.data.diff(resource.data).affectedKeys()
               .hasOnly(['count','diff','note','countedBy','countedAt']);
      }
    }
  }
}
```

Note: `diff` is recomputed on approval so the final numbers never depend on a counter's device.
