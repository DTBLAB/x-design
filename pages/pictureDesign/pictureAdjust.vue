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
			  @change="setAttributes($event, 'opacity')"
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
			  @change="setAttributes($event, attribute)"
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
		
		<image class="adjust-button adjust-button--back" src="../../static/image/pictureAdjust/back.png" @click="back"></image>
		<image class="adjust-button adjust-button--reset" src="../../static/image/pictureAdjust/reset.png" @click="reset"></image>
		<image class="adjust-button adjust-button--finish" src="../../static/image/pictureAdjust/finish.png" @click="finish"></image>

	</view>
</template>

<script>
	import WxCaman from '../../node_modules/wx-caman'
	// import Caman from '../../node_modules/caman'
	import { mapMutations } from 'vuex'
	
	export default{
		data(){
			return{
				pictureWidth: 0,
				pictureHeight: 0,
				rawPictureUrl: '',
				transferredPictureUrl: '',
				adjustingPictureUrl: '',
				attributes:['opacity'
				, 'contrast', 'brightness', 'saturation', 'exposure',
				],
				selectedAttribute: 'opacity',
				values: {
					opacity: 100,
					contrast: 0,
					brightness: 0,
					saturation: 0,
					exposure: 0
				},
				attributeChineseNames: {
					opacity: '风格度',
					contrast: '对比度',
					brightness: '亮度',
					saturation: '饱和度',
					exposure: '曝光'
				},
				transferredImageData: [],
				previousOpacity: 100
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			// console.log(option);
			this.rawPictureUrl = option.rawPictureUrl;
			this.transferredPictureUrl = this.adjustingPictureUrl = option.transferredPictureUrl;
			this.drawPictureToCanvas();
		},
		mounted(){
			
		},
		methods:{
			...mapMutations(['saveAdjustment']),
			drawPictureToCanvas(){
				let _this = this;
			
				uni.getImageInfo({
				    src: this.transferredPictureUrl,
				    success: function (image) {
						_this.pictureHeight = image.height;
						_this.pictureWidth = image.width;
						const ctx = uni.createCanvasContext('adjust-canvas');
						ctx.drawImage(_this.transferredPictureUrl, 0, 0, _this.pictureWidth, _this.pictureHeight);
						ctx.draw();
					},
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
				    _this.adjustingPictureUrl = res.tempFilePath;
					uni.hideLoading();
				  } 
				})
			},
			
			selectAttribute(attr){
				// console.log('here');
				this.selectedAttribute = attr; 
			},
			sliderChanging(event, attr) {
				this.values[attr] = event.detail.value;
			},
			setAttributes(event, attr){
				let _this = this;
				this.values[attr] = event.detail.value;
				uni.showLoading({
					title: '图片调整中',
					mask: true
				})
				
				const ctx = uni.createCanvasContext('adjust-canvas');

				ctx.clearRect(0, 0, _this.pictureWidth, _this.pictureHeight);
				ctx.drawImage(_this.rawPictureUrl, 0, 0, _this.pictureWidth, _this.pictureHeight);
				ctx.globalAlpha = _this.values['opacity']/100;
				ctx.drawImage(_this.transferredPictureUrl, 0, 0, _this.pictureWidth, _this.pictureHeight);
				ctx.globalAlpha = 1;
				_this.previousOpacity = _this.values['opacity'];
				
				ctx.draw(false, ()=>{
					uni.canvasGetImageData({
					  canvasId: 'adjust-canvas',
					  x: 0,
					  y: 0,
					  width: _this.pictureWidth,
					  height: _this.pictureHeight,
					  success(res) {
					    // console.log(res.width) // 100
					    // console.log(res.height) // 100
					    // console.log(res.data instanceof Uint8ClampedArray) // true
					    // console.log(res.data.length) // 100 * 100 * 4
						_this.filter(res)
					  },
					  fail(err){
						  console.log(err);
						  uni.hideLoading();
					  }
					})
				});
				// ctx.draw(true, ()=>{
				// 	new WxCaman('adjust-canvas', _this.pictureWidth, _this.pictureHeight, function () {
				// 		this.brightness(_this.values['brightness']);
				// 		this.contrast(_this.values['contrast']);
				// 		this.saturation(_this.values['saturation']);
				// 		this.exposure(_this.values['exposure'])
				// 		this.render(function(){
				// 			_this.canvasToPicture();
				// 		});
				// 	});			
				// });
				// ctx.draw(true, ()=>{
				// 	new Caman('#adjust-canvas', function () {
				// 		this.brightness(_this.values['brightness']);
				// 		this.contrast(_this.values['contrast']);
				// 		this.saturation(_this.values['saturation']);
				// 		this.exposure(_this.values['exposure'])
				// 		this.render(function(){
				// 			_this.canvasToPicture();
				// 		});
				// 	});			
				// });
			},
			back(){
				uni.navigateBack();
			},
			reset(){
				this.values = {
					opacity: 100,
					contrast: 0,
					brightness: 0,
					saturation: 0,
					exposure: 0
				};
				this.adjustingPictureUrl = this.transferredPictureUrl;
			},
			finish(){
				this.saveAdjustment(this.adjustingPictureUrl);
				uni.navigateBack();
			},
			
			filter(imageData){
				let _this = this;
				const ImageFilters = require('../../utils/weImageFilters/weImageFilters.js')
				const Helper = require('../../utils/weImageFilters/weImageFiltersHelper.js')
				
				let filtered = ImageFilters.BrightnessContrastPhotoshop(imageData, _this.values.brightness, _this.values.contrast);
				filtered = ImageFilters.HSLAdjustment(filtered, 0, _this.values.saturation, _this.values.exposure);
				console.log("filtered");
				uni.canvasPutImageData({
				  canvasId: 'adjust-canvas',
				  x: 0,
				  y: 0,
				  width: _this.pictureWidth,
				  height: _this.pictureHeight,
				  data: filtered.data,
				  success(res) {
					  console.log('put');
					_this.canvasToPicture();
				  },
				  fail(err){
					  console.log(err);
					  uni.hideLoading();
				  }
				})
				
				// let helper = new Helper({
				//     canvasId: 'hehe',
				//     width: 320,
				//     height: 320
				// })
				
				// const filters = {
				//     Brightness: function (data) {
				//         // Brightness (srcImageData, brightness)
				//         // brightness - 100 <= n <= 100
				//         return ImageFilters.Brightness(data, 100)
				//     },
				//     BrightnessContrastGimp: function (data) {
				//         // BrightnessContrastGimp (srcImageData, brightness, contrast)
				//         // brightness - 100 <= n <= 100
				//         // contrast - 100 <= n <= 100
				//         return ImageFilters.BrightnessContrastGimp(data, 26, 13)
				//     },
				//     BrightnessContrastPhotoshop: function (data) {
				//         // ImageFilters.BrightnessContrastPhotoshop (srcImageData, brightness, contrast)
				//         // brightness - 100 <= n <= 100
				//         // contrast - 100 <= n <= 100
				//         return ImageFilters.BrightnessContrastPhotoshop(data, 26, 13)
				//     },
				   
				//     Sharpen: function (data) {
				//         // ImageFilters.Sharpen (srcImageData, factor)
				//         // factor: 1~10
				//         return ImageFilters.Sharpen(data, 9)
				//     },
				//     Solarize: function (data) {
				//         // ImageFilters.Solarize (srcImageData)
				//         return ImageFilters.Solarize(data)
				//     },
				// }
				
				
				
				// // const keys = Object.keys(filters)
				// let imageData = ctx.getImageData(0, 0, 300, 200);
				  
				// // pass it to a filter and get the modified copy
				// let filtered = ImageFilters.GrayScale(imageData);
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

