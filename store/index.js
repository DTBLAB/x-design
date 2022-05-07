//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({//全局变量定义
    state: {
        forcedLogin: false,//是否需要强制登录
        hasLogin: false,
        nickname: "",
        token:'',
		avatarUrl:'/static/image/mine/default-photo.png',
		adjustedPictureUrl: null,
		signatureUrl: null
    },
    mutations: {
        login(state, user) {
			// console.log(user)
            state.nickname = user.nickname || '';
            state.avatarUrl = user.avatarUrl || '/static/image/mine/default-photo.png';
            state.hasLogin = true;
            state.token = user.token || '';
			uni.setStorage({
				key: 'userInfo',
				data: user
			})
        },
        logout(state) {
			state.nickName = "";
			state.hasLogin = false;
			state.token = '';
			state.avatarUrl = '/static/image/mine/photo.png';
			uni.removeStorage({
				key: 'userInfo'		
			})
        },
		saveAdjustment(state, url){
			state.adjustedPictureUrl = url;
		},
		saveSignature(state, url){
			state.signatureUrl = url;
		}
    }
})
export default store;