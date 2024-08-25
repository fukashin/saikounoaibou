const Activity = require('../db/models/Activity'); // モデルをインポートします

// 指定されたIDに基づいてデータベースから値を削除する関数
async function deleteRecordById(id) {
  try {
    // レコードを削除します
    const deleted = await Activity.destroy({
      where: { id: id }
    });

    // 削除が成功したか確認
    if (deleted) {
      console.log(`Record with id ${id} was deleted.`);
    } else {
      console.log(`Record with id ${id} was not found.`);
    }
  } catch (error) {
    console.error('Error deleting record:', error);
  }
}


async function deleteAllRecords() {
    try {
      // 全てのレコードを削除します
      const deleted = await ModelName.destroy({
        where: {}, // 条件を空にすることで全てのレコードを削除
        truncate: false // truncateオプションを使わない場合、各行の削除が記録されます
      });
  
      console.log(`${deleted} records were deleted.`);
    } catch (error) {
      console.error('Error deleting all records:', error);
    }
  }

module.exports = {deleteRecordById,deleteAllRecords};
