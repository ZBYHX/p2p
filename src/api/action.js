/**
 * 对后台请求的地址的封装，URL格式如下：
 * 模块名_实体名_操作
 */
export default {
  //服务器
  'SERVER': 'http://localhost:8080/hp2p',

  //后台员工登录注册部分
  'SYS_USER_LOGIN': '/userManagement/sysUserLogin', //员工用户登陆
  'sys_user_sendSmsSysUser': '/userManagement/sendSmsSysUser', //员工短信验证请求
  'sys_user_sysUserSmsLogin': '/userManagement/sysUserSmsLogin', //员工短信登录
  'sys_user_selectSysUserSname': '/userManagement/selectSysUserSname', //员工找回密码
  'sys_user_editStaffPwd': '/userManagement/editStaffPwd', //员工重设密码


  //权限管理部分
  'sys_right_rootSelect': '/rightManagement/listRootRights', //查询所有root权限信息
  'sys_right_selectRightById': '/rightManagement/selectRightById', //根据用户ID查询相应的页面权限信息
  'sys_right_listAllRights': '/rightManagement/listAllRights', //查询所有的权限信息
  'sys_right_selectAllType': '/rightManagement/selectAllType', //查询所有权限信息的类型
  'sys_right_listAllRole': '/rightManagement/listAllRole', //查询所有角色信息
  'sys_right_selectRightCodeByRoleid': '/rightManagement/selectRightCodeByRoleid', //查询所有权限信息的类型
  'sys_right_addRoleRight': '/rightManagement/addRoleRight', //增加权限信息
  'sys_right_updateByPrimaryKeySelective': '/rightManagement/updateByPrimaryKeySelective', //修改权限信息


  //用户管理部分
  'sys_user_selectAllStaff': '/userManagement/selectAllStaff', //查询所有员工信息
  'user_selectAllUser': '/userManagement/listUser', //查询所有平台用户信息
  'user_selectAllLoginInfo': '/userManagement/listLoginInfo', //查询所有登录历史信息
  'user_delUser': '/userManagement/delUser', //后台删除用户信息
  'user_editUser': '/userManagement/editUser', //后台修改用户信息
  'user_listAllRole': '/rightManagement/listAllRole', //查询所有角色类型
  'user_editStaff': '/userManagement/editStaff', //修改员工信息
  'user_addStaff': '/userManagement/addStaff', //增加新员工信息
  'user_delStaff': '/userManagement/delStaff', //删除员工信息


  'user_sendSms': '/userManagement/sendSms', //平台发送发送短信验证码
  'user_userLogin': '/userManagement/userLogin', //平台用户登录
  'user_addUser': '/userManagement/addUser', //平台用户注册
  'user_findPwd': '/userManagement/findPwd', //平台用户找回密码
  'user_editUserPwd': '/userManagement/editUserPwd', //修改平台用户密码（重新设置用户密码）




  //财务管理部分（朱贤良）
  // 'ADD_ACCOUNT_FLOW': '/financeManager/addAccountFlow',//增加
  'QUERY_ACCOUNT_WATER': '/financeManager/queryAllAndByQuestion',//账户流水查询
  'EDIT_ACCOUNT_FLOW': '/financeManager/editAccountFlow',//编辑
  'DEL_ACCOUNT_FLOW': '/financeManager/delAccountFlow',//删除

  // 'MERGE_METHODS': '/financeManager/mergeMethods',//编辑增加
  'QUERY_SYS_ACCOUNT_WATER': '/financePlatFlow/querySysAllAndByQuestion',//sys账户流水查询
  'EDIT_SYS_ACCOUNT_FLOW': '/financePlatFlow/editSysAccountFlow',//sys编辑
  'DEL_SYS_ACCOUNT_FLOW': '/financePlatFlow/delSysAccountFlow',//sys删除

  'QUERY_JKMANAGER': '/jkManager/queryAllByAnything',//paySchedule
  'DEL_JKMANAGER': '/jkManager/delPaySchedule',//paySchedule删除
  'EDIT_JKMANAGER': '/jkManager/editPaySchedule',//paySchedule编辑

  'LIST_CALLBIDSTYPE': '/callBidsTypeCtrl/listAnything',//
  'EDIT_CALLBIDSTYPE': '/callBidsTypeCtrl/editCallBidsType',//
  'DEL_CALLBIDSTYPE': '/callBidsTypeCtrl/delCallBidsType',//



  //基础管理部分（刘亮）
  'sys_dict_dictSelect': '/DictManagement/selectDict', //查询所有基础信息
  'sys_dict_dictDel': '/DictManagement/delDict', //删除基础信息
  'sys_dict_dictMerge': '/DictManagement/MergeDict', //增加和修改基础信息
  'sys_dict_dictItemSelect': '/DictItemManagement/selectDictItem', //查询所有基础明细信息
  'sys_dict_dictItemDel': '/DictItemManagement/delDictItem',//删除基础明细信息
  'sys_dict_dictItemMerge': '/DictItemManagement/MergeDictItem',//增加和修改基础明细信息
  'sys_dict_dictItemId': '/DictItemManagement/selectDictItemId',//查找单个id对应的所有那一列的值


  //审核项目01（竺尧）
  'REALNAME_LISTALLNAME': '/RealName/listAllName', //查询所有实名认证信息
  'REALNAME_EDITREALNAME': '/RealName/editRealName', //修改实名认证的信息
  'REALNAME_DELREALNAME': '/RealName/delRealName', //删除实名认证的相关的信息（审核表和实名认证表）

  'BANKCARD_LISTALLBANKCARD': '/BankCard/listAllBankCard', //查询所有银行卡认证信息  ctrl+shif+U
  'BANKCARD_EDITBANKCARD': '/BankCard/editBankCard', //修改银行卡认证信息
  'BANKCARD_DELBANKCARD': '/BankCard/delBankCard', //删除银行卡认证信息

  'MATERIAL_LISTALLMATERIAL': '/Material/listAllMaterial', //查询材料认证信息
  'MATERIAL_EDITMATERIAL': '/Material/editMaterial', //修改材料认证信息
  'MATERIAL_DELMATERIAL': '/Material/delMaterial', //删除材料认证信息

  'CALLBIDS_LISTALLCALLBIDS': '/CallBids/listAllCallBids', //查询招标审核信息
  'CALLBIDS_EDITCALLBIDS': '/CallBids/editCallBids',//  修改招标审核信息
  'CALLBIDS_DELCALLBIDS': '/CallBids/delCallBids',//  删除招标审核信息

  'BID_LISTALLBID': '/Bid/listAllBid', //查询投标审核信息
  'BID_EDITBID': '/Bid/editBid', //修改投标审核信息
  'BID_DELBID': '/Bid/delBid', //删除投标审核信息


  //审核项目02(谭玲)
  'CASH_LISTALLCASH':'/auditProjectModule/listAllCash',//查询多个提现信息
  'CASH_DELCASH':'/auditProjectModule/delCash',//删除提现信息
  'CASH_EDITCASH':'/auditProjectModule/editCash',//修改提现信息
  'RECHARGE_LISTALLRECHARGES': '/auditProjectModule/listAllRecharges',//查询充值记录
  'RECHARGE_DELRECHARGE': '/auditProjectModule/delRecharge',//删除充值记录
  'RECHARGE_EDITRECHARGE': '/auditProjectModule/editRecharge',//修改充值记录
  'WITHDRAW_LISTALLWITHDRAW': '/auditProjectModule/listAllWithdraw',//查询撤资记录
  'WITHDRAW_EDITWITHDRAW': '/auditProjectModule/editWithdraw',//修改撤资记录
  'WITHDRAW_DELWITHDRAW': '/auditProjectModule/delWithdraw',//删除撤资记录
  'FULLBID_LISTALLFULLBID': '/auditProjectModule/listAllFullBid',//查询多个满标记录
  'FULLBID_DELFULLBID': '/auditProjectModule/delFullBid',//删除满标记录
  'FULLBID_EDITFULLBID': '/auditProjectModule/editFullBid',//修改满标记录


  //获得请求的完整地址，用于mockjs测试时使用
  'getFullPath': k => {
    return this.SERVER + this[k];
  }
}
