export const ENGINEERS: Engineer[] = [
  {
    id: "e01",
    name: "田中 太郎",
    status: "待機",
    skills: ["Java", "Spring Boot", "AWS"],
    exitDate: "2026-07-31",
    interviewCount: 3,
    email: "tanaka@example.com",
    phone: "090-1234-5678",
    joinDate: "2020-04-01",
    yearsExp: 8,
    certifications: ["AWS SAA", "Java Gold"],
    workHistory: [
      { client: "NTTデータ", period: "2022-01〜2026-03", role: "バックエンド開発" },
      { client: "日立製作所", period: "2020-04〜2021-12", role: "システム設計" }
    ],
    
    candidates: [
      {
        clientName: "富士通株式会社",
        projects: ["官公庁向け次世代システム開発", "社内ツールWeb化リプレイス"]
      },
      {
        clientName: "株式会社NTTデータ",
        projects: ["金融系決済基盤の構築案件"]
      }
    ],
    scheduled: [
      {
        clientName: "富士通株式会社",
        projects: [
          { title: "官公庁向け次世代システム開発", status: "業打ち待ち" }
        ]
      },
      {
        clientName: "株式会社NTTデータ",
        projects: [
          { title: "金融系決済基盤の構築案件", status: "承認待ち" }
        ]
      }
    ]
  },
  {
    id: "e02",
    name: "佐藤 花子",
    status: "復社",
    skills: ["C#", ".NET", "Azure"],
    exitDate: "2026-07-15",
    currentClient: "富士通",
    interviewCount: 5,
    email: "sato@example.com",
    phone: "090-2345-6789",
    joinDate: "2019-04-01",
    yearsExp: 10,
    certifications: ["Azure Administrator", ".NET Specialist"],
    workHistory: [
      { client: "富士通", period: "2023-08〜現在", role: ".NET開発" },
      { client: "NEC", period: "2021-04〜2023-07", role: "インフラ構築" }
    ],
    
    candidates: [
      {
        clientName: "日本IBM株式会社",
        projects: ["大規模インフラ移行に伴う開発支援支援案件"]
      }
    ],    
    scheduled: [
      {
        clientName: "日本IBM株式会社",
        projects: [
          { title: "大規模インフラ移行に伴う開発支援", status: "承認待ち" }
        ]
      }
    ],
    ngClients: ["富士通株式会社", "トヨタ自動車株式会社"]
  },
  {
    id: "e03",
    name: "山田 一郎",
    status: "参画",
    skills: ["Python", "Django", "ML"],
    exitDate: "2026-08-31",
    currentClient: "NTTデータ",
    interviewCount: 2,
    email: "yamada@example.com",
    phone: "090-3456-7890",
    joinDate: "2021-04-01",
    yearsExp: 6,
    certifications: ["Python 3 Engineer", "G検定"],
    workHistory: [
      { client: "NTTデータ", period: "2026-04〜2026-08", role: "AI/ML開発" },
      { client: "ソフトバンク", period: "2022-01〜2026-03", role: "データ分析" }
    ],    
    candidates: [
      {
        clientName: "トヨタ自動車株式会社",
        projects: ["自動運転データ解析プラットフォーム開発", "社内AIチャットボット機能拡張"]
      }
    ],    
    scheduled: [
      {
        clientName: "トヨタ自動車株式会社",
        projects: [
          { title: "自動運転データ解析プラットフォーム開発", status: "承認待ち" }
        ]
      }
    ]

  },
  { id: "e04", name: "ジャン ウェイ", status: "先付", skills: ["Java", "AWS", "Docker"], exitDate: "2026-07-31", interviewCount: 4, email: "wei@example.com", phone: "090-4567-8901", joinDate: "2022-04-01", yearsExp: 5, certifications: ["AWS SAP"], workHistory: [{ client: "楽天", period: "2023-04〜2026-07", role: "クラウドエンジニア" }], candidates: [] },
  { id: "e05", name: "小林 健太", status: "業打ち中", skills: ["Java", "Spring"], exitDate: "2026-07-01", interviewCount: 1, email: "kobayashi@example.com", phone: "090-5678-9012", joinDate: "2026-04-01", yearsExp: 0, certifications: ["基本情報技術者"], workHistory: [], candidates: [] },
  { id: "e06", name: "加藤 由美", status: "待機", skills: ["React", "TypeScript", "Node.js"], exitDate: "2026-06-30", interviewCount: 6, email: "kato@example.com", phone: "090-6789-0123", joinDate: "2020-10-01", yearsExp: 7, certifications: [], workHistory: [{ client: "サイバーエージェント", period: "2022-07〜2026-06", role: "フロントエンド開発" }, { client: "DeNA", period: "2020-10〜2022-06", role: "Webアプリ開発" }], candidates: [] },
  { id: "e07", name: "渡辺 浩二", status: "先付", skills: ["PHP", "Laravel", "MySQL"], exitDate: "2026-08-31", currentClient: "野村総研", interviewCount: 2, email: "watanabe@example.com", phone: "090-7890-1234", joinDate: "2018-04-01", yearsExp: 12, certifications: ["PHP技術者認定上級"], workHistory: [{ client: "野村総研", period: "2023-09〜2026-08", role: "Webシステム開発" }], candidates: [] },
  { id: "e08", name: "木村 愛", status: "待機", skills: ["Python", "TensorFlow", "GCP"], exitDate: "2026-07-31", interviewCount: 4, email: "kimura@example.com", phone: "090-8901-2345", joinDate: "2021-07-01", yearsExp: 5, certifications: ["GCP Professional", "E資格"], workHistory: [{ client: "LINE", period: "2022-04〜2026-07", role: "機械学習エンジニア" }], candidates: [] },
  { id: "e09", name: "渡辺 治", status: "参画", skills: ["COBOL", "Java", "Oracle"], exitDate: "2026-07-01", currentClient: "三菱UFJ", interviewCount: 1, email: "ito@example.com", phone: "090-9012-3456", joinDate: "2015-04-01", yearsExp: 15, certifications: ["Oracle Master Gold"], workHistory: [{ client: "三菱UFJ", period: "2023-04〜現在", role: "基幹システム保守" }], candidates: [] },
  { id: "e10", name: "キム ソア", status: "復社", skills: ["Vue.js", "Go", "PostgreSQL"], exitDate: "2026-07-31", interviewCount: 3, email: "kim@example.com", phone: "090-0123-4567", joinDate: "2022-07-01", yearsExp: 4, certifications: [], workHistory: [{ client: "メルカリ", period: "2023-01〜2026-07", role: "フルスタック開発" }], candidates: [] }
];

