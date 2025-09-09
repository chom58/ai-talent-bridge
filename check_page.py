#!/usr/bin/env python3
import os
from playwright.sync_api import sync_playwright

# HTMLファイルのパスを取得
html_path = os.path.abspath('index-jobseeker.html')
file_url = f'file://{html_path}'

print(f'Opening: {file_url}')

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    
    # ページを開く
    page.goto(file_url)
    page.wait_for_load_state('networkidle')
    
    # ビューポートを設定
    page.set_viewport_size({'width': 1400, 'height': 900})
    
    # スクリーンショットを撮る - ファーストビュー
    screenshot_path = 'jobseeker-firstview.png'
    page.screenshot(path=screenshot_path, full_page=False)
    print(f'Screenshot saved: {screenshot_path}')
    
    # フルページスクリーンショット
    fullpage_path = 'jobseeker-fullpage.png'
    page.screenshot(path=fullpage_path, full_page=True)
    print(f'Full page screenshot saved: {fullpage_path}')
    
    # スタイルシートが正しく読み込まれているか確認
    styles = page.evaluate('''() => {
        const link = document.querySelector('link[rel="stylesheet"]');
        return {
            href: link ? link.href : null,
            loaded: link ? link.sheet !== null : false
        };
    }''')
    print(f'Stylesheet info: {styles}')
    
    # ヒーローセクションの背景色を確認
    hero_bg = page.evaluate('''() => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const styles = window.getComputedStyle(hero);
            return {
                background: styles.background,
                backgroundColor: styles.backgroundColor,
                backgroundImage: styles.backgroundImage
            };
        }
        return null;
    }''')
    print(f'Hero background styles: {hero_bg}')
    
    # フォームの背景色を確認
    form_bg = page.evaluate('''() => {
        const form = document.querySelector('.contact-form-enhanced');
        if (form) {
            const styles = window.getComputedStyle(form);
            return {
                background: styles.background,
                backgroundColor: styles.backgroundColor
            };
        }
        return null;
    }''')
    print(f'Form background styles: {form_bg}')
    
    # エラーがあるか確認
    console_errors = []
    page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
    page.reload()
    page.wait_for_load_state('networkidle')
    
    if console_errors:
        print(f'Console errors found: {console_errors}')
    else:
        print('No console errors')
    
    # 10秒待機してブラウザを開いたままにする
    print('Browser will remain open for 10 seconds...')
    page.wait_for_timeout(10000)
    
    browser.close()
    print('Done!')