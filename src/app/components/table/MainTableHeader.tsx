import { ReactNode } from "react";

export const MainTableHeader = ({ children }: { children: ReactNode }) => {
  return (
    <thead className="border-b border-border bg-secondary/30">
      {children}
    </thead>
  );
};