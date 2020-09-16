<template>
	<view class="evalu-list">
		<view class="evalu-detail">
			<view class="user-info_avater" :style="{backgroundImage: 'url(' + item.userPic + ')'}"></view>
			<view class="name">{{item.name}}</view>
			<view class="rate"><uni-rate allow-half :value="3.5"/></view>
		</view>
		<view class="evalu-body">{{item.text}}</view>
		<view class="evalu-pic">
			<view v-for="(value,index) in item.picList" :key="index" class="pic" :style="{backgroundImage: 'url(' + value + ')'}"></view>
		</view>
	</view>
</view>
	
</template>

<script>
	// import uniRate from "@/components/uni-rate/uni-rate.vue"
	export default {
		// components: {uniRate},
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			},
		},
		data() {
			return {
				
			}
		},
	}
</script>

<style lang="less" scoped>
	@import url('../../common/less/evaluList.less');
</style>
