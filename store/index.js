//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({//全局变量定义
    state: {
        forcedLogin: false,//是否需要强制登录
        hasLogin: false,
        nickName: "",
        userId:'',
        token:'',
		avatarUrl:'/static/image/mine/photo.png'
    },
    mutations: {
        login(state, user) {
            state.nickName = user.nickName || '';
            state.avatarUrl = user.avatarUrl || '/static/image/mine/photo.png';
            state.hasLogin = true;
            state.userId = user.id || '';
            state.token = user.token || '';
			uni.setStorage({
				key: 'userInfo',
				data: user
			})
        },
        logout(state) {
			state.nickName = "";
			state.hasLogin = false;
			state.userId = '';
			state.token = '';
			state.avatarUrl = '/static/image/mine/photo.png';
			uni.removeStorage({
				key: 'userInfo'		
			})
        }
    }
})
export default store