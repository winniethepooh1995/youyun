# Personal Search Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** 建立可搜尋模擬 Outlook 與 Google Drive 資料、閱讀內容並取得附來源模擬摘要的個人網頁。

**Architecture:** React 單頁介面使用本地靜態資料，搜尋與摘要為獨立純函式。沒有後端、登入或外部服務請求，內容面板與摘要共用資料 ID 追溯來源。

**Tech Stack:** Node.js 24（現有 v24.19.0）、npm、React、TypeScript、Vite、Vitest、Testing Library、Playwright。

**Spec:** `docs/superpowers/specs/2026-10-11-personal-search-design.md`

## Global Constraints

- 提供 20 筆合成資料，Outlook 與 Google Drive 各 10 筆。
- 資料涵蓋會議、報價、專案進度、出差四個主題；每個主題都包含兩種來源。
- 原型不登入公司服務、不讀取真實資料、不呼叫外部 AI、不需要 API 金鑰。
- 「AI 整理（模擬）」最多取前五筆並保留各自來源 ID。
- 重新搜尋或切換來源時清除舊摘要；沒有結果時停用整理按鈕。
- 繁體中文、桌面與手機可用；資料以文字渲染，不注入 HTML。
- 使用既有 `/workspace/youyun` checkout，不另建 Git worktree。

## Review Focus

- 重複與多餘空白輸入不得改變相同關鍵字的結果：Task 1 測試。
- 未命中的整句不能因單一常見字列出所有資料：Task 1 測試。
- 搜尋或切換來源後，舊摘要與不再有效的內容面板不能殘留：Task 2 測試。
- Escape 關閉面板後焦點應回到觸發按鈕：Task 2 測試。
- 手機長標題、內容及來源引用不得超出視窗：Task 3 瀏覽器測試。

## 檔案配置

- `package.json`, `package-lock.json`, `.gitignore`, `index.html`, `tsconfig.json`, `vite.config.ts`：工具、固定依賴與啟動入口。
- `src/data/records.ts`：資料型別及 20 筆虛構資料。
- `src/lib/search.ts`, `src/lib/summary.ts`：搜尋與摘要邏輯。
- `src/main.tsx`, `src/App.tsx`, `src/styles.css`：React 入口、狀態協調及響應式樣式。
- `src/components/ResultList.tsx`, `SummaryPanel.tsx`, `RecordDialog.tsx`：結果、摘要、內容面板。
- `src/test/setup.ts`, `src/lib/*.test.ts`, `src/App.test.tsx`：單元與互動驗證。
- `playwright.config.ts`, `tests/prototype.spec.ts`：真實瀏覽器驗證。
- `README.md`：安裝、啟動、驗證及模擬功能限制。

### Task 1: 可驗證的模擬資料、搜尋與摘要

**Files:** 建立工具設定、`src/data/records.ts`、`src/lib/search.ts`、`src/lib/summary.ts` 與對應測試。

**Interfaces:**
- `Source = 'outlook' | 'drive'`; `SourceFilter = Source | 'all'`。
- `SearchRecord = { id: string; source: Source; title: string; date: string; author: string; content: string; keywords: string[]; highlights: string[] }`。
- `records: SearchRecord[]`；日期為 ISO `YYYY-MM-DD`。
- `searchRecords(records: SearchRecord[], query: string, source: SourceFilter): SearchRecord[]`。
- `SummaryItem = { sourceId: string; text: string }`；`summarizeRecords(results: SearchRecord[]): SummaryItem[]`。

- [x] **Step 1:** 建立 npm 工具設定及測試入口。設定 `dev`、`build`（`tsc --noEmit && vite build`）、`test`（`vitest run`）、`test:e2e` 腳本；安裝穩定且相容版本，提交 lockfile，後續使用 `npm ci`。忽略 node_modules、dist、測試輸出；不忽略測試或來源。Vitest 使用 jsdom 與 Testing Library。
- [x] **Step 2:** 寫失敗測試：`records` 長度等於 20、每種來源等於 10、ID 唯一、每個主題具有兩種來源；`searchRecords(records, '專案進度', 'all')` 來源集合等於兩種來源；空白查詢等於依日期排序的全部資料；不存在關鍵字回傳空陣列。
- [x] **Step 3:** 執行 `npm test -- src/lib/search.test.ts src/lib/summary.test.ts`，確認因尚未定義資料或函式而失敗。
- [x] **Step 4:** 建立資料與函式。每筆資料的 `highlights[0]` 為具體且可從內容驗證的重點。搜尋先 trim、合併空白並轉小寫；以完整查詢匹配欄位，另比對查詢內含的主題關鍵字以支援問句。標題或關鍵字匹配得分高於內文匹配，同分日期由新至舊。使用固定主題詞，不按單一中文字拆詞。摘要取結果前五筆的第一個重點，保留其 ID。
- [x] **Step 5:** 加入並通過測試：英文 `ATLAS` 與 `atlas` 相同；`'  專案進度  '` 與原查詢相同；範例問句「幫我找專案進度」找出對應主題；無關問句「今天午餐吃什麼」零結果；來源篩選只回指定來源；以小型 fixture 確認排序。摘要長度最多五、引用皆來自結果、文字等於該筆 `highlights[0]`、空輸入回空陣列。
- [x] **Step 6:** 執行 `npm test -- src/lib` 確認通過，提交此任務檔案。

