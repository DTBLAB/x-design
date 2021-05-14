<template>
	<view class="product-container">
		<view class="product-background">
			<image class="product-image" :src="preview" mode="widthFix"></image>
		</view>
			
<!-- 		<view class="prodcut-bannercontainer">
			<swiper class="product-banner">
				<swiper-item v-for="(item, index) in productImages" :key="index">
					<image class="product-banner__image" :src="item"></image>
				</swiper-item>
			</swiper>
		</view> -->
		
		<picker @change="selectModel" :value="modelIndex" :range="modelList" v-if="colorList.length > 1">
			<!-- <button class="product-bottom__button1" type="default" @click="addToCart" :disabled="disabled">加入我的产品</button> -->
			<view class="product-bottom">
				<button class="product-bottom__button2" type="default">立即购买</button>
			</view>
		</picker>
		<view class="product-bottom" v-else>
			<button class="product-bottom__button2" type="default" @click="placeOrder">立即购买</button>
		</view>
		
		<view class="product-information">
			<view class="product-information__title">{{productInfo.name}}</view>
			<view class="product-information__top">
				<view class="product-information__price">￥ {{productInfo.price}}</view>
				<view class="product-information__num">{{productSold}}人已购买</view> 
			</view>
		</view>
			
		<view class="product-marketing">
			<navigator class="product-marketing__name" url="">
				活动
				<view class="product-marketing__more">
				{{sales}}
				<!-- <image src="/../../static/image/more@3x.png"  class="product-marketing__more__icon"></image> -->
				</view>
			</navigator>
			<view class="product-marketing__name">发货
				<view class="product-marketing__place">
					{{expressAddress}}
					<image src="https://x-design.oss-cn-hangzhou.aliyuncs.com/product/直线139@3x.png"  class="product-marketing__place__icon"></image>
					快递：￥{{expressFee.toFixed(2)}}
				</view>
			</view>
			<!-- <view class="product-marketing__name">型号
				<view class="product-marketing__place">
					<picker @change="selectModel" :value="modelIndex" :range="modelList">
						<view class="uni-input model-picker">{{modelList[modelIndex]}}</view>
						
						<image src="/../../static/image/more@3x.png"  class="more-icon"></image>
					</picker>
				</view>
			</view> -->
		</view>
			
<!-- 		<view class="product-comment">
			<view class="product-comment__name">商品评价</view>
			<navigator class="product-comment__list" v-for="(item, index) in commentList" :key="index" url="...">
							<view class="product-comment__item">
								<image src="https://x-design.oss-cn-hangzhou.aliyuncs.com/product/椭圆411@3x.png"  class="product-comment__item__left"></image>
								<view class="product-comment__item__right">
									<view class="product-comment__item__title">
										<view>{{item.username}}</view>
											<view class="product-comment__item__stars">
											<image v-for="count in item.scores" :key="index" class="product-comment__item__starIcon" src="https://x-design.oss-cn-hangzhou.aliyuncs.com/product/星星黄色.png" mode=""></image>
											<image v-for="count in 5-item.scores" :key="index" class="product-comment__item__starIcon" src="https://x-design.oss-cn-hangzhou.aliyuncs.com/product/星星灰色.png" mode=""></image>
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
		</view> -->
			
			
		<view class="product-detail">
			<!-- <view class="product-detail__name">商品详情</view> -->
			<view class="product-detail__list">
				<!-- <view v-for="(item, index) in productinfoImages" :key="index">
					<image :src="item.img" class="product-detail__list__image" mode="widthFix"></image>
				</view> -->
				<image :src="productDetail" class="product-detail__list__image" mode="widthFix"></image>
			</view>
		</view>

		
	</view>
</template>

<script>
	import tabBar from "@/component/tabBar/tabBar.vue"
	import category from '../../config/whiteMoldData'
	import models from '../../config/model'
	import selectedCommodities from '../../config/selectedProducts'
	import details from '../../config/detail'
	
	export default {
		components: {tabBar},
		data() {
			return {
				product: {},
				productName:"帆布包",
				productPrize:29.00,
				productSold:100,
				sales:"满一件包邮",
				expressAddress:"浙江杭州",
				expressFee:0,
				productImages: "https://x-design.oss-cn-hangzhou.aliyuncs.com/product/product.png",
				current: 0,
				productDetail:'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/info.jpg',
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
				id: 0,
				categoryList: category,
				detailList: details,
				commodities: selectedCommodities,
				categoryName: 'canvasBag',
				productInfo: category['canvasBag'],
				preview: "",//"https://x-design.oss-cn-hangzhou.aliyuncs.com/product/product.png"
				disabled: true,
				
				modelList: models['canvasBag'],
				modelIndex: 0
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			let _this = this;
			this.id = Number(option.id);
			this.categoryName = option.category;
			// console.log(this.pid, this.categoryName);
			this.productInfo = this.categoryList[this.categoryName];
			this.productDetail = this.detailList[this.categoryName];
			this.modelList = models[this.categoryName];
			
			if(option.public){
				this.disabled = false;
				this.preview = selectedCommodities[this.id].preview;
				this.productDetail = selectedCommodities[this.id].original;
				this.product = {preview: this.preview, original: selectedCommodities[this.id].original, price: this.productInfo.price, category: this.categoryName, num: 1, model: this.modelList[this.modelIndex]};
			}else{
				this.$http.get('/product/get', {id: this.id}).then(res => {
					if(res.data.code !== 0){
						uni.showToast({
						    title: res.data.message,
						    duration: 1000,
							icon: 'none'
						});
						return;
					}
					// console.log(res.data)
					_this.preview = res.data.data.preview;
					_this.product = res.data.data;
					_this.product.model = _this.modelList[_this.modelIndex];
					_this.product.num = 1;
				}).catch(err => {
					console.log(err)
					uni.showToast({
					    title: "网络问题，地址加载失败",
					    duration: 1000,
						icon: 'none'
					});
				});
			}
		},
		methods: {
			addToCart(){
				this.$http.post('/product/add', this.product).then(res => {
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
					    title: '成功加入我的产品',
					    duration: 1000,
						icon: 'none'
					});
				}).catch(err => {
					console.log(err);
					uni.hideLoading();
					uni.showToast({
					    title: "添加失败",
					    duration: 1000,
						icon: 'none'
					});
				})
			},
			placeOrder(){
				if(!this.product.model){
					this.product.model = this.modelList[0];
				}
				this.product.num = 1;
				uni.setStorageSync('orderItems', [this.product]);
				uni.navigateTo({
					url: "/pages/order/confirmOrder"
				})
			},
			selectModel(e){
				this.modelIndex = e.target.value;
				this.product.model =  this.modelList[this.modelIndex];
				this.placeOrder();
			}
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/product.less');
</style>
