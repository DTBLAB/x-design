<template>
	<view class="login-container">
		<image class="login-logo" src="../../static/image/logo.png"></image>
		<view class="login-name">想定</view>
		<button class="login-button" lang="zh_CN" @click="getUserProfile">{{provider}}登录</button>
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
					  console.log(res1);
				    if (res1.code) {
				      _this.code = res1.code;
				    } else {
						console.log('登录凭证获取失败！' + res1.errMsg);
				    }
				  }
				})
			},
			getUserProfile(e){
				let _this = this;
				if (!uni.getUserProfile) {
					// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
					uni.showModal({
						title: '提示',
						content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
					})
					return;
				}
				uni.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						_this.getUserInfo(res);
					},
					fail: (res) => {
						uni.showToast({
						    title: '登录失败',
						    duration: 2000,
							icon: "none"
						});
					},
				})
			},
			getUserInfo(res){
				let _this = this;
				//发起网络请求,
				_this.$http.post('/user/login', {userInfo:res, code:this.code, origin: this.provider}).then(result => {
					if(result.data.code === 0){
						let data = result.data.data;
						this.login({nickname: data.nickname, avatarUrl: data.avatarUrl, token: data.token});
						uni.showToast({
						    title: '登录成功',
						    duration: 2000
						});
						uni.redirectTo({url: '/pages/mine/mine'});
					}else{
						uni.showToast({
						    title: result.data.message,
						    duration: 2000,
							icon: 'none'
						});
					}
				}).catch(err => {
					console.log('err', err);
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
