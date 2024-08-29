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

// キーワード入力された時の動作
addEventListenerWithRetry('キーワード入力', 'submit', function(event) {
  event.preventDefault();  // フォームのデフォルト動作を防止
  const keyword = document.getElementById('keyword').value;

  // メインプロセスにキーワードを送信
  window.electron.ipcRenderer.send('add-keyword', keyword);
});

// 全アクティブ削除ボタンの処理
addEventListenerWithRetry('全アクティブ削除ボタン', 'click', () => {
  if (confirm("全部消えるけど、ほんとに削除する?")) {
      window.electron.ipcRenderer.send('delete-all-records');
  }
});

// すべてのキーワードを削除ボタンの処理
addEventListenerWithRetry('全キーワード削除ボタン', 'click', () => {
  if (confirm("全部消えるけど、ほんとに削除する?")) {
      window.electron.ipcRenderer.send('delete-all-keyword-records');
  }
});

// メインプロセスからの応答を受け取る
window.electron.ipcRenderer.on('keyword-added', (event, status) => {
  const statusElement = document.getElementById('status');
  if (statusElement) {
      statusElement.textContent = status;  // 応答メッセージを表示
  }
});

window.electron.ipcRenderer.on('delete-success', (event, message) => {
  if (message === undefined || message === null) {
      message = "すべて消えた";
  }
  alert(message);
});

window.electron.ipcRenderer.on('delete-error', (event, message) => {
  alert(`Error: ${message}`);
});
