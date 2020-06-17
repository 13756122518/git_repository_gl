<template>
	<view class="home">
		<mySwiper :swipers="swipers" swiperHeight=400></mySwiper>
		
	</view>
	
</template>

<script>
	import mySwiper from "@/components/mySwiper.vue"
	export default {
		data() {
			return {
				swipers:[]
			}
		},
		onLoad() {
			this.getlbList()
		},
		methods: {
			async getlbList() {
				this.swipers = await this.$getList({name:"get",data:{tableName:"articles"}})
			}
		},
		components:{
			"mySwiper":mySwiper
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background: #251e3f;
	}
	.home {
		// display: flex;
		// flex-direction: column;
		// height: 100%;
		
		scroll-view {	
			height: 740rpx;
			image {
				vertical-align:top;
				height:950rpx;
				width: 750rpx;
			}
		}
	}
</style>
