// 業打ち候補（マッチング案件）の型定義
export interface MatchCandidate {
  clientName: string; // 顧客企業名
  projects: string[]; // 案件のリスト（1つの顧客に複数入れられます）
}

// 既存のエンジニア型（Engineer）に候補データを持たせるための拡張
// すでに別のファイルに「interface Engineer」がある場合は、そちらに「candidates?: MatchCandidate[];」を追記してもOKです