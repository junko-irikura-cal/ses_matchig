import type { Role, Interview } from "@/types";
import { RefreshCw, User, Calendar } from "lucide-react";
import {
  Tooltip, Line, Area,
} from "recharts";
import React, { useState } from "react";

import {  CLIENTS_DATA } from "../constants/mockData";
import { InterviewRowCard } from "../components/card/InterviewRowCard";
import { InterviewRow } from "../components/table/InterviewRow";
import { Button } from "../components/AppButton";


const InterviewPage = ({
  role,
  interviews,
  onApprove,
  onStatusUpdate,
  onEngineerSelect,
  onClientSelect,
  onProjectSelect,
}: {
  role: Role;
  interviews: Interview[];
  onApprove: (id: string) => void;
  onStatusUpdate: (id: string, status: InterviewStatus) => void;
  onEngineerSelect: (engineerId: string) => void;
  onClientSelect: (clientId: string) => void; 
  onProjectSelect: (projectId: string) => void;
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("全件");

  // フィルター処理
  console.log("interviews", interviews);
  const filtered = interviews.filter(i => {
    const ms = search === "" || i.engineerName.includes(search) || i.clientName.includes(search);
    const mf = statusFilter === "全件" || i.status === statusFilter;
    return ms && mf;
  });

  return (
    <div className="p-4 md:p-6 space-y-4 pt-16 lg:pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-lg font-semibold text-card-foreground">業打ち（選考・業打ち）管理</h1>
      </div>

      {/* 検索・フィルターエリア */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="エンジニア名、企業名で検索…"
          className="flex-1 px-3 py-1.5 bg-card border border-border rounded-lg text-xs text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
        />
        <div className="flex flex-wrap gap-1">
          {["全件", "承認待ち", "業打ち待ち", "日程調整中", "結果待ち", "成約", "失注"].map((st) => (
            <Button
              key={st}
              size="sm"
              variant={statusFilter === st ? "secondary" : "outline"}
              onClick={() => setStatusFilter(st)}
              className="h-auto px-2.5 py-1 text-xs bg-white"
            >
              {st}
            </Button>
          ))}
        </div>
      </div>

      {/* 📱 モバイル・タブレット用：カードレイアウト（PCでは非表示） */}

<div className="lg:hidden grid gap-3">
  {filtered.map(i => (
    <InterviewRowCard
      key={i.id}
      i={i}
      role={role}
      onEngineerSelect={onEngineerSelect}
      onClientSelect={onClientSelect}
      onProjectSelect={onProjectSelect}
      onStatusUpdate={onStatusUpdate}
      onApprove={onApprove}
      CLIENTS_DATA={CLIENTS_DATA}
    />
  ))}
</div>


{/* 💻 PC用：従来の横長テーブル（モバイルでは完全に非表示） */}
<div className="hidden lg:block bg-card border border-border rounded-lg overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full text-xs min-w-[900px]">
      <thead>
        <tr className="border-b border-border bg-secondary/30">
          {["エンジニア名", "顧客企業", "対象案件", "言語/スキル", "業打ち回数", "業打ち日時", "ステータス", "承認状況", "アクション"].map(h => (
            <th key={h} className="text-left px-4 py-2.5 font-medium text-muted-foreground whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
        <tbody className="divide-y divide-border">
          {filtered.map(i => (
            <InterviewRow
              key={i.id}
              i={i}
              role={role}
              onEngineerSelect={onEngineerSelect}
              onClientSelect={onClientSelect}
              onProjectSelect={onProjectSelect}
              onStatusUpdate={onStatusUpdate}
              onApprove={onApprove}
              CLIENTS_DATA={CLIENTS_DATA}
            />
          ))}
        </tbody>
      </table>
  </div>
</div>
    </div>
  );
};

export default InterviewPage;