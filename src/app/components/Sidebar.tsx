import React, { useState } from "react";
import { Button } from "./AppButton";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building2, 
  Target, 
  Award,
  ArrowUpRight,
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  ChevronDown,
  Check
} from "lucide-react";


// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface NavItem { id: string; label: string; icon: ReactNode; roles?: Role[]; }

const NAV: NavItem[] = [
  { id: "dashboard",   label: "ダッシュボード",   icon: <LayoutDashboard className="w-4 h-4" />, roles: ["director"] },
  { id: "engineers",   label: "エンジニア管理",   icon: <Users className="w-4 h-4" /> },
  { id: "interviews",  label: "業打ち管理",       icon: <Briefcase className="w-4 h-4" />,     roles: ["sales", "director"] },
  { id: "clients",     label: "顧客・案件管理",   icon: <Building2 className="w-4 h-4" />,     roles: ["sales", "director"] },
  { id: "analytics",   label: "分析・レポート",   icon: <BarChart3 className="w-4 h-4" /> },
  { id: "procedures",  label: "諸手続き",         icon: <ClipboardList className="w-4 h-4" />, roles: ["sales", "director"] },
];

const ROLES: Record<Role, { label: string; name: string; initials: string; color: string }> = {
  sales:     { label: "営業",  name: "田中 浩二", initials: "田", color: "bg-indigo-500" },
  director:  { label: "所長",  name: "鈴木 一郎", initials: "鈴", color: "bg-amber-500" },
  recruiting:{ label: "採用",  name: "山田 美咲", initials: "山", color: "bg-emerald-500" },
};

const Sidebar = ({
  role, setRole, page, setPage, pendingCount, isOpen, onClose, onResetEngineerSelection,
}: {
  role: Role;
  setRole: (r: Role) => void;
  page: string;
  setPage: (p: string) => void;
  pendingCount: number;
  isOpen: boolean;
  onClose: () => void;
  onResetEngineerSelection: () => void;
}) => {
  const [showRoles, setShowRoles] = useState(false);
  const rc = ROLES[role];
  const visible = NAV.filter(n => !n.roles || n.roles.includes(role));

  return (
    <>
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      <aside className={`
        w-56 flex flex-col bg-sidebar border-r border-sidebar-border flex-shrink-0
        fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      <div className="px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <div className="text-xs font-bold text-sidebar-foreground tracking-wide">SES Match</div>
            <div className="text-[9px] text-muted-foreground font-mono leading-tight">業打ちマッチング管理</div>
          </div>
        </div>
      </div>

      <div className="px-3 py-3 border-b border-sidebar-border">
        <Button
          size="sm"
          variant={showRoles ? "secondary" : "ghost"}
          onClick={() => setShowRoles(!showRoles)}
          className="w-full h-auto px-2 py-1.5 flex items-center justify-between"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-7 h-7 rounded-full ${rc.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
              {rc.initials}
            </div>

            <div className="flex-1 text-left min-w-0">
              <div className="text-xs font-semibold text-sidebar-foreground truncate">
                {rc.name}
              </div>
              <div className="text-[9px] text-muted-foreground font-mono">
                {rc.label}
              </div>
            </div>
          </div>

          <ChevronDown
            className={`w-3.5 h-3.5 text-muted-foreground flex-shrink-0 transition-transform ${
              showRoles ? "rotate-180" : ""
            }`}
          />
        </Button>
        {showRoles && (
          <div className="mt-1.5 bg-card border border-border rounded-lg overflow-hidden shadow-xl">
            {(Object.keys(ROLES) as Role[]).map(r => {
              const rrc = ROLES[r];
              return (
                <Button
                  key={r}
                  size="sm"
                  variant={role === r ? "secondary" : "ghost"}
                  onClick={() => {
                    setRole(r);
                    setShowRoles(false);
                  }}
                  className="w-full h-auto px-3 py-2 flex items-center gap-2 justify-between"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-5 h-5 rounded-full ${rrc.color} flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0`}
                    >
                      {rrc.initials}
                    </div>
                
                    <span className="text-xs text-card-foreground truncate">
                      {rrc.label} — {rrc.name}
                    </span>
                  </div>
                
                  {role === r && (
                    <Check className="w-3 h-3 text-primary flex-shrink-0" />
                  )}
                </Button>
              );
            })}
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {visible.map(item => {
          const isActive = page === item.id;
          const hasBadge = item.id === "dashboard" && role === "director" && pendingCount > 0;
          return (
            <Button
              key={item.id}
              size="sm"
              variant={isActive ? "secondary" : "ghost"}
              onClick={() => {
                setPage(item.id);
                onClose();
                onResetEngineerSelection();
              }}
              className="w-full h-auto px-2.5 py-2 flex items-center gap-2.5 justify-between"
            >
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                {item.icon}
            
                <span className="text-xs font-medium leading-none truncate">
                  {item.label}
                </span>
              </div>
            
              {hasBadge && (
                <span className="text-[9px] font-mono bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded">
                  {pendingCount}
                </span>
              )}
            </Button>
          );
        })}
      </nav>

      <div className="px-4 py-3 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono text-muted-foreground">v1.0.0</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[9px] font-mono text-muted-foreground">オンライン</span>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;