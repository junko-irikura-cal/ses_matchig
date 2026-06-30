import React, { useState } from "react";

import type { ReactNode } from "react";
import {
  LayoutDashboard, Users, Building2, Calendar, BarChart3,
  Plus, Download, CheckCircle, Clock, AlertCircle,
  ChevronDown, Search, TrendingUp, Check, X,
  Briefcase, Filter, RefreshCw, ClipboardList, Activity,
  Award, UserCheck, Menu, ArrowLeft, Mail, Phone,
  Award as CertIcon, History, Code, User, Wrench,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie,
  Cell, Legend, AreaChart, Area,
} from "recharts";

import { INIT_PROCEDURES, INIT_INTERVIEWS } from "./constants/mockData";
import { MobileMenuButton } from "./components/badges";

import DashboardPage from "./features/DashboardPage";
import InterviewPage from "./features/InterviewPage";
import EngineerPage from "./features/EngineerPage";
import EngineerDetailPage from "./features/EngineerDetailPage";
import ClientManagement from "./features/ClientManagement";
import ClientDetailPage from "./features/ClientDetailPage";
import ProjectDetailPage from "./features/ProjectDetailPage";
import AnalyticsPage from "./features/AnalyticsPage";
import ProcedurePage from "./features/ProcedurePage";

import Sidebar from "./components/Sidebar";

import type { Role, Interview, Procedure } from "./types";



export default function App() {

  // ✅ state
  const [role, setRole] = useState<Role>("sales");
  const getDefaultPage = (role: Role) => {
    if (role === "director") return "dashboard";
    if (role === "sales") return "engineers";
    if (role === "recruiting") return "engineers";
    return "engineers";
  };
  const [page, setPage] = useState(getDefaultPage(role));

  const [interviews, setInterviews] = useState(INIT_INTERVIEWS);
  const [procedures, setProcedures] = useState<Procedure[]>(INIT_PROCEDURES);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedEngineerId, setSelectedEngineerId] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const onEngineerSelect = (id: string) => {
    setSelectedClientId(null);   // 他の選択リセット
    setSelectedProjectId(null);
    setSelectedEngineerId(id);  // エンジニア選択
    setPage("engineerDetail");  // 画面切り替え
  };

  // ✅ ロジック
  const pendingCount = interviews.filter(i => i.approvalFlag === "未承認").length;

  const handleApprove = (id: string) => {
    setInterviews(prev =>
      prev.map(i =>
        i.id === id
          ? { ...i, approvalFlag: "承認済", status: "日程調整中" }
          : i
      )
    );
  };

  const handleStatusUpdate = (id: string, status: any) => {
    setInterviews(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const handleProcUpdate = (id: string, field: keyof Procedure, val: any) => {
    setProcedures(prev =>
      prev.map(p => p.id === id ? { ...p, [field]: val } : p)
    );
  };
  
  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
  
    setSelectedEngineerId(null);
    setSelectedClientId(null);
    setSelectedProjectId(null);
    setPage(getDefaultPage(newRole));
  };

  
  return (
    <div className="flex h-screen overflow-hidden bg-background">

      <MobileMenuButton onClick={() => setSidebarOpen(true)} />

      <Sidebar
        role={role}
        setRole={handleRoleChange}
        page={page}
        setPage={setPage}
        pendingCount={pendingCount}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onResetEngineerSelection={() => {
          setSelectedEngineerId(null);
          setSelectedClientId(null);
          setSelectedProjectId(null);
        }}
        onResetClientSelection={() => setSelectedClientId(null)}
      />

      
<main className="flex-1 overflow-y-auto">

  {selectedProjectId ? (
    <ProjectDetailPage
      projectId={selectedProjectId}
      onBack={() => setSelectedProjectId(null)}
      role={role}
      interviews={interviews}
      onEngineerSelect={onEngineerSelect} // ✅ 統一
    />
  ) : selectedClientId ? (
    <ClientDetailPage
      clientId={selectedClientId}
      onBack={() => setSelectedClientId(null)}
      role={role}
      interviews={interviews}
      onClientSelect={(id) => setSelectedClientId(id)}
      onSelectProject={(id) => setSelectedProjectId(id)}
      onEngineerSelect={onEngineerSelect} // ✅ 統一
    />
  ) : selectedEngineerId ? (
    <EngineerDetailPage
      engineerId={selectedEngineerId}
      onBack={() => setSelectedEngineerId(null)}
      role={role}
      interviews={interviews}
      onClientSelect={(id) => {
        setSelectedClientId(id);
        setPage("clientDetail");
      }}
      onProjectSelect={(id) => {
        setSelectedProjectId(id);
        setPage("projectDetail");
      }}
    />
  ) : (
    <>
      {page === "dashboard" && role === "director" && (
        <DashboardPage
          role={role}
          interviews={interviews}
          onApprove={handleApprove}
          onEngineerSelect={onEngineerSelect} // ✅ 統一
          onClientSelect={(id) => setSelectedClientId(id)}
          onProjectSelect={(id) => setSelectedProjectId(id)}
        />
      )}

      {page === "interviews" && (
        <InterviewPage
          role={role}
          interviews={interviews}
          onApprove={handleApprove}
          onStatusUpdate={handleStatusUpdate}
          onEngineerSelect={onEngineerSelect} // ✅ 統一
          onClientSelect={(id) => setSelectedClientId(id)}
          onProjectSelect={(id) => setSelectedProjectId(id)}
        />
      )}

      {/* ✅ ここ超重要：selectedEngineerIdの分岐は削除済み */}
      <>
        {page === "engineers" && (
          <EngineerPage
            role={role}
            onEngineerSelect={onEngineerSelect} // ✅ これが最大の修正ポイント
            onClientSelect={(id) => setSelectedClientId(id)}
            onProjectSelect={(id) => setSelectedProjectId(id)}
          />
        )}

        {page === "clients" && (
          <ClientManagement
            role={role}
            interviews={interviews}
            onClientSelect={(id) => setSelectedClientId(id)}
            onSelectProject={(id) => setSelectedProjectId(id)}
            onEngineerSelect={onEngineerSelect} // ✅ 統一
          />
        )}
      </>

      {page === "analytics" && (
        <AnalyticsPage
          role={role}
          interviews={interviews}
          onEngineerSelect={onEngineerSelect} // ✅ 統一
        />
      )}

      
      {page === "procedures" && (
        <ProcedurePage
          role={role}
          procedures={procedures}
          onUpdate={handleProcUpdate}
          onEngineerSelect={onEngineerSelect}
          onClientSelect={(id) => {
            setSelectedClientId(id);
            setSelectedProjectId(null);
            setPage("clientDetail");
          }}
        />
      )}

    </>
  )}

</main>

    </div>
  );
}
