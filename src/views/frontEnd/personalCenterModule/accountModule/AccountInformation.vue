<template>
  <header>
    <div class="personal-main" style="background-color: white">
      <link rel="stylesheet" type="text/css" href="css/fileupload.less.css">
      <div class="pmain-profile">
        <div class="pmain-welcome">
          <span class="fl">
          </span>
          <span class="fr">上次登录时间：
          2015-09-11 14:05:07 </span></div>
        <div class="pmain-user">
          <div class="user-head"> <span id="clickHeadImage" class="head-img" title="点击更换头像">
            <form method="post" action="">
              <input type="hidden" name="userPhotoUploadForm" value="userPhotoUploadForm">
              <span id="userPhotoUploadForm:photo"><img id="userPhotoUploadForm:photoImage"
                                                        src="../../static/images/touxiang.png" alt=""
                                                        style="width:88px;height:88px;z-index:0;"> <i class="headframe"
                                                                                                      style="z-index:0;"></i>-
              <div id="userPhotoUploadForm:shangchuan-btn" class="ui-fileupload ui-widget" style="z-index:0;">
                <div class="ui-fileupload-buttonbar ui-corner-top"><span
                  class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left ui-fileupload-choose"
                  role="button"><span class="ui-button-icon-left ui-icon ui-c ui-icon-plusthick"></span><span
                  class="ui-button-text ui-c"></span>
                  <input type="file" id="userPhotoUploadForm:shangchuan-btn_input"
                         name="userPhotoUploadForm:shangchuan-btn_input" style="z-index:0;">
                  </span></div>
                <div class="ui-fileupload-content ui-widget-content ui-corner-bottom">
                  <table class="ui-fileupload-files">
                    <tbody>
                    </tbody>
                  </table>
                </div>
              </div>
              </span>
              <input type="hidden" name="javax.faces.ViewState" id="javax.faces.ViewState"
                     value="2696547217205030168:-301641994240890871" autocomplete="off">
            </form>
            </span> <span class="head-icon"> <a href="#"><i title="第三方资金账户未认证" class="headiconbg headicon01"></i></a> <a
            href="#"><i class="headiconbg headicon2"></i></a> <a href="#"><i
            class="headiconbg headicon03"></i></a> </span></div>
          <div class="user-info user-info1">
            <ul>
              <li>用户名<span>tg_gpdt0139</span></li>
              <li>安全级别<span><i class="safe-level"><i class="onlevel" style="width:40%;"></i></i></span> <a
                href="#">[低]</a></li>
              <li>您还未开通第三方支付账户，请 <a class="pmain-log" href="#">立即开通</a>以确保您的正常使用和资金安全。</li>
            </ul>
          </div>
        </div>
        <hr/>

        <div style="margin-left:350px;margin-right: auto;height: 50px;margin-top: 10px">
          <!--@click="AccountAdd()"-->
          <el-button type="primary" @click="dialogTableVisible=true">账户充值</el-button>
          <el-button type="success">账户提现</el-button>
        </div>

        <div class="pmain-money" style="height: 100px;margin-left: 100px">
          <ul>
            <li class="none"><span><em>账户总额</em><i id="zhze" class="markicon"></i><span class="arrow-show1"
                                                                                        style="display:none;">可用余额+待收本息</span><span
              class="icon-show1" style="display:none;"></span></span> <span class="truemoney"><i
              class="f26 fb">{{this.result.usableamount}}</i> 元</span></li>
            <li><span><em>冻结金额</em><i id="dsbx" class="markicon"></i><span class="arrow-show2" style="display:none;">正在进行投标的资金是不可用的</span><span
              class="icon-show2" style="display:none;"></span></span> <span class="truemoney"><i
              class="f26 fb">{{this.result.freezedamount}}</i>元</span></li>
            <li><span><em>可用金额</em><i id="ljsy" class="markicon"></i><span class="arrow-show3" style="display: none;">账户目前可以立马提现使用的资金</span><span
              class="icon-show3" style="display: none;"></span></span> <span class="truemoney"><i class="f26 fb c-pink">{{this.result.usableamount}}</i> 元</span>
            </li>
          </ul>
        </div>

        <div class="pmain-money" style="height: 100px;margin-left: 100px">
          <ul>
            <li class="none"><span><em>待收利息</em><i class="markicon"></i><span class="arrow-show4"
                                                                              style="display:none;">利息总额</span><span
              class="icon-show4" style="display:none;"></span></span> <span class="truemoney"><i
              class="f26 fb">{{this.result.unreceiveinterest}}</i> 元</span></li>
            <li><span><em>待收本金</em><i class="markicon"></i><span class="arrow-show5"
                                                                 style="display:none;">未到账的投资项目的本金总额</span><span
              class="icon-show5" style="display:none;"></span></span> <span class="truemoney"><i
              class="f26 fb">{{this.result.unreceiveprincipal}}</i>元</span></li>
            <li><span><em>待还本息</em><i class="markicon"></i><span class="arrow-show6"
                                                                 style="display: none;">还款的本金+利息</span><span
              class="icon-show6" style="display: none;"></span></span> <span class="truemoney"><i class="f26 fb c-pink">{{this.result.unreturnamount}}</i> 元</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr/>

    <div style="margin-left: 10px;background-color: white">
      <div style="margin-left: 10px; margin-top:10px;">
        <img src="../../static/imgzy/实名认证图片.jpg">
        <div style="margin-top:-85px; margin-left: 370px;">
          <strong style="font-size: 20px;">实名认证</strong>
          <!-- 判断是否认证-->
          <div style="margin-left: -5px;margin-top: 35px;">
            <span style="font-size: 14px">实名认证之后才能在平台投资</span>
          </div>
          <!--判断是否登录-->
          <div v-if="id == false" style="margin-top: 7px;margin-left: -60px;">
            <span style="font-size: 20px;">未认证</span>
            <a href="javascript:void(0)" title="马上认证" style="font-size: 20px;color: #2a8aa3">马上认证</a>
          </div>
          <div v-if="id == true" style="margin-top: 7px;margin-left: -60px;">
            <span style="font-size: 20px;">已实名     </span>
            <a href="javascript:void(0)" title="查看" style="font-size: 20px;color: #2a8aa3">查看</a>
          </div>

        </div>
      </div>
      <div style="margin-left: 560px; margin-top: -115px;">
        <img src="../../static/imgzy/银行卡认证图片.jpg" style="border-radius: 25px;">
        <div style="margin-top:-100px; margin-left: 130px;">
          <strong style="font-size: 20px">银行卡认证</strong>
          <div style="margin-left: -5px;margin-top: 35px;">
            <span style="font-size: 14px">银行卡认证后才能在平台借款投资</span>
          </div>
          <!--判断是否登录-->
          <div v-if="id == false" style="margin-top: 10px;margin-left: -40px;">
            <span style="font-size: 20px;">未认证</span>
            <a href="javascript:void(0)" title="马上认证" style="font-size: 20px;color: #2a8aa3">马上认证</a>
          </div>

          <div v-if="id == true" style="margin-top: 20px;margin-left: -40px;">
            <span style="font-size: 20px;">已认证     </span>
            <a href="javascript:void(0)" title="查看" style="font-size: 20px;color: #2a8aa3">查看</a>
          </div>
        </div>
      </div>
      <div style="margin-left: 900px; margin-top: -135px;">
        <img src="../../static/imgzy/材料认证图片.jpg" stzyle="border-radius: 15px;">
        <div style="margin-top:-100px; margin-left: 140px;">
          <strong style="font-size: 20px">材料认证</strong>
          <div style="margin-left: -5px;margin-top: 35px;">
            <span style="font-size: 14px">材料认证之后才能在平台上借款</span>
          </div>
          <!--判断是否登录-->
          <div v-if="id == false" style="margin-top: 5px;margin-left: -60px;">
            <span style="font-size: 20px;">未认证</span>
            <a href="javascript:void(0)" title="马上认证" style="font-size: 20px;color: #2a8aa3">马上认证</a>
          </div>
          <div v-if="id == true" style="margin-top: 5px;margin-left: -60px;">
            <span style="font-size: 20px;">已实名     </span>
            <a href="javascript:void(0)" title="查看" style="font-size: 20px;color: #2a8aa3">查看</a>
          </div>
        </div>
      </div>

      <el-dialog title="充值界面" :visible.sync="dialogTableVisible" width="500px">
        <label>充值金额</label>
        <el-input v-model="usableamount"></el-input>
        <div style="margin-left: 150px; margin-top: 20px;">
          <el-button type="success" @click="chongzhi()">充值</el-button>
          <el-button type="success" @click="dialogTableVisible=false">取消</el-button>
        </div>
      </el-dialog>
    </div>

  </header>
</template>

<script>
  import {jquery} from "../../static/script/jquery.min";
  import {common} from "../../static/script/common";
  import {user} from "../../static/script/user";

  export default {
    data: function () {
      return {
        accountid: this.$store.getters.pathUserId,
        usableamount: '',
        dialogTableVisible: false,
        id: false,
        result: [],
      }
    },
    methods: {
      do() {
        var url = this.axios.urls['ACCOUNT_SELECTBYPRIMARYKEY'];
        this.axios.post(url, {
          accountid: this.$store.getters.pathUserId
        }).then((response) => {
          console.log(response);
          if (0 === response.data.code) {
            this.result = response.data.result;
            // this.$message({
            //   // message: response.data.message,
            //   //type: 'success'
            // });
          }
          // this.search();
        }).catch(function (error) {
          console.log(error);
        });

      },
      chongzhi: function () {
        var url = this.axios.urls['ACCOUNT_ADDUSABLEAMOUNT'];
        this.axios.post(url, {
          accountid: this.accountid,
          usableamount: this.usableamount
        }).then((response) => {
          console.log(response);
          this.do();
          this.dialogTableVisible = false;
          this.$message({
            message: "充值成功",
            type: 'success'
          })
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    created() {
      if (this.$store.getters.pathUserId != null && this.$store.getters.pathUserId != "") {
        this.id = true;
      }
      console.log(this.$store.getters.pathUserId);
      this.do();


    }
  }
</script>

<style scoped>
  @import "../../static/css/common.css";
  @import "../../static/css/user.css";

  .ui-fileupload-choose {
    background: none;
    width: 90px;
    height: 90px;
    border: 0px none;
  }

  .ui-fileupload-choose input {
    width: 100%;
    height: 100%;
  }

  .ui-icon {
    background: none;
    width: 0px;
    height: 0px;
  }

  /*.img{*/
  /*height: 130px;*/
  /*width: 80px;*/
  /*}*/
</style>
