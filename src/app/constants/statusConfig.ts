// ─── Status Config ────────────────────────────────────────────────────────────

const IV_CFG: Record<InterviewStatus, { bg: string; text: string; border: string }> = {
  "募集中": { bg: "bg-emerald-500/20", text: "text-emerald-600", border: "border-emerald-500/30"},
  "承認待ち":   { bg: "bg-amber-500/20", text: "text-amber-600", border: "border-amber-500/30" },
  "日程調整中": { bg: "bg-blue-500/20", text: "text-blue-600", border: "border-blue-500/30" },
  "業打ち待ち": { bg: "bg-blue-500/20", text: "text-blue-600", border: "border-blue-500/30" },
  "結果待ち":   { bg: "bg-indigo-500/20", text: "text-indigo-600", border: "border-indigo-500/30" },
  "最終結果確認": { bg: "bg-indigo-500/20", text: "text-indigo-600", border: "border-indigo-500/30" },
  "成約": { bg: "bg-emerald-500/20", text: "text-emerald-600", border: "border-emerald-500/30" },
  "失注": { bg: "bg-slate-500/20", text: "text-slate-600", border: "border-slate-500/30" },
};

const ENG_CFG: Record<EngStatus, { bg: string; text: string; border: string }> = {
  "待機": { bg: "bg-amber-500/20", text: "text-amber-600", border: "border-amber-500/30" },
  "業打ち中": { bg: "bg-blue-500/20", text: "text-blue-600", border: "border-blue-500/30" },
  "先付": { bg: "bg-indigo-500/20", text: "text-indigo-600", border: "border-indigo-500/30" },
  "参画": { bg: "bg-emerald-500/20", text: "text-emerald-600", border: "border-emerald-500/30" },
  "復社": { bg: "bg-slate-500/20", text: "text-slate-600", border: "border-slate-500/30" },
};

type StatusStyle = {
  bg: string;
  text: string;
  border: string;
};

const PROC_CFG: Record<ProcStatus, StatusStyle> = {
  未: {
    bg: "bg-slate-500/20",
    text: "text-slate-600",
    border: "border-slate-500/30",
  },
  進行中: {
    bg: "bg-amber-500/20",
    text: "text-amber-600",
    border: "border-amber-500/30",
  },
  済: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-600",
    border: "border-emerald-500/30",
  },
};

const TOOLTIP_STYLE = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  color: "#1e293b",
  fontSize: 11,
};

export { IV_CFG, ENG_CFG, PROC_CFG, TOOLTIP_STYLE };