"use client";
import { AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function GlobalError({ error, reset }) {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-bold">Something went wrong on our end</h1>
      <p className="mt-2 max-w-md text-muted">An unexpected error occurred. You can try again or head back to the home page.</p>
      {error?.digest && <p className="mt-2 font-mono text-xs text-muted">Ref: {error.digest}</p>}
      <div className="mt-6 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="outline">Back to home</Button>
      </div>
    </div>
  );
}
