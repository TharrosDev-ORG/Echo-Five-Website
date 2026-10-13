import { notFound } from "@/lib/content";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="surface-light">
      <Container className="grid min-h-[60vh] content-center py-20">
        <p className="text-small font-semibold text-accent">{notFound.eyebrow}</p>
        <h1 className="mt-4 max-w-[18ch] text-h1 text-fg">{notFound.heading}</h1>
        <p className="mt-6 max-w-[52ch] text-lead text-fg-2">{notFound.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" arrow>
            {notFound.primary}
          </Button>
          <Button href="/contact" variant="secondary">
            {notFound.secondary}
          </Button>
        </div>
      </Container>
    </section>
  );
}
