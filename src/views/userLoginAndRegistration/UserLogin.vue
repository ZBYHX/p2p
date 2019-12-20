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
            <!--<li class="error">-->
              <!--<span id="prrintInfo" data-info=""><span>请输入正确用户名</span></span>-->
            <!--</li>-->
            <li>
              <span class="dis">用户名：</span>
              <input class="input" type="text" v-model="username"  tabindex="1" autocomplete="off">
            </li>

            <li>
              <span class="dis">密&emsp;码：</span>
              <input class="input" type="password" v-model="password" placeholder="" maxlength="24" tabindex="1" autocomplete="off">
            </li>
            <li>
              <span class="dis">验证码：</span>
              <input type="text" v-model="jpgVerify" style="width:130px;"class="input" name="yzm" data-msg="验证码"
                     maxlength="4" tabindex="1" autocomplete="off">
              <img src="../frontEnd/static/images/code.jpg" id="yanzheng" alt="点击更换验证码" title="点击更换验证码"
                   style="cursor:pointer;" class="valign">
              <a @click="changeCount()" class="blue myCss01">看不清？换一张</a>
            </li>
            <li style="width: 400px;">
              <span class="dis"></span>
              <el-link type="primary" @click="register()" >用户注册</el-link>
              <el-link type="primary" @click="findPassword()" class="right" >忘记密码</el-link>
            </li>
            <li class="btn">
              <el-row>
                <el-button type="success" style="width: 200px;" size="medium" >立即登录</el-button>
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
        username: null,//用户名称
        password: null,//用户密码
        jpgVerify: null//验证码
      }
    },
    methods: {
      //登录
      dosubmit: function () {
        //登录成功！
        this.$router.replace({
          path: '/AppMain'
        });

      },
      //切换验证码
      changeCount: function () {

      },
      //用户注册
      register: function(){
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

</style>
