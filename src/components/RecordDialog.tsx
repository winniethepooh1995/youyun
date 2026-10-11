import { useEffect, useRef } from 'react';
import type { SearchRecord } from '../data/records';
import { SourceMark } from './ResultList';
export function RecordDialog({ record, onClose }: { record: SearchRecord | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!record) return;
    const trigger = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
      if (trigger?.isConnected) trigger.focus();
    };
  }, [record]);
  if (!record) return null;
  return <dialog className="record-dialog" ref={dialogRef} aria-labelledby="record-heading" onCancel={event => { event.preventDefault(); onClose(); }}>
    <div className="dialog-toolbar"><span className="dialog-source"><SourceMark source={record.source} />{record.source === 'outlook' ? 'Outlook 郵件' : 'Google Drive 文件'}</span><button className="close-button" aria-label="關閉內容" onClick={onClose} autoFocus>×</button></div>
    <div className="dialog-body"><span className="eyebrow">模擬資料 · 內容預覽</span><h2 id="record-heading">{record.title}</h2><div className="dialog-metadata"><span>{record.author}</span><time dateTime={record.date}>{record.date}</time></div><div className="record-content">{record.content}</div></div>
    <div className="dialog-footer">此為虛構內容，尚未連接真實帳號。</div>
  </dialog>;
}
