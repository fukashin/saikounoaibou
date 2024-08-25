// Sequelize から Keyword モデルをインポート
const { Keyword } = require('./models/Activity'); // Activity.jsでKeywordをエクスポートしていると仮定

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

