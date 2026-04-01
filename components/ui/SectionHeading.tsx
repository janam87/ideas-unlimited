import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", align === "center" && "text-center", className)}>
      {label && (
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-purple mb-4">
          {label}
        </p>
      )}
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-grey-400 max-w-2xl text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
