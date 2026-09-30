"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { id } from "@/messages/id";

export function AppHeader() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSignOut() {
    setPending(true);
    try {
      await signOut(auth);
      router.replace("/");
    } finally {
      setPending(false);
    }
  }

  return (
    <header className="flex w-full items-center justify-between gap-3 border-b px-4 py-3">
      <p className="text-base font-semibold tracking-tight">{id.app.name}</p>
      <Button
        size="sm"
        variant="outline"
        onClick={handleSignOut}
        disabled={pending}
      >
        {id.auth.signOut}
      </Button>
    </header>
  );
}
