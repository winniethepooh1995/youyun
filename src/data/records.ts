export type Source = 'outlook' | 'drive';
export type SourceFilter = Source | 'all';
export interface SearchRecord {
  id: string;
  source: Source;
  title: string;
  date: string;
  author: string;
  content: string;
  keywords: string[];
  highlights: string[];
}

// All people, organizations and contents below are fictional.
export const records: SearchRecord[] = [
  {
    id: 'mail-01', source: 'outlook', title: 'Atlas 專案｜本週進度與待確認事項', date: '2026-10-09', author: '林以安 · 星嶼工作室',
    keywords: ['專案進度', 'Atlas'],
    content: '以安您好：\n\nAtlas 專案的搜尋介面已完成初版，串接模組目前完成 80%。請於 10 月 14 日前確認測試資料欄位。\n\n資料匯入仍有兩項格式問題，預計下週一一起處理。下次進度更新為 10 月 16 日。\n\n林以安',
    highlights: ['Atlas 搜尋介面初版已完成；串接模組完成 80%，測試資料欄位需於 10 月 14 日前確認。'],
  },
  {
    id: 'drive-01', source: 'drive', title: 'Atlas 專案進度追蹤表', date: '2026-10-08', author: '陳語禾',
    keywords: ['專案進度', 'Atlas'],
    content: 'Atlas 專案進度追蹤表\n\n介面設計：已完成。\n搜尋介面：初版完成，等待驗收。\n串接模組：完成 80%。\n資料匯入：CSV 日期格式、空白欄位兩項問題待修正。\n\n負責人：陳語禾。驗收測試安排於 10 月 16 日。',
    highlights: ['Atlas 驗收測試安排於 10 月 16 日，資料匯入尚有日期格式與空白欄位兩項問題。'],
  },
  {
    id: 'mail-02', source: 'outlook', title: '下週專案會議｜議程與準備資料', date: '2026-10-09', author: '周沐晴',
    keywords: ['會議', 'Atlas'],
    content: '各位好：\n\n下週專案會議訂於 10 月 13 日上午 10:00，地點為青葉會議室。\n\n議程：Atlas 搜尋功能展示、測試資料確認、里程碑調整。請各負責人於 10 月 12 日前更新待辦清單。\n\n周沐晴',
    highlights: ['專案會議於 10 月 13 日 10:00 在青葉會議室舉行，待辦清單需於 10 月 12 日前更新。'],
  },
  {
    id: 'drive-02', source: 'drive', title: '專案會議議程與待辦清單', date: '2026-10-08', author: '周沐晴',
    keywords: ['會議', 'Atlas'],
    content: '10 月 13 日專案會議\n\n10:00–10:15 搜尋功能展示。\n10:15–10:30 測試資料確認。\n10:30–10:45 里程碑調整。\n\n待辦：以安準備展示、語禾整理測試資料、沐晴彙整風險清單。',
    highlights: ['會議議程包含搜尋展示、測試資料確認及里程碑調整；以安、語禾、沐晴各自準備資料。'],
  },
  {
    id: 'mail-03', source: 'outlook', title: '雲端方案報價｜霧港科技', date: '2026-10-07', author: '許亦辰 · 霧港科技',
    keywords: ['報價', '雲端方案'],
    content: '您好：\n\n雲端方案報價為每月 NT$ 12,000，包含 100 GB 儲存與工作日技術支援。一次性設定費 NT$ 8,000。\n\n此報價有效至 10 月 31 日，所有金額均未稅。\n\n許亦辰',
    highlights: ['霧港雲端方案每月 NT$ 12,000，設定費 NT$ 8,000，均未稅；報價有效至 10 月 31 日。'],
  },
  {
    id: 'drive-03', source: 'drive', title: '雲端方案報價比較表', date: '2026-10-06', author: '黃書寧',
    keywords: ['報價', '雲端方案'],
    content: '雲端方案報價比較\n\n霧港科技：每月 NT$ 12,000，設定 NT$ 8,000，儲存 100 GB。\n映山系統：每月 NT$ 15,000，免設定費，儲存 200 GB。\n\n均未稅。預計於 10 月 20 日完成方案選擇，需確認備份保留天數。',
    highlights: ['霧港與映山方案分別每月 NT$ 12,000 與 NT$ 15,000，預計 10 月 20 日選定並確認備份天數。'],
  },
  {
    id: 'mail-04', source: 'outlook', title: '台中出差｜住宿確認', date: '2026-10-05', author: '青川旅店 · 訂房服務',
    keywords: ['出差', '住宿', '訂房'],
    content: '林以安您好：\n\n您的訂房已確認。入住 10 月 21 日，退房 10 月 23 日，共兩晚，每晚 NT$ 2,800。\n\n地址：台中市示範路 88 號（虛構地址）。入住時間為 15:00 後。訂房編號 DEMO-1021。\n\n青川旅店',
    highlights: ['台中出差住宿為 10 月 21 日至 23 日，共兩晚，每晚 NT$ 2,800，15:00 後入住。'],
  },
  {
    id: 'drive-04', source: 'drive', title: '台中出差行程與預算', date: '2026-10-04', author: '林以安',
    keywords: ['出差', '住宿', '行程'],
    content: '台中出差：10 月 21 日至 23 日\n\n10/21：09:30 搭車，14:00 客戶訪談。\n10/22：10:00 系統展示，下午整理回饋。\n10/23：上午確認後續事項，16:00 返回。\n\n住宿兩晚 NT$ 5,600；交通預估 NT$ 1,500；餐費預估 NT$ 1,200。總預算 NT$ 8,300。',
    highlights: ['台中出差包含 10 月 21 日客戶訪談與 22 日系統展示，總預算 NT$ 8,300。'],
  },
  {
    id: 'mail-05', source: 'outlook', title: '品牌更新專案進度｜素材交付', date: '2026-10-03', author: '江若汐',
    keywords: ['專案進度', '品牌更新'],
    content: '品牌更新的圖示素材已交付 12 款。首頁文案預計 10 月 15 日提供。\n\n請先確認圖示尺寸與深色背景版本，有疑問可在回饋清單註記。',
    highlights: ['品牌更新已交付 12 款圖示，首頁文案預計於 10 月 15 日提供。'],
  },
  {
    id: 'drive-05', source: 'drive', title: '品牌更新專案進度看板', date: '2026-10-02', author: '江若汐',
    keywords: ['專案進度', '品牌更新'],
    content: '品牌更新看板\n\n完成：色彩規範、12 款圖示。\n進行中：首頁文案，10 月 15 日交付。\n待開始：品牌手冊，10 月 28 日交付。\n\n需補充深色背景的圖示使用示例。',
    highlights: ['品牌手冊預計 10 月 28 日交付；深色背景圖示示例仍待補充。'],
  },
  {
    id: 'mail-06', source: 'outlook', title: '季度回顧會議｜時間確認', date: '2026-10-02', author: '陳語禾',
    keywords: ['會議', '季度回顧'],
    content: '季度回顧會議安排在 10 月 19 日 14:00，預計 60 分鐘。\n\n請準備本季成果、遇到的問題與下季目標。簡報需於 10 月 16 日中午前交付。',
    highlights: ['季度回顧會議為 10 月 19 日 14:00，簡報需在 10 月 16 日中午前交付。'],
  },
  {
    id: 'drive-06', source: 'drive', title: '季度回顧會議簡報大綱', date: '2026-10-01', author: '陳語禾',
    keywords: ['會議', '季度回顧'],
    content: '季度回顧簡報大綱\n\n1. 本季三項成果。\n2. 兩項未解問題及改善方式。\n3. 下季目標與預算。\n\n每位成員最多五頁，報告時間八分鐘。',
    highlights: ['季度回顧每位成員準備最多五頁、八分鐘簡報，涵蓋成果、問題與下季目標。'],
  },
  {
    id: 'mail-07', source: 'outlook', title: '設備採購報價｜筆記型電腦', date: '2026-09-30', author: '方庭宇 · 木橋資訊',
    keywords: ['報價', '設備採購'],
    content: '筆記型電腦五台的報價為每台 NT$ 32,000，總計 NT$ 160,000（含稅）。\n\n含三年保固，確認訂單後十個工作日交貨。報價有效至 10 月 18 日。',
    highlights: ['五台筆記型電腦含稅總計 NT$ 160,000，含三年保固，訂單確認後十個工作日交貨。'],
  },
  {
    id: 'drive-07', source: 'drive', title: '設備採購需求與報價紀錄', date: '2026-09-29', author: '黃書寧',
    keywords: ['報價', '設備採購'],
    content: '設備採購需求\n\n五台筆記型電腦，每台記憶體至少 16 GB、SSD 512 GB。\n木橋資訊報價總計含稅 NT$ 160,000。採購預算上限 NT$ 170,000。\n\n負責人需於 10 月 12 日前完成規格確認。',
    highlights: ['設備預算上限 NT$ 170,000，五台電腦需符合 16 GB 記憶體、512 GB SSD，10 月 12 日前確認。'],
  },
  {
    id: 'mail-08', source: 'outlook', title: '高雄出差｜交通安排', date: '2026-09-28', author: '周沐晴',
    keywords: ['出差', '交通', '行程'],
    content: '高雄出差訂於 10 月 27 日當天往返。\n\n去程 08:00、回程 18:30，交通費預估 NT$ 2,980。請於 10 月 20 日前确认是否需要調整時間。',
    highlights: ['高雄出差為 10 月 27 日當天往返，去程 08:00、回程 18:30，交通費預估 NT$ 2,980。'],
  },
  {
    id: 'drive-08', source: 'drive', title: '高雄出差拜訪清單', date: '2026-09-27', author: '周沐晴',
    keywords: ['出差', '行程'],
    content: '高雄拜訪清單\n\n10 月 27 日 10:00 拜訪映山系統，討論測試回饋。\n14:00 拜訪霧港科技，確認支援安排。\n\n攜帶：展示電腦、測試結果、紙本報價比較表。',
    highlights: ['10 月 27 日 10:00 與 14:00 分別拜訪映山系統與霧港科技，需攜帶展示電腦及測試資料。'],
  },
  {
    id: 'mail-09', source: 'outlook', title: 'Atlas 專案進度｜第二階段里程碑', date: '2026-09-25', author: '林以安',
    keywords: ['專案進度', 'Atlas'],
    content: 'Atlas 第二階段里程碑已更新：\n\n10 月 16 日完成驗收測試，10 月 23 日整理使用回饋，10 月 30 日完成修正。\n\n請語禾於驗收前確認測試環境與展示資料。',
    highlights: ['Atlas 第二階段目標為 10 月 16 日驗收、23 日整理回饋、30 日完成修正。'],
  },
  {
    id: 'drive-09', source: 'drive', title: 'Atlas 專案進度｜驗收檢查表', date: '2026-09-24', author: '陳語禾',
    keywords: ['專案進度', 'Atlas'],
    content: 'Atlas 驗收檢查表\n\n確認項目：跨來源搜尋、無結果提示、來源追溯、手機操作。\n\n每項需記錄測試步驟及截圖，所有重大問題修正後再確認驗收。驗收日期為 10 月 16 日。',
    highlights: ['Atlas 10 月 16 日驗收涵蓋跨來源搜尋、無結果提示、來源追溯與手機操作。'],
  },
  {
    id: 'mail-10', source: 'outlook', title: '需求訪談會議｜訪談準備', date: '2026-09-23', author: '江若汐',
    keywords: ['會議', '需求訪談'],
    content: '需求訪談會議將於 10 月 6 日 11:00 舉行，共三位使用者參加。\n\n每人訪談 20 分鐘，重點是搜尋習慣、資料來源及目前的查找困難。',
    highlights: ['10 月 6 日需求訪談安排三位使用者，每人 20 分鐘，聚焦搜尋習慣與查找困難。'],
  },
  {
    id: 'drive-10', source: 'drive', title: '需求訪談會議｜問題清單', date: '2026-09-22', author: '江若汐',
    keywords: ['會議', '需求訪談'],
    content: '需求訪談問題清單\n\n1. 最常查找哪種資料？\n2. 一次搜尋通常需要打開幾個系統？\n3. 什麼資訊能幫助你判斷搜尋結果？\n4. 哪些情況需要摘要？\n\n每場訪談需記錄兩項主要問題與一項改善建議。',
    highlights: ['需求訪談需記錄每位使用者兩項主要查找問題及一項改善建議。'],
  },
];
