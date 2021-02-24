<template>
	<view class="main-info">
		<view class="Rate-list">
			<view class="commodity-info">
				<image class="orderRate-image" src="../../../static/image/canvas-bag.png"></image>
				<span class="name">帆布包</span>
			</view>
			<view class="rate-info">
				<view class="commodity-quality">
					<span >产品质量</span>
					<uni-rate class="rate-quality" allow-half :value="4" />
				</view>
				<view class="logistics-survice">
					<span>物流服务</span>
					<uni-rate class="rate-logistics" allow-half :value="3.5" />
				</view>
				<view class="rate-commodity">
					<span>商品评价</span>
					<view class="commodity-evaluation">
					<textarea class="inputarea" placeholder="您的评价对其他用户很重要哦"/>
					</view>
				</view>
			</view>
			<view class="add-photo" @click="img">
				<image src="../../../static/image/add-photo.png" class="addphoto-image" ></image>
				<view class="add-photo-tips">添加图片</view>
			</view>
		</view>
		<view class="btn-submitrate">提交评价</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
			}
		},
		onLoad: function (option) { 
			console.log(option.pic); 
			console.log(option.name); 
		},
		methods:{
			img:function(){
				uni.chooseImage({
					sourceType: "album",
					success: function (res) {
						console.log(res);
					}
				});
			}
		},
	}
	
</script>

<style lang="less" scoped>
@import url('../../../common/less/showRate.less');
</style>