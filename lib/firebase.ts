import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  type Auth,
  type UserCredential,
} from "firebase/auth";
import {
  initializeFirestore,
  getFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from "firebase/firestore";

function requireEnvValue(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const firebaseConfig = {
  apiKey: requireEnvValue(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    "NEXT_PUBLIC_FIREBASE_API_KEY"
  ),
  authDomain: requireEnvValue(
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
  ),
  projectId: requireEnvValue(
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID"
  ),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApps()[0]!;
  }
  return initializeApp(firebaseConfig);
}

export const firebaseApp: FirebaseApp = getFirebaseApp();
export const auth: Auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

// Redirect (not popup) is the only sign-in flow: popups are blocked or
// silently dropped on mobile browsers and in-app WebViews, while a
// full-page redirect works on both desktop and phones.
export function signInWithGoogle(): Promise<void> {
  return signInWithRedirect(auth, googleProvider);
}

export function resolveRedirectSignIn(): Promise<UserCredential | null> {
  return getRedirectResult(auth);
}

let firestoreInstance: Firestore | null = null;

export function getDb(): Firestore {
  if (firestoreInstance) {
    return firestoreInstance;
  }
  try {
    firestoreInstance = initializeFirestore(firebaseApp, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
      }),
    });
  } catch {
    firestoreInstance = getFirestore(firebaseApp);
  }
  return firestoreInstance;
}
