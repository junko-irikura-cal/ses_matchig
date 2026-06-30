
import { RowCard } from "./RowCard";
import { LinkButton } from "../LinkButton";
import { Button } from "../AppButton";
import { EngBadge, SkillBadge, InterviewStatusBadge } from "../badges";
import { ChevronDown, User, Building2 } from "lucide-react";

export const EngineerRowCard = ({
  e,
  selectedIds,
  toggleSelect,
  onEngineerSelect,
  nextMonth,
  expandedEngId,
  expandedScheduledId,
  setExpandedEngId,
  setExpandedScheduledId,
  role,
  NEXT_MONTH_EXITS,
  CLIENTS_DATA,
  onClientSelect,
  onProjectSelect,
}: any) => {
  const isUrgent = NEXT_MONTH_EXITS.includes(e.exitDate);
  const totalCandidateCount =
    e.candidates?.reduce((acc: number, c: any) => acc + c.projects.length, 0) || 0;
  const isExpanded = expandedEngId === e.id;

  return (
    <RowCard
      className={nextMonth && isUrgent ? "border-l-4 border-l-amber-500" : ""}
    >
      {/* ✅ 上段 */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={selectedIds.includes(e.id)}
            onChange={() => toggleSelect(e.id)}
          />

          <div className="space-y-1">
            <LinkButton
              onClick={() => onEngineerSelect(e.id)}
              className="font-bold text-base flex gap-2 items-center"
            >
              <User className="w-4 h-4 text-base" />
              {e.name}
            </LinkButton>

            <div className="flex flex-wrap gap-1">
              {e.skills.slice(0, 3).map((sk: string) => (
                <SkillBadge key={sk} label={sk} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <EngBadge status={e.status} />
          <span className="text-[11px] font-mono text-muted-foreground">
            業打ち:{" "}
            <span className="text-card-foreground font-semibold">
              {e.interviewCount}件
            </span>
          </span>
        </div>
      </div>

      {/* ✅ 中段 */}
      <div className="grid grid-cols-2 gap-2 bg-secondary/10 border border-border/40 rounded-lg p-2 text-xs font-mono">
        {role !== "recruiting" && (
          <div>
            <div className="text-[10px] text-muted-foreground">現参画先</div>
            <div className="truncate">{e.currentClient ?? "—"}</div>
          </div>
        )}

        <div className={role === "recruiting" ? "col-span-full" : ""}>
          <div className="text-[10px] text-muted-foreground">復社予定</div>
          <div
            className={
              isUrgent
                ? "text-amber-400 font-semibold"
                : "text-muted-foreground"
            }
          >
            {e.exitDate}
          </div>
        </div>
      </div>

      {/* ✅ 業打ち */}
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">予定業打ち</span>

        {e.scheduled?.length > 0 ? (
          <Button
            size="sm"
            variant={expandedScheduledId === e.id ? "secondary" : "outline"}
            onClick={() =>
              setExpandedScheduledId(
                expandedScheduledId === e.id ? null : e.id
              )
            }
            className="h-auto px-3 py-1.5 text-[11px]"
          >
            <span>業打ち {e.scheduled.length}件</span>
            <ChevronDown
              className={`w-3 h-3 transition-transform ${
                expandedScheduledId === e.id ? "rotate-180" : ""
              }`}
            />
          </Button>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </div>

      {/* ✅ 業打ち展開 */}
      {expandedScheduledId === e.id &&
        e.scheduled?.length > 0 && (
          <div className="pt-2 border-t border-border/40 space-y-2">
            {e.scheduled.map((s: any, sIdx: number) => (
              <div
                key={sIdx}
                className="bg-secondary/30 border border-border/60 rounded-lg p-2 space-y-1"
              >
                {/* 企業 */}
                <div className="flex items-center gap-1 font-semibold">
                  <Building2 className="w-3 h-3 text-primary flex-shrink-0" />
                  <LinkButton
                    onClick={() => {
                      const client = CLIENTS_DATA.find(
                        (cl: any) =>
                          cl.clientName === s.clientName ||
                          cl.clientName.includes(s.clientName) ||
                          s.clientName.includes(cl.clientName)
                      );
                      if (client) onClientSelect(client.id);
                    }}
                    className="truncate text-sm"
                  >
                    {s.clientName}
                  </LinkButton>
                </div>

                {/* ✅ 案件一覧 */}
                <ul className="space-y-1 pl-4 text-xs text-muted-foreground">
                  {s.projects.map((p: any, pIdx: number) => (
                    <li
                      key={pIdx}
                      className="flex justify-between items-center gap-2"
                    >
                      <LinkButton
                        onClick={() => {
                          const client = CLIENTS_DATA.find(
                            (cl: any) => cl.clientName === s.clientName
                          );
                          const proj = client?.projects?.find(
                            (proj: any) =>
                              proj.title === p.title ||
                              proj.title.includes(p.title) ||
                              p.title.includes(proj.title)
                          );
                          if (proj) onProjectSelect(proj.id);
                        }}
                        className="text-xs"
                      >
                        {p.title}
                      </LinkButton>

                      <InterviewStatusBadge status={p.status} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

      {/* ✅ 候補 */}
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">マッチング候補</span>

        {totalCandidateCount > 0 ? (
          <Button
            size="sm"
            variant={isExpanded ? "secondary" : "outline"}
            onClick={() =>
              setExpandedEngId(isExpanded ? null : e.id)
            }
            className="h-auto px-3 py-1.5 text-[11px] flex justify-between"
          >
            <span>候補 {totalCandidateCount}件</span>
          
            <ChevronDown
              className={`w-3 h-3 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </Button>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </div>

      {/* ✅ 候補展開 */}
      {isExpanded && e.candidates?.length > 0 && (
        <div className="pt-2 border-t border-border/40 space-y-2">
          {e.candidates.map((c: any, cIdx: number) => (
            <div
              key={cIdx}
              className="bg-secondary/30 border border-border/60 rounded-lg p-2 space-y-1"
            >
              {/* 顧客 */}
              <div className="flex items-center gap-1 text-xs font-semibold">
                <Building2 className="w-3 h-3 text-primary flex-shrink-0" />
                <LinkButton
                  onClick={() => {
                    const client = CLIENTS_DATA.find(
                      (cl: any) =>
                        cl.clientName === c.clientName ||
                        cl.clientName.includes(c.clientName) ||
                        c.clientName.includes(cl.clientName)
                    );
                    if (client) onClientSelect(client.id);
                  }}
                  className="truncate"
                >
                  {c.clientName}
                </LinkButton>
              </div>

              {/* ✅ 案件一覧 */}
              <ul className="space-y-1 pl-4 text-xs text-muted-foreground">
                {c.projects.map((p: string, pIdx: number) => (
                  <li
                    key={pIdx}
                    className="flex items-center justify-between gap-2"
                  >
                    <LinkButton
                      onClick={() => {
                        const client = CLIENTS_DATA.find(
                          (cl: any) =>
                            cl.clientName === c.clientName ||
                            cl.clientName.includes(c.clientName) ||
                            c.clientName.includes(cl.clientName)
                        );

                        const proj = client?.projects?.find(
                          (proj: any) =>
                            proj.title === p ||
                            proj.title.includes(p) ||
                            p.includes(proj.title)
                        );

                        if (proj) {
                          onProjectSelect?.(proj.id);
                        }
                      }}
                      className="flex-1 truncate text-xs"
                    >
                      {p}
                    </LinkButton>

                    <Button
                      size="sm"
                      onClick={() => alert(`${p} にエントリー（モック）`)}
                      className="text-[10px] shrink-0"
                    >
                      エントリー
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </RowCard>
  );
};
