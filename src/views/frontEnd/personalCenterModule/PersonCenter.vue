<template>
  <header>
    <div class="wrapper wbgcolor">
      <div class="w1200 personal">
        <div class="credit-ad">
          <img src="../static/images/clist1.jpg" width="1200" height="96">
        </div>
        <div id="personal-left" class="personal-left">
          <ul>
            <!--我的账户-->
            <li>
              <span class="myCss01">我&ensp;的&ensp;账&ensp;户</span>
            </li>
            <li id="t1" @click="clickShow('t1', 'AccountInformation')">
              <span>
                <a href="javascript:void(0);">
                  <i class="el-icon-s-home"
                     style="color: lightgrey">&emsp;</i>账户信息</a>
              </span>
            </li>
            <li id="t2" @click="clickShow('t2', 'RealNameAuthentication')">
              <span>
                <a href="javascript:void(0);">
                  <i class="dot dot08"></i>实名认证 </a>
              </span>
            </li>
            <li id="t3" @click="clickShow('t3', 'CardAuditentication')">
              <span>
                <a href="javascript:void(0);">
                  <i class="dot dot09"></i>银行卡认证</a>
              </span>
            </li>
            <li id="t4" @click="clickShow('t4', 'DataAuthentication')">
              <span>
                <a href="javascript:void(0);">
                  <i class="dot dot02"></i>材料认证
                </a>
              </span>
            </li>
            <li id="t5" @click="clickShow('t5', 'LoginRecord')" style="position:relative;" class="">
              <span>
                <a href="javascript:void(0);">
                  <i class="dot dot06"></i> 登录记录 </a>
              </span>
            </li>
            <li id="t6" @click="clickShow('t6', 'PersonalData')" style="position:relative;" class="">
              <span>
                <a href="javascript:void(0);">
                  <i class="dot dot06"></i> 个人资料 </a>
              </span>
            </li>
            <!--借贷项目-->
            <li>
              <span class="myCss01">借&ensp;贷&ensp;项&ensp;目</span>
            </li>
            <li id="t7" @click="clickShow('t7', 'TenderDetails')">
              <span>
                <a href="javascript:void(0);">
                  <i class="el-icon-menu" style="color: lightgrey;">&emsp;</i>投标明细</a>
              </span>
            </li>
            <li id="t8" @click="clickShow('t8', 'CollectionDetails')">
              <span>
                <a href="javascript:void(0);">
                  <i class="el-icon-menu" style="color: lightgrey;">&emsp;</i>收款明细</a>
              </span>
            </li>
            <li id="t9" @click="clickShow('t9', 'LoanProject')">
              <span>
                <a href="javascript:void(0);">
                  <i class="el-icon-menu" style="color: lightgrey;">&emsp;</i>借款项目</a>
              </span>
            </li>
            <li id="t10" @click="clickShow('t10', 'ReimbursementDetail')">
              <span>
                <a href="javascript:void(0);">
                  <i class="el-icon-menu" style="color: lightgrey;">&emsp;</i>还款明细</a>
              </span>
            </li>
            <!--资产明细-->
            <li>
              <span class="myCss01">资&ensp;产&ensp;明&ensp;细</span>
            </li>
            <li id="t11" @click="clickShow('t11', 'AccountWater')">
              <span>
                <a href="javascript:void(0);">
                  <i class="el-icon-menu" style="color: lightgrey;">&emsp;</i>账户流水</a>
              </span>
            </li>
            <li id="t12" @click="clickShow('t12', 'TopUpDetail')">
              <span>
                <a href="javascript:void(0);" @click="">
                  <i class="dot dot03"></i>充值明细
                </a>
              </span>
            </li>
          </ul>
        </div>

        <!--路由区域-->
        <router-view></router-view>


      </div>
    </div>
  </header>
</template>

<script>

  export default {
    name: "PersonCenter",
    data: function () {
      return {}
    },
    created() {
      var cc = this.$store.getters.myPersonId
      if (cc == null) {
        this.clickShow('t1', 'AccountInformation');//默认跳转到账户信息
        this.$store.commit('setMyPersonId', {
          myPersonId: 't1'
        });
      } else {
        var pathh = 'AccountInformation';
        if (cc == 't1') {
          pathh = 'AccountInformation';
        } else if(cc == 't2') {
          pathh = 'RealNameAuthentication';
        }else if(cc == 't3') {
          pathh = 'CardAuditentication';
        }else if(cc == 't4') {
          pathh = 'DataAuthentication';
        }else if(cc == 't5') {
          pathh = 'LoginRecord';
        }else if(cc == 't6') {
          pathh = 'PersonalData';
        }else if(cc == 't7') {
          pathh = 'TenderDetails';
        }else if(cc == 't8') {
          pathh = 'CollectionDetails';
        }else if(cc == 't9') {
          pathh = 'LoanProject';
        }else if(cc == 't10') {
          pathh = 'ReimbursementDetail';
        }else if(cc == 't11') {
          pathh = 'AccountWater';
        }else if(cc == 't12') {
          pathh = 'TopUpDetail';
        }
        this.clickShow(cc, pathh);
      }

    },
    methods: {
      //点击左侧导航栏按钮显示
      clickShow: function (count, pathy) {
        //在vuex中赋值
        this.$store.commit('setMyPersonId', {
          myPersonId: count
        });
        //清空样式
        this.clearSty();
        $("#" + count).addClass("myCss03");
        this.$router.replace({
          path: "/" + pathy
        });
      },
      //清除左侧导航栏样式
      clearSty: function () {
        for (let i = 0; i < 20; i++) {
          $("#t" + i).removeClass("myCss03");
        }
      },
    }

  }
</script>

<style scoped>
  @import "../static/css/common.css";
  @import "../static/css/user.css";

  .myCss01 {
    text-align: center;
    font-weight: bold;
    color: darkblue;
    font-size: 18px;
    background-color: whitesmoke;
    border: 1px solid lightgrey;
    border-radius: 6px;
  }

  .personal-left ul li:hover {
    background-color: lightgoldenrodyellow;
    font-weight: bold;
    color: black;
  }

  .invest-tab .on a {
    color: #fff;
  }

  .myCss02 {
    margin-left: -32px;
    color: lightgrey
  }

  .myCss03 {
    background-color: lightgoldenrodyellow;
    color: white;
    font-weight: bold;
  }
</style>
