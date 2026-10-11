import type { SearchRecord } from '../data/records';
export function SourceMark({ source }: { source: SearchRecord['source'] }) {
  return <span className={`source-mark ${source}`} aria-hidden="true">{source === 'outlook' ? 'O' : '△'}</span>;
}
export function ResultList({ records, onOpen }: { records: SearchRecord[]; onOpen: (record: SearchRecord) => void }) {
  return <div className="result-list">{records.map(record => <article className="result-card" key={record.id}>
    <SourceMark source={record.source} />
    <div className="result-body">
      <div className="result-meta"><span>{record.source === 'outlook' ? 'Outlook' : 'Google Drive'}</span><span className="meta-dot">·</span><time dateTime={record.date}>{record.date.replaceAll('-', '.')}</time></div>
      <h3><button className="record-title" aria-label={`閱讀：${record.title}`} onClick={() => onOpen(record)}>{record.title}</button></h3>
      <p className="result-excerpt">{record.content.replaceAll('\n', ' ')}</p>
      <div className="result-footer"><span>{record.author}</span><span className="topic-pill">{record.keywords[0]}</span></div>
    </div>
    <span className="result-arrow" aria-hidden="true">↗</span>
  </article>)}</div>;
}
