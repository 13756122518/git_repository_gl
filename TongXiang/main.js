import Vue from 'vue'
import App from './App'
import {add} from "@/common/common.js"
import {getList} from "@/common/common.js"

Vue.prototype.$add = add
Vue.prototype.$getList = getList
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
