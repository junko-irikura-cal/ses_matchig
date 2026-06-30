
  # SES業打ちマッチング管理アプリ デザインルール

  * **UIをコンポーネントベースで完全に標準化したいです！**
  * tailwind.cssフレームワークを使用し、新規classを作成しません
  * アイコンは[Lucide](https://lucide.dev/)を読み込みます

  ## 共通ルール
  * コンポーネントを使わずに直書きしない
  * padding / style の個別調整をしない
  * Button に独自デザインを当てない
  * サイズ・UIルールを混在させない
  * コンポーネント内で状態を持たせない
  * 1コンポーネントに複数機能を詰めない


  ## 目次
  1. [ボタン](#anchor1)
  2. [一覧（Table / Card）](#anchor2)
  3. [詳細カード](#anchor3)
  

  <a id="anchor1"></a>
  ## ボタン
  ボタンUIは、**役割（Action / Navigation）と優先度（variant / size）で統一する**

  ### コンポーネント

  - 操作 → Button
  - 遷移 → LinkButton

  ```tsx
  <Button />
  <LinkButton />
  ```
  ### Button（操作）
  
  | variant   | 用途                |
  | --------- | ----------------- |
  | primary   | 最重要アクション（登録・送信）   |
  | secondary | 補助操作（キャンセル）       |
  | outline   | 状態変更・展開・フィルタ      |
  | ghost     | 軽い操作（閉じる・アイコンボタン） |
  | icon      | アイコンのみ（FAB・丸ボタン）  |

  | size | 用途                  |
  | ---- | ------------------- |
  | xs   | テーブル内・行内操作（例：エントリー） |
  | sm   | 一覧UI（フィルタ・展開ボタン）    |
  | md   | 通常のアクション（登録・保存）     |
  | lg   | 強調アクション（新規作成など）     |

  #### 使用例
  ```tsx
  <Button size="md">登録する</Button>
  <Button variant="secondary">キャンセル</Button>
  <Button size="xs">エントリー</Button>
  <Button variant="outline" size="sm">候補 3件</Button>
  ```

  ### LinkButton（遷移）
  ※ サイズ・レイアウトだけ追加OK
  ```tsx
  <LinkButton className="text-xs truncate" />
  ```

  ### 状態管理
  * disabled → Buttonで制御
  * toggle / expand → classNameで制御  


<a id="anchor2"></a>

  ## 一覧（Table / Card）
  一覧UIは、**デバイスごとの表現（Table / Card）を分けつつ、同じ構造（Row）で統一する**

  * 構造：PC/SPで同一構造を保つ
  * 状態：コンポーネントに持たせない
  * 再利用：他一覧（顧客・案件）でも同構造

  ### コンポーネント

  * PC（一覧） → Table系
  * SP（一覧） → Card系
  
  ```tsx
  // PC
  <MainTable>
    <MainTableHeader />
    <TableRow>
      <TableCell />
    </TableRow>
  </MainTable>

  // SP
  <RowCard />
  ```

  ### Table（PC一覧）
  ### 基本ルール
  | 要素   | コンポーネント         |
  | ---- | --------------- |
  | テーブル | MainTable       |
  | ヘッダー | MainTableHeader |
  | 行    | TableRow        |
  | セル   | TableCell       |

  ### デザイン
  | 項目      | 指定                   |
  | ------- | -------------------- |
  | 背景      | bg-card              |
  | 枠線      | border border-border |
  | 角丸      | rounded-xl           |
  | padding | p-4                  |
  | 間隔      | gap-3                |
  | 影       | shadow-sm            |

  ### レイアウト
  | 領域 | 内容            |
  | -- | ------------- |
  | 上段 | 名前・ステータス・チェック |
  | 中段 | 補足情報（稼働・日付）   |
  | 下段 | 操作（展開ボタン）     |
  | 展開 | カード内に表示       |

  ### 展開（アコーディオン）
  `<div className="border-t pt-2">...</div>`
  | 項目    | ルール         |
  | ----- | ----------- |
  | 表示位置  | Card内       |
  | 区切り   | border-t    |
  | スクロール | overflow使用可 |
  | 状態    | 親で管理        |

  ### Table / Card 対応関係
  | PC（Table） | SP（Card）      |
  | --------- | ------------- |
  | TableRow  | RowCard       |
  | TableCell | 各セクション        |
  | 展開<tr>    | Card内展開       |
  | hover行    | Card境界・shadow |
  
  ### 操作ルール
  | 種類 | コンポーネント    |
  | -- | ---------- |
  | 操作 | Button     |
  | 遷移 | LinkButton |
  
  
  <a id="anchor3"></a>
  
  ## 詳細カード
  詳細画面のカードUIは、**共通パターン（DetailCard）を使用して統一する**
  
  * 1カード = 1機能単位
  * カードの見た目は共通
  * 中身は自由に構成する

  ### コンポーネント
  ```tsx
  <DetailCard title="タイトル">
    コンテンツ
  </DetailCard>
  ```

  ### デザイン
  | 項目      | 指定                    |
  | ------- | --------------------- |
  | 背景      | bg-card               |
  | 枠線      | border border-border  |
  | 角丸      | rounded-lg            |
  | padding | p-4                   |
  | タイトル    | text-sm font-semibold |
  | 間隔      | mb-3                  |

  ### 構造ルール
  | 要素    | 内容       |
  | ----- | -------- |
  | タイトル  | 左        |
  | アクション | 右（編集など）  |
  | 本文    | children |