### Task 2: 搜尋、閱讀與模擬整理的完整介面

**Files:** 建立 React 入口、App、三個元件、樣式、`src/App.test.tsx`。

**Interfaces:**
- 消費 Task 1 全部型別、資料與純函式。
- `ResultList({ records, onOpen }: { records: SearchRecord[]; onOpen: (record: SearchRecord) => void })`。
- `SummaryPanel({ items, onOpen }: { items: SummaryItem[]; onOpen: (id: string) => void })`。
- `RecordDialog({ record, onClose }: { record: SearchRecord | null; onClose: () => void })`。
- `App` 協調 query 草稿、已提交查詢、來源篩選、摘要與開啟的資料。

- [x] **Step 1:** 寫失敗的 App 互動測試：初始 20 筆；搜尋「專案進度」顯示兩種來源；按結果開啟完整內容及作者；按「AI 整理（模擬）」顯示引用，點引用開啟相同資料。
- [x] **Step 2:** 執行 `npm test -- src/App.test.tsx` 確認缺少介面造成失敗。
- [x] **Step 3:** 實作入口與元件，顯示模擬資料及預寫摘要說明。結果包含來源文字、標題、日期、摘要；摘要引用用按鈕開啟本地內容。提供四個主題範例按鈕、來源篩選與結果計數。搜尋提交與來源變更均清除摘要與內容面板。
- [x] **Step 4:** 實作響應式 CSS：桌面結果與摘要並排、手機垂直排列，長文字可換行。使用系統字型、CSS 圖形，不下載外部字型或素材。內容採原生 dialog，開啟時移入焦點、Tab 保持面板內、Escape 與關閉按鈕關閉並還原觸發元素焦點。
- [x] **Step 5:** 增加測試並通過：新搜尋及來源變更清除摘要與開啟內容；零結果提供範例且整理按鈕 disabled；Enter 提交搜尋；欄位及按鈕具有可辨識標籤。dialog 的焦點與 Escape 行為由 Task 3 在瀏覽器驗證。
- [x] **Step 6:** 執行 `npm test` 及 `npm run build`，確認測試實際執行且建置成功，提交此任務檔案。

### Task 3: 瀏覽器驗證與可重用雲端設定

**Files:** 建立 `playwright.config.ts`、`tests/prototype.spec.ts`、`README.md`。

**Interfaces:** 消費完成的 App；開發指令 `npm run dev -- --host 0.0.0.0 --port 5173`，HTTP 根路徑呈現原型。

- [x] **Step 1:** 寫 Playwright 測試：以「專案進度」搜尋，驗證兩種來源；開啟內容及關閉；產生摘要並開啟引用；新搜尋清除摘要。使用 Chromium 與本地 Vite webServer。
- [x] **Step 2:** 加入鍵盤測試：觸發內容面板，Tab 保持於 dialog，Escape 關閉並確認焦點回到觸發按鈕。加入 390×844 手機 viewport，驗證頁面與 dialog 無水平溢出，長標題及內容可閱讀。
- [x] **Step 3:** 安裝 Playwright 所需 Chromium 與系統依賴，保留 TLS 與套件驗證。執行 `npm run test:e2e`，修正環境問題；介面缺陷回到相關任務修正並重跑受影響測試。
- [x] **Step 4:** 執行 `npm ci`、`npm test`、`npm run build`、`npm run test:e2e`，確認乾淨安裝可重現；啟動 Vite 並以本地 HTTP 請求及瀏覽器確認完整流程。僅報告實際通過的檢查。
- [x] **Step 5:** README 記錄 Node 24、工作目錄、安裝啟動與驗證指令、模擬搜尋和摘要限制、尚未串接公司帳號。保存環境草稿 `install_script`（`cd /workspace/youyun; npm ci` 及已驗證的瀏覽器準備指令）與 `start_skill`（既有 checkout、Vite 啟動與功能 readiness 檢查；程序需重新啟動）。如需新增網域先讀取並保留既有網路設定。
- [x] **Step 6:** 檢查 git diff、測試輸出與未追蹤檔案，提交此任務；依執行技能完成最終審查。報告可用功能、驗證證據與環境草稿保存狀態；不把草稿保存說成已發布，不提供 onboarding 不支援的 localhost 預覽連結。
