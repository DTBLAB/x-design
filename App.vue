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
	
	
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */

checkbox .uni-checkbox-input.uni-checkbox-input-checked {
 border: 1px solid #333333;
 background: #FC9A04;
 color: #FC9A04 !important;
}

checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
 font-size: 18px;
}
checkbox .wx-checkbox-input {
 border-radius: 50%;
}

checkbox .wx-checkbox-input.uni-checkbox-input-checked {
 border: 1px solid #333333;
 background: #FC9A04;
 color: #FC9A04 !important;
}

checkbox .wx-checkbox-input.uni-checkbox-input-checked:before {
 font-size: 18px;
}
</style>
