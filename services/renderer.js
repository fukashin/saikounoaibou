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
    if (confirm("全部消えるけど、ほんとに削除する?")) {
      window.electron.ipcRenderer.send('delete-all-records');
    }
  });

  // renderer.js または index.js などのファイルに記述
  //削除結果がどうなったかを受け取て表示する部分

  window.electron.ipcRenderer.on('delete-success', (event, message) => {
    if (message === undefined || message === null)
       message = "すべて消えた";
    alert(message);
 });
  
  window.electron.ipcRenderer.on('delete-error', (event, message) => {
    alert(`Error: ${message}`);
  });
  