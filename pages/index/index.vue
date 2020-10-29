<template>
	<view class="home-container">
		<swiper class="home-banner" indicator-dots="true" indicator-color="rgba(255, 255, 255, .5)" indicator-active-color="white"  autoplay="true" circular="true">
		    <swiper-item v-for="(item, index) in bannerImages" :key="index">
		        <image class="home-banner__item" :src="item">A</image>
		    </swiper-item>
		</swiper>
		<view class="home-styles">
			<view class="home-styles__title">热门风格</view>
			<scroll-view class="scroll-view_H home-styles__list-container" scroll-x="true" enable-flex="true">
			 <view class="home-styles__list">
			 	<view
			 	  class="hot-style"
			 	  v-for="(style, index) in hotStyles"
			 	  :key="index"
			 	  @click="selectStyle(style)"
			 	>
			 		<image :src="getStyleSrc(style)" 
			 		  class="hot-style__image"
			 		  mode="aspectFill"  
			 		></image>
			 		<view class="hot-style__name">{{style}}</view>
			 	</view>
			 </view>
			</scroll-view>
		</view>
		<view class="home-commodities">
			<view class="home-commodities__title">精选产品</view>
			<view class="home-commodities__more">
				<text>更多</text>
				<image src="../../static/image/more@3x.png"  class="home-commodities__more__icon"></image>
			</view>
			<view class="home-commodities__body">
				<image class="home-commodity" v-for="commodity in commodities" :key="index" :src="commodity.img" @click="checkCommodityDetail(commodity)"></image>
			</view>
		</view>
		<!-- <view class="home-commodities">
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
		</view> -->
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
					'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/banner1.png'
					// 'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/banner2.jpg',
					// 'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/banner3.jpg'
				],
				hotStyles: ['赛博朋克', '浮世绘', '国画梅花', '和玺彩画', '蜡笔画', '铅笔画', '梵高', '康定斯基', '万圣节', '波普'],
				commodities: [
					{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/product1.png', url:''},
					{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/product2.png', url:''},
					{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/product3.png', url:''},
					{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/product4.png', url:''},
					{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/product5.png', url:''},
					{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/product6.png', url:''}
				]
			}
		},
		methods: {
			getStyleSrc(name){
				return "https://x-design.oss-cn-hangzhou.aliyuncs.com/styles/"+name+".jpg";
			},
			selectStyle(style){
				let _this = this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    success: function (res) {
				        uni.navigateTo({
				        	url: `/pages/pictureDesign/pictureDesign?url=${res.tempFilePaths[0]}&style=${style}`
				        });
				    }
				});
			}
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/home.less');
</style>
