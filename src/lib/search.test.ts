import { describe, it, expect } from 'vitest';
import { records, type SearchRecord } from '../data/records';
import { searchRecords } from './search';
import { summarizeRecords } from './summary';

describe('mock data', () => {
  it('contains 20 unique synthetic records split evenly across sources', () => {
    expect(records).toHaveLength(20);
    expect(new Set(records.map(r => r.id)).size).toBe(20);
    for (const source of ['outlook', 'drive']) expect(records.filter(r => r.source === source)).toHaveLength(10);
    for (const topic of ['會議', '報價', '專案進度', '出差']) {
      expect(new Set(records.filter(r => r.keywords.includes(topic)).map(r => r.source))).toEqual(new Set(['outlook', 'drive']));
    }
  });
});
describe('searchRecords', () => {
  it('finds both sources for a topic and its example question', () => {
    const matches = searchRecords(records, '專案進度', 'all');
    expect(matches.length).toBeGreaterThan(0);
    expect(new Set(matches.map(r => r.source))).toEqual(new Set(['outlook', 'drive']));
    expect(searchRecords(records, '幫我找專案進度', 'all')).toEqual(matches);
  });
  it('normalizes whitespace and English case', () => {
    expect(searchRecords(records, '  專案進度  ', 'all')).toEqual(searchRecords(records, '專案進度', 'all'));
    expect(searchRecords(records, 'ATLAS', 'all').length).toBeGreaterThan(0);
    expect(searchRecords(records, 'ATLAS', 'all')).toEqual(searchRecords(records, 'atlas', 'all'));
  });
  it('shows all records newest first for blank input', () => {
    expect(searchRecords(records, '   ', 'all')).toEqual([...records].sort((a, b) => b.date.localeCompare(a.date)));
  });
  it('returns nothing for unknown terms or unrelated questions', () => {
    expect(searchRecords(records, '不存在的關鍵字', 'all')).toEqual([]);
    expect(searchRecords(records, '今天午餐吃什麼', 'all')).toEqual([]);
  });
  it('restricts results to the selected source', () => {
    const matches = searchRecords(records, '專案進度', 'drive');
    expect(matches.length).toBeGreaterThan(0);
    expect(matches.every(r => r.source === 'drive')).toBe(true);
  });
  it('ranks title/keyword matches ahead of content, then newest date', () => {
    const base = { source: 'drive' as const, author: '作者', highlights: ['重點'], keywords: [], content: 'needle' };
    const fixture: SearchRecord[] = [
      { ...base, id: 'body', title: '文件', date: '2026-10-10' },
      { ...base, id: 'old', title: 'needle', date: '2026-10-01' },
      { ...base, id: 'new', title: 'needle', date: '2026-10-02' },
    ];
    expect(searchRecords(fixture, 'needle', 'all').map(r => r.id)).toEqual(['new', 'old', 'body']);
  });
});
describe('summarizeRecords', () => {
  it('uses only the first five current results and their authored highlights', () => {
    const input = searchRecords(records, '', 'all');
    const output = summarizeRecords(input);
    expect(output).toHaveLength(5);
    expect(output).toEqual(input.slice(0, 5).map(r => ({ sourceId: r.id, text: r.highlights[0] })));
  });
  it('returns no invented summary for empty results', () => {
    expect(summarizeRecords([])).toEqual([]);
  });
});
