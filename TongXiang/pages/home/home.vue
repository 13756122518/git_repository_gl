<template>
	<view class="area-box">
		<view class="u-flex" :class="{ 'change':isChange }">
			<view class="u-padding-10 u-bg-gray">
				<!-- <scroll-view :scroll-y="true" @scrolltoupper="upper" @scrolltolower="lower" style="height:300rpx"> -->
				<scroll-view :scroll-y="true" @scrolltolower="lower" :style="'height:' + scrollViewHeight + 'px ;'">
					<u-cell-group>
						<!-- <u-cell-item icon="arrow-right-double" title="个人设置" value="新版本0"></u-cell-item> -->
						<u-cell-item icon="order" v-for="(item,index) in orders" :title="item.name" :key="index" @click="provinceChange(item._id)"
						 :arrow="true" title-width="390">
							<text>\n活动日期:\n{{item.time.substring(5,19)}}\n订单状态:\n{{getStatusName(item.status)}}</text>
							<!-- <u-badge count="99" :absolute="false" slot="right-icon"></u-badge> -->
						</u-cell-item>
					</u-cell-group>
				</scroll-view>
			</view>
		</view>
	</view>

</template>

<script>
	var _this
	export default {
		data() {
			return {
				scrollViewHeight: 0,
				isChange: 0,
				isEnd: 0,
				rownum: 4,
				orders: []
			}
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
			// 获取设备宽度
			uni.getSystemInfo({
				success: function(res) {
					_this.scrollViewHeight = res.windowHeight - 12;
					console.log(_this.scrollViewHeight)
				}
			});
			this.getlbList()
		},
		methods: {
			async getlbList() {
				if ("1" == _this.vuex_user.roleType) { // 商家
					this.orders = await this.$dbcloud.findByConditions(
						"tx_order", {
							"order_user_boss_id": _this.vuex_user._id
						},
						this.rownum, {
							"_id": true,
							"name": true,
							"time": true,
							"status": true
						})
					if (this.rownum > this.orders.length) {
						this.isEnd = 1
					}
				}
			},
			provinceChange(id) {
				console.log(id)
			},
			getStatusName(status) {
				return status == 0 ? '已创建' : (status == 1 ? '审核通过' : (status == 2 ? '已完成' : (status == 3 ? '已确认' : (status == 4 ?
					'已确认' : '已取消'))))
			},
			lower() {
				console.log(11111)
				if (!this.isEnd) {
					this.rownum += 4
					this.getlbList()
				}
			},
			upper() {
				this.rownum = 4
				this.getlbList()
			},
		},

	}
</script>

<style lang="scss">
	.area-box {
		width: 100%;
		height: 100%;

		>view {
			width: 100%;
			transition: transform 0.3s ease-in-out 0s;
			transform: translateX(0);

			&.change {
				transform: translateX(-33.3333333%);
			}
		}

		.title-style {
			width: 50%;
		}

	}
</style>
