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
  Send
} from "lucide-react";

import { ENG_CFG } from "../constants/statusConfig";
import { ENGINEERS, CLIENTS_DATA, INIT_PROCEDURES } from "../constants/mockData";
import { EditModal } from "../components/EditModal";
import { EngBadge, ProcBadge, SkillBadge, InterviewStatusBadge } from "../components/badges";
import { DetailCard } from "../components/detail/DetailCard";
import { Button } from "../components/AppButton";
import { LinkButton } from "../components/LinkButton";


// ─── Engineer Detail ──────────────────────────────────────────────────────────

const EngineerDetailPage = ({ engineerId, onBack, role, interviews, onClientSelect, onProjectSelect }: { // 💡 他の詳細へ飛ぶためのPropsもここで受け取る
  engineerId: string;
  onBack: () => void;
  role: Role;
  interviews: Interview[];
  onClientSelect?: (id: string) => void;
  onProjectSelect?: (id: string) => void;
}) => {
  const engineer = ENGINEERS.find(e => e.id === engineerId || e.name === engineerId);

  if (!engineer) {
    return (
      <div className="p-4 md:p-6 pt-16 lg:pt-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="h-auto p-0 text-primary hover:underline justify-start mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          戻る
        </Button>
        <div className="text-center py-12 text-muted-foreground">エンジニアが見つかりません</div>
      </div>
    );
  }

  const engineerInterviews = interviews.filter(i => i.engineerName === engineer.name);
  const activeInterviews = engineerInterviews.filter(i => !["成約", "失注"].includes(i.status));
  const pastInterviews = engineerInterviews.filter(i => ["成約", "失注"].includes(i.status));
  const NEXT_MONTH_EXITS = ["2026-07-31", "2026-07-15", "2026-07-01"];

  const [activeTab, setActiveTab] = useState<string>("basic");
  const [openModal, setOpenModal] = useState(false);
  
  const engineerProcedures = INIT_PROCEDURES.filter(
    p => p.engineerName === engineer.name
  );

  const e = engineer;
  
const handleMockSend = () => {
  alert(`【案件案内（モック）】

エンジニア: ${engineer.name}

案件: 仮の案件タイトル
企業: 仮の会社名
期間: -

必須スキル:
React, TypeScript

推奨スキル:
AWS, Docker
`);
};

  return (
    <div className="p-4 md:p-6 space-y-5 pt-16 lg:pt-6 pb-16">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="h-auto p-0 text-primary hover:underline justify-start"
      >
        <ArrowLeft className="w-4 h-4" />
        戻る
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <DetailCard
            title={<span className="text-xl font-bold">{engineer.name}</span>}
            action={
              <div className="hidden lg:flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handleMockSend}
                >
                  <Send className="w-3 h-3" />
                  案件をメール
                </Button>
            
                <EditModal
                  title="基本情報編集" triggerText="編集">
                  <input defaultValue={engineer.name} className="w-full p-2 border rounded" />
                  <input defaultValue={engineer.email} className="w-full p-2 border rounded" />
                  <input defaultValue={engineer.phone} className="w-full p-2 border rounded" />
                </EditModal>                
              </div>
            }
          >
            {/* 👇中身はそのまま残す */}

            <div className="flex items-center gap-2 mb-2">
              <EngBadge status={engineer.status} />
              <span className="text-xs text-muted-foreground font-mono">
                ID: {engineer.id}
              </span>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {engineer.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{engineer.email}</span>
                </div>
              )}
              {engineer.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{engineer.phone}</span>
                </div>
              )}
              {engineer.joinDate && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>入社日: {engineer.joinDate}</span>
                </div>
              )}
              {engineer.yearsExp !== undefined && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <History className="w-4 h-4 text-primary" />
                  <span>経験年数: {engineer.yearsExp}年</span>
                </div>
              )}
            </div>
          </DetailCard>


          {engineerProcedures.length > 0 && (
            <DetailCard title="諸手続き状況">

              {/* 👇中身はそのまま */}
              <div className="space-y-3">
                {engineerProcedures.map(p => (
                  <div
                    key={p.id}
                    className="p-3 bg-secondary/30 rounded-lg space-y-2"
                  >
                    {/* 基本情報 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs font-semibold text-card-foreground">
                        <Building2 className="w-3 h-3 text-primary shrink-0" />
                        <LinkButton
                          onClick={() => {
                            const client = CLIENTS_DATA.find(
                              cl =>
                                cl.clientName === p.clientName ||
                                cl.clientName.includes(p.clientName) ||
                                p.clientName.includes(cl.clientName)
                            );
                          
                            console.log("found client", client);
                          
                            if (client) {
                              onClientSelect?.(client.id);
                            } else {
                              console.log("client not found", p.clientName);
                            }
                          }}
                          className="truncate text-sm"
                        >
                          {p.clientName}
                        </LinkButton>
                      </div>
                      
                      <span className="text-[10px] text-muted-foreground">
                        {p.contractedDate}
                      </span>
                    </div>
                
                    {/* 手続き */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="text-[10px]">入社手続</div>
                        <ProcBadge status={p.joinProcedure} />
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="text-[10px]">雇用契約</div>
                        <ProcBadge status={p.employment} />
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="text-[10px]">条件確認書</div>
                        <ProcBadge status={p.conditionDoc} />
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="text-[10px]">システム申請</div>
                        <ProcBadge status={p.sysApplication} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
            </DetailCard>
          )}

          {activeInterviews.length > 0 && (
            <DetailCard
              title="進行中の業打ち"
              action={
                <div className="hidden lg:flex">
                <EditModal title="進行中の業打ち編集" triggerText="編集">
                  <input defaultValue={engineer.exitDate} className="w-full p-2 border rounded" />
                  <input defaultValue={engineer.currentClient} className="w-full p-2 border rounded" />
                </EditModal>
                </div>                
              }
            >
            
              {/* ✅ 中身そのまま */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {e.candidates?.map((c, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-2.5 bg-secondary/30 rounded-lg space-y-2"
                    >
                    
                      {/* ✅ 企業名 */}
                      <div className="flex items-center gap-1 text-xs font-semibold text-card-foreground">
                        <Building2 className="w-3 h-3 text-primary shrink-0" />
                        <LinkButton
                            onClick={() => {
                              const client =
                                CLIENTS_DATA.find(
                                  (cl) =>
                                    cl.clientName === c.clientName ||
                                    cl.clientName.includes(c.clientName) ||
                                    c.clientName.includes(cl.clientName)
                                ) ?? CLIENTS_DATA[0]; // 🔥 fallback追加
                              
                              if (client) {
                                onClientSelect?.(client.id);
                              } else {
                                console.log("client not found", c.clientName);
                              }
                            }}
                            className="truncate text-sm"
                          >
                            {c.clientName}
                          </LinkButton>
                      </div>
                  
                      {/* ✅ 案件一覧 */}
                      <ul className="space-y-1 pl-4 text-muted-foreground text-[10px] list-none">
                        {c.projects.map((p, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-center justify-between gap-2"
                          >
                          
                            {/* ✅ 左：案件名リンク */}
                            <LinkButton
                              onClick={() => {
                                const client = CLIENTS_DATA.find(
                                  (cl) =>
                                    cl.clientName === c.clientName ||
                                    cl.clientName.includes(c.clientName) ||
                                    c.clientName.includes(cl.clientName)
                                );
                              
                                const proj =
                                  client?.projects?.find(
                                    (pj) =>
                                      pj.title === p ||
                                      pj.title.includes(p) ||
                                      p.includes(pj.title)
                                  ) ?? client?.projects?.[0];
                                
                                if (proj) {
                                  onProjectSelect?.(proj.id);
                                } else {
                                  console.log("project not found", p);
                                }
                              }}
                              className="font-medium text-xs flex-1 truncate"
                            >
                              {p}
                            </LinkButton>
                            
                            {/* ✅ 右：状態＋次 */}
                            <div className="flex items-center gap-2 shrink-0">
                              <InterviewStatusBadge status="調整中" />
                              <span className="text-[10px] font-mono text-muted-foreground">
                                1次
                              </span>
                            </div>
                            
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
              </div>
              
            </DetailCard>
          )}

          {pastInterviews.length > 0 && (
            <DetailCard title="過去の業打ち">
            
              {/* ✅ 中身そのまま */}
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                  {pastInterviews.map((iv, idx) => (
                    <div
                      key={iv.id}
                      className="p-2.5 bg-secondary/30 rounded-lg"
                    >
                    
                      {/* ✅ 顧客企業（同じスタイル） */}
                      <div className="flex items-center gap-1 text-xs font-semibold text-card-foreground">
                        <Building2 className="w-3 h-3 text-primary shrink-0" />
                  
                        <LinkButton
                          onClick={() => {
                            const client = CLIENTS_DATA.find(
                              (cl) =>
                                cl.clientName === iv.clientName ||
                                cl.clientName.includes(iv.clientName) ||
                                iv.clientName.includes(cl.clientName)
                            );
                          
                            if (client) {
                              onClientSelect?.(client.id);
                            }
                          }}
                          className="truncate text-sm"
                        >
                          {iv.clientName}
                        </LinkButton>
                      </div>
                        
                      {/* ✅ 案件一覧（candidateと同じ構造） */}
                      <ul className="space-y-1 pl-4 text-muted-foreground text-[10px] list-none">
                        
                        <li className="flex items-center justify-between gap-2">
                        
                          {/* ✅ 案件名（リンク） */}
                          <LinkButton
                            onClick={() => {
                              let foundProject;
                            
                              for (const cl of CLIENTS_DATA) {
                                const proj = cl.projects?.find(
                                  (p) =>
                                    p.title === iv.projectTitle ||
                                    p.title.includes(iv.projectTitle ?? "") ||
                                    (iv.projectTitle ?? "").includes(p.title)
                                );
                              
                                if (proj) {
                                  foundProject = proj;
                                  break;
                                }
                              }
                            
                              if (foundProject) {
                                onProjectSelect?.(foundProject.id);
                              }
                            }}
                            className="font-medium text-xs flex-1 truncate"
                          >
                            {
                              CLIENTS_DATA.find(
                                (cl) =>
                                  cl.clientName === iv.clientName ||
                                  cl.clientName.includes(iv.clientName) ||
                                  iv.clientName.includes(cl.clientName)
                              )?.projects?.[0]?.title ?? "案件未設定"
                            }
                          </LinkButton>
                          
                          {/* ✅ 右：状態 + 次数（candidateと同じ位置） */}
                          <div className="flex items-center gap-2 shrink-0">
                          
                            <InterviewStatusBadge status={iv.status} />
                          
                            <span className="text-[10px] font-mono text-muted-foreground">
                              {iv.round}次
                            </span>
                          
                          </div>
                          
                        </li>
                          
                      </ul>
                          
                    </div>
                  ))}

                </div>
              </div>
            </DetailCard>
          )}


          <DetailCard title="マッチング案件一覧">
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  
                {e.candidates?.map((c, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-2.5 bg-secondary/30 rounded-lg"
                  >
                  
                    {/* ✅ 顧客企業 */}
                    <div className="flex items-center gap-1 text-xs font-semibold text-card-foreground">
                      <Building2 className="w-3 h-3 text-primary flex-shrink-0" />
                      <LinkButton
                        onClick={() => {
                          const client = CLIENTS_DATA.find(
                            cl =>
                              cl.clientName === c.clientName ||
                              cl.clientName.includes(c.clientName) ||
                              c.clientName.includes(cl.clientName)
                          );
                          if (client) {
                            onClientSelect?.(client.id);
                          } else if (CLIENTS_DATA.length > 0) {
                            onClientSelect?.(CLIENTS_DATA[0].id);
                          }
                        }}
                        className="truncate text-sm"
                      >
                        {c.clientName}
                      </LinkButton>
                    </div>
                      
                    {/* ✅ 案件一覧 */}
                    <ul className="space-y-1 pl-4 text-muted-foreground text-[10px] list-none">
                      {c.projects.map((p, pIdx) => (
                        <li
                          key={pIdx}
                          className="flex items-center justify-between gap-2"
                        >
                          
                          <LinkButton
                            onClick={() => {
                              let foundProject;
                            
                              for (const cl of CLIENTS_DATA) {
                                const proj = cl.projects?.find(
                                  pj =>
                                    pj.title === p ||
                                    pj.title.includes(p) ||
                                    p.includes(pj.title)
                                );
                              
                                if (proj) {
                                  foundProject = proj;
                                  break;
                                }
                              }
                            
                              console.log("found project", foundProject);
                            
                              if (foundProject) {
                                onProjectSelect?.(foundProject.id);
                              } else {
                                console.log("project not found", p);
                              }
                            }}
                            className="font-medium text-xs"
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
          </DetailCard>


        <DetailCard title="ステータス情報">
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">

              {/* 復社予定日 */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="mb-1">復社予定日</div>
                <div
                  className={`font-mono font-semibold ${
                    NEXT_MONTH_EXITS.includes(engineer.exitDate)
                      ? "text-amber-600"
                      : "text-card-foreground"
                  }`}
                >
                  {engineer.exitDate}
                </div>
              </div>
                
              {/* 現参画先 */}
              {engineer.currentClient && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="mb-1">現参画先</div>
                  <div className="font-semibold text-card-foreground">
                    {engineer.currentClient}
                  </div>
                </div>
              )}

              {/* 業打ち件数 */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="mb-1">業打ち件数</div>
                <div className="font-mono font-semibold text-card-foreground">
                  {engineer.interviewCount}件
                </div>
              </div>
            
              {/* NG企業 */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="mb-1">NG企業</div>
                <div className="font-mono font-semibold text-card-foreground">
                  {engineer.ngClients && engineer.ngClients.length > 0 ? (
                    engineer.ngClients.map((c, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 text-[11px] mr-1"
                      >
                        {c}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted-foreground">なし</span>
                  )}
                </div>
              </div>
                
            </div>
          </div>                
        </DetailCard>
        </div>

        <div className="space-y-4">
          <DetailCard
            title="スキルセット"
            action={
              <div className="hidden lg:flex">
              <EditModal title="スキル編集" triggerText="編集">
                <input
                  defaultValue={engineer.skills.join(", ")}
                  className="w-full p-2 border rounded"
                />
              </EditModal>
              </div>              
            }
          >
          
            {/* ✅ タイトル横のアイコンは中に出す */}
            <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-card-foreground">
              <Code className="w-4 h-4 text-primary" />
              <span>スキル</span>
            </div>
          
            {/* ✅ 中身そのまま */}
            <div className="flex flex-wrap gap-2">
              {engineer.skills.map(skill => (
                <SkillBadge key={skill} label={skill} />
                ))}
            </div>            
          </DetailCard>

          {engineer.certifications && engineer.certifications.length > 0 && (
            <DetailCard
              title="保有資格"
              action={
                <div className="hidden lg:flex">
                <EditModal title="保有資格編集" triggerText="編集">
                  <input
                    defaultValue={engineer.certifications.join(", ")}
                    className="w-full p-2 border rounded"
                  />
                </EditModal>
                </div>                
              }
            >
            
              {/* ✅ アイコン付きタイトルは中で表現 */}
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-card-foreground">
                <Award className="w-4 h-4 text-primary" />
                <span>保有資格</span>
              </div>
            
              {/* ✅ 中身そのまま */}
              <div className="space-y-2">
                {engineer.certifications.map(cert => (
                  <div key={cert} className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-card-foreground">{cert}</span>
                  </div>
                ))}
              </div>              
            </DetailCard>
          )}

          {engineer.workHistory && engineer.workHistory.length > 0 && (
            <DetailCard title="稼働履歴">
            
              {/* ✅ アイコン付きタイトル（中に出す） */}
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-card-foreground">
                <Briefcase className="w-4 h-4 text-primary" />
                <span>稼働履歴</span>
              </div>
          
              {/* ✅ 中身そのまま */}
              <div className="space-y-3">
                {engineer.workHistory.map((wh, idx) => (
                  <div
                    key={idx}
                    className="border-l-2 border-primary/30 pl-3 py-1"
                  >
                    <LinkButton
                      onClick={() => {
                        const client = CLIENTS_DATA.find(
                          cl =>
                            cl.clientName === wh.client ||
                            cl.clientName.includes(wh.client) ||
                            wh.client.includes(cl.clientName)
                        );
                      
                        if (client) {
                          onClientSelect?.(client.id);
                        } else {
                          console.log("client not found", wh.client);
                        }
                      }}
                      className="text-sm font-semibold"
                    >
                      {wh.client}
                    </LinkButton>
                    <div className="text-[11px] text-muted-foreground font-mono">
                      {wh.period}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {wh.role}
                    </div>
                  </div>
                ))}
              </div>
              
            </DetailCard>
          )}
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
          <input defaultValue={engineer.name} className="w-full p-2 border rounded"/>
          <input defaultValue={engineer.email} className="w-full p-2 border rounded"/>
          <input defaultValue={engineer.phone} className="w-full p-2 border rounded"/>

        </>
      )}

      {activeTab === "memo" && (
        <>
          <input
            defaultValue="継続案件あり（リレーション良好）"
            className="w-full p-2 border rounded"
          />
          <input
            defaultValue="特記事項"
            className="w-full p-2 border rounded"
          />
        </>
      )}

      {activeTab === "skills" && (
        <input
        defaultValue={(engineer.skills ?? []).join(", ")}
        className="w-full p-2 border rounded"
        />
      )}

      {/* ボタン */}
      <div className="flex justify-end gap-2 pt-2 border-t">
        <button onClick={() => setOpenModal(false)}>
          キャンセル
        </button>
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

export default EngineerDetailPage;