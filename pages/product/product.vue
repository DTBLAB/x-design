<template>
	<view class="product-container">
		<view class="product-background">
			<image class="product-image" src="https://x-design.oss-cn-hangzhou.aliyuncs.com/product/product.png" mode="widthFix"></image>
		</view>
			
<!-- 		<view class="prodcut-bannercontainer">
			<swiper class="product-banner">
				<swiper-item v-for="(item, index) in productImages" :key="index">
					<image class="product-banner__image" :src="item"></image>
				</swiper-item>
			</swiper>
		</view> -->
		
		<view class="product-bottom">
			<navigator class="product-bottom__home" url="../index/index">
				<image class="product-bottom__home__icon" src="https://x-design.oss-cn-hangzhou.aliyuncs.com/product/首页.png" mode="widthFix"></image>
				<text class="product-bottom__home__text">首页</text>
			</navigator>
			<navigator class="product-bottom__service">
				<image class="product-bottom__service__icon" src="https://x-design.oss-cn-hangzhou.aliyuncs.com/product/客服.png" mode="widthFix"></image>
				<text class="product-bottom__service__text">客服</text>
			</navigator>
			<button class="product-bottom__button1" type="default">加入购物车</button>
			<button class="product-bottom__button2"type="default">立即购买</button>
		</view>
		
		<view class="product-information">
			<view class="product-information__title">{{productName}}</view>
			<view class="product-information__top">
				<view class="product-information__price">￥ {{productPrize.toFixed(2)}}</view>
				<view class="product-information__num">{{productSold}}人已购买</view> 
			</view>
		</view>
			
		<view class="product-marketing">
			<navigator class="product-marketing__name" url="">
				活动
				<view class="product-marketing__more">
				{{sales}}
				<image src="/../../static/image/more@3x.png"  class="product-marketing__more__icon"></image>
				</view>
			</navigator>
			<view class="product-marketing__name">发货
				<view class="product-marketing__place">
					{{expressAddress}}
					<image src="https://x-design.oss-cn-hangzhou.aliyuncs.com/product/直线139@3x.png"  class="product-marketing__place__icon"></image>
					快递：￥{{expressFee.toFixed(2)}}
				</view>
			 </view>
		</view>
			
		<view class="product-comment">
			<view class="product-comment__name">商品评价</view>
			<!-- 这一页的商品评价部分作为商品评价页的链接 只显示第一个 -->
			<navigator class="product-comment__list" v-for="(item, index) in commentList" :key="index" url="...">
							<view class="product-comment__item">
								<image src="https://x-design.oss-cn-hangzhou.aliyuncs.com/product/椭圆411@3x.png"  class="product-comment__item__left"></image>
								<view class="product-comment__item__right">
									<view class="product-comment__item__title">
										<view>{{item.username}}</view>
											<view class="product-comment__item__stars">
											<image v-for="count in item.scores" class="product-comment__item__starIcon" src="https://x-design.oss-cn-hangzhou.aliyuncs.com/product/星星黄色.png" mode=""></image>
											<image v-for="count in 5-item.scores" class="product-comment__item__starIcon" src="https://x-design.oss-cn-hangzhou.aliyuncs.com/product/星星灰色.png" mode=""></image>
											</view>
									</view>
									<view>{{item.content}}</view>
									<view class="product-comment__item__list">
										<image class="product-comment__item__item"
											v-for="(item2, index) in item.photos" :key="index" 
											:src="item2.img"
											mode="widthFix"
										></image>
									</view>
								</view>
							</view>
			<view class="product-comment__more">
				查看更多相关评价
			</view>
			</navigator>
		</view>
			
			
		<view class="product-detail">
			<view class="product-detail__name">商品详情</view>
			<view class="product-detail__list">
				<view v-for="(item, index) in productinfoImages" :key="index">
					<image :src="item.img" class="product-detail__list__image" mode="widthFix"></image>
				</view>
			</view>
		</view>

		
</view>
</template>

<script>
	import tabBar from "@/component/tabBar/tabBar.vue"
	
	export default {
		components: {tabBar},
		data() {
			return {
				productName:"帆布包",
				productPrize:29.00,
				productSold:100,
				sales:"首次下单立减10元",
				expressAddress:"浙江杭州",
				expressFee:6,
				productImages:"https://x-design.oss-cn-hangzhou.aliyuncs.com/product/product.png",
				current: 0,
				productinfoImages:[
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/info.jpg', name: '', url:''},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/info.jpg', name: '', url:''},
				],
				commentList:[{username:"XYZ123",
					scores:4,
					photo:'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/椭圆411@3x.png',
					content:"帆布包质量很好，定制的图片也很好看，效果很惊喜！会继续定制的！",
					photos: [
						{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/蒙版组 8@3x.png', name: '', url:''},
						{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/蒙版组 9@3x.png', name: '', url:''},
						{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/蒙版组 10@3x.png', name: '', url:''},
						{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/蒙版组 11@3x.png', name: '', url:''}
					]
					},
				],
			}
		},
					
		methods: {
		
		}	,
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/product.less');
</style>
