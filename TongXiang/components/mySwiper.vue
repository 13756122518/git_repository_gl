<template>
	<view class="swiperHome">
		<swiper indicator-dots circular autoplay :style="{height: swiperHeight + 'rpx'}">
			<swiper-item v-for="(item,index) in swipers" :key="index">
				<image :src="item.fileId"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	
	export default {
		props:["swipers","swiperHeight"]
	}
</script>

<style lang="scss">
	.swiperHome {
		swiper {
			width: 750rpx;
			image{
				height:100%;
				width: 100%;
			}
		}
	}
</style>
