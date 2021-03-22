<template>
	<view>
		<view class="background">
			<view >
				<image class="success-icon" src="../../static/image/panyment success.png"></image>
			</view>
			<span class="successword">支付成功</span>
			<span class="money">已支付￥{{actual}}</span>
			<span class="data">预计七个工作日内，即{{newDate}}发货</span>
			<view class="btn-content">
				<view class="btn btn-checkorders" @click="toMyOrders">查看订单</view>
				<view class="btn btn-backindex" @click="toIndex">返回首页</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		mounted: function () {
		  this.$nextTick(function () {
			this.resetTime()
		  })
		},
		data() {
			return {
				newDate: '',
				actual: 0
			}
		},
			
		methods:{
			resetTime: function(){
				let date = new Date();
				date.setDate(date.getDate() + 7);
				let month = (date.getMonth() + 1)
				month = month<10?`0${month}`:month
				let day = date.getDate()
				day = day<10?`0${day}`:day;
				let newDate = month + "月" + day+ "日"
				this.newDate = newDate
			},
			toMyOrders:function(){
				uni.reLaunch({
					url: '/pages/order/myOrders'
				})
			},
			toIndex:function(){
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			
		},
		onLoad(option) {
			this.actual=option.actual;
		}
		
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/payment success.less');
</style>
