<template>
	<view class="home-container">
		<swiper class="home-banner" indicator-dots="true" indicator-color="rgba(255, 255, 255, .5)" indicator-active-color="white"  autoplay="true" circular="true">
		    <swiper-item v-for="(item, index) in bannerImages" :key="index">
		        <image class="home-banner__item" :src="item">A</image>
		    </swiper-item>
		</swiper>
		<view class="home-styles">
			<view class="home-styles__title">风格推荐</view>
			<scroll-view class="scroll-view_H home-styles__list-container" scroll-x="true" enable-flex="true">
			 <view class="home-styles__list">
			 	<view v-for="(item, index) in styleImages" :key="index" class="home-styles__item">
			 	  	<image :src="item.img" class="home-styles__item__image"></image>
			 	  	<text class="home-styles__item__name">{{item.name}}</text>
			 	</view>
			 </view>
			</scroll-view>
		</view>
		<view class="home-commodities">
			<view class="home-commodities__title">定制推荐</view>
			<view class="home-commodity" v-for="(commodity, index) in commodities" :key="index">
				<view class="home-commodity__name">{{commodity.name}}</view>
				<navigator class="home-commodity__more" open-type="navigate" :url="commodity.url">
					<text>查看更多</text>
					<image src="/s../../static/image/more@3x.png"  class="home-commodity__more__icon"></image>
				</navigator>
				<view class="home-commodity__list">
					<image class="home-commodity__item"
						v-for="(item, index1) in commodity.items" 
						:key="index1"
						:src="item.img"
						mode="widthFix"
					></image>
				</view>
			</view>
		</view>
		<tab-bar position="home"></tab-bar>
	</view>
</template>

<script>
	import tabBar from "@/component/tabBar/tabBar.vue"
	
	export default {
		components: {tabBar},
		data() {
			return {
				bannerImages: [
					'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/banner1.jpg',
					'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/banner2.jpg',
					'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/banner3.jpg'
				],
				styleImages: [
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/蒙版组 8@3x.png', name: '龙袍', url:''},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/蒙版组 9@3x.png', name: '和玺彩画', url:''},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/蒙版组 10@3x.png', name: '敦煌', url:''},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/蒙版组 11@3x.png', name: '水墨画', url:''},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/蒙版组 12@3x.png', name: '水彩', url:''}
				],
				commodities: [
					{name: '帆布袋', url: '', items:[
						{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/33@3x.png', url:''},
						{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/5d638e34a356b@3x.png', url:''},
						{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/888@3x.png', url:''}
					]},
					{name: '抱枕', url: '', items:[
						{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/5d63c1c25ac60@3x.png', url:''},
						{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/111111@3x.png', url:''},
						{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/666@3x.png', url:''}
					]}
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/home.less');
</style>
