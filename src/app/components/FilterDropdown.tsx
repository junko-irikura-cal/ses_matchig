
import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "./AppButton";

type Props = {
  label: string;
  options: string[];
  selected: string[];
  setSelected: (v: string[]) => void;
  name: string;
  openFilter: string | null;
  setOpenFilter: (v: string | null) => void;
};

export const FilterDropdown = ({
  label,
  options,
  selected,
  setSelected,
  name,
  openFilter,
  setOpenFilter,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  // ✅ 外クリックで閉じる
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpenFilter(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setOpenFilter]);

  // ✅ トグル処理（内包して可読性UP）
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      setSelected(selected.filter(v => v !== opt));
    } else {
      setSelected([...selected, opt]);
    }
  };

  const isOpen = openFilter === name;

  return (
    <div ref={ref} className="relative">

      {/* ✅ トリガー（Button統一） */}
      <Button
        size="sm"
        variant={isOpen ? "secondary" : "outline"}
        onClick={() => setOpenFilter(isOpen ? null : name)}
        className="h-auto px-3 py-1.5 text-[11px] flex items-center justify-between bg-white"
      >
        <span className="flex items-center gap-1">
          {label}

          {selected.length > 0 && (
            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary">
              {selected.length}
            </span>
          )}
        </span>
        
        <ChevronDown
          className={`w-3 h-3 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* ✅ ドロップダウン */}
      {isOpen && (
        <div className="absolute z-30 mt-1 w-44 bg-card border border-border rounded-lg shadow-lg p-2 space-y-1 animate-fadeIn">

          {options.map(opt => {
            const active = selected.includes(opt);

            return (
              <Button
                key={opt}
                size="xs"
                variant={active ? "secondary" : "ghost"}
                onClick={() => toggle(opt)}
                className="w-full justify-between h-auto px-2 py-1 text-[10px]"
              >
                <span>{opt}</span>
            
                {active && (
                  <span className="text-[10px] font-bold">
                    ✓
                  </span>
                )}
              </Button>
            );
          })}

          {/* ✅ 全解除 */}
          {selected.length > 0 && (
            <Button
              size="xs"
              variant="ghost"
              onClick={() => setSelected([])}
              className="w-full h-auto px-2 py-1 text-[10px]"
            >
              すべて解除
            </Button>
          )}
        </div>
      )}

    </div>
  );
};
