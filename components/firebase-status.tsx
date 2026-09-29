"use client";

import { useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { id } from "@/messages/id";

export function FirebaseStatus() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  async function handleSignOut() {
    await signOut(auth);
  }

  return (
    <div className="flex w-full flex-col items-center gap-3 rounded-xl border p-4">
      <p className="text-sm">
        {user ? `${id.auth.signedInAs} ${user.email}` : id.auth.notSignedIn}
      </p>
      {user && (
        <Button size="lg" onClick={handleSignOut}>
          {id.auth.signOut}
        </Button>
      )}
    </div>
  );
}