export const INIT_INTERVIEWS: Interview[] = [
  { id: "i01", engineerName: "田中 太郎", clientName: "富士通株式会社", salesName: "田中 浩二", status: "結果待ち", round: 1, scheduledDate: "2026-06-07", language: "Java", approvalFlag: "承認済", createdDate: "2026-06-03", note: "結果待ち" },
  { id: "i02", engineerName: "佐藤 花子", clientName: "株式会社NTTデータ", salesName: "田中 浩二", status: "日程調整中", round: 1, language: "C#", approvalFlag: "承認済", createdDate: "2026-06-04" },
  { id: "i03", engineerName: "ジャン ウェイ", clientName: "東京都庁", salesName: "鈴木 花子", status: "最終結果確認", round: 2, scheduledDate: "2026-06-01", language: "Java", approvalFlag: "承認済", createdDate: "2026-05-20", note: "2次業打ち完了。先方好感触" },
  { id: "i04", engineerName: "加藤 由美", clientName: "野村総合研究所", salesName: "佐藤 一郎", status: "成約", round: 1, scheduledDate: "2026-06-02", language: "React", approvalFlag: "承認済", createdDate: "2026-05-28" },
  { id: "i05", engineerName: "木村 愛", clientName: "日本IBM株式会社", salesName: "田中 浩二", status: "業打ち待ち", round: 1, language: "Python", approvalFlag: "未承認", createdDate: "2026-06-05" },
  { id: "i06", engineerName: "山田 一郎", clientName: "トヨタ自動車株式会社", salesName: "鈴木 花子", status: "成約", round: 2, scheduledDate: "2026-05-25", language: "Python", approvalFlag: "承認済", createdDate: "2026-05-10", note: "入場日: 7/1" },
  { id: "i07", engineerName: "キム ソア", clientName: "株式会社日立製作所", salesName: "佐藤 一郎", status: "失注", round: 1, scheduledDate: "2026-05-28", language: "Go", approvalFlag: "承認済", createdDate: "2026-05-15", note: "スキル不一致" },
  { id: "i08", engineerName: "小林 健太", clientName: "富士通株式会社", salesName: "田中 浩二", status: "日程調整中", round: 1, language: "Java", approvalFlag: "承認済", createdDate: "2026-06-04" },
  { id: "i09", engineerName: "渡辺 治", clientName: "SOMPOホールディングス", salesName: "鈴木 花子", status: "業打ち待ち", round: 1, scheduledDate: "2026-06-08", language: "COBOL", approvalFlag: "承認済", createdDate: "2026-06-02" },
  { id: "i10", engineerName: "渡辺 浩二", clientName: "大阪市役所", salesName: "鈴木 花子", status: "失注", round: 1, language: "PHP", approvalFlag: "未承認", createdDate: "2026-06-05" },
];

