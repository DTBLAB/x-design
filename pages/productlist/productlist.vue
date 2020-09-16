<template>
<view class="productlist-container">
	<view class="productlist__list">
		<navigator v-for="(item, index) in productlistImages" :key="index" url="../product/product" class="productlist__item">
			<image :src="item.img" class="productlist__item__image"></image>
			<text class="productlist__item__name">{{item.name}}</text>
		</navigator>
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
				{img: '/static/image/product/组 1103@3x.png', name: 'T恤', category:''},
				{img: '/static/image/product/组 1104@3x.png', name: '手机壳', category:''},
				{img: '/static/image/product/组 1105@3x.png', name: '帆布袋', category:''},
				{img: '/static/image/product/组 1106@3x.png', name: '明信片', category:''},
				{img: '/static/image/product/组 1107@3x.png', name: '抱枕', category:''},
				{img: '/static/image/product/组 1108@3x.png', name: '笔记本', category:''},
				{img: '/static/image/product/组 1109@3x.png', name: '胸章', category:''},
				{img: '/static/image/product/组 1110@3x.png', name: '雨伞', category:''},
				{img: '/static/image/product/组 1111@3x.png', name: '马克杯', category:''},
			]
					}
					},
			methods: {
			
					}
				}
</script>

<style lang="less" scoped>
@import url('../../common/less/productList.less');
</style>
