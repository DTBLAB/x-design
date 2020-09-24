<script>
import { mapMutations } from 'vuex'
	
export default {
	globalData: {  
		provider: '微信'  
	},  
	methods:{
		...mapMutations(['login']),
	},
	onLaunch: function() {
		let userInfo = uni.getStorageSync('userInfo');
		if(userInfo){
			this.login(userInfo);
		}
		let that = this;
		console.log('App Launch');
		uni.getProvider({
		    service: 'oauth',
		    success: function (res) {
				that.$scope.globalData.provider = res.provider[0];
		    }
		});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="less">
@common-color: #333333;
@background-color: #F4F4F4;

body{
	color: @common-color;
}
page{
	height: 100%;
}

// checkbox样式的修改
	uni-checkbox .uni-checkbox-input { 
		background-color: #F4F4F4; 
		border-radius: 50%; 
		border: 0rpx; 
		} 
		
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked { 
		background-color: #333333; 
		color: #fff !important; 
		border: 0rpx; } 
		
	uni-checkbox .uni-checkbox-wrapper { 
		width: 100%; 
		}
	
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
