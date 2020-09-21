<template>
	<view class="page-container">
		<view class="sign-container">
			<image class="sign-container__background" src="https://x-design.oss-cn-hangzhou.aliyuncs.com/product/重复网格 1@3x.png" mode="widthFix"></image>
		</view>
		<view class="sign-selector">
			
			<view class="sign-selector__color" 
			v-for="(item, index) in color"
			:key="index"
			style="background-color:'item.data';">
				
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				color:[
				'#000000','#666666','#FFFFFF',
				'#A60000','#FF3737','#FF9C9C',
				'#FF6F00','#FC9804','#FFDE00',
					
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/sign.less');
</style>
