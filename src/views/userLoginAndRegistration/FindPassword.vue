<template>
  <header>
    <div class="header-top min-width">
      <div class="container fn-clear"><strong class="fn-left">咨询热线：400-668-6698<span
        class="s-time">服务时间：9:00 - 18:00</span></strong>
        <ul class="header_contact">
          <li class="c_1"><a class="ico_head_weixin" id="wx"></a>
            <div class="ceng" id="weixin_xlgz" style="display: none;">
              <div class="cnr"><img src="../frontEnd/static/images/code.png"></div>
              <b class="ar_up ar_top"></b> <b class="ar_up_in ar_top_in"></b></div>
          </li>
          <li class="c_2"><a href="#" target="_blank" title="官方QQ" alt="官方QQ"><b class="ico_head_QQ"></b></a></li>
          <li class="c_4"><a href="#" target="_blank" title="新浪微博" alt="新浪微博"><b class="ico_head_sina"></b></a></li>
        </ul>
        <ul class="fn-right header-top-ul">
          <li><a href="index.html" class="app">返回首页</a></li>
          <li>
            <div class=""><a href="register.html" class="c-orange" title="免费注册">免费注册</a></div>
          </li>
          <li>
            <div class=""><a href="login.html" class="js-login" title="登录">登录</a></div>
          </li>
        </ul>
      </div>
    </div>
    <div class="header min-width">
      <div class="container">
        <div class="fn-left logo"><a class="" href="index.html"> <img src="../frontEnd/static/images/logo.png" title="">
        </a></div>
        <ul class="top-nav fn-clear">
          <li class="on"><a href="index.html">首页</a></li>
          <li><a href="list.html" class="">我要投资</a></li>
          <li><a href="帮助中心.html">安全保障</a></li>
          <li class="top-nav-safe"><a href="个人中心首页.html">我的账户</a></li>
          <li><a href="公司简介.html">关于我们</a></li>
        </ul>
      </div>
    </div>

    <!--登录和注册-->
    <div class="wrap">
      <form id="LonginForm" name="LonginForm" action="" method="post">
        <div class="tdbModule loginPage">
          <div class="registerTitle">忘记密码</div>
          <div class="registerCont">
            <ul>
              <br/>
              <li>
                <span class="dis">用户名：</span>
                <input class="input" type="text" v-model="username" tabindex="1" autocomplete="off">
                <span class="myCss01" data-info="请输入你的用户名">请输入你的用户名</span>
              </li>
              <li>
                <el-row>
                  <span class="dis">电话号码：</span>
                  <input class="input" type="text" id="userPhone" v-model="phoneNumber" style="width: 135px;"
                         maxlength="11" tabindex="1" autocomplete="off">
                  <el-button id="second" :disabled="isDisabled" @click="getValideCode()" type="primary">{{valideText}}</el-button>
                </el-row>
              </li>s
              <li>
                <span class="dis">短信验证码：</span>
                <input type="text" v-model="phoneCode" style="width:135px;" class="input" name="yzm" data-msg="验证码"
                       maxlength="4" tabindex="1" autocomplete="off">
                <span id="userNameAlt" class="myCss01" data-info="请输入手机验证码">请输入手机验证码</span>
              </li>
              <!--<li>-->
                <!--<span class="dis">验证码：</span>-->
                <!--<input type="text" v-model="jpgVerify" style="width:135px;" class="input" name="yzm" data-msg="验证码"-->
                       <!--maxlength="4" tabindex="1" autocomplete="off">-->
                <!--<img src="../frontEnd/static/images/code.jpg" id="yanzheng" alt="点击更换验证码" title="点击更换验证码"-->
                     <!--style="cursor:pointer;" class="valign">-->
                <!--<a @click="changeCount()" class="blue">看不清？换一张</a>-->
              <!--</li>-->
              <li class="btn">
                <el-row>
                  <el-button  type="success" @click="onsubmit()" style="width: 200px;" size="medium">提交验证</el-button>
                </el-row>
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
    <!--网站底部-->
    <div id="footer" class="ft">
      <div class="ft-inner clearfix">
        <div class="ft-helper clearfix">
          <dl>
            <dt>关于我们</dt>
            <dd><a href="公司简介.html">公司简介</a><a href="管理团队.html">管理团队</a><a href="网站公告.html">网站公告</a></dd>
          </dl>
          <dl>
            <dt>相关业务</dt>
            <dd><a href="list.html">我要投资</a><a href="我要借款.html">我要借款</a></dd>
          </dl>
          <dl>
            <dt>帮助中心</dt>
            <dd><a href="帮助中心.html">新手入门</a><a href="个人中心首页.html">我的账户</a><a href="list.html">债权转让</a></dd>
          </dl>
          <dl>
            <dt>联系我们</dt>
            <dd><a href="联系我们.html">联系我们</a></dd>
          </dl>
        </div>
        <div class="ft-service">
          <dl>
            <dd>
              <p><strong>400-660-1268</strong><br>
                工作日 9:00-22:00<br>
                官方交流群:<em>12345678</em><br>
                工作日 9:00-22:00 / 周六 9:00-18:00<br>
              </p>
              <div class="ft-serv-handle clearfix">
                <a class="icon-hdSprite icon-ft-sina a-move a-moveHover" title="亿人宝新浪微博" target="_blank" href="#"></a>
                <a class="icon-hdSprite icon-ft-qqweibo a-move a-moveHover" title="亿人宝腾讯微博" target="_blank"
                   href="#"></a>
                <a class="icon-ft-qun a-move a-moveHover" title="亿人宝QQ群" target="_blank" href="#"></a>
                <a class="icon-hdSprite icon-ft-email a-move a-moveHover mrn" title="阳光易贷email" target="_blank"
                   href="mailto:xz@yirenbao.com"></a>
              </div>
            </dd>
          </dl>
        </div>
        <div class="ft-wap clearfix">
          <dl>
            <dt>官方二维码</dt>
            <dd><span class="icon-ft-erweima">
            <img src="../frontEnd/static/images/code.png" style="display: inline;"></span>
            </dd>
          </dl>
        </div>
      </div>
      <div class="ft-record">
        <div class="ft-approve clearfix"><a class="icon-approve approve-0 fadeIn-2s" target="_blank" href="#"></a><a
          class="icon-approve approve-1 fadeIn-2s" target="_blank" href="#"></a><a
          class="icon-approve approve-2 fadeIn-2s" target="_blank" href="#"></a><a
          class="icon-approve approve-3 fadeIn-2s" target="_blank" href="#"></a></div>
        <div class="ft-identity">©2015 亿人宝 All rights reserved&nbsp;&nbsp;&nbsp;<span class="color-e6">|</span>&nbsp;&nbsp;&nbsp;安徽省亿人宝投资管理有限公司&nbsp;&nbsp;&nbsp;<span
          class="color-e6">|</span>&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://www.miitbeian.gov.cn/">皖ICP备12345678号-1</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  // import {valideCode} from "../frontEnd/static/script2/valideCode";

  export default {
    name: '',
    data: function () {
      return {
        username: null,
        phoneNumber: null,
        jpgVerify: null,
        valideText: '获取验证码',
        isDisabled: false,
        countdown: 60
      }
    },
    methods: {
      //点击获取手机验证码
      getValideCode: function () {
        //校验手机号是否合法
        const reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!reg.test(this.phoneNumber)) {
          this.$message({
            message: '警告，请输入有效的手机号码！',
            type: 'warning'
          });
          return false;
        } else {
          this.setTime();
        }
      },
      //60s倒计时实现逻辑
      setTime:  function () {
        // var countdown = 60;
        if (this.countdown == 0) {
          this.isDisabled = false;
          this.valideText = "获取验证码";
          this.countdown = 60;//60秒过后button上的文字初始化,计时器初始化;
          return;
        } else {
          // this.valieText.disabled = false;
          this.isDisabled = true;
          this.valideText = "(" + this.countdown + "s)后重新发送";
          this.countdown--;
        }
        const that = this;
        setTimeout(function () {
          that.setTime()
        }, 1000);
      },
      //提交验证
      onsubmit: function () {
        this.$router.replace({
          path: '/ResetPassword'
        })
      }
    }

  }
</script>

<style>
  @import "../frontEnd/static/css/common.css";
  @import "../frontEnd/static/css/register.css";

  .myCss01{
    margin-left: 5px;
    color: gray;
  }
</style>
