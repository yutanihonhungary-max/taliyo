# 大量記憶法アプリ — Androidインストール手順

## 方法1: GitHub Pages（おすすめ・無料）

### 準備
1. GitHubアカウントを作成（持っていなければ）: https://github.com/signup
2. このZIPファイルを展開しておく

### 手順
1. GitHubにログイン
2. 右上の「+」→「New repository」
3. Repository name: `taliyo`（何でもOK）
4. 「Public」を選択
5. 「Create repository」をクリック
6. 「uploading an existing file」リンクをクリック
7. ZIPから出した5つのファイルをすべてドラッグ&ドロップ:
   - index.html
   - manifest.json
   - sw.js
   - icon-192.png
   - icon-512.png
8. 「Commit changes」をクリック
9. 「Settings」タブ → 左メニュー「Pages」
10. Source: 「Deploy from a branch」
11. Branch: 「main」→ 「/(root)」→ 「Save」
12. 数分待つと公開される

### Androidにインストール
1. Chromeで `https://あなたのユーザー名.github.io/taliyo/` を開く
2. アドレスバーの右に出る「インストール」アイコンをタップ
   （または ︙ メニュー →「ホーム画面に追加」）
3. ホーム画面にアプリアイコンが追加される
4. 以後はアイコンから起動。オフラインでも動作します

## 方法2: ローカルで今すぐ試す

1. ZIPを展開
2. Androidの Chrome で index.html を開く
   （ファイルマネージャーで index.html を長押し → Chromeで開く）
3. ︙ →「ホーム画面に追加」

※ この方法はオフライン対応が効かない場合があります。
   GitHub Pagesで公開する方がおすすめです。

## データについて
- データは端末のブラウザ内（localStorage）に保存
- アンインストールしてもChromeのデータを消さない限り残る
- 定期的に「設定 → エクスポート」でバックアップ推奨
- PC ↔ スマホ間はエクスポート/インポートでデータ移動可能
