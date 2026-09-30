# One document per session line

Each counted item in a session is its own Firestore document (`sessions/{sessionId}/lines/{itemId}`) instead of one array or map on the session.

Each line is its own document, so per-item offline merging stays clean with no last-writer-wins clobbering across items. The alternative (a single session document with an embedded lines array) would serialize every keystroke through one contended document.
