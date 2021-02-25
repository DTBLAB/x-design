<template>
	<view class="page-container">
		<view class="adrre-info">
			<view class="userInfo">
				<view class="userName">{{orderInfo.addressInfo.username}}</view>
				<view class="userPhone">{{orderInfo.addressInfo.phone}}</view>
			</view>
			<view class="shipping-address">{{orderInfo.addressInfo.address}}</view>
		</view>
		<view class="detail">
			<view v-for="item in orderInfo.items" :key="item" class="commodity">
				<image class="commodity-pic" :src="item.preview"></image>
				<view class="commo-info">
					<view class="commo-detail">
						<span class="item-name">{{categoryList[item.category].name}}</span>
						<span class="item-price" >￥{{item.price}}</span>
					</view>
					<view class="count">× {{item.num}}</view>
				</view>
			</view>
			<view class="delivery">
				<view class="delivery-info">
					<view class="ways">配送方式</view>
					<view class="pay">快递￥{{orderInfo.express}}</view>
				</view>
				<view class="total">共{{orderInfo.items.length}}件商品，合计<span>¥{{ComputePriceTotal}}</span></view>
			</view>
		</view>
		<view class="sub-order">
			<view class="sumPrice">合计<span style="font-size:36rpx;font-weight: 700;">¥{{ComputePriceTotal}}</span></view>
			<view class="btn-submit" @click="submitOrder">提交订单</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import category from '../../config/whiteMoldData'
	
	export default{
		components: {uniNumberBox},
		data(){
			return{
				orderInfo: {
					addressInfo: {
						username:'余杭⻄西兰花',
						phone: '12373628265',
						address: '浙江省杭州市 XX区 XX街道 XX路路XX号'
					},
					items: [],
					express: 6
				},
				categoryList: category
			}
		},
		method:{
			
		},
		onLoad(){
			try {
			    const value = uni.getStorageSync('orderItems');
			    if (value) {
			        console.log(value);
					this.orderInfo.items = value;
					uni.removeStorageSync('storage_key');
			    }
			} catch (e) {
			    // error
			}

		},
		computed: {
			ComputePriceTotal() {
				return 100;
			}
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/confirmOrder.less');
</style>