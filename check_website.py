#!/usr/bin/env python3
"""
AI Talent Bridge ウェブサイトチェッカー
汎用的なウェブサイトチェックツール
"""

import os
import sys
import json
import argparse
from datetime import datetime
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError

class WebsiteChecker:
    """ウェブサイトの品質チェックを実行するクラス"""
    
    def __init__(self, file_path, output_dir="check_results"):
        """
        初期化
        
        Args:
            file_path: チェック対象のHTMLファイルパス
            output_dir: 結果出力ディレクトリ
        """
        self.file_path = Path(file_path).resolve()
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self.file_url = f'file://{self.file_path}'
        self.timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.results = {
            'file': str(self.file_path.name),
            'url': self.file_url,
            'timestamp': self.timestamp,
            'checks': {}
        }
        
    def run_all_checks(self, headless=True):
        """すべてのチェックを実行"""
        print(f"🔍 チェック開始: {self.file_path.name}")
        print(f"📁 URL: {self.file_url}")
        
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=headless)
            page = browser.new_page()
            
            # ビューポート設定
            viewports = [
                {'name': 'desktop', 'width': 1920, 'height': 1080},
                {'name': 'tablet', 'width': 768, 'height': 1024},
                {'name': 'mobile', 'width': 375, 'height': 667}
            ]
            
            try:
                # ページ読み込み
                page.goto(self.file_url)
                page.wait_for_load_state('networkidle', timeout=30000)
                
                # 1. ページ基本情報
                self.check_page_info(page)
                
                # 2. パフォーマンス測定
                self.check_performance(page)
                
                # 3. SEOチェック
                self.check_seo(page)
                
                # 4. アクセシビリティチェック
                self.check_accessibility(page)
                
                # 5. CSS/JSエラーチェック
                self.check_console_errors(page)
                
                # 6. レスポンシブデザインチェック
                for viewport in viewports:
                    self.check_responsive(page, viewport)
                
                # 7. フォームチェック
                self.check_forms(page)
                
                # 8. リンクチェック
                self.check_links(page)
                
                # 9. 画像チェック
                self.check_images(page)
                
                # 結果を保存
                self.save_results()
                
            except TimeoutError:
                print("❌ ページの読み込みがタイムアウトしました")
                self.results['error'] = 'Page load timeout'
            except Exception as e:
                print(f"❌ エラー発生: {e}")
                self.results['error'] = str(e)
            finally:
                browser.close()
                
        self.print_summary()
        
    def check_page_info(self, page):
        """ページ基本情報の取得"""
        info = page.evaluate('''() => {
            return {
                title: document.title,
                charset: document.characterSet,
                language: document.documentElement.lang,
                doctype: document.doctype ? document.doctype.name : null
            }
        }''')
        self.results['checks']['page_info'] = info
        print(f"✅ ページ情報: タイトル='{info['title']}', 言語={info['language']}")
        
    def check_performance(self, page):
        """パフォーマンス測定"""
        metrics = page.evaluate('''() => {
            const timing = performance.timing;
            return {
                domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
                loadComplete: timing.loadEventEnd - timing.navigationStart,
                resources: performance.getEntriesByType('resource').length
            }
        }''')
        self.results['checks']['performance'] = metrics
        print(f"⚡ パフォーマンス: DOM={metrics['domContentLoaded']}ms, Load={metrics['loadComplete']}ms")
        
    def check_seo(self, page):
        """SEO要素のチェック"""
        seo = page.evaluate('''() => {
            const meta = {};
            document.querySelectorAll('meta').forEach(tag => {
                const name = tag.getAttribute('name') || tag.getAttribute('property');
                if (name) meta[name] = tag.getAttribute('content');
            });
            
            return {
                meta_tags: meta,
                h1_count: document.querySelectorAll('h1').length,
                canonical: document.querySelector('link[rel="canonical"]')?.href,
                robots: meta['robots'] || 'not set'
            }
        }''')
        self.results['checks']['seo'] = seo
        print(f"🔍 SEO: H1タグ={seo['h1_count']}個, robots={seo['robots']}")
        
    def check_accessibility(self, page):
        """アクセシビリティチェック"""
        a11y = page.evaluate('''() => {
            const images = document.querySelectorAll('img');
            const buttons = document.querySelectorAll('button');
            const links = document.querySelectorAll('a');
            const forms = document.querySelectorAll('form');
            
            let imagesWithoutAlt = 0;
            images.forEach(img => {
                if (!img.alt) imagesWithoutAlt++;
            });
            
            let buttonsWithoutText = 0;
            buttons.forEach(btn => {
                if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
                    buttonsWithoutText++;
                }
            });
            
            return {
                images_total: images.length,
                images_without_alt: imagesWithoutAlt,
                buttons_total: buttons.length,
                buttons_without_text: buttonsWithoutText,
                links_total: links.length,
                forms_total: forms.length,
                has_lang_attribute: !!document.documentElement.lang
            }
        }''')
        self.results['checks']['accessibility'] = a11y
        
        if a11y['images_without_alt'] > 0:
            print(f"⚠️  アクセシビリティ: {a11y['images_without_alt']}個の画像にalt属性がありません")
        else:
            print(f"✅ アクセシビリティ: すべての画像にalt属性があります")
            
    def check_console_errors(self, page):
        """コンソールエラーのチェック"""
        console_messages = []
        page.on("console", lambda msg: console_messages.append({
            'type': msg.type,
            'text': msg.text
        }))
        
        # ページリロードしてエラーを収集
        page.reload()
        page.wait_for_load_state('networkidle')
        
        errors = [msg for msg in console_messages if msg['type'] == 'error']
        warnings = [msg for msg in console_messages if msg['type'] == 'warning']
        
        self.results['checks']['console'] = {
            'errors': errors,
            'warnings': warnings,
            'error_count': len(errors),
            'warning_count': len(warnings)
        }
        
        if errors:
            print(f"❌ コンソール: {len(errors)}個のエラーが検出されました")
        else:
            print(f"✅ コンソール: エラーなし")
            
    def check_responsive(self, page, viewport):
        """レスポンシブデザインのチェック"""
        page.set_viewport_size({'width': viewport['width'], 'height': viewport['height']})
        
        # スクリーンショットを撮影
        screenshot_name = f"{self.file_path.stem}_{viewport['name']}_{self.timestamp}.png"
        screenshot_path = self.output_dir / screenshot_name
        page.screenshot(path=str(screenshot_path))
        
        # オーバーフローチェック
        overflow = page.evaluate('''() => {
            const body = document.body;
            const html = document.documentElement;
            return {
                horizontal_overflow: body.scrollWidth > window.innerWidth,
                vertical_scroll_height: Math.max(
                    body.scrollHeight, body.offsetHeight,
                    html.clientHeight, html.scrollHeight, html.offsetHeight
                )
            }
        }''')
        
        if viewport['name'] not in self.results['checks']:
            self.results['checks']['responsive'] = {}
        
        self.results['checks']['responsive'][viewport['name']] = {
            'viewport': viewport,
            'screenshot': str(screenshot_name),
            'overflow': overflow
        }
        
        status = "⚠️ 横スクロール発生" if overflow['horizontal_overflow'] else "✅"
        print(f"📱 {viewport['name']}: {status} (スクリーンショット: {screenshot_name})")
        
    def check_forms(self, page):
        """フォーム要素のチェック"""
        forms = page.evaluate('''() => {
            const forms = document.querySelectorAll('form');
            const results = [];
            
            forms.forEach((form, index) => {
                const inputs = form.querySelectorAll('input, textarea, select');
                const required = form.querySelectorAll('[required]');
                const labels = form.querySelectorAll('label');
                
                results.push({
                    index: index,
                    action: form.action || 'not set',
                    method: form.method || 'get',
                    inputs_count: inputs.length,
                    required_count: required.length,
                    labels_count: labels.length
                });
            });
            
            return results;
        }''')
        
        self.results['checks']['forms'] = forms
        print(f"📝 フォーム: {len(forms)}個のフォームを検出")
        
    def check_links(self, page):
        """リンクのチェック"""
        links = page.evaluate('''() => {
            const links = document.querySelectorAll('a');
            const results = {
                total: links.length,
                external: 0,
                internal: 0,
                no_href: 0,
                mailto: 0,
                tel: 0
            };
            
            links.forEach(link => {
                const href = link.href;
                if (!href || href === '#') {
                    results.no_href++;
                } else if (href.startsWith('http://') || href.startsWith('https://')) {
                    if (href.includes(window.location.hostname)) {
                        results.internal++;
                    } else {
                        results.external++;
                    }
                } else if (href.startsWith('mailto:')) {
                    results.mailto++;
                } else if (href.startsWith('tel:')) {
                    results.tel++;
                }
            });
            
            return results;
        }''')
        
        self.results['checks']['links'] = links
        print(f"🔗 リンク: 合計{links['total']}個 (内部:{links['internal']}, 外部:{links['external']})")
        
    def check_images(self, page):
        """画像のチェック"""
        images = page.evaluate('''() => {
            const images = document.querySelectorAll('img');
            const results = {
                total: images.length,
                lazy_loading: 0,
                missing_src: 0,
                broken: []
            };
            
            images.forEach((img, index) => {
                if (img.loading === 'lazy') results.lazy_loading++;
                if (!img.src) results.missing_src++;
                if (!img.complete || img.naturalHeight === 0) {
                    results.broken.push({
                        index: index,
                        src: img.src,
                        alt: img.alt
                    });
                }
            });
            
            return results;
        }''')
        
        self.results['checks']['images'] = images
        
        if images['broken']:
            print(f"⚠️  画像: {len(images['broken'])}個の画像が読み込めません")
        else:
            print(f"✅ 画像: {images['total']}個すべて正常")
            
    def save_results(self):
        """結果をJSONファイルに保存"""
        result_file = self.output_dir / f"check_{self.file_path.stem}_{self.timestamp}.json"
        with open(result_file, 'w', encoding='utf-8') as f:
            json.dump(self.results, f, ensure_ascii=False, indent=2)
        print(f"\n💾 結果を保存: {result_file}")
        
    def print_summary(self):
        """チェック結果のサマリーを表示"""
        print("\n" + "="*50)
        print("📊 チェック結果サマリー")
        print("="*50)
        
        if 'error' in self.results:
            print(f"❌ エラー: {self.results['error']}")
            return
            
        checks = self.results['checks']
        
        # 問題の数をカウント
        issues = []
        
        if 'console' in checks and checks['console']['error_count'] > 0:
            issues.append(f"コンソールエラー: {checks['console']['error_count']}個")
            
        if 'accessibility' in checks and checks['accessibility']['images_without_alt'] > 0:
            issues.append(f"alt属性なし画像: {checks['accessibility']['images_without_alt']}個")
            
        if 'images' in checks and checks['images']['broken']:
            issues.append(f"読み込めない画像: {len(checks['images']['broken'])}個")
            
        if issues:
            print("⚠️  検出された問題:")
            for issue in issues:
                print(f"  - {issue}")
        else:
            print("✅ すべてのチェックに合格しました！")
            
        print("\n📁 詳細な結果は check_results/ ディレクトリを確認してください")

def main():
    """メイン処理"""
    parser = argparse.ArgumentParser(description='AI Talent Bridgeウェブサイトチェッカー')
    parser.add_argument('file', help='チェック対象のHTMLファイル')
    parser.add_argument('--show-browser', action='store_true', help='ブラウザを表示する')
    parser.add_argument('--output-dir', default='check_results', help='結果出力ディレクトリ')
    
    args = parser.parse_args()
    
    # ファイルの存在確認
    if not os.path.exists(args.file):
        print(f"❌ ファイルが見つかりません: {args.file}")
        sys.exit(1)
        
    # チェッカーを実行
    checker = WebsiteChecker(args.file, args.output_dir)
    checker.run_all_checks(headless=not args.show_browser)

if __name__ == "__main__":
    main()