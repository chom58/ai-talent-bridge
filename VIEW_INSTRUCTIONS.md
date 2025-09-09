# AI Talent Bridge - ページ表示方法

## 🌐 index-jp.htmlを確認する方法

### 方法1: 直接ブラウザで開く（最も簡単）
```bash
# macOSの場合
open jobseeker/index-jp.html

# Windowsの場合
start jobseeker/index-jp.html

# Linuxの場合
xdg-open jobseeker/index-jp.html
```

### 方法2: ローカルサーバーで確認（推奨）
```bash
# Python3を使用
cd jobseeker
python3 -m http.server 8000

# ブラウザで以下のURLにアクセス
# http://localhost:8000/index-jp.html
```

### 方法3: npmスクリプトを使用
```bash
# プロジェクトルートで実行
npm run dev

# ブラウザで以下のURLにアクセス
# http://localhost:8001/jobseeker/index-jp.html
```

## ✅ CSS適用の確認ポイント

統合CSS（styles-consolidated.css）が正しく適用されている場合：

1. **ヘッダー**: 暗い背景色で固定表示
2. **ロゴ**: ホバー時にアニメーション
3. **言語切り替えボタン**: 丸いデザインで、アクティブなボタンが緑色
4. **ヒーローセクション**: グラデーション背景
5. **CTAボタン**: 緑色の丸いボタンでホバー時に浮き上がる効果

## 🔍 開発者ツールで確認

ブラウザで開いた後、開発者ツールで確認：

1. **Chrome/Edge**: F12 または Ctrl+Shift+I (Mac: Cmd+Option+I)
2. **Networkタブ**: styles-consolidated.cssが読み込まれているか確認
3. **Elementsタブ**: CSS変数が適用されているか確認
   - `--color-primary: #1E3A8A`
   - `--color-accent: #F59E0B`
   - `--color-success: #10B981`

## 📝 変更内容

### 実施した変更
- ✅ 17個のCSSファイル → 1個の統合CSS（styles-consolidated.css）
- ✅ 237行のインラインスタイル → 削除
- ✅ すべてのスタイルを統合CSSに集約

### 適用されたファイル
- `jobseeker/index.html` - 英語版
- `jobseeker/index-jp.html` - 日本語版（今回適用）

## 🚀 パフォーマンス改善

- **読み込み速度**: 17個のHTTPリクエスト → 1個（94%削減）
- **メンテナンス性**: 1つのCSSファイルで全体を管理
- **キャッシュ効率**: 1つのファイルをキャッシュするだけで全スタイル適用