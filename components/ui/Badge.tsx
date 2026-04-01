import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "purple" | "amber" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-mono uppercase tracking-widest",
        {
          "bg-grey-800 text-grey-300": variant === "default",
          "bg-purple/20 text-purple": variant === "purple",
          "bg-amber/20 text-amber": variant === "amber",
          "border border-grey-600 text-grey-300": variant === "outline",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
