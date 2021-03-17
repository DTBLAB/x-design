<template>
	<view class="page-container">
		
		<view class="adrre-info" v-if="orderInfo.address" @click="selectAddress">
			<view class="userInfo">
				<view class="userName">{{orderInfo.address.consignee}}</view>
				<view class="userPhone">{{orderInfo.address.phone}}</view>
			</view>
			<view class="shipping-address">{{orderInfo.address.province+orderInfo.address.city+" "+orderInfo.address.district+" "+orderInfo.address.detail}}</view>
		</view>
		<view class="adrre-info" v-else @click="selectAddress">请选择收货地址</view>
		<view class="detail">
			<view v-for="item in orderInfo.items" :key="item" class="commodity">
				<image class="commodity-pic" :src="item.preview" mode="aspectFit"></image>
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
				<view class="total">共{{orderInfo.items.length}}件商品，合计<span>¥{{computeTotal}}</span></view>
			</view>
		</view>
		<view class="sub-order">
			<view class="sumPrice">合计<span style="font-size:36rpx;font-weight: 700;margin-left: 12rpx;">¥{{computeTotal}}</span></view>
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
					address: null,
					items: [],
					express: 6,
					discount: 0
				},
				categoryList: category
			}
		},
		methods:{
			submitOrder(){
				let _this = this;
				if(!this.orderInfo.address){
					uni.showToast({
						icon:"none",
						title:"请选择地址",
						duration:1000
					})
					return;
				}
				if(!this.orderInfo.items || this.orderInfo.items.length === 0){
					uni.showToast({
						icon:"none",
						title:"商品不得为空",
						duration:1000
					})
					return;
				}
				uni.showLoading({
					mask: true,
					title: "订单提交中"
				})
				this.$http.post('/order/place', this.orderInfo).then(res => {
					uni.hideLoading();
					// console.log(res);
					if(res.data.code !== 0){
						uni.showToast({
						    title: res.data.message,
						    duration: 1000,
							icon: 'none'
						});
					}else{
						uni.showToast({
						    title: "下单成功，前往支付",
						    duration: 1000,
							icon: 'success'
						});
						let data = res.data.data;
						uni.requestPayment({
						    provider: 'wxpay',
						    timeStamp: data.timeStamp,
						    nonceStr: data.nonceStr,
						    package: data.package,
						    signType: data.signType,
						    paySign: data.paySign,
						    success: function (res) {
						        // console.log('success:' + JSON.stringify(res));
								_this.finishPayment(data.out_trade_no);
						    },
						    fail: function (err) {
						        uni.showToast({
						            title: "支付失败",
						            duration: 1000,
						        	icon: 'none'
						        });
								uni.redirectTo({
									url: '/pages/cart/cart'
								})
						    }
						});
					}
				}).catch(err => {
					console.log(err);
					uni.hideLoading();
					uni.showToast({
					    title: "下单失败",
					    duration: 1000,
						icon: 'none'
					});
				})
			},
			finishPayment(out_trade_no){
				uni.showLoading({
					mask: true,
					title: "支付中"
				})
				this.$http.get('/order/checkPayment', {out_trade_no: out_trade_no}).then(res => {
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
					    title: "支付成功",
					    duration: 1000,
						icon: 'success'
					});
					uni.redirectTo({
						url: '/pages/order/paymentSuccess'
					})
				}).catch(err => {
					console.log(err);
				});
			},
			selectAddress(){
				uni.navigateTo({
					url: "/pages/address/address?isSelecting=true"
				})
			}
		},
		onLoad(){
			try {
			    const value = uni.getStorageSync('orderItems');
			    if (value) {
			        // console.log(value);
					this.orderInfo.items = value;
					uni.removeStorageSync('storage_key');
			    }
			} catch (e) {
			    // error
			}
			
			let _this = this;
			this.$http.get('/address/getDefault').then(res => {
				if(res.data.code !== 0){
					uni.showToast({
					    title: res.data.message,
					    duration: 1000,
						icon: 'none'
					});
					return;
				}
				if(res.data.data){
					_this.orderInfo.address = res.data.data;
				}
				
			}).catch(err => {
				console.log(err);
			});

		},
		onShow() {
			let address = uni.getStorageSync("selectedAddress");
			uni.removeStorageSync("selectedAddress")
			if (address) {
			    this.orderInfo.address = address;
			}
		},
		computed: {
			computeTotal() {
				let sum = this.orderInfo.express;
				for(let item of this.orderInfo.items){
					sum += item.price*item.num;
				}
				return sum;
			}
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/confirmOrder.less');
</style>