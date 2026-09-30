"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/app-header";
import { FirebaseStatus } from "@/components/firebase-status";
import { auth } from "@/lib/firebase";
import { id } from "@/messages/id";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (next) => {
      setUser(next);
      setChecking(false);
    });
  }, []);

  if (checking) {
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-6 px-6 text-center">
        <p role="status" className="text-muted-foreground text-sm">
          {id.guard.checking}
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            {id.app.name}
          </h1>
          <p className="text-muted-foreground text-base leading-7">
            {id.app.tagline}
          </p>
        </div>
        <FirebaseStatus />
        <Button size="lg" disabled>
          {id.app.foundationNote}
        </Button>
      </main>
    );
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            {id.home.title}
          </h1>
          <p className="text-muted-foreground text-base leading-7">
            {id.app.foundationNote}
          </p>
        </div>
      </main>
    </>
  );
}
