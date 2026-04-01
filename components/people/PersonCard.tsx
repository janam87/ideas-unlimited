import Link from "next/link";
import Image from "next/image";
import type { Person } from "@/lib/types";
interface PersonCardProps {
  person: Person;
}

export function PersonCard({ person }: PersonCardProps) {
  return (
    <Link
      href={`/people/${person.slug}`}
      className="group block editorial-card"
    >
      {/* Portrait */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={person.portrait}
          alt={person.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Info — below image with border-top */}
      <div className="p-4 border-t border-grey-700">
        <h3 className="font-serif text-lg text-cream group-hover:text-gold transition-colors">
          {person.name}
        </h3>
      </div>
    </Link>
  );
}
