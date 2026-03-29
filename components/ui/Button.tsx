import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center font-medium transition-all duration-300 tracking-wide uppercase",
      {
        "bg-gold text-background hover:bg-gold-light": variant === "primary",
        "bg-grey-800 text-foreground hover:bg-grey-700 border border-grey-600":
          variant === "secondary",
        "text-foreground hover:text-gold": variant === "ghost",
        "border border-gold text-gold hover:bg-gold hover:text-background":
          variant === "outline",
      },
      {
        "text-xs px-4 py-2": size === "sm",
        "text-sm px-6 py-3": size === "md",
        "text-base px-8 py-4": size === "lg",
      },
      className
    );

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
