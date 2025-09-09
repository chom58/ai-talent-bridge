#!/usr/bin/env python3
"""
ページをブラウザで開いて確認するスクリプト
"""

import os
import sys
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

def view_page(html_file, duration=30):
    """
    指定したHTMLファイルをブラウザで開く
    
    Args:
        html_file: HTMLファイルのパス
        duration: ブラウザを開いている時間（秒）
    """
    # ファイルパスを絶対パスに変換
    file_path = Path(html_file).resolve()
    
    if not file_path.exists():
        print(f"❌ ファイルが見つかりません: {html_file}")
        return
        
    file_url = f'file://{file_path}'
    
    print(f"🌐 ブラウザで開いています: {file_path.name}")
    print(f"📍 URL: {file_url}")
    print(f"⏱️  {duration}秒間表示します...")
    print("\n" + "="*50)
    
    with sync_playwright() as p:
        # ブラウザを起動（表示モード）
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        
        # ビューポートを設定
        page.set_viewport_size({'width': 1400, 'height': 900})
        
        # ページを開く
        page.goto(file_url)
        page.wait_for_load_state('networkidle')
        
        # ページ情報を表示
        title = page.title()
        print(f"📄 ページタイトル: {title}")
        
        # CSS読み込み状況を確認
        css_info = page.evaluate('''() => {
            const links = document.querySelectorAll('link[rel="stylesheet"]');
            const cssFiles = [];
            links.forEach(link => {
                const href = link.href;
                const filename = href.split('/').pop();
                if (filename && !href.includes('fonts.googleapis')) {
                    cssFiles.push(filename);
                }
            });
            return cssFiles;
        }''')
        
        print(f"🎨 読み込まれているCSS: {', '.join(css_info)}")
        
        # 統合CSSが読み込まれているか確認
        if 'styles-consolidated.css' in css_info:
            print("✅ 統合CSS (styles-consolidated.css) が正しく読み込まれています")
        else:
            print("⚠️  統合CSSが読み込まれていません")
            
        # CSS変数が定義されているか確認
        css_vars = page.evaluate('''() => {
            const styles = getComputedStyle(document.documentElement);
            return {
                primary: styles.getPropertyValue('--color-primary'),
                accent: styles.getPropertyValue('--color-accent'),
                success: styles.getPropertyValue('--color-success')
            };
        }''')
        
        if css_vars['primary']:
            print(f"✅ CSSデザイントークンが適用されています")
            print(f"   - Primary: {css_vars['primary']}")
            print(f"   - Accent: {css_vars['accent']}")
            print(f"   - Success: {css_vars['success']}")
        
        print("\n" + "="*50)
        print("💡 ヒント:")
        print("  - Ctrl+Shift+I (Windows/Linux) または Cmd+Option+I (Mac) で開発者ツールを開けます")
        print("  - ブラウザは自動的に閉じます")
        print("  - 終了するには Ctrl+C を押してください")
        
        # 指定時間待機
        try:
            page.wait_for_timeout(duration * 1000)
        except KeyboardInterrupt:
            print("\n👋 ユーザーによって終了されました")
        
        browser.close()
        print("\n✅ 完了しました")

def main():
    """メイン処理"""
    # デフォルトでindex-jp.htmlを開く
    default_file = 'jobseeker/index-jp.html'
    
    if len(sys.argv) > 1:
        html_file = sys.argv[1]
    else:
        html_file = default_file
        print(f"📌 デフォルト: {html_file} を開きます")
        print("   他のファイルを開く場合: python view_page.py [ファイルパス]")
        print()
    
    # 表示時間（秒）
    duration = int(sys.argv[2]) if len(sys.argv) > 2 else 30
    
    view_page(html_file, duration)

if __name__ == "__main__":
    main()