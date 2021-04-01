<template>
<view class="myphotos-container">
	<view class="myphotos__list">
		<image class="myphotos__item"
			v-for="(item, index) in myProducts" :key="index" 
			:src="item.preview"
			mode="aspectFit"
			@click="checkDetail(item)"
		></image>
	</view>
</view>
</template>
 
<script>
	export default {
		data() {
			return {
				myProducts: []
			}
		},
		onShow() {
			let _this = this;
			this.$http.get('/product/getList').then(res => {
				if(res.data.code !== 0){
					uni.showToast({
					    title: res.data.message,
					    duration: 1000,
						icon: 'none'
					});
					return;
				}
				_this.myProducts = res.data.data;
				uni.setNavigationBarTitle({
					title: "我的产品(" + this.myProducts.length + "/20)"
				})
				
			}).catch(err => {
				uni.showToast({
				    title: "网络问题，产品加载失败",
				    duration: 1000,
					icon: 'none'
				});
			});
		},	
		methods: {
			checkDetail(item){
				uni.navigateTo({
					url: "/pages/product/product?id="+item.id+"&category="+item.category
				})
				
			}
			
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/myPictures.less');
</style>
