'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	
	let whereStr = {}
	let res
	const dbCmd = db.command
	
	for (let key in event.onditions) {
		if(event.onditions[key] instanceof Array) {			
			whereStr[key] = dbCmd.in(event.onditions[key])
		} else {
			whereStr[key] = event.onditions[key]
		}		
	}

	if(event.sort) {
		if (event.fields) {
			if (event.rownum) {
				res = await db.collection(event.tableName).aggregate().match(
					whereStr
				).project(event.fields).sort(event.sort).limit(event.rownum).end()
			} else {
				res = await db.collection(event.tableName).aggregate().match(
					whereStr
				).project(event.fields).sort(event.sort).end()
			}
		
		} else {
			if (event.rownum) {
				res = await db.collection(event.tableName).aggregate().match(
					// _id: event.findByValue
					whereStr
				).sort(event.sort).limit(event.rownum).end()
			} else {
				res = await db.collection(event.tableName).aggregate().match(
					// _id: event.findByValue
					whereStr
				).sort(event.sort).end()
			}
		}
	} else {
		if (event.fields) {
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
	}
	

	return res
};
