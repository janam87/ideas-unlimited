import { ExternalLink } from "lucide-react";
import type { PressItem } from "@/lib/types";

interface PressCardProps {
  item: PressItem;
}

export function PressCard({ item }: PressCardProps) {
  const hasUrl = item.url && item.url !== "#";
  const Tag = hasUrl ? "a" : "div";
  const linkProps = hasUrl
    ? { href: item.url, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Tag
      {...linkProps}
      className={`block p-5 bg-grey-900 border border-grey-800 transition-all group ${hasUrl ? "hover:border-grey-600 cursor-pointer" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-purple mb-2">
            {item.source}
          </p>
          <h4 className={`text-cream font-medium ${hasUrl ? "group-hover:text-purple transition-colors" : ""}`}>
            {item.title}
          </h4>
          {item.excerpt && (
            <p className="text-grey-400 text-sm mt-2 line-clamp-2">{item.excerpt}</p>
          )}
          <p className="text-grey-600 text-xs mt-3">
            {new Date(item.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        {hasUrl && <ExternalLink size={16} className="text-grey-600 shrink-0 mt-1" />}
      </div>
    </Tag>
  );
}
