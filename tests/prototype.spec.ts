import { test, expect } from '@playwright/test';

test('searches both sources, follows citations, resets summaries and shows empty results', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('status')).toHaveText('20 筆資料');
  await page.getByRole('searchbox', { name: '搜尋郵件與文件' }).fill('專案進度');
  await page.getByRole('searchbox').press('Enter');
  const results = page.getByRole('region', { name: '搜尋結果' });
  await expect(results.getByText('Outlook', { exact: true }).first()).toBeVisible();
  await expect(results.getByText('Google Drive', { exact: true }).first()).toBeVisible();
  await page.getByRole('button', { name: '閱讀：Atlas 專案｜本週進度與待確認事項' }).click();
  await expect(page.getByRole('dialog')).toContainText('資料匯入仍有兩項格式問題');
  await page.getByRole('button', { name: '關閉內容' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'AI 整理（模擬）' }).click();
  await page.getByRole('button', { name: '來源 1', exact: true }).click();
  await expect(page.getByRole('dialog').getByRole('heading')).toHaveText('Atlas 專案｜本週進度與待確認事項');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: '只看 Google Drive', exact: true }).click();
  await expect(page.getByRole('button', { name: '來源 1', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'AI 整理（模擬）' }).click();
  await page.getByRole('searchbox').fill('今天午餐吃什麼');
  await page.getByRole('searchbox').press('Enter');
  await expect(page.getByText('沒有找到相關資料')).toBeVisible();
  await expect(page.getByRole('button', { name: 'AI 整理（模擬）' })).toBeDisabled();
  await expect(page.getByRole('button', { name: '來源 1', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: '試試搜尋：出差' }).click();
  await expect(page.getByRole('status')).not.toHaveText('0 筆資料');
  expect(errors).toEqual([]);
});

test('native dialog traps keyboard focus and restores its trigger', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: '閱讀：Atlas 專案｜本週進度與待確認事項' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: '關閉內容' })).toBeFocused();
  for (let index = 0; index < 4; index++) {
    await page.keyboard.press('Tab');
    const focusIsInsideOrOnDocument = await page.evaluate(() => {
      const dialog = document.querySelector('dialog');
      // Native focus wraps through the browser chrome/document between cycles.
      return dialog?.contains(document.activeElement) || document.activeElement === document.body;
    });
    expect(focusIsInsideOrOnDocument).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('mobile layout keeps long record content and citations inside viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const noOverflow = () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
  expect(await noOverflow()).toBe(true);
  await page.getByRole('searchbox').fill('專案進度');
  await page.getByRole('searchbox').press('Enter');
  await page.getByRole('button', { name: 'AI 整理（模擬）' }).click();
  expect(await noOverflow()).toBe(true);
  await page.getByRole('button', { name: '來源 1', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  const bounds = await dialog.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(390);
  expect(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  await page.screenshot({ path: 'test-results/mobile-content.png' });
  await page.keyboard.press('Escape');
  await page.screenshot({ path: 'test-results/mobile-search.png', fullPage: true });
});

test('desktop renders without external content requests', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const external: string[] = [];
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:5173')) external.push(request.url()); });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '你的資料，都在這裡。' })).toBeVisible();
  await page.screenshot({ path: 'test-results/desktop-search.png', fullPage: true });
  expect(external).toEqual([]);
});

test('mobile shows search results before the optional summary panel', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const results = await page.getByRole('region', { name: '搜尋結果' }).boundingBox();
  const summary = await page.getByRole('complementary', { name: 'AI 整理' }).boundingBox();
  expect(results!.y).toBeLessThan(summary!.y);
});
