<template>
	<view>
		<view class="logistics-address">
			<view class="logistics-info">
				<image class="logisticslogo" src="../../../static/image/logistics-icon.png"></image>
				<view class="new-trace">
					<view class="trace">{{orderInfo.traceInfo[0].AcceptStation}}</view>
					<view class="time">{{orderInfo.traceInfo[0].Accepttime}}</view>
				</view>
			</view>
			<view class="address-info">
				<image class="addresslogo" src="../../../static/image/address-icon.png"></image>
				<view class="Info">
					<view class="user-name-phone">
						<view class="name">{{orderInfo.addressInfo.username}}</view>
						<view class="phone">{{orderInfo.addressInfo.phone}}</view>
					</view>
					<view class="shipping-address">{{orderInfo.addressInfo.address}}</view>
				</view>
			</view>
		</view>
		<view class="commodiy-info">
			<view class="commodity">
				<image class="commodity-pic" src="../../../static/image/pillow.png"></image>
				<view class="detail">
					<span class="item-name">{{orderInfo.storeInfo.name}}</span>
					<span class="item-price" style="text-align: right">￥{{orderInfo.storeInfo.price}}</span>
				</view>
				<view class="sumcount">x{{orderInfo.storeInfo.count}}</view>
			</view>
			<view class="delivery-info">
				<view class="delivery">
					<view class="ways">配送方式</view>
					<view class="pay">快递￥{{orderInfo.storeInfo.express}}</view>
				</view>
				<view class="total">共{{orderInfo.storeInfo.count}}件商品，合计<span>¥{{ComputePriceTotal}}</span></view>
			</view>
		</view>
		<view class="others">
			<view class="order-number">
				<view class="item1">订单编号</view>
				<view class="number">{{orderInfo.orderNum}}</view>
			</view>
			<view class="pay-methods">
				<view class="item2">支付方式</view>
				<view class="method">{{orderInfo.payType}}</view>
			</view>
			<view class="create-time">
				<view class="item3">创建时间</view>
				<view class="time">{{orderInfo.createTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
		mounted: function () {
		  this.$nextTick(function () {
			
		  })
		},
		data() {
			return {
				orderInfo: {
					traceInfo: [{
						AcceptStation:'杭州转运中心已发出，下一站广州转运中心 ',
						AcceptTime:'2020-05-14 20:52:41'
					}],
					addressInfo: {
						username:'余杭⻄西兰花',
						phone: '12373628265',
						address: '浙江省杭州市 XX区 XX街道 XX路路XX号'
					},
					storeInfo: {
						name: '抱枕',
						price: 26,
						count: 1,
						express: '6'//快递费
					},
					orderNum: '2011345940604877058',
					payType: '微信支付',
					createTime: '2020-05-10 18:30'
				},
			}
		},
		computed: {
			ComputePriceTotal() {
				return this.orderInfo.storeInfo.count *  this.orderInfo.storeInfo.price +  Number(this.orderInfo.storeInfo.express)
			}
		},
		methods: {
			getInfo(){
				//请求
				
			}
		}
	}
	
</script>

<style lang="less" scoped>
@import url('../../../common/less/orderInfo.less');
</style>