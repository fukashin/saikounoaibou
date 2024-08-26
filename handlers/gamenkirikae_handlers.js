// 必要なモジュールのインポート
const { ipcMain, BrowserWindow } = require('electron');
const path = require('path');  // pathモジュールをインポート

// ウィンドウを参照する変数を作成
let activeWindow = null;
let keywordWindow = null;


function gamenkirikae(){
// アクティブ表示画面に遷移するためのIPCハンドラー
ipcMain.on('アクティブ表示画面に遷移', () => {
    // 既にウィンドウが開かれていないか確認
    if (activeWindow === null) {
        activeWindow = new BrowserWindow({
            width: 600,
            height: 400,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                contextIsolation: true,
                nodeIntegration: false
            }
        });

        activeWindow.loadFile(path.join(__dirname, '../gamen/active.html'));

        // ウィンドウが閉じられたときに参照を解放
        activeWindow.on('closed', () => {
            activeWindow = null;
        });
    } else {
        activeWindow.focus();
    }
});

// キーワード表示画面に遷移するためのIPCハンドラー
ipcMain.on('キーワード表示画面に遷移', () => {
    if (keywordWindow === null) {
        keywordWindow = new BrowserWindow({
            width: 600,
            height: 400,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                contextIsolation: true,
                nodeIntegration: false
            }
        });

        keywordWindow.loadFile(path.join(__dirname, '../gamen/keyword.html'));

        // ウィンドウが閉じられたときに参照を解放
        keywordWindow.on('closed', () => {
            keywordWindow = null;
        });
    } else {
        keywordWindow.focus();
    }
});
}

module.exports = gamenkirikae;