
import { User, Building2, ClipboardList } from "lucide-react";
import { LinkButton } from "../LinkButton";
import { Button } from "../AppButton";
import { SkillBadge } from "../badges";

export const InterviewRowCard = ({
  i,
  role,
  onEngineerSelect,
  onClientSelect,
  onProjectSelect,
  onStatusUpdate,
  onApprove,
  CLIENTS_DATA,
}: any) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">

      {/* 上段 */}
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <LinkButton
            onClick={() => onEngineerSelect(i.engineerName)}
            className="font-semibold text-base flex gap-2"
          >
            <User className="w-4 h-4" />
            {i.engineerName}
          </LinkButton>

          <div className="flex gap-1.5">
            <SkillBadge label={i.language} />
            <span className="text-[11px] text-muted-foreground">
              {i.round}回目
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <span className="text-[10px]">
            {i.approvalFlag}
          </span>
        </div>
      </div>

      
{/* 中段 */}
<div className="bg-secondary/20 border rounded-lg p-2.5 text-xs space-y-1.5">

  {/* ✅ 顧客企業 */}
  <div>
    <span className="text-muted-foreground text-[10px]">顧客企業</span>
    
    <LinkButton
      onClick={() => {
        const client = CLIENTS_DATA.find(
          client => client.clientName === i.clientName
        );

        if (client) {
          onClientSelect(client.id);
        }
      }}
      className="flex items-center gap-1 text-sm text-primary hover:underline"
    >
      <Building2 className="w-3 h-3 text-primary flex-shrink-0" />
      {i.clientName}
    </LinkButton>
  </div>

  {/* ✅ 案件 */}
  <div>
    <span className="text-muted-foreground text-[10px]">対象案件</span>

    <LinkButton
      onClick={() => {
        const client = CLIENTS_DATA.find(
          client => client.clientName === i.clientName
        );

        if (client && client.projects && client.projects.length > 0) {
          onProjectSelect(client.projects[0].id);
        }
      }}
      className="flex items-center gap-1 text-xs text-primary hover:underline"
    >
      <ClipboardList className="w-3 h-3 shrink-0" />
      {(() => {
        const client = CLIENTS_DATA.find(
          client => client.clientName === i.clientName
        );

        if (client && client.projects && client.projects.length > 0) {
          return client.projects[0].title;
        }

        return "案件詳細";
      })()}
    </LinkButton>
  </div>

</div>


      {/* 下段 */}
      <div className="flex justify-between items-center pt-2 border-t">

        {/* ステータス */}
        <select
          value={i.status}
          onChange={e => onStatusUpdate(i.id, e.target.value)}
          className="text-xs border rounded px-1"
        >
          <option>承認待ち</option>
        </select>

        {/* 承認 */}
        {i.approvalFlag === "未承認" && role !== "recruiting" ? (
          <Button size="sm">
            承認
          </Button>
        ) : (
          <span className="text-xs">—</span>
        )}

      </div>

    </div>
  );
};
