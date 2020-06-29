<template>
	<view class="login-container">
		<view class="login-logo"></view>
		<view class="login-name">想定</view>
		<button class="login-button" open-type="getUserInfo" @getphonenumber="getUserInfo" @getuserinfo="getUserInfo">{{provider}}登录</button>
		<navigator url="/pages/login/phone" class="login-link">手机号登录/注册</navigator>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	
	export default {
		data() {
			return {
				provider: getApp().globalData.provider === 'weixin' ? '微信':'QQ'
			}
		},
		methods: {
			...mapMutations(['login']),
			getUserInfo(res){
				console.log(res);
				this.login({nickName: res.detail.userInfo.nickName, avatarUrl: res.detail.userInfo.avatarUrl});
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/login.less');
</style>