export const INIT_PROCEDURES: Procedure[] = [
  { id: "p01", engineerName: "山田 一郎", clientName: "トヨタ自動車株式会社", contractedDate: "2026-05-28", joinProcedure: "済", employment: "済", conditionDoc: "進行中", sysApplication: "未", csvExported: false },
  { id: "p02", engineerName: "加藤 由美", clientName: "野村総合研究所", contractedDate: "2026-05-15", joinProcedure: "済", employment: "済", conditionDoc: "済", sysApplication: "済", csvExported: true },
];


export interface ProjectCandidate {
  engineerName: string;
  skills: string[];
  status: string;
}

export interface Project {
  id: string;
  title: string;       // 案件名
  requiredSkills: string[];     // 必須スキル
  optionalSkills: string[]; 
  period: string;       // 期間
  status: string;       // 案件ステータス
  candidates: ProjectCandidate[]; // その案件の業打ち候補エンジニア
}

export interface ClientGroup {
  id: string;
  clientName: string;   // 顧客企業名
  type: string;         // 民間 / 自治体
  lastContact: string;  // 最終コンタクト日
  projects: Project[];  // 💡 ここに複数の案件がぶら下がります！
}

export const CLIENTS_DATA: ClientGroup[] = [
  {
    id: "c01",
    clientName: "富士通株式会社",
    type: "民間",
    lastContact: "2026-06-03",
    projects: [
      {
        id: "p01-1",
        title: "官公庁向け次世代システム開発",
        requiredSkills: ["Java", "Spring Boot"],
        optionalSkills: ["AWS"],
        period: "2026-08〜長期",
        status: "業打ち待ち",
        candidates: [
          { engineerName: "田中 太郎", skills: ["Java", "Spring Boot", "AWS"], status: "待機" },
          { engineerName: "ジャン ウェイ", skills: ["Java", "AWS", "Docker"], status: "参画" }
        ]
      },
      {
        id: "p01-2",
        title: "社内ツールWeb化リプレイス案件",
        requiredSkills: ["React", "TypeScript"],
        optionalSkills: ["Node.js"],
        period: "2026-09〜2027-03",
        status: "日程調整中",
        candidates: [
          { engineerName: "加藤 由美", skills: ["React", "TypeScript", "Node.js"], status: "待機" }
        ]
      }
    ]
  },
  {
    id: "c02",
    clientName: "株式会社NTTデータ",
    type: "民間",
    lastContact: "2026-06-04",
    projects: [
      {
        id: "p02-1",
        title: "金融系決済基盤の構築案件",
        requiredSkills: ["Java", "AWS"],
        optionalSkills: ["Node.js"],
        period: "2026-09〜",
        status: "承認待ち",
        candidates: [
          { engineerName: "田中 太郎", skills: ["Java", "Spring Boot", "AWS"], status: "待機" }
        ]
      }
    ]
  },
  {
    id: "c03",
    clientName: "東京都庁",
    type: "自治体",
    lastContact: "2026-06-01",
    projects: [
      {
        id: "p03-1",
        title: "大都市統計データ分析基盤の開発",
        requiredSkills: ["Python", "Django", "GCP"],
        optionalSkills: [],
        period: "2026-07〜2026-12",
        status: "結果待ち",
        candidates: [
          { engineerName: "木村 愛", skills: ["Python", "TensorFlow", "GCP"], status: "待機" }
        ]
      }
    ]
  },
  {
    id: "c04",
    clientName: "トヨタ自動車株式会社",
    type: "民間",
    lastContact: "2026-05-28",
    projects: [
      {
        id: "p04-1",
        title: "自動運転データ解析プラットフォーム開発",
        requiredSkills: ["Python", "Django", "GCP"],
        optionalSkills: ["ML"],
        period: "2026-10〜",
        status: "承認待ち",
        candidates: []
      }
    ]
  },
  {
    id: "c05",
    clientName: "株式会社野村総合研究所",
    type: "民間",
    lastContact: "2026-05-30",
    projects: [
      {
        id: "p05-1",
        title: "証券フロント共同利用システム開発",
        requiredSkills: ["Java", "Oracle"],
        optionalSkills: [],
        period: "2026-08〜",
        status: "結果待ち",
        candidates: [
          { engineerName: "渡辺 治", skills: ["COBOL", "Java", "Oracle"], status: "復社" }
        ]
      }
    ]
  },
  {
    id: "c06",
    clientName: "大阪市役所",
    type: "自治体",
    lastContact: "2026-06-05",
    projects: []
  },
  {
    id: "c07",
    clientName: "日本IBM株式会社",
    type: "民間",
    lastContact: "2026-06-02",
    projects: [
      {
        id: "p07-1",
        title: "大規模インフラ移行に伴う開発支援",
        requiredSkills: ["C#", "Azure"],
        optionalSkills: [],
        period: "2026-08〜",
        status: "承認待ち",
        candidates: []
      }
    ]
  },
  {
    id: "c08",
    clientName: "SOMPOホールディングス",
    type: "民間",
    lastContact: "2026-06-02",
    projects: []
  }
];

