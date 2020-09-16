<template>
	<view>
		<view class="top-choice">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#fff"></uni-segmented-control>
		</view>
		<view class="content">
		    <view v-if="current === 0">
				<view class="evalu-info" >
					<evalu-list v-for="(item,index) in allList" :key="index" :item="item"></evalu-list>
				</view>
			</view>
			<view v-if="current === 1">
				<view class="evalu-info" >
					<evalu-list v-for="(item,index) in allList" :key="index" :item="item"></evalu-list>
				</view>
			</view>
			<view v-if="current === 2">
				<view class="evalu-info" >
					<evalu-list v-for="(item,index) in allList" :key="index" :item="item"></evalu-list>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/component/uni-segmented-control/checkEvalu-segmented-control.vue"
	import evaluList  from "@/component/evaluList/evaluList.vue"
	export default {
		components: {evaluList,uniSegmentedControl},
		mounted: function () {
		  this.$nextTick(function () {
			let num = 5
			this.items.pop()
			this.items.push('有图(' + num + ')')
		  })
		},
		data() {
			return {
				allList:[
					{'name':'XYZ123','text':'帆布包质量很好，定制的图片也很好看，效果很惊喜！会继续定制的！','userPic': '../../static/image/user-avater.png','picList':['../../static/image/showRate.jpg','../../static/image/showRate.jpg','../../static/image/showRate.jpg']},
					{'name':'XYZ123','text':'帆布包质量很好，定制的图片也很好看，效果很惊喜！会继续定制的！','userPic': '../../static/image/user-avater.png','picList':[]},
					{'name':'XYZ123','text':'帆布包质量很好，定制的图片也很好看，效果很惊喜！会继续定制的！','userPic': '../../static/image/user-avater.png','picList':['../../static/image/showRate.jpg','../../static/image/showRate.jpg','../../static/image/showRate.jpg','../../static/image/showRate.jpg','../../static/image/showRate.jpg','../../static/image/showRate.jpg']},
					{'name':'XYZ123','text':'帆布包质量很好，定制的图片也很好看，效果很惊喜！会继续定制的！','userPic': '../../static/image/user-avater.png','picList':['../../static/image/showRate.jpg','../../static/image/showRate.jpg','../../static/image/showRate.jpg','../../static/image/showRate.jpg']}
				],
				items: ['全部','最新','有图'],
				current: 0
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	// @import url('../../../common/less/checkEvalu.less');
</style>
