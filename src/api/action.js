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
	'sys_right_rootSelect': '/rightManagement/selectRootRights', //查询所有root权限信息
	'sys_right_selectRightById': '/rightManagement/selectRightById', //根据用户ID查询相应的页面权限信息

  //用户管理部分
  'sys_user_selectAllStaff': '/userManagement/selectAllStaff', //查询所有员工信息




  //财务管理部分
  'QUERY_ACCOUNT_WATER': '/financeManager/queryAllAndByQuestion',//账户流水查询



  //基础管理部分
  'sys_dict_dictSelect': '/DictManagement/selectDict', //查询所有基础信息
  'sys_dict_dictItemSelect': '/DictItemManagement/selectDictItem', //查询所有基础明细信息


  //审核管理部分
  'REALNAME_LISTALLNAME': '/RealName/listAllName', //查询所有实名认证信息
  'BANKCARD_LISTALLBANKCARD': '/BankCard/listAllBankCard', //查询所有银行卡认证信息  ctrl+shif+U
  'MATERIAL_LISTALLMATERIAL': '/Material/listAllMaterial', //查询材料认证信息




  //获得请求的完整地址，用于mockjs测试时使用
	'getFullPath': k => {
		return this.SERVER + this[k];
	}
}
