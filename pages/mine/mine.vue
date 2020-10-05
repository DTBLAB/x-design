<template>
	<view class="mine-container">
		<view class="mine-info">
			<image class="mine-info__avatar" :src="avatarUrl" v-if="hasLogin"></image>
			<navigator open-type="navigate" url="/pages/login/login" v-else><image class="mine-info__avatar" src="../../static/image/default-photo.jpg"></image></navigator>
			<view class="mine-info__nickname" v-if="hasLogin">{{nickname}}</view>
			<view class="mine-info__nickname"  v-else>点击登录</view>
		</view>
		<view class="mine-orders">
			<view class="mine-orders__top">
				<view class="mine-orders__title">我的订单</view>
				<navigator class="mine-orders__more">
					查看全部
					<image src="/../../static/image/more@3x.png"  class="mine-orders__more__icon"></image>
				</navigator>
			</view>
			<view class="mine-orders__body">
				<view class="mine-orders__button">
					<image class="mine-orders__button__icon" src="../../static/image/mine/unpaid.png"></image>
					<text class="mine-orders__button__text">待付款</text>
					<badge :num="orderNums[0]" v-if="orderNums[0] !== 0"></badge>
				</view>
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
		<view class="mine-block">
			<view class="mine-block__top">
<<<<<<< HEAD
				<view class="mine-block__title">图片库</view>
				<navigator class="mine-block__more" url="../myPicture/myPicture">
=======
				<view class="mine-block__title">我的图片</view>
				<navigator class="mine-block__more" url="./myPhotos">
>>>>>>> 583a07fb8b22cecbb1f04554ae1edae97ccc8593
					查看全部
					<image src="/../../static/image/more@3x.png"  class="mine-block__more__icon"></image>
				</navigator>
			</view>
			<view class="mine-block__list-container">
				<view class="mine-block__list">
					<image class="mine-block__item" v-for="(item, index) in myImages" :key="index" :src="item.src"></image>
				</view>
			</view>
		</view>
		<view class="mine-block">
			<view class="mine-block__top">
				<view class="mine-block__title">购物车</view>
				<navigator class="mine-block__more">
					查看全部
					<image src="/../../static/image/more@3x.png"  class="mine-block__more__icon"></image>
				</navigator>
			</view>
			<view class="mine-block__list-container">
				<view class="mine-block__list">
					<image class="mine-block__item" v-for="(item, index) in myOrders" :key="index" :src="item.img"></image>
				</view>
			</view>
		</view>
		<view class="mine-block">
			<view class="mine-block__top">
				<view class="mine-block__title">购物车</view>
				<navigator class="mine-block__more" url="../cart/cart">
					查看全部
					<image src="/../../static/image/more@3x.png"  class="mine-block__more__icon"></image>
				</navigator>
			</view>
			<view class="mine-block__list-container">
				<view class="mine-block__list">
					<image class="mine-block__item" v-for="(item, index) in myCarts" :key="index" :src="item.img"></image>
				</view>
			</view>
		</view>
		<view class="mine-bottom">
			<navigator url="../address/address">
				<view class="mine-bottom__item">
						<view class="mine-bottom__item__text">地址管理</view>
						<image class="mine-bottom__item__icon" src="/../../static/image/more@3x.png"></image>
				</view>
			</navigator>
			<view class="mine-bottom__item">
				<view class="mine-bottom__item__text">
					联系客服
					</view>
				<image class="mine-bottom__item__icon" src="/../../static/image/more@3x.png"></image>
			</view>
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
				myImages:[
					{src: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/mine/图库1.png', url:''},
					{src: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/mine/图库2.png', url:''},
					{src: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/mine/图库3.png', url:''},
					{src: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/mine/图库4.png', url:''},
					{src: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/mine/图库5.png', url:''}	
				],
				myOrders:[
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/mine/订单1.png', url:''},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/mine/订单2.png', url:''}
				],
<<<<<<< HEAD
				myCarts: [
					{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/111111@3x.png', url:''}
				]
=======
				orderNums:[0, 3, 4, 2]
>>>>>>> 583a07fb8b22cecbb1f04554ae1edae97ccc8593
			}
		},
		computed: mapState(['hasLogin', 'nickname' ,'avatarUrl']),
		methods: {
			
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
