// dbから Keyword モデルをインポート
// const { Keyword } = require('../db/models/Keyword');という構文では、Keywordがundefinedになってしまうことがあります。
// 通常、モデルはデフォルトエクスポートされているため、require文で直接インポートする必要があります。
const Keyword = require('../db/models/Keyword'); 
console.log('Keyword Model:', Keyword);
const { ipcMain } = require('electron');

// キーワードをデータベースに追加する関数
async function addKeyword(word) {
  try {
    // 既にキーワードが存在しないか確認
    const existingKeyword = await Keyword.findOne({ where: { word } });
    if (existingKeyword) {
      console.log('sudenialuuuuuuuuuuuuuuuu:', word);
      return;
    }

    // キーワードをデータベースに追加
    await Keyword.create({ word });
    console.log('OKKKKKKKKKKKKKKKKKKKKKKKKKKK:', word);
  } catch (error) {
    console.error('eraaaaaaaaaaaaaaaaaaa:', error);
  }
}

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
  }
  
  module.exports = setupIpcHandlers;