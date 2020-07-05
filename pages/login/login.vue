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
				code: '',
				provider: getApp().globalData.provider === 'weixin' ? '微信':'QQ'
			}
		},
		onLoad(){
			this.refreshCode();
		},
		methods: {
			...mapMutations(['login']),
			refreshCode(){
				let _this = this;
				uni.login({
				  success (res1) {
				    if (res1.code) {
				      _this.code = res1.code;
				    } else {
						console.log('登录凭证获取失败！' + res1.errMsg);
				    }
				  }
				})
			},
			getUserInfo(res){
				console.log(res);
				let _this = this;
				//发起网络请求,
				_this.$http.post('/user/login', {userInfo:res.detail, code:this.code}).then(result => {
					console.log(result);
					if(result.data.code === 0){
						this.login({nickName: result.nickName, avatarUrl: result.avatarUrl, id: result.id, token: result.token});
						uni.showToast({
							    title: '登录成功',
							    duration: 2000
							});
						uni.navigateBack();
					}else{
						uni.showToast({
						    title: result.data.message,
						    duration: 2000,
							icon: 'none'
						});
					}
				}).catch(err => {
					uni.showToast({
					    title: '网络错误，请重试',
					    duration: 2000,
						icon: 'none'
					});
				});
				this.refreshCode();
			}
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/login.less');
</style>
