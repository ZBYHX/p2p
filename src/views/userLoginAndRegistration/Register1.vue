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
              <span id="userNameAlt" class="myCss01" data-info="6-24个字符，字母开头，字母、数字下划线组成">2~16个字符，字母开头，字母、数字下划线组成</span>
            </li>
            <li><span class="dis">密&emsp;码:</span>
              <input type="password" v-model="password" class="input _password" maxlength="24"
                     tabindex="1">
              <span id="passwordAlt" class="myCss01" data-info="6-24个字符，英文、数字组成，区分大小写">6-18个字符，英文、数字组成，区分大小写</span></li>
            <li><span class="dis">确认密码:</span>
              <input type="password" v-model="repassword" class="input _repeatPassword"
                     maxlength="24" tabindex="1">
              <span id="repeatPasswordAlt" class="myCss01" data-info="请再次输入密码">请再次输入密码</span></li>
            <li class="telNumber"><span class="dis">手机号码:</span>
              <input type="text" v-model="phoneNumber" class="input _phoneNum" tabindex="1" maxlength="11">
              <el-button id="second" :disabled="isDisabled" @click="getValideCode()" type="primary">{{valideText}}
              </el-button></li>
            <li class="telNumber"><span class="dis">手机验证码:</span>
              <input type="text" v-model="phoneCode" class="input input1  _phonVerify" data-_id="phonVerify"
                     tabindex="1">
              <span class="info myCss01" id="phonVerifys" data-info="请输入手机验证码">请输入四位数的手机验证码</span></li>
            <li><span class="dis">验证码:</span>
              <input type="text" v-model="jpgVerify" class="input input1 _yanzhengma" maxlength="4" tabindex="1">
              <el-link type="success" @click="changeCount()" style="color: darkblue;" class="myLink02">
                {{identifyCode}}
              </el-link>&emsp;
              <el-button @click="changeCount()">点击切换</el-button></li>
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
        jpgVerify: null,//输入的验证码
        phoneNumber: null,//手机号码
        phoneCode: null,//手机验证码
        pullMan: null,//推荐人
        valideText: '获取验证码',//手机验证码文本
        identifyCode: null,//生成的验证码
        isDisabled: false,//是否禁用手机验证码按钮
        countdown: 60,//获取手机验证码倒计时时间
        f1: false, //判断用户账号和密码输入是否正确
        f2: false, //判断验证码是否输入正确
      };
    },
    created: function () {
      //默认调用验证码
      this.changeCount();
    },
    methods: {
      //返回首页

      //注册提交
      onsubmit: function () {
        this.check01();
        if (this.f1 == true) {
          this.check02();
          if (this.f2 == true) {

            var form01 = {
              nickname: this.username,
              userpassword: this.password,
              phonenumber: this.phoneNumber,
              phoneCode: this.phoneCode,
              credentials: true
            }
            let url = this.axios.urls.user_addUser;
            this.axios.post(url, form01).then((resp) => {
              if (0 == resp.data.code) {//注册失败
                this.$message({
                  message: resp.data.message,
                  type: 'success'
                });
                //跳转到登录页面
                this.$router.replace({
                  path: "/Register2"
                });
              } else {
                this.$message.error(resp.data.message);
              }
            }).catch((error) => {
            });
          }
        }
        // this.$router.replace({
        //   path: "/Register2"
        // });
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
          let url = this.axios.urls.user_sendSms;
          this.axios.post(url, {
            phonenumber: this.phoneNumber
          }).then((resp) => {
            if (0 == resp.data.code) {//发送验证成功
              this.$message({
                message: resp.data.message,
                type: 'success'
              });
            } else {
              this.$message.error(resp.data.message);
            }
          }).catch((error) => {
          });

          this.setTime();
        }
      },
      //60s倒计时实现逻辑
      setTime: function () {
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
      //切换验证码
      changeCount: function () {
        var code = "";
        var codeLength = 4;//验证码的长度 
        var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
          'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
        for (var i = 0; i < codeLength; i++) {
          var index = Math.floor(Math.random() * 36);//取得随机数的索引（0~35） 
          code += random[index];//根据索引取得随机数加到code上 
        }
        this.identifyCode = code;//把code值赋给验证码 
      },
      //验证注册信息输入是否合法
      check01: function () {
        this.f1 = false;
        //验证用户名称
        if (this.username == null || this.username == '') {
          this.$message({
            message: '用户名称不能为空！',
            type: 'warning'
          });
          return false;
        }
        if (this.username.length < 2 || this.username.length > 16) {
          this.$message({
            message: '请输入2~16位数的用户名！',
            type: 'warning'
          });
          return false;
        }
        //验证用户密码
        if (this.password == null || this.password == '') {
          this.$message({
            message: '密码不能为空！',
            type: 'warning'
          });
          return false;
        }
        if (this.password.length < 6 || this.password.length > 18) {
          this.$message({
            message: '请输入6~18位数的密码！',
            type: 'warning'
          });
          return false;
        }
        //验证确认密码
        if (this.repassword == null || this.repassword == '') {
          this.$message({
            message: '确认密码不能为空！',
            type: 'warning'
          });
          return false;
        }
        if (this.repassword != this.password) {
          this.$message({
            message: '两次输入密码不一致！',
            type: 'warning'
          });
          return false;
        }
        //验证码手机号码
        if (this.phoneNumber == null || this.phoneNumber == '') {
          this.$message({
            message: '电话号码不能为空！',
            type: 'warning'
          });
          return false;
        }
        const reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!reg.test(this.phoneNumber)) {
          this.$message({
            message: '电话号码格式不正确！',
            type: 'warning'
          });
          return false;
        }
        //验证手机验证码
        if (this.phoneCode == null || this.phoneCode == '') {
          this.$message({
            message: '手机验证码不能为空！',
            type: 'warning'
          });
          return false;
        }

        this.f1 = true;
      },
      // 验证所输入验证码是否一致，不区分大小写
      check02: function () {
        this.f2 = false;
        // this.jpgVerify.toUpperCase();//取得输入的验证码并转化为大写   
        if (this.jpgVerify == '' || this.jpgVerify == null) {
          this.$message({
            message: '请输入验证码！',
            type: 'warning'
          });
        } else if (this.jpgVerify.toUpperCase() != this.identifyCode.toUpperCase()) {
          this.$message({
            message: '验证码输入错误！',
            type: 'warning'
          });
          this.changeCount();//刷新验证码 
          this.jpgVerify = '';
        } else {
          //输入正确时
          this.f2 = true;
        }
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

  .myLink02 {
    width: 55px;
    font-size: 22px;
    color: darkblue;
    margin-left: 10px;
  }
</style>
