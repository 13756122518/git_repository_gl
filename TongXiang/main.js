import Vue from 'vue'
import App from './App'
import dbcloud from "@/common/common.js"
// import {updateById} from "@/common/common.js"

Vue.prototype.$dbcloud = new dbcloud()
// Vue.prototype.$getList = getList
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
