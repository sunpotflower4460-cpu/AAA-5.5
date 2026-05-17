# 残心 / Zanshin Phase 2 Audit

## 監査日

2026-05-17

## 監査対象

- README.md
- docs/concept.md
- docs/design-system.md
- docs/mvp-spec.md
- docs/development-phases.md
- .github/copilot-instructions.md

---

## 1. コンセプト監査

判定: Needs Fix

確認内容:
- アプリ名は「残心 / Zanshin」として統一されていた。
- 一言コンセプト「書いたあとにも、心がそこに残るメモ帳」は README.md に明記されていた。
- 「残心」「間」「余白」は中核思想として整理され、機能追加より静かな writing experience を優先していた。
- 海外向け表現は一部あったが、指定された英語キーワードが不足していた。

修正した内容:
- README.md の海外向け表現を、Japanese minimalism / Zen-inspired writing / Wabi-sabi / Mindful notes / Calm journaling / Write with stillness / Saved in stillness に整理した。
- docs/concept.md に海外にも伝わる補助語彙を追加し、日本語の「残心」「間」「余白」が芯であることを明記した。

---

## 2. デザイン監査

判定: Needs Fix

確認内容:
- 和風要素は過剰ではなく、現代和・静けさ・意味のあるモチーフとして整理されていた。
- 黄金比スケール、カラーパレット、行間、FABサイズなどの基本数値は明記されていた。
- iPhone-first 方針はあったが、タップ領域・キーボード表示・safe-area の具体性が不足していた。
- 和紙・墨・金箔の扱いは色として定義されていたが、モチーフとしての使い方が弱かった。

修正した内容:
- docs/design-system.md に和紙・墨・金箔の意味と使い方を追記した。
- docs/design-system.md に iPhone-first UI方針を追加し、375px幅、44pxタップ領域、55px FAB、safe-area、キーボード表示時の方針を明記した。

---

## 3. MVP範囲監査

判定: Needs Fix

確認内容:
- メモ一覧、作成、編集、削除、自動保存、検索、お気に入り、ローカル保存、iPhone向けUIはMVPに含まれていた。
- ログイン、クラウド同期、AI機能、課金、Markdown完全対応、複雑なタグ管理、共同編集、App Store申請、Cloudflare途中デプロイはMVP外として整理されていた。
- データ構造はシンプルで、localStorage から開始し IndexedDB 移行を想定していた。
- お気に入りフィルタが任意扱いで、PWA / Capacitor 化やキーボード表示時の方針が不足していた。

修正した内容:
- docs/mvp-spec.md でお気に入りフィルタをMVP内の仕様として明確化した。
- docs/mvp-spec.md に Webアプリ開始、将来のPWA / Capacitor化、iPhoneキーボード表示時の編集方針を追記した。

---

## 4. 開発フェーズ監査

判定: Needs Fix

確認内容:
- Phase 1: README/docsに設計を入れる、Phase 2: 監査、Phase 3: MVP実装の流れは明確だった。
- Phase 3完了前にCloudflareへデプロイしないルールは明記されていた。
- 将来拡張候補はMVPと分離されていた。
- Phase 1 / Phase 2 のステータスとPhase 2完了条件が現状に合っていなかった。

修正した内容:
- docs/development-phases.md で Phase 1 を完了、Phase 2 を実施中に更新した。
- docs/development-phases.md に Phase 2 ではMVP本体を実装しないこと、Phase 2完了条件、MVP完成前のCloudflareデプロイ禁止を追記した。

---

## 5. Cloud Agent指示監査

判定: Needs Fix

確認内容:
- プロジェクト目的、多機能化しすぎない方針、余白・静けさ・iPhone-first は明記されていた。
- Phase 1 / Phase 2 / Phase 3 の作業範囲とCloudflareデプロイ禁止は概ね明確だった。
- 実装時の技術方針は簡潔に整理されていた。
- Phase 2でMVP実装しないこと、iPhoneキーボード対応、AI・ログイン・同期・課金を勝手に追加しない禁止表現が不足していた。

修正した内容:
- .github/copilot-instructions.md に Phase 2 でMVP実装しないルールを追加した。
- .github/copilot-instructions.md に iPhoneでのタップしやすさ、キーボード表示時の使いやすさ、将来PWA / Capacitor化を見据えたWebアプリ方針を追記した。
- .github/copilot-instructions.md の “What Zanshin Is NOT” に AI、認証・クラウド同期、課金プロダクトではないことを追加した。

---

## 6. Phase 3 実装前の最終方針

Phase 3では以下を守ること。

- Vite + React + TypeScript + TailwindでMVPを作る
- localStorage保存から開始する
- メモ一覧、作成、編集、削除、自動保存、検索、お気に入りを実装する
- iPhone-firstで設計する
- 余白と行間を大切にする
- 機能を増やしすぎない
- Cloudflare PagesへのデプロイはMVP完成後のみ行う

---

## 7. MVPでまだ作らないもの

- ログイン
- クラウド同期
- AI機能
- 課金
- Markdown完全対応
- 複雑なタグ管理
- 共同編集
- App Store申請

---

## 8. 総合判定

```txt
修正後にPhase 3へ進む

理由:
Phase 1の主要設計は揃っていたが、海外向け表現、iPhone実装時の具体方針、Phase 2境界、Cloud Agent向け禁止事項に不足があった。
本監査で不足点を設計ドキュメントに補完したため、MVP範囲を拡大せずにPhase 3へ進める状態になった。

この設計は、ただのメモ帳ではなく「残心」と呼べる。
書く体験と保存体験は静かで、読み返しには余韻があり、UIの余白と和のモチーフは装飾ではなく意味として使われている。
機能は画面を騒がせず、MVPは「Open → Write → Save quietly → Return → Read again」の最小体験に集中している。
```
