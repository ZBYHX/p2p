import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

//============================前端部分============================
// 前端登录注册部分
import UserLogin from '@/views/userLoginAndRegistration/UserLogin' //前端用户登录
import Register1 from '@/views/userLoginAndRegistration/Register1' //用户注册
import Register2 from '@/views/userLoginAndRegistration/Register2' //用户注册成功
import FindPassword from '@/views/userLoginAndRegistration/FindPassword' //忘记密码
import ResetPassword from '@/views/userLoginAndRegistration/ResetPassword' //重设密码

//---------------------前端模块-------------------------------
// 主页部分
import HomePage from '@/views/frontEnd/homePageModule/HomePage'//前端主页


//================================后端部分==================================
//登录注册部分
import Login from '@/views/loginAndRegistration/Login' //后端登录


//---------------------后端模块---------------------------------
//主页模块
import AppMain from '@/views/backstage/mainPageModule/AppMain' //后台主页
import Img from '@/views/backstage/mainPageModule/wother/Img'//后台首页图片显示
//权限管理
import RoleManagement from '@/views/backstage/rightManagementModule/RoleManagement'//角色管理
import MenuManagement from '@/views/backstage/rightManagementModule/MenuManagement'//菜单管理
//用户管理
import UserManagement from '@/views/backstage/userManagementModule/UserManagement'//平台用户管理
import StaffManagement from '@/views/backstage/userManagementModule/StaffManagement'//员工管理
import LoginHistory from '@/views/backstage/userManagementModule/LoginHistory'//登录历史
//财务管理
import SysAccountOfTheWater from "@/views/backstage/financeManagementModule/SysAccountOfTheWater"
import QueryMoney from "@/views/backstage/financeManagementModule/QueryMoney"
//数据字典管理
import SysDataDictCatalog from '@/views/backstage/dictManagementModule/SysDataDictCatalog'//字典目录管理
import SysDataDictDetail from '@/views/backstage/dictManagementModule/SysDataDictDetail' //字典明细管理
//审核项目
import OfflineRechargeAudit from '@/views/backstage/auditProjectModule/OfflineRechargeAudit'//充值审核
import WithdrawalAudit from '@/views/backstage/auditProjectModule/WithdrawalAudit'//提现审核
import FullScaleOfFirstInstance from '@/views/backstage/auditProjectModule/FullScaleOfFirstInstance'//满标一审
import FullScaleSecondTrial from '@/views/backstage/auditProjectModule/FullScaleSecondTrial'//满标二审
//项目审核模块
import RealNameAuthenticationAudit from '@/views/backstage/auditProjectModule/RealNameAuthenticationAudit'//实名认证审核
import BankCardAudit from '@/views/backstage/auditProjectModule/BankCardAudit'//银行卡认证审核
import MaterialAudit from '@/views/backstage/auditProjectModule/MaterialAudit'//银行卡认证审核



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
    {//前端主页
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage
    },
    //==================================后台部分=================================
    //------------------登录注册部分-----------------------------
    {//后端员工登录
      path: '/Login',
      name: 'Login',
      component: Login
    },
    //--------------------首页部分-----------------------
    {//后台主页
      path: '/AppMain',
      name: 'AppMain',
      component: AppMain,
      children: [
        {//后台首页图片
          path: '/Img',
          name: 'Img',
          component: Img
        },
        //--------------------权限管理-----------------------
        {//角色管理
          path: '/RoleManagement',
          name: 'RoleManagement',
          component: RoleManagement
        },
        {//菜单管理
          path: '/MenuManagement',
          name: 'MenuManagement',
          component: MenuManagement
        },
        //--------------------用户管理-----------------------
        {//平台用户管理
          path: '/UserManagement',
          name: 'UserManagement',
          component: UserManagement
        },
        {//员工管理
          path: '/StaffManagement',
          name: 'StaffManagement',
          component: StaffManagement
        },
        {//登录历史
          path: '/LoginHistory',
          name: 'LoginHistory',
          component: LoginHistory
        },
        {//查询借款
          path: '/QueryMoney',
          name: 'QueryMoney',
          component: QueryMoney
        },
        {//账户流水
          path: '/SysAccountOfTheWater',
          name: 'SysAccountOfTheWater',
          component: SysAccountOfTheWater
        },
        //-----------------数据字典-------------------
        {//数据字典目录
          path: '/SysDataDictCatalog',
          name: 'SysDataDictCatalog',
          component: SysDataDictCatalog
        },
        {//数据字典目录
          path: '/SysDataDictDetail',
          name: 'SysDataDictDetail',
          component: SysDataDictDetail
        },
        {//充值审核
          path: '/OfflineRechargeAudit',
          name: 'OfflineRechargeAudit',
          component: OfflineRechargeAudit
        },
        {//提现审核
          path: '/WithdrawalAudit',
          name: 'WithdrawalAudit',
          component: WithdrawalAudit
        },
        {//满标一审
          path: '/FullScaleOfFirstInstance',
          name: 'FullScaleOfFirstInstance',
          component: FullScaleOfFirstInstance
        },
        {//满标二审
          path: '/FullScaleSecondTrial',
          name: 'FullScaleSecondTrial',
          component: FullScaleSecondTrial
        },
        {//实名认证
          path:'/RealNameAuthenticationAudit',
          name: 'RealNameAuthenticationAudit',
          component: RealNameAuthenticationAudit
        },
        {//银行卡认证
          path:'/BankCardAudit',
          name: 'BankCardAudit',
          component: BankCardAudit
        },
        {//材料认证
          path:'/MaterialAudit',
          name: 'MaterialAudit',
          component: MaterialAudit
        }
      ]
    }


  ]
})
