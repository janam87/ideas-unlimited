import Image from "next/image";
import Link from "next/link";

export function ManojShahPull() {
  return (
    <section className="border-t border-grey-700">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left — section title */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-[0.95]">
              The Founder
            </h2>
          </div>

          {/* Right — photo stacked above text */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden mb-8">
              <Image
                src="/images/people/manoj-shah.jpg"
                alt="Manoj Shah"
                fill
                className="object-cover"
              />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-purple mb-3">
              Founder &middot; Director &middot; Producer
            </p>
            <h3 className="font-serif text-3xl md:text-4xl text-cream leading-[0.9] mb-6">
              Manoj Shah
            </h3>
            <blockquote className="text-lg md:text-xl text-grey-200 leading-relaxed font-serif italic mb-6">
              &ldquo;Theatre is the last space where human beings truly
              encounter each other — no screens, no filters, no escape.&rdquo;
            </blockquote>
            <hr className="editorial-rule mb-6" />
            <p className="text-grey-400 leading-relaxed max-w-2xl">
              For over three decades, Manoj Shah has been the driving force behind Ideas Unlimited
              Productions — directing, acting, and producing over 90 productions that have challenged
              audiences and redefined Indian theatre.
            </p>
            <Link
              href="/manoj-shah"
              className="inline-block mt-6 font-mono text-sm uppercase tracking-widest text-purple hover:text-purple-light transition-colors"
            >
              Read His Story &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
