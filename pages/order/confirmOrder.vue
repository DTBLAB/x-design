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
					<view class="model">{{item.model}}</view>
					<view class="count"><wm-numberBox :min="min" :max="max" model="1" :value="inputNum" @change="inputChange" :ID="i"></wm-numberBox></view>
				</view>
			</view>
			<view class="delivery">
				<view class="delivery-info">
					<view class="ways">配送方式</view>
					<view class="pay">快递￥{{orderInfo.express}}</view>
				</view>
				<view class="total">共{{total}}件商品，合计<span>¥{{computeTotal}}</span></view>
			</view>
		</view>
		<view class="sub-order">
			<view class="sumPrice">合计<span style="font-size:36rpx;font-weight: 700;margin-left: 12rpx;">¥{{computeTotal}}</span></view>
			<view class="btn-submit" @click="submitOrder">提交订单</view>
		</view>
		
		<!-- <view class="collection-code-container" v-if="showing">
			<image class="collection-code" src="../../static/image/collection-code.png" mode="widthFix"></image>
			<div class="total">￥{{computeTotal}}</div>
			<button class="goPay" @click="requestPayment">已支付，点此输入密码123654</button>
			<div class="goBack" @click="hideCollectionCode">返回确认订单界面</div>
		</view> -->
	</view> 
</template>

<script>
	import wmNumberBox from "@/components/wm-numberBox/wm-number-box.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import category from '../../config/whiteMoldData'
	
	
	export default{
		components: {wmNumberBox},
		data(){
			return{
				orderInfo: {
					address: null,
					items: [],
					express: 0,
					discount: 0
				},
				total: 0,
				categoryList: category,
				payParams: null,
				showing: false,
				
				min: 1,
				max: 99,
				inputNum: 1
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
				this.$http.post('/order/place', this.orderInfo, {timeout: 30000}).then(res => {
					uni.hideLoading();
					// console.log(res);
					if(res.data.code !== 0){
						uni.showToast({
						    // title: res.data.message,
							title: "请删除重添加小程序，即可正常付款",
						    duration: 2000,
							icon: 'none'
						});
					}else{
						uni.showToast({
						    title: "下单成功，前往支付",
						    duration: 2000,
							icon: 'success'
						});
						_this.payParams = res.data.data;
						_this.requestPayment();
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
			showCollectionCode(){
				this.showing = true;
			},
			hideCollectionCode(){
				this.showing = false;
			},
			requestPayment(){
				let data = this.payParams;
				let _this = this;
				
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
						// uni.redirectTo({
						// 	url: '/pages/cart/cart'
						// })
				    }
				});
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
						url: '/pages/order/paymentSuccess?actual='+res.data.data.actual
					})
				}).catch(err => {
					console.log(err);
				});
			},
			selectAddress(){
				uni.navigateTo({
					url: "/pages/address/address?isSelecting=true"
				})
			},
			calculateExpress(){
				if(this.orderInfo.address && this.orderInfo.address.province){
					let province = this.orderInfo.address.province;
					const farProvinces = ['新疆维吾尔自治区', '西藏自治区', '内蒙古自治区', '青海省', '甘肃省', '宁夏回族自治区'];
					const specialProvinces = ['澳门特别行政区', '香港特别行政区', '台湾省'];
					if(farProvinces.indexOf(province)>=0){
						this.orderInfo.express = 20 * this.total;
					}
					if(specialProvinces.indexOf(province)>=0){
						this.orderInfo.express = 99;
					}
				}
			},
			inputChange(e){
				let {value, id} = e;
				let i = Number(id);
				this.orderInfo.items[i].num = value;
				this.inputNum = value;
				this.calculateTotal();
			},
			calculateTotal(){
				let sum = 0;
				for(let item of this.orderInfo.items){
					sum += item.num;
				}
				this.total = sum;
			}
		},
		onLoad(){
			try {
			    const value = uni.getStorageSync('orderItems');
				// console.log(value);
			    if (value) {
			        console.log(value);
					this.orderInfo.items = value;
					uni.removeStorageSync('orderItems');
					
					let num = 0;
					for(let i=0; i<value.length; i++){
						this.orderInfo.items[i].num = value[i].num
						this.orderInfo.items[i].price
						num += value[i].num;
					}
					this.total = num;
			        console.log(this.orderInfo.items);
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
					this.calculateExpress();
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
				this.calculateExpress();
			}
		},
		computed: {
			computeTotal() {
				let sum = this.orderInfo.express*100;
				for(let item of this.orderInfo.items){
					sum += item.price*item.num*100;
				}
				return Number(sum/100).toFixed(2);
			}
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/confirmOrder.less');
</style>