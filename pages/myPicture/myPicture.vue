<template>
	<view class="picture-container">
		<view class="pictures">
			<image class="pictures__items" v-for="(item, index) in myImages" :key="index" :src="item.img"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myImages:[
					{src: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/mine/图库1.png', url:''},
					{src: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/mine/图库2.png', url:''},
					{src: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/mine/图库3.png', url:''},
					{src: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/mine/图库4.png', url:''},
					{src: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/mine/图库5.png', url:''}	
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/myPicture.less');
</style>
