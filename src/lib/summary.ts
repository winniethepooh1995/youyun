import type { SearchRecord } from '../data/records';
export interface SummaryItem { sourceId: string; text: string }
export function summarizeRecords(results: SearchRecord[]): SummaryItem[] {
  return results.slice(0, 5).map(record => ({ sourceId: record.id, text: record.highlights[0] }));
}
