import type { SearchRecord, SourceFilter } from '../data/records';
const normalize = (text: string) => text.trim().replace(/\s+/g, ' ').toLowerCase();
const topics = ['會議', '報價', '專案進度', '出差'];

export function searchRecords(records: SearchRecord[], query: string, source: SourceFilter): SearchRecord[] {
  const term = normalize(query);
  const embeddedTopics = topics.filter(topic => term.includes(topic));
  const terms = [term, ...embeddedTopics];
  return records
    .filter(record => source === 'all' || record.source === source)
    .map(record => {
      const title = normalize(record.title);
      const keywords = record.keywords.map(normalize);
      const content = normalize(record.content);
      const score = !term ? 1 : terms.some(t => title.includes(t) || keywords.some(k => k.includes(t))) ? 2
        : terms.some(t => content.includes(t)) ? 1 : 0;
      return { record, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || b.record.date.localeCompare(a.record.date))
    .map(item => item.record);
}
