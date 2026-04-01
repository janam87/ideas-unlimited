import Link from "next/link";

export function AboutPull() {
  return (
    <section className="border-t border-grey-700">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left — label */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-[0.95]">About Us</h2>
          </div>

          {/* Right — big text + link */}
          <div className="lg:col-span-7">
            <p className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] text-cream leading-[1.15]">
              We push the figurative fourth wall — celebrating stories, literature, and India&apos;s rich cultural heritage through theatre, prose, and poetry across languages and cities.
            </p>
            <Link
              href="/about"
              className="inline-block mt-8 font-mono text-sm uppercase tracking-wider text-purple hover:text-purple-light transition-colors"
            >
              Read more about us &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
