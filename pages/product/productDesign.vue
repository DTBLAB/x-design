<template>
	<view class="page-container">
		<movable-area class="content-box" :class="boxShape">
			<movable-view 
			  class="content"
			  :style="{width: pictureWidth+'rpx', height: pictureHeight+'rpx'}"
			  direction="all"
			  scale="true"
			>
				<image class="content-picture" :src="selectedPicture"></image>
			</movable-view>
		</movable-area>
		<view class="picture-selector">
			<scroll-view class="scroll-view_H picture-selector__items-container" scroll-x="true" enable-flex="true">
				<view class="picture-selector__items" v-if="selectedKind === '图片库'">
					<view class="picture-selector__item">
						<image src="https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1158@3x.png" class="picture-selector__item__image"></image>
					</view>
					<view 
					  class="picture-selector__item"
					  v-for="(picture, index) in pictures"
					  :key="index"
					  @click="selectPicture(picture)"
					>
						<image :src="picture.url"
						  class="picture-selector__item__image"
						  mode="aspectFill"  
						></image>
						<view class="picture-selector__item-cover" v-if="pid === picture.id">
							<image class="picture-selector__item-cover__icon" src="../../static/image/selected.png">
						</view>
					</view>
				
					<!-- <view class="picture-selector__item" v-for="(item, index) in myphotos" :key="index">
						<image class="picture-selector__image" 
						  :src="item.img" mode="widthFix"></image>
					</view> -->
				
				</view>
				
				<view class="picture-selector__items" v-if="selectedKind === '样式'">
					<view class="picture-selector__item" v-for="(item, index) in patterns" :key="index">
						<image class="picture-selector__item__image" 
						  :src="item.img" 
						  mode="widthFix"
						  @click=""
						></image>
					</view>
				</view>
			</scroll-view>
			<view class="picture-selector__tabs">
				<view
				  class="picture-selector__tab"
				  :class="{ 'picture-selector__tab--selected': selectedKind === kind }"
				  v-for="(kind, index) in pictureKinds"
				  :key="index"
				  @click="selectKind(kind)"
				>{{kind}}</view>
				<navigator class="picture-selector__tab" url="./sign">签名</navigator>
			</view>
		</view>
		
		<view class="product-container">
			<image class="product-picture" src="https://x-design.oss-cn-hangzhou.aliyuncs.com/product/Tote Bag@3x.png" mode="aspectFit"></image>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pictureWidth: 20,
				pictureHeight: 20,
				boxWidth: 456,
				boxHeight: 430,
				boxShape: "full-box",
				pictureKinds:[
					'图片库',
					'样式'
				],
				pictures:[
					{url: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/mockPicture@3x.png', id: 0},
				],
				patterns:[
					{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1210@3x.png', width: 456, height: 430, name: 'full-box'},
					{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/triangle.png', width: 456, height: 430, name: 'full-box'},
					{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/circle.png', width: 456, height: 430, name: 'full-box'},
					{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/rectangle.png', width: 456, height: 430, name: 'full-box'},
				],
				selectedKind: '图片库',
				pictureUrl: null,
				category: 0,
				pid: undefined,
				selectedPicture: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/mockPicture@3x.png'
			}
		},
		computed: {
			selectedStyles(){
				return this.pictures[this.selectedKind]
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.pid = Number(option.pid);
			this.category = Number(option.category);
			console.log(this.pid, this.category);
		},
		mounted(){
			let _this = this;
			
			// 这段记得注释掉
			uni.getImageInfo({
				src: this.selectedPicture,
				success: function(image){
					let h = image.height;
					let w = image.width;
					if(h/w > _this.boxHeight/_this.boxWidth){
						_this.pictureWidth = _this.boxWidth;
						_this.pictureHeight = _this.pictureWidth * h/w;
					}else{
						_this.pictureHeight = _this.boxHeight;
						_this.pictureWidth = _this.pictureHeight * w/h;
					}
					console.log(_this.pictureHeight, _this.pictureWidth)
				}
			})
			
			this.$http.get('/picture/getList').then(res => {
				if(res.data.code !== 0){
					uni.showToast({
					    title: res.data.message,
					    duration: 1000,
						icon: 'none'
					});
					return;
				}
				_this.pictures = res.data.data;
			
				if(this.pid){
					this.loadPicture();
				}
				
			}).catch(err => {
				uni.showToast({
				    title: "网络问题，图片加载失败",
				    duration: 1000,
					icon: 'none'
				});
			});
		},
		methods: {
			selectKind(kind){
				this.selectedKind = kind;
				console.log(kind)
				//this.selectedStyles
			},
			loadPicture(){
				let _this = this;
				for(let i=0; i<this.pictures.length; i++){
					if(this.pictures[i].id === this.pid){
						this.selectedPicture = this.pictures[i].url;
					}
				}
				uni.getImageInfo({
					src: this.selectedPicture,
					success: function(image){
						let h = image.height;
						let w = image.width;
						if(h/w > _this.boxHeight/_this.boxWidth){
							_this.pictureWidth = _this.boxWidth;
							_this.pictureHeight = _this.pictureWidth * h/w;
						}else{
							_this.pictureHeight = _this.boxHeight;
							_this.pictureWidth = _this.pictureHeight * w/h;
						}
						console.log(_this.pictureHeight, _this.pictureWidth)
					}
				})
			},
			getPictureSrc(name){
				
			},
			selectPicture(picture){
				let _this = this;
				this.pid = picture.id;
				console.log(this.pid);
				this.selectedPicture = picture.url;
				uni.getImageInfo({
					src: this.selectedPicture,
					success: function(image){
						let h = image.height;
						let w = image.width;
						if(h/w > _this.boxHeight/_this.boxWidth){
							_this.pictureWidth = _this.boxWidth;
							_this.pictureHeight = _this.pictureWidth * h/w;
						}else{
							_this.pictureHeight = _this.boxHeight;
							_this.pictureWidth = _this.pictureHeight * w/h;
						}
						console.log(_this.pictureHeight, _this.pictureWidth)
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/productDesign.less');
</style>
