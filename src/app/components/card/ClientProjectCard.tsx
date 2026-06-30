
import { EngBadge, SkillBadge, InterviewStatusBadge } from "../badges";
import { LinkButton } from "../LinkButton";
import { Button } from "../AppButton";
import { User, Building2, ClipboardList } from "lucide-react";
import { ENGINEERS } from "../../constants/mockData";

type Props = {
  client: any;
  project: any;
  expandedProjId: string | null;
  setExpandedProjId: (id: string | null) => void;
  onClientSelect: (id: string) => void;
  onSelectProject: (id: string) => void;
};

export const ClientProjectCard = ({
  client,
  project,
  expandedProjId,
  setExpandedProjId,
  onClientSelect,
  onSelectProject,
  onEngineerSelect,
}: Props) => {
  const isExpanded = expandedProjId === project.id;
  const candidateCount = project.candidates?.length || 0;

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3 shadow-sm">

      {/* 上部 */}
      <div className="flex items-start justify-between gap-2 border-b border-border/40 pb-2.5">

        {/* 左側 */}
        <div className="flex flex-col items-start gap-1">

          {/* 企業 */}
          <Button
            variant="ghost"
            size="md"
            onClick={() => onClientSelect(client.id)}
            className="h-auto p-0 text-primary flex items-center gap-1 justify-start"
          >
            <Building2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate text-sm">
              {client.clientName}
            </span>
          </Button>

          {/* 案件 */}
          <Button
            variant="ghost"
            size="md"
            onClick={() => onSelectProject(project.id)}
            className="h-auto p-0 text-primary font-bold flex items-center gap-1 justify-start"
          >
            <ClipboardList className="w-3 h-3 shrink-0" />
            <span className="truncate text-xs">
              {project.title}
            </span>
          </Button>

        </div>

        {/* 右側 */}
        <div className="flex flex-col items-end gap-1">
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded border ${
              client.type === "自治体"
                ? "bg-sky-500/10 text-sky-400 border-sky-500/20"
                : "bg-secondary text-muted-foreground border-border"
            }`}
          >
            {client.type}
          </span>
          
          <InterviewStatusBadge status={project.status} />
        </div>
          
      </div>

      {/* 中部 */}
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div>
          <span className="text-muted-foreground text-[10px]">期間</span>
          <div className="font-mono">{project.period}</div>
        </div>

        <div>
          <span className="text-muted-foreground text-[10px]">最終接触</span>
          <div className="font-mono">{client.lastContact}</div>
        </div>

        <div className="col-span-2">
          <span className="text-muted-foreground text-[10px]">必須スキル</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {project.requiredSkills.map((sk: string) => (
              <SkillBadge key={sk} label={sk} />
              ))}
          </div>
        </div>
      </div>

      {/* 下部（候補） */}
      <div className="pt-2 border-t border-border/40">
        {candidateCount > 0 ? (
          <div className="space-y-2">

            {/* トグル */}
            <Button
              variant={isExpanded ? "secondary" : "outline"}
              size="sm"
              onClick={() =>
                setExpandedProjId(isExpanded ? null : project.id)
              }
              className="w-full justify-between h-auto px-3 py-1.5 text-[11px]"
            >
              <span>業打ち候補 ({candidateCount}名)</span>
            
              <span
                className={`transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </Button>

            {/* 展開 */}
            {isExpanded && project.candidates && (
              <div className="space-y-2">
              
                {project.candidates.map((cand: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-card border border-border rounded p-2 space-y-1"
                  >
                  
                    {/* 上段 */}
                    <div className="flex justify-between items-center">
                      <LinkButton
                        onClick={() => {
                          const eng = ENGINEERS.find(
                            (e) => e.name === cand.engineerName
                          );
                        
                          console.log("found", eng);
                        
                          if (eng) {
                            onEngineerSelect(eng.id);
                          }
                        }}
                        className="flex justify-between items-center gap-1 font-semibold text-xs"
                      >
                        <User className="w-4 h-4" />
                        {cand.engineerName}
                      </LinkButton>
                      
                      {/* ✅ ステータスバッジ */}
                      <EngBadge status={cand.status} />
                    </div>
                
                    {/* 下段 */}
                    <div className="flex flex-wrap gap-1">
                      {cand.skills.map((sk: string) => (
                        <SkillBadge key={sk} label={sk} />
                      ))}
                    </div>
                    
                  </div>
                ))}

              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>業打ち候補</span>
            <span>—</span>
          </div>
        )}
      </div>

    </div>
  );
};
