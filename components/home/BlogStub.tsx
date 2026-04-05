import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";

const FEATURED_SLUGS = [
  "travelling-theatre-siachen",
  "karl-marx-kalbadevi-story",
  "adbhut-every-brilliant-thing-gujarati",
];

export function BlogStub() {
  const posts = FEATURED_SLUGS
    .map((slug) => BLOG_POSTS.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <section className="border-t border-grey-700">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left — section title */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-[0.95]">
              Stories &amp;<br />Reflections
            </h2>
            <p className="text-grey-400 text-sm mt-4 leading-relaxed">
              Behind-the-scenes stories, directorial notes, and reflections on 35 years of theatre.
            </p>
          </div>

          {/* Right — blog cards grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post!.slug}
                  href={`/blog/${post!.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden mb-4">
                    <Image
                      src={post!.image}
                      alt={post!.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-widest text-purple mb-2">
                    {post!.category}
                  </p>
                  <h3 className="font-serif text-lg text-cream group-hover:text-purple transition-colors leading-snug">
                    {post!.title}
                  </h3>
                </Link>
              ))}
            </div>
            <Link
              href="/blog"
              className="inline-block mt-8 font-mono text-sm uppercase tracking-wider text-purple hover:text-purple-light transition-colors"
            >
              Read more &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
