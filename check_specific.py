#!/usr/bin/env python3
import os
from playwright.sync_api import sync_playwright

html_path = os.path.abspath('index-jobseeker.html')
file_url = f'file://{html_path}'

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    
    page.goto(file_url)
    page.wait_for_load_state('networkidle')
    page.set_viewport_size({'width': 1400, 'height': 900})
    
    # 各セクションの問題をチェック
    
    # 1. フォームステップの表示確認
    form_step1 = page.query_selector('#step1')
    form_step2 = page.query_selector('#step2')
    
    if form_step1:
        step1_display = page.evaluate('(el) => window.getComputedStyle(el).display', form_step1)
        print(f"Step1 display: {step1_display}")
    
    if form_step2:
        step2_display = page.evaluate('(el) => window.getComputedStyle(el).display', form_step2)
        print(f"Step2 display: {step2_display}")
    
    # 2. FAQアイテムの開閉状態を確認
    faq_items = page.query_selector_all('.faq-item')
    print(f"FAQアイテム数: {len(faq_items)}")
    
    for i, item in enumerate(faq_items[:3]):
        is_open = page.evaluate('(el) => el.hasAttribute("open")', item)
        print(f"FAQ {i+1} is open: {is_open}")
    
    # 3. Tokyo AIバッジの表示確認
    partner_badge = page.query_selector('.partner-badge-top')
    if partner_badge:
        badge_text = page.evaluate('(el) => el.textContent', partner_badge)
        print(f"Partner badge text: {badge_text}")
    
    # 4. ヒーロー機能の表示確認
    hero_features = page.query_selector_all('.feature-item')
    print(f"Hero features count: {len(hero_features)}")
    
    # 5. CSSが正しく適用されているか確認
    css_link = page.query_selector('link[href="styles-jobseeker-improved.css"]')
    if css_link:
        print("✅ Correct CSS file is linked")
    else:
        print("❌ CSS file not correctly linked")
        # 実際にリンクされているCSSを確認
        actual_css = page.query_selector('link[rel="stylesheet"]:not([href*="fonts.googleapis"])')
        if actual_css:
            href = page.evaluate('(el) => el.href', actual_css)
            print(f"Actually linked CSS: {href}")
    
    # 6. コンソールエラーの確認
    page.on("console", lambda msg: print(f"Console {msg.type}: {msg.text}"))
    page.reload()
    
    print("\nブラウザは10秒間開いたままになります...")
    page.wait_for_timeout(10000)
    
    browser.close()