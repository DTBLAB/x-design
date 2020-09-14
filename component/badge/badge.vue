<template>
	<view class="badge">{{num}}</view>
</template>

<script>
	export default {
		props:{
			num: Number
		},
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/component/badge.less');
</style>
