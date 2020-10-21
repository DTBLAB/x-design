<template>
	<view class="page-container">
		<view class="body-container">
			<view class="product-container" :style="productInfo.style" id="product-container">
				<image class="product-picture" :src="productInfo.picture" mode="aspectFit"></image>
				<movable-area class="content-box" :style="productInfo.contentStyle" id="content-box">
					<movable-area class="pattern-box" :style="selectedPattern.style" id="pattern-box">
						<movable-view
						  class="content"
						  :style="{width: pictureWidth+'rpx', height: pictureHeight+'rpx'}"
						  direction="all"
						  scale="true"
						  scale-min="1"
						  id="content"
						>
							<image class="content-picture" :src="selectedPicture"></image>
						</movable-view>
					</movable-area>
					<movable-view
					  class="signature"
					  :style="{width: signatureWidth+'rpx', height: signatureHeight+'rpx'}"
					  direction="all"
					  scale="true"
					  :scale-max="getMaxScale"
					  id="signature"
					>
						<image class="signature-picture" :src="signature"></image>
					</movable-view>
				</movable-area>
			</view>
		</view>
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
						  @click="selectPattern(item)"
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
		<view class="product-finish" @click="finishDesign">完成</view>
		<canvas class="product-canvas" :style="{height: canvasHeight+'px', width: canvasWidth+'px'}" canvas-id="product-canvas"></canvas>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	import { mapState } from 'vuex'
	import category from '../../config/category'
	
	export default {
		data() {
			return {
				imageWidth: 0,
				imageHeight: 0,
				pictureWidth: 0,
				pictureHeight: 0,
				signatureWidth: 0,
				signatureHeight: 0,
				boxWidth: 456,
				boxHeight: 430,
				canvasHeight: 0,
				canvasWidth: 0,
				patternShape: "full-box",
				productShape: 'bag-box',
				pictureKinds:[
					'图片库',
					'样式'
				],
				pictures:[
					{url: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/mockPicture@3x.png', id: 0},
				],
				selectedKind: '图片库',
				productPicture: "https://x-design.oss-cn-hangzhou.aliyuncs.com/product/Tote Bag@3x.png",
				pid: undefined,
				selectedPicture: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/mockPicture@3x.png',
				signature: null,
				categoryName: 'canvasBag',
				productInfo: category['canvasBag'],
				patterns: category['canvasBag'].patterns,
				selectedPattern: category['canvasBag'].patterns.full
			}
		},
		computed: {
			...mapState(['signatureUrl']),
			getMaxScale(){
				return Math.min(this.productInfo.contentWidth, this.productInfo.contentHeight)/100/2;
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.pid = Number(option.pid);
			this.category = Number(option.category);
			console.log(this.pid, this.category);
		},
		onShow() {
			let _this = this;
			if(this.signatureUrl){
				this.signature = this.signatureUrl;
				this.saveSignature(null);
				uni.getImageInfo({
					src: this.signature,
					success: function(image) {
						if(image.width > image.height){
							_this.signatureWidth = 200;
							_this.signatureHeight = 200/image.width*image.height;
						}else{
							_this.signatureHeight = 200;
							_this.signatureWidth = 200/image.height*image.width;
						}
						// console.log(_this.signatureWidth, _this.signatureHeight)
					},
					fail: function(err){
						console.log(err);
					}
				})
			}
		},
		mounted(){
			let _this = this;
			
			// 这段记得注释掉
			uni.getImageInfo({
				src: this.selectedPicture,
				success: function(image){
					let h = _this.imageHeight = image.height;
					let w = _this.imageWidth = image.width;
					if(h/w > _this.selectedPattern.height/_this.selectedPattern.width){
						_this.pictureWidth = _this.selectedPattern.width;
						_this.pictureHeight = _this.selectedPattern.width * h/w;
					}else{
						_this.pictureHeight = _this.selectedPattern.height;
						_this.pictureWidth = _this.selectedPattern.height * w/h;
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
			...mapMutations(['saveSignature']),
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
						let h = _this.imageHeight = image.height;
						let w = _this.imageWidth = image.width;
						if(h/w > _this.selectedPattern.height/_this.selectedPattern.width){
							_this.pictureWidth = _this.selectedPattern.width;
							_this.pictureHeight = _this.selectedPattern.width * h/w;
						}else{
							_this.pictureHeight = _this.selectedPattern.height;
							_this.pictureWidth = _this.selectedPattern.height * w/h;
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
				this.selectedPicture = picture.url;
				uni.getImageInfo({
					src: this.selectedPicture,
					success: function(image){
						let h = image.height;
						let w = image.width;
						if(h/w > _this.selectedPattern.height/_this.selectedPattern.width){
							_this.pictureWidth = _this.selectedPattern.width;
							_this.pictureHeight = _this.selectedPattern.width * h/w;
						}else{
							_this.pictureHeight = _this.selectedPattern.height;
							_this.pictureWidth = _this.selectedPattern.height * w/h;
						}
						console.log(_this.pictureHeight, _this.pictureWidth)
					}
				})
			},
			selectPattern(pattern){
				let _this = this;
				this.selectedPattern = pattern;
				let h = _this.imageHeight;
				let w = _this.imageWidth;
				if(h/w > _this.selectedPattern.height/_this.selectedPattern.width){
					_this.pictureWidth = _this.selectedPattern.width;
					_this.pictureHeight = _this.selectedPattern.width * h/w;
				}else{
					_this.pictureHeight = _this.selectedPattern.height;
					_this.pictureWidth = _this.selectedPattern.height * w/h;
				}
			},
			finishDesign(){
				const query = uni.createSelectorQuery().in(this);
				let _this = this;
				uni.showLoading({
					mask: true,
					title: "商品保存中"
				})
				query.select('#product-container').boundingClientRect();
				query.select('#content-box').boundingClientRect();
				query.select('#pattern-box').boundingClientRect();
				query.select('#content').boundingClientRect();
				query.select('#signature').boundingClientRect()
				.exec((res) => {
					_this.generateProduct(res[0], res[1], res[2], res[3], res[4]);
				});
			},
			generateProduct(product, content, pattern, picture, signature){
				let _this = this;
				let isPictureDrawn, isSignatureDrawn;
				console.log(product, content, pattern, picture, signature);
				this.canvasHeight = 2*content.height;
				this.canvasWidth = 2*content.width;
				let ctx = uni.createCanvasContext('product-canvas');
				uni.getImageInfo({
				    src: this.selectedPicture,
				    success: function (res) {
						ctx.save()
						ctx.beginPath()
						//ctx.arc(589/_this.rpx, 273/_this.rpx + pictureHeightInCanvas, 51/_this.rpx, 0, 2 * Math.PI)
						if(_this.selectedPattern.shape === "rectangle"){
							ctx.rect(2*pattern.left - 2*content.left, 2*pattern.top - 2*content.top, 2*pattern.width, 2*pattern.height);
						}else if(_this.selectedPattern.shape === "circle"){
							ctx.arc(2*pattern.left - 2*content.left + pattern.width, 2*pattern.top - 2*content.top + pattern.height, pattern.width, 0, 2 * Math.PI)
						}
						// else if(_this.selectedPattern.shape === "triangle"){
						// 	ctx.moveTo(2*pattern.left - 2*content.left, 2*pattern.bottom - 2*content.top);
						// 	ctx.lineTo(2*pattern.right - 2*content.left, 2*pattern.bottom - 2*content.top);
						// 	ctx.lineTo(pattern.right - content.left, 2*pattern.top - 2*content.top);
						// 	ctx.closePath();
						// }
						ctx.clip()
						ctx.drawImage(res.path, 0, 0, res.width, res.height, 2*picture.left - 2*content.left, 2*picture.top - 2*content.top, 2*picture.width, 2*picture.height);
						ctx.restore()
						ctx.draw(false, ()=>{
							if(_this.signature){
								uni.getImageInfo({
								    src: _this.signature,
								    success: function (res) {
										ctx.drawImage(res.path, 0, 0, res.width, res.height, 2*signature.left - 2*content.left, 2*signature.top - 2*content.top, 2*signature.width, 2*signature.height);
										ctx.draw(true, ()=>{
											_this.generateOriginalPicture(product, content);
										})
								    },
									fail: function(err) {
										console.log(err);
										uni.hideLoading();
									}
								});
							}else{
								_this.generateOriginalPicture(product, content);
							}
							
						})
				    },
					fail: function(err) {
						console.log(err);
						uni.hideLoading();
					}
				});
				
			},
			generateOriginalPicture(product, content){
				let _this = this;
				uni.canvasToTempFilePath({
				  x: 0,
				  y: 0,
				  width: 2*content.width,
				  height: 2*content.height,
				  destWidth: 2*content.width,
				  destHeight: 2*content.height,
				  canvasId: 'product-canvas',
				  fileType: 'png',
				  quality: 1.0,
				  success: function(res) {
					 console.log(res.tempFilePath);
					 _this.generatePreview(product, content, res.tempFilePath);
				  },
				  fail: function(err) {
				  	console.log(err);
				  	uni.hideLoading();
				  }
				})
			},
			generatePreview(product, content, original){
				let _this = this;
				this.canvasHeight = 2*product.height;
				this.canvasWidth = 2*product.width;
				let ctx = uni.createCanvasContext('product-canvas');
				uni.getImageInfo({
				    src: this.productInfo.picture,
				    success: function (res) {
						ctx.drawImage(res.path, 0, 0, res.width, res.height, 0, 0, 2*product.width, 2*product.height);
						ctx.drawImage(original, 0, 0, 2*content.width, 2*content.height, 2*content.left - 2*product.left, 2*content.top - 2*product.top, 2*content.width, 2*content.height);
						ctx.draw(false, ()=>{
							uni.canvasToTempFilePath({
							  x: 0,
							  y: 0,
							  width: 2*product.width,
							  height: 2*product.height,
							  destWidth: 2*product.width,
							  destHeight: 2*product.height,
							  canvasId: 'product-canvas',
							  fileType: 'png',
							  quality: 1.0,
							  success: function(res) {
								 console.log(res.tempFilePath);
								 _this.uploadProductImages(original, res.tempFilePath);
							  } 
							})
						})
				    },
					fail: function(err) {
						console.log(err);
						uni.hideLoading();
					}
				});
			},
			
			async uploadProductImages(original, preview){
				let _this = this;
				const {originalParams, previewParams} = await this.getParams().catch(err => {
					console.log(err);
				  	uni.hideLoading();
					return;
				});
				let uploadedOriginal = null, uploadedPreview = null;
				uni.uploadFile({
				  url: 'https://x-design-products.oss-cn-hangzhou.aliyuncs.com/', // 开发者服务器的URL。
				  filePath: original,
				  name: 'file', // 必须填file。
				  formData: originalParams,
				  success: (res) => {
					console.log(res);
				    if (res.statusCode === 204) {
				      console.log('上传成功');
					  uploadedOriginal = 'https://x-design-products.oss-cn-hangzhou.aliyuncs.com/'+originalParams.key;
					  if(uploadedPreview){
						_this.saveProduct(uploadedOriginal, uploadedPreview, preview);  
					  }
				    }
				  },
				  fail: err => {
				    console.log(err);
					uni.showToast({
					    title: "上传失败",
					    duration: 1000,
						icon: 'none'
					});
				  	uni.hideLoading();
				  }
				});
				uni.uploadFile({
				  url: 'https://x-design-previews.oss-cn-hangzhou.aliyuncs.com/', // 开发者服务器的URL。
				  filePath: preview,
				  name: 'file', // 必须填file。
				  formData: previewParams,
				  success: (res) => {
					console.log(res);
				    if (res.statusCode === 204) {
				      console.log('上传成功');
					  uploadedPreview = 'https://x-design-previews.oss-cn-hangzhou.aliyuncs.com/'+previewParams.key;
					  if(uploadedOriginal){
						_this.saveProduct(uploadedOriginal, uploadedPreview, preview, original);  
					  }
				    }
				  },
				  fail: err => {
				    console.log(err);
					uni.showToast({
					    title: "上传失败",
					    duration: 1000,
						icon: 'none'
					});
				  	uni.hideLoading();
				  }
				});
			},
			async getParams(){
				return await this.$http.get('/product/getPostObjectParams', {}).then(res => {
					if(res.data.code !== 0){
						throw new Error("获取签名失败!");
					}
					console.log(res.data.data);
					return res.data.data;
				}).catch(err => {
					throw new Error("获取签名失败!");
				})
			},
			async saveProduct(uploadedOriginal, uploadedPreview, preview, original){
				let _this = this;
				this.$http.post('/product/add', {original: uploadedOriginal, preview: uploadedPreview, price: _this.productInfo.price, category: _this.categoryName}).then(res => {
					uni.hideLoading();
					if(res.data.code !== 0){
						uni.showToast({
						    title: res.data.message,
						    duration: 1000,
							icon: 'none'
						});
						return;
					}
					_this.generateCard(preview, original);
				}).catch(err => {
					console.log(err);
					uni.hideLoading();
					uni.showToast({
					    title: "保存失败",
					    duration: 1000,
						icon: 'none'
					});
				})
			},
			generateCard(preview, original){
				let _this = this;
				uni.navigateTo({url:`/pages/product/cardShare?url=${preview}&name=${_this.productInfo.name}&original=${original}`});
			},
			
		}
	}
</script>

<style>
page{
	height: 100%;
}
	
</style>

<style lang="less" scoped>
@import url('../../common/less/productDesign.less');
</style>
