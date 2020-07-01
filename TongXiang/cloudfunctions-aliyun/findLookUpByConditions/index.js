'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {

	let res
	const dbCmd = db.command
	let whereStr = {}
	
	if(event.sort) {
		if (event.rownum) {
			for (let key in event.onditions) {
				if(event.onditions[key] instanceof Array) {
					whereStr[key] = dbCmd.in(event.onditions[key])
				} else {
					whereStr[key] = event.onditions[key]
				}	
			}
			res = await db.collection(event.master).aggregate()
				.lookup({
					from: event.slave,
					localField: event.localField,
					foreignField: event.foreignField,
					as: event.queryListName || "queryList",
				}).match(
					whereStr
				).sort(event.sort).limit(event.rownum)
				.end()
		} else {
			res = await db.collection(event.master).aggregate()
				.lookup({
					from: event.slave,
					localField: event.localField,
					foreignField: event.foreignField,
					as: event.queryListName || "queryList",
				}).match(
					whereStr
				).sort(event.sort)
				.end()
		}
	} else {
		if (event.rownum) {
			for (let key in event.onditions) {
				if(event.onditions[key] instanceof Array) {
					whereStr[key] = dbCmd.in(event.onditions[key])
				} else {
					whereStr[key] = event.onditions[key]
				}	
			}
			res = await db.collection(event.master).aggregate()
				.lookup({
					from: event.slave,
					localField: event.localField,
					foreignField: event.foreignField,
					as: event.queryListName || "queryList",
				}).match(
					whereStr
				).limit(event.rownum)
				.end()
		} else {
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
		}
	}

	return res
};
