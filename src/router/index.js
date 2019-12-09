import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

//==========登录和主页相关模块==============
import UserLogin from '@/views/userLoginAndRegistration/UserLogin' //前端用户登录
import Register1 from '@/views/userLoginAndRegistration/Register1' //用户注册
import Register2 from '@/views/userLoginAndRegistration/Register2' //用户注册成功
import FindPassword from '@/views/userLoginAndRegistration/FindPassword' //忘记密码
import ResetPassword from '@/views/userLoginAndRegistration/ResetPassword' //重设密码

import Login from '@/views/loginAndRegistration/Login' //后端登录
import AppMain from '@/views/backstage/mainPageModule/AppMain' //后台主页


//==========前端部分==============
//前端首页
import HomePage from '@/views/frontEnd/homePageModule/HomePage'


Vue.use(Router)

export default new Router({
	routes: [
	  {//前端用户登录
			path: '/',
			name: 'UserLogin',
			component: UserLogin
		},
    {//前端用户注册
      path: '/Register1',
      name: 'Register1',
      component: Register1
    },
    {//前端用户注册成功
      path: '/Register2',
      name: 'Register2',
      component: Register2
    },
    {//前端用户登录（忘记密码）
      path: '/FindPassword',
      name: 'FindPassword',
      component: FindPassword
    },
    {//前端用户重设密码
      path: '/ResetPassword',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {//后端员工登录
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {//前端主页
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage
    },
		{//后台主页
			path: '/AppMain',
			name: 'AppMain',
			component: AppMain
		}


	]
})
