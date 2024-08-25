// dbから Keyword モデルをインポート
const { Keyword } = require('../db/models/Keyword'); 
const { ipcMain } = require('electron');

// キーワードをデータベースに追加する関数
async function addKeyword(word) {
  try {
    // 既にキーワードが存在しないか確認
    const existingKeyword = await Keyword.findOne({ where: { word } });
    if (existingKeyword) {
      console.log('このキーワードは既に存在します:', word);
      return;
    }

    // キーワードをデータベースに追加
    await Keyword.create({ word });
    console.log('キーワードが登録されました:', word);
  } catch (error) {
    console.error('キーワードの登録に失敗しました:', error);
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