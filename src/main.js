import Vue from 'vue'

import ElementUI from 'element-ui' //新添加1
import 'element-ui/lib/theme-chalk/index.css' //新添加2，避免后期打包样式不同，要放在import App from './App';之前

import App from './App'
import router from './router'
import store from './store'

//开发环境下才会引入mockjs
// process.env.MOCK && require('@/mock')

import axios from '@/api/http'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(ElementUI) //新添加3
Vue.config.productionTip = false

/* eslint-disable no-new */
// window.vm =new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount("#app")

window.vm = new Vue({
	// el: '#app',
	router, //导入路由
	store, //在main.js中导入store实例
	// components: {
	// 	App
	// },
	// template: '<App/>',
	render: h => h(App),
	data: function() {
		return {
			//自定义事件总线对象，用于非父子组件的通信
			Bus: new Vue()
		}
	}
}).$mount("#app")



//导入代码阻止菜单点击报错
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error)
}
