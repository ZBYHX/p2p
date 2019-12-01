/**
 * vue项目对axios的全局配置
 */
import axios from 'axios'
import qs from 'qs'

//引入action模块，并添加至axios的类属性urls上
import action from '@/api/action'
axios.urls = action

// axios默认配置
axios.defaults.timeout = 10000; // 超时时间
// axios.defaults.baseURL = 'http://localhost:8080/j2ee15'; // 默认地址
axios.defaults.baseURL = action.SERVER;

//整理数据
// 只适用于 POST,PUT,PATCH，transformRequest` 允许在向服务器发送前，修改请求数据
axios.defaults.transformRequest = function(data) {
	data = qs.stringify(data);
	return data;
};


// 请求拦截器
axios.interceptors.request.use(function(config) {

	// let array = window.vm.$store.getters.myurls;
	// let f = false;
	// if (array != null) {
	// 	for (let i = 0; i < array.length; i++) {
	// 		if (array[i].toString() == config.url) {
	// 			f = true;
	// 			break;
	// 		}
	// 	}
	// 	if (f == true) {
	// 		let jwt = window.vm.$store.getters.jwt;
	// 		if (jwt) {
	// 			config.headers['jwt'] = jwt;
	// 		}
	// 		return config;
	// 	} else {
	// 		window.vm.$message({
	// 			message: '很遗憾，你的权限不足！',
	// 			type: 'warning'
	// 		});
	// 		return Promise.reject(error);
	// 	}
	// }
 //    return config;
	

	let jwt = window.vm.$store.getters.jwt;
	if (jwt) {
		config.headers['jwt'] = jwt;
	}
	
	return config;

}, function(error) {
	return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function(response) {
	let jwt0 = response.headers["jwt"];
	// console.log(jwt0);
	if (jwt0) {
		window.vm.$store.commit("setJwt", {
			jwt: jwt0
		});
	}
	return response;
}, function(error) {
	return Promise.reject(error);
});

// // 路由请求拦截
// // http request 拦截器
// axios.interceptors.request.use(
// 	config => {
// 		//config.data = JSON.stringify(config.data);
// 		//config.headers['Content-Type'] = 'application/json;charset=UTF-8';
// 		//config.headers['Token'] = 'abcxyz';
// 		//判断是否存在ticket，如果存在的话，则每个http header都加上ticket
// 		// if (cookie.get("token")) {
// 		// 	//用户每次操作，都将cookie设置成2小时
// 		// 	cookie.set("token", cookie.get("token"), 1 / 12)
// 		// 	cookie.set("name", cookie.get("name"), 1 / 12)
// 		// 	config.headers.token = cookie.get("token");
// 		// 	config.headers.name = cookie.get("name");
// 		// }
// 		return config;
// 	},
// 	error => {
// 		return Promise.reject(error.response);
// 	});

// // 路由响应拦截
// // http response 拦截器
// axios.interceptors.response.use(
// 	response => {
// 		if (response.data.resultCode == "404") {
// 			console.log("response.data.resultCode是404")
// 			// 返回 错误代码-1 清除ticket信息并跳转到登录页面
// 			//      cookie.del("ticket")
// 			//      window.location.href='http://login.com'
// 			return
// 		} else {
// 			return response;
// 		}
// 	},
// 	error => {
// 		return Promise.reject(error.response) // 返回接口返回的错误信息
// 	});


export default axios;
