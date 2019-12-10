<template>
  <el-menu :unique-opened="true" router :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen"
           @close="handleClose" background-color="#334157" text-color="#fff" active-text-color="#ffd04b"
           :collapse="collapsed"
           :collapse-transition="bb">
    <div class="logobox">
      <img class="logoimg" src="../assets/img/logo.png" alt="">
    </div>
    <el-submenu v-for="(t, index1) in treeNodeList" :key="index1" :index="'index-'+index1">
      <template slot="title">
        <i :class="t.rightIcon"></i>
        <span>{{t.rightText}}</span>
      </template>
      <el-menu-item v-for="(childrens, index2) in t.children" :key="index2" :index="childrens.rightUrl">
        <template slot="title">
          <i :class="childrens.rightIcon"></i>
          <span>{{childrens.rightText}}</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>

</template>
<script>
  export default {
    data: function () {
      return {
        bb: true,
        collapsed: false,
        treeNodeList: []
      };
    },
    created: function () {
      this.$root.Bus.$on("aside-toggle", (v) => {
        this.collapsed = v;
      });

      //查询所有root权限信息
      let url = this.axios.urls.sys_right_rootSelect;
      // let id = this.$store.getters.userid;
      this.axios.post(url, {}).then((resp) => {
        if (resp.data.code == 0) {
          this.treeNodeList = resp.data.result;
        }
      }).catch((error) => {
      });

      //根据用户分权限
      // let id = this.$store.getters.userid;
      // this.axios.post(url, {
      // 	userid: id
      // }).then((resp) => {
      // 	this.treeNodeList = resp.data.result;
      // }).catch((error) => {});

      // if (this.$store.getters.myid == null) {
      //   this.$router.push({
      //     path: '/Img'
      //   });
      //   this.$store.commit('setMyid', {
      //     myid: 0
      //   });
      // }

    },
    methods: {
      handleOpen:function () {

        // console.log("username的值01：" + this.$store.getters.username);
      },
      handleClose: function () {
        
      }
    }
  }
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 400px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    border: none;
    text-align: left;
  }

  .el-menu-item-group__title {
    padding: 0px;
  }

  .el-menu-bg {
    background-color: #1f2d3d !important;
  }

  .el-menu {
    border: none;
  }

  .logobox {
    height: 40px;
    line-height: 40px;
    color: #9d9d9d;
    font-size: 20px;
    text-align: center;
    padding: 20px 0px;
  }

  .logoimg {
    height: 40px;
  }

  /*.asdd{*/
  /*background-color: #08a3ea;*/
  /*}*/
</style>
