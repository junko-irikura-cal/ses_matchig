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
  ReferenceError,
  Wrench,
  Activity,
  Handshake,
  MapPin,
  Send
} from "lucide-react";


import { ENG_CFG } from "../constants/statusConfig";
import { ENGINEERS, CLIENTS_DATA } from "../constants/mockData";
import { EditModal } from "../components/EditModal";
import { Button } from "../components/AppButton";
import { LinkButton } from "../components/LinkButton";
import { EngBadge, SkillBadge, InterviewStatusBadge } from "../components/badges";


// ─── Project Detail ──────────────────────────────────────────────────────────

const ProjectDetailPage = ({
  projectId,
  onBack,
  role,
  interviews,
  onEngineerSelect,
}: {
  projectId: string;
  onBack: () => void;
  role: Role;
  interviews: Interview[];
  onEngineerSelect: (engineerId: string) => void;
}) => {
  // CLIENTS_DATA の中から、対象のプロジェクト（案件）とその所属企業を探索
  let project: any = null;
  let client: any = null;

  for (const c of CLIENTS_DATA) {
    const p = c.projects?.find(proj => proj.id === projectId);
    if (p) {
      project = p;
      client = c;
      break;
    }
  }

  if (!project || !client) {
    return (
      <div className="p-4 md:p-6 pt-16 lg:pt-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="h-auto p-0 text-primary hover:underline justify-start mb-4"
        >
          <span>← 戻る</span>
        </Button>

        <div className="text-center py-12 text-muted-foreground">案件データが見つかりません</div>
      </div>
    );
  }

  // この案件に関連する選考・業打ち（業打ち）データを抽出
  // ※実際の運用に合わせて、案件名(title)や企業名でマッチングさせています
  const projectInterviews = interviews.filter(i => i.clientName === client.clientName);

    const [selectedEngineerNames, setSelectedEngineerNames] = useState<string[]>([]);
    const [openFilter, setOpenFilter] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>("basic");
    const [openModal, setOpenModal] = useState(false);

    const [selectedEngineers, setSelectedEngineers] = useState<string[]>([]);
  

  return (
    <div className="p-4 md:p-6 space-y-5 pt-16 lg:pt-6">
      {/* 戻るボタン */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="h-auto p-0 text-primary hover:underline justify-start"
      >
        ← 戻る
      </Button>

      {/* メインレイアウト（2:1 グリッド） */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* 左側：メインコンテンツ（2カラム分） */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* 案件概要ヘッダー */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border mb-2 inline-block">
                  {client.clientName} 御中 案件
                </span>
                <h1 className="text-lg font-bold text-card-foreground mb-1.5">{project.title}</h1>
                  <div className="flex items-center flex-wrap gap-2 text-xs">
                    <InterviewStatusBadge status={project.status} />

                    <span className="text-muted-foreground font-mono">
                      案件ID: {project.id}
                    </span>

                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      首都圏
                    </span>
                  </div>
              </div>
              
              <div className="hidden lg:block">
                <EditModal title="案件基本情報編集" triggerText="編集">
                <input defaultValue={client.clientName} className="w-full p-2 border rounded" />
                <input defaultValue={project.title} className="w-full p-2 border rounded" />
                <input defaultValue={project.period} className="w-full p-2 border rounded" />
                <input defaultValue={client.lastContact} className="w-full p-2 border rounded" />
              </EditModal>
              </div>
              
            </div>

            {/* 基本条件テーブル */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-t border-border/40 py-3.5 text-muted-foreground">
              <div>想定稼働期間: <span className="text-card-foreground font-mono font-semibold">{project.period}</span></div>
              <div>最終接触日（企業）: <span className="text-card-foreground font-mono">{client.lastContact}</span></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-t border-border/40 pt-3.5 text-muted-foreground">
              <div>担当者: <span className="text-card-foreground font-mono font-semibold">森田	一輝（システム開発部）</span></div>
              <div>morita@client.com</div>
            </div>
          </div>

          {/* ─── マッチングエンジニア一覧エリア ─── */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-sm font-semibold text-card-foreground mb-3">
                マッチングエンジニア一覧
              </h2>
                <Button
                  size="sm"
                  variant="primary"
                  disabled={selectedEngineers.length === 0}
                  onClick={() => {
                    if (selectedEngineers.length === 0) return;
                  
                    alert(`送信対象:
                    
                ${selectedEngineers.join("\n")}
                    
                案件: ${project.title}`);
                  }}
                >
                  <Send className="w-3 h-3 mr-1" />
                  案件送信
                </Button>
            </div>
                    
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    
                {(() => {
                  const engineersList =
                    typeof ENGINEERS !== "undefined" ? ENGINEERS : [];
                
                  const matchedEngineers = engineersList.filter(eng =>
                    eng.candidates?.some(c =>
                      
                      c.clientName === client.clientName ||
                      c.clientName.toLowerCase().includes(client.clientName.toLowerCase()) ||
                      client.clientName.toLowerCase().includes(c.clientName.toLowerCase())
                    )
                  );
                
                  if (matchedEngineers.length === 0) {
                    return (
                      <div className="col-span-full text-center py-8 text-muted-foreground text-[11px]">
                        現在、マッチするエンジニア候補はいません。
                      </div>
                    );
                  }
                
                  return matchedEngineers.map((eng, engIdx) => {
                    const candidateData = eng.candidates?.find(c =>
                      c.clientName === client.clientName ||
                      c.clientName.toLowerCase().includes(client.clientName.toLowerCase())
                    );
                  
                    const displaySkills =
                      candidateData?.skills || eng.skills || [];
                    return (
                      <div
                        key={eng.id}
                        className="p-2.5 rounded-lg border border-border/60 space-y-2"
                      >
                      <div className="flex items-center justify-between gap-2">

                        {/* ✅ 左側：チェック + 名前 */}
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedEngineers.includes(eng.id || eng.name)}
                            onChange={(e) => {
                              const id = eng.id || eng.name;
                            
                              if (e.target.checked) {
                                setSelectedEngineers(prev => [...prev, id]);
                              } else {
                                setSelectedEngineers(prev => prev.filter(v => v !== id));
                              }
                            }}
                          />
                          
                          <LinkButton
                            onClick={() => {
                              const engineer = ENGINEERS.find(
                                (e) =>
                                  e.id === eng.id ||
                                  e.name === eng.name ||
                                  e.name.includes(eng.name) ||
                                  eng.name.includes(e.name)
                              );
                            
                              console.log("クリック:", eng.name, "→", engineer);
                            
                              if (engineer) {
                                onEngineerSelect(engineer.id);
                              } else {
                                console.log("engineer not found", eng);
                              }
                            }}
                            className="h-auto p-0 text-primary hover:underline flex items-center gap-1"
                          >
                            <User className="w-4 h-4 shrink-0" />
                            <span className="truncate text-sm font-bold">
                              {eng.name}
                            </span>
                          </LinkButton>
                        </div>
                          
                        {/* ✅ 右側：ステータス＋ボタン */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          
                          <EngBadge status={eng.status} />
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() =>
                              alert(`${eng.name} を ${client.clientName} にエントリー（モック）`)
                            }
                          >
                            エントリー
                          </Button>
                        </div>
                      </div>
                            
                        {/* ✅ スキル */}
                        <div className="flex flex-wrap gap-1">
                          {(displaySkills ?? []).map((sk, skIdx) => (
                              <SkillBadge key={skIdx} label={sk} />
                          ))}
                        </div>
                        
                      </div>
                    );
                  });
                })()}
          
              </div>
            </div>
            
          </div>

          {/* 提案・選考中のエンジニアステータス（業打ち候補） */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h2 className="text-sm font-semibold text-card-foreground mb-3">この案件の提案・選考状況</h2>
            
            {project.candidates && project.candidates.length > 0 ? (
              <div className="divide-y divide-border/60">
                {project.candidates.map((cand: any, idx: number) => {
                  // 必要に応じてエンジニアIDへの変換ロジックをここに挟めます
                  const engineer = ENGINEERS.find(
                    e => e.name === cand.engineerName
                  );

                  return (
                    <div key={idx} className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-2">                        
                        <div className="text-xs font-semibold text-card-foreground flex gap-2">                         
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if (!engineer) return;
                            
                              onEngineerSelect(engineer.id);
                            }}
                            className="h-auto p-0 text-primary hover:underline justify-start"
                          >
                            <User className="w-4 h-4 shrink-0" />
                            <span className="text-sm font-semibold truncate">
                              {cand.engineerName}
                            </span>
                          </Button>

                        </div>
                        <div className="flex flex-wrap gap-1">
                          {cand.skills.map((sk: string) => (
                            <SkillBadge key={sk} label={sk} />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <EngBadge status={cand.status} />                        
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground italic py-2">現在、提案中のエンジニア候補はいません。</div>
            )}
          </div>

          {/* 案件の詳細要件メモ */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-sm font-semibold text-card-foreground mb-2">業務内容・詳細要件</h2>
              <div className="hidden lg:block">
                <EditModal title="業務内容・詳細要件メモ編集" triggerText="編集">            
                <input defaultValue="特記事項" className="w-full p-2 border rounded" />
              </EditModal>
              </div>              
            </div>
          
            <div className="text-xs text-card-foreground leading-relaxed bg-secondary/20 p-3 rounded-lg border border-border/50 space-y-2">
              <p>【業務内容】現行の基幹システムのフロントエンド刷新、および新規追加機能の実装設計、コンポーネント開発を担当いただきます。</p>
              <p>【求める人物像】セルフスターターであり、UIUXデザインの意図を汲み取ってコンポーネント設計に落とし込めるスキルを重視します。リモート主体の環境のため、自律的なテキストコミュニケーションが取れる方。</p>
            </div>
          </div>

        </div>

        {/* 右側：サイドバー情報（1カラム分） */}
        <div className="space-y-4">
          
          {/* スキル・環境 */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                <Wrench className="w-4 h-4 flex-shrink-0 text-primary" />
                スキル・環境
              </h2>
              <div className="hidden lg:block">
                <EditModal title="スキル・環境編集">
                <input
                  defaultValue={[
                    ...(project.requiredSkills || []),
                    ...(project.optionalSkills || [])
                  ].join(", ")}
                  className="w-full p-2 border rounded"
                />
              </EditModal>
              </div>              
            </div>
                
            {/* 必須 */}
            <div className="mb-3">
              <p className="text-[11px] text-muted-foreground mb-1">必須</p>
              <div className="flex flex-wrap gap-1.5">
                {project.requiredSkills?.map((sk: string) => (
                  <SkillBadge key={sk} label={sk} />
                ))}
              </div>
            </div>
              
            {/* 推奨 */}
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">推奨</p>
              <div className="flex flex-wrap gap-1.5">
                {project.optionalSkills?.map((sk: string) => (
                  <SkillBadge key={sk} label={sk} />
                ))}
              </div>
            </div>
          </div>

          {/* 清算条件などの営業用メモ */}
          <div className="bg-card border border-border rounded-lg p-5 text-xs space-y-3">
            <h2 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
              <Activity className="w-4 h-4 flex-shrink-0 text-primary font-bold" /> 案件ステータスメモ
            </h2>
            <div className="border-b border-border/40 pb-2">
              <div className="text-muted-foreground mb-0.5">精算基準時間</div>
              <div className="font-semibold font-mono">140h - 180h（中間割）</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-0.5">業打ち回数</div>
              <div className="font-semibold">WEB業打ち 1回（顧客PM同席）</div>
            </div>
          </div>

        </div>

      </div>

{/* 📱 モバイル編集タブ */}
<div className="fixed bottom-0 left-0 w-full bg-blue-100 z-50 lg:hidden">

  <div className="grid grid-cols-3 text-[11px] divide-x divide-white">

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
        setActiveTab("memo");
        setOpenModal(true);
      }}
      className="h-12 rounded-none bg-primary text-white"
    >
      メモ
    </Button>

    <Button
      size="sm"
      onClick={() => {
        setActiveTab("skills");
        setOpenModal(true);
      }}
      className="h-12 rounded-none bg-primary text-white"
    >
      スキル編集
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
      
    </div>
  );
};

export default ProjectDetailPage;