import { TrendingUp, Menu, CheckCircle, Clock } from "lucide-react";

import { IV_CFG, ENG_CFG, PROC_CFG } from "../constants/statusConfig";

// ─── Shared Components ────────────────────────────────────────────────────────

const EngBadge = ({ status }: { status: EngStatus }) => {
  const c = ENG_CFG[status] || {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-300",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${c.bg} ${c.text} ${c.border}`}
    >
      {status}
    </span>
  );
};

const ProcBadge = ({ status }: { status: ProcStatus }) => {
  const c = PROC_CFG[status] || {
    bg: "bg-slate-500/20",
    text: "text-slate-600",
    border: "border-slate-500/30",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${c.bg} ${c.text} ${c.border}`}
    >
      {status}
    </span>
  );
};

const ApprovalBadge = ({ flag }: { flag: "未承認" | "承認済" }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${
    flag === "承認済"
      ? "bg-emerald-500/20 text-emerald-600 border-emerald-500/30"
      : "bg-amber-500/20 text-amber-600 border-amber-500/30"
  }`}>
    {flag === "承認済" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
    {flag}
  </span>
);

interface KPICardProps {
  label: string; value: string | number; sub?: string;
  icon: ReactNode; accent?: "blue" | "amber" | "emerald" | "purple" | "rose";
  trend?: string;
}

const MobileMenuButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-lg hover:bg-secondary/50 transition-colors"
  >
    <Menu className="w-5 h-5 text-foreground" />
  </button>
);

const ACCENT = {
  blue:    { icon: "text-sky-400",     bg: "bg-sky-500/10",     border: "border-sky-500/20" },
  amber:   { icon: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20" },
  emerald: { icon: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  purple:  { icon: "text-purple-400",  bg: "bg-purple-500/10",  border: "border-purple-500/20" },
  rose:    { icon: "text-rose-400",    bg: "bg-rose-500/10",    border: "border-rose-500/20" },
};

const KPICard = ({ label, value, sub, icon, accent = "blue", trend }: KPICardProps) => {
  const a = ACCENT[accent];
  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-2.5 hover:border-primary/30 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between">
        <span className="text-[11px] text-muted-foreground font-medium leading-tight">{label}</span>
        <div className={`p-1.5 rounded-lg ${a.bg} border ${a.border}`}>
          <span className={a.icon}>{icon}</span>
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold font-mono text-card-foreground leading-none">{value}</div>
        {sub && <div className="text-[11px] text-muted-foreground mt-1">{sub}</div>}
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-[11px] text-emerald-600">
          <TrendingUp className="w-3 h-3" />{trend}
        </div>
      )}
    </div>
  );
};

const SkillBadge = ({ label }: { label: string }) => {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-secondary text-muted-foreground border border-border">
      {label}
    </span>
  );
};

const InterviewStatusBadge = ({ status }: { status: string }) => {
  const c = IV_CFG[status] || {
    bg: "bg-slate-500/20",
    text: "text-slate-600",
    border: "border-slate-500/30",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${c.bg} ${c.text} ${c.border}`}
    >
      {status}
    </span>
  );
};

export { EngBadge, ProcBadge, ApprovalBadge, SkillBadge, KPICard, MobileMenuButton, InterviewStatusBadge };
