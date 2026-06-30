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
  ClipboardList,
  X
} from "lucide-react";


import { ENG_CFG } from "../constants/statusConfig";
import { ENGINEERS, CLIENTS_DATA } from "../constants/mockData";
import { EditModal } from "../components/EditModal";
import { EngBadge, SkillBadge, InterviewStatusBadge } from "../components/badges";
import { FilterDropdown } from "../components/FilterDropdown";
import { Button } from "../components/AppButton";
import { LinkButton } from "../components/LinkButton";


// ─── Client Detail ──────────────────────────────────────────────────────────

const ClientDetailPage = ({ 
  clientId, 
  onBack, 
  role, 
  interviews, 
  onSelectProject,
  onEngineerSelect
}: {
  clientId: string;
  onBack: () => void;
  role: Role;
  interviews: Interview[];
  onSelectProject: (projectId: string) => void;
  onEngineerSelect: (name: string) => void;
}) => {
  const client = CLIENTS_DATA.find(c => c.id === clientId || c.clientName === clientId);

  if (!client) {
    return (
      <div className="p-4 md:p-6 pt-16 lg:pt-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="h-auto p-0 text-primary hover:underline justify-start mb-4"
        >
          ← 戻る
        </Button>
        <div className="text-center py-12 text-muted-foreground">企業データが見つかりません</div>
      </div>
    );
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientType, setNewClientType] = useState<"民間" | "自治体">("民間");
  
  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("新規顧客:", newClientName, newClientType);
  
    setIsModalOpen(false);
  };
  const [selectedEngineerNames, setSelectedEngineerNames] = useState<string[]>([]);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [openModal, setOpenModal] = useState(false);

  // この企業に関連するすべての業打ち・業打ちを抽出
  const clientInterviews = interviews.filter(i => i.clientName === client.clientName);
  const activeInterviews = clientInterviews.filter(i => !["成約", "失注"].includes(i.status));

  // 💡 下部で「e.candidates」や「p.candidates」のループを動かすための保険
  const e = client;
  const p = client;

  return (
    <div className="p-4 md:p-6 space-y-5 pt-16 lg:pt-6 ">
      <div className="flex items-start justify-between mb-3">
        {/* 戻るボタン */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="h-auto p-0 text-primary hover:underline justify-start"
        >
          ← 戻る
        </Button>

        {/* 顧客登録ボタン */}
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
        >
          + 顧客登録
        </Button>
      </div>      

      {/* メインレイアウト：エンジニア詳細と同様の 2:1 グリッド */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* 左側：メイン情報（2カラム分） */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* 企業概要ヘッダー */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="text-xl font-bold text-card-foreground mb-2">{client.clientName}</h1>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-xs px-2 py-0.5 rounded border ${client.type === "自治体" ? "bg-sky-500/10 text-sky-400 border-sky-500/20" : "bg-secondary text-muted-foreground border-border"}`}>
                    {client.type}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">ID: {client.id}</span>
                </div>
              </div>
              <div className="hidden lg:block">
                <EditModal title="企業基本情報編集" triggerText="編集">
                  <input defaultValue={client.clientName} className="w-full p-2 border rounded" />
                  <input defaultValue={client.type} className="w-full p-2 border rounded" />
                  <input defaultValue={client.lastContact} className="w-full p-2 border rounded" />
                </EditModal>
              </div>              
            </div>

            {/* 企業のメタデータ情報 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs border-t border-border/40 pt-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>最終接触日: {client.lastContact}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="w-4 h-4 flex-shrink-0" />
                <span>登録案件数: {client.projects?.length || 0} 件</span>
              </div>
            </div>
          </div>

          {/* 進行中の選考・業打ち（業打ち）履歴 */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
            <h2 className="text-sm font-semibold text-card-foreground mb-4">
              この企業で進行中の業打ち
            </h2>
            <div className="hidden lg:block">
              <EditModal title="進行中業打ち情報編集" triggerText="編集">            
                <FilterDropdown
                  label="エンジニア追加"
                  options={ENGINEERS.map(e => e.name)}
                  selected={selectedEngineerNames}
                  setSelected={setSelectedEngineerNames}
                  name="addEngineer"
                  openFilter={openFilter}
                  setOpenFilter={setOpenFilter}
                />
              </EditModal>
            </div>
            
            </div>

            {activeInterviews.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              
                {activeInterviews.map(iv => {
                
                  // ✅ この企業の案件を取得
                  const client = CLIENTS_DATA.find(c =>
                    c.clientName === iv.clientName ||
                    c.clientName.includes(iv.clientName) ||
                    iv.clientName.includes(c.clientName)
                  );
                
                  const projects = client?.projects ?? [];
                
                  return (
                    <div
                      key={iv.id}
                      className="p-2.5 bg-secondary/30 rounded-lg border border-border/40 space-y-2"
                    >
                    
                      {/* エンジニア名 */}
                      <LinkButton
                        onClick={() => {
                          const eng = ENGINEERS.find(
                            e =>
                              e.name === iv.engineerName ||
                              e.name.includes(iv.engineerName) ||
                              iv.engineerName.includes(e.name)
                          );
                        
                          if (eng) {
                            onEngineerSelect?.(eng.id);
                          } else {
                            console.log("engineer not found", iv.engineerName);
                          }
                        }}
                        className="text-sm font-semibold flex items-center gap-2"
                      >
                        <User className="w-4 h-4 flex-shrink-0" />
                        {iv.engineerName}
                      </LinkButton>
                  
                      {/* ✅ 案件リスト */}
                      <div className="space-y-1.5 ml-5">
                  
                        {projects.slice(0, 2).map(p => ( // ← とりあえず2件表示
                          <div
                            key={p.id}
                            className="flex items-center justify-between text-[11px]"
                          >
                          
                            {/* 案件名（リンク） */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onSelectProject(p.id)}
                              className="h-auto p-0 text-primary hover:underline justify-start truncate"
                            >
                              {p.title}
                            </Button>
                        
                            {/* ステータス */}
                            <InterviewStatusBadge status={iv.status} />
                          </div>
                        ))}

                      </div>
                      
                      {/* 回数 */}
                      <div className="text-[10px] font-mono text-muted-foreground text-right">
                        {iv.round}次業打ち
                      </div>
                      
                    </div>
                  );
                })}

              </div>
            ) : (
              <div className="text-xs text-muted-foreground italic py-2">
                現在、進行中の選考プロセスはありません。
              </div>
            )}
          </div>

          {/* 固定営業メモ（エンジニア詳細のステータス情報枠の流用） */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
            <h2 className="text-sm font-semibold text-card-foreground mb-3">顧客ステータス・営業メモ</h2>
            <div className="hidden lg:block">
              <EditModal title="顧客ステータス・営業メモ編集" triggerText="編集">            
                <input defaultValue="継続案件あり（リレーション良好）" className="w-full p-2 border rounded" />
                <input defaultValue="特記事項" className="w-full p-2 border rounded" />
              </EditModal>
            </div>            
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <div className="text-muted-foreground mb-1">アプローチ状況</div>
                <div className="font-semibold text-emerald-400">継続案件あり（リレーション良好）</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">特記事項・直近のヒアリング</div>
                <div className="text-card-foreground leading-relaxed bg-secondary/20 p-2.5 rounded border border-border/50">
                  直近でエンジニアの増員ニーズあり。フロントエンド（主にVue.js/TypeScript環境）の経験があるメンバーが退場予定の枠に対して親和性が高いとのこと。随時マッチングエンジニアを提案。
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 右側：サイドバー情報（1カラム分） */}
        <div className="space-y-4">
          
          {/* 登録中の案件一覧カード */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-sm font-semibold text-card-foreground mb-3 flex items-center gap-2">
              <span className="text-primary font-bold"><ClipboardList className="w-4 h-4 flex-shrink-0" /></span> 稼働・募集中の案件 ({client.projects?.length || 0})
            </h2>
            {/* 案件登録ボタン */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsModalOpen(true)}
            >
              + 案件登録
            </Button>
            </div>            
            
            {client.projects && client.projects.length > 0 ? (
              <div className="space-y-3">
                {client.projects.map((p) => (
                  <Button
                    key={p.id}
                    size="sm"
                    variant="ghost"
                    onClick={() => onSelectProject(p.id)}
                    className="w-full h-auto p-3 flex flex-col items-stretch gap-2 text-left border border-border/60 bg-secondary/20 hover:bg-secondary/30"
                  >
                    {/* 上段 */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs font-semibold text-primary">
                        {p.title}
                      </div>
                
                      <InterviewStatusBadge status={p.status} />
                    </div>
                
                    {/* 期間 */}
                    <div className="text-[11px] text-muted-foreground font-mono">
                      期間: {p.period}
                    </div>
                
                    {/* スキル */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {p.requiredSkills.map((sk) => (
                        <SkillBadge key={sk} label={sk} />
                      ))}
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground italic py-4 text-center">現在、登録されている案件はありません。</div>
            )}
          </div>

        </div>

      </div>


{/* 📱 モバイル編集タブ */}
<div className="fixed bottom-0 left-0 w-full bg-card border-t border-border z-50 lg:hidden">
  <div className="grid grid-cols-3 text-[11px]">

    <Button
      size="sm"
      onClick={() => {
        setActiveTab("basic");
        setOpenModal(true);
      }}
      className="h-12 rounded-none bg-primary text-white"
    >
      基本編集
    </Button>

    <Button
      size="sm"
      onClick={() => {
        setActiveTab("status");
        setOpenModal(true);
      }}
      className="h-12 rounded-none bg-primary text-white"
    >
      業打ち編集
    </Button>

    <Button
      size="sm"
      onClick={() => {
        setActiveTab("memo");
        setOpenModal(true);
      }}
      className="h-12 rounded-none bg-primary text-white"
    >
      メモ
    </Button>

  </div>
</div>
{openModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">

    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => setOpenModal(false)}
    />

    <div className="bg-card p-4 rounded w-full max-w-md z-10 space-y-3">

      {/* タイトル */}
      <h2 className="text-sm font-semibold">
        {activeTab === "basic" && "基本情報編集"}
        {activeTab === "memo" && "メモ"}
        {activeTab === "skills" && "スキル編集"}
      </h2>

      {/* 中身 */}
      {activeTab === "basic" && (
        <>
          <input defaultValue={client.clientName} className="w-full p-2 border rounded" />
          <input defaultValue={client.type} className="w-full p-2 border rounded" />
          <input defaultValue={client.lastContact} className="w-full p-2 border rounded" />
        </>
      )}
      {activeTab === "memo" && (
        <>
        <input defaultValue="継続案件あり（リレーション良好）" className="w-full p-2 border rounded" />
        <input defaultValue="特記事項" className="w-full p-2 border rounded" />
        </>        
      )}
      {activeTab === "skills" && (
        <>
        <input
          defaultValue={(project.skills ?? []).join(", ")}
          className="w-full p-2 border rounded" />
        </>        
      )}

      {/* ボタン */}
      <div className="flex justify-end gap-2 pt-2 border-t">
        <button onClick={() => setOpenModal(false)}>キャンセル</button>
        <button className="bg-primary text-white px-3 py-1 rounded">
          保存
        </button>
      </div>

    </div>
  </div>
)}

{/* 顧客登録モーダル */}
{openModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">

    {/* 背景 */}
    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => setOpenModal(false)}
    />

    {/* 本体 */}
    <div className="bg-card p-5 rounded-lg w-full max-w-md z-10 space-y-4 shadow-xl">

      {/* タイトル */}
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-sm font-semibold">
          {activeTab === "basic" && "基本情報編集"}
          {activeTab === "status" && "業打ち編集"}
          {activeTab === "memo" && "メモ"}
        </h2>
      </div>

      {/* 内容 */}
      <div className="space-y-3 text-xs">

        {activeTab === "basic" && (
          <>
            <input defaultValue={client.clientName} className="w-full p-2 border rounded" />
            <input defaultValue={client.type} className="w-full p-2 border rounded" />
            <input defaultValue={client.lastContact} className="w-full p-2 border rounded" />
          </>
        )}

        {activeTab === "status" && (
          <FilterDropdown
            label="エンジニア追加"
            options={ENGINEERS.map(e => e.name)}
            selected={selectedEngineerNames}
            setSelected={setSelectedEngineerNames}
            name="addEngineer"
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />
        )}

        {activeTab === "memo" && (
          <>
            <input defaultValue="継続案件あり（リレーション良好）" className="w-full p-2 border rounded" />
            <input defaultValue="特記事項" className="w-full p-2 border rounded" />
          </>
        )}

      </div>

      {/* フッター */}
      <div className="flex justify-end gap-2 pt-2 border-t">
        <Button variant="secondary" onClick={() => setOpenModal(false)}>
          キャンセル
        </Button>
        <Button variant="primary">
          保存
        </Button>
      </div>

    </div>
  </div>
)}
    </div>
  );
};

export default ClientDetailPage;