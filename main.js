import Vue from 'vue'
import App from './App'
import http from './utils/http.js'
import store from './store' 
import share from './utils/share.js'

Vue.mixin(share)
Vue.config.productionTip = false

Vue.prototype.$http = http;
Vue.prototype.$store = store;

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
