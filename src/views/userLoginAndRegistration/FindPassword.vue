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
                <span class="dis">用&ensp;户&ensp;名：</span>
                <input class="input" type="text" v-model="username" tabindex="1" autocomplete="off">
                <span class="myCss01" data-info="请输入你的用户名">请输入你的用户名</span>
              </li>
              <li>
                <el-row>
                  <span class="dis">电话号码：</span>
                  <input class="input" type="text" id="userPhone" v-model="phoneNumber" style="width: 135px;"
                         maxlength="11" tabindex="1" autocomplete="off">
                  <el-button id="second" :disabled="isDisabled" @click="getValideCode()" type="primary">{{valideText}}
                  </el-button>
                </el-row>
              </li>
              <li>
                <span class="dis">手机验证码：</span>
                <input type="text" v-model="phoneCode" style="width:135px;" class="input" name="yzm" data-msg="验证码"
                       maxlength="4" tabindex="1" autocomplete="off">
                <span id="userNameAlt" class="myCss01" data-info="请输入手机验证码">请输入手机验证码</span>
              </li>
              <li><span class="dis">验&ensp;证&ensp;码：</span>
                <input type="text" v-model="jpgVerify" class="input input1 _yanzhengma" maxlength="4" tabindex="1">
                <el-link type="success" @click="changeCount()" style="color: darkblue;" class="myLink02">
                  {{identifyCode}}
                </el-link>&emsp;
                <el-button @click="changeCount()">点击切换</el-button>
              </li>
              <li class="btn">
                <el-row>
                  <el-button type="success" @click="onsubmit()" style="width: 200px;" size="medium">提交验证</el-button>
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
        phoneCode: null,//手机验证码
        jpgVerify: null,//输入的验证码
        identifyCode: null,//生成的验证码
        valideText: '获取验证码',//手机验证码文本
        isDisabled: false,//是否禁用手机验证码按钮
        countdown: 60,//获取手机验证码倒计时时间
        f1: false, //判断用户账号和密码输入是否正确
        f2: false, //判断验证码是否输入正确
      }
    },
    created: function () {
      //默认调用验证码
      this.changeCount();
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
      //文本框内容验证
      check01: function () {
        this.f1 = false;
        // username: null,//用户名称
        if (this.username == null || this.ususername == "") {
          this.$message({
            message: '用户名称不能为空！',
            type: 'warning'
          });
          return false;
        }
        if (this.username.length < 2 || this.username.length >=16) {
          this.$message({
            message: '请输入2~16位数的用户名！',
            type: 'warning'
          });
          return false;
        }
        //   phoneNumber: null,//电话号码1
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
        //   phoneCode: null,//手机验证码
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
      //提交验证
      onsubmit: function () {
        this.check01();
        if (this.f1 == true) {
          this.check02();
          if (this.f2 == true) {
            //需要提交验证的表单
            var form01 = {
              nickname: this.username,
              userpassword: this.password,
              phonenumber: this.phoneNumber,
              phoneCode: this.phoneCode
            }
            let url = this.axios.urls.user_findPwd;
            this.axios.post(url, form01).then((resp) => {
              if (0 == resp.data.code) {
                this.$message({
                  message: resp.data.message,
                  type: 'success'
                });
                //给用户名赋值一个临时值
                this.$store.commit('setTempName', {
                  tempName: this.username
                });
                //给用户名赋值一个临时值
                this.$store.commit('setTempUserid', {
                  tempUserid: resp.data.result.userid
                });
                //跳转到登录页面
                this.$router.replace({
                  path: "/ResetPassword"
                });
              } else {
                this.$message.error(resp.data.message);
              }
            }).catch((error) => {
            });
          }
        }

        // this.$router.replace({
        //   path: '/ResetPassword'
        // })
      }
    }

  }
</script>

<style scoped>
  @import "../frontEnd/static/css/common.css";
  @import "../frontEnd/static/css/register.css";

  .myCss01 {
    margin-left: 5px;
    color: gray;
  }

  .myLink02 {
    width: 55px;
    font-size: 22px;
    color: darkblue;
    margin-left: 10px;
  }
</style>
