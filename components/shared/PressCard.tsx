import { ExternalLink } from "lucide-react";
import type { PressItem } from "@/lib/types";

interface PressCardProps {
  item: PressItem;
}

export function PressCard({ item }: PressCardProps) {
  return (
    <a
      href={item.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-5 bg-grey-900 border border-grey-800 hover:border-grey-600 transition-all group"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-purple mb-2">
            {item.source}
          </p>
          <h4 className="text-cream group-hover:text-purple transition-colors font-medium">
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
        <ExternalLink size={16} className="text-grey-600 shrink-0 mt-1" />
      </div>
    </a>
  );
}
