import { Button } from "../AppButton";
import { LinkButton } from "../LinkButton";
import { SkillBadge, InterviewStatusBadge } from "../badges";

export const ClientProjectRow = ({
  client,
  project,
  pIdx,
  expandedProjId,
  setExpandedProjId,
  onClientSelect,
  onSelectProject,
  onEngineerSelect,
}: any) => {
  const isExpanded = expandedProjId === project.id;
  const hasCandidates = (project.candidates?.length || 0) > 0;

  return (
    <tr className="hover:bg-secondary/10 transition-colors">

      {/* 企業名 */}
      <td className="px-4 py-3 font-semibold whitespace-nowrap">
        {pIdx === 0 && (
          <LinkButton
           onClick={() => onClientSelect(client.id)}
           className="font-semibold text-base"
           >
            {client.clientName}
          </LinkButton>
        )}
      </td>

      {/* 属性 */}
      <td className="px-4 py-3">
        {pIdx === 0 && (
          <span className="text-[10px]">
            {client.type}
          </span>
        )}
      </td>

      {/* 最終接触 */}
      <td className="px-4 py-3 text-muted-foreground font-mono">
        {pIdx === 0 ? client.lastContact : ""}
      </td>

      {/* 案件 */}
      <td className="px-4 py-3">
        <LinkButton
          className="text-xs font-medium"
          onClick={() => onSelectProject(project.id)}
        >
          {project.title}
        </LinkButton>
      </td>

      {/* スキル */}
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {project.requiredSkills.map((sk: string) => (
            <SkillBadge key={sk} label={sk} />
          ))}
        </div>
      </td>

      {/* 期間 */}
      <td className="px-4 py-3 font-mono text-muted-foreground">
        {project.period}
      </td>

      {/* ステータス */}
      <td className="px-4 py-3">
        <InterviewStatusBadge status={project.status} />
      </td>

      {/* ✅ 展開トグル（超重要） */}
      <td className="px-4 py-3 whitespace-nowrap">

        {hasCandidates ? (
          <Button
            size="sm"
            variant={isExpanded ? "secondary" : "outline"}
            onClick={() =>
              setExpandedProjId(
                isExpanded ? null : project.id
              )
            }
            className="h-auto px-2 py-1 text-[11px] flex items-center justify-between"
          >
            <span>候補 {project.candidates.length}名</span>
          
            <span
              className={`text-[9px] transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </Button>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}

      </td>

    </tr>
  );
};
