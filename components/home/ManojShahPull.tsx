import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function ManojShahPull() {
  return (
    <section className="py-16 md:py-24 border-t border-grey-700">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Portrait — 4 cols */}
          <div className="lg:col-span-4 lg:border-r lg:border-grey-700 lg:pr-8 mb-8 lg:mb-0">
            <div className="relative aspect-[3/4] max-w-xs">
              <Image
                src="/images/placeholder-portrait.svg"
                alt="Manoj Shah"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content — 8 cols */}
          <div className="lg:col-span-8 lg:pl-8">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-gold mb-3">
              Founder &middot; Director &middot; Producer
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-cream leading-[0.9] mb-8">
              Manoj Shah
            </h2>
            <hr className="editorial-rule mb-8" />
            <blockquote className="text-xl md:text-2xl text-grey-200 leading-relaxed font-serif italic mb-8">
              &ldquo;Theatre is the last space where human beings truly
              encounter each other — no screens, no filters, no escape.&rdquo;
            </blockquote>
            <hr className="editorial-rule mb-8" />
            <p className="text-grey-400 leading-relaxed max-w-2xl">
              For over three decades, Manoj Shah has been the driving force behind Ideas Unlimited
              Productions — directing, acting, and producing over 90 productions that have challenged
              audiences and redefined Indian theatre.
            </p>
            <Link
              href="/manoj-shah"
              className="inline-block mt-6 font-mono text-sm uppercase tracking-widest text-gold hover:text-gold-light transition-colors"
            >
              Read His Story &rarr;
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
