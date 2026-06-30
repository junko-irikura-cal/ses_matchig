
import React, { useState } from "react";
import { Role } from "../types";
import { 
  Search, 
  UserPlus, 
  SlidersHorizontal, 
  MapPin, 
  Calendar, 
  Briefcase, 
  CircleDollarSign,
  ChevronRight, 
  User, 
  X,
  Plus,
  Filter,
  ChevronDown,
  Building2,
  AlertCircle,
  Mail
} from "lucide-react";
import { useEffect, useRef } from "react";

import { ENG_CFG } from "../constants/statusConfig";
import { ENGINEERS, CLIENTS_DATA, INIT_INTERVIEWS } from "../constants/mockData";
import { EngBadge, InterviewStatusBadge } from "../components/badges";
import { FilterDropdown } from "../components/FilterDropdown";
import { Button } from "../components/AppButton";
import { LinkButton } from "../components/LinkButton";
import { MainTable } from "../components/table/MainTable";
import { MainTableHeader } from "../components/table/MainTableHeader";
import { TableCell } from "../components/table/TableCell";
import { TableRow } from "../components/table/TableRow";
import { EngineerRow } from "../components/table/EngineerRow";
import { EngineerRowCard } from "../components/card/EngineerRowCard";

interface EngineerPageProps {
  role: Role;
}

// ─── Engineer Management ──────────────────────────────────────────────────────

const ENG_STATUSES: EngStatus[] = ["復社", "先付", "待機", "参画", "業打ち中"];
const NEXT_MONTH_EXITS = ["2026-07-31", "2026-07-15", "2026-07-01"];

