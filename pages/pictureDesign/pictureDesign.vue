<template>
	<view class="page-container">
		<view class="picture-container">
			<view class="picture-add" @click="choosePicture" v-if="!hasPicture">
				<view class="picture-add__icon"></view>
			</view>
			<image class="picture-body" :src="isTransferred?selectedTransferredPicture:pictureUrl" mode='aspectFit' v-else>
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
		<view class="picture-finish" v-if="isTransferred" @click="finishDesign">完成</view>
		<view class="right-bar" v-if="isTransferred">
			<view class="right-bar-item right-bar-item--adjust" @click="adjustPicture"></view>
			<!-- <button class="right-bar-item right-bar-item--share" open-type="share" @click="wechatShare"></button> -->
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
	import { mapMutations } from 'vuex'
	import { mapState } from 'vuex'
	import baseConfig from '../../config/index';
	
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
				    '绘画',
				    '艺术家',
				    '中国风',
				    '亚文化',
				    '其他'
				],
				styles: {
				    '推荐': ['赛博朋克', '浮世绘', '和玺彩画', '水彩画', '国画梅花', '蜡笔画', '铅笔画', '梵高', '康定斯基', '万圣节', '波普'],
				    '绘画': ['沙画', '蜡笔画', '水墨画', '线描', '国画梅花', '湿拓画', '铅笔画', '水彩画'],
				    '艺术家': ['梵高', '毕加索', '波洛克', '康定斯基', '孟菲斯', '齐白石'],
				    '中国风': ['剪纸', '刺绣', '青花瓷', '和玺彩画', '龙袍', '敦煌', '鹿'],
				    '亚文化': ['赛博朋克', '卡通', '炫彩霓虹', '波普', '马赛克'],
				    '其他': ['土耳其瓷器', '阿拉伯地毯', '印度纹身', '泰国绘画']
				},
				selectedKind: '推荐',
				selectedStyle: null,
				transferredPictures:{
				},
				selectedTransferredPicture: null,
				isSharing: false,
				transferToken: null,
				optionStyle: undefined,
			}
		},
		computed: {
			...mapState(['adjustedPictureUrl']),
			selectedStyles(){
				return this.styles[this.selectedKind]
			}
		},
		onShareAppMessage() {
			return {
				title: '想定就定，定你所想',
				path: '/pages/index/index',
				imageUrl: this.isTransferred? this.selectedTransferredPicture:this.pictureUrl, // 生成的分享图赋值给到小程序自定义分享图链接
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
		onShow() {
			if(this.adjustedPictureUrl){
				//这里记得换回来
				// this.pictureUrl = this.adjustedPictureUrl;
				this.selectedTransferredPicture = this.adjustedPictureUrl;
				this.saveAdjustment(null);
			}
		},
		onLoad(option){
			let url = option.url;
			let style = option.style
			if(url){
				this.loadPicture(url);
			}
			if(style){
				this.optionStyle = style;
			}
		},
		methods: {
			...mapMutations(['saveAdjustment']),
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
							if(_this.optionStyle){
								_this.selectStyle(_this.optionStyle);
							}
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
								if(_this.optionStyle){
									_this.selectStyle(_this.optionStyle);
								}
								// uni.getImageInfo({
								//     src: _this.pictureUrl,
								//     success: function (image2) {
								// 		console.log('image2', image2)
								// 	}
								// })
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
			async selectStyle(style){
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
				if(!this.transferToken){
					let res = await this.getTransferToken();
					console.log('getToken');
					if(!res.data || res.data.code !== 0){
						uni.showToast({
						    title: res.data.message,
						    duration: 1000,
							icon: 'none'
						});
						return;
					}
					this.transferToken = res.data.data.token;
				}
				this.selectedStyle = style;
				if(this.transferredPictures[style]){
					this.selectedTransferredPicture = this.transferredPictures[style];
				}else{
					this.transfer(style, this.transferToken);
				}
				
			},
			
			async getTransferToken(){
				return await this.$http.get('/picture/checkCapacity');
			},
			
			transfer(style, token){
				let _this = this;
				if(!this.pictureData){
					const imgData = uni.getFileSystemManager().readFileSync(this.pictureUrl, 'base64');
					const base64 = '' + imgData;
					this.pictureData = base64;
					// console.log(this.pictureData);
				}
				uni.showLoading({
				    title: '风格化中',
					mask: true
				});
				this.$http.post('/transfer/', {styleID: style, token: token, pictureData: this.pictureData}, {baseUrl: baseConfig.transferBaseUrl, timeout: 90000}).then(result => {
					console.log('transferResult', result);
					if(result.data.code !== 0){
						uni.showToast({
						    title: res.data.message,
						    duration: 1000,
							icon: 'none'
						});
						return;
					}
					uni.getImageInfo({
					    src: baseConfig.transferBaseUrl + result.data.url,
						success: function(image){
							_this.selectedTransferredPicture = image.path;
							_this.isTransferred = true;
							_this.transferredPictures[style] = _this.selectedTransferredPicture;
							uni.hideLoading();
						},
					})
				}).catch(err => {
					console.log('transferErr', err);
					uni.showToast({
					    title: '迁移失败，请重试',
					    duration: 1000,
						icon: 'none'
					});
					uni.hideLoading();
				})
			},
			
			clear(){
				this.hasPicture = false;
				this.pictureUrl = null;
				this.pictureData = null;
				this.isTransferred = false;
				this.selectedKind = '推荐';
				this.selectedStyle = null;
				this.transferredPictures = {};
				this.selectedTransferredPicture = null;
				this.loadingFinished = false;
				this.transferToken = null;
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
			generateCard(pid){
				let _this = this;
				uni.reLaunch({url:`/pages/pictureDesign/cardShare?pid=${pid}&url=${this.selectedTransferredPicture}&styleName=${_this.selectedStyle}`});
			},
			adjustPicture(){
				uni.navigateTo({url:`/pages/pictureDesign/pictureAdjust?transferredPictureUrl=${this.selectedTransferredPicture}&rawPictureUrl=${this.pictureUrl}`});
				uni.hideLoading();
			},
			
			async finishDesign(){
				let _this = this;
				const {params, path} = await this.getParams().catch(err => {
					console.log(err);
					return;
				});
				// try{
				// 	const result = await this.getParams();
				// 	console.log(result);
				// }catch(err){
				// 	console.log(err);
				// 	uni.showToast({
				// 	    title: '网络错误，请重试',
				// 	    duration: 1000,
				// 		icon: 'none'
				// 	});
				// 	return;
				// }
				console.log(_this.selectedTransferredPicture);
				uni.uploadFile({
				  url: 'https://x-design-pictures.oss-cn-hangzhou.aliyuncs.com/', // 开发者服务器的URL。
				  filePath: _this.selectedTransferredPicture,
				  name: 'file', // 必须填file。
				  formData: params,
				  success: (res) => {
					console.log(res);
				    if (res.statusCode === 204) {
				      console.log('上传成功');
					  _this.savePicture('https://x-design-pictures.oss-cn-hangzhou.aliyuncs.com/'+params.key);
				    }
				  },
				  fail: err => {
				    console.log(err);
					uni.showToast({
					    title: "上传失败",
					    duration: 1000,
						icon: 'none'
					});
				  }
				});
				// const imgData = uni.getFileSystemManager().readFileSync(this.pictureUrl, 'base64');
				// const base64 = '' + imgData;
				// this.pictureData = base64;
				
			},
			async getParams(){
				return await this.$http.get('/picture/getPostObjectParams', {}).then(res => {
					if(res.data.code !== 0){
						throw new Error("获取签名失败!");
					}
					console.log(res.data.data);
					return res.data.data;
				}).catch(err => {
					throw new Error("获取签名失败!");
				})
			},
			savePicture(url){
				let _this = this;
				this.$http.post('/picture/add', {url: url}).then(res => {
					if(res.data.code !== 0){
						uni.showToast({
						    title: res.data.message,
						    duration: 1000,
							icon: 'none'
						});
						return;
					}
					_this.generateCard(res.data.data.pid);
				}).catch(err => {
					console.log(err);
					uni.showToast({
					    title: "保存失败",
					    duration: 1000,
						icon: 'none'
					});
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

