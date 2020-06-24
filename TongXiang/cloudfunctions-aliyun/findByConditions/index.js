'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let whereStr = {}
	for (let key in event.onditions) {
		whereStr[key] = event.onditions[key]
	}
	console.log(whereStr)
	const res = await db.collection(event.tableName).where(
		// _id: event.findByValue
		whereStr
	).get()
	return res
};
