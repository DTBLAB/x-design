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
					  x="1000"
					  id="signature"
					  v-if="signature"
					>
						<image class="signature-picture" :src="signature"></image>
						<image class="signature-close" v-if="signature" src="../../static/image/close.png" @click="clearSignature"></image>
					</movable-view>
					<!-- <view v-if="selectedPattern.decorations" class="decorations"> -->
					<image v-if="selectedPattern.decorations" v-for="(decoration, index) in selectedPattern.decorations" :key="index" class="decoration" :style="decoration.style" :src="decoration.url"></image>
					<image v-if="productInfo.edge" v-for="(edge, index) in productInfo.edge" :key="index" class="edge" :style="edge.style" :src="edge.url"></image>
					<!-- </view> -->
					<!-- <view v-if="selectedPattern.decorations" v-for="(decoration, item) in selectedPattern.decorations" :key="index" class="decoration" :style="decoration.style">
						<image class="decoration__image" :style="decoration.style" :url="decoration.url"></image>
					</view> -->
				</movable-area>
			</view>
		</view>
		<view class="picture-selector">
			<scroll-view class="scroll-view_H picture-selector__items-container" scroll-x="true" enable-flex="true">
				<view class="picture-selector__items" v-if="selectedKind === '图片库'">
					<view class="picture-selector__item" @click="designPicture">
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
					<view class="picture-selector__item" v-for="(item, index) in patterns" :key="index" :class="{'picture-selector__item--selected': item.name===selectedPattern.name}">
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
		<view class="right-bar">
			<view class="right-bar-item right-bar-item--switch-color" @click="switchColor" v-if="colorList && colorList.length > 1"></view>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	import { mapState } from 'vuex'
	// import category from '../../config/category'
	import category from '../../config/whiteMoldData'
	
	export default {
		data() {
			return {
				radio: 6,
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
				selectedPattern: category['canvasBag'].patterns.full,
				categoryList: category,
				color: "白色",
				colorList: [],
				colorIndex: 0
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
			this.categoryName = option.category;
			// console.log(this.pid, this.categoryName);
			this.productInfo = this.categoryList[this.categoryName];
			this.patterns = this.categoryList[this.categoryName].patterns;
			this.selectedPattern = this.categoryList[this.categoryName].patterns.full;
			if(750/uni.getSystemInfoSync().windowWidth<1){
				this.radio = 6/Math.ceil(uni.getSystemInfoSync().windowWidth/750);
			}
			
			this.colorList = this.productInfo.colorList;
			this.color = this.colorList[0].name;
			this.productInfo.picture = this.colorList[0].url;
			this.colorIndex = 0;
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
			// uni.getImageInfo({
			// 	src: this.selectedPicture,
			// 	success: function(image){
			// 		let h = _this.imageHeight = image.height;
			// 		let w = _this.imageWidth = image.width;
			// 		if(h/w > _this.selectedPattern.height/_this.selectedPattern.width){
			// 			_this.pictureWidth = _this.selectedPattern.width;
			// 			_this.pictureHeight = _this.selectedPattern.width * h/w;
			// 		}else{
			// 			_this.pictureHeight = _this.selectedPattern.height;
			// 			_this.pictureWidth = _this.selectedPattern.height * w/h;
			// 		}
			// 		console.log(_this.pictureHeight, _this.pictureWidth)
			// 	}
			// })
			
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
				// console.log(kind)
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
						// console.log(_this.pictureHeight, _this.pictureWidth)
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
						let h = _this.imageHeight = image.height;
						let w = _this.imageWidth = image.width;
						if(h/w > _this.selectedPattern.height/_this.selectedPattern.width){
							_this.pictureWidth = _this.selectedPattern.width;
							_this.pictureHeight = _this.selectedPattern.width * h/w;
						}else{
							_this.pictureHeight = _this.selectedPattern.height;
							_this.pictureWidth = _this.selectedPattern.height * w/h;
						}
						// console.log(_this.pictureHeight, _this.pictureWidth)
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
					title: "产品保存中"
				})
				try{
					query.select('#product-container').boundingClientRect();
					query.select('#content-box').boundingClientRect();
					query.select('#pattern-box').boundingClientRect();
					query.select('#content').boundingClientRect();
					query.select('#signature').boundingClientRect()
					.exec((res) => {
						_this.generateProduct(res[0], res[1], res[2], res[3], res[4]);
					});
				}catch(e){
					console.log(e);
					uni.hideLoading();
				}
				
			},
			generateProduct(product, content, pattern, picture, signature){
				let _this = this;
				let r = this.radio;
				let isPictureDrawn, isSignatureDrawn;
				console.log(product, content, pattern, picture, signature);
				this.canvasHeight = r*content.height;
				this.canvasWidth = r*content.width;
				let ctx = uni.createCanvasContext('product-canvas');
				uni.getImageInfo({
				    src: this.selectedPicture,
				    success: function (res) {
						ctx.save()
						ctx.beginPath()
						//ctx.arc(589/_this.rpx, 273/_this.rpx + pictureHeightInCanvas, 51/_this.rpx, 0, 2 * Math.PI)
						if(_this.selectedPattern.shape === "rectangle"){
							ctx.rect(r*pattern.left - r*content.left, r*pattern.top - r*content.top, r*pattern.width, r*pattern.height);
						}else if(_this.selectedPattern.shape === "circle"){
							ctx.arc(r*pattern.left - r*content.left + r*pattern.width/2, r*pattern.top - r*content.top + r*pattern.height/2, r*pattern.width/2, 0, 2 * Math.PI)
						}
						// else if(_this.selectedPattern.shape === "triangle"){
						// 	ctx.moveTo(2*pattern.left - 2*content.left, 2*pattern.bottom - 2*content.top);
						// 	ctx.lineTo(2*pattern.right - 2*content.left, 2*pattern.bottom - 2*content.top);
						// 	ctx.lineTo(pattern.right - content.left, 2*pattern.top - 2*content.top);
						// 	ctx.closePath();
						// }
						ctx.clip()
						ctx.drawImage(res.path, 0, 0, res.width, res.height, r*picture.left - r*content.left, r*picture.top - r*content.top, r*picture.width, r*picture.height);
						ctx.restore()
						ctx.draw(false, async ()=>{
							await _this.drawDecorations(ctx, product, content, signature);
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
				let r = this.radio;
				uni.canvasToTempFilePath({
				  x: 0,
				  y: 0,
				  width: r*content.width,
				  height: r*content.height,
				  destWidth: r*content.width,
				  destHeight: r*content.height,
				  canvasId: 'product-canvas',
				  fileType: 'png',
				  quality: 1.0,
				  success: function(res) {
					 // console.log(res.tempFilePath);
					 // _this.generatePreview(product, content, res.tempFilePath);
					 _this.drawPreview(product, content, res.tempFilePath);
					 // _this.drawEdges(ctx, product, content, res.tempFilePath);
				  },
				  fail: function(err) {
				  	console.log(err);
				  	uni.hideLoading();
				  }
				})
			},
			drawPreview(product, content, original){
				let _this = this;
				let r = this.radio;
				
				this.canvasHeight = r*product.height;
				this.canvasWidth = r*product.width;
				
				let ctx = uni.createCanvasContext('product-canvas');
				
				uni.getImageInfo({
				    src: this.productInfo.picture,
				    success: function (res) {
						ctx.drawImage(res.path, 0, 0, res.width, res.height, 0, 0, r*product.width, r*product.height);
						ctx.drawImage(original, 0, 0, r*content.width, r*content.height, r*content.left - r*product.left, r*content.top - r*product.top, r*content.width, r*content.height);
						_this.drawEdges(ctx, product, content, original);
				    },
					fail: function(err) {
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
			generatePreview(ctx, product, original){
				let _this = this;
				let r = this.radio;
				
				ctx.draw(false, ()=>{
					uni.canvasToTempFilePath({
					  x: 0,
					  y: 0,
					  width: r*product.width,
					  height: r*product.height,
					  destWidth: r*product.width,
					  destHeight: r*product.height,
					  canvasId: 'product-canvas',
					  fileType: 'png',
					  quality: 1.0,
					  success: function(res) {
						 // console.log(res.tempFilePath);
						 _this.uploadProductImages(original, res.tempFilePath);
					  } 
					})
				})
			},
			
			async uploadProductImages(original, preview){
				let _this = this;
				const {originalParams, previewParams} = await this.getParams().catch(err => {
					console.log(err);
				  	uni.hideLoading();
					return;
				});
				// console.log(original, preview, originalParams, previewParams)
				let uploadedOriginal = null, uploadedPreview = null;
				uni.uploadFile({
				  url: 'https://x-design-products.oss-cn-hangzhou.aliyuncs.com/', // 开发者服务器的URL。
				  filePath: original,
				  name: 'file', // 必须填file。
				  formData: originalParams,
				  success: (res) => {
					// console.log(res);
				    if (res.statusCode === 204) {
				      // console.log('上传成功');
					  uploadedOriginal = 'https://x-design-products.oss-cn-hangzhou.aliyuncs.com/'+originalParams.key;
					  if(uploadedPreview){
						_this.saveProduct(uploadedOriginal, uploadedPreview, preview, original);  
					  }
				    }else{
						console.log(res);
						uni.showToast({
						    title: "上传失败",
						    duration: 1000,
							icon: 'none'
						});
						uni.hideLoading();
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
					// console.log(res);
				    if (res.statusCode === 204) {
				      // console.log('上传成功');
					  uploadedPreview = 'https://x-design-previews.oss-cn-hangzhou.aliyuncs.com/'+previewParams.key;
					  if(uploadedOriginal){
						_this.saveProduct(uploadedOriginal, uploadedPreview, preview, original);  
					  }
				    }else{
						console.log(res);
						uni.showToast({
						    title: "上传失败",
						    duration: 1000,
							icon: 'none'
						});
						uni.hideLoading();
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
					// console.log(res.data.data);
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
					//_this.generateCard(preview, original);
					// console.log(res.data.data);
					uni.showToast({
					    title: "已存至我的产品",
					    duration: 2000,
						icon: 'success',
					});
					setTimeout(()=>{
						uni.reLaunch({
							url: "/pages/product/product?id="+res.data.data.pid+"&category="+_this.categoryName
						})
					}, 2000);
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
				uni.reLaunch({url:`/pages/product/cardShare?url=${preview}&name=${_this.productInfo.name}&original=${original}`});
			},
			
			getImageInfo(src){
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: src,
						success: function (image) {
							resolve(image)
						},
						fail: function(err) {
							console.log(err)
							reject(err)
						}
						
					});
				
				})
			},
			async getDecorationPaths(){
				let images = [];
				let image;
				// console.log(this.selectedPattern.decorations);
				for(let decoration of this.selectedPattern.decorations){
					// console.log(decoration);
					image = await this.getImageInfo(decoration.url);
					images.push(image);
				}
				return images;
			},
			async drawDecorations(ctx, product, content, signature){
				let _this = this;
				let r = this.radio;
				
				if(!this.selectedPattern.decorations){
					if(_this.signature){
						uni.getImageInfo({
						    src: _this.signature,
						    success: function (res) {
								ctx.drawImage(res.path, 0, 0, res.width, res.height, r*signature.left - r*content.left, r*signature.top - r*content.top, r*signature.width, r*signature.height);
								ctx.draw(true, async ()=>{
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
					return;
				}
				let images = await this.getDecorationPaths();
				const query = uni.createSelectorQuery().in(this);
				
				query.selectAll('.decoration').boundingClientRect()
				.exec((res) => {
					let decorations = res[0];
					// console.log(decorations);
					for(let i = 0; i<decorations.length; i++){
						let decoration = decorations[i];
						let image = images[i];
						// console.log(decoration, image);
						ctx.drawImage(image.path, 0, 0, image.width, image.height, r*decoration.left - r*content.left, r*decoration.top - r*content.top, r*decoration.width, r*decoration.height);
					}
					ctx.draw(true, ()=>{
						if(_this.signature){
							uni.getImageInfo({
							    src: _this.signature,
							    success: function (res) {
									ctx.drawImage(res.path, 0, 0, res.width, res.height, r*signature.left - r*content.left, r*signature.top - r*content.top, r*signature.width, r*signature.height);
									ctx.draw(true, async ()=>{
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
					});
				});
				
			},
			
			async getEdgePaths(){
				let images = [];
				let image;
				// console.log(this.selectedPattern.decorations);
				for(let edge of this.productInfo.edge){
					// console.log(decoration);
					image = await this.getImageInfo(edge.url);
					images.push(image);
				}
				return images;
			},
			async drawEdges(ctx, product, content, original){
				let _this = this;
				let r = this.radio;
				
				let images = await this.getEdgePaths();
				const query = uni.createSelectorQuery().in(this);
				// let ctx = uni.createCanvasContext('product-canvas');
				
				query.selectAll('.edge').boundingClientRect()
				.exec((res) => {
					let edges = res[0];
					// console.log(decorations);
					for(let i = 0; i < edges.length; i++){
						let edge = edges[i];
						let image = images[i];
						// console.log(decoration, image);
						ctx.drawImage(image.path, 0, 0, image.width, image.height, r*edge.left - r*content.left, r*edge.top - r*content.top, r*edge.width, r*edge.height);
					}
					_this.generatePreview(ctx, product, original);
				});
				
			},
			
			designPicture(){
				let _this = this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    success: function (res) {
				        uni.reLaunch({
				        	url: `/pages/pictureDesign/pictureDesign?url=${res.tempFilePaths[0]}`
				        });
				    }
				});
			},
			
			clearSignature(){
				this.signature = null;
			},
			
			switchColor(){
				this.colorIndex = (this.colorIndex + 1) % this.colorList.length;
				this.color = this.colorList[this.colorIndex].name;
				this.productInfo.picture = this.colorList[this.colorIndex].url;
			}
			
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
