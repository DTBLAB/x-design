<template>
	<view class="mine-container">
		<view class="mine-info">
			<image class="mine-info__photo" :src="photo"></image>
		</view>
		<tab-bar position="mine"></tab-bar>
	</view>
</template>

<script>
	import tabBar from "@/component/tabBar/tabBar.vue"
	
	export default {
		components: {tabBar},
		data() {
			return {
				photo: '/static/image/mine/photo.png',
				nickname: ''
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/mine.less');
</style>
