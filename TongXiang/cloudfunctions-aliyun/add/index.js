'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log("tableName:",event.tableName)
	const collection = db.collection(event.tableName)
	const res = await collection.add(event.data)
	return res
};
