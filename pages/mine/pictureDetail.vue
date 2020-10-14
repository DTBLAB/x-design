<template>
	<div class="page-container">
		<image :src="url" class="picture" mode="aspectFit"></image>
		<image src="../../static/image/delete.png" class="delete" @click="confirmDelete"></image>
		<view class="index">{{index}}/20</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				pid: 0,
				index: 0,
				isDeleting: false
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.url = option.url;
			this.pid = option.pid;
			this.index = option.index;
		},
		methods: {
			confirmDelete(){
				let _this = this;
				if(this.isDeleting){
					return;
				}
				uni.showModal({
				    title: '是否确认删除',
				    content: '被删除图片不可恢复',
				    success: function (res) {
				        if (res.confirm) {
				            _this.delete();
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			delete(){
				let _this = this;
				this.isDeleteing = true;
				this.$http.post('/picture/delete', {pid: this.pid}).then(res => {
					if(res.data.code !== 0){
						uni.showToast({
							duration: 1000,
							title: res.data.message
						})
						_this.isDeleteing = false;
						return;
					}
					uni.showToast({
						duration: 1000,
						title: '删除成功'
					})
					uni.navigateBack();
				}).catch(err => {
					throw new Error("获取签名失败!");
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
@import url('../../common/less/pictureDetail.less');
</style>
