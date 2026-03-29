import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-gold mb-6">
          404
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-cream mb-6">
          The curtain has fallen
          <br />
          on this page
        </h1>
        <p className="text-grey-400 text-lg mb-10 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist — perhaps it&apos;s
          waiting in the wings for a future production.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/">Return Home</Button>
          <Button href="/productions" variant="outline">
            Browse Productions
          </Button>
        </div>
      </Container>
    </div>
  );
}
