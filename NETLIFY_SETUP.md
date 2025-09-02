# 🚀 Netlify連携手順

GitHubリポジトリの作成が完了しました！

## 📍 GitHubリポジトリ情報
- **URL**: https://github.com/chom58/ai-talent-bridge
- **ブランチ**: main
- **公開設定**: Public

## 🔗 Netlifyとの連携手順

### Step 1: Netlifyにログイン
1. https://app.netlify.com/ にアクセス
2. アカウントにログイン（まだの場合は無料登録）

### Step 2: 新しいサイトを作成
1. ダッシュボードで「Add new site」をクリック
2. 「Import an existing project」を選択

### Step 3: GitHubと連携
1. 「Connect to GitHub」をクリック
2. GitHubアカウントを認証（初回のみ）
3. リポジトリへのアクセスを許可

### Step 4: リポジトリを選択
1. 検索ボックスに「ai-talent-bridge」と入力
2. リポジトリ「chom58/ai-talent-bridge」を選択

### Step 5: デプロイ設定
以下の設定を確認・入力：

- **Branch to deploy**: main
- **Base directory**: （空欄のまま）
- **Build command**: （空欄のまま）
- **Publish directory**: . （ピリオドのみ）または空欄
- **Functions directory**: （空欄のまま）

### Step 6: デプロイ開始
1. 「Deploy ai-talent-bridge」ボタンをクリック
2. 1-2分待つとデプロイ完了！

## 🎉 デプロイ完了後

### 自動生成されるURL
- Netlifyが自動でURLを生成します
- 例: `https://amazing-einstein-123456.netlify.app`

### カスタムドメインの設定（オプション）
1. Site settings → Domain management
2. 「Add custom domain」をクリック
3. ドメイン名を入力（例: aitalentbridge.com）

### 自動デプロイの有効化
- GitHubにプッシュすると自動でデプロイされます
- mainブランチへの変更が即座に本番環境に反映

## 📝 今後の更新方法

```bash
# 変更をローカルで編集
cd /Users/205-000132-skoike/Claude/projects/experiments/AI\ website/jobseeker

# 変更をコミット
git add .
git commit -m "Update: 変更内容の説明"

# GitHubにプッシュ（自動でNetlifyにデプロイ）
git push origin main
```

## ✅ チェックリスト
- [ ] Netlifyアカウントでログイン
- [ ] GitHubリポジトリと連携
- [ ] デプロイ設定を確認
- [ ] 初回デプロイ成功
- [ ] サイトURLにアクセスして確認
- [ ] （オプション）カスタムドメイン設定

## 🆘 トラブルシューティング

### デプロイが失敗する場合
1. Netlifyのログを確認
2. Build settingsで「Publish directory」を `.` に設定
3. 再デプロイを実行

### 404エラーが出る場合
- _redirectsファイルが正しく配置されているか確認
- netlify.tomlの設定を確認

## 📞 サポート
問題が解決しない場合は、Netlifyのサポートまたは以下にお問い合わせください：
- GitHub Issues: https://github.com/chom58/ai-talent-bridge/issues