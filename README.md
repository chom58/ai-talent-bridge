# Value Create キャリア支援サービス

Tokyo AI Community公式パートナー - AI人材マッチングプラットフォーム

## 📋 プロジェクト概要
Value Create キャリア支援サービスは、AIエンジニアと企業を繋ぐマッチングプラットフォームです。
Tokyo AI Communityの公式パートナーとして、求職者と採用企業の両方に最適なソリューションを提供します。

## 🎯 ターゲット
### 求職者向け (/jobseeker)
- AIエンジニア、MLエンジニア、データサイエンティスト
- 日本での就職を希望する外国人エンジニア
- キャリアアップを目指すジュニア〜シニアレベルの技術者

### 企業向け (/corporate)
- AI人材の採用を検討している企業
- 技術チームの拡張を計画している企業
- グローバル人材を求めている企業

## 🏗️ ディレクトリ構造
```
AI website/
├── index.html              # ルートページ（選択画面）
├── netlify.toml           # Netlifyデプロイ設定
│
├── jobseeker/             # 求職者向けLP
│   ├── index.html         # メインページ
│   ├── translations.js    # 多言語対応
│   ├── styles-consolidated.css
│   └── images/
│
├── corporate/             # 企業向けLP
│   ├── index.html         # メインページ
│   ├── translations.js    # 多言語対応
│   ├── styles-consolidated.css
│   └── images/
│
└── shared/               # 共通リソース
    ├── css/              # 共通スタイルシート
    ├── js/               # 共通JavaScript
    │   ├── language-switcher.js
    │   └── mobile-menu.js
    ├── images/           # 共通画像
    └── fonts/           # フォントファイル
```

## 🚀 主要機能
- **多言語対応**: 日本語/英語切り替え
- **レスポンシブデザイン**: モバイル〜デスクトップ対応
- **高速パフォーマンス**: 最適化されたアセット配信
- **アクセシビリティ**: WCAG準拠
- **SEO最適化**: 構造化データとメタタグ

## 💻 技術スタック
- **フロントエンド**: HTML5, CSS3, JavaScript (ES6+)
- **スタイリング**: カスタムCSS, Tailwind CSS (CDN)
- **フォント**: Google Fonts (Inter, Noto Sans JP)
- **デプロイ**: Netlify
- **バージョン管理**: Git

## 🎨 デザインシステム
### カラーパレット
- **プライマリー**: Purple Gradient (#667eea → #764ba2)
- **セカンダリー**: Dark (#1a1a1a)
- **アクセント**: Gold (#F59E0B)
- **背景**: White (#FFFFFF)
- **テキスト**: Gray Scale

### タイポグラフィ
- **見出し**: Inter (weight: 700-900)
- **本文**: Inter, Noto Sans JP (weight: 300-600)

## 🔧 セットアップ
### ローカル開発
```bash
# リポジトリをクローン
git clone [repository-url]

# ディレクトリに移動
cd "AI website"

# ローカルサーバーを起動
# Python 3の場合
python -m http.server 8000

# Node.jsの場合
npx http-server
```

### デプロイ（Netlify）
1. Netlifyアカウントにログイン
2. GitHubリポジトリと連携
3. デプロイ設定は`netlify.toml`を参照
4. 自動デプロイが有効化される

## 📱 対応環境
### ブラウザ
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- モバイルブラウザ（iOS Safari, Chrome Mobile）

### デバイス
- Desktop: 1024px以上
- Tablet: 768px - 1024px
- Mobile: 320px - 768px

## 🔍 SEO対策
- セマンティックHTML構造
- 適切なメタタグとOGP設定
- sitemap.xml（各ディレクトリ内）
- robots.txt設定
- Core Web Vitals最適化

## 📈 パフォーマンス最適化
- 画像の遅延読み込み
- CSSの最小化（minified版）
- JavaScriptの非同期読み込み
- CDNの活用
- ブラウザキャッシュの設定

## 🚦 今後の改善計画
- [ ] フォーム送信のバックエンド実装
- [ ] Google Analytics 4の導入
- [ ] A/Bテスト機能の実装
- [ ] PWA対応
- [ ] WebP画像形式への移行
- [ ] ダークモード対応
- [ ] アクセシビリティの更なる向上

## 📞 お問い合わせ
**Value Create Inc.**
- Website: https://value-create.jp
- Email: career-support@value-create.jp
- Partner: Tokyo AI Community

## 📜 ライセンス
© 2024 Value Create Inc. All Rights Reserved.

## 🤝 貢献
プルリクエストは歓迎します。大きな変更の場合は、まずissueを開いて変更内容を議論してください。

## 📝 更新履歴
- 2024-09-05: ディレクトリ構造を再設計、企業向けLP追加
- 2024-09-04: 求職者向けLP完成、多言語対応実装
- 2024-09-01: プロジェクト開始