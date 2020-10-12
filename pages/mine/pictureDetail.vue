<template>
	<div class="page-container">
		<image :src="url" class="picture" mode="aspectFit"></image>
		<image src="../../static/image/delete.png" class="delete"></image>
		<view class="index">{{index}}/20</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				pid: 0,
				index: 0
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.url = option.url;
			this.pid = option.pid;
			this.index = option.index;
		},
		methods: {
			
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
