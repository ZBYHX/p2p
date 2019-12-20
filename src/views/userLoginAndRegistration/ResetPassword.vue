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
                <input class="input" type="text" v-model="username" tabindex="1" autocomplete="off">
              </li>
              <li>
                  <span class="dis">新密码：</span>
                  <input class="input" type="password" v-model="newPassword"  tabindex="1" autocomplete="off">
              </li>
              <li>
                <span class="dis">确认密码：</span>
                <input class="input" type="password" v-model="rePassword"  tabindex="1" autocomplete="off">
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
        username: null,
        newPassword: null,
        rePassword: null
      }
    },
    methods: {
      //提交验证
      onsubmit: function () {
        this.$router.replace({
          path: '/UserLogin'
        })
      }
    }

  }
</script>

<style>
  @import "../frontEnd/static/css/common.css";
  @import "../frontEnd/static/css/register.css";


</style>
