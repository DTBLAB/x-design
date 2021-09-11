<template>
	<view class="">
		<view class="reviews">
			<view class="picname">
				<view class="pic">
					<image :src="orderInfo.preview" mode="aspectFill"></image>
				</view>
				<view class="name">
					{{categoryList[orderInfo.category].name}}
				</view>
			</view>
			<view class="rate">
				<view class="ratename">
					产品评价
				</view>
				<view class="ratestars">
					<image class="nostar" :src="noStarUrl" @tap="addStar(1)" v-if="activeNum<1" />
					<image class="star" :src="starUrl" v-if="activeNum>0 && activeNum<=5" @tap="addStar(1)" />
					<image class="nostar" :src="noStarUrl" @tap="addStar(2)" v-if="activeNum<2" />
					<image class="star" :src="starUrl" v-if="activeNum>1 && activeNum<=5" @tap="addStar(2)" />
					<image class="nostar" :src="noStarUrl" @tap="addStar(3)" v-if="activeNum<3" />
					<image class="star" :src="starUrl" v-if="activeNum>2 && activeNum<=5" @tap="addStar(3)" />
					<image class="nostar" :src="noStarUrl" @tap="addStar(4)" v-if="activeNum<4" />
					<image class="star" :src="starUrl" v-if="activeNum>3 && activeNum<=5" @tap="addStar(4)" />
					<image class="nostar" :src="noStarUrl" @tap="addStar(5)" v-if="activeNum<5" />
					<image class="star" :src="starUrl" v-if="activeNum===5" />
				</view>
			</view>
			<view class="feedback">
				<textarea value="" placeholder="您的评价对其他用户很重要哦~" style="font-size: 28rpx;" v-model="content" />
				</view>
			<view class="pics">
				<image class="pic" src="../../static/image/addPic.png" size="10rpx" @click="choosePictures"></image>
				<image class="pic" mode="aspectFill" v-for="pic of pics" :key="pic" :src="pic" size="10rpx"></image>
			</view>
		</view>
		<view class="save">
				<view type="button" @click="submit" class="save__text">提交评价</view>
		</view>
		
		<!-- <canvas class="compress-canvas" canvas-id="compress-canvas" id="compressCanvas"></canvas> -->
		
	</view>

</template>

<script>
	import category from '../../config/whiteMoldData'
	
