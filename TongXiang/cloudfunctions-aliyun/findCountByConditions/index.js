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
	res = await db.collection(event.tableName).aggregate().match(
		whereStr
	).count('count').end()

	return res
};
