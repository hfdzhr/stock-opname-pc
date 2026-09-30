"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { auth, resolveRedirectSignIn, signInWithGoogle } from "@/lib/firebase";
import { id } from "@/messages/id";

function getErrorCode(error: unknown): string {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string") {
      return code;
    }
  }
  return "";
}

function toSignInMessage(error: unknown): string {
  switch (getErrorCode(error)) {
    case "auth/unauthorized-domain":
      return id.auth.signInFailedUnauthorizedDomain;
    case "auth/popup-blocked":
      return id.auth.signInFailedPopupBlocked;
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return id.auth.signInFailedPopupClosed;
    case "auth/network-request-failed":
      return id.auth.signInFailedNetwork;
    case "auth/operation-not-allowed":
      return id.auth.signInFailedProviderDisabled;
    default:
      return id.auth.signInFailed;
  }
}

export function FirebaseStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState(false);
  const [resolvingRedirect, setResolvingRedirect] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    let cancelled = false;
    resolveRedirectSignIn()
      .then(() => {
        if (!cancelled) {
          setResolvingRedirect(false);
        }
      })
      .catch((redirectError: unknown) => {
        if (!cancelled) {
          setError(toSignInMessage(redirectError));
          setResolvingRedirect(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSignIn() {
    setPending(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (signInError: unknown) {
      setError(toSignInMessage(signInError));
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

  const busy = pending || resolvingRedirect;

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
        <Button size="lg" onClick={handleSignIn} disabled={busy}>
          {pending ? id.auth.signingIn : id.auth.signInWithGoogle}
        </Button>
      )}
    </div>
  );
}
