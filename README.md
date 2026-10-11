# 悠雲 Youyun

個人資料搜尋入口原型：在同一個網頁搜尋模擬 Outlook 郵件與 Google Drive 文件，查看內容並取得附來源的示範摘要。

## 安裝與啟動

需要 Node.js 24.x 與 npm。使用雲端既有 checkout，不需要另外建立 Git worktree。

```bash
cd /workspace/youyun
npm ci
npm run dev -- --host 0.0.0.0 --port 5173 --strictPort
```

重新執行 `npm ci` 前，先停止自己啟動的開發伺服器；安裝後重新啟動，避免依賴快取失效。

`npm ci` 按 lockfile 安裝依賴；`.npmrc` 將快取保存於可寫的 `/workspace/.npm-cache`。Vite 是開發伺服器，不是正式部署。發布雲端環境快照後，開發伺服器仍需要重新啟動。

## 體驗流程

1. 點選「專案進度」或輸入「幫我找專案進度」並搜尋。
2. 在全部來源、Outlook、Google Drive 之間篩選。
3. 點選結果標題查看完整內容，按關閉按鈕或 Escape 返回。
4. 按「整理搜尋結果」，點選來源編號核對原文。
5. 新搜尋或來源篩選會清除舊摘要。搜尋不存在的關鍵字會顯示無結果提示。

## 驗證

```bash
npm test
npm run build
npm run test:e2e
```

`test:e2e` 會自行啟動 Vite，使用 Chromium 驗證實際操作、鍵盤焦點、手機版及不載入外部內容。雲端環境已有 `/usr/bin/chromium`，可直接使用。其他機器若沒有此程式，先執行 `npx playwright install --with-deps chromium`；或用非機密環境變數 `CHROMIUM_PATH` 指定相容的 Chromium 執行檔。測試需要埠 5173；已有本專案的開發伺服器時可重用。測試截圖保存在忽略的 `test-results/`。

## 原型限制

- 20 筆資料全部為虛構；Outlook 與 Google Drive 各 10 筆。
- 搜尋使用關鍵字與固定主題詞，沒有語意向量索引；任意自然語言問題不保證命中。
- 「AI 整理（模擬）」使用結果前五筆的預寫重點，不呼叫 AI，不需要 API 金鑰。
- 無登入、後端、資料庫或個人資料持久化。來源連結只開啟本地模擬內容。
- 正式公司 Outlook／Google Drive 串接、保存資料與 AI 使用方式，需待公司 IT 確認後另行設計。

設計與實作計畫位於 `docs/superpowers/`。本機提交尚未推送至 GitHub。
