<template>
	<view class="order-item">
		<view class="order-info" @click="toOrderInfo">
			<image class="order-pic" :src="item.preview" mode="aspectFit"></image>
			<view class="order-detail">
				<view class="main-info">
					<span class="name">{{categoryList[item.category].name}}</span>
					<span class="price">¥{{item.price}}</span>
				</view>
				<view class="model">{{item.model}}</view>
				<view class="count">x{{item.num}}</view>
				<view class="total">共{{item.num}}件商品，合计<span>¥{{item.actual}}</span></view>
			</view>
		</view>
		<view class="order-action">
			<span>商品{{stateList[item.state]}}</span>
			<view class="btn-content">
				<view class="btn btn-yellow" v-if="item.state === 'delivered'" @click="toLogistics">查看物流</view>
				<view class="btn" v-if="item.state === 'paid'">暂无物流</view>
				<view v-if="item.state === 'delivered'" class="btn btn-yellow" @click="confirmArrival">确认收货</view>
				<view v-if="item.state === 'arrived'" class="btn btn-yellow"  @click="toshowRate">晒单评价</view>
			</view>
		</view>
	</view>
</template>

<script>
	import category from '../../config/whiteMoldData'
	
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			},
		},
		data() {
			return {
				categoryList: category,
				stateList: {
					paid: '待发货',
					delivered: '已发货',
					arrived: '已签收',
					graded: '已评价'
				}
			}
		},
		methods: {
			toLogistics: function(item){
				uni.navigateTo({
					url: '/pages/order/logistics?oiid='+this.item.id
				})
			},
			toshowRate:function(){
				uni.navigateTo({
					url:'/pages/mine/myorders/showRate'
				})
			},
			toOrderInfo:function(){
				uni.navigateTo({
					url: '/pages/order/orderInfo?oiid='+this.item.id
				})
			},
			confirmArrival(){
				let _this = this;
				uni.showLoading({
					mask: true
				})
				this.$http.post('/order/confirmArrival', {oiid: this.item.id}).then(res => {
					uni.hideLoading();
					if(res.data.code !== 0){
						uni.showToast({
						    title: res.data.message,
						    duration: 1000,
							icon: 'none'
						});
						return;
					}
					uni.showToast({
					    title: "确认收货成功",
					    duration: 1000,
						icon: 'none'
					});
					_this.$emit('arrive');
				}).catch(err => {
					console.log(err);
					uni.hideLoading();
					uni.showToast({
					    title: "确认失败，请检查网络",
					    duration: 1000,
						icon: 'none'
					});
				})
			}
		},
		computed: {
			computedTotal() {
				return this.item.count*this.item.price; 
			}
		},
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/component/orderItem.less');
</style>
