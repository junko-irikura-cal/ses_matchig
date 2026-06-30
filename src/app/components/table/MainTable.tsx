import { ReactNode } from "react";

export const MainTable = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs min-w-[700px]">
          {children}
        </table>
      </div>
    </div>
  );
};