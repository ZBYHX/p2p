<template>
  <header>

    <!--注册-->
    <div class="wrap">
      <div class="tdbModule register">
        <div class="registerTitle">注册账户</div>
        <div class="registerLc1">
          <p class="p1">填写账户信息</p>
          <p class="p2">验证手机信息</p>
          <p class="p3">注册成功</p>
        </div>
        <div class="registerCont">
          <ul>
            <li><span class="dis">用户名:</span>
              <input type="text" v-model="username" class="input _userName" maxlength="24" tabindex="1">
              <span id="userNameAlt" class="myCss01" data-info="6-24个字符，字母开头，字母、数字下划线组成">6-24个字符，字母开头，字母、数字下划线组成</span>
            </li>
            <li><span class="dis">密&emsp;码:</span>
              <input type="password" v-model="password" class="input _password" maxlength="24"
                     tabindex="1">
              <span id="passwordAlt" class="myCss01" data-info="6-24个字符，英文、数字组成，区分大小写">6-24个字符，英文、数字组成，区分大小写</span></li>
            <li><span class="dis">确认密码:</span>
              <input type="password" v-model="repassword" class="input _repeatPassword"
                     maxlength="24" tabindex="1">
              <span id="repeatPasswordAlt" class="myCss01" data-info="请再次输入密码">请再次输入密码</span></li>
            <li><span class="dis">验证码:</span>
              <input type="text" v-model="valideCode" class="input input1 _yanzhengma"  maxlength="4" tabindex="1">
              <img src="../frontEnd/static/images/code.jpg" alt="验证码" style="cursor:pointer;" id="yzm" class="valign">
              <a class="look blue _changeCapcherButton myCss02" id="look">看不清？换一张</a> <span
                class="info" id="jpgVerifys" data-info="请输入手机验证码"></span></li>
            <li class="telNumber"><span class="dis">手机号码:</span>
              <input type="text" v-model="phoneNumber" class="input _phoneNum" tabindex="1" maxlength="11">
              <!--<a href="javascript:void(0);" class="button radius1 _getkey" id="sendPhone">获取验证码</a>-->
              <el-button id="second" :disabled="isDisabled" @click="getValideCode()" type="primary">{{valideText}}</el-button>
              <!--<span id="phoneJy" data-info="请输入您的常用电话">请输入您的常用电话</span></li>-->
            <li class="telNumber"><span class="dis">短信验证码:</span>
              <input  type="text" v-model="phoneCode" class="input input1  _phonVerify" data-_id="phonVerify" tabindex="1">
              <span class="info myCss01" id="phonVerifys" data-info="请输入手机验证码">请输入手机验证码</span></li>
            <li><span class="dis">推 荐 人:</span>
              <input type="text" v-model="pullMan" class="input input1 _invist">
              <span class="_invist_msg myCss01">请填写推荐人账户名，如无推荐人请留空</span></li>
            <li class="agree">
              <input name="protocol" id="protocol" type="checkbox" value="" checked="checked">
              我同意《<a href="#" target="_black">亿人宝注册协议</a>》 <span id="protocolAlt" data-info="请查看协议">请查看协议</span></li>
            <li class="btn"><a @click="onsubmit()" class="radius1 _ajaxSubmit">下一步</a></li>
          </ul>
        </div>
      </div>
    </div>
    <!--网站底部-->
  </header>
</template>

<script>
  import {common} from "../frontEnd/static/script/common";
  // import {login} from "../frontEnd/static/script/login";

  export default {
    name: 'Register1',
    data: function () {
      return {
        username: null,//用户名称
        password: null,//用户密码
        repassword: null,//确认密码
        valideCode: null,//验证码
        phoneNumber: null,//手机号码
        phoneCode: null,//手机验证码
        pullMan: null,//推荐人
        valideText: '获取验证码',//手机验证码文本
        isDisabled: false,//是否禁用手机验证码按钮
        countdown: 60//获取手机验证码倒计时时间
      };
    },
    methods:{
      //返回首页

      //注册提交
      onsubmit: function () {
        this.$router.replace({
          path: "/Register2"
        });
      },
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
          //请求地址区域


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
    }
  }

</script>

<style>
  @import "../frontEnd/static/css/common.css";
  @import "../frontEnd/static/css/register.css";

  .myCss01 {
    margin-left: 5px;
    color: gray;
  }

  .myCss02 {
    color: darkblue;
  }
</style>
