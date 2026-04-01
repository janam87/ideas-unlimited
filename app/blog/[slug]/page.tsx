import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

function getReadingTime(body: string[]): number {
  const words = body.join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const readingTime = getReadingTime(post.body);
  const allPosts = getAllPosts().filter((p) => p.slug !== post.slug);
  const relatedPosts = allPosts.slice(0, 3);

  // Insert images after every 3rd paragraph
  const imageInsertAfter = new Set([2, 5]);

  return (
    <>
      {/* Article — 5/7 split */}
      <section className="pt-28 md:pt-32 border-b border-grey-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left — meta */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <span className="font-mono text-xs uppercase tracking-widest text-gold">
                  {post.category}
                </span>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight mt-3">
                  {post.title}
                </h1>
                <div className="flex items-center gap-3 mt-4">
                  <span className="font-mono text-sm text-grey-400">
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-grey-600">&middot;</span>
                  <span className="font-mono text-sm text-grey-400">
                    {readingTime} min read
                  </span>
                </div>
              </div>
            </div>

            {/* Right — body with inline images */}
            <div className="lg:col-span-7">
              {post.body.map((paragraph, i) => (
                <div key={i}>
                  <p className="text-grey-200 text-lg leading-relaxed mb-6">
                    {paragraph}
                  </p>
                  {imageInsertAfter.has(i) && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden mb-8">
                      <Image
                        src="/images/placeholder-production.svg"
                        alt={`${post.title} — illustration`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts — 5/7 split */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-grey-700">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
                  More<br className="hidden lg:block" /> Stories
                </h2>
              </div>
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                      <div className="relative aspect-[4/3] overflow-hidden mb-3">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest text-gold">
                        {related.category}
                      </span>
                      <h3 className="font-serif text-base text-cream group-hover:text-gold transition-colors leading-snug mt-1">
                        {related.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
