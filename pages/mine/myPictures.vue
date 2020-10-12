<template>
<view class="myphotos-container">
	<view class="myphotos__list">
		<image class="myphotos__item"
			v-for="(item, index) in myPictures" :key="index" 
			:src="item.url"
			mode="aspectFill"
			@click="checkDetail(index + 1, item.url, item.id)"
		></image>
	</view>
</view>
</template>
 
<script>
	export default {
		data() {
			return {
				myPictures: []
			}
		},
		mounted() {
			let _this = this;
			this.$http.get('/picture/getList').then(res => {
				if(res.data.code !== 0){
					uni.showToast({
					    title: res.data.message,
					    duration: 1000,
						icon: 'none'
					});
					return;
				}
				_this.myPictures = res.data.data;
				uni.setNavigationBarTitle({
					title: "我的图片(" + this.myPictures.length + "/20)"
				})
				
			}).catch(err => {
				uni.showToast({
				    title: "网络问题，图片加载失败",
				    duration: 1000,
					icon: 'none'
				});
			});
		},	
		methods: {
			checkDetail(index, url, pid){
				uni.getImageInfo({
				    src: url,
					success: function(image){
						uni.navigateTo({
							url: `/pages/mine/pictureDetail?pid=${pid}&url=${image.path}&index=${index}`
						})
					},
					fail: function(error){
						console.log(error);
					}
				});
				
			}
			
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/myPictures.less');
</style>
