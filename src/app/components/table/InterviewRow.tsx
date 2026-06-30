
import { LinkButton } from "../LinkButton";
import { Button } from "../AppButton";
import { ApprovalBadge, SkillBadge } from "../badges";

export const InterviewRow = ({
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
    <tr className="hover:bg-secondary/10 transition-colors">

      {/* エンジニア */}
      <td className="px-4 py-3 font-semibold whitespace-nowrap">
        <LinkButton
          onClick={() => onEngineerSelect(i.engineerName)}
          className="font-semibold text-base"
        >
          {i.engineerName}
        </LinkButton>
      </td>

      {/* 顧客 */}
      <td className="px-4 py-3 whitespace-nowrap">
        <LinkButton
          onClick={() => {
            const client = CLIENTS_DATA.find(
              c =>
                c.clientName === i.clientName ||
                c.clientName.includes(i.clientName) ||
                i.clientName.includes(c.clientName)
            );
            if (client) onClientSelect(client.id);
          }}
          className="font-semibold text-sm"
        >
          {i.clientName}
        </LinkButton>
      </td>

      {/* 案件 */}
      <td className="px-4 py-3 text-muted-foreground max-w-[180px] truncate">
        <LinkButton
          className="text-xs"
          onClick={() => {
            const client = CLIENTS_DATA.find(
              c =>
                c.clientName === i.clientName ||
                c.clientName.includes(i.clientName) ||
                i.clientName.includes(c.clientName)
            );

            const proj = client?.projects?.[0];
            if (proj) onProjectSelect(proj.id);
          }}
        >
          {(() => {
            const client = CLIENTS_DATA.find(
              c =>
                c.clientName === i.clientName ||
                c.clientName.includes(i.clientName) ||
                i.clientName.includes(c.clientName)
            );
            return client?.projects?.[0]?.title ?? "案件詳細 ➔";
          })()}
        </LinkButton>
      </td>

      {/* 言語 */}
      <td className="px-4 py-3">
        <SkillBadge label={i.language} />
      </td>

      {/* 回数 */}
      <td className="px-4 py-3 font-mono">
        {i.round}回目
      </td>

      {/* 日時 */}
      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap font-mono">
        {i.scheduledDate ?? "—"}
      </td>

      {/* ステータス */}
      <td className="px-4 py-3">
        <select
          value={i.status}
          onChange={(e) =>
            onStatusUpdate(i.id, e.target.value)
          }
          className="bg-secondary/60 border border-border rounded px-1.5 py-0.5 text-xs"
        >
          {["承認待ち", "業打ち待ち", "日程調整中", "最終結果確認", "結果待ち", "成約", "失注"].map(st => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </td>

      {/* 承認状態 */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] ${
            i.approvalFlag === "承認済"
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-amber-500/10 text-amber-400"
          }`}
        >
          {i.approvalFlag}
        </span>
      </td>

      {/* アクション */}
      <td className="px-4 py-3 whitespace-nowrap text-center">
        {i.approvalFlag === "未承認" && role !== "recruiting" ? (
          <Button
            size="sm"
            onClick={() => onApprove(i.id)}
          >
            承認
          </Button>
        ) : i.approvalFlag === "承認済" ? (
          <ApprovalBadge flag="承認済" />
        ) : (
          <span className="text-muted-foreground text-[11px] font-mono">—</span>
        )}
      </td>
    </tr>
  );
};
