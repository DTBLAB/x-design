<template>
	<view>
		<view class="logistics-address">
			<view class="logistics-info">
				<image class="logisticslogo" src="../../static/image/logistics-icon.png"></image>
				<view class="new-trace" v-if="orderInfo.state !== 'paid'">
					<view class="trace">{{traceInfo[0].AcceptStation}}</view>
					<view class="time">{{traceInfo[0].AcceptTime}}</view>
				</view>
				<view v-else class="new-trace">待发货</view>
			</view>
			<view class="address-info">
				<image class="addresslogo" src="../../static/image/address-icon.png"></image>
				<view class="Info">
					<view class="user-name-phone">
						<view class="name">{{orderInfo.consignee}}</view>
						<view class="phone">{{orderInfo.phone}}</view>
					</view>
					<view class="shipping-address">{{orderInfo.province+orderInfo.city+orderInfo.district+" "+orderInfo.detail}}</view>
				</view>
			</view>
		</view>
		<view class="commodiy-info">
			<view class="commodity">
				<image class="commodity-pic" :src="orderInfo.preview" mode="aspectFit"></image>
				<view class="detail">
					<span class="item-name">{{categoryList[orderInfo.category].name}}</span>
					<span class="item-price" style="text-align: right">￥{{orderInfo.price}}</span>
				</view>
				<view class="sumcount">x{{orderInfo.num}}</view>
			</view>
			<view class="delivery-info">
				<view class="delivery">
					<view class="ways">配送方式</view>
					<view class="pay">快递￥{{orderInfo.express}}</view>
				</view>
				<view class="total">共{{orderInfo.num}}件商品，合计<span>¥{{orderInfo.origin}}</span></view>
			</view>
		</view>
		<view class="others">
			<view class="order-number">
				<view class="item1">订单编号</view>
				<view class="number">{{orderInfo.number}}</view>
			</view>
			<!-- <view class="pay-methods">
				<view class="item2">支付方式</view>
				<view class="method">{{orderInfo.payType}}</view>
			</view> -->
			<view class="create-time">
				<view class="item3">创建时间</view>
				<view class="time">{{orderInfo.createTime}}</view>
			</view>
			<view class="create-time" v-if="orderInfo.state === 'paid' || orderInfo.state === 'delivered' || orderInfo.state === 'arrived' || orderInfo.state === 'graded'">
				<view class="item3">支付时间</view>
				<view class="time">{{orderInfo.payTime}}</view>
			</view>
			<view class="create-time" v-if="orderInfo.state === 'delivered' || orderInfo.state === 'arrived' || orderInfo.state === 'graded'">
				<view class="item3">发货时间</view>
				<view class="time">{{orderInfo.deliverTime}}</view>
			</view>
			<view class="create-time" v-if="orderInfo.state === 'arrived' || orderInfo.state === 'graded'">
				<view class="item3">收货时间</view>
				<view class="time">{{orderInfo.payTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import category from '../../config/whiteMoldData'
	
export default {
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			let _this = this;
			this.oiid = parseInt(option.oiid);
			this.$http.get('/order/getItem', {oiid: this.oiid}).then(res => {
				if(res.data.code !== 0){
					uni.showToast({
					    title: res.data.message,
					    duration: 1000,
						icon: 'none'
					});
					return;
				}
				_this.orderInfo = res.data.data;
				
			}).catch(err => {
				uni.showToast({
				    title: "网络问题，地址加载失败",
				    duration: 1000,
					icon: 'none'
				});
			});
		},
		data() {
			return {
				orderInfo: {
					
				},
				traceInfo: [{
					AcceptStation:'杭州转运中心已发出，下一站广州转运中心 ',
					AcceptTime:'2020-05-14 20:52:41'
				}],
				oiid: 0,
				categoryList: category
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
@import url('../../common/less/orderInfo.less');
</style>