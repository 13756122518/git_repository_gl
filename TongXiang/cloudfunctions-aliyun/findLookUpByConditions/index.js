'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {

	let res
	if (event.onditions) {
		let whereStr = {}
		for (let key in event.onditions) {
			whereStr[key] = event.onditions[key]
		}
		res = await db.collection(event.master).aggregate()
			.lookup({
				from: event.slave,
				localField: event.localField,
				foreignField: event.foreignField,
				as: event.queryListName || "queryList",
			}).match(
				whereStr
			)
			.end()
	} else {
		res = await db.collection(event.master).aggregate()
			.lookup({
				from: event.slave,
				localField: event.localField,
				foreignField: event.foreignField,
				as: event.queryListName || "queryList",
			})
			.end()
	}

	return res
};
