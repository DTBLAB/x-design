<template>
	<view>
		<view class="adrre-info">
			<view class="userInfo">
				<view class="userName">{{orderInfo.addressInfo.username}}</view>
				<view class="userPhone">{{orderInfo.addressInfo.phone}}</view>
			</view>
			<view class="shipping-address">{{orderInfo.addressInfo.address}}</view>
		</view>
		<view class="detail">
			<view class="commodity">
				<image class="commodity-pic" src="../../../static/image/pillow.png"></image>
				<view class="commo-info">
					<view class="commo-detail">
						<span class="item-name">{{orderInfo.storeInfo.name}}</span>
						<span class="item-price" >￥{{orderInfo.storeInfo.price}}</span>
					</view>
					<uni-number-box class="count"></uni-number-box>
				</view>
			</view>
			<view class="delivery">
				<view class="delivery-info">
					<view class="ways">配送方式</view>
					<view class="pay">快递￥{{orderInfo.storeInfo.express}}</view>
				</view>
				<view class="total">共{{orderInfo.storeInfo.count}}件商品，合计<span>¥{{ComputePriceTotal}}</span></view>
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
					storeInfo: {
						name: '帆布袋',
						price: 29,
						count:2,
						express: '6'
					}
				},
			}
		},
		method:{
			
		},
		computed: {
			ComputePriceTotal() {
				return this.orderInfo.storeInfo.count *  this.orderInfo.storeInfo.price +  Number(this.orderInfo.storeInfo.express)
			}
		}
	}
</script>

<style lang="less" scoped>
@import url('../../../common/less/confirmOrder.less');
</style>