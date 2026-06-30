export type Role = "sales" | "director" | "recruiting";
export type InterviewStatus = "選考中" | "日程調整中" | "結果待ち" | "OK" | "NG";
export type ProcStatus = "未" | "進行中" | "済";

export interface Interview {
  id: string;
  engineerName: string;
  clientName: string;
  projectName: string;
  dateTime: string;
  salesName: string;
  status: InterviewStatus;
  approvalFlag: "承認済" | "未承認";
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