export const MONTHLY_TREND = [
  { month: "1月", 業打ち: 22, 成約: 5, 失注: 12 },
  { month: "2月", 業打ち: 18, 成約: 4, 失注: 9 },
  { month: "3月", 業打ち: 31, 成約: 8, 失注: 14 },
  { month: "4月", 業打ち: 28, 成約: 7, 失注: 13 },
  { month: "5月", 業打ち: 35, 成約: 9, 失注: 16 },
  { month: "6月", 業打ち: 23, 成約: 6, 失注: 8 },
];

export const SALES_STATS = [
  { name: "田中", 業打ち: 12, OK: 4, 契約: 3, 決定率: 33 },
  { name: "鈴木", 業打ち: 8, OK: 3, 契約: 2, 決定率: 38 },
  { name: "佐藤", 業打ち: 6, OK: 2, 契約: 1, 決定率: 33 },
];

export const COMPANY_STATS = [
  { name: "富士通", 業打ち: 8, OK: 3, 契約: 2 },
  { name: "NTTデータ", 業打ち: 6, OK: 2, 契約: 1 },
  { name: "東京都庁", 業打ち: 4, OK: 2, 契約: 2 },
  { name: "野村総研", 業打ち: 5, OK: 1, 契約: 1 },
  { name: "日立製作所", 業打ち: 3, OK: 1, 契約: 0 },
];

export const LANGUAGE_PIE = [
  { name: "Java", value: 35, color: "#3b82f6" },
  { name: "Python", value: 22, color: "#10b981" },
  { name: "C#", value: 18, color: "#0ea5e9" },
  { name: "PHP", value: 12, color: "#ec4899" },
  { name: "Go", value: 8, color: "#f59e0b" },
  { name: "TS/React", value: 5, color: "#8b5cf6" },
];


export const ENG_STATUS_DATA = [
  { name: "待機", value: 3, 業打ち: 13, color: "#f59e0b" }, // amber
  { name: "業打ち中", value: 1, 業打ち: 1, color: "#3b82f6" }, // blue
  { name: "先付", value: 2, 業打ち: 4, color: "#6366f1" }, // indigo
  { name: "参画", value: 2, 業打ち: 7, color: "#10b981" }, // emerald
  { name: "復社", value: 2, 業打ち: 6, color: "#94a3b8" }, // slate
];

