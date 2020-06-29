export default class dbcloud {
	constructor() {

	}
	add(name, data) {
		uni.showLoading({
			title: '处理中...'
		})
		uniCloud.callFunction({
			name: "add",
			data: {
				"tableName": name,
				"data": data
			}
		}).then((res) => {
			uni.hideLoading()
			uni.showModal({
				content: `添加数据成功`,
				showCancel: false
			})
		}).catch((err) => {
			uni.hideLoading()
			uni.showModal({
				content: `添加数据失败，错误信息为：${err.message}`,
				showCancel: false
			})
		})

	}

	updateById(name, findByValue, data) {
		console.log("update:", name)
		uni.showLoading({
			title: '处理中...'
		})
		uniCloud.callFunction({
			name: "update",
			data: {
				"tableName": name,
				"findByValue": findByValue,
				"data": data
			}
		}).then((res) => {
			uni.hideLoading()
			uni.showModal({
				content: `修改数据成功`,
				showCancel: false
			})
		}).catch((err) => {
			uni.hideLoading()
			uni.showModal({
				content: `修改数据失败，错误信息为：${err.message}`,
				showCancel: false
			})
			console.error(err)
		})
	}

	getList(options) {
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: options.name || '',
				data: options.data || {}
			}).then((res) => {
				uni.hideLoading()
				resolve(res.result.data)
			}).catch((err) => {
				uni.hideLoading()
				uni.showModal({
					content: `查询失败，错误信息为：${err.message}`,
					showCancel: false
				})
			})
		})
	}

	// export const findById = (name,findByValue) => {
	// {"loginName":"test","password":"test"} key 字段名 value 字段值
	// fields:{"_id":true,"name":true,"time":true,"status":true}
	findByConditions(name, onditions,rownum,fields) {
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'findByConditions',
				data: {
					"tableName": name,
					"onditions": onditions,
					"rownum":rownum,
					"fields": fields
				}
			}).then((res) => {
				uni.hideLoading()
				resolve(res.result.data)
			}).catch((err) => {
				uni.hideLoading()
				uni.showModal({
					content: `查询失败，错误信息为：${err.message}`,
					showCancel: false
				})
			})
		})
	}

	// master 主表 slave 从表 localField 主表字段 foreignField 外键关联字段  queryListName 从表集合名称 onditions检索条件
	findLookUpByConditions(master, slave, localField, foreignField, onditions, queryListName) {
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'findLookUpByConditions',
				data: {
					"master": master,
					"slave": slave,
					"localField": localField,
					"foreignField": foreignField,
					"queryListName": queryListName,
					"onditions": onditions
				}
			}).then((res) => {
				uni.hideLoading()
				resolve(res.result.data)
			}).catch((err) => {
				uni.hideLoading()
				uni.showModal({
					content: `查询失败，错误信息为：${err.message}`,
					showCancel: false
				})
			})
		})
	}
}
