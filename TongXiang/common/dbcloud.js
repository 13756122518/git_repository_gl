export default class dbcloud {
	constructor() {

	}
	// name 表名
	// data 新增的内容
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
			uni.showToast({
				icon: 'none',
				title: '添加数据成功'
			});
		}).catch((err) => {
			uni.hideLoading()
			uni.showModal({
				content: `添加数据失败，错误信息为：${err.message}`,
				showCancel: false
			})
		})

	}

    // name 表名
	// findByValue ID的值
	// data 更新的内容
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
			uni.showToast({
				icon: 'none',
				title: '修改数据成功'
			});
			
		}).catch((err) => {
			uni.hideLoading()
			uni.showModal({
				content: `修改数据失败，错误信息为：${err.message}`,
				showCancel: false
			})
			console.error(err)
		})
	}
	
	// 根据条件返回记录条数
	// name 表名	
	// onditions {"loginName":"test","password":"test"} 检索条件 key 字段名 value 字段值  in 传数组
	findCountByConditions(name, onditions) {
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'findCountByConditions',
				data: {
					"tableName": name,
					"onditions": onditions
				}
			}).then((res) => {
				uni.hideLoading()
				if(res.result.data.length > 0) {
					resolve(res.result.data[0].count)
				} else {
					resolve(0)
				}
				
			}).catch((err) => {
				uni.hideLoading()
				uni.showModal({
					content: `查询失败，错误信息为：${err.message}`,
					showCancel: false
				})
			})
		})
	}
	
	// 根据条件返回记录
	// name 表名	
	// onditions {"loginName":"test","password":"test"} 检索条件 key 字段名 value 字段值 
	// sort:{"time":-1} 排序 1 代表升序排列 -1 代表降序排列
	// rownum: 分页 查询的记录数
	// fields:{"_id":1,"name":1,"time":1,"status":1} 需要显示的字段
	findByConditions(name, onditions,sort,rownum,fields) {
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'findByConditions',
				data: {
					"tableName": name,
					"onditions": onditions,
					"sort": sort,
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

	// master 主表
	// slave 从表
	// localField 主表关联字段
	// foreignField 外键关联字段
	// onditions 检索条件
	// sort:{"time":-1} 排序 1 代表升序排列 -1 代表降序排列
	// rownum: 分页 每页的记录数
	// queryListName 从表集合名称
	findLookUpByConditions(master, slave, localField, foreignField, onditions,sort,rownum, queryListName) {
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
					"onditions": onditions,
					"sort": sort,
					"rownum":rownum
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
	
	// 上传单张文件
	upload(callback) {
		new Promise((resolve, reject) => {
			uni.chooseImage({
				chooseImage: 1,
				success: res => {
					const path = res.tempFilePaths[0]
					let ext
					// #ifdef H5
					ext = res.tempFiles[0].name.split('.').pop()
					// #endif
					// #ifndef H5
					ext = res.tempFilePaths[0].split('.').pop()
					// #endif
					const options = {
						filePath: path,
						cloudPath: Date.now() + '.' + ext
					}
					resolve(options)
				},
				fail: () => {
					reject(new Error('Fail_Cancel'))
				}
			})
		}).then((options) => {
			uni.showLoading({
				title: '文件上传中...'
			})
			return uniCloud.uploadFile({
				...options,
				onUploadProgress(e) {
					console.log(e)
				}
			})
		}).then( res => {
			uni.hideLoading()
			uni.showToast({
				icon: 'none',
				title: '图片上传成功'
			});
			callback(res.fileID)
		}).catch((err) => {
			uni.hideLoading()
			if (err.message !== 'Fail_Cancel') {
				uni.showModal({
					content: `图片上传失败，错误信息为：${err.message}`,
					showCancel: false
				})
			}
		})
	}
}
