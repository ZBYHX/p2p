/**
 * 对后台请求的地址的封装，URL格式如下：
 * 模块名_实体名_操作
 */
export default {
	//服务器
	'SERVER': 'http://localhost:8080/hp2p',

  //后台员工登录注册部分
  'SYS_USER_LOGIN': '/userManagement/sysUserLogin', //员工用户登陆


  //权限管理部分
	// 'SYS_USER_DOLOGIN': '/right/userAction_selectOneUser.action', //用户登陆



	

	//获得请求的完整地址，用于mockjs测试时使用
	'getFullPath': k => {
		return this.SERVER + this[k];
	}
}
