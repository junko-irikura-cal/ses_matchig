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

export default KPICard;