<template>
<view class="myphotos-container">
	<view class="myphotos__list">
		<image class="myphotos__item"
			v-for="(item, index) in myProducts" :key="index" 
			:src="item.preview"
			mode="aspectFit"
			@click="checkDetail(item)"
			@longpress="deleteProduct(item)"
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
			this.loadProducts();
		},	
		methods: {
			loadProducts(){
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
			checkDetail(item){
				uni.navigateTo({
					url: "/pages/product/product?id="+item.id+"&category="+item.category
				})
				
			},
			deleteProduct(item){
				let _this = this;
				uni.showModal({
				    title: '提示',
				    content: '是否确定删除此产品',
				    success: function (res) {
				        if (res.confirm) {
				            _this.confirmDelete(item);
				        }
				    }
				});
			},
			confirmDelete(item){
				let _this = this;
				uni.showLoading({
					mask: true,
					title: "正在删除"
				})
				this.$http.post('/product/delete', {pid: item.id}, {timeout: 15000}).then(res => {
					if(res.data.code !== 0){
						uni.hideLoading();
						uni.showToast({
							duration: 1000,
							title: res.data.message,
							icon: 'none'
						})
						return;
					}
					uni.hideLoading();
					uni.showToast({
						duration: 1000,
						title: '删除成功'
					})
					_this.loadProducts();
				}).catch(err => {
					uni.hideLoading();
					throw new Error("删除失败!");
				})
			}
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/myProducts.less');
</style>
