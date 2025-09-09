# AI Talent Bridge バージョン管理ドキュメント

## 📌 現在使用中のバージョン
更新日: 2025-09-01

### メインサイト
- **本番環境**: `index.html` (企業向けメインページ)
- **最終更新**: Git履歴による管理

### サブサイト
- **求職者向け**: `/jobseeker/index.html` (英語版)
- **求職者向け日本語**: `/jobseeker/index-jp.html`
- **企業向け**: `/corporate/index.html`

## 📦 アーカイブ済みバージョン
以下のファイルは開発過程のバージョンであり、現在は使用されていません：

### index系バリエーション
- `index-backup.html` - 初期バックアップ
- `index-clean.html` - クリーン版
- `index-dark.html` - ダークテーマ版
- `index-design.html` - デザイン検証版
- `index-elite.html` - エリート版
- `index-elite-backup.html` - エリート版バックアップ
- `index-elite-lite.html` - エリート軽量版
- `index-fixed.html` - 修正版
- `index-geometric.html` - ジオメトリックデザイン版
- `index-jobseeker.html` - 求職者向け旧版
- `index-lite.html` - 軽量版
- `index-minimal.html` - ミニマル版
- `index-pro.html` - プロ版
- `index-v2.html` - バージョン2

## 🔧 メンテナンス方針

### 保持するファイル
1. **本番使用中**: 
   - `index.html`
   - `/jobseeker/index.html`
   - `/jobseeker/index-jp.html`
   - `/corporate/index.html`

2. **必須リソース**:
   - `/assets/` - 画像・アイコン
   - `/shared/` - 共有リソース
   - 本番で使用中のCSS/JSファイル

### アーカイブ対象
- index-*.html (バリエーション版)
- 未使用のCSSファイル
- テスト用HTMLファイル

## 📊 CSS統合計画

### 現状の問題
- jobseekerディレクトリに30以上のCSSファイル
- 重複したスタイル定義
- メンテナンス性の低下

### 統合後の構成（推奨）
```
styles/
├── core/
│   ├── reset.css        # リセットCSS
│   ├── variables.css    # CSS変数
│   └── base.css        # 基本スタイル
├── components/
│   ├── header.css      # ヘッダー
│   ├── hero.css        # ヒーローセクション
│   ├── forms.css       # フォーム
│   └── footer.css      # フッター
└── pages/
    ├── corporate.css   # 企業向けページ
    └── jobseeker.css   # 求職者向けページ
```

## 🚀 今後のアクション

1. **即時実施**
   - 不要なindex-*.htmlファイルをarchivedフォルダへ移動
   - 使用中のファイルを明確に識別

2. **短期計画**
   - CSS統合とモジュール化
   - 汎用チェックスクリプトの作成

3. **中期計画**
   - ビルドシステムの導入
   - バージョン管理の自動化

## 📝 更新履歴
- 2025-09-01: 初版作成、バージョン管理開始