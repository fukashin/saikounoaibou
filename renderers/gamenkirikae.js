function addEventListenerWithRetry(id, event, handler, retryCount = 5, delay = 500) {
    const element = document.getElementById(id);
    
    if (element) {
        element.addEventListener(event, handler);
        console.log(`EventListener added to ${id}`);
    } else if (retryCount > 0) {
        console.log(`Element ${id} not found, retrying... (${retryCount} retries left)`);
        setTimeout(() => {
            addEventListenerWithRetry(id, event, handler, retryCount - 1, delay);
        }, delay);
    } else {
        console.error(`Failed to find element with ID: ${id}`);
    }
}

// メインメニューボタンのイベントリスナー
addEventListenerWithRetry('メインメニューボタン', 'click', () => {
    console.log('メインメニュー画面に遷移イベント送信');
    window.electron.ipcRenderer.send('メインメニュー画面に遷移');
});

// アクティブ表示ボタンのイベントリスナー
addEventListenerWithRetry('アクティブ表示ボタン', 'click', () => {
    window.electron.ipcRenderer.send('アクティブ表示画面に遷移');
});

// キーワード表示ボタンのイベントリスナー
addEventListenerWithRetry('キーワード表示ボタン', 'click', () => {
    console.log('キーワード表示画面に遷移イベント送信');
    window.electron.ipcRenderer.send('キーワード表示画面に遷移');
});
