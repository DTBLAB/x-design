<template>
	<view>
		<image class="picture-body" :src="url" mode='aspectFit'>
		</image>
	</view>
</template>

<script>
	
	export default {
		data(){
			return {
				url: "https://x-design.oss-cn-hangzhou.aliyuncs.com/mine/customer-service.jpg"
			}
		}
	}
</script>

<style lang="less" scoped>
	.picture-body{
		display: block;
		width: 690rpx;
		height: 690rpx;
		padding: 30rpx;
	}

</style>