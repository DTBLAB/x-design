<template>
<view class="productlist-container">
	<view class="productlist__list">
		<view v-for="(item, index) in productlistImages" :key="index" class="productlist__item">
			<image :src="item.img" class="productlist__item__image"></image>
			<text class="productlist__item__name">{{item.name}}</text>
		</view>
	</view>
</view>
</template>
 
<script>
	import tabBar from "@/component/tabBar/tabBar.vue"
	
	export default {
		components: {tabBar},
		data() {
		return {
			productlistImages: [
				{img: '/static/image/product/T恤.jpg', name: 'T恤', url:''},
				{img: '/static/image/product/手机壳.jpg', name: '手机壳', url:''},
				{img: '/static/image/product/帆布袋.jpg', name: '帆布袋', url:''},
				{img: '/static/image/product/明信片.jpg', name: '明信片', url:''},
				{img: '/static/image/product/抱枕.jpg', name: '抱枕', url:''},
				{img: '/static/image/product/笔记本.jpg', name: '笔记本', url:''},
				{img: '/static/image/product/数字油画.jpg', name: '数字油画', url:''},
				{img: '/static/image/product/纹身贴.jpg', name: '纹身贴', url:''},
			]
					}
					},
			methods: {
			
					}
				}
</script>

<style lang="less" scoped>
@import url('../../common/less/productlist.less');
</style>
