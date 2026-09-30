"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { auth, signInWithGoogle } from "@/lib/firebase";
import { id } from "@/messages/id";

export function FirebaseStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  async function handleSignIn() {
    setPending(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch {
      setError(id.auth.signInFailed);
    } finally {
      setPending(false);
    }
  }

  async function handleSignOut() {
    setPending(true);
    setError(null);
    try {
      await signOut(auth);
    } catch {
      setError(id.auth.signOutFailed);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-3 rounded-xl border p-4">
      <p className="text-sm">
        {user ? `${id.auth.signedInAs} ${user.email}` : id.auth.notSignedIn}
      </p>
      {error && (
        <p role="alert" className="text-destructive text-sm">
          {error}
        </p>
      )}
      {user ? (
        <Button size="lg" onClick={handleSignOut} disabled={pending}>
          {id.auth.signOut}
        </Button>
      ) : (
        <Button size="lg" onClick={handleSignIn} disabled={pending}>
          {pending ? id.auth.signingIn : id.auth.signInWithGoogle}
        </Button>
      )}
    </div>
  );
}
