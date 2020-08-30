<template>
	<view class="page-container">
		<image class="adjusting-picture" :src="adjustingPictureUrl" mode='aspectFit'></image>
		<image class="adjusting-background-image" :src="adjustingPictureUrl"></image>
		<view class="adjusting-background-cover"></view>
		<canvas canvas-id="adjust-canvas" class="adjust-canvas"></canvas>
		<view class="adjust-panel">
			<slider
			  class="attribute-slider"
			  v-show="'opacity' === selectedAttribute"
			  min="0"
			  max="100"
			  step="1"
			  :value="values['opacity']"
			  activeColor="#333333"
			  backgroundColor="#CDCDCD"
			  block-size="16"
			  @changing="sliderChanging($event, 'opacity')"
			></slider>
			<slider
			  class="attribute-slider"
			  v-for="attribute in attributes"
			  :key="attribute"
			  v-show="attribute === selectedAttribute"
			  v-if="attribute !== 'opacity'"
			  min="-100"
			  max="100"
			  step="1"
			  :value="values[attribute]"
			  activeColor="#333333"
			  backgroundColor="#CDCDCD"
			  block-size="16"
			  @changing="sliderChanging($event, attribute)"
			></slider>
			<scroll-view class="scroll-view_H attributes-container" scroll-x="true" enable-flex="true">
				<view class="attributes-body">
					<view v-for="attribute in attributes" 
					  :key="attribute" 
					  class="attribute-button"
					  :class="{ 'attribute-button--selected': attribute === selectedAttribute }"
					  @click="selectAttribute(attribute)"
					>
						<view class="attribute-button__name">{{attributeChineseNames[attribute]}}</view>
						<view class="attribute-button__value">{{values[attribute]}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import WxCaman from '../../node_modules/wx-caman'
	
	export default{
		data(){
			return{
				pictureWidth: 0,
				pictureHeight: 0,
				rawPictureUrl: '',
				adjustingPictureUrl: '',
				attributes:['opacity', 'saturation', 'contrast', 'brightness', 'exposure'],
				selectedAttribute: 'opacity',
				values: {
					opacity: 100,
					saturation: 0,
					contrast: 0,
					brightness: 0,
					exposure: 0
				},
				attributeChineseNames: {
					opacity: '风格度',
					saturation: '饱和度',
					contrast: '对比度',
					brightness: '亮度',
					exposure: '曝光'
				},
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option);
			this.rawPictureUrl = this.adjustingPictureUrl = option.url;
			// this.drawPictureToCanvas();
		},
		mounted(){
			
		},
		methods:{
			drawPictureToCanvas(){
				let _this = this;
			
				uni.getImageInfo({
				    src: this.rawPictureUrl,
				    success: function (image) {
						_this.pictureHeight = image.height;
						_this.pictureWidth = image.width;
						const ctx = uni.createCanvasContext('adjust-canvas');
						ctx.drawImage(_this.rawPictureUrl, 0, 0, _this.pictureWidth, _this.pictureHeight);
						ctx.draw(false, ()=>{
							_this.adjust();
						});
					},
				});
				
			},
			adjust(){
				let _this = this;
				
				new WxCaman('adjust-canvas', this.pictureWidth, this.pictureHeight, function () {
					this.brightness(60);
					// this.contrast(30)
					// this.sepia(60)
					// this.saturation(-30)
					this.render(function(){
						_this.canvasToPicture();
					});
				});
			},
			canvasToPicture(){
				let _this = this;
				uni.canvasToTempFilePath({
				  x: 0,
				  y: 0,
				  width: _this.pictureWidth,
				  height: _this.pictureHeight,
				  destWidth: _this.pictureWidth,
				  destHeight: _this.pictureHeight,
				  canvasId: 'adjust-canvas',
				  fileType: 'jpg',
				  success: function(res) {
					console.log(res);
				    _this.adjustingPictureUrl = res.tempFilePath;
				  } 
				})
			},
			
			selectAttribute(attr){
				this.selectedAttribute = attr; 
			},
			sliderChanging(event, attr) {
				this.values[attr] = event.detail.value;
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
@import url('../../common/less/pictureAdjust.less');
</style>

