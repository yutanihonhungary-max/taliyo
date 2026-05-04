// =============================================
// 大量記憶法 同期スクリプト（v2 簡易版）
// =============================================
//
// 【セットアップ手順】
//
// ① このスプレッドシートを開いた状態で
//    メニュー「拡張機能」→「Apps Script」
//
// ② 開いたエディタの中身を全部消して
//    このコードを全部コピー＆ペースト
//
// ③ 💾 保存（Ctrl+S）
//
// ④ 右上「デプロイ」→「新しいデプロイ」
//    歯車アイコン → 「ウェブアプリ」を選択
//    ・次のユーザーとして実行：「自分」
//    ・アクセスできるユーザー：「全員」
//    →「デプロイ」→ 承認画面で「許可」
//
// ⑤ 表示されたURLをコピーしてアプリに貼り付け
//
// =============================================

// データを読み取る（受信）
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sync");
  
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({categories:[], items:[]}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  var json = sheet.getRange("A1").getValue();
  
  if (!json) {
    return ContentService
      .createTextOutput(JSON.stringify({categories:[], items:[]}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

// データを書き込む（送信）
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("sync");
  
  if (!sheet) {
    sheet = ss.insertSheet("sync");
  }
  
  // フォーム送信の場合は e.parameter.data、直接POSTの場合は e.postData.contents
  var json = "";
  if (e.parameter && e.parameter.data) {
    json = e.parameter.data;
  } else if (e.postData && e.postData.contents) {
    json = e.postData.contents;
  }
  
  // A1セルにJSON全体を保存
  sheet.getRange("A1").setValue(json);
  
  // タイムスタンプをB1に
  sheet.getRange("B1").setValue(new Date().toISOString());
  
  return ContentService
    .createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
