// Electronのメインモジュールをインポート
const { app } = require('electron');
// メインウィンドウを作成する関数をインポート
//データベースの接続と初期をインポート
const initializeApp = require('./services/initializeapp');
// 登録処理をインポート
const setupIpcHandlers = require('./handlers/handlers')
// 画面切り替えをインポート
const createWindow = require('./handlers/gamenkirikae_handlers')

const path = require('path');
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});



// アプリケーションが準備完了したときに初期化関数を呼び出す
// 'ready'はアプリの準備ができたときに呼ばれる
app.on('ready', initializeApp);
app.on('ready',createWindow);

// すべてのウィンドウが閉じられたときの処理
app.on('window-all-closed', function () {
  // macOS以外のプラットフォームでアプリを終了
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// アプリケーションがアクティブになったとき（Dockやタスクバーから再度アクティブにされた場合）
app.on('activate', function () {
  // オープンされているウィンドウがない場合、新たにウィンドウを作成
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPCハンドラーの設定
setupIpcHandlers();

