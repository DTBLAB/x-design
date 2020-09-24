<template>
	<view class="about-container">
		<image class="about-image" src="../../static/image/微信图片_20200924193858.png" mode="widthFix"></image>
		<view class="about-title">
			想定 X·Design
		</view>
		<view class="about-version">
			Version 1.0.0
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.about-container{
	width: 750rpx;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 32rpx;
}

.about-image{
	margin-top: 160rpx;
	width: 300rpx;
	}
.about-title{
	margin-top: 40rpx;
	font-size: 44rpx;
	font-weight: bold;
	}
.about-version{
	margin-top: 10rpx;
	font-size: 28rpx;
}

</style>
