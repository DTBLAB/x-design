<template>
	<view class="mine-container">
		<view class="mine-info">
			<image class="mine-info__avatar" :src="avatarUrl" v-if="hasLogin"></image>
			<navigator open-type="navigate" url="/pages/login/login" v-else><image class="mine-info__avatar" src="../../static/image/default-photo.jpg"></image></navigator>
			<view class="mine-info__nickname" v-if="hasLogin">{{nickname}}</view>
			<view class="mine-info__nickname"  v-else>点击登录</view>
		</view>
		<view class="mine-orders" @click="checkOrders">
			<view class="mine-orders__top">
				<view class="mine-orders__title">我的订单</view>
				<view class="mine-orders__more">
					<image src="/../../static/image/more@3x.png"  class="mine-orders__more__icon"></image>
				</view>
			</view>
			<view class="mine-orders__body">
				<!-- <view class="mine-orders__button">
					<image class="mine-orders__button__icon" src="../../static/image/mine/unpaid.png"></image>
					<text class="mine-orders__button__text">待付款</text>
					<badge :num="orderNums[0]" v-if="orderNums[0] !== 0"></badge>
				</view> -->
				<view class="mine-orders__button">
					<image class="mine-orders__button__icon" src="../../static/image/mine/unshipped.png"></image>
					<text class="mine-orders__button__text">待发货</text>
					<badge :num="orderNums[1]" v-if="orderNums[1] !== 0"></badge>
				</view>
				<view class="mine-orders__button">
					<image class="mine-orders__button__icon" src="../../static/image/mine/unreceived.png"></image>
					<text class="mine-orders__button__text">待收货</text>
					<badge :num="orderNums[2]" v-if="orderNums[2] !== 0"></badge>
				</view>
				<view class="mine-orders__button">
					<image class="mine-orders__button__icon" src="../../static/image/mine/unrated.png"></image>
					<text class="mine-orders__button__text">待评价</text>
					<badge :num="orderNums[3]" v-if="orderNums[3] !== 0"></badge>
				</view>
			</view>
		</view>
		<navigator class="mine-block" url="./myPictures">
			<view class="mine-block__top">
				<view class="mine-block__title">我的图片</view>
				<view class="mine-block__more">
					<image src="/../../static/image/more@3x.png"  class="mine-block__more__icon"></image>
				</view>
			</view>
			<view class="mine-block__list-container">
				<view class="mine-block__list">
					<image class="mine-block__item" v-for="(item, index) in myPictures" :key="index" :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
		</navigator>
		<!-- <navigator class="mine-block" url="/pages/cart/cart"> -->
		<navigator class="mine-block" url="/pages/mine/myProducts">	
			<view class="mine-block__top">
				<view class="mine-block__title">我的产品</view>
				<view class="mine-block__more">
					<image src="/../../static/image/more@3x.png"  class="mine-block__more__icon"></image>
				</view>
			</view>
			<view class="mine-block__list-container">
				<view class="mine-block__list">
					<image class="mine-block__item" v-for="(item, index) in myProducts" :key="index" :src="item.preview" mode="aspectFit"></image>
				</view>
			</view>
		</navigator>
		<view class="mine-bottom">
			<navigator class="mine-bottom__item" url="/pages/address/address">
				<view class="mine-bottom__item__text">地址管理</view>
				<image class="mine-bottom__item__icon" src="/../../static/image/more@3x.png"></image>
			</navigator>
			<navigator class="mine-bottom__item" url="/pages/review/myReviews">
				<view class="mine-bottom__item__text">我的评价</view>
				<image class="mine-bottom__item__icon" src="/../../static/image/more@3x.png"></image>
			</navigator>
			<navigator class="mine-bottom__item" url="/pages/mine/ServiceDisplay">
				<view class="mine-bottom__item__text">联系客服</view>
				<image class="mine-bottom__item__icon" src="/../../static/image/more@3x.png"></image>
			</navigator>
			<view class="mine-bottom__item">
				<view class="mine-bottom__item__text">关于想定</view>
				<image class="mine-bottom__item__icon" src="/../../static/image/more@3x.png"></image>
			</view>
		</view>
		<tab-bar position="mine"></tab-bar>
	</view>
</template>

<script>
	import tabBar from "@/component/tabBar/tabBar.vue"
	import badge from "@/component/badge/badge.vue"
	import { mapState } from 'vuex'
	
	export default {
		components: {tabBar, badge},
		data() {
			return {
				// isAuthorized: !!uni.getStorageSync('token'),
				// photo: uni.getStorageSync('photo') || '/static/image/mine/photo.png',
				// nickname: uni.getStorageSync('nickname') || '点击登录',
				myPictures:[],
				myProducts:[],
				orderNums:[0, 3, 4, 2]
			}
		},
		computed: mapState(['hasLogin', 'nickname' ,'avatarUrl']),
		onShow(){
			let _this = this;
			this.$http.get('/picture/getList').then(res => {
				if(res.data.code !== 0){
					uni.showToast({
					    title: res.data.message,
					    duration: 1000,
						icon: 'none'
					});
					return;
				}
				_this.myPictures = res.data.data;
				
			}).catch(err => {
				uni.showToast({
				    title: "网络问题，图片加载失败",
				    duration: 1000,
					icon: 'none'
				});
			});
			this.$http.get('/product/getList').then(res => {
				if(res.data.code !== 0){
					uni.showToast({
					    title: res.data.message,
					    duration: 1000,
						icon: 'none'
					});
					return;
				}
				_this.myProducts = res.data.data;
				
			}).catch(err => {
				uni.showToast({
				    title: "网络问题，图片加载失败",
				    duration: 1000,
					icon: 'none'
				});
			});
			
			this.$http.get('/order/getOrderNums').then(res => {
				if(res.data.code !== 0){
					uni.showToast({
					    title: res.data.message,
					    duration: 1000,
						icon: 'none'
					});
					return;
				}
				console.log(res);
				_this.orderNums = res.data.data;
				
			}).catch(err => {
				uni.showToast({
				    title: "网络问题，图片加载失败",
				    duration: 1000,
					icon: 'none'
				});
			});
		},
		methods: {
			checkOrders(){
				uni.navigateTo({
					url:"/pages/order/myOrders"
				})
			}
		}
	}
</script>

<style>
page {
	background-color: #F4F4F4;
}
</style>

<style lang="less" scoped>
@import url('../../common/less/mine.less');
</style>
