<template>
	<view class="mine-container">
		<view class="mine-info">
			<image class="mine-info__avatar" :src="avatarUrl" v-if="hasLogin"></image>
			<navigator open-type="navigate" url="/pages/login/login" v-else><image class="mine-info__avatar" src="../../static/image/default-photo.jpg"></image></navigator>
			<view class="mine-info__nickname" v-if="hasLogin">{{nickname}}</view>
			<view class="mine-info__nickname"  v-else>点击登录</view>
		</view>
		<view class="mine-block">
			<view class="mine-block__top">
				<view class="mine-block__title">图片库</view>
				<navigator class="mine-block__more">
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
				<view class="mine-block__title">商品订单</view>
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
		<view class="mine-bottom">
			<view class="mine-bottom__item">
				<view class="mine-bottom__item__text">地址管理</view>
				<image class="mine-bottom__item__icon" src="/../../static/image/more@3x.png"></image>
			</view>
			<view class="mine-bottom__item">
				<view class="mine-bottom__item__text">联系客服</view>
				<image class="mine-bottom__item__icon" src="/../../static/image/more@3x.png"></image>
			</view>
			<view class="mine-bottom__item">
				<view class="mine-bottom__item__text">关于我们</view>
				<image class="mine-bottom__item__icon" src="/../../static/image/mores@3x.png"></image>
			</view>
		</view>
		<tab-bar position="mine"></tab-bar>
	</view>
</template>

<script>
	import tabBar from "@/component/tabBar/tabBar.vue"
	import { mapState } from 'vuex'
	
	export default {
		components: {tabBar},
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
				]
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
