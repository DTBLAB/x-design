<template>
	<view class="page-container">
		<image class="card" style="width: 692rpx" :style="{height: cardHeight}" :src="cardUrl" show-menu-by-longpress></image>
		<canvas class="card-canvas" style="width: 1384rpx" :style="{height: canvasHeight}" canvas-id="card-canvas"></canvas>
		<view class="tip">长按分享保存~</view>
		<!-- <view class="save-button" @click="toShoppingCart">去下单生产</view> -->
		<view class="save-button" @click="savePreview">去下单生产</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import sayings from '../../static/sayings.json'
	
	export default{
		data(){
			return{
				rpx: 750/uni.getSystemInfoSync().windowWidth,
				canvasHeight: '2112rpx',
				cardHeight: '1056rpx',
				background: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/cardBackground.png',
				url: '',
				original: '',
				pictureUrl: '',
				pictureWidth: 0,
				pictureHeight: 0,
				productWidth: 0,
				productHeight: 0,
				styleName: '',
				isAvatarLoaded: false,
				isMiniProgramCodeLoaded: false,
				cardUrl: '',
				pid: 0
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.name = option.name;
			this.url = option.url;
			this.original = option.original;
			console.log(this.name, this.url)
		},
		onShow: function(){
			
		},
		computed:{
			...mapState(['hasLogin', 'nickname' ,'avatarUrl'])
		},
		mounted(){
			let _this = this;
			uni.showLoading({
			    title: '卡片生成中',
				mask: true
			});
			
			uni.getImageInfo({
			    src: this.background,
				success: function(image){
					_this.pictureWidth = image.width;
					_this.pictureHeight = image.height;
					_this.pictureUrl = image.path;
					_this.cardHeight = (image.height/image.width*644 + 238) + 'rpx';
					_this.canvasHeight = (image.height/image.width*644 + 238)*2 + 'rpx';
					if(_this.productHeight !== 0 ){
						_this.generateCard();	
					}
				},
				fail: function(error){
					console.log(error);
				}
			});
			
			uni.getImageInfo({
			    src: this.url,
				success: function(image){
					_this.productWidth = image.width;
					_this.productHeight = image.height;
					if(_this.pictureHeight !== 0 ){
						_this.generateCard();	
					}
				},
				fail: function(error){
					console.log(error);
				}
			});
			
		},
		methods:{
			canvasToCard(){
				let _this = this;
				console.log(!this.isAvatarLoaded || !this.isMiniProgramCodeLoaded);
				if(!this.isAvatarLoaded || !this.isMiniProgramCodeLoaded){
					return;
				}
				setTimeout(function(){
					uni.canvasToTempFilePath({
					  x: 0,
					  y: 0,
					  width: 692/_this.rpx*2,
					  height: parseInt(_this.canvasHeight.replace('rpx', ''))/_this.rpx,
					  destWidth: 692/_this.rpx*2,
					  destHeight: parseInt(_this.canvasHeight.replace('rpx', ''))/_this.rpx,
					  canvasId: 'card-canvas',
					  fileType: 'png',
					  quality: 1.0,
					  success: function(res) {
						 console.log(res);
					    _this.cardUrl = res.tempFilePath;
						uni.hideLoading();
					  } 
					})
				});
			},
			toProductDesign(){
				uni.navigateTo({
					url: '/pages/productList/productList?pid='+this.pid
				})
			},
			generateCard(){
				let _this = this;
				let ctx = uni.createCanvasContext('card-canvas');
				
				// ctx.setFillStyle('white');
				// ctx.fillStyle='white';
				// ctx.fillRect(0, 0, 662/this.rpx, Number(_this.canvasHeight.replace('rpx',''))/this.rpx);

				// ctx.rect(0, 0, 662/this.rpx, Number(_this.canvasHeight.replace('rpx',''))/this.rpx);
				// // it will fill current path
				// ctx.setFillStyle('white')
				// ctx.fill()
				
				// ctx.draw();
				
				// console.log(_this.pictureUrl, _this.url, _this.avatarUrl)
				ctx.drawImage('/static/image/white.png', 0, 0, 331, 331, 0, 0, 692/this.rpx*2, Number(_this.canvasHeight.replace('rpx',''))/this.rpx);
				
				let pictureHeightInCanvas = this.pictureHeight/this.pictureWidth*644/this.rpx*2;
				ctx.drawImage(_this.pictureUrl, 0, 0, this.pictureWidth, this.pictureHeight, 24/this.rpx*2, 24/this.rpx*2, 644/this.rpx*2, pictureHeightInCanvas);
				
				let h, w, l, t;
				if(this.productWidth/this.productHeight >= 386/504){
					w = 386/this.rpx*2;
					h = 386*this.productHeight/this.productWidth/this.rpx*2;
					l = 152/this.rpx*2;
					t = ((504 - 386*this.productHeight/this.productWidth)/2 + 250)/this.rpx*2;
				}else{
					h = 504/this.rpx*2;
					w = 504*this.productWidth/this.productHeight/this.rpx*2;
					t = 250/this.rpx*2;
					l = ((386 - 504*this.productWidth/this.productHeight)/2 + 152)/this.rpx*2;
				}
				ctx.drawImage(_this.url, 0, 0, this.productWidth, this.productHeight, l ,t, w, h);
				
				ctx.draw();
				
				let fontsize = 24/this.rpx*2;
				let lineHeight = 32/this.rpx*2; 
				ctx.setFontSize(fontsize);
				// 设置字体
				ctx.font = fontsize+"px 'PingFang SC'";
				// 设置颜色
				ctx.fillStyle = "#333333";
				// 设置水平对齐方式
				ctx.textAlign = "left";
				ctx.textBaseline = "top";
				ctx.fillText(this.nickname, 144/this.rpx*2, 92/_this.rpx*2 + pictureHeightInCanvas);
				ctx.fillText("创作了一款" + this.name + ", 你也来试试吧~", 144/this.rpx*2, 124/_this.rpx*2 + pictureHeightInCanvas);

				uni.getImageInfo({
				    src: this.avatarUrl,
				    success: function (res) {
						ctx.save()
						ctx.beginPath()
						ctx.arc(81/_this.rpx*2, 121/_this.rpx*2 + pictureHeightInCanvas, 39/_this.rpx*2, 0, 2 * Math.PI)
						ctx.clip()
						ctx.drawImage(res.path, 0, 0, res.width, res.height, 42/_this.rpx*2, 82/_this.rpx*2 + pictureHeightInCanvas, 78/_this.rpx*2, 78/_this.rpx*2)
				        ctx.restore()
						ctx.draw(true, ()=>{
							_this.isAvatarLoaded = true;
							// console.log('avatarLoaded');
							_this.canvasToCard();
						})
				    },
					fail: function(err) {
						console.log(err);
					}
				});
				
				uni.getImageInfo({
				    src: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/miniProgramCode.png',
				    success: function (res) {
						ctx.save()
						ctx.drawImage(res.path, 0, 0, res.width, res.height, 538/_this.rpx*2, 64/_this.rpx*2 + pictureHeightInCanvas, 112/_this.rpx*2, 112/_this.rpx*2)
				        ctx.restore()
				        ctx.draw(true, ()=>{
							_this.isMiniProgramCodeLoaded = true;
							// console.log('mploaded');
							_this.canvasToCard();
						})
				    },
					fail: function(err) {
						console.log(err);
					}
				});
			},
			savePreview(){
				uni.saveImageToPhotosAlbum({
					filePath: this.url,
					success: function () {
						console.log('save success');
					}
				});
			}
			
		}
		
	}
	
</script>

<style lang="less" scoped>
@import url('../../common/less/cardShare.less');
</style>
