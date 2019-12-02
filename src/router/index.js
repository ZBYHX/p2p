import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

//登录和主页相关模块
import Login from '@/views/loginAndRegistration/Login'
import AppMain from '@/views/backstage/mainPageModule/AppMain'



Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'Login',
			component: Login
		},
		{
			path: '/AppMain',
			name: 'AppMain',
			component: AppMain
		}
	]
})