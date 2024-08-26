// 画面切り替え用ボタンのレンダーまとめファイル



document.getElementById('アクティブ表示ボタン').addEventListener('click', () => {
    // メインプロセスに新しいウィンドウを開くように指示
    window.electron.ipcRenderer.send('アクティブ表示画面に遷移');
});
document.getElementById('キーワード表示ボタン').addEventListener('click', () => {
    // メインプロセスに新しいウィンドウを開くように指示
    console.log('キーワード表示画面に遷移イベント送信');  // デバッグ用のログ
    window.electron.ipcRenderer.send('キーワード表示画面に遷移');
});