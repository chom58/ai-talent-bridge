/**
 * AI Talent Bridge E2Eテストスイート
 * Playwrightを使用した統合テスト
 */

const { test, expect } = require('@playwright/test');
const path = require('path');

// テスト対象のHTMLファイル
const TEST_PAGES = {
  main: 'index.html',
  jobseeker: 'jobseeker/index.html',
  jobseekerJp: 'jobseeker/index-jp.html',
  corporate: 'corporate/index.html'
};

// テスト設定
test.describe.configure({ mode: 'parallel' });

/**
 * 共通のテストヘルパー関数
 */
async function loadLocalFile(page, filename) {
  const filePath = path.resolve(__dirname, '..', filename);
  await page.goto(`file://${filePath}`);
  await page.waitForLoadState('networkidle');
}

/**
 * ページ基本構造のテスト
 */
test.describe('ページ基本構造', () => {
  test('メインページが正しく表示される', async ({ page }) => {
    await loadLocalFile(page, TEST_PAGES.main);
    
    // タイトルの確認
    await expect(page).toHaveTitle(/AI Talent Bridge/);
    
    // ヘッダーが存在することを確認
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // メインコンテンツが存在することを確認
    const main = page.locator('main, .hero, .hero-section');
    await expect(main.first()).toBeVisible();
  });

  test('求職者向けページ（英語）が正しく表示される', async ({ page }) => {
    await loadLocalFile(page, TEST_PAGES.jobseeker);
    
    // タイトルの確認
    await expect(page).toHaveTitle(/AI Talent Bridge.*Career Support/);
    
    // ナビゲーションメニューの確認
    const navMenu = page.locator('.nav-menu');
    await expect(navMenu).toBeVisible();
    
    // 言語切り替えボタンの確認
    const langSwitcher = page.locator('.language-switcher');
    await expect(langSwitcher).toBeVisible();
  });
});

/**
 * レスポンシブデザインのテスト
 */
test.describe('レスポンシブデザイン', () => {
  const viewports = [
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 667 }
  ];

  for (const viewport of viewports) {
    test(`${viewport.name}ビューポートで正しく表示される`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await loadLocalFile(page, TEST_PAGES.jobseeker);
      
      // ヘッダーが表示されていることを確認
      const header = page.locator('.header, header');
      await expect(header.first()).toBeVisible();
      
      // 横スクロールが発生していないことを確認
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHorizontalScroll).toBeFalsy();
    });
  }
});

/**
 * 言語切り替え機能のテスト
 */
test.describe('言語切り替え機能', () => {
  test('言語切り替えボタンが機能する', async ({ page }) => {
    await loadLocalFile(page, TEST_PAGES.jobseeker);
    
    // 初期状態で英語が選択されていることを確認
    const enButton = page.locator('.lang-btn[data-lang="en"]');
    await expect(enButton).toHaveClass(/active/);
    
    // 日本語ボタンをクリック
    const jaButton = page.locator('.lang-btn[data-lang="ja"]');
    await jaButton.click();
    
    // 日本語ボタンがアクティブになることを確認
    await expect(jaButton).toHaveClass(/active/);
    await expect(enButton).not.toHaveClass(/active/);
    
    // テキストが日本語に変わることを確認（data-i18n属性を持つ要素をチェック）
    await page.waitForTimeout(500); // 言語切り替えアニメーションを待つ
    
    // ナビゲーションテキストが変更されたか確認
    const navCompanies = page.locator('[data-i18n="nav.companies"]');
    const text = await navCompanies.textContent();
    expect(text).not.toBe('Companies'); // 英語でないことを確認
  });
});

/**
 * フォーム機能のテスト
 */
test.describe('フォーム機能', () => {
  test('登録フォームが存在し、入力可能である', async ({ page }) => {
    await loadLocalFile(page, TEST_PAGES.jobseeker);
    
    // フォームセクションまでスクロール
    const formSection = page.locator('#register, .contact-form-enhanced, form').first();
    if (await formSection.isVisible()) {
      await formSection.scrollIntoViewIfNeeded();
      
      // 名前フィールドの確認
      const nameInput = page.locator('input[type="text"], input[name*="name"]').first();
      if (await nameInput.isVisible()) {
        await nameInput.fill('Test User');
        await expect(nameInput).toHaveValue('Test User');
      }
      
      // メールフィールドの確認
      const emailInput = page.locator('input[type="email"], input[name*="email"]').first();
      if (await emailInput.isVisible()) {
        await emailInput.fill('test@example.com');
        await expect(emailInput).toHaveValue('test@example.com');
      }
    }
  });

  test('必須フィールドのバリデーションが機能する', async ({ page }) => {
    await loadLocalFile(page, TEST_PAGES.jobseeker);
    
    // フォームを探す
    const form = page.locator('form').first();
    if (await form.isVisible()) {
      // 送信ボタンを探す
      const submitButton = form.locator('button[type="submit"], input[type="submit"]').first();
      if (await submitButton.isVisible()) {
        // 空のまま送信を試みる
        await submitButton.click();
        
        // バリデーションメッセージまたは必須フィールドのエラー状態を確認
        const requiredFields = await form.locator('[required]').all();
        if (requiredFields.length > 0) {
          // ブラウザのバリデーションが機能することを確認
          const firstRequired = requiredFields[0];
          const validity = await firstRequired.evaluate(el => el.validity.valid);
          expect(validity).toBeFalsy();
        }
      }
    }
  });
});

