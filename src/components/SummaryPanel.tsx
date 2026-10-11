import type { SummaryItem } from '../lib/summary';
export function SummaryPanel({ items, onOpen }: { items: SummaryItem[]; onOpen: (id: string) => void }) {
  return <div className="summary-content" aria-live="polite">
    {items.length > 0 ? <>
      <div className="summary-status"><span aria-hidden="true">✓</span> 已整理 {items.length} 筆來源</div>
      <ol className="summary-items">{items.map((item, index) => <li key={item.sourceId}>
        <p>{item.text}</p><button className="citation" aria-label={`來源 ${index + 1}`} onClick={() => onOpen(item.sourceId)}><span aria-hidden="true">↗</span> 來源 {index + 1}</button>
      </li>)}</ol>
      <p className="summary-footnote">摘要取自目前結果的前五筆資料。點選來源，即可核對完整內容。</p>
    </> : <div className="summary-empty">
      <div className="summary-orbit" aria-hidden="true"><span>✦</span></div>
      <h3>讓資料變成重點</h3>
      <p>找到相關資料後，按下「AI 整理」，將分散的資訊整理成容易閱讀的重點。</p>
      <div className="summary-features"><span><b aria-hidden="true">✓</b> 跨來源整理</span><span><b aria-hidden="true">✓</b> 每個重點皆附出處</span></div>
    </div>}
  </div>;
}
