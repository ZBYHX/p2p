import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

//=============================前端部分================================
// 前端路由主要控制区域
import AFrontAppMainPage from '@/views/userLoginAndRegistration/AFrontAppMainPage' //前端AppMainPage
// 前端登录注册部分
import UserLogin from '@/views/userLoginAndRegistration/UserLogin' //前端用户登录
import Register1 from '@/views/userLoginAndRegistration/Register1' //用户注册
import Register2 from '@/views/userLoginAndRegistration/Register2' //用户注册成功
import FindPassword from '@/views/userLoginAndRegistration/FindPassword' //忘记密码
import ResetPassword from '@/views/userLoginAndRegistration/ResetPassword' //重设密码
// 主页部分
import HomePage from '@/views/frontEnd/homePageModule/HomePage'//前端主页
import Help from '@/views/frontEnd/helpModule/Help.vue'//帮助中心
import AboutUs from '@/views/frontEnd/AboutUsModule/AboutUs'//关于我们
import Inverstment from '@/views/frontEnd/investmentModule/Inverstment'//关于我们
import Infor from '@/views/frontEnd/investmentModule/Infor'//投资信息
import BorrowMoney from '@/views/frontEnd/borrowMoneyModule/BorrowMoney'//我要借款
//个人中心
import PersonCenter from '@/views/frontEnd/personalCenterModule/PersonCenter'//投资信息
//个人中心-->我的账户
import AccountInformation from '@/views/frontEnd/personalCenterModule/accountModule/AccountInformation'//账户信息
import CardAuditentication from '@/views/frontEnd/personalCenterModule/accountModule/CardAuthentication'//银行卡认证
import DataAuthentication from '@/views/frontEnd/personalCenterModule/accountModule/DataAuthentication'//材料认证
import LoginRecord from '@/views/frontEnd/personalCenterModule/accountModule/LoginRecord'//登录记录
import PersonalData from '@/views/frontEnd/personalCenterModule/accountModule/PersonalData'//个人资料
import RealNameAuthentication from '@/views/frontEnd/personalCenterModule/accountModule/RealNameAuthentication'//实名认证
//个人中心-->借贷项目
import CollectionDetails from '@/views/frontEnd/personalCenterModule/loanProjectModule/CollectionDetails'//收款明细
import LoanProject from '@/views/frontEnd/personalCenterModule/loanProjectModule/LoanProject'//借款项目
import ReimbursementDetail from '@/views/frontEnd/personalCenterModule/loanProjectModule/ReimbursementDetail'//还款明细
import TenderDetails from '@/views/frontEnd/personalCenterModule/loanProjectModule/TenderDetails'//投标明细
//个人中心-->资产详情
import AccountOfTheWater from '@/views/frontEnd/personalCenterModule/assetDetailsModule/AccountOfTheWater'//账户流水
import TopUpDetail from '@/views/frontEnd/personalCenterModule/assetDetailsModule/TopUpDetail'//充值详情


//关于我们（小模块）
import t1 from '@/views/frontEnd/AboutUsModule/t1'//关于我们
import t2 from '@/views/frontEnd/AboutUsModule/t2'//关于我们
import t3 from '@/views/frontEnd/AboutUsModule/t3'//关于我们
import t4 from '@/views/frontEnd/AboutUsModule/t4'//关于我们
import t5 from '@/views/frontEnd/AboutUsModule/t5'//关于我们
import t6 from '@/views/frontEnd/AboutUsModule/t6'//关于我们
import t7 from '@/views/frontEnd/AboutUsModule/t7'//关于我们
import t8 from '@/views/frontEnd/AboutUsModule/t8'//关于我们
import t9 from '@/views/frontEnd/AboutUsModule/t9'//关于我们
import t10 from '@/views/frontEnd/AboutUsModule/t10'//关于我们
import t11 from '@/views/frontEnd/AboutUsModule/t11'//关于我们


//================================后端部分==================================
//登录注册部分
import Login from '@/views/loginAndRegistration/Login' //后端登录
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
import AccountOfTheWater from "@/views/backstage/financeManagementModule/AccountOfTheWater"
import SysAccountOfTheWater from "@/views/backstage/financeManagementModule/SysAccountOfTheWater"
import QueryMoney from "@/views/backstage/financeManagementModule/QueryMoney"
//数据字典管理
import SysDataDictCatalog from '@/views/backstage/dictManagementModule/SysDataDictCatalog'//字典目录管理
import SysDataDictDetail from '@/views/backstage/dictManagementModule/SysDataDictDetail' //字典明细管理
//审核项目（谭玲）
import OfflineRechargeAudit from '@/views/backstage/auditProjectModule/OfflineRechargeAudit'//充值审核
import WithdrawalAudit from '@/views/backstage/auditProjectModule/WithdrawalAudit'//撤资审核
import FullScaleOfFirstInstance from '@/views/backstage/auditProjectModule/FullScaleOfFirstInstance'//满标审核
import GetMoneyAudit from '@/views/backstage/auditProjectModule/GetMoneyAudit'//提现审核
//项目审核模块
import RealNameAuthenticationAudit from '@iews/backstage/auditProjectModule/RealNameAuthenticationAudit'//实名认证审核
import BankCardAudit from '@iews/backstage/auditProjectModule/BankCardAudit'//银行卡认证审核
import MaterialAudit from '@iews/backstage/auditProjectModule/MaterialAudit'//材料认证审核
import CallBidAudit from '@iews/backstage/auditProjectModule/CallBidAudit'//招标审核
import BidAudit from '@iews/backstage/auditProjectModule/BidAudit'//投标审核


