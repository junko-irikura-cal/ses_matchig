import { useState } from "react";
import { Button } from "./AppButton";

type Props = {
  title: string;
  children: React.ReactNode;
  triggerText?: string;
  triggerClassName?: string;
  onSave?: () => void;
};

export const EditModal = ({ title, children, triggerText, triggerClassName, onSave, }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 編集ボタン */}
      <Button
        size="sm"
        variant="outline"
        onClick={() => setOpen(true)}
        className={triggerClassName}
      >
        {triggerText ?? "編集"}
      </Button>

      {/* モーダル */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* 背景 */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* 本体 */}
          <div className="relative w-full max-w-md bg-card border border-border rounded-xl p-4 z-10 space-y-3">

            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold">{title}</h2>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
                className="h-auto px-1"
              >
                ✕
              </Button>
            </div>

            {/* 中身（ここが重要） */}
            <div className="space-y-3">{children}</div>
            
            {/* フッタ/ボタン */}
            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                キャンセル
              </Button>
                  
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  onSave?.();
                  setOpen(false);
                }}
              >
                保存
              </Button>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};