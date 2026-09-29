import { Button } from "@/components/ui/button";
import { FirebaseStatus } from "@/components/firebase-status";
import { id } from "@/messages/id";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">{id.app.name}</h1>
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