Vue.use(Router)

export default new Router({
  routes: [
    {//前端AppMainPage
      path: '/',
      name: 'AFrontAppMainPage',
      component: AFrontAppMainPage,
      children: [
        {//前端主页
          path: '/HomePage',
          name: 'HomePage',
          component: HomePage
        },
        {//前端用户登录
          path: '/UserLogin',
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
        {//帮助中心
          path: '/Help',
          name: 'Help',
          component: Help
        },
        {//我要借款
          path: '/BorrowMoney',
          name: 'BorrowMoney',
          component: BorrowMoney
        },
        {//我要投资
          path: '/Inverstment',
          name: 'Inverstment',
          component: Inverstment
        },
        {//投资的详细信息
          path: '/Infor',
          name: 'Infor',
          component: Infor
        },
        {//个人中心
          path: '/PersonCenter',
          name: 'PersonCenter',
          component: PersonCenter,
          children: [
            {//账户信息
              path: '/AccountInformation',
              name: 'AccountInformation',
              component: AccountInformation
            },
            {//银行卡认证
              path: '/CardAuditentication',
              name: 'CardAuditentication',
              component: CardAuditentication
            },
            {//材料认证
              path: '/DataAuthentication',
              name: 'DataAuthentication',
              component: DataAuthentication
            },
            {//登录记录
              path: '/LoginRecord',
              name: 'LoginRecord',
              component: LoginRecord
            },
            {//个人信息
              path: '/PersonalData',
              name: 'PersonalData',
              component: PersonalData
            },
            {//实名认证
              path: '/RealNameAuthentication',
              name: 'RealNameAuthentication',
              component: RealNameAuthentication
            },
            {//账户流水
              path: '/AccountOfTheWater',
              name: 'AccountOfTheWater',
              component: AccountOfTheWater
            },
            {//充值详情
              path: '/TopUpDetail',
              name: 'TopUpDetail',
              component: TopUpDetail
            },
            {//收款明细
              path: '/CollectionDetails',
              name: 'CollectionDetails',
              component: CollectionDetails
            },
            {//借款项目
              path: '/LoanProject',
              name: 'LoanProject',
              component: LoanProject
            },
            {//还款明细
              path: '/ReimbursementDetail',
              name: 'ReimbursementDetail',
              component: ReimbursementDetail
            },
            {//投标明细
              path: '/TenderDetails',
              name: 'TenderDetails',
              component: TenderDetails
            }
          ]
        },

        {//关于我们
          path: '/AboutUs',
          name: 'AboutUs',
          component: AboutUs,
          children: [
            {//网站公告
              path: '/t1',
              name: 't1',
              component: t1,
            },
            {//
              path: '/t2',
              name: 't2',
              component: t2,
            },
            {//
              path: '/t3',
              name: 't3',
              component: t3,
            },
            {//
              path: '/t4',
              name: 't4',
              component: t4,
            },
            {//
              path: '/t5',
              name: 't5',
              component: t5,
            }, {//
              path: '/t6',
              name: 't6',
              component: t6,
            },
            {//
              path: '/t7',
              name: 't7',
              component: t7,
            },
            {//
              path: '/t8',
              name: 't8',
              component: t8,
            },
            {//
              path: '/t9',
              name: 't9',
              component: t9,
            },
            {//
              path: '/t10',
              name: 't10',
              component: t10,
            },
            {//
              path: '/t11',
              name: 't11',
              component: t11,
            },

          ]
        },
      ]
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
        {//平台流水
          path: '/AccountOfTheWater',
          name: 'AccountOfTheWater',
          component: AccountOfTheWater
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
        {//满标审核
          path: '/FullScaleOfFirstInstance',
          name: 'FullScaleOfFirstInstance',
          component: FullScaleOfFirstInstance
        },
        {//撤资审核
          path: '/WithdrawalAudit',
          name: 'WithdrawalAudit',
          component: WithdrawalAudit
        },
        {//实名认证
          path: '/RealNameAuthenticationAudit',
          name: 'RealNameAuthenticationAudit',
          component: RealNameAuthenticationAudit
        },
        {//银行卡认证
          path: '/BankCardAudit',
          name: 'BankCardAudit',
          component: BankCardAudit
        },
        {//材料认证
          path: '/MaterialAudit',
          name: 'MaterialAudit',
          component: MaterialAudit
        },
        {//提现审核
          path: '/GetMoneyAudit',
          name: 'GetMoneyAudit',
          component: GetMoneyAudit
        },
        {//招标审核
          path: '/CallBidAudit',
          name: 'CallBidAudit',
          component: CallBidAudit
        },
        {//投标审核
          path: '/BidAudit',
          name: 'BidAudit',
          component: BidAudit
        },
      ]
    }


  ]
})
