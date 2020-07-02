<template>
	<view class="page-news u-bg-gray">
		<!-- <scroll-view :scroll-y="true" @scrolltoupper="upper" @scrolltolower="lower" style="height:300rpx"> -->
		<uni-list class="listview" :scroll-top="scrollTop" :scroll-y="true" @scrolltolower="loadMore()" >
			<!-- <scroll-view :scroll-y="true" @scrolltolower="lower" :style="'height:' + scrollViewHeight + 'px ;'"> -->
			<u-cell-group  v-if="vuex_user.roleType =='1' || vuex_user.roleType =='2'">
				<!-- <u-cell-item icon="arrow-right-double" title="个人设置" value="新版本0"></u-cell-item> -->
				<u-cell-item icon="order" v-for="(item,index) in orders" :title="item.name" :key="index" @click="provinceChange(item._id)"
				 :arrow="true" title-width="370">
					<text class="textFont">\n活动日期:{{item.time.substring(5,16)}}\n需要人数:{{item.num}}\n订单状态:{{getStatusName(item.status)}}\n报名人数:{{item.queryList.length}}</text>
				</u-cell-item>
			</u-cell-group>
			<u-cell-group v-if="vuex_user.roleType =='3' || vuex_user.roleType =='4'">
				<u-cell-item icon="order" v-for="(item,index) in orders" :title="item.queryList[0].name" :key="index" @click="provinceChange(item.queryList[0]._id)" @scroll=""
				 :arrow="true" title-width="370">
					<text class="textFont">\n活动日期:{{item.queryList[0].time.substring(5,16)}}\n需要人数:{{item.queryList[0].num}}\n订单状态:{{getStatusName(item.queryList[0].status)}}</text>
				</u-cell-item>
			</u-cell-group>
		</uni-list>
	</view>

</template>

<script>
	var _this
	import uniList from '@/components/uni-list.vue';
	export default {
		data() {
			return {
				scrollTop: 0,
				// scrollViewHeight: 0,
				isChange: 0,
				isEnd: 0,
				rownum: 5,
				// num: [],
				orders: []
			}
		},
		components: {
			uniList
		},
		onLoad() {
			_this = this
			if (!this.vuex_user || !this.vuex_user._id) {
				this.$u.route({
					url: '/pages/login/login',
					type: 'navigateTo'
				})
				return;
			}
			// this.scrollViewHeight = uni.getSystemInfoSync().windowHeight
			this.getlbList()
		},
		methods: {
			async getlbList() {
				if ("1" == _this.vuex_user.roleType) { // 商家
					this.orders = await this.$dbcloud.findLookUpByConditions(
						"tx_order",
						"tx_order_detail",
						"_id",
						"order_id",
						{
							"order_user_boss_id": _this.vuex_user._id,
							status: [0, 1, 2, 3,4]
						},
						{
							"time": -1
						},
						this.rownum
					)
				} else if ("2" == _this.vuex_user.roleType) { // 业务人员
					this.orders = await this.$dbcloud.findLookUpByConditions(
						"tx_order",
						"tx_order_detail",
						"_id",
						"order_id",
						{
							"order_user_buss_id": _this.vuex_user._id,
							status: [0, 1, 2, 3,4]
						},
						{
							"time": -1
						},
						this.rownum
					)				
				} else if ("3" == _this.vuex_user.roleType) { // 招聘人员
					this.orders = await this.$dbcloud.findLookUpByConditions(
						"tx_order_detail",
						"tx_order",
						"order_id",
						"_id",
						{
							"order_user_zp_id": _this.vuex_user._id
						},
						{
							"time": -1
						},
						this.rownum
					)				
				}  else if ("4" == _this.vuex_user.roleType) { // 招聘人员
					this.orders = await this.$dbcloud.findLookUpByConditions(
						"tx_order_detail",
						"tx_order",
						"order_id",
						"_id",
						{
							"order_job_person_id": _this.vuex_user._id
						},
						{
							"time": -1
						},
						this.rownum
					)				
				} 									
				if (this.rownum > this.orders.length) {
					this.isEnd = 1
				}
			},
			provinceChange(id) {
				console.log(id)
			},
			getStatusName(status) {
				return status == 0 ? '已创建' : (status == 1 ? '审核通过' : (status == 2 ? '人员已满' : (status == 3 ? '上岗确认' : (status == 4 ?
					'已完成' : '已取消'))))
			},	
			// async getNum(id,index) {
			// 	this.num[index] = await this.$dbcloud.findCountByConditions("tx_order_detail",{"order_id":id})
			// 	console.log(this.num[index])
			// },	
			loadMore() {
				if (!this.isEnd) {
					this.rownum += 5
					this.getlbList()
				}
			},
			upper() {
				this.rownum = 5
				this.getlbList()
			},
		},

	}
</script>

<style lang="scss">
	.page-news {
		width: 100%;
		height: 100%;
		flex: 1;
		flex-direction: column;
		position: absolute;
	}

	.listview {
		height: 100%;
		position: absolute;
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		/* #ifndef MP-ALIPAY */
		flex-direction: column;
		/* #endif */
		.textFont {
			font-size: 22rpx;
			line-height: 1rpx;
		}
	}
	
</style>
