// Electronのメインプロセスで使用するIPC（プロセス間通信）をインポート
const { ipcMain } = require('electron');


// メイン画面でボタンが押されたときに新しいウィンドウを開く
ipcMain.on('アクティブ表示画面に遷移', () => {
    const secondWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    secondWindow.loadFile('second.html'); // 別画面のHTMLを読み込む
});


// メイン画面でボタンが押されたときに新しいウィンドウを開く
ipcMain.on('キーワード表示画面に遷移', () => {
    const secondWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    secondWindow.loadFile('second.html'); // 別画面のHTMLを読み込む
});