// dbから Keyword モデルをインポート
// const { Keyword } = require('../db/models/Keyword');という構文では、Keywordがundefinedになってしまうことがあります。
// 通常、モデルはデフォルトエクスポートされているため、require文で直接インポートする必要があります。
const { ipcMain } = require('electron');
const addKeyword = require('./touroku');
const { deleteRecordById, deleteAllRecords } = require('./sakujo');

function setupIpcHandlers() {
    // キーワード追加のIPCリスナー
    ipcMain.on('add-keyword', async (event, keyword) => {
      try {
        await addKeyword(keyword);
        event.reply('keyword-added', `Keyword "${keyword}" added successfully!`);
      } catch (error) {
        event.reply('keyword-added', `Failed to add keyword: ${error.message}`);
      }
    });


// レコード削除のIPCハンドラー
ipcMain.on('delete-record', async (event, id) => {
  try {
    await deleteRecordById(id);
    event.reply('delete-success', `Record with id ${id} was deleted.`);
  } catch (error) {
    event.reply('delete-error', `Failed to delete record: ${error.message}`);
  }
});

// 全レコード削除のIPCハンドラー
ipcMain.on('delete-all-records', async (event) => {
  try {
    await deleteAllRecords();
    event.reply('delete-success', 'All records were deleted.');
  } catch (error) {
    event.reply('delete-error', `Failed to delete all records: ${error.message}`);
  }
});
}
  
  module.exports = setupIpcHandlers;