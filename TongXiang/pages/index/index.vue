<template>
	<view class="content">
		<u-notice-bar :list="list" color="red"></u-notice-bar>
		<view class="title">uniCloud 基础示例</view>
		<view class="tips">
			<view>1.在cloudfunctions目录右键创建并关联服务空间</view>
			<view>2.在cloudfunctions目录内db_init.json上右键初始化云数据库</view>
			<view>3.在cloudfunctions目录右键选择“上传所有云函数”</view>
			<view>开始愉快的体验uniCloud吧！</view>
		</view>
		<view class="btn-list">
			<button type="primary" @click="add">新增一条数据</button>
			<button type="primary" @click="remove">删除一条数据</button>
			<button type="primary" @click="update">修改数据</button>
			<button type="primary" @click="get">查询前10条数据</button>
			<button type="primary" @click="useCommon">使用公用模块</button>
			<button type="primary" @click="upload">上传文件</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:["寒雨连江","平那风格","分割三个"]
			}
		},
		methods: {
			add() {
				this.$dbcloud.add("tx_user", {
					loginName: 'test',
					password: 'test',					
					createDate: "2020-06-23"
				})
			},
			remove() {
				uni.showLoading({
					title: '处理中...'
				})
				uniCloud.callFunction({
					name: 'remove'
				}).then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: res.result.msg,
						showCancel: false
					})
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `删除失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			update() {
				this.$dbcloud.updateById("tx_user","5ef18c87de1810004cf8ac29", {
					loginName: 'test',
					password: 'test',					
					createDate: "2020-06-26"
				})
			},
			async get() {
				// let res = await this.$dbcloud.findByConditions("tx_boss",{"isIntendedCustomers":1});
				let res = await this.$dbcloud.findLookUpByConditions("tx_order","tx_order_detail","_id","order_id",{"_id":"tx_order_1"});
				console.log(res[0])
			},
			useCommon() {
				console.log('请确保自己已经阅读并按照公用模块文档操作 https://uniapp.dcloud.io/uniCloud/cf-common')
				uniCloud.callFunction({
					name: 'useCommon'
				}).then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: '云函数useCommon返回结果：' + JSON.stringify(res.result),
						showCancel: false
					})
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `云函数useCommon执行失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			upload() {
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
				}).then(res => {
					uni.hideLoading()
					console.log(res);
					this.$add("addFeaturedCourses", {
										fileId: res.fileID,
										createTime: Date.now()
									})
					uni.showModal({
						content: '图片上传成功，fileId为：' + res.fileID,
						showCancel: false
					})
				}).catch((err) => {
					uni.hideLoading()
					console.log(err);
					if (err.message !== 'Fail_Cancel') {
						uni.showModal({
							content: `图片上传失败，错误信息为：${err.message}`,
							showCancel: false
						})
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		padding-bottom: 30px;
	}

	.title {
		font-weight: bold;
		text-align: center;
		padding: 20px 0px;
		font-size: 20px;
	}

	.tips {
		color: #999999;
		font-size: 14px;
		padding: 20px 30px;
	}

	.btn-list {
		padding: 0px 30px;
	}

	.btn-list button {
		margin-bottom: 20px;
	}

	.upload-preview {
		width: 100%;
	}
</style>
