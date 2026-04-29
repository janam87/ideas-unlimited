import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getReviewBySlug, getAllReviewSlugs, getProductionBySlug } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllReviewSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) return { title: "Not Found" };
  const production = review.productionSlug
    ? getProductionBySlug(review.productionSlug)
    : null;
  return {
    title: `${review.title} — ${review.source}`,
    description: review.excerpt,
    openGraph: {
      title: `${review.title} — ${review.source}`,
      description: review.excerpt,
      ...(production ? { images: [production.image] } : { images: ["/images/og-default.jpg"] }),
    },
    alternates: { canonical: `/reviews/${slug}` },
  };
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review || !review.fullReview) notFound();

  const production = review.productionSlug
    ? getProductionBySlug(review.productionSlug)
    : null;

  return (
    <div className="pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left — meta */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              {production && (
                <Link
                  href={`/productions/${production.slug}`}
                  className="inline-flex items-center gap-2 text-purple hover:text-purple-light transition-colors font-mono text-xs uppercase tracking-widest mb-6"
                >
                  <ArrowLeft size={14} />
                  {production.title}
                </Link>
              )}
              <p className="font-mono text-xs uppercase tracking-widest text-purple mb-4">
                {review.source}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
                {review.title}
              </h1>
              {review.reviewAuthor && (
                <p className="text-grey-400 mt-4">By {review.reviewAuthor}</p>
              )}
              <p className="font-mono text-sm text-grey-400 mt-2">
                {new Date(review.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Right — review body */}
          <div className="lg:col-span-7">
            {review.fullReview.map((paragraph, i) => (
              <p
                key={i}
                className="text-grey-200 text-lg leading-relaxed mb-6"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
