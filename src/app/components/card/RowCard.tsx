import { ReactNode } from "react";
import { cn } from "../ui/utils";

export const RowCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-4 flex flex-col gap-3 shadow-sm transition-all",
        className
      )}
    >
      {children}
    </div>
  );
};
