import { useState } from 'react';
import { records, type SearchRecord, type SourceFilter } from './data/records';
import { searchRecords } from './lib/search';
import { summarizeRecords, type SummaryItem } from './lib/summary';
import { ResultList, SourceMark } from './components/ResultList';
import { SummaryPanel } from './components/SummaryPanel';
import { RecordDialog } from './components/RecordDialog';

const examples = ['專案進度', '會議', '報價', '出差'];
const filters: { value: SourceFilter; label: string; accessible: string }[] = [
  { value: 'all', label: '全部來源', accessible: '全部來源' },
  { value: 'outlook', label: 'Outlook', accessible: '只看 Outlook' },
  { value: 'drive', label: 'Google Drive', accessible: '只看 Google Drive' },
];
function SearchIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>;
}
export default function App() {
  const [draft, setDraft] = useState('');
  const [query, setQuery] = useState('');
  const [source, setSource] = useState<SourceFilter>('all');
  const [summary, setSummary] = useState<SummaryItem[]>([]);
  const [opened, setOpened] = useState<SearchRecord | null>(null);
  const results = searchRecords(records, query, source);
  const runSearch = (value: string) => { setDraft(value); setQuery(value); setSummary([]); setOpened(null); };
  const changeSource = (value: SourceFilter) => { setSource(value); setSummary([]); setOpened(null); };
  return <div className="app-shell">
    <aside className="sidebar" aria-label="資料來源">
      <a className="brand" href="#" onClick={event => { event.preventDefault(); changeSource('all'); runSearch(''); }} aria-label="悠雲首頁"><span className="brand-symbol" aria-hidden="true">y</span><span>悠雲<span className="brand-english">youyun</span></span></a>
      <div className="workspace-label">個人工作空間</div>
      <button className={`sidebar-search ${source === 'all' ? 'selected' : ''}`} onClick={() => changeSource('all')}><SearchIcon />統一搜尋<span aria-hidden="true">↗</span></button>
      <div className="sidebar-section-title">資料來源 <span>2</span></div>
      <button className={`source-nav ${source === 'outlook' ? 'selected' : ''}`} onClick={() => changeSource('outlook')}><SourceMark source="outlook" /><span>Outlook<small>模擬郵件</small></span><span className="source-count">10</span></button>
      <button className={`source-nav ${source === 'drive' ? 'selected' : ''}`} onClick={() => changeSource('drive')}><SourceMark source="drive" /><span>Google Drive<small>模擬文件</small></span><span className="source-count">10</span></button>
      <div className="sidebar-demo"><span className="demo-icon" aria-hidden="true">◇</span><strong>你的資料，一個入口</strong><p>這裡是體驗用的原型。<br/>探索搜尋與整理的可能。</p><span className="demo-label">DEMO WORKSPACE</span></div>
      <div className="sidebar-user"><span className="avatar">我</span><span>我的工作空間<small>個人使用 · 原型版本</small></span><span className="user-dot" aria-hidden="true" /></div>
    </aside>
    <div className="main-shell">
      <header className="topbar"><div className="breadcrumb">工作空間 <span>/</span> <strong>統一搜尋</strong></div><span className="prototype-badge"><span aria-hidden="true" />模擬資料模式</span></header>
      <main>
        <section className="search-hero" aria-labelledby="page-title">
          <div className="hero-eyebrow"><span aria-hidden="true">✦</span> YOUR PERSONAL KNOWLEDGE SPACE</div>
          <h1 id="page-title">你的資料，都在這裡。</h1>
          <p className="hero-description">從郵件到文件，一次搜尋找到關聯，讓資訊回到你手上。</p>
          <form className="search-form" role="search" onSubmit={event => { event.preventDefault(); runSearch(draft); }}>
            <SearchIcon /><input type="search" aria-label="搜尋郵件與文件" placeholder="輸入關鍵字，或問問你的資料…" value={draft} onChange={event => setDraft(event.target.value)} /><button type="submit">搜尋 <span aria-hidden="true">↗</span></button>
          </form>
          <div className="example-queries"><span>試試搜尋</span>{examples.map(example => <button key={example} onClick={() => runSearch(example)}>{example}<span aria-hidden="true">↗</span></button>)}</div>
        </section>
        <div className="mock-notice"><span className="notice-icon" aria-hidden="true">i</span><p>所有內容皆為虛構，尚未連接公司帳號。AI 整理使用預先撰寫的重點，供你體驗操作流程。</p><span className="notice-label">原型體驗</span></div>
        <div className="content-grid">
          <section className="results-section" aria-label="搜尋結果">
            <div className="results-heading"><div><h2>{query.trim() ? '搜尋結果' : '探索你的資料'}</h2><span className="result-count" role="status">{results.length} 筆資料</span></div><span className="sort-label">依相關性與日期排序 <span aria-hidden="true">↓</span></span></div>
            <div className="source-tabs" aria-label="篩選資料來源">{filters.map(filter => <button key={filter.value} className={source === filter.value ? 'active' : ''} aria-label={filter.accessible} aria-pressed={source === filter.value} onClick={() => changeSource(filter.value)}>{filter.label}<span>{searchRecords(records, query, filter.value).length}</span></button>)}</div>
            {query.trim() && <p className="query-description">關於 <strong>「{query.trim()}」</strong> 的相關資料</p>}
            {results.length ? <ResultList records={results} onOpen={setOpened} /> : <div className="no-results"><div className="empty-search-icon"><SearchIcon /></div><h3>沒有找到相關資料</h3><p>換個關鍵字，或從下方主題開始探索。</p><div>{examples.map(example => <button key={example} onClick={() => runSearch(example)} aria-label={`試試搜尋：${example}`}>{example}</button>)}</div></div>}
            <div className="results-end">{results.length > 0 ? '已顯示所有符合的模擬資料' : '試著搜尋會議、報價、專案進度或出差'}</div>
          </section>
          <aside className="summary-panel" aria-label="AI 整理">
            <div className="summary-heading"><div><span className="sparkle" aria-hidden="true">✦</span><h2>AI 整理</h2></div><span className="mock-tag">模擬</span></div>
            <p className="summary-description">把找到的資訊，整理成有出處的答案。</p>
            <button className="summarize-button" onClick={() => setSummary(summarizeRecords(results))} disabled={!results.length} aria-label="AI 整理（模擬）"><span aria-hidden="true">✦</span>{summary.length ? '重新整理重點' : '整理搜尋結果'}<span aria-hidden="true">→</span></button>
            <SummaryPanel items={summary} onOpen={id => setOpened(results.find(record => record.id === id) ?? null)} />
            <div className="summary-disclosure"><span aria-hidden="true">◇</span><span>示範摘要使用預寫重點，<br/>未呼叫真實 AI 服務。</span></div>
          </aside>
        </div>
        <footer className="page-footer"><span>悠雲 youyun <span>·</span> 讓資訊，彼此相連。</span><span>個人資料搜尋原型</span></footer>
      </main>
    </div>
    <RecordDialog record={opened} onClose={() => setOpened(null)} />
  </div>;
}
