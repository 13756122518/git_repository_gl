export const add =(name,data) =>{
	uni.showLoading({
		title: '处理中...'
	})
	uniCloud.callFunction({
		name: name,
		data: data
	}).then((res) => {
		uni.hideLoading()
		uni.showModal({
			content: `添加数据成功`,
			showCancel: false
		})
		console.log(res)
	}).catch((err) => {
		uni.hideLoading()
		uni.showModal({
			content: `添加数据失败，错误信息为：${err.message}`,
			showCancel: false
		})
		console.error(err)
	})
	
}
export const getList = (options) => {
	return new Promise((resolve,reject)=> {
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
