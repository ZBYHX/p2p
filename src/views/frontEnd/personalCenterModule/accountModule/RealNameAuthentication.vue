<template>
  <header>
    <!-- 面包屑导航 -->
    <div style="margin-top: 30px;background-color: white">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item style="font-size: 24px;">首页</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 24px;">我的账户</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 24px;">实名认证</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

  <div style="margin-left: 260px;margin-top: -670px;height: 600px;width: 900px;background-color: white">
   <span style="font-size: 22px;margin-left: 270px;"> 请选择你要上传的身份证正面图片</span>
    <div style="margin-left: 300px;margin-top: 10px">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>

    <span style="font-size: 22px;margin-left: 270px;"> 请选择你要上传的身份证反面图片</span>
    <div  style="margin-left: 300px;margin-top: 10px">
      <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    </div>

    <div style="margin-left:350px;margin-top: 10px">
      <el-button type="info" plain>取消<i class="el-icon-circle-close el-icon--right"></i></el-button>
      <el-button type="primary" plain>上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
  </div>


  </header>
</template>

<script>
  export default {
    data() {
      return {
        imageUrl: ''
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
  // export default {
  //   data: function () {
  //     return {}
  //   },
  //   created() {
  //   },
  //   methods: {}
  // }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 260px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }


</style>
