import Vue from 'vue'
import App from './App'
import dbcloud from "@/common/common.js"
//引入uview
import uView from "uview-ui";
Vue.use(uView);
// import {updateById} from "@/common/common.js"
// 此处为演示vuex使用，非uView的功能部分
import store from '@/store'

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)

Vue.prototype.$dbcloud = new dbcloud()
// Vue.prototype.$getList = getList
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)
app.$mount()
