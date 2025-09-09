/**
 * Playwright設定ファイル
 * @see https://playwright.dev/docs/test-configuration
 */

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // テストディレクトリ
  testDir: './tests',
  
  // テストマッチパターン
  testMatch: '**/*.test.js',
  
  // 並列実行
  fullyParallel: true,
  
  // CI環境での再試行回数
  retries: process.env.CI ? 2 : 0,
  
  // 並列ワーカー数
  workers: process.env.CI ? 1 : undefined,
  
  // レポーター設定
  reporter: [
    ['html', { outputFolder: 'test-results/html' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list']
  ],
  
  // 共通設定
  use: {
    // ベースURL（ローカルファイルなので不要）
    // baseURL: 'http://127.0.0.1:8001',
    
    // スクリーンショット設定
    screenshot: 'only-on-failure',
    
    // ビデオ録画設定
    video: 'retain-on-failure',
    
    // トレース設定
    trace: 'on-first-retry',
    
    // アクションのタイムアウト
    actionTimeout: 10000,
    
    // ナビゲーションのタイムアウト
    navigationTimeout: 30000,
  },

  // プロジェクト設定（異なるブラウザでテスト）
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // 出力フォルダ
  outputDir: 'test-results/',

  // Webサーバー設定（必要に応じて）
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://127.0.0.1:8001',
  //   reuseExistingServer: !process.env.CI,
  // },
});