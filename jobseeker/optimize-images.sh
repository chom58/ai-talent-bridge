#!/bin/bash

# 画像最適化スクリプト
# WebP形式への変換とサイズ最適化

echo "🎨 画像の最適化を開始..."

# WebP変換コマンドが利用可能か確認
if ! command -v cwebp &> /dev/null; then
    echo "⚠️ WebP変換ツールがインストールされていません"
    echo "Macの場合: brew install webp"
    echo "画像は手動で最適化してください"
    exit 1
fi

# PNGファイルをWebPに変換
for file in images/*.png; do
    if [ -f "$file" ]; then
        filename=$(basename "$file" .png)
        echo "変換中: $filename.png → $filename.webp"
        cwebp -q 80 "$file" -o "images/$filename.webp"
    fi
done

echo "✅ 画像の最適化が完了しました"