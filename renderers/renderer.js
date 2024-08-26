// レンダラープロセスのJavaScriptファイル（renderer.js）で、
// ボタンのクリックイベントをリッスンし、
// それに基づいてメインプロセスにメッセージを送信します。


// window.electron.ipcRendererを使用して、メインプロセスにメッセージを送信
// キーワード入力された時の動作
document.getElementById('キーワード入力').addEventListener('submit', function(event) {
  event.preventDefault();  // フォームのデフォルト動作を防止
  const keyword = document.getElementById('keyword').value;

  // メインプロセスにキーワードを送信
  window.electron.ipcRenderer.send('add-keyword', keyword);
});

// メインプロセスからの応答を受け取る
window.electron.ipcRenderer.on('keyword-added', (event, status) => {
  document.getElementById('status').textContent = status;  // 応答メッセージを表示
});




// // 画面のID指定削除のボタンを押したときの処理
// document.getElementById('ID指定アクティブ削除ボタン').addEventListener('click', () => {
//     // ID 1のレコードを削除する例（IDはユーザー入力に基づいて変更可能）
//     const id = prompt("Enter the ID of the record to delete:");
//     if (id) {
//       window.electron.ipcRenderer.send('delete-record', id);
//     }
//   });
  // HTMLのボタンのIDから送られてきたイベントを受け取る
  // そのあとにハンドラークラスに丸投げするだけ
  // 画面のすべてを削除のボタンを押したときの処理
  document.getElementById('全アクティブ削除ボタン').addEventListener('click', () => {
    if (confirm("全部消えるけど、ほんとに削除する?")) {
      window.electron.ipcRenderer.send('delete-all-records');
    }
  });

  // renderer.js または index.js などのファイルに記述
  //削除結果がどうなったかを受け取て表示する部分
  // messageはミリティブ型だから単純な文字比較はできないらしい
  window.electron.ipcRenderer.on('delete-success', (event, message) => {
    if (message === undefined || message === null)
       message = "すべて消えた";
    alert(message);
 });
  
  window.electron.ipcRenderer.on('delete-error', (event, message) => {
    alert(`Error: ${message}`);
  });
  

    // すべてのキーワードを削除のボタンを押したときの処理
    document.getElementById('全キーワード削除ボタン').addEventListener('click', () => {
      if (confirm("全部消えるけど、ほんとに削除する?")) {
        window.electron.ipcRenderer.send('delete-all-keyword-records');
      }
    });