<template>
	<view class="page-container">
		<canvas class="card-canvas" :style="{height: canvasHeight}" canvas-id="card-canvas"></canvas>
		<!-- <image></image> -->
		<view class="tip">长按分享保存~</view>
		<view class="save-button">去设计</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import sayings from '../../static/sayings.json'
	
	export default{
		data(){
			return{
				rpx: 750/uni.getSystemInfoSync().windowWidth,
				canvasHeight: '800rpx',
				pictureUrl: '',
				pictureWidth: 0,
				pictureHeight: 0,
				styleName: ''
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option);
			this.styleName = option.styleName;
			this.pictureUrl = option.url;
			this.pictureHeight = option.height;
			this.pictureWidth = option.width;
			this.canvasHeight = (option.height/option.width*624 + 354) + 'rpx';
		},
		computed:{
			...mapState(['hasLogin', 'nickname' ,'avatarUrl'])
		},
		mounted(){
			console.log(this.pictureUrl)
			let _this = this;
			let ctx = uni.createCanvasContext('card-canvas');
			let pictureHeightInCanvas = this.pictureHeight/this.pictureWidth*624/this.rpx;
			ctx.drawImage(_this.pictureUrl, 0, 0, this.pictureWidth, this.pictureHeight, 20/this.rpx, 24/this.rpx, 624/this.rpx, pictureHeightInCanvas);
			
			ctx.beginPath();
			ctx.lineWidth=1;
			
			ctx.setLineDash([6/this.rpx, 6/this.rpx]);
			ctx.strokeStyle="#CDCDCD"; // Green path
			ctx.moveTo(0, 202/this.rpx + pictureHeightInCanvas);
			ctx.lineTo(662/this.rpx, 202/this.rpx + pictureHeightInCanvas);
			ctx.stroke(); // Draw it
			
			ctx.draw();
			
			let fontsize = 24/this.rpx;
			let lineHeight = 32/this.rpx; 
			// 设置字体
			ctx.font = fontsize+"px 'PingFang SC'";
			// 设置颜色
			ctx.fillStyle = "#333333";
			// 设置水平对齐方式
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			ctx.fillText(this.nickname, 138/this.rpx, 246/_this.rpx + pictureHeightInCanvas);
			ctx.fillText("创作了一张", 138/this.rpx, 278/_this.rpx + pictureHeightInCanvas);
			
			ctx.font = "bold "+fontsize+"px 'PingFang SC'";
			ctx.fillText(this.styleName+"风格", 258/this.rpx, 278/_this.rpx + pictureHeightInCanvas);
			ctx.font = fontsize+"px 'PingFang SC'";
			ctx.fillText("的图片", (258+24*(this.styleName.length+2))/this.rpx, 278/_this.rpx + pictureHeightInCanvas);
			
			ctx.font = "bold "+fontsize+"px 'PingFang SC'";
			let commonSayings = sayings.commonSayings;
			let index = Math.floor(Math.random()*commonSayings.length);
			let saying = commonSayings[index];
			let length = saying.length - 1;
			
			ctx.textAlign = "right";
			ctx.fillText(saying[length], 634/this.rpx, 148/_this.rpx + pictureHeightInCanvas);
			
			ctx.textAlign = "center";
			if(length === 2 ){
				ctx.fillText(saying[0], 331/this.rpx, 60/_this.rpx + pictureHeightInCanvas);
				ctx.fillText(saying[1], 331/this.rpx, 92/_this.rpx + pictureHeightInCanvas);
			}else{
				ctx.fillText(saying[0], 331/this.rpx, 76/_this.rpx + pictureHeightInCanvas);
			}
			
			
			uni.getImageInfo({
			    src: this.avatarUrl,
			    success: function (res) {
					ctx.save()
					ctx.beginPath()
					ctx.arc(73/_this.rpx, 273/_this.rpx + pictureHeightInCanvas, 39/_this.rpx, 0, 2 * Math.PI)
					ctx.clip()
					ctx.drawImage(res.path, 0, 0, res.width, res.height, 34/_this.rpx, 234/_this.rpx + pictureHeightInCanvas, 39, 39)
			        ctx.restore()
			        ctx.draw(true)
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
					ctx.rect(538/_this.rpx, 222/_this.rpx + pictureHeightInCanvas, 51, 51)
					ctx.clip()
					ctx.drawImage(res.path, 0, 0, res.width, res.height, 538/_this.rpx, 222/_this.rpx + pictureHeightInCanvas, 51, 51)
			        ctx.restore()
			        ctx.draw(true)
			    },
				fail: function(err) {
					console.log(err);
				}
			});
		}
	}
	
</script>

<style lang="less" scoped>
@import url('../../common/less/cardShare.less');
</style>
