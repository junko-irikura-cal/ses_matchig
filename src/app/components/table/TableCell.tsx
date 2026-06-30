import { ReactNode } from "react";
import { cn } from "../ui/utils";

export const TableCell = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <td
      className={cn(
        "px-4 py-3 text-left whitespace-nowrap",
        className
      )}
    >
      {children}
    </td>
  );
};