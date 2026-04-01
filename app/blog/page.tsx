import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Stories & Reflections — Ideas Unlimited Productions",
  description:
    "Behind-the-scenes stories, directorial notes, and reflections on 35 years of theatre by Ideas Unlimited Productions.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Header */}
      <section className="pt-28 md:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream leading-[0.9]">
                Stories &amp;<br />Reflections
              </h1>
              <p className="font-mono text-sm text-grey-400 mt-3">
                Behind-the-scenes stories, directorial notes, and reflections on 35 years of theatre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="border-t border-grey-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article>
                  <div className="relative aspect-[4/3] overflow-hidden mb-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-purple">
                      {post.category}
                    </span>
                    <span className="text-grey-600 text-xs">&middot;</span>
                    <span className="font-mono text-xs text-grey-400">
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl text-cream group-hover:text-purple transition-colors leading-snug mb-2">
                    {post.title}
                  </h2>
                  <p className="text-grey-400 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
