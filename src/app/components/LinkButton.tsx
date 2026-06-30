import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./ui/utils";

interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}


export const LinkButton = ({
  children,
  className,
  href,
  ...props
}) => {
  return (
    <a
      href={href}
      className={cn(
        "text-primary hover:underline text-left font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
};
