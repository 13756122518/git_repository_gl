'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let whereStr = {}
	let dbRes
	let res
	for (let key in event.onditions) {
		whereStr[key] = event.onditions[key]
	}

	if (event.fields) {
		console.log("event.rownum:" + event.rownum)
		if (event.rownum) {
			res = await db.collection(event.tableName).field(event.fields).where(
				whereStr
			).limit(event.rownum).get()
		} else {
			res = await db.collection(event.tableName).field(event.fields).where(
				whereStr
			).get()
		}

	} else {
		if (event.rownum) {
			res = await db.collection(event.tableName).where(
				// _id: event.findByValue
				whereStr
			).limit(event.rownum).get()
		} else {
			res = await db.collection(event.tableName).where(
				// _id: event.findByValue
				whereStr
			).get()
		}
	}

	return res
};
