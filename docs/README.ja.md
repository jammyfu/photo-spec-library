# photo-spec-library

![photo-spec-library](../.github/social-preview.png)

[English](README.en.md) · [简体中文](README.zh-CN.md) · [繁體中文（臺灣）](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

## 証明写真の公式要件を構造化データとして使う

個別の JSON または統合データを読み込みます。写真を提出する前に、発行機関の URL と確認日を確認してください。リポジトリの検証状態は受理を保証しません。

### パスポート・ビザ・試験申請用写真の要件

| → | |
| --- | --- |
| [統合データを読む](../dist/specs.json) | JSON / source |
| [個別仕様を見る](../specs/) | Browse |

未記載の値は null のままです。推測で補完しません。この更新は利用ガイドの翻訳であり、全データ項目の翻訳ではありません。

### ローカルで検証

```bash
npm test
npm run build
```

ライセンスに従って再利用・変更できます。申請時は発行機関の規則が優先されます。<br>(MIT)

[Repository README](../README.md)
