import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import type { Production } from "@/lib/types";
import { hasUpcomingShows } from "@/lib/shows";

interface ProductionCardProps {
  production: Production;
}

export function ProductionCard({ production }: ProductionCardProps) {
  const isUpcoming = hasUpcomingShows(production);

  return (
    <Link
      href={`/productions/${production.slug}`}
      className="group block editorial-card p-5"
    >
      {/* Meta row */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs text-grey-400">{production.year}</span>
        <Badge variant={isUpcoming ? "amber" : "outline"}>
          {isUpcoming ? "Now Performing" : production.type}
        </Badge>
      </div>

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden mb-5">
        <Image
          src={production.image}
          alt={production.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <h3 className="font-serif text-xl text-cream group-hover:text-gold transition-colors leading-snug">
        {production.title}
      </h3>
      {production.subtitle && (
        <p className="text-grey-400 text-sm mt-1 font-serif italic">{production.subtitle}</p>
      )}
      <p className="text-grey-400 text-sm mt-3 line-clamp-2 leading-relaxed">
        {production.synopsis}
      </p>

      {/* Bottom meta */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-grey-700">
        <span className="font-mono text-xs text-grey-400 uppercase tracking-wider">{production.language}</span>
        {production.genre.slice(0, 2).map((g) => (
          <span key={g} className="font-mono text-xs text-grey-600">&middot; {g}</span>
        ))}
      </div>
    </Link>
  );
}