export default {
	data () {
	  return {
		categoryList: category,
		activeNum: 5,
		noStarUrl: '../../static/image/starGray.png',
		starUrl: '../../static/image/starYellow.png',
		tempPics: [],
		pics: [],
		orderInfo: {},
		uploadResults: [],
		uploadedPics: [],
		content: ""
	  }
	},
	onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		let _this = this;
		this.oiid = parseInt(option.oiid);
		this.$http.get('/order/getItem', {oiid: this.oiid}).then(res => {
			if(res.data.code !== 0){
				uni.showToast({
				    title: res.data.message,
				    duration: 1000,
					icon: 'none'
				});
				return;
			}
			_this.orderInfo = res.data.data;
		}).catch(err => {
			console.log(err);
			uni.showToast({
			    title: "网络问题，订单加载失败",
			    duration: 1000,
				icon: 'none'
			});
		});
	},
	methods: {
		addStar (num) {
		  let that = this
		  that.activeNum = num
		},
		choosePictures(){
			let _this = this;
			
			uni.chooseImage({
			    count: 3, //默认9
			    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
			    success: function (res) {
					uni.showLoading({
						title: "图片加载中",
						mask: true
					})
			        _this.tempPics = JSON.parse(JSON.stringify(res.tempFilePaths));
					console.log(res.tempFilePaths);
					// res.tempFilePaths = [];
					_this.pics = [];
					_this.uploadResults = [];
					_this.uploadedPics = [];
					_this.resizePicture(0);
			    },
				fail: function(err) {
					console.log(err);
				}
			});
		},
		resizePicture(index){
			let _this = this;
			let path = _this.tempPics[index];
			uni.getImageInfo({
				src: path,
				success: function (image) {
					// if(image.type !== 'jpeg' && image.type !=="jpg"){
					// 	uni.showToast({
					// 	    title: '只可以上传jpg或jpeg格式图片',
					// 	    duration: 2000
					// 	});
					// 	return;
					// }
					let height = image.height;
					let width = image.width;
					if(Math.max(height, width) <= 720){
						_this.pics.push(path);
						if(index < _this.tempPics.length - 1){
							_this.resizePicture(index + 1);
						}else{
							uni.hideLoading();
						}
						return;
					}
					
					let newHeight = 0;
					let newWidth = 0;
					if(height >= width){
						newHeight = 720;
						newWidth = 720/height*width;
					}else{
						newWidth = 720;
						newHeight = 720/width*height;
					}
					
					// console.log(width, height, newWidth, newHeight);
					
					uni.compressImage({
						src: path,
						height: newHeight,
						width: newWidth,
						success: function(res) {
							// console.log(res);
							_this.pics.push(res.tempFilePath);
							if(index < _this.tempPics.length - 1){
								_this.resizePicture(index + 1);
							}else{
								uni.hideLoading();
							}
						},
						fail: function(err){
							console.log(err);
							uni.hideLoading();
							uni.showToast({
								duration: 1000,
								icon: "none",
								title: "加载失败"
							});
						}
					})
					
					// const ctx = uni.createCanvasContext('compress-canvas');
					// ctx.drawImage(path, 0, 0, width, height, 0, 0, newWidth, newHeight);
					// ctx.draw(false, ()=>{
					// 	uni.canvasToTempFilePath({
					// 	  x: 0,
					// 	  y: 0,
					// 	  width: newWidth,
					// 	  height: newHeight,
					// 	  destWidth: newWidth,
					// 	  destHeight: newHeight,
					// 	  canvasId: 'compress-canvas',
					// 	  fileType: 'jpg',
					// 	  success: function(res) {
					// 		  console.log(res);
					// 	    _this.pics.push(res.tempFilePath);
					// 		if(index < _this.tempPics.length - 1){
					// 			_this.resizePicture(index + 1);
					// 		}else{
					// 			uni.hideLoading();
					// 		}
					// 	  },
					// 	  fail: function(err){
					// 		console.log(err);
					// 		uni.hideLoading();
					// 		uni.showToast({
					// 			duration: 1000,
					// 			icon: "none",
					// 			title: "加载失败"
					// 		});
					// 	  }
					// 	})
					// });	
				},
				fail: function(err){
					console.log(err);
					uni.hideLoading();
					uni.showToast({
						duration: 1000,
						icon: "none",
						title: "加载失败"
					});
				}
			});
		},
		submit(){
			uni.showLoading({
				mask: true,
				title: "评论上传中"
			});
			if(this.activeNum === 0){
				uni.hideLoading();
				uni.showToast({
					duration: 1000,
					title: "请先给出评分"
				});
				return;
			}
			
			if(this.pics.length === 0 || this.pics.length === this.uploadedPics.length){
				this.createReview();
			}else{
				let _this = this;
				for(let i = 0; i < this.pics.length ; i++){
					this.uploadReviewPicture(this.pics[i], i, this.pics.length);
				}
			}
		},
		async uploadReviewPicture(pic, index, length){
			let _this = this;
			const {params, path} = await this.getParams().catch(err => {
				console.log(err);
				return;
			});
			uni.uploadFile({
			  url: 'https://x-design-review.oss-cn-shanghai.aliyuncs.com/', // 开发者服务器的URL。
			  filePath: pic,
			  name: 'file', // 必须填file。
			  formData: params,
			  success: (res) => {
				// console.log(res);
			    if (res.statusCode === 204) {
					_this.uploadResults.push(true);
					_this.uploadedPics.push('https://x-design-review.oss-cn-shanghai.aliyuncs.com/'+params.key);
					_this.judgeIfSuccess();
			    }else{
					console.log(res.statusCode);
					_this.uploadResults.push(false);
					_this.judgeIfSuccess();
				}
			  },
			  fail: err => {
			    console.log(err);
				_this.uploadResults.push(false);
				_this.judgeIfSuccess();
			  }
			});
		},
		judgeIfSuccess(){
			let res = true;
			if(this.uploadResults.length < this.pics.length){
				return;
			}
			for(let ur of this.uploadResults){
				res = res && ur;
			}
			// console.log(this.uploadResults, this.pics, "true");
			if(res){
				this.createReview();
			}else{
				uni.showToast({
				    title: "上传失败",
				    duration: 1000,
					icon: 'none'
				});
				uni.hideLoading();
			}
		},
		async getParams(){
			return await this.$http.get('/review/getPostObjectParams', {}).then(res => {
				if(res.data.code !== 0){
					throw new Error("获取签名失败!");
				}
				// console.log(res.data.data);
				return res.data.data;
			}).catch(err => {
				throw new Error("获取签名失败!");
			})
		},
		createReview(){
			let _this = this;
			this.$http.post('/review/add', {grade: _this.activeNum, content: _this.content, pics: _this.uploadedPics, oid: _this.orderInfo.id, category: _this.orderInfo.category, model: _this.orderInfo.model}).then(res => {
				if(res.data.code !== 0){
					uni.hideLoading();
					uni.showToast({
					    title: res.data.message,
					    duration: 2000,
						icon: 'none'
					});
					return;
				}
				console.log(res.data.data);
				uni.showToast({
				    title: "上传成功",
				    duration: 2000,
					icon: 'success'
				});
				uni.navigateTo({
					url: '/pages/order/myOrders'
				})
			}).catch(err => {
				throw new Error("获取签名失败!");
				uni.hideLoading();
				uni.showToast({
				    title: "上传失败",
				    duration: 2000,
					icon: 'success'
				});
			})
			_this.uploadResults = [];
			_this.uploadedPics = [];
		}
	}
}
</script>

<style>
page {
	background-color: #F4F4F4;
}
</style>

<style lang="less" scoped>
@import url('../../common/less/publishReview.less');
</style>
