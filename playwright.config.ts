import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';
const systemChromium = '/usr/bin/chromium';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:5173',
    browserName: 'chromium',
    launchOptions: { executablePath: process.env.CHROMIUM_PATH || (existsSync(systemChromium) ? systemChromium : undefined) },
    trace: 'retain-on-failure',
  },
  webServer: { command: 'npm run dev -- --host 0.0.0.0 --port 5173 --strictPort', url: 'http://127.0.0.1:5173', reuseExistingServer: !process.env.CI },
});
