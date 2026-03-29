import type { Metadata } from "next";
import Image from "next/image";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getPersonBySlug, getProductionsForPerson, getPressForPerson } from "@/lib/data";
import { personSchema } from "@/lib/schema";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PressCard } from "@/components/shared/PressCard";
import { ShareButton } from "@/components/shared/ShareButton";

export const metadata: Metadata = {
  title: "Manoj Shah — Founder & Artistic Director",
  description:
    "The story of Manoj Shah — director, actor, producer, and the visionary behind 35 years of Ideas Unlimited Productions.",
  openGraph: {
    title: "Manoj Shah — Founder & Artistic Director",
    description:
      "The story of Manoj Shah — director, actor, producer, and the visionary behind 35 years of Ideas Unlimited Productions.",
    images: ["/images/placeholder-portrait.svg"],
  },
};

function getManojShahContent() {
  const filePath = path.join(process.cwd(), "content", "manoj-shah.mdx");
  const source = fs.readFileSync(filePath, "utf8");
  const { content } = matter(source);
  return content;
}

export default function ManojShahPage() {
  const person = getPersonBySlug("manoj-shah");
  const productions = getProductionsForPerson("manoj-shah");
  const pressItems = getPressForPerson("manoj-shah");
  const mdxContent = getManojShahContent();

  // Parse MDX content into sections for rendering
  const sections = mdxContent.split("\n\n").filter(Boolean);

  return (
    <>
      {person && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(person)) }}
        />
      )}

      {/* Full-page hero */}
      <section className="relative h-screen flex items-end pb-20">
        <div className="absolute inset-0">
          <Image
            src="/images/placeholder-portrait.svg"
            alt="Manoj Shah"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
        <Container className="relative z-10">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-gold mb-4">
            Founder & Artistic Director
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-cream leading-[0.85]">
            Manoj
            <br />
            Shah
          </h1>
          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <Badge variant="gold">Director</Badge>
            <Badge variant="gold">Actor</Badge>
            <Badge variant="gold">Producer</Badge>
          </div>
        </Container>
      </section>

      {/* Editorial content */}
      <Container className="py-20">
        <div className="max-w-3xl mx-auto">
          <article className="prose-custom">
            {sections.map((section, i) => {
              const trimmed = section.trim();
              if (trimmed.startsWith("# ")) {
                return (
                  <h2
                    key={i}
                    className="font-serif text-3xl md:text-4xl text-cream mt-16 mb-6 first:mt-0"
                  >
                    {trimmed.replace(/^#+ /, "")}
                  </h2>
                );
              }
              if (trimmed.startsWith("## ")) {
                return (
                  <h3 key={i} className="font-serif text-2xl md:text-3xl text-cream mt-12 mb-4">
                    {trimmed.replace(/^#+ /, "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("> ")) {
                return (
                  <blockquote
                    key={i}
                    className="border-l-2 border-gold pl-6 my-10 text-xl md:text-2xl font-serif italic text-cream/80"
                  >
                    {trimmed.replace(/^> /, "").replace(/"/g, "")}
                  </blockquote>
                );
              }
              if (trimmed.startsWith("- ")) {
                const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
                return (
                  <ul key={i} className="space-y-3 mb-8 ml-4">
                    {items.map((item, j) => (
                      <li
                        key={j}
                        className="text-grey-300 text-lg leading-relaxed pl-2 border-l border-grey-700"
                      >
                        {item.replace(/^- /, "").replace(/\*\*/g, "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-grey-300 text-lg leading-relaxed mb-6">
                  {trimmed.replace(/\*\*/g, "")}
                </p>
              );
            })}
          </article>
        </div>

        {/* Directorial Filmography */}
        <div className="max-w-3xl mx-auto mt-20">
          <SectionHeading label="Filmography" title="Complete IU Productions" />
          <div className="space-y-2">
            {productions.map((prod) => (
              <a
                key={prod.slug}
                href={`/productions/${prod.slug}`}
                className="flex items-center justify-between p-4 bg-grey-900 border border-grey-800 hover:border-grey-600 transition-all group"
              >
                <div>
                  <span className="text-cream group-hover:text-gold transition-colors font-medium">
                    {prod.title}
                  </span>
                  {prod.subtitle && (
                    <span className="text-grey-400 text-sm ml-2">{prod.subtitle}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge>{prod.year}</Badge>
                  <Badge variant="outline">{prod.language}</Badge>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Press */}
        {pressItems.length > 0 && (
          <div className="max-w-3xl mx-auto mt-20">
            <SectionHeading label="In the Press" title="Interviews & Coverage" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pressItems.map((item) => (
                <PressCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-grey-800">
          <ShareButton title="Manoj Shah — Ideas Unlimited Productions" />
        </div>
      </Container>
    </>
  );
}
