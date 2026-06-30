
import { TableRow } from "./TableRow";
import { TableCell } from "./TableCell";
import { LinkButton } from "../LinkButton";
import { Button } from "../AppButton";
import { EngBadge, SkillBadge } from "../badges";
import { ChevronDown } from "lucide-react";

export const EngineerRow = ({
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
}: any) => {
  const isUrgent = NEXT_MONTH_EXITS.includes(e.exitDate);
  const totalCandidateCount =
    e.candidates?.reduce((acc, c) => acc + c.projects.length, 0) || 0;
  const isExpanded = expandedEngId === e.id;

  return (
    <TableRow
      className={
        nextMonth && isUrgent
          ? "border-l-2 border-l-amber-500/50"
          : ""
      }
    >
      {/* ✅ チェック */}
      <TableCell>
        <input
          type="checkbox"
          checked={selectedIds.includes(e.id)}
          onChange={() => toggleSelect(e.id)}
        />
      </TableCell>

      {/* ✅ 名前 */}
      <TableCell>
        <LinkButton
          onClick={() => onEngineerSelect(e.id)}
          className="font-semibold text-base"
        >
          {e.name}
        </LinkButton>
      </TableCell>

      {/* ✅ ステータス */}
      <TableCell>
        <EngBadge status={e.status} />
      </TableCell>

      {/* ✅ スキル */}
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {e.skills.slice(0, 3).map((sk: string) => (
            <SkillBadge key={sk} label={sk} />
          ))}
        </div>
      </TableCell>

      {/* ✅ 現参画先 */}
      {role !== "recruiting" && (
        <TableCell className="text-muted-foreground">
          {e.currentClient ?? "—"}
        </TableCell>
      )}

      {/* ✅ 復社日 */}
      <TableCell
        className={
          isUrgent
            ? "text-amber-400 font-semibold"
            : "text-muted-foreground"
        }
      >
        {e.exitDate}
      </TableCell>

      {/* ✅ 業打ち数 */}
      <TableCell className="font-mono text-card-foreground">
        {e.interviewCount}件
      </TableCell>

      {/* ✅ 業打ち */}
      <TableCell>
        {e.scheduled?.length > 0 ? (
          <Button
            size="sm"
            variant={expandedScheduledId === e.id ? "secondary" : "outline"}
            onClick={() =>
              setExpandedScheduledId(
                expandedScheduledId === e.id ? null : e.id
              )
            }
            className="h-auto px-3 py-1.5 text-[11px] flex justify-between"
          >
            <span>業打ち {e.scheduled.length}件</span>
          
            <ChevronDown
              className={`w-3 h-3 transition-transform ${
                expandedScheduledId === e.id ? "rotate-180" : ""
              }`}
            />
          </Button>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </TableCell>

      {/* ✅ 候補 */}
      <TableCell>
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
          <span className="text-muted-foreground">—</span>
        )}
      </TableCell>
    </TableRow>
  );
};
