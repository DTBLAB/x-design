<template>
	<view class="page-container">
		<view class="picture-container">
			<view class="picture-add" @click="choosePicture" v-if="!hasPicture">
				<view class="picture-add__icon"></view>
			</view>
			<image class="picture-body" :src="isTransferred?selectedTransferredPitucre:pictureUrl" mode='aspectFit' v-else>
			</image>
		</view>
		<view class="style-selector">
			<scroll-view class="scroll-view_H style-selector__tabs-container" scroll-x="true" enable-flex="true">
				<view class="style-selector__tabs">
					<view
					  class="style-selector__tab"
					  :class="{ 'style-selector__tab--selected': selectedKind === kind }"
					  v-for="(kind, index) in styleKinds"
					  :key="index"
					  @click="selectKind(kind)"
					>{{kind}}</view>
				</view>
			</scroll-view>
			<scroll-view class="scroll-view_H style-selector__styles-container" scroll-x="true" enable-flex="true">
				<view class="style-selector__styles">
					<view 
					  class="style-selector__style"
					  v-for="(style, index) in selectedStyles"
					  :key="index"
					  @click="selectStyle(style)"
					>
						<image :src="getStyleSrc(style)" 
						  class="style-selector__style__image"
						  mode="aspectFill"  
						></image>
						<view class="style-selector__style__name">{{style}}</view>
						<view class="style-selector__style-cover" v-if="selectedStyle === style">
							<image class="style-selector__style-cover__icon" src="../../static/image/selected.png">
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<canvas class="compress-canvas" canvas-id="compress-canvas" id="compressCanvas"></canvas>
		
		<image class="picture-close" src="../../static/image/pictureDesign/close.png" @click="clear" v-if="hasPicture"></image>
		<!-- 记得换成isTransferred -->
		<view class="picture-finish" v-if="hasPicture" @click="generateCard">完成</view>
		<view class="right-bar" v-if="hasPicture">
			<view class="right-bar-item right-bar-item--adjust" @click=""></view>
			<button class="right-bar-item right-bar-item--share" open-type="share" @click="wechatShare"></button>
		</view>
		
		<!-- <view class="share-panel-cover" v-if="isSharing">
			<view class="share-panel">
				<view class="share-panel__title">分享</view>
				<image src="../../static/image/add/close.png" class="share-panel__close" @click="hideSharePanel"></image>
				<view class="share-panel__buttons">
					<button class="share-panel__button" open-type="share" @click="wechatShare">
						<image class="share-panel__button__image" src="../../static/image/pictureDesign/wechat-share.png"></image>
						<view class="share-panel__button__text">微信链接</view>
					</button>
					<button class="share-panel__button" @click="generateCard">
						<image class="share-panel__button__image" src="../../static/image/pictureDesign/picture-share.png"></image>
						<view class="share-panel__button__text">生成卡片</view>
					</button>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data(){
			return{
				hasPicture: false,
				pictureUrl: null,
				pictureData: null,
				isTransferred: false,
				loadingFinished: false,
				styleKinds: [
					'推荐',
					'艺术',
					'节日',
					'文化',
					'自然',
					'色彩',
					'纹理'
				],
				styles: {
					'推荐': ['赛博朋克', '水墨画', '和玺彩画', '湿拓画', '剪纸'],
					'艺术': ['浮世绘', '泼墨山水', '油画'],
					'节日': [],
					'文化': [],
					'自然': [],
					'色彩': [],
					'纹理': []
				},
				selectedKind: '推荐',
				selectedStyle: null,
				transferredPictures:{
				},
				selectedTransferredPitucre: null,
				isSharing: false
			}
		},
		computed: {
			selectedStyles(){
				return this.styles[this.selectedKind]
			}
		},
		onShareAppMessage() {
			return {
				title: '想定就定，定你所想',
				path: '/pages/index/index',
				imageUrl: this.isTransferred? this.selectedTransferredPitucre:this.pictureUrl, // 生成的分享图赋值给到小程序自定义分享图链接
				success: function () {
					// 转发成功
					console.log(shareUrl)
				},
				fail: function () {
					// 转发失败
					console.log('转发失败')
				}
			}
		},
		methods: {
			choosePicture(){
				let _this = this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    success: function (res) {
				        _this.loadPicture(res.tempFilePaths[0]);
				    }
				});
			},
			loadPicture(path){
				let _this = this;
				// const query = uni.createSelectorQuery().in(_this);
				// // query.select('#compressCanvas')
				//   .fields({ node: true, size: true })
				//   .exec((res) => {
				// 	console.log(res);
				//     const canvas = res[0].node
				//     const ctx = canvas.getContext('2d')
								
				//     const dpr = wx.getSystemInfoSync().pixelRatio
				//     canvas.width = res[0].width * dpr
				//     canvas.height = res[0].height * dpr
				//     ctx.scale(dpr, dpr);
				//   })
				uni.getImageInfo({
				    src: path,
				    success: function (image) {
						if(image.type !== 'jpeg' && image.type !=="jpg"){
							uni.showToast({
							    title: '只可以上传jpg或jpeg格式图片',
							    duration: 2000
							});
							return;
						}
						_this.pictureUrl = path;
						_this.hasPicture = true;
						console.log(_this.pictureUrl);
				        console.log(image);
						let height = image.height;
						let width = image.width;
						if(Math.max(height, width) <= 2000){
							_this.loadingFinished = true;
							return;
						}
						
						let newHeight = 0;
						let newWidth = 0;
						if(height >= width){
							newHeight = 2000;
							newWidth = 2000/height*width;
						}else{
							newWidth = 2000;
							newHeight = 2000/width*height;
						}
						
						console.log(width, height, newWidth, newHeight);
						
						const ctx = uni.createCanvasContext('compress-canvas');
						ctx.drawImage(_this.pictureUrl, 0, 0, width, height, 0, 0, newWidth, newHeight);
						ctx.draw(false, ()=>{
							uni.canvasToTempFilePath({
							  x: 0,
							  y: 0,
							  width: newWidth,
							  height: newHeight,
							  destWidth: newWidth,
							  destHeight: newHeight,
							  canvasId: 'compress-canvas',
							  fileType: 'jpg',
							  success: function(res) {
								  console.log(res);
							    _this.pictureUrl = res.tempFilePath;
								_this.loadingFinished = true;
								uni.getImageInfo({
								    src: _this.pictureUrl,
								    success: function (image2) {
										console.log('image2', image2)
									}
								})
							  } 
							})
						});
						
				    }
				});
			},
			getStyleSrc(name){
				return "https://x-design.oss-cn-hangzhou.aliyuncs.com/styles/"+name+".jpg";
			},
			selectKind(kind){
				this.selectedKind = kind;
				//this.selectedStyles
			},
			selectStyle(style){
				if(!this.pictureUrl){
					uni.showToast({
					    title: "请先选择图片",
					    duration: 1000,
						icon: 'none'
					});
					return;
				}else if(!this.loadingFinished){
					uni.showToast({
					    title: "请等待图片加载完毕",
					    duration: 1000,
						icon: 'none'
					});
					return;
				}
				let res = this.getTransferToken();
				if(res.code !== 0){
					uni.showToast({
					    title: res.message,
					    duration: 1000,
						icon: 'none'
					});
					return;
				}
				this.selectedStyle = style;
				if(this.transferredPictures[style]){
					this.selectedTransferredPitucre = this.transferredPictures[style];
				}else{
					this.transfer(style, res.data.token);
				}
				
			},
			
			getTransferToken(){
				// 后台检验pictures是否达到上限、用户身份是否无误
				return {code: 0, data:{token: 'test'}};
			},
			
			transfer(style, token){
				if(!this.pictureData){
					const imgData = uni.getFileSystemManager().readFileSync(this.pictureUrl, 'base64');
					const base64 = '' + imgData;
					this.pictureData = base64;
					console.log(this.pictureData);
				}
			},
			
			clear(){
				this.hasPicture = false;
				this.pictureUrl = null;
				this.pictureData = null;
				this.isTransferred = false;
				this.selectedKind = '推荐';
				this.selectedStyle = null;
				this.transferredPictures = {};
				this.selectedTransferredPitucre = null;
				this.loadingFinished = false;
			},
			
			showSharePanel(){
				this.isSharing = true;
			},
			hideSharePanel(){
				this.isSharing = false;
			},
			
			wechatShare(){
				uni.showShareMenu({
				  withShareTicket: true,
				  success: function(res){
					  console.log('res:',res);
				  },
				  fail: function(err){
					  console.log(err);
				  }
				})
			},
			generateCard(){
				let _this = this;
				uni.showLoading({
				    title: '卡片生成中',
					mask: true
				});
				
				// 请删除此赋值
				this.selectedTransferredPitucre = this.pictureUrl;
				
				uni.getImageInfo({
				    src: this.selectedTransferredPitucre,
					success: function(image){
						uni.navigateTo({url:`/pages/pictureDesign/cardShare?url=${_this.selectedTransferredPitucre}&height=${image.height}&width=${image.width}&styleName=${_this.selectedStyle}`});
						uni.hideLoading();
					},
				})
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
@import url('../../common/less/pictureDesign.less');
</style>

