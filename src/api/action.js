/**
 * 对后台请求的地址的封装，URL格式如下：
 * 模块名_实体名_操作
 */
export default {
	//服务器
	'SERVER': 'http://localhost:8080/crm',
	
	
	//权限管理部分
	'SYS_USER_DOLOGIN': '/right/userAction_selectOneUser.action', //用户登陆
	'SYS_USER_DOREG': '/right/userAction_addUser.action', //用户注册
	'SYS_TREENODE_LISTALL': '/right/rightAction_selectUserRights.action', //初始化左侧菜单信息
	'SYS_USER_LIST': '/right/userAction_selectAllUsers.action', //查询多个用户信息（包括条件查询）
	'SYS_USER_ADD': '/right/userAction_addUser.action', //增加新用户信息
	'SYS_USER_EDIT': '/right/userAction_editUser.action', //修改用户信息
	'SYS_USER_DEL': '/right/userAction_delUser.action', //删除单个用户信息
	'SYS_ROLE_LIST': '/right/roleAction_selectAllRoles.action', //查询所有角色信息
	'SYS_right_ROOTRIGHTS': '/right/rightAction_selectRootRights.action', //查询所有权限模块信息
	'SYS_right_RIGHTSODES': '/right/rightAction_selectRightCodeByRoleid.action', //根据角色ID查询所有权限相关的权限ID
	'SYS_right_EDIT': '/right/rightAction_editRightsRole.action', //角色对应的权限修改
	'SYS_ROLE_MERGE': '/right/roleAction_mergeRole.action', //角色增加或者修改
	'SYS_ROLE_DEL': '/right/roleAction_delRole.action', //角色删除
	'SYS_RIGHT_SELECT_GONG': '/right/urlAction_selectUrls.action', //查看角色页面对应功能级权限
	'SYS_RIGHT_UPDATE_GONG': '/right/urlAction_editUrls.action', //修改角色页面对应功能级权限


	

	//获得请求的完整地址，用于mockjs测试时使用
	'getFullPath': k => {
		return this.SERVER + this[k];
	}
}
