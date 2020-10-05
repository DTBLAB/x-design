<template>
<view class="productlist-container">
	<view class="productlist__list">
		<view v-for="(item, index) in productlistImages" :key="index" @click="chooseCategory(item.category)" class="productlist__item">
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
				pid: 0,
				productlistImages: [
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1103@3x.png', name: 'T恤', category: 0},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1104@3x.png', name: '手机壳', category: 1},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1105@3x.png', name: '帆布袋', category: 2},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1106@3x.png', name: '明信片', category: 3},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1107@3x.png', name: '抱枕', category: 4},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1108@3x.png', name: '笔记本', category: 5},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1109@3x.png', name: '胸章', category: 6},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1110@3x.png', name: '雨伞', category: 7},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1111@3x.png', name: '马克杯', category: 8},
				]
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.pid = option.pid;
		},
		methods: {
			chooseCategory(category){
				uni.navigateTo({
					url: '../product/productDesign?category=' + category + '&pid=' + this.pid
				})
				
			}
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/productList.less');
</style>
