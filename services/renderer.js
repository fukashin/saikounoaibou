// レンダラープロセスのJavaScriptファイル（renderer.js）で、
// ボタンのクリックイベントをリッスンし、
// それに基づいてメインプロセスにメッセージを送信します。

document.getElementById('deleteRecordBtn').addEventListener('click', () => {
    // ID 1のレコードを削除する例（IDはユーザー入力に基づいて変更可能）
    const id = prompt("Enter the ID of the record to delete:");
    if (id) {
      window.electron.ipcRenderer.send('delete-record', id);
    }
  });
  
  document.getElementById('deleteAllRecordsBtn').addEventListener('click', () => {
    // 全レコードを削除
    if (confirm("Are you sure you want to delete all records?")) {
      window.electron.ipcRenderer.send('delete-all-records');
    }
  });
  