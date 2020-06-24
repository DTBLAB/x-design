<template>
	<view class="mine-container">
		<view class="mine-info">
			<image class="mine-info__photo" :src="photo"></image>
			<view class="mine-info__nickname">{{nickname}}</view>
		</view>
		<view class="mine-block">
			<view class="mine-block__top">
				<view class="mine-block__title">图片库</view>
				<navigator class="mine-block__more">
					查看全部
					<image src="/../../static/image/home/路径 2018@3x.png"  class="mine-block__more__icon"></image>
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
					<image src="/../../static/image/home/路径 2018@3x.png"  class="mine-block__more__icon"></image>
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
				<image class="mine-bottom__item__icon" src="/../../static/image/home/路径 2018@3x.png"></image>
			</view>
			<view class="mine-bottom__item">
				<view class="mine-bottom__item__text">联系客服</view>
				<image class="mine-bottom__item__icon" src="/../../static/image/home/路径 2018@3x.png"></image>
			</view>
			<view class="mine-bottom__item">
				<view class="mine-bottom__item__text">关于我们</view>
				<image class="mine-bottom__item__icon" src="/../../static/image/home/路径 2018@3x.png"></image>
			</view>
		</view>
		<tab-bar position="mine"></tab-bar>
	</view>
</template>

<script>
	import tabBar from "@/component/tabBar/tabBar.vue"
	
	export default {
		components: {tabBar},
		data() {
			return {
				photo: '/static/image/mine/photo.png',
				nickname: '余杭西蓝花',
				myImages:[
					{src: '/static/image/mine/图库1.png', url:''},
					{src: '/static/image/mine/图库2.png', url:''},
					{src: '/static/image/mine/图库3.png', url:''},
					{src: '/static/image/mine/图库4.png', url:''},
					{src: '/static/image/mine/图库5.png', url:''}	
				],
				myOrders:[
					{img: '/static/image/mine/订单1.png', url:''},
					{img: '/static/image/mine/订单2.png', url:''}
				]
			}
		},
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
