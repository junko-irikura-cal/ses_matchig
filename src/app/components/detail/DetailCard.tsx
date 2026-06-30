import { ReactNode } from "react";
import { cn } from "../ui/utils";

export const DetailCard = ({
  title,
  children,
  className,
  action,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}) => {
  return (
    <div className={cn("bg-card border border-border rounded-lg p-4", className)}>
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-sm font-semibold text-card-foreground">
          {title}
        </h2>

        {action && (
          <div className="hidden lg:block">
            {action}
          </div>
        )}
      </div>

      {children}
    </div>
  );
};