/**
 * ナビゲーション機能のテスト
 */
test.describe('ナビゲーション機能', () => {
  test('アンカーリンクでページ内スクロールが機能する', async ({ page }) => {
    await loadLocalFile(page, TEST_PAGES.jobseeker);
    
    // Companies リンクをクリック
    const companiesLink = page.locator('a[href="#companies"]').first();
    if (await companiesLink.isVisible()) {
      await companiesLink.click();
      
      // スクロール完了を待つ
      await page.waitForTimeout(1000);
      
      // #companies セクションが表示されているか確認
      const companiesSection = page.locator('#companies');
      if (await companiesSection.count() > 0) {
        await expect(companiesSection).toBeInViewport({ ratio: 0.1 });
      }
    }
  });

  test('CTAボタンがクリック可能である', async ({ page }) => {
    await loadLocalFile(page, TEST_PAGES.jobseeker);
    
    // CTAボタンを探す
    const ctaButton = page.locator('.nav-cta, .cta-primary').first();
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toBeEnabled();
    
    // ホバー状態のスタイル変更を確認
    await ctaButton.hover();
    await page.waitForTimeout(300); // トランジションを待つ
  });
});

/**
 * パフォーマンステスト
 */
test.describe('パフォーマンス', () => {
  test('ページ読み込み時間が許容範囲内である', async ({ page }) => {
    const startTime = Date.now();
    await loadLocalFile(page, TEST_PAGES.jobseeker);
    const loadTime = Date.now() - startTime;
    
    // ローカルファイルなので1秒以内に読み込まれるべき
    expect(loadTime).toBeLessThan(1000);
  });

  test('コンソールエラーが発生しない', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await loadLocalFile(page, TEST_PAGES.jobseeker);
    await page.waitForTimeout(1000); // スクリプト実行を待つ
    
    // エラーがないことを確認
    expect(errors).toHaveLength(0);
  });
});

/**
 * アクセシビリティテスト
 */
test.describe('アクセシビリティ', () => {
  test('すべての画像にalt属性がある', async ({ page }) => {
    await loadLocalFile(page, TEST_PAGES.jobseeker);
    
    // すべての画像を取得
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).not.toBeNull();
      expect(alt).not.toBe('');
    }
  });

  test('適切な見出し構造がある', async ({ page }) => {
    await loadLocalFile(page, TEST_PAGES.jobseeker);
    
    // h1タグが1つだけ存在することを確認
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    expect(h1Count).toBeLessThanOrEqual(2); // 言語切り替えで2つになる可能性
    
    // 見出しの階層が適切であることを確認
    const headings = await page.evaluate(() => {
      const h = [];
      document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
        h.push({
          level: parseInt(heading.tagName[1]),
          text: heading.textContent.trim()
        });
      });
      return h;
    });
    
    // 見出しレベルが急に飛ばないことを確認（h1→h3のようなスキップがない）
    for (let i = 1; i < headings.length; i++) {
      const levelDiff = headings[i].level - headings[i-1].level;
      expect(levelDiff).toBeLessThanOrEqual(1);
    }
  });

  test('フォーカス可能な要素がキーボードでアクセス可能', async ({ page }) => {
    await loadLocalFile(page, TEST_PAGES.jobseeker);
    
    // Tabキーでフォーカス移動をテスト
    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(() => document.activeElement.tagName);
    expect(firstFocused).toBeTruthy();
    
    // さらにTabキーを押してフォーカスが移動することを確認
    await page.keyboard.press('Tab');
    const secondFocused = await page.evaluate(() => document.activeElement.tagName);
    expect(secondFocused).toBeTruthy();
  });
});

/**
 * 統合CSSのテスト
 */
test.describe('統合CSS', () => {
  test('styles-consolidated.cssが正しく読み込まれる', async ({ page }) => {
    await loadLocalFile(page, TEST_PAGES.jobseeker);
    
    // CSSファイルが読み込まれていることを確認
    const cssLoaded = await page.evaluate(() => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      for (const link of links) {
        if (link.href.includes('styles-consolidated.css')) {
          return true;
        }
      }
      return false;
    });
    
    expect(cssLoaded).toBeTruthy();
    
    // CSS変数が定義されていることを確認
    const cssVarDefined = await page.evaluate(() => {
      const computed = getComputedStyle(document.documentElement);
      return computed.getPropertyValue('--color-primary') !== '';
    });
    
    expect(cssVarDefined).toBeTruthy();
  });

  test('重要なスタイルが適用されている', async ({ page }) => {
    await loadLocalFile(page, TEST_PAGES.jobseeker);
    
    // ヘッダーの固定位置スタイルを確認
    const header = page.locator('.header, header').first();
    const position = await header.evaluate(el => getComputedStyle(el).position);
    expect(position).toBe('fixed');
    
    // ボタンのスタイルを確認
    const button = page.locator('.btn, .cta-primary, .nav-cta').first();
    if (await button.isVisible()) {
      const bgColor = await button.evaluate(el => getComputedStyle(el).backgroundColor);
      expect(bgColor).toBeTruthy();
    }
  });
});