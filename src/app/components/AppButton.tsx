import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./ui/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "icon";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children?: ReactNode;
}


export const Button = ({
  variant = "primary",
  size = "sm",
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition cursor-pointer",

        // gapは条件付き
        children && icon && "gap-1.5",

        // --- variant ---
        variant === "primary" &&
          "bg-primary text-white hover:opacity-90",

        variant === "secondary" &&
          "bg-secondary text-foreground hover:bg-secondary/80",

        variant === "outline" &&
          "border border-border text-foreground hover:bg-muted",

        variant === "ghost" &&
          "text-muted-foreground hover:text-foreground",

        variant === "icon" &&
          "rounded-full bg-primary text-white shadow",

        // --- size ---
        size === "sm" && "h-7 px-3 text-xs",
        size === "md" && "h-8 px-4 text-sm",
        size === "lg" && "h-9 px-5 text-base",

        // icon only
        variant === "icon" && "w-10 h-10 p-0",

        // disabled
        disabled && "opacity-50 cursor-not-allowed",

        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};
