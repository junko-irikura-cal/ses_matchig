import { ReactNode } from "react";
import { cn } from "../ui/utils";

export const TableRow = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <tr
      className={cn(
        "hover:bg-secondary/20 transition-colors",
        className
      )}
    >
      {children}
    </tr>
  );
};