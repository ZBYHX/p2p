<template>
  <header>
    <!--关于我们-->
    <div class="bg">
      <div class="contain" id="tabs" style="margin:0 auto;">
        <div class="text-nav">
          <ul class="clearfix">
            <li id="tt1" class="selected" @click="clickShow('t1')"><a class="text-link" href="javascript:void(0)">网站公告</a></li>
            <li id="tt2" @click="clickShow('t2')"><a class="text-link" href="javascript:void(0)">媒体报道</a></li>
            <li id="tt3" @click="clickShow('t3')"><a class="text-link" href="javascript:void(0)">公司简介</a></li>
            <li id="tt4" @click="clickShow('t4')"><a class="text-link" href="javascript:void(0)">管理团队</a></li>
            <li id="tt5" @click="clickShow('t5')"><a class="text-link" href="javascript:void(0)">合作伙伴</a></li>
            <li id="tt6" @click="clickShow('t6')"><a class="text-link" href="javascript:void(0)">团队风采</a></li>
            <li id="tt7" @click="clickShow('t7')"><a class="text-link" href="javascript:void(0)">法律政策</a></li>
            <li id="tt8" @click="clickShow('t8')"><a class="text-link" href="javascript:void(0)">法律声明</a></li>
            <li id="tt9" @click="clickShow('t9')"><a class="text-link" href="javascript:void(0)">资费说明</a></li>
            <li id="tt10" @click="clickShow('t10')"><a class="text-link" href="javascript:void(0)">招贤纳士</a></li>
            <li id="tt11" @click="clickShow('t11')"><a class="text-link" href="javascript:void(0)">联系我们</a></li>
          </ul>
        </div>
        <div class="text-box">
          <div class="text-content" id="text-content">

            <!--路由展示部分-->
            <router-view />

          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import jquery from "../static/script/jquery.min";
  import common from "../static/script/common";

  export default {
    name: "AboutUs",
    data: function () {
      return {
        mycheck: null, //导航栏选择
      }
    },
    methods: {
      //点击显示
      clickShow: function (t) {
        this.clearSty();
        $("#t"+t).addClass("selected");
        this.$router.replace({
          path: "/"+t
        });
      },
      clearSty:function () {
        $("#tt1").removeClass("selected");
        $("#tt2").removeClass("selected");
        $("#tt3").removeClass("selected");
        $("#tt4").removeClass("selected");
        $("#tt5").removeClass("selected");
        $("#tt6").removeClass("selected");
        $("#tt7").removeClass("selected");
        $("#tt8").removeClass("selected");
        $("#tt9").removeClass("selected");
        $("#tt10").removeClass("selected");
        $("#tt11").removeClass("selected");
      }
    },
    created() {
      this.clickShow('t1');
    }
  }
</script>

<style scoped>
  @import "../static/css/common.css";
  @import "../static/css/about.css";

</style>
