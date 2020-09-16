<template>
	<view class="order-item">
		<view class="order-info" @click="toorderInfo">
			<view class="order-pic" :style="{backgroundImage: 'url(' + item.pic + ')'}"></view>
			<view class="order-detail">
				<view class="main-info">
					<span class="name">{{item.name}}</span>
					<span class="price">¥{{item.price}}</span>
				</view>
				<view class="count">x{{item.count}}</view>
				<view class="total">共{{item.count}}件商品，合计<span>¥{{computedTotal}}</span></view>
			</view>
		</view>
		<view class="order-action">
			<span>商品{{item.status}}</span>
			<view class="btn-content">
				<view class="btn btn-grey" @click="toLogistics">查看物流</view>
				<view v-if="item.status != '待评价'" class="btn btn-yellow">确认收货</view>
				<view v-if="item.status == '待评价'" class="btn btn-yellow"  @click="toshowRate">晒单评价</view>
			</view>
		</view>
	</view>
</template>

<script>
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
				
			}
		},
		methods: {
			toLogistics: function(item){
				uni.navigateTo({
					url: '/pages/mine/myorders/logistics?price = item.price & count = item.count & name = item.name'
				})
			},
			toshowRate:function(){
				uni.navigateTo({
					url:'/pages/mine/myorders/showRate'
				})
			},
			toorderInfo:function(){
				uni.navigateTo({
					url: '/pages/mine/myorders/orderInfo'
				})
			},
		},
		computed: {
			computedTotal() {
				return this.item.count*this.item.price; 
			}
		},
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/orderItem.less');
</style>
