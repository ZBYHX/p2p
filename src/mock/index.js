import Mock from 'mockjs' //引入mockjs，npm已安装
import action from '@/api/action' //引入请求地址

//全局设置：设置所有ajax请求的超时时间，模拟网络传输耗时
Mock.setup({
	// timeout: 400  //延时400s请求到数据
	timeout: 200 - 400 //延时200-400s请求到数据
})

//引登陆的测试数据，并添加至mockjs
import loginInfo from '@/mock/json/login-mock.js'

let s1 = action.getFullPath('SYSTEM_USER_DOLOGIN')
// Mock.mock(s1, "post", loginInfo)
// Mock.mock(s1, /post|get/i, loginInfo)

Mock.mock(s1, /post|get/i, (options) => {
	// 最佳实践，
	console.debug(s1, options);
	return Mock.mock(loginInfo);
});



