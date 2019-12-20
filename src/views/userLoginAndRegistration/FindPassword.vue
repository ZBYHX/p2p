<template>
  <header>

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
              </li>
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
  </header>
</template>

<script>
  // import {valideCode} from "../frontEnd/static/script2/valideCode";

  export default {
    name: '',
    data: function () {
      return {
        username: null,//用户名称
        phoneNumber: null,//电话号码1
        jpgVerify: null,//验证码
        valideText: '获取验证码',//手机验证码文本
        isDisabled: false,//是否禁用手机验证码按钮
        countdown: 60//获取手机验证码倒计时时间
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
