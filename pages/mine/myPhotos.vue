<template>
<view class="myphotos-container">
	<view class="myphotos__list">
		<image class="myphotos__item"
			v-for="(item, index) in myphotos" :key="index" 
			:src="item.img"
			mode="widthFix"
		></image>
	</view>
</view>
</template>
 
<script>
	import tabBar from "@/component/tabBar/tabBar.vue"
	
	export default {
		components: {tabBar},
		data() {
		return {
			myphotos: [
				{img: '/static/image/屏幕快照 2020-05-16 下午4.51.11@3x.png', name: '', url:''},
				{img: '/static/image/屏幕快照 2020-05-16 下午4.51.11@3x.png', name: '', url:''},
				{img: '/static/image/屏幕快照 2020-05-16 下午4.51.11@3x.png', name: '', url:''},
				{img: '/static/image/屏幕快照 2020-05-16 下午4.51.11@3x.png', name: '', url:''},
				{img: '/static/image/屏幕快照 2020-05-16 下午4.51.11@3x.png', name: '', url:''}
			]
					}
					},
			onReady() {
				uni.setNavigationBarTitle({
				    title: '我的图片（'+this.myphotos.length+'/15）'
				});
			},	
			methods: {
			
					}
				}
</script>

<style lang="less" scoped>
@import url('../../common/less/myPhotos.less');
</style>
