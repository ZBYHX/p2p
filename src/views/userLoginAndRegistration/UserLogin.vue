<template>
  <header>

    <!--登录和注册-->
    <div class="wrap">
      <form id="LonginForm" name="LonginForm" action="" method="post">
        <div class="tdbModule loginPage">
          <div class="registerTitle">用户登录</div>
          <div class="registerCont">
            <ul>
              <br/>
              <li>
                <span class="dis">用户名：</span>
                <input class="input" type="text" v-model="username" tabindex="1" autocomplete="off">
                <span class="myCss02">2~16个字符，字母开头，字母、数字下划线组成</span>
              </li>
              <li>
                <span class="dis">密&emsp;码：</span>
                <input class="input" type="password" v-model="password" placeholder="" maxlength="24" tabindex="1"
                       autocomplete="off">
                <span class="myCss02">6~18个字符，英文、数字组成，区分大小写</span>
              </li>
              <li>
                <span class="dis">验证码：</span>
                <input type="text" v-model="jpgVerify" style="width:130px;" class="input" name="yzm" data-msg="验证码"
                       maxlength="4" tabindex="1" autocomplete="off">
                <el-link type="success" @click="changeCount()" class="myLink01">{{identifyCode}}</el-link>&emsp;
                <el-button @click="changeCount()">点击切换</el-button>
              </li>
              <li style="width: 400px;">
                <span class="dis"></span>
                <el-link type="primary" @click="register()">用户注册</el-link>
                <el-link type="primary" @click="findPassword()" class="right">忘记密码</el-link>
              </li>
              <li class="btn">
                <el-row>
                  <el-button type="success" @click="dosubmit()" style="width: 200px;" size="medium">立即登录</el-button>
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
  // import {common} from "../frontEnd/static/script/common.js";
  // import {login} from "../frontEnd/static/script/login.js";

  export default {
    name: 'UserLogin',
    data: function () {
      return {
        username: '王者荣耀',//用户名称
        password: '123456',//用户密码
        identifyCode: '',//生成的验证码
        jpgVerify: '',//输入的验证码
        f1: false, //判断用户账号和密码输入是否正确
        f2: false, //判断验证码是否输入正确
      }
    },
    //默认调用
    created: function () {
      //默认调用验证码
      this.changeCount();
    },
    methods: {
      //登录
      dosubmit: function () {
        this.check01();
        if (this.f1 == true) {
          this.check02();
          if (this.f2 == true) {

            let url = this.axios.urls.user_userLogin;
            this.axios.post(url, {
              nickname: this.username,
              userpassword: this.password
            }).then((resp) => {
              if (0 == resp.data.code) {//登录成功！
                this.$message({
                  message: resp.data.message,
                  type: 'success'
                });
                //给vuex中nickname、pathUserId、headImage赋值
                this.$store.commit('setNickname', {
                  nickname: this.username
                });
                this.$store.commit('setPathUserId', {
                  pathUserId: resp.data.result.userid
                });
                this.$store.commit('setHeadImage', {
                  headImage: resp.data.result.headimage
                });

                // console.log("sss:", this.username);
                // console.log("sssddd:", this.$store.getters.nickname);
                // console.log("sss:", resp.data.result.userid);

                this.$store.commit('setMyPath', {
                  myPath: null
                });
                //跳转主页
                location.href = "/";

              } else {
                this.$message.error(resp.data.message);
              }
            }).catch((error) => {
            });
          }
        }
        // else {
        //   this.changeCount;
        // }
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
      //验证登录时的用户名和密码
      check01: function () {
        this.f1 = false;
        if (this.username != null && this.username != '') {
          if (this.password != null && this.password != '') {
            if (this.username.length >= 2 && this.username.length <= 16) {
              if (this.password.length >= 6 && this.password.length <= 18) {
                this.f1 = true;
              } else {
                this.$message({
                  message: '请输入6~18位数的密码！',
                  type: 'warning'
                });
              }
            } else {
              this.$message({
                message: '请输入2~16位数的用户名！',
                type: 'warning'
              });
            }
          } else {
            this.$message({
              message: '密码不能为空！',
              type: 'warning'
            });
          }
        } else {
          this.$message({
            message: '用户名不能为空！',
            type: 'warning'
          });
        }
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
      //用户注册
      register: function () {
        this.$router.replace({
          path: '/Register1'
        });
      },
      //忘记密码
      findPassword: function () {
        this.$router.replace({
          path: '/FindPassword'
        });
      }

    }
  }
</script>

<style scoped>
  @import "../frontEnd/static/css/common.css";
  @import "../frontEnd/static/css/register.css";

  .myCss01 {
    color: darkblue;
  }

  .myCss02 {
    margin-left: 5px;
    color: gray;
  }

  /*验证码样式*/
  .code {
    width: 124px;
    height: 31px;
    border: 1px solid rgba(186, 186, 186, 1);
  }

  .login-code {
    cursor: pointer;
  }

  .myLink01 {
    width: 55px;
    font-size: 22px;
    color: darkblue;
    margin-left: 10px;
  }


</style>
