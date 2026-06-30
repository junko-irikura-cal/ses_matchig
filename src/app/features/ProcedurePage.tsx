import React, { useState } from "react";
import { Procedure } from "../types";
import { 
  FileCheck, 
  Download, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  Clock, 
  Circle,
  Building2,
  User,
  Calendar,
  AlertCircle
} from "lucide-react";
import { ProcBadge } from "../components/badges";
import { Button } from "../components/AppButton";
import { LinkButton } from "../components/LinkButton";
import { ENGINEERS } from "../constants/mockData";

interface ProcedurePageProps {
  procedures: Procedure[];
  setProcedures: React.Dispatch<React.SetStateAction<Procedure[]>>;
  isPwaMode: boolean;
}

type StepType = "joinProcedure" | "employment" | "conditionDoc" | "sysApplication";

// ─── Procedures ───────────────────────────────────────────────────────────────


const ProcedurePage = ({
  role,
  procedures,
  onUpdate,
  onEngineerSelect,
  onClientSelect
}: {
  role: Role;
  procedures: Procedure[];
  onUpdate: (id: string, field: keyof Procedure, val: ProcStatus) => void;
  onEngineerSelect: (id: string) => void;
  onClientSelect: (id: string) => void;
}) => {

  const cycle = (s: ProcStatus): ProcStatus => s === "未" ? "進行中" : s === "進行中" ? "済" : "未";

  const handleExport = () => {
    const header = "氏名,成約先,成約日,入社手続,雇用契約,条件確認書,システム申請";
    const rows = procedures.filter(p => !p.csvExported).map(p =>
      [p.engineerName, p.clientName, p.contractedDate, p.joinProcedure, p.employment, p.conditionDoc, p.sysApplication].join(",")
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    Object.assign(document.createElement("a"), { href: url, download: "成約データ_20240605.csv" }).click();
    URL.revokeObjectURL(url);
  };

  const procFields: { key: keyof Procedure; label: string }[] = [
    { key: "joinProcedure", label: "入社手続" },
    { key: "employment", label: "雇用契約" },
    { key: "conditionDoc", label: "条件確認書" },
    { key: "sysApplication", label: "システム申請" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4 pt-16 lg:pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-lg font-semibold text-card-foreground">諸手続き管理</h1>
        {role !== "recruiting" && (
          <Button
            size="sm"
            onClick={handleExport}
            className="h-auto px-3 py-1.5 text-xs bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">成約データCSV出力</span>
            <span className="sm:hidden">CSV出力</span>
          </Button>
        )}
      </div>

      <div className="flex items-start gap-2 text-[11px] text-muted-foreground bg-card border border-border px-4 py-3 rounded-lg">
        <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
        <span>CSV出力対象：最終結果OK・所長承認済・諸手続き完了のデータのみ抽出されます。既存案件管理システムへのインポート用です。バッジをクリックしてステータスを更新できます。</span>
      </div>

      <div className="space-y-4">
  {/* 🖥️ PC用レイアウト：テーブル形式（md以上で表示、スマホでは非表示） */}
  <div className="hidden md:block bg-card border border-border rounded-lg overflow-hidden shadow-sm">
    <div className="overflow-x-auto">
      <table className="w-full text-xs min-w-[700px]">
        <thead>
          <tr className="border-b border-border bg-secondary/30">
            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">エンジニア</th>
            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">成約先</th>
            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">成約日</th>
            {procFields.map(f => (
              <th key={f.key} className="text-left px-4 py-2.5 font-medium text-muted-foreground whitespace-nowrap">{f.label}</th>
            ))}
            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">CSV</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {procedures.map(p => (
            <tr key={p.id} className="hover:bg-secondary/20 transition-colors">
              <td className="px-4 py-3">
                <LinkButton
                  onClick={() => {
                    const eng = ENGINEERS.find(e => e.name === p.engineerName);
                    if (eng) onEngineerSelect(eng.id);
                  }}
                  className="font-semibold text-base"
                >
                  {p.engineerName}
                </LinkButton>
              </td>
              
              <td className="px-4 py-3">
                <LinkButton
                  onClick={() => onClientSelect(p.clientName)}
                  className="font-semibold text-sm"
                >
                  {p.clientName}
                </LinkButton>
              </td>

              <td className="px-4 py-3 font-mono text-muted-foreground">{p.contractedDate}</td>
              {procFields.map(f => (
                <td key={f.key} className="px-4 py-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={role === "recruiting"}
                    onClick={() => {
                      if (role !== "recruiting") {
                        onUpdate(p.id, f.key, cycle(p[f.key] as ProcStatus));
                      }
                    }}
                    className="h-auto p-0 justify-start"
                  >
                    <ProcBadge status={p[f.key] as ProcStatus} />
                  </Button>
                </td>
              ))}
              <td className="px-4 py-3">
                <span className={`font-mono px-2 py-0.5 rounded border ${
                  p.csvExported
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    : "bg-secondary text-muted-foreground border-border"
                }`}>
                  {p.csvExported ? "出力済" : "未出力"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* 📱 スマホ用レイアウト：カード形式（スマホで表示、md以上で非表示） */}
  <div className="block md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
    {procedures.map((p) => (
      <div 
        key={p.id} 
        className="bg-card border border-border/70 rounded-xl p-4 shadow-sm space-y-4 flex flex-col justify-between"
      >
        {/* 基本情報 */}
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-xs font-bold text-card-foreground truncate flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const eng = ENGINEERS.find(e => e.name === p.engineerName);
                    if (eng) onEngineerSelect(eng.id);
                  }}
                  className="h-auto p-0 text-primary hover:underline flex items-center gap-1"
                >
                  <User className="w-4 h-4" />
                  <span className="truncate font-bold text-xs">
                    {p.engineerName}
                  </span>
                </Button>
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onClientSelect(p.clientName)}
                className="h-auto p-0 text-primary hover:underline text-[11px]"
              >
                🏢 {p.clientName}
              </Button>
            </div>
            
            {/* CSVステータス */}
            <span className={`text-[9px] font-mono font-medium px-1.5 py-0.5 rounded border shrink-0 ${
              p.csvExported
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                : "bg-secondary text-muted-foreground border-border"
            }`}>
              {p.csvExported ? "出力済" : "未出力"}
            </span>
          </div>

          <div className="text-[10px] text-muted-foreground font-mono">
            契約日: {p.contractedDate}
          </div>
        </div>

        {/* 各種手続き（スマホでも押しやすいミニパネル仕様） */}
        <div className="pt-2.5 border-t border-border/50">
          <div className="grid grid-cols-2 gap-1.5">
            {procFields.map((f) => (
              <div 
                key={f.key} 
                className="bg-secondary/30 border border-border/40 rounded-lg p-2 flex flex-col justify-between gap-1"
              >
                <span className="text-[9px] font-medium text-muted-foreground truncate">
                  {f.label}
                </span>
                <div className="text-left">
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={role === "recruiting"}
                    onClick={() =>
                      role !== "recruiting" &&
                      onUpdate(p.id, f.key, cycle(p[f.key] as ProcStatus))
                    }
                    className="h-auto p-0 justify-start"
                  >
                    <ProcBadge status={p[f.key] as ProcStatus} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* データが空の時の共通セーフティ */}
  {procedures.length === 0 && (
    <div className="bg-card border border-border rounded-lg p-8 text-center text-xs text-muted-foreground">
      現在、該当する手続きデータはありません。
    </div>
  )}
</div>
    </div>
  );
};

export default ProcedurePage;