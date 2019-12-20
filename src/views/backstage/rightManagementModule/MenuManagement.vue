<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索筛选 -->
    <el-form :inline="true" class="searchBox">
      <el-form-item label="名称">
        <el-input style="width: 300px;" clearable="" prefix-icon="el-icon-search" size="small" v-model="queryForm.right_text"
                  placeholder="模块名称"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="queryForm.rightType" placeholder="请选择权限的类型">
          <el-option key="aa" index="aa" label="所有权限类型" value="" >
          </el-option>
          <el-option v-for="(item, index) in types" :key="index" :index="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search()">&emsp;搜&emsp;索&emsp;</el-button>
        <!-- <el-button sizemall" type="primary" icon="el-icon-plus" @click="doOpenDialog()">添加</el-button> -->
      </el-form-item>
    </el-form>

    <!-- 数据表格-->
    <el-table :data="result" border style="width: 100%" height="400">
      <el-table-column type="index" label="序" :index="indexMethod" min-width="" align="center">
      </el-table-column>
      <el-table-column prop="rightText" label="权限名称" min-width="16">
      </el-table-column>
      <el-table-column prop="rightType" label="权限类型" min-width="16">
      </el-table-column>
      <el-table-column prop="rightIcon" label="权限图标" min-width="15">
      </el-table-column>
      <el-table-column prop="rightUrl" label="权限对应的URL" min-width="20">
      </el-table-column>
      <el-table-column prop="rightTip" label="权限提示" min-width="30">
      </el-table-column>
      <el-table-column label="操作" min-width="14" align="center">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 完整分页-->
    <el-pagination style="margin-top: 15px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="queryForm.current_page" :page-sizes="[8, 20, 30, 40]" :page-size="queryForm.page_size" layout="total, sizes, prev, pager, next, jumper"
                   :total="queryForm.total_count">
    </el-pagination>
    <!-- 编辑操作 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" @close="handleDialogClose">
      <el-form :model="mergeForm" :rules="mergeFormRules" ref="mergeForm" :label-position="labelPosition" label-width="120px">
        <el-form-item label="权限名称" prop="right_text">
          <el-input v-model="mergeForm.rightText" placeholder="请输入权限名称"></el-input>
        </el-form-item>
        <el-form-item label="权限类型" prop="right_type">
          <el-input v-model="mergeForm.rightType" placeholder="请输入权限的类型"></el-input>
        </el-form-item>
        <el-form-item label="权限图标" prop="rightIcon">
          <el-input v-model="mergeForm.rightIcon" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="权限的URL" prop="rightUrl">
          <el-input v-model="mergeForm.rightUrl" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="权限提示" prop="rightTip">
          <el-input type="textarea" v-model="mergeForm.rightTip" rows="2" maxlength="50" show-word-limit placeholder="请输入权限的提示内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button style="width: 20%;" type="primary" @click="onSubmitMergeForm()">确 定</el-button>
        <el-button style="width: 20%;" @click="dialogVisible=false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        queryForm: {
          rightType: null, //权限类型
          rightText: null, //权限名称
          current_page: 1, //当前显示页码数
          page_size: 8, //每页显示的最大行数
          total_count: 0 //数据的总记录数
        },
        queryForm2: {
          rightType: null, //权限类型
          rightText: null, //权限名称
        },
        result: [], //数据的结果集
        dialogVisible: false, //弹出框的显示判断
        dialogTitle: '模块修改', //弹出框的名称
        labelPosition: 'left', //弹出框中文字标签的位置
        mergeForm: {
          rightCode: null, //权限ID
          rightParentCode: null, //父权限ID
          rightText: null, //权限名称
          rightType: null, //权限类型
          rightIcon: null, //权限图标
          rightUrl: null, //权限对应的URL
          rightTip: null //权限提示
        },
        mergeFormRules: { //表单验证
          rightText: [{
            required: true,
            message: '请输入权限名称',
            trigger: 'blur'
          }],
          rightType: [{
            required: true,
            message: '请选择权限类型',
            trigger: 'blur'
          }],
          rightIcon: [{
            required: true,
            message: '请输入权限图标',
            trigger: 'blur'
          }],
          rightUrl: [{
            required: true,
            message: '请输入权限对应的URL',
            trigger: 'blur'
          }],
          rightTip: [{
            required: true,
            message: '请输入权限提示的信息',
            trigger: 'blur'
          }]
        },
        types: null //用户查询的权限类型数组

      };
    },
    created: function() {
      this.search();
    },
    methods: {
      //编辑文本（行）
      handleEdit: function(index, row) {
        this.mergeForm.rightCode = row.rightCode;
        this.mergeForm.rightParentCode = row.rightParentCode;
        this.mergeForm.rightText = row.rightText;
        this.mergeForm.rightType = row.rightType;
        this.mergeForm.rightIcon = row.rightIcon;
        this.mergeForm.rightUrl = row.rightUrl;
        this.mergeForm.rightTip = row.rightTip;
        this.dialogVisible = true;
      },
      //序列显示方法
      indexMethod(index) {
        // console.log("当前下标值index: "+index);
        return (this.queryForm.current_page - 1) * this.queryForm.page_size + (index + 1);
      },
      //表单提交(添加或者修改的使用)
      onSubmitMergeForm: function() {
        this.$refs['mergeForm'].validate((valid) => {
          if (false === valid) {
            return false;
          }
          let url = this.axios.urls.SYS_RIGHT_EDITONE;
          this.axios.post(url, this.mergeForm).then((resp) => {
            this.$message({
              message: resp.data.message,
              type: 'success'
            });
            // if (null == this.mergeForm.id) {
            // 	this.handleDialogClose();
            // }
            this.search();
          }).catch((error) => {});
        });

      },
      //dialog对话框的关闭事件
      handleDialogClose: function() {
        this.$refs['mergeForm'].resetFields(); //清空验证信息
        this.doClearMergeForm();
      },
      //清空表单中的数据
      doClearMergeForm: function() {
        this.mergeForm.rightCode = null;
        this.mergeForm.rightParentCode = null;
        this.mergeForm.rightText = null;
        this.mergeForm.rightType = null;
        this.mergeForm.rightIcon = null;
        this.mergeForm.rightUrl = null;
        this.mergeForm.rightTip = null;
      },
      //更改每页显示行数
      handleSizeChange(rows) {
        console.log('rows=%i', rows);
        this.queryForm.page_size = rows;
        this.queryForm.current_page = 1;
        this.search();
      },
      //更改当前页码数
      handleCurrentChange(page) {
        console.log('page=%i', page);
        this.queryForm.current_page = page;
        this.search();
      },
      //搜索
      search: function() {
        if (this.queryForm.rightText != this.queryForm2.rightText || this.queryForm.rightType != this.queryForm2.rightType) {
          if (this.queryForm.rightText != null && this.queryForm.rightText != '') {
            this.queryForm.current_page = 1;
          }
          if (this.queryForm.rightType != null && this.queryForm.rightType != '') {
            this.queryForm.current_page = 1;
          }
        }
        this.queryForm2.rightText = this.queryForm.rightText;
        this.queryForm2.rightType = this.queryForm.rightType;

        let url01 = this.axios.urls.sys_right_listAllRights;
        this.axios.post(url01, this.queryForm).then((resp) => {
          this.result = resp.data.result;
          this.queryForm.total_count = resp.data.total;
        }).catch((error) => {});

        let url02 = this.axios.urls.sys_right_selectAllType;
        this.axios.post(url02, {}).then((resp) => {
          this.types = resp.data.result;
        }).catch((error) => {});



      }
    }
  }
</script>


<style scoped>
  .searchBox {
    margin-top: 20px;
  }

  .userRole {
    width: 100%;
  }
</style>
