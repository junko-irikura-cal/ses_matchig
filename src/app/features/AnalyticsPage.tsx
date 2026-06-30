import React, { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building2, 
  Target, 
  Award,
  ArrowUpRight
} from "lucide-react";
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  LineChart,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  SALES_STATS, 
  MONTHLY_TREND, 
  COMPANY_STATS,
  LANGUAGE_PIE,
  ENG_STATUS_DATA,
  ENGINEERS
} from "../constants/mockData";
import { EngBadge, SkillBadge } from "../components/badges";
import { Button } from "../components/AppButton";
import { LinkButton } from "../components/LinkButton";
import { TOOLTIP_STYLE } from "../constants/statusConfig";

// ─── Analytics ────────────────────────────────────────────────────────────────
  
  const AnalyticsPage = ({
    role,
    onEngineerSelect,
  }: {
    role: Role;
    onEngineerSelect: (id: string) => void;
  }) => {

  const [tab, setTab] = useState<"sales" | "company" | "engineer">("sales");

  const tabs = [
    { key: "sales" as const, label: "営業分析" },
    { key: "company" as const, label: "企業・案件分析" },
    { key: "engineer" as const, label: "エンジニア分析" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-5 pt-16 lg:pt-6">
      <h1 className="text-lg font-semibold text-card-foreground">分析・レポート</h1>

      <div className="flex gap-1 bg-secondary/60 p-1 rounded-lg w-full sm:w-fit overflow-x-auto">
        {tabs.map(t => (
          <Button
            key={t.key}
            size="sm"
            variant={tab === t.key ? "secondary" : "ghost"}
            onClick={() => setTab(t.key)}
            className="h-auto px-4 py-1.5 text-xs font-medium"
          >
            {t.label}
          </Button>
        ))}
      </div>

      {tab === "sales" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-xs font-medium text-card-foreground mb-4">営業別 業打ち・成約実績（今月）</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={SALES_STATS} barGap={4} margin={{ left: -20, right: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.07)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Bar dataKey="業打ち" fill="#818cf8" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="OK" fill="#60a5fa" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="契約" fill="#34d399" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-xs font-medium text-card-foreground mb-4">担当別 実績サマリー</h3>
              <div className="space-y-3">
                {SALES_STATS.map(s => (
                  <div key={s.name} className="border border-border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-card-foreground">{s.name}</span>
                      <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded">決定率 {s.決定率}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {[{ label: "業打ち", val: s.業打ち }, { label: "OK", val: s.OK }, { label: "契約", val: s.契約 }].map(item => (
                        <div key={item.label} className="bg-secondary/60 rounded-lg py-2">
                          <div className="text-base font-bold font-mono text-card-foreground">{item.val}</div>
                          <div className="text-[10px] text-muted-foreground">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-xs font-medium text-card-foreground mb-4">月次推移（通期）</h3>
            <ResponsiveContainer width="100%" height={170}>
              <LineChart data={MONTHLY_TREND} margin={{ left: -20, right: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.07)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
                <Line type="monotone" dataKey="業打ち" stroke="#818cf8" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="成約" stroke="#34d399" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="失注" stroke="#f87171" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === "company" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-xs font-medium text-card-foreground mb-4">企業別 業打ち・成約マトリクス</h3>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={COMPANY_STATS} layout="vertical" barGap={4} margin={{ left: 10, right: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.07)" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={68} />
                  <Bar dataKey="業打ち" fill="#818cf8" radius={[0, 3, 3, 0]} />
                  <Bar dataKey="契約" fill="#34d399" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-xs font-medium text-card-foreground mb-4">案件別 使用言語分布</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={LANGUAGE_PIE} cx="45%" cy="50%" innerRadius={55} outerRadius={82} paddingAngle={3} dataKey="value">
                    {LANGUAGE_PIE.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{ fontSize: 10, color: "#94a3b8" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {tab === "engineer" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-xs font-medium text-card-foreground mb-4">ステータス別 人数・業打ち件数</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={ENG_STATUS_DATA} barGap={4} margin={{ left: -20, right: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.07)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Bar dataKey="value" name="人数" fill="#818cf8" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="業打ち" fill="#fbbf24" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-xs font-medium text-card-foreground mb-4">ステータス別 現在人数</h3>
              <div className="space-y-3 mt-2">
                {ENG_STATUS_DATA.map(s => (
                  <div key={s.name} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                    <span className="text-xs text-card-foreground w-10 flex-shrink-0">{s.name}</span>
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${(s.value / 3) * 100}%`, background: s.color + "99" }} />
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground w-8 text-right">{s.value}名</span>
                    <span className="text-[11px] font-mono text-muted-foreground w-10 text-right">{s.業打ち}件</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-border">
                <div className="text-[11px] text-muted-foreground mb-2">エンジニア総数</div>
                <div className="text-2xl font-bold font-mono text-card-foreground">
                  {ENG_STATUS_DATA.reduce((a, s) => a + s.value, 0)}<span className="text-sm font-normal text-muted-foreground ml-1">名</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-xs font-medium text-card-foreground mb-3">エンジニア別 業打ち実績一覧</h3>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-medium text-muted-foreground">氏名</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">ステータス</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">主要スキル</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">退場予定</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">業打ち実績</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ENGINEERS.map((e) => (
                  <tr key={e.id} className="hover:bg-secondary/20 transition-colors">

                    <td className="py-2.5">
                      <LinkButton
                        onClick={() => onEngineerSelect?.(e.id)}
                        className="text-base font-semibold truncate"
                      >
                        {e.name}
                      </LinkButton>
                    </td>

                    <td className="py-2.5">
                      <EngBadge status={e.status} />
                    </td>

                    <td className="py-2.5">
                      <div className="flex gap-1">
                        {(e.skills ?? []).slice(0, 2).map((sk) => (
                          <SkillBadge key={sk} label={sk} />
                        ))}
                      </div>
                    </td>
                      
                    <td className="py-2.5 font-mono text-muted-foreground">
                      {e.exitDate}
                    </td>
                      
                    <td className="py-2.5 font-mono text-card-foreground">
                      {e.interviewCount}件
                    </td>
                      
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;