<template>
  <header>
    <!-- 面包屑导航 -->
    <div style="margin-top: 30px;background-color: white">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item style="font-size: 24px;">首页</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 24px;">我的账户</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 24px;">银行卡认证</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div style="margin-top: -690px;height: 600px;background-color: white">
      <span style="font-size: 26px;margin-left: 360px;">认证信息填写</span>
      <el-form ref="form" :model="form" label-width="80px">
        <div style="margin-top:15px; ">
          <span class="span">持卡人姓名:</span>
          <el-input style="margin-left: 60px;width: 350px; height: 50px;" clearable v-model="form.realname"
                    placeholder="请输入持卡人姓名"></el-input>
        </div>
        <div style="margin-top:15px; ">
          <span class="span">身份证号码:</span>
          <el-input style="margin-left: 60px;width: 350px; height: 50px;" clearable v-model="form.idnumber"
                    placeholder="请输入身份证号码"></el-input>
        </div>
        <div style="margin-top:15px; ">
          <span class="span">银行卡号:</span>
          <el-input style="margin-left: 80px;width: 350px; height: 50px;" clearable v-model="form.banknumber"
                    placeholder="请输入银行卡号"></el-input>
        </div>
        <div style="margin-top:15px; ">
          <span class="span">手机号码:</span>
          <el-input style="margin-left: 80px;width: 350px; height: 50px;" clearable v-model="form.phonenumber"
                    placeholder="请输入手机号码"></el-input>
          <!--<el-button size="small" type="info">发送验证码</el-button>-->
        </div>
        <!--<div style="margin-top:15px; ">-->
          <!--<span class="span">短信验证码:</span>-->
          <!--<el-input style="margin-left: 60px;width: 350px; height: 50px;" clearable v-model="input"-->
                    <!--placeholder="请输入短信验证码"></el-input>-->
        <!--</div>-->

        <div style="margin-left: 80px;margin-top: 30px">
          <el-button type="success" plain @click="cansle()"
                     style="text-align: center;margin-left: 200px;height: 50px;width:120px;font-size: 18px">取消认证
          </el-button>
          <el-button type="primary" plain
                     style="text-align: center;margin-left: 200px;height: 50px;width:120px;font-size: 18px"
                     @click="commit();">提交认证
          </el-button>
        </div>
      </el-form>
    </div>


  </header>
</template>

<script>
  export default {
    data: function () {
      return {
        form: {
          realname: null,
          idnumber: null,
          banknumber: null,
          phonenumber: null
        },
        result: []
      }
    },
    created() {
    },
    methods: {
      cansle:function(){
        this.form.realname='';
        this.form.idnumber='';
        this.form.banknumber='';
        this.form.phonenumber='';
      },
      commit: function () {
        console.log(this.$store.getters.pathUserId);
        var url = this.axios.urls['BANKCARD_ADDBANKCARD'];
        // accountid: this.$store.getters.pathUserId
        this.axios.post(url, this.form).then((response) => {
          console.log(response);
          if (0 === response.data.code) {
            this.result = response.data.result;
            this.$message({
              message: response.data.message,
              type: 'success'
            });
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>

<style>
  .span {
    text-align: center;
    font-size: 20px;
    margin-left: 200px;

  }
</style>
