import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from './App';

async function search(user: ReturnType<typeof userEvent.setup>, query: string) {
  const input = screen.getByRole('searchbox', { name: '搜尋郵件與文件' });
  await user.clear(input);
  await user.type(input, query);
  await user.keyboard('{Enter}');
}

describe('personal search workflow', () => {
  it('starts with 20 results and clear mock disclosure', () => {
    render(<App />);
    expect(screen.getByText('20 筆資料')).toBeInTheDocument();
    expect(screen.getByText(/所有內容皆為虛構/)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /^閱讀：/ })).toHaveLength(20);
  });
  it('searches both sources and opens full record content', async () => {
    const user = userEvent.setup();
    render(<App />);
    await search(user, '專案進度');
    const results = screen.getByRole('region', { name: '搜尋結果' });
    expect(within(results).getAllByText('Outlook').length).toBeGreaterThan(0);
    expect(within(results).getAllByText('Google Drive').length).toBeGreaterThan(0);
    await user.click(screen.getByRole('button', { name: '閱讀：Atlas 專案｜本週進度與待確認事項' }));
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText(/CSV|資料匯入仍有兩項格式問題/)).toBeInTheDocument();
    expect(within(dialog).getByText('林以安 · 星嶼工作室')).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: '關閉內容' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  it('summarizes current results and follows a source citation', async () => {
    const user = userEvent.setup();
    render(<App />);
    await search(user, '專案進度');
    await user.click(screen.getByRole('button', { name: 'AI 整理（模擬）' }));
    expect(screen.getByText(/串接模組完成 80%/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '來源 1' }));
    expect(within(screen.getByRole('dialog')).getByRole('heading', { name: 'Atlas 專案｜本週進度與待確認事項' })).toBeInTheDocument();
  });
  it('clears old summary and open content when source changes', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'AI 整理（模擬）' }));
    await user.click(screen.getByRole('button', { name: '來源 1' }));
    // Native dialog is modal in browsers; source changes programmatically are covered here.
    await user.click(screen.getByRole('button', { name: '只看 Google Drive' }));
    expect(screen.queryByRole('button', { name: '來源 1' })).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText('10 筆資料')).toBeInTheDocument();
  });
  it('clears summary on a new search and handles no results', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'AI 整理（模擬）' }));
    await search(user, '不存在的關鍵字');
    expect(screen.queryByRole('button', { name: '來源 1' })).not.toBeInTheDocument();
    expect(screen.getByText('沒有找到相關資料')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'AI 整理（模擬）' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: '試試搜尋：出差' }));
    expect(screen.queryByText('沒有找到相關資料')).not.toBeInTheDocument();
  });
});
