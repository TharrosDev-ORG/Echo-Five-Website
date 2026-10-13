"use client";

import { useEffect } from "react";
import { errorPage } from "@/lib/content";
import { mailtoBook } from "@/lib/site";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="surface-light">
      <Container className="grid min-h-[60vh] content-center py-20">
        <p className="text-small font-semibold text-accent">{errorPage.eyebrow}</p>
        <h1 className="mt-4 max-w-[18ch] text-h1 text-fg">{errorPage.heading}</h1>
        <p className="mt-6 max-w-[52ch] text-lead text-fg-2">{errorPage.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={reset}>{errorPage.primary}</Button>
          <Button href={mailtoBook} variant="secondary">
            {errorPage.secondary}
          </Button>
        </div>
      </Container>
    </section>
  );
}
