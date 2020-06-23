<template>
	<view class="tab-bar-container">
		<view class="tab-bar-content">
			<navigator :class="isHome ? 'tab-bar-item--selected' : 'tab-bar-item'" open-type="reLaunch" url="/pages/index/index">
				<image class="tab-bar-item__icon" src="/static/image/home--select.png" v-if="isHome"></image>
				<image class="tab-bar-item__icon" src="/static/image/home.png" v-else></image>
				<text class="tab-bar-item__text">首页</text>
			</navigator>
			<image class="tab-bar-item--middle" src="/static/image/add.png"></image>
			<navigator :class="isMine ? 'tab-bar-item--selected' : 'tab-bar-item'"  open-type="reLaunch" url="/pages/mine/mine">
				<image class="tab-bar-item__icon" src="/static/image/user--select.png" v-if="isMine"></image>
				<image class="tab-bar-item__icon" src="/static/image/user.png" v-else></image>
				<text class="tab-bar-item__text">我的</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tabBar',
		props:{
			position: String
		},
		data() {
			return {
				bannerImages: [
					'/static/image/home/_Group4_8799ca78dc3040bf87291c9fb11df025KG_c_b_huihua(6)@3x.png',
					'/static/image/home/微信图片_20191111155607@3x.png'
				],
				isHome: this.position === 'home',
				isMine: this.position === 'mine'
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.tab-bar-container{
		position: fixed;
		height: 176rpx;
		padding: 0 96rpx;
		bottom: 0;
		left: 0;
		width: 558rpx;
		background-color: #FFFFFF;
		
		.tab-bar-content{
			width: 100%;
			height: 108rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: nowrap;
			
			.tab-bar-item{
				height: 72rpx;
				font-size: 20rpx;
				color: #999999;
				
				&--middle{
					height: 80rpx;
					width: 80rpx;
					display: block;
				}
				
				&--selected{
					height: 72rpx;
					font-size: 20rpx;
					color: #333333;
				}
				
				&__icon{
					width: 40rpx;
					height: 40rpx;
					display: block;
				}
				
				&__text{
					line-height: 28px;
					display: block;
				}
				
			}
		}
	}
</style>
