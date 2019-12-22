<template>
  <header>

    <!--登录和注册-->
    <div class="wrap">
      <form id="LonginForm" name="LonginForm" action="" method="post">
        <div class="tdbModule loginPage">
          <div class="registerTitle">重新设置密码</div>
          <div class="registerCont">
            <ul>
              <br/>
              <li>
                <span class="dis">用户名：</span>
                <input class="input" type="text" v-model="username" readonly="readonly" tabindex="1" autocomplete="off">
              </li>
              <li>
                <span class="dis">新密码：</span>
                <input class="input" type="password" v-model="newPassword" tabindex="1" autocomplete="off">
              </li>
              <li>
                <span class="dis">确认密码：</span>
                <input class="input" type="password" v-model="rePassword" tabindex="1" autocomplete="off">
              </li>
              <li class="btn">
                <el-row>
                  <el-button type="success" @click="onsubmit()" style="width: 200px;" size="medium">确认提交</el-button>
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
    name: 'ResetPassword',
    data: function () {
      return {
        username: this.$store.getters.tempName,//用户名称
        newPassword: null,//用户新密码
        rePassword: null,//确认密码
        f1: false//判断是否验证正确
      }
    },
    methods: {
      //文本框验证
      check01: function () {
        this.f1 = false;
        //验证用户名称
        if (this.username == null || this.username == "") {
          this.$message({
            message: '用户名称不能为空！',
            type: 'warning'
          });
          return false;
        }
        if (this.username.length < 2 || this.username.length > 16) {
          this.$message({
            message: '请输入2~16位数的用户名称！',
            type: 'warning'
          });
          return false;
        }
        //验证用户密码
        if (this.newPassword == null || this.newPassword == '') {
          this.$message({
            message: '用户密码不能为空！',
            type: 'warning'
          });
          return false;
        }
        if (this.newPassword.length < 6 || this.newPassword.length > 18) {
          this.$message({
            message: '请输入6~18位数的密码！',
            type: 'warning'
          });
          return false;
        }
        //确认密码验证
        if (this.rePassword == null || this.repassword == '') {
          this.$message({
            message: '确认密码不能为空！',
            type: 'warning'
          });
          return false;
        }
        if (this.rePassword != this.newPassword) {
          this.$message({
            message: '两次输入的密码不一致！',
            type: 'warning'
          });
          return false;
        }

        this.f1 = true;
      },
      //提交验证
      onsubmit: function () {
        this.check01();
        if (this.f1 == true) {
          //需要上传的参数
          var form01 = {
            nickname: this.username,
            userpassword: this.newPassword,
            userid: this.$store.getters.tempUserid
          }
          let url = this.axios.urls.user_editUserPwd;
          this.axios.post(url, form01).then((resp) => {
            if (0 == resp.data.code) {
              this.$message({
                message: resp.data.message,
                type: 'success'
              });
              //给用户名赋值一个临时值
              this.$store.commit('setTempName', {
                tempName: null
              });
              this.$store.commit('setTempUserid', {
                tempUserid: null
              });
              //跳转到登录页面
              this.$router.replace({
                path: "/UserLogin"
              });
            } else {
              this.$message.error(resp.data.message);
            }
          }).catch((error) => {
          });

          // this.$router.replace({
          //   path: '/UserLogin'
          // });
        }
      }
    }

  }
</script>

<style>
  @import "../frontEnd/static/css/common.css";
  @import "../frontEnd/static/css/register.css";


</style>
