// Electronのメインモジュールをインポート
const { app } = require('electron');
// メインウィンドウを作成する関数をインポート
const createWindow = require('./windows/mainWindow');
// アクティブウィンドウ監視サービスをインポート
const startActiveWindowMonitoring = require('./services/activeWindowService');
// データベース接続の設定をインポート
const sequelize = require('./db');

// アプリケーションの初期化を行う非同期関数
async function initializeApp() {
  try {
    // データベース接続の初期化メッセージ
    console.log('Initializing database connection...');
    // データベースに接続
    await sequelize.authenticate();
    // 接続成功のメッセージ
    console.log('Connection has been established successfully.');
    // データベースの同期を実行
    await sequelize.sync();
    // 同期成功のメッセージ
    console.log('Database synchronized successfully.');
    // メインウィンドウを作成
    createWindow();
    // アクティブウィンドウの監視を開始
    startActiveWindowMonitoring();
  } catch (error) {
    // データベース接続に失敗した場合のエラーメッセージ
    console.error('Unable to connect to the database:', error);
  }
}

// アプリケーションが準備完了したときに初期化関数を呼び出す
app.on('ready', initializeApp);

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