const EngineerPage = ({ 
  role,
  onEngineerSelect,
  onClientSelect,
  onProjectSelect
 }: { role: Role; onEngineerSelect: (id: string) => void }) => {
  
  const [selectedSales, setSelectedSales] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedBases, setSelectedBases] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const SALES = ["一田", "二田", "三田", "四田"];
  const TEAMS = ["第一", "第二", "第三"];
  const AREAS = ["東日本", "首都圏", "東京オフィス", "横浜オフィス"];
  const BASES = ["東日本", "首都圏", "東京オフィス", "横浜オフィス"];
  const LANGUAGES = ["Java", "Python", "C#", "React", "Go", "PHP"];

  const toggle = (value: string, list: string[], setList: (v: string[]) => void) => {
    if (list.includes(value)) {
      setList(list.filter(v => v !== value));
    } else {
      setList([...list, value]);
    }
  };
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  


  const [nextMonth, setNextMonth] = useState(false);
  const [expandedEngId, setExpandedEngId] = useState<string | null>(null);

  const [showAddEngineer, setShowAddEngineer] = useState(false);
  const list = ENGINEERS.filter(e => {
    if (nextMonth) return NEXT_MONTH_EXITS.includes(e.exitDate) && e.currentClient;
    return true;
  });
  const [expandedScheduledId, setExpandedScheduledId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const toggleSelect = (id: string) => {
  setSelectedIds(prev =>
    prev.includes(id)
      ? prev.filter(i => i !== id)
      : [...prev, id]
  );
};

  return (
    <div className="p-4 md:p-6 space-y-4 pt-16 lg:pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-lg font-semibold text-card-foreground">エンジニア管理</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setNextMonth(!nextMonth)}
            className={
              nextMonth
                ? "bg-amber-500/20 border-amber-500/30 text-amber-600"
                : "text-muted-foreground"
            }
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">来月復社予定を抽出</span>
            <span className="sm:hidden">来月退場</span>
          </Button>
          
          <Button
            size="sm"
            variant="primary"
            onClick={() => setShowAddEngineer(true)}
          >
            <Plus className="w-3.5 h-3.5" />
            エンジニア登録
          </Button>

        </div>
      </div>

      {!nextMonth && (
        <div className="flex flex-wrap gap-2">
        
          <FilterDropdown
            label="担当営業"
            options={SALES}
            selected={selectedSales}
            setSelected={setSelectedSales}
            name="sales"
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />

          <FilterDropdown
            label="営業チーム"
            options={TEAMS}
            selected={selectedTeams}
            setSelected={setSelectedTeams}
            name="teams"
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />

          <FilterDropdown
            label="エリア"
            options={AREAS}
            selected={selectedAreas}
            setSelected={setSelectedAreas}
            name="areas"
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />

          <FilterDropdown
            label="エンジニア所属拠点"
            options={BASES}
            selected={selectedBases}
            setSelected={setSelectedBases}
            name="bases"
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />

          <FilterDropdown
            label="言語"
            options={LANGUAGES}
            selected={selectedLanguages}
            setSelected={setSelectedLanguages}
            name="langs"
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />

        </div>
      )}


      
{/* 📱 モバイル・タブレット用：アコーディオン内蔵カード型レイアウト（PCでは非表示） */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:hidden">
  {list.map(e => (
    <EngineerRowCard
      key={e.id}
      e={e}
      selectedIds={selectedIds}
      toggleSelect={toggleSelect}
      onEngineerSelect={onEngineerSelect}
      nextMonth={nextMonth}
      expandedEngId={expandedEngId}
      expandedScheduledId={expandedScheduledId}
      setExpandedEngId={setExpandedEngId}
      setExpandedScheduledId={setExpandedScheduledId}
      role={role}
      NEXT_MONTH_EXITS={NEXT_MONTH_EXITS}
      CLIENTS_DATA={CLIENTS_DATA}
      onClientSelect={onClientSelect}
      onProjectSelect={onProjectSelect}
    />
  ))}
</div>


{/* 💻 PC用：従来の横長2行型テーブル構造（モバイルでは非表示） */}

<div className="flex items-center mb-3 gap-4">
  
<Button
  disabled={selectedIds.length === 0}
  onClick={() => {
    const selected = ENGINEERS.filter(e =>
      selectedIds.includes(e.id)
    );

    alert(
      `${selected.map(e => e.name).join(", ")} にメール送信（モック）`
    );
  }}
>
  メール送信
</Button>

  <div className="text-sm">
    選択中：{selectedIds.length}件
  </div>
</div>


<div className="hidden lg:block">
  <MainTable>
    <MainTableHeader>
      <tr>
        {["選択", "氏名", "ステータス", "主要スキル", role !== "recruiting" ? "現参画先" : null, "復社予定", "業打ち件数", "予定業打ち", "業打ち候補"]
            .filter(Boolean).map(h => (
              <th key={h} className="text-left px-4 py-2.5 font-medium text-muted-foreground whitespace-nowrap">{h}</th>
            ))}
      </tr>
      </MainTableHeader>
      <tbody className="divide-y divide-border">
        {list.map(e => {
          const isUrgent = NEXT_MONTH_EXITS.includes(e.exitDate);
          const engInterviews = INIT_INTERVIEWS.filter(
            (i) => i.engineerName === e.name
          );

          const totalCandidateCount = e.candidates?.reduce((acc, c) => acc + c.projects.length, 0) || 0;
          const isExpanded = expandedEngId === e.id;

          return (
            <React.Fragment key={e.id}>
              <EngineerRow
                key={e.id}
                e={e}
                selectedIds={selectedIds}
                toggleSelect={toggleSelect}
                onEngineerSelect={onEngineerSelect}
                nextMonth={nextMonth}
                expandedEngId={expandedEngId}
                expandedScheduledId={expandedScheduledId}
                setExpandedEngId={setExpandedEngId}
                setExpandedScheduledId={setExpandedScheduledId}
                role={role}
                NEXT_MONTH_EXITS={NEXT_MONTH_EXITS}
              />
              
            {expandedScheduledId === e.id &&
              e.scheduled &&
              e.scheduled.length > 0 && (
                <tr className="bg-secondary/10 border-b border-border/50">
                  <td colSpan={10} className="px-6 py-3">
                    <div className="space-y-2.5">
                      <div className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase">
                        予定業打ち一覧
                      </div>
              
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {e.scheduled.map((s, sIdx) => (
                          <div
                            key={sIdx}
                            className="bg-card border border-border/60 rounded-lg p-2.5 space-y-1.5 shadow-sm"
                          >
                            {/* 企業名 */}
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-card-foreground">
                              <Building2 className="w-3.5 h-3.5 text-primary" />
                              <LinkButton
                                onClick={() => {
                                  const client = CLIENTS_DATA.find(
                                    (cl) =>
                                      cl.clientName === s.clientName ||
                                      cl.clientName.includes(s.clientName) ||
                                      s.clientName.includes(cl.clientName)
                                  );
                                  if (client) onClientSelect(client.id);
                                }}
                              >
                                {s.clientName}
                              </LinkButton>
                            </div>
                              
                            {/* 案件 + ステータス */}
                            <ul className="space-y-1 pl-5 text-muted-foreground text-xs">
                              {s.projects.map((p, pIdx) => (
                                <li
                                 key={pIdx}
                                 className="flex items-center gap-2"
                                 >
                                  <LinkButton
                                    onClick={() => {
                                      const client = CLIENTS_DATA.find(
                                        (cl) => cl.clientName === s.clientName
                                      );
                                      const proj = client?.projects?.find(
                                        (proj) =>
                                          proj.title === p.title ||
                                          proj.title.includes(p.title) ||
                                          p.title.includes(proj.title)
                                      );
                                      if (proj) onProjectSelect(proj.id);
                                    }}
                                    className="text-xs truncate"
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
                    </div>
                  </td>
                </tr>
              )}
              
              {isExpanded && e.candidates && e.candidates.length > 0 && (
                <tr className="bg-secondary/10 border-b border-border/50">
                  <td colSpan={10} className="px-6 py-3">
                    <div className="space-y-2.5">
                      <div className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase">マッチング候補一覧</div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {e.candidates.map((c, cIdx) => (
                          <div key={cIdx} className="bg-card border border-border/60 rounded-lg p-2.5 space-y-1.5 shadow-sm">
                            {/* PC用: 顧客企業リンク */}
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-card-foreground">
                              <Building2 className="w-3.5 h-3.5 text-primary" />
                              <LinkButton
                                onClick={() => {
                                  const client = CLIENTS_DATA.find(cl => cl.clientName === c.clientName || cl.clientName.includes(c.clientName) || c.clientName.includes(cl.clientName));
                                  if (client) onClientSelect(client.id);
                                  else if (CLIENTS_DATA.length > 0) onClientSelect(CLIENTS_DATA[0].id);
                                }}
                              >
                                {c.clientName}
                              </LinkButton>
                            </div>
                            {/* PC用: 案件リストリンク */}
                            <ul className="space-y-1 pl-5 text-muted-foreground text-xs">
                              {c.projects.map((p, pIdx) => (
                                <li
                                  key={pIdx}
                                  className="flex items-center justify-between gap-2"
                                >
                                  {/* 案件名 */}
                                  <LinkButton
                                    onClick={() => {
                                      const client = CLIENTS_DATA.find(
                                        (cl) =>
                                          cl.clientName === c.clientName ||
                                          cl.clientName.includes(c.clientName) ||
                                          c.clientName.includes(cl.clientName)
                                      );
                                    
                                      const proj = client?.projects?.find(
                                        (proj) =>
                                          proj.title === p ||
                                          proj.title.includes(p) ||
                                          p.includes(proj.title)
                                      );
                                    
                                      if (proj) {
                                        onProjectSelect?.(proj.id);
                                      } else if (client?.projects?.length) {
                                        onProjectSelect?.(client.projects[0].id);
                                      }
                                    }}
                                    className="flex-1 truncate text-xs"
                                  >
                                    {p}
                                  </LinkButton>
                                  
                                  {/* ✅ エントリーボタン */}
                                  <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => alert(`${p} にエントリー（モック）`)}
                                  >
                                    エントリー
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </MainTable>
  {list.length === 0 && (
    <div className="py-12 text-center text-xs text-muted-foreground">該当するエンジニアがいません</div>
  )}
</div>

{/* 💡 ここから：新規エンジニア登録モーダル */}
      {showAddEngineer && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddEngineer(false)} // 背景クリックで閉じる
        >
          <div 
            className="bg-card border border-border rounded-lg w-full max-w-md p-5 space-y-4 shadow-xl"
            onClick={(e) => e.stopPropagation()} // モーダル内クリックでは閉じないようにする
          >
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h2 className="text-sm font-semibold text-card-foreground flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-primary" /> 新規エンジニア登録
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddEngineer(false)}
                className="h-auto p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* 入力フォームエリア */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-muted-foreground mb-1">氏名</label>
                <input type="text" placeholder="エンジニア氏名を入力" className="w-full p-2 bg-secondary/50 border border-border rounded focus:outline-none focus:border-primary/50 text-card-foreground" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-muted-foreground mb-1">ステータス</label>
                  <select className="w-full p-2 bg-secondary/50 border border-border rounded focus:outline-none focus:border-primary/50 text-card-foreground">
                    <option value="待機">待機</option>
                    <option value="復社">復社</option>
                    <option value="先付">先付</option>
                    <option value="参画">GE</option>
                    <option value="業打ち中">新卒</option>
                  </select>
                </div>
                <div>
                  <label className="block text-muted-foreground mb-1">復社予定日</label>
                  <input type="date" className="w-full p-2 bg-secondary/50 border border-border rounded focus:outline-none focus:border-primary/50 text-card-foreground" />
                </div>
              </div>

              <div>
                <label className="block text-muted-foreground mb-1">主要スキル（カンマ区切り）</label>
                <input type="text" placeholder="React, TypeScript, AWS" className="w-full p-2 bg-secondary/50 border border-border rounded focus:outline-none focus:border-primary/50 text-card-foreground" />
              </div>

              <div>
                <label className="block text-muted-foreground mb-1">現参画先</label>
                <input type="text" placeholder="なし、または企業名を入力" className="w-full p-2 bg-secondary/50 border border-border rounded focus:outline-none focus:border-primary/50 text-card-foreground" />
              </div>
            </div>

            {/* 下部ボタンエリア */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setShowAddEngineer(false)}
              >
                キャンセル
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  alert("エンジニアを登録しました（モック表示）");
                  setShowAddEngineer(false);
                }}
              >
                登録する
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* 💡 ここまで：新規エンジニア登録モーダル */}
      
      {/* 📱 モバイル用メール送信ボタン（まんまる） */}
<div className="fixed bottom-16 right-4 lg:hidden z-50">
  <Button
    disabled={selectedIds.length === 0}
    onClick={() => {
      const selected = ENGINEERS.filter((e) =>
        selectedIds.includes(e.id)
      );

      alert(
        `${selected.map((e) => e.name).join(", ")}にメール送信（モック）`
      );
    }}
    className={
      selectedIds.length === 0
        ? ""
        : "bg-primary text-white h-14 w-14 rounded-full shadow-lg"
    }
  >
    <Mail className="w-5 h-5" />
  </Button>
</div>
    </div>
  );
};

export default EngineerPage;