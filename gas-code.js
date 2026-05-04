// ===================================
// 大量記憶法 — Google Apps Script API
// ===================================
// このコードをスプレッドシートのApps Scriptに貼り付けてください
//
// 【手順】
// 1. Googleスプレッドシートを新規作成
// 2. メニュー「拡張機能」→「Apps Script」
// 3. 既存のコードを全部消して、このコードを貼り付け
// 4. 「デプロイ」→「新しいデプロイ」
// 5. 種類: 「ウェブアプリ」を選択
// 6. アクセスできるユーザー: 「自分のみ」
// 7. 「デプロイ」→ 承認画面が出たら許可
// 8. 表示されるURLをコピー → アプリの設定画面に貼り付け

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // シート「items」からデータを読み取り
    let itemsSheet = ss.getSheetByName('items');
    let catsSheet = ss.getSheetByName('categories');
    
    if (!itemsSheet || !catsSheet) {
      return jsonResponse({ categories: [], items: [] });
    }
    
    const categories = sheetToObjects(catsSheet);
    const items = sheetToObjects(itemsSheet);
    
    // doneDatesはJSON文字列で保存されているのでパース
    for (const item of items) {
      try { item.doneDates = JSON.parse(item.doneDates || '[]'); } catch { item.doneDates = []; }
    }
    
    return jsonResponse({ categories, items });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // categoriesシートを作成/更新
    let catsSheet = ss.getSheetByName('categories');
    if (!catsSheet) catsSheet = ss.insertSheet('categories');
    writeObjects(catsSheet, data.categories || [], ['id', 'name', 'cc']);
    
    // itemsシートを作成/更新
    let itemsSheet = ss.getSheetByName('items');
    if (!itemsSheet) itemsSheet = ss.insertSheet('items');
    
    // doneDatesをJSON文字列に変換して保存
    const items = (data.items || []).map(item => ({
      ...item,
      doneDates: JSON.stringify(item.doneDates || [])
    }));
    writeObjects(itemsSheet, items, ['id', 'categoryId', 'name', 'learnDate', 'doneDates', 'notes', 'link']);
    
    return jsonResponse({ success: true, timestamp: new Date().toISOString() });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

// --- ヘルパー関数 ---

function sheetToObjects(sheet) {
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  const objects = [];
  for (let i = 1; i < data.length; i++) {
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = data[i][j];
    }
    objects.push(obj);
  }
  return objects;
}

function writeObjects(sheet, objects, headers) {
  sheet.clear();
  if (objects.length === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    return;
  }
  const rows = [headers];
  for (const obj of objects) {
    rows.push(headers.map(h => obj[h] !== undefined ? obj[h] : ''));
  }
  sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
