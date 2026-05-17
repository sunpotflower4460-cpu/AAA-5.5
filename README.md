# 残心 / Zanshin

> 書いたあとにも、心がそこに残るメモ帳。  
> A note-taking app where the heart lingers, even after the writing ends.

---

## アプリ概要

「残心」は、和の美意識・間・余白・静けさを大切にした、シンプルなiOS向けメモアプリです。

大量の機能で埋めるのではなく、  
書くこと、読み返すこと、書いたあとに残る余韻を美しくすることを目指します。

---

## セットアップ

```bash
npm install
```

## 開発起動

```bash
npm run dev
```

ローカルでは表示されたURLを開き、iPhone幅を優先して確認します。

## ビルド

```bash
npm run build
```

必要に応じて、ローカルでビルド結果を確認します。

```bash
npm run preview
```

---

## MVP機能

| 機能 | 説明 |
|------|------|
| メモ一覧 | 書いたメモを静かに並べる |
| メモ作成 | 新しい言葉を置く |
| メモ編集 | 言葉を直す |
| メモ削除 | 確認してから言葉を手放す |
| 自動保存 | 入力後に静かに保存する |
| 検索 | タイトル・本文から過去の言葉を探す |
| お気に入り | 大切な言葉に小さな金の印を残す |
| localStorage保存 | まずはデバイスの中に保存する |
| iPhone向けUI | 390px前後の画面幅とsafe-areaを意識する |
| 日本語/英語文言 | 日本語を主に、英語のサブ表現を添える |

Phase 4で、作成・編集・削除・自動保存・localStorage復元・検索・お気に入り・空状態・削除確認・iPhone/PC幅表示の最終調整を確認済みです。

---

## 技術方針

- **Vite** — 高速な開発環境
- **React + TypeScript** — 型安全なコンポーネント設計
- **Tailwind CSS** — CSS変数と組み合わせ、余白と間を制御する
- **localStorage** — MVPはローカル保存から開始する
- **Capacitor（将来）** — ネイティブiOSアプリ化への備え

---

## 開発フェーズ

| フェーズ | 内容 | Cloudflareデプロイ |
|----------|------|-------------------|
| **Phase 1** | README/docsに設計を入れる | しない |
| **Phase 2** | 監査フェーズ（設計確認・微修正） | しない |
| **Phase 3** | MVPまで一気に作る | MVP完成後のみ |
| **Phase 4** | 最終調整・デバッグ・Cloudflare Pages準備 | build成功後のみ |

詳細は [docs/development-phases.md](docs/development-phases.md) を参照。

---

## Cloudflare Pages方針

Phase 3の途中ではCloudflare Pagesへデプロイしません。

MVP完成後、`npm run build` が成功し、READMEとMVP機能が揃っている場合のみ、以下の設定でCloudflare Pagesへ接続できます。

```txt
Build command: npm run build
Build output directory: dist
```

環境変数はMVPでは不要です。

手動接続する場合:

1. Cloudflare PagesでこのGitHubリポジトリを接続する。
2. Framework presetはVite、または上記のbuild設定を手動入力する。
3. build成功後、発行されたデプロイURLで表示を確認する。

このリポジトリはPhase 4で最終調整済みです。Cloudflare Pages未接続の場合は、上記設定で接続してください。

---

## ドキュメント

| ファイル | 内容 |
|----------|------|
| [docs/concept.md](docs/concept.md) | 「残心」の思想と世界観 |
| [docs/design-system.md](docs/design-system.md) | UI/UXとデザインシステム |
| [docs/mvp-spec.md](docs/mvp-spec.md) | MVP仕様 |
| [docs/development-phases.md](docs/development-phases.md) | 開発フェーズ |
| [docs/final-polish-and-deploy-phase-4.md](docs/final-polish-and-deploy-phase-4.md) | Phase 4最終調整・デバッグ・Cloudflare Pages対応レポート |
| [.github/copilot-instructions.md](.github/copilot-instructions.md) | Cloud Agent / Copilot向け作業ルール |
