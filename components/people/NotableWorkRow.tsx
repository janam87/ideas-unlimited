"use client";

import Image from "next/image";
import type { NotableWork } from "@/lib/types";

interface NotableWorkRowProps {
  item: NotableWork | string;
}

export function NotableWorkRow({ item }: NotableWorkRowProps) {
  // Legacy string format — render plain text row
  if (typeof item === "string") {
    return (
      <div className="py-3 border-b border-grey-700 text-grey-300">
        {item}
      </div>
    );
  }

  const firstLetter = item.title.charAt(0).toUpperCase();

  const content = (
    <div className="flex items-center gap-3.5 py-3 border-b border-grey-700 group">
      {/* Thumbnail */}
      <div className="w-11 h-[60px] flex-shrink-0 relative overflow-hidden bg-grey-900 border border-grey-700">
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover"
            sizes="44px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-grey-900 to-grey-800">
            <span className="font-serif text-lg text-grey-600">{firstLetter}</span>
          </div>
        )}
      </div>

      {/* Title + metadata */}
      <div className="flex-1 min-w-0">
        <p className="font-serif text-sm md:text-base text-cream group-hover:text-purple transition-colors truncate">
          {item.title}
        </p>
        {(item.category || item.year) && (
          <p className="font-mono text-xs text-grey-400 mt-0.5">
            {[item.category, item.year].filter(Boolean).join(" · ")}
          </p>
        )}
        {item.role && (
          <p className="text-xs text-purple-light mt-0.5">{item.role}</p>
        )}
      </div>

      {/* Source badge */}
      {item.sourceLabel && (
        <span className="flex-shrink-0 font-mono text-[10px] uppercase tracking-wider text-grey-400 border border-grey-700 px-2 py-0.5">
          {item.sourceLabel}
        </span>
      )}
    </div>
  );

  if (item.sourceUrl) {
    return (
      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}
