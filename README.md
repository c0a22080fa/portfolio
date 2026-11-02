# Portfolio

Astro + Markdown（MDX）で作ったポートフォリオサイトです。
作品や記事はファイルを1つ追加するだけで一覧と詳細ページに反映されます。

## 使い方

```bash
npm install
npm run dev      # http://localhost:4321 で確認
npm run build    # dist/ に静的ファイルを生成
npm run preview  # ビルド結果の確認
```

## ファイル構成

```
src/
├── data/                 # 短いデータ（YAML / JSON）
│   ├── profile.json      # 名前・自己紹介・プロフィール・連絡先・SNS
│   ├── skills.yaml       # スキル
│   ├── experience.yaml   # 経歴
│   ├── activities.yaml   # 活動
│   └── publications.yaml # 発表・論文
├── content/
│   ├── works/            # 制作実績（1作品 = 1ファイル、.mdx）
│   └── research/         # 研究テーマ（theme.md）
├── components/           # 部品（カード、スライド埋め込みなど）
├── layouts/Base.astro    # 共通レイアウト（head、ナビ、スクリプト）
├── pages/
│   ├── index.astro       # トップページ
│   └── works/[id].astro  # 作品詳細ページ（自動生成）
├── styles/global.css     # 配色・書体などのデザイントークン
└── content.config.ts     # 各データの項目定義（ここを見れば書ける項目が分かる）
public/
├── images/               # 画像（/images/... で参照）
└── slides/               # PDF スライド
```

## 編集のしかた

### 基本情報
`src/data/profile.json` を書き換えます。名前、肩書き、自己紹介、プロフィール表、連絡先、SNS リンクはすべてここです。

### 作品を追加する
`src/content/works/` に `.mdx` ファイルを1つ作ります。ファイル名が URL になります（`paperstack.mdx` → `/works/paperstack/`）。

```mdx
---
title: 作品名
number: "04"
category: Web App
year: "2026"
summary: 一覧カードと詳細ページ冒頭に出る一言。
period: 2026.01 — 2026.03
role: 個人開発
tech: [Next.js, TypeScript]
thumbnail: /images/works/sample.png
featured: false        # true にすると一覧で大きく表示（1件だけ）
order: 4               # 並び順
links:
  github: https://github.com/...
  demo: https://...
  slides: https://speakerdeck.com/...
---
import Figure from '../../components/Figure.astro';
import SlideEmbed from '../../components/SlideEmbed.astro';
import Stats from '../../components/Stats.astro';

## 背景と課題
本文は Markdown で書けます。`##` の見出しには 01, 02… の番号が自動で付きます。

## 設計と技術選定
<Figure src="/images/works/sample-fig.png" alt="構成図" caption="図1：全体構成" />

## 結果
<Stats items={[{ value: '100', label: 'Lighthouse スコア' }]} />
```

下書きにしたい場合は `draft: true` を付けると公開されません。

### スライドを埋め込む
作品ページ（MDX）の中で `SlideEmbed` を使います。

```mdx
{/* Speaker Deck：スライドページの「Embed」で表示される player URL を src に */}
<SlideEmbed provider="speakerdeck" src="https://speakerdeck.com/player/xxxx" link="https://speakerdeck.com/you/xxxx" title="発表タイトル" caption="補足" />

{/* Google スライド：ファイル → 共有 → ウェブに公開 → 埋め込み の URL を src に */}
<SlideEmbed provider="google" src="https://docs.google.com/presentation/d/xxxx/embed?start=false&loop=false" title="発表タイトル" />

{/* PDF：public/slides/ に置いたファイル */}
<SlideEmbed provider="pdf" src="/slides/xxxx.pdf" title="発表タイトル" />
```

### 研究・活動・経歴・スキル
- 研究テーマ：`src/content/research/theme.md`（frontmatter にテーマ名・研究室・キーワード、本文に説明）
- 発表・論文：`src/data/publications.yaml`
- 活動：`src/data/activities.yaml`
- 経歴：`src/data/experience.yaml`
- スキル：`src/data/skills.yaml`

いずれも `order` の小さい順に並びます。

### 画像
`public/images/` に置き、`/images/...` で参照します。画像が無い項目は淡い青の枠が表示されるので、後から差し替えられます。

### 色・書体
`src/styles/global.css` の先頭にある CSS 変数を変更すると全体に反映されます。

## 公開する

### GitHub Pages
1. `astro.config.mjs` の `site` を `https://<ユーザー名>.github.io`、`base` を `/<リポジトリ名>` にする
   （リポジトリ名を `<ユーザー名>.github.io` にする場合は `base` は不要）
2. GitHub にリポジトリを作成して push
3. リポジトリの Settings → Pages → Source を「GitHub Actions」にする
4. 以降、main に push するたびに自動で公開されます（`.github/workflows/deploy.yml`）

### Vercel / Cloudflare Pages
リポジトリを連携するだけで自動的に Astro と認識されます。`astro.config.mjs` の `site` を公開 URL に変更してください。
