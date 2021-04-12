<template>
<view class="productlist-container">
	<view class="productlist__list">
		<view v-for="(item, index) in productlistImages" :key="index" class="productlist__item">
			<image :src="item.img" class="productlist__item__image" @click="chooseCategory(item.category)"></image>
			<text class="productlist__item__name">{{item.name}}</text>
			<picker @click="selectCategory(item.category)" @change="selectColor" :value="colorIndex" :range="categoryList[item.category].colorList" 
			  range-key="name" v-if="categoryList[item.category].colorList && categoryList[item.category].colorList.length > 1">
				<view class="cover"></view>
			</picker>
		</view>
	</view>
</view>
</template>
 
 
<script>
	import tabBar from "@/component/tabBar/tabBar.vue"
	import category from '../../config/whiteMoldData'
	
	export default {
		components: {tabBar},
		data() {
			return {
				pid: 0,
				productlistImages: [
				    {img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1103@3x.png', name: 'T恤', category: 'tshirt'},
				    {img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1104@3x.png', name: '手机壳', category: 'case'},
				    {img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1105@3x.png', name: '帆布袋', category: 'canvasBag'},
				    {img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1107@3x.png', name: '抱枕', category: 'pillow'},
				    {img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1106@3x.png', name: '通关文牒', category: 'postcard'},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1108@3x.png', name: '笔记本', category: 'notebook'},
				    {img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1109@3x.png', name: '胸章', category: 'badge'},
				    {img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1110@3x.png', name: '丝巾', category: 'silkScarf'},
				    {img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1111@3x.png', name: '马克杯', category: 'mug'},
				    {img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/key chain.png', name: '钥匙扣', category: 'keychain'},
				    {img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/mouse mat.png', name: '鼠标垫', category: 'mousePad'},
				    {img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/hoodie.png', name: '卫衣', category: 'sweater'}
				],
				categoryList: category,
				colorIndex: 0,
				selectedCategory: ''
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
			},
			selectColor(e){
				this.colorIndex = e.target.value;
				// let color = this.categoryList[this.selectedCategory].colorList[this.colorIndex];
				// console.log(color);
				uni.navigateTo({
					url: '../product/productDesign?category=' + this.selectedCategory + '&pid=' + this.pid + 
						"&colorIndex=" + this.colorIndex
				})
			},
			selectCategory(category){
				this.selectedCategory = category;
			}
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/productList.less');
</style>
