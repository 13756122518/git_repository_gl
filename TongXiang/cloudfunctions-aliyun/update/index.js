'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	
	const res = await db.collection(event.tableName).where({
		"_id":dbCmd.eq(event.findByValue)
	}).update(event.data)

	if (res.updated === 1) {
		return {
			status: 0,
			msg: `更新成功`
		}
	} else {
		return {
			status: -1,
			msg: `更新失败`
		}
	}
};
