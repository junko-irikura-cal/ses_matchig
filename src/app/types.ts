
// types.ts

export type Role = "sales" | "director" | "recruiting";

export type InterviewStatus =
  | "承認待ち" | "日程調整中" | "業打ち待ち"
  | "結果待ち" | "最終結果確認" | "成約" | "失注";

export type EngStatus = "復社" | "先付" | "待機" | "参画" | "業打ち中";

export type ProcStatus = "未" | "進行中" | "済";

export interface Engineer {
  id: string;
  name: string;
  status: EngStatus;
  skills: string[];
  exitDate: string;
  currentClient?: string;
  interviewCount: number;
  email?: string;
  phone?: string;
  joinDate?: string;
  yearsExp?: number;
  certifications?: string[];
  workHistory?: {
    client: string;
    period: string;
    role: string;
  }[];
}

export interface Interview {
  id: string;
  engineerName: string;
  clientName: string;
  salesName: string;
  status: InterviewStatus;
  round: number;
  scheduledDate?: string;
  language: string;
  approvalFlag: "未承認" | "承認済";
  createdDate: string;
  note?: string;
}

export interface Procedure {
  id: string;
  engineerName: string;
  clientName: string;
  contractedDate: string;
  joinProcedure: ProcStatus;
  employment: ProcStatus;
  conditionDoc: ProcStatus;
  sysApplication: ProcStatus;
  csvExported: boolean;
}

export type TabType =
  | "dashboard"
  | "engineers"
  | "clients"
  | "analytics"
  | "procedures";
