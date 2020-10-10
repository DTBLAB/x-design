<template>
	<view class="page-container">
		<view class="sign-container">
			<image class="sign-container__background" src="https://x-design.oss-cn-hangzhou.aliyuncs.com/product/重复网格 1@3x.png" mode="aspectFill"></image>
			<canvas 
			  class="sign-canvas" 
			  canvas-id="sign-canvas" 
			  @touchstart="startLine"
			  @touchmove="drawLine"
			  @touchend="endLine"
			></canvas>
		</view>
		<view class="sign-selector">
			<view class="sign-selector__weight">
				<view class="sign-selector__weight__text">粗细</view>
				<slider
				  class="sign-selector__weight__slider"
				  min="1"
				  max="30"
				  step="1"
				  :value="weight"
				  activeColor="#FC9A04"
				  backgroundColor="#CDCDCD"
				  block-size="18"
				  @change="setWeight"
				></slider>
			</view>
			<view class="sign-selector__colors">
				<view class="sign-selector__color"
				  v-for="(item, index) in color"
				  :key="index"
				  :style="{'background-color':item}"
				  :class="{'sign-selector__color--white': item === '#FFFFFF'}"
				  @click="selectColor(item)"
				>	
					<view class="sign-selector__color__select-mark" v-if="selectedColor === item && item !== '#FFFFFF'" :style="{'border-color':item}"></view>
					<view class="sign-selector__color__select-mark" v-if="selectedColor === item && item === '#FFFFFF'" :style="{'border-color':'#CDCDCD', 'top': '-6rpx', left: '-6rpx'}"></view>
				</view>
			</view>
		</view>
		<image class="adjust-button adjust-button--reset" src="../../static/image/pictureAdjust/reset.png" @click="reset"></image>
		<image class="adjust-button adjust-button--finish" src="../../static/image/pictureAdjust/finish.png" @click="finish"></image>
		
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	
	export default {
		data() {
			return {
				color:[
				  '#000000','#A60000','#FF6F00','#003F75','#0A5A00','#006B7C','#871A58','#111472','#722F11',
				  '#666666','#FF3737','#FC9804','#0081F1','#109A00','#0099B2','#CA2B85','#1218C1','#CD764F',
				  '#FFFFFF','#FF9C9C','#FFDE00','#90CCFF','#A8EBA8','#90E4F1','#FE96D1','#868BFF','#D4A64B'
				],
				weight: 3,
				selectedColor: '#000000',
				arrX: [],
				arrY: [],
				arrIsStart: [],
				ctx: null
			}
		},
		mounted(){
			this.ctx = uni.createCanvasContext('sign-canvas');
			this.ctx.setLineCap('round');
			this.ctx.setLineJoin('round');
		},
		methods: {
			...mapMutations(['saveSignature']),
			setWeight(e){
				this.weight = e.detail.value;
				this.redraw();
			},
			selectColor(color){
				this.selectedColor = color;
				this.redraw();
			},
			startLine(e){
				let x = e.touches[0].x;
				let y = e.touches[0].y;
				this.ctx.setLineWidth(this.weight);
				this.ctx.setStrokeStyle(this.selectedColor);
				// this.ctx.beginPath();
				this.ctx.moveTo(x, y);
				this.arrIsStart.push(true);
				this.arrX.push(x);
				this.arrY.push(y);
			},
			drawLine(e){
				let x = e.touches[0].x;
				let y = e.touches[0].y;
				this.ctx.lineTo(x, y);
				this.arrIsStart.push(false);
				this.arrX.push(x);
				this.arrY.push(y);
				this.ctx.stroke();
				this.ctx.draw(true);
				this.ctx.moveTo(x, y);
			},
			endLine(e){
				// console.log(e);
			},
			redraw(){
				this.ctx.draw();
				this.ctx.setLineWidth(this.weight);
				this.ctx.setStrokeStyle(this.selectedColor);
				for(let i = 0; i < this.arrX.length; i++){
					let x = this.arrX[i];
					let y = this.arrY[i];
					let isStart = this.arrIsStart[i];
					if(isStart){
						this.ctx.moveTo(x, y);
					}else{
						this.ctx.lineTo(x, y);
						this.ctx.moveTo(x, y);
					}
				}
				this.ctx.stroke();
				this.ctx.draw(true);
			},
			reset(){
				this.arrX = [];
				this.arrY = [];
				this.arrIsStart = [];
				this.ctx.draw();
			},
			finish(){
				let _this = this;
				uni.showLoading({
					title: '签名保存中',
					mask: true
				})
				let sortedArrX = JSON.parse(JSON.stringify(this.arrX)).sort(function(a,b){return a-b});
				let sortedArrY = JSON.parse(JSON.stringify(this.arrY)).sort(function(a,b){return a-b});
				let minX = sortedArrX[0] - this.weight;
				let minY = sortedArrY[0] - this.weight;
				let maxX = sortedArrX[sortedArrX.length - 1] + this.weight;
				let maxY = sortedArrY[sortedArrY.length - 1] + this.weight;
				
				// console.log(minX, minY, maxX - minX, maxY - minY);
				uni.canvasToTempFilePath({
				  x: minX,
				  y: minY,
				  width: maxX - minX,
				  height: maxY - minY,
				  destWidth: maxX - minX,
				  destHeight: maxY - minY,
				  canvasId: 'sign-canvas',
				  fileType: 'png',
				  quality: 1.0,
				  success: async function(res) {
					let url = res.tempFilePath;
					await _this.saveSignature(url);
					uni.hideLoading();
					uni.navigateBack();
				  },
				  fail:function(err){
				  	console.log(err);
				  }
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
@import url('../../common/less/sign.less');
</style>
