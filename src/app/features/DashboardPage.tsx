import React, { useState } from "react";
import type { Role, Interview } from "@/types";
import { 
  RefreshCw, User, Calendar, Activity, UserCheck, Award, 
  AlertCircle, Check, X, Building2, ClipboardList 
} from "lucide-react";
import {
  Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Line, AreaChart, Area
} from "recharts";
import { KPICard, MobileMenuButton, InterviewStatusBadge, SkillBadge } from "../components/badges";

import {
  MONTHLY_TREND,
  SALES_STATS,
  COMPANY_STATS,
  LANGUAGE_PIE,
  ENG_STATUS_DATA,
  CLIENTS_DATA,
  ENGINEERS 
} from "../constants/mockData";
import { TOOLTIP_STYLE } from "../constants/statusConfig";
import { Button } from "../components/AppButton";
import { LinkButton } from "../components/LinkButton";


const DashboardPage = ({
  role, 
  interviews, 
  onApprove, 
  onEngineerSelect,
  onClientSelect,  // 💡親から渡された名前と完全一致しているか
  onProjectSelect, // 💡親から渡された名前と完全一致しているか
}: {
  role: Role;
  interviews: Interview[];
  onApprove: (id: string) => void;
  onEngineerSelect: (engineerId: string) => void;
  onClientSelect: (clientId: string) => void;   // 💡型定義もあるか
  onProjectSelect: (projectId: string) => void; // 💡型定義もあるか
}) => {
  const pending = interviews.filter(i => i.approvalFlag === "未承認");
  const active = interviews.filter(i => !["成約", "失注"].includes(i.status)).length;
  const contracted = interviews.filter(i => i.status === "成約").length;
  const todayCount = interviews.filter(i =>
    ["2026-06-07", "2026-06-08"].includes(i.scheduledDate ?? "")
  ).length;
  const upcoming = interviews.filter(i =>
    i.scheduledDate && ["業打ち待ち", "日程調整中"].includes(i.status)
  ).slice(0, 5);
  const [visibleCount, setVisibleCount] = useState(5);

  return (
    <div className="p-4 md:p-6 space-y-5 pt-16 lg:pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-card-foreground">ダッシュボード</h1>
          <p className="text-xs text-muted-foreground mt-0.5 font-mono">2024年6月5日（水）</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="h-auto px-3 py-1.5 text-xs"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden sm:inline">更新</span>
        </Button>

      </div>

      <div className="hidden md:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        <KPICard label="業打ち件数（現状）" value={active} icon={<Activity className="w-4 h-4" />} accent="blue" trend="先月比 +3件" />
        <KPICard label="今月業打ち総数" value={interviews.length} sub="累計件数" icon={<Calendar className="w-4 h-4" />} accent="purple" />
        <KPICard label="本日エンジニア業打ち" value={todayCount} sub="名" icon={<UserCheck className="w-4 h-4" />} accent="amber" />
        <KPICard label="今月成約数" value={contracted} sub="目標 12件" icon={<Award className="w-4 h-4" />} accent="emerald" />
        <KPICard label="承認待ち" value={pending.length} sub="件" icon={<AlertCircle className="w-4 h-4" />} accent={pending.length > 0 ? "amber" : "blue"} />
      </div>

      <div className="hidden md:grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-card border border-border rounded-lg p-4">
          <h2 className="text-xs font-medium text-card-foreground mb-4">月次推移（業打ち・成約・失注）</h2>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={MONTHLY_TREND} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gBlu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gGrn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Area type="monotone" dataKey="業打ち" stroke="#3b82f6" strokeWidth={2} fill="url(#gBlu)" />
              <Area type="monotone" dataKey="成約" stroke="#10b981" strokeWidth={2} fill="url(#gGrn)" />
              <Area type="monotone" dataKey="失注" stroke="#ef4444" strokeWidth={1.5} fill="url(#gRed)" strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="text-xs font-medium text-card-foreground mb-4">今月 営業別ランキング</h2>
          <div className="space-y-3.5">
            {SALES_STATS.map((s, i) => (
              <div key={s.name} className="flex items-center gap-2.5">
                <span className={`text-xs font-mono font-bold w-4 ${i === 0 ? "text-amber-400" : "text-muted-foreground"}`}>{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-card-foreground font-medium">{s.name}</span>
                    <span className="font-mono text-muted-foreground">{s.業打ち}件</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(s.業打ち / 12) * 100}%`,
                        background: i === 0 ? "#3b82f6" : i === 1 ? "#3b82f6cc" : "#3b82f680",
                      }}
                    />
                  </div>
                </div>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${i === 0 ? "bg-amber-500/10 text-amber-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                  {s.契約}✓
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-border grid grid-cols-3 gap-2 text-center">
            {[{ v: 26, l: "今月業打ち" }, { v: 9, l: "OK件数" }, { v: 6, l: "成約件数" }].map(item => (
              <div key={item.l}>
                <div className="text-lg font-bold font-mono text-card-foreground">{item.v}</div>
                <div className="text-[10px] text-muted-foreground">{item.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {role === "director" && pending.length > 0 && (
        <div className="bg-card border border-amber-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <h2 className="text-xs font-semibold text-card-foreground">承認待ち — 対応が必要です</h2>
            <span className="ml-auto text-[10px] font-mono bg-amber-500/20 text-amber-600 border border-amber-500/30 px-1.5 py-0.5 rounded">{pending.length}件</span>
          </div>
          <div className="divide-y divide-border">
            {pending.map(i => (
              <div key={i.id} className="flex flex-col md:flex-row gap-2 py-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-card-foreground font-medium">
                    <Button
                      variant="ghost"
                      size="md"
                      onClick={() => {
                        const eng = ENGINEERS.find(e => e.name === i.engineerName);
                        if (eng) onEngineerSelect(eng.id);
                      }}
                      className="h-auto p-0 text-primary hover:underline justify-start"
                    >
                      {i.engineerName}
                    </Button>
                    {' '}→ {i.clientName}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 font-mono">{i.salesName} · {i.language} · {i.createdDate} 申請</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button
                    size="sm"
                    onClick={() => onApprove(i.id)}
                    className="h-auto px-2.5 py-1 text-xs bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/30"
                  >
                    <Check className="w-3 h-3" />
                    承認
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => {}}
                    className="h-auto px-2.5 py-1 text-xs bg-rose-500/20 border border-rose-500/30 text-rose-600 hover:bg-rose-500/30"
                  >
                    <X className="w-3 h-3" />
                    差戻
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-lg p-4">
  <div className="flex items-center gap-2 mb-3">
    <Calendar className="w-4 h-4 text-primary" />
    <h2 className="text-xs font-semibold text-card-foreground">
      業打ち一覧
    </h2>
  </div>

<div className="divide-y divide-border">
  {(interviews ?? []).slice(0, visibleCount).map(i => (
    
    <div key={i.id} className="py-3 space-y-1.5">

      {/* 🔹 上段：日付 + ステータス */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono text-muted-foreground">
          {i.scheduledDate ?? "未定"}
        </span>

        <InterviewStatusBadge status={i.status} />
      </div>

      {/* 🔹 メイン（縦並びにする） */}
      <div className="space-y-1 text-sm">

        {/* エンジニア */}
        <LinkButton
          onClick={() => {
            const eng = ENGINEERS.find(e => e.name === i.engineerName);
            if (eng) onEngineerSelect(eng.id);
          }}
          className="text-xs flex items-center gap-1"
        >
          <User className="w-3.5 h-3.5 shrink-0" />
          {i.engineerName}
        </LinkButton>

        {/* 企業 */}
        <LinkButton
          onClick={() => {
            const client = CLIENTS_DATA.find(c =>
              c.clientName === i.clientName ||
              c.clientName.includes(i.clientName) ||
              i.clientName.includes(c.clientName)
            );
            if (client) onClientSelect(client.id);
          }}
          className="text-xs flex items-center gap-1"
        >
          <Building2 className="w-3.5 h-3.5 shrink-0" />
          {i.clientName}
        </LinkButton>

        {/* 案件 */}
        <LinkButton
          onClick={() => {
            const client = CLIENTS_DATA.find(c =>
              c.clientName === i.clientName ||
              c.clientName.includes(i.clientName) ||
              i.clientName.includes(c.clientName)
            );

            if (client?.projects?.length) {
              onProjectSelect(client.projects[0].id);
            }
          }}
          className="text-xs flex items-center gap-1"
        >
          
          <ClipboardList className="w-3.5 h-3.5 shrink-0" /> {(() => {
            const client = CLIENTS_DATA.find(c =>
              c.clientName === i.clientName ||
              c.clientName.includes(i.clientName) ||
              i.clientName.includes(c.clientName)
            );

            return client?.projects?.length
              ? client.projects[0].title
              : "案件詳細";
          })()}
        </LinkButton>

      </div>

      {/* スキル */}
      <div>
        <SkillBadge label={i.language} />
      </div>

    </div>
  ))}

  {(interviews ?? []).length === 0 && (
    <p className="py-6 text-xs text-muted-foreground text-center">
      データがありません
    </p>
  )}
</div>
``

  {/* ✅ もっと見る */}
  {visibleCount < (interviews?.length ?? 0) && (
    <div className="flex justify-center pt-3">
      <Button
        size="sm"
        variant="outline"
        onClick={() => setVisibleCount((prev) => prev + 5)}
        className="h-auto px-3 py-1.5 text-xs"
      >
        もっと見る
      </Button>
    </div>
  )}
</div>
    </div>
  );
};

export default DashboardPage;