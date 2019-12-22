<template>
  <header>
    <!-- 面包屑导航 -->
    <div style="margin-top: 30px;background-color: white">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item style="font-size: 24px;">首页</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 24px;">我的账户</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 24px;">个人资料</el-breadcrumb-item>
      </el-breadcrumb>
    </div>


    <div style="margin-top: -690px;height: 600px;background-color: white">
      <span style="font-size: 26px;margin-left: 360px;">个人信息填写</span>
      <div style="margin-top:20px; ">
        <span class="span" style="margin-left: 230px;">用户名</span><span  style="margin-left: 60px;font-size: 20px;">罗志祥</span>
      </div>
      <div style="margin-top:20px; ">
        <span class="span" style="margin-left: 210px;">真实姓名</span><span style="margin-left: 60px;">未认证</span>
        <a href="javascript:void(0);">[马上认证]</a>
      </div>
      <div style="margin-top:20px; ">
        <span class="span" style="margin-left: 190px;">身份证号码</span><span style="margin-left: 60px;width: 350px; height: 50px;">未认证</span>
        <a href="javascript:void(0);">[马上认证]</a>
      </div>
      <div style="margin-top:20px;">
        <span class="span" style="margin-left: 210px;">个人学历</span>
      </div>
      <div style="margin-left: 610px;margin-top: -30px">
        <el-dropdown size="medium" split-button type="primary">
          中等尺寸
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>

      <div style="margin-top:30px;" >
        <span class="span" style="margin-left: 230px;">月收入</span>
      </div>
      <div style="margin-left: 610px;margin-top: -30px">
        <el-dropdown size="medium" split-button type="primary">
          中等尺寸
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
      <div style="margin-top:30px; ">
        <span class="span" style="margin-left: 240px;">婚姻</span>
      </div>
      <div style="margin-left: 610px;margin-top: -30px">
        <el-dropdown size="medium" split-button type="primary">
          中等尺寸
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
      <div style="margin-top:30px; ">
        <span class="span" style="margin-left: 240px;">子女</span>
      </div>
      <div style="margin-left: 610px;margin-top: -30px">
        <el-dropdown size="medium" split-button type="primary">
          中等尺寸
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
      <div style="margin-top:30px; ">
        <span class="span">住房条件</span>
      </div>
      <div style="margin-left: 610px;margin-top: -30px">
        <el-dropdown size="medium" split-button type="primary">
          中等尺寸
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div style="margin-left: 80px;margin-top: 30px">
        <el-button type="success" plain style="text-align: center;margin-left: 320px;height: 50px;width:120px;font-size: 18px">保存数据</el-button>
      </div>
    </div>



  </header>
</template>

<script>
  export default {
    data: function () {
      return {}
    },
    created() {
    },
    methods: {}
  }
</script>

<style>
</style>
