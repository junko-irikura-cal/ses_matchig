import React, { useState } from "react";
import type { Interview } from "../types";


import {
  Building2,
  Calendar,
  CheckCircle,
  ArrowLeft,
  Mail,
  Phone,
  History,
  Code,
  Briefcase,
  Award,
  User,
  X
} from "lucide-react";


import { ENG_CFG } from "../constants/statusConfig";
import { ENGINEERS, CLIENTS_DATA } from "../constants/mockData";
import { FilterDropdown } from "../components/FilterDropdown";
import { EngBadge } from "../components/badges";
import { ClientProjectCard } from "../components/card/ClientProjectCard";
import { ClientProjectRow } from "../components/table/ClientProjectRow";
import { Button } from "../components/AppButton";
import { LinkButton } from "../components/LinkButton";
import { SkillBadge, InterviewStatusBadge } from "../components/badges";
import { EditModal } from "../components/EditModal";


// ─── Client Management ────────────────────────────────────────────────────────

const ClientManagement = ({
  role,
  interviews,
  onClientSelect,
  onSelectProject,
  onEngineerSelect,
}: {
  role: Role;
  interviews: Interview[];
  onSelectClient: (id: string) => void;
  onSelectProject: (id: string) => void;
}) => {

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"全件" | "民間" | "自治体">("全件");
  const [expandedProjId, setExpandedProjId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientType, setNewClientType] = useState<"民間" | "自治体">("民間");

  const list = CLIENTS_DATA.filter(c => {
    const mt = typeFilter === "全件" || c.type === typeFilter;
    const ms = search === "" || c.clientName.includes(search);
    return mt && ms;
  });

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const newClient = {
      id: `client-${Date.now()}`,
      clientName: newClientName,
      type: newClientType,
      lastContact: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
      projects: []
    };

    CLIENTS_DATA.unshift(newClient);
    setNewClientName("");
    setNewClientType("民間");
    setIsModalOpen(false);
  };
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  
const BASES = ["東京", "大阪", "福岡"];
const HEADCOUNTS = ["1名", "2名", "3名以上"];
const PERIODS = ["即日", "1ヶ月以内", "3ヶ月以内"];
const STATUSES = ["募集中", "業打ち中", "終了"];
const MUST_SKILLS = ["Java", "React", "AWS"];
const NICE_SKILLS = ["TypeScript", "Docker"];
const [selectedBases, setSelectedBases] = useState<string[]>([]);
const [selectedHeadcounts, setSelectedHeadcounts] = useState<string[]>([]);
const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
const [selectedMustSkills, setSelectedMustSkills] = useState<string[]>([]);
const [selectedNiceSkills, setSelectedNiceSkills] = useState<string[]>([]);


  return (
    <div className="p-4 md:p-6 space-y-4 pt-16 lg:pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-lg font-semibold text-card-foreground">顧客・案件管理</h1>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
          >
            + 顧客登録
          </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="企業名で検索…"
            className="w-full pl-4 pr-4 py-2 bg-card border border-border rounded-lg text-xs text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
          />
        </div>
        <div className="flex gap-1">
          {(["全件", "民間", "自治体"] as const).map(t => (
          <Button
            key={t}
            size="sm"
            variant={typeFilter === t ? "secondary" : "outline"}
            onClick={() => setTypeFilter(t)}
            className="h-auto px-3 py-1.5 text-xs"
          >
            {t}
          </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">

  <FilterDropdown
    label="拠点"
    options={BASES}
    selected={selectedBases}
    setSelected={setSelectedBases}
    name="bases"
    openFilter={openFilter}
    setOpenFilter={setOpenFilter}
  />

  <FilterDropdown
    label="募集人員"
    options={HEADCOUNTS}
    selected={selectedHeadcounts}
    setSelected={setSelectedHeadcounts}
    name="headcount"
    openFilter={openFilter}
    setOpenFilter={setOpenFilter}
  />

  <FilterDropdown
    label="時期"
    options={PERIODS}
    selected={selectedPeriods}
    setSelected={setSelectedPeriods}
    name="period"
    openFilter={openFilter}
    setOpenFilter={setOpenFilter}
  />

  <FilterDropdown
    label="ステータス"
    options={STATUSES}
    selected={selectedStatuses}
    setSelected={setSelectedStatuses}
    name="status"
    openFilter={openFilter}
    setOpenFilter={setOpenFilter}
  />

  <FilterDropdown
    label="必須条件"
    options={MUST_SKILLS}
    selected={selectedMustSkills}
    setSelected={setSelectedMustSkills}
    name="must"
    openFilter={openFilter}
    setOpenFilter={setOpenFilter}
  />

  <FilterDropdown
    label="推奨要件"
    options={NICE_SKILLS}
    selected={selectedNiceSkills}
    setSelected={setSelectedNiceSkills}
    name="nice"
    openFilter={openFilter}
    setOpenFilter={setOpenFilter}
  />

</div>

<div className="space-y-4">
  {/* 🖥️ PC・タブレット用：従来のテーブル表示 (hidden sm:block) */}
  <div className="hidden sm:block bg-card border border-border rounded-lg overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-xs min-w-[800px]">
        <thead>
          <tr className="border-b border-border bg-secondary/30">
            {["企業名", "属性", "最終接触", "案件名", "必須スキル", "期間", "ステータス", "業打ち候補"].map(h => (
              <th key={h} className="text-left px-4 py-2.5 font-medium text-muted-foreground whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>

<tbody className="divide-y divide-border">

{list.map(client => {

  // ✅ 案件なし
  if (!client.projects || client.projects.length === 0) {
    return (
      <tr key={client.id}>
        <td className="px-4 py-3 font-semibold">
          <LinkButton
           onClick={() => onClientSelect(client.id)}
           className="font-semibold text-base"
           >
            {client.clientName}
          </LinkButton>
        </td>

        <td className="px-4 py-3">{client.type}</td>

        <td className="px-4 py-3 font-mono text-muted-foreground">
          {client.lastContact}
        </td>

        <td colSpan={5} className="px-4 py-3 text-muted-foreground italic text-center">
          現在、登録されている案件はありません
        </td>
      </tr>
    );
  }

  // ✅ 案件あり（ここが重要）
  return client.projects.flatMap((project, idx) => {
    const isExpanded = expandedProjId === project.id;

    return [

      // ✅ ① 通常Row
      <ClientProjectRow
        key={`row-${project.id}`}
        client={client}
        project={project}
        pIdx={idx}
        expandedProjId={expandedProjId}
        setExpandedProjId={setExpandedProjId}
        onClientSelect={onClientSelect}
        onSelectProject={onSelectProject}
        onEngineerSelect={onEngineerSelect}
      />,

      // ✅ ② 展開Row
      isExpanded && project.candidates && (
        <tr key={`expand-${project.id}`} className="bg-secondary/10">
          <td colSpan={8} className="px-6 py-3">

            {/* 展開中身 */}
            <div className="space-y-2">
              <div className="text-[10px] text-muted-foreground font-semibold">
                マッチングエンジニア
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {project.candidates.map((cand: any, idx: number) => (
                <div key={idx} className="bg-card border border-border/60 rounded-lg p-2.5 space-y-1.5 shadow-sm">
                
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex justify-between items-center gap-1 text-primary">
                    <User className="w-3.5 h-3.5 flex-shrink-0" />
                    <LinkButton
                      onClick={() => {
                        const eng = ENGINEERS.find(
                          (e) => e.name === cand.engineerName
                        );
                      
                        console.log("match eng", eng);
                      
                        if (eng) {
                          onEngineerSelect(eng.id);
                        } else {
                          console.log("engineer not found", cand);
                        }
                      }}
                      className="font-semibold text-sm"
                    >
                      {cand.engineerName}
                    </LinkButton>
                    </div>
                    
                    <EngBadge status={cand.status} />
                  </div>
                    
                  <div className="flex flex-wrap gap-1">
                    {cand.skills.map((sk: string) => (
                      <SkillBadge key={sk} label={sk} />
                    ))}
                  </div>
                  
                </div>
              ))}
              </div>
            </div>

          </td>
        </tr>
      )

    ];
  });

})}

</tbody>

      </table>
    </div>
  </div>

  {/* 📱 スマホ用：レスポンシブカード表示 (block sm:hidden) */}

<div className="block sm:hidden space-y-3 text-xs">
  {list.map(client => {

    if (!client.projects || client.projects.length === 0) {
      return (
        <div key={client.id} className="bg-card border rounded-lg p-4">
          {client.clientName}
          <div className="text-muted-foreground text-center">
            案件なし
          </div>
        </div>
      );
    }

    return client.projects.map(p => (
      <ClientProjectCard
        key={p.id}
        client={client}
        project={p}
        expandedProjId={expandedProjId}
        setExpandedProjId={setExpandedProjId}
        onClientSelect={onClientSelect}
        onSelectProject={onSelectProject}
        onEngineerSelect={onEngineerSelect}
      />
    ));

  })}
</div>

</div>

      {/* 顧客登録モーダル */}
{isModalOpen && (
  <div
    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
    onClick={() => setIsModalOpen(false)}
  >
    <div
      className="bg-card border border-border rounded-lg w-full max-w-md p-5 space-y-4 shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >

      {/* ヘッダー */}
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h2 className="text-sm font-semibold text-card-foreground">
          新規顧客企業 登録
        </h2>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsModalOpen(false)}
          className="h-auto p-1"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* フォーム */}
      <div className="space-y-3 text-xs">

        <div>
          <label className="block text-muted-foreground mb-1">企業名</label>
          <input
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            className="w-full p-2 bg-secondary/50 border border-border rounded"
          />
        </div>

        <div>
          <label className="block text-muted-foreground mb-1">属性</label>
          <div className="grid grid-cols-2 gap-2">
            {(["民間", "自治体"] as const).map((type) => (
              <Button
                key={type}
                size="sm"
                variant={newClientType === type ? "secondary" : "outline"}
                onClick={() => setNewClientType(type)}
                className="h-auto px-3 py-2 text-xs"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

      </div>

      {/* フッター */}
      <div className="flex justify-end gap-2 pt-2 border-t">
        <Button
          variant="secondary"
          size="md"
          onClick={() => setIsModalOpen(false)}
        >
          キャンセル
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={(e) => {
            handleCreateClient(e as any);
          }}
        >
          登録する
        </Button>
      </div>

    </div>
  </div>
)}
    </div>
  );
};

export default ClientManagement;