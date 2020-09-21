<template>
	<view class="page-container">
		
		<view class="picture-selector">
			<scroll-view class="scroll-view_H picture-selector__items-container" scroll-x="true" enable-flex="true">
			<view class="picture-selector__items">
				
<!-- 				<view class="picture-selector__item">
					<image class="picture-selector__image" src="../../static/image/product/组 1158@3x.png" mode=""></image>
					<view class="picture-selector__text">设计图片</view>
				</view> -->
				
				<view 
				class="picture-selector__item"
				v-for="(picture, index) in pictures"
				:key="index"
				>
				<image :src="picture.img"
					  class="picture-selector__item__image"
					  mode="aspectFill"  
					></image>
					<view class="picture-selector__item-cover" v-if="selectedPicture === picture">
						<image class="picture-selector__item-cover__icon" src="../../static/image/selected.png">
					</view>
					
				</view>
				
				<view class="picture-selector__item" v-for="(item, index) in myphotos" :key="index">
					<image class="picture-selector__image" 
						:src="item.img" mode="widthFix"></image>
				</view>
				
				
			</view>
			</scroll-view>
			<view class="picture-selector__tabs">
				<view
				  class="picture-selector__tab"
				  :class="{ 'picture-selector__tab--selected': selectedKind === kind }"
				  v-for="(kind, index) in pictureKinds"
				  :key="index"
				  @click="selectKind(kind)"
				>{{kind}}</view>
				<navigator class="picture-selector__tab" url="./sign">签名</navigator>
			</view>
		</view>
		
		<view class="product-container">
			<image class="product-picture" src="https://x-design.oss-cn-hangzhou.aliyuncs.com/product/Tote Bag@3x.png" mode="aspectFit"></image>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pictureKinds:[
					'图片库',
					'样式'
				],
				pictures:[
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1158@3x.png', name: '', url:''},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/mockPicture@3x.png', name: '', url:''},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/mockPicture@3x.png', name: '', url:''},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/mockPicture@3x.png', name: '', url:''},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/mockPicture@3x.png', name: '', url:''},
					{img: 'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/mockPicture@3x.png', name: '', url:''}
				],
				patterns:[
					{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1158@3x.png',name:'',url:''},
					{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1206@3x.png',name:'',url:''},
					{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1207@3x.png',name:'',url:''},
					{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1208@3x.png',name:'',url:''},
					{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1209@3x.png',name:'',url:''},
					{img:'https://x-design.oss-cn-hangzhou.aliyuncs.com/product/组 1210@3x.png',name:'',url:''},
				],
				selectedKind: '图片库',
				pictureUrl: null,
				category: 0,
				pid: 0
			}
		},
		computed: {
			selectedStyles(){
				return this.pictures[this.selectedKind]
			}
		},
		methods: {
			selectKind(kind){
				this.selectedKind = kind;
				//this.selectedStyles
			},
			getPictureSrc(name){
				
			},
			selectPicture(Picture){
				
			},
			onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				this.pid = option.pid;
				this.category = option.category;
				console.log(option);
			},
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/productDesign.less');
</style>
