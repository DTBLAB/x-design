<template>
	<view class="page-container">
		<image class="card" :style="{height: cardHeight}" :src="cardUrl" show-menu-by-longpress></image>
		<canvas class="card-canvas" :style="{height: canvasHeight}" canvas-id="card-canvas"></canvas>
		<view class="tip">长按保存分享~</view>
		<view class="save-button" @click="toProductDesign">去定制产品</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import sayings from '../../static/sayings.json'
	
	export default{
		data(){
			return{
				rpx: 750/uni.getSystemInfoSync().windowWidth,
				canvasHeight: '1600rpx',
				cardHeight: '800rpx',
				url: '',
				pictureUrl: '',
				pictureWidth: 0,
				pictureHeight: 0,
				styleName: '',
				isAvatarLoaded: false,
				isMiniProgramCodeLoaded: false,
				cardUrl: '',
				pid: 0
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.styleName = option.styleName;
			this.url = option.url;
			this.pid = option.pid;
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
			    src: this.url,
				success: function(image){
					_this.pictureWidth = image.width;
					_this.pictureHeight = image.height;
					_this.pictureUrl = image.path;
					_this.cardHeight = (image.height/image.width*624 + 354) + 'rpx';
					_this.canvasHeight = (image.height/image.width*624 + 354)*2 + 'rpx';
					_this.generateCard();
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
					  width: 662/_this.rpx*2,
					  height: parseInt(_this.canvasHeight.replace('rpx', ''))/_this.rpx,
					  destWidth: 662/_this.rpx*2,
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
				
				ctx.drawImage('/static/image/white.png', 0, 0, 331, 331, 0, 0, 662/this.rpx*2, Number(_this.canvasHeight.replace('rpx',''))/this.rpx);
				
				let pictureHeightInCanvas = this.pictureHeight/this.pictureWidth*624/this.rpx*2;
				ctx.drawImage(_this.pictureUrl, 0, 0, this.pictureWidth, this.pictureHeight, 20/this.rpx*2, 24/this.rpx*2, 624/this.rpx*2, pictureHeightInCanvas);
				
				ctx.beginPath();
				ctx.lineWidth=1*2;
				
				ctx.setLineDash([6/this.rpx*2, 6/this.rpx*2]);
				ctx.strokeStyle="#CDCDCD"; // Green path
				ctx.moveTo(0, 202/this.rpx*2 + pictureHeightInCanvas);
				ctx.lineTo(662/this.rpx*2, 202/this.rpx*2 + pictureHeightInCanvas);
				ctx.stroke(); // Draw it
				
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
				ctx.fillText(this.nickname, 138/this.rpx*2, 246/_this.rpx*2 + pictureHeightInCanvas);
				ctx.fillText("创作了一张", 138/this.rpx*2, 278/_this.rpx*2 + pictureHeightInCanvas);
				
				ctx.font = "bold "+fontsize+"px 'PingFang SC'";
				ctx.fillText(this.styleName+"风格", 258/this.rpx*2, 278/_this.rpx*2 + pictureHeightInCanvas);
				ctx.font = fontsize+"px 'PingFang SC'";
				ctx.fillText("的图片", (258+24*(this.styleName.length+2))/this.rpx*2, 278/_this.rpx*2 + pictureHeightInCanvas);
				
				ctx.font = "bold "+fontsize+"px 'PingFang SC'";
				let commonSayings = sayings.commonSayings;
				let index = Math.floor(Math.random()*commonSayings.length);
				let saying = commonSayings[index];
				let length = saying.length - 1;
				
				ctx.textAlign = "right";
				ctx.fillText(saying[length], 634/this.rpx*2, 148/_this.rpx*2 + pictureHeightInCanvas);
				
				ctx.textAlign = "center";
				if(length === 2 ){
					ctx.fillText(saying[0], 331/this.rpx*2, 60/_this.rpx*2 + pictureHeightInCanvas);
					ctx.fillText(saying[1], 331/this.rpx*2, 92/_this.rpx*2 + pictureHeightInCanvas);
				}else{
					ctx.fillText(saying[0], 331/this.rpx*2, 76/_this.rpx*2 + pictureHeightInCanvas);
				}
				
				
				uni.getImageInfo({
				    src: this.avatarUrl,
				    success: function (res) {
						ctx.save()
						ctx.beginPath()
						ctx.arc(73/_this.rpx*2, 273/_this.rpx*2 + pictureHeightInCanvas, 39/_this.rpx*2, 0, 2 * Math.PI)
						ctx.clip()
						ctx.drawImage(res.path, 0, 0, res.width, res.height, 34/_this.rpx*2, 234/_this.rpx*2 + pictureHeightInCanvas, 78/_this.rpx*2, 78/_this.rpx*2)
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
						ctx.beginPath()
						//ctx.arc(589/_this.rpx, 273/_this.rpx + pictureHeightInCanvas, 51/_this.rpx, 0, 2 * Math.PI)
						ctx.rect(538/_this.rpx*2, 222/_this.rpx*2 + pictureHeightInCanvas, 102/_this.rpx*2, 102/_this.rpx*2)
						ctx.clip()
						ctx.drawImage(res.path, 0, 0, res.width, res.height, 538/_this.rpx*2, 222/_this.rpx*2 + pictureHeightInCanvas, 102/_this.rpx*2, 102/_this.rpx*2)
				        ctx.restore()
						try{
							ctx.draw(true, ()=>{
								_this.isMiniProgramCodeLoaded = true;
								// console.log('mploaded');
								_this.canvasToCard();
							})
						}catch(err){
							console.log(err);
						}
				        
				    },
					fail: function(err) {
						console.log(err);
					}
				});
			}
			
		}
		
	}
	
</script>

<style lang="less" scoped>
@import url('../../common/less/cardShare.less');
</style>
