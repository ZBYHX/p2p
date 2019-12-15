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
        <el-select v-model="queryForm.right_type" placeholder="请选择权限的类型">
          <el-option key="aa" index="aa" label="所有权限类型" value="">
          </el-option>
          <el-option v-for="(item, index) in types" :key="index" :index="index" :label="item.right_type" :value="item.right_type">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search()">&emsp;搜&emsp;索&emsp;</el-button>
        <!-- <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible=true">添加</el-button> -->
        <!-- <el-button size="small" type="primary" icon="el-icon-plus" @click="doOpenDialog()">添加</el-button> -->
      </el-form-item>
    </el-form>

    <!-- 数据表格-->
    <el-table :data="result" border style="width: 100%" height="400">
      <el-table-column type="index" label="序" :index="indexMethod" min-width="" align="center">
      </el-table-column>
      <el-table-column prop="right_text" label="权限名称" min-width="16">
      </el-table-column>
      <el-table-column prop="right_type" label="权限类型" min-width="16">
      </el-table-column>
      <el-table-column prop="right_icon" label="权限图标" min-width="15">
        <!-- <template slot-scope="scope">
                    <span icon="scope.right_icon"></span>
                </template> -->
      </el-table-column>
      <el-table-column prop="right_url" label="权限对应的URL" min-width="20">
      </el-table-column>
      <el-table-column prop="right_tip" label="权限提示" min-width="30">
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
    <!-- 添加和编辑操作 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" @close="handleDialogClose">
      <el-form :model="mergeForm" :rules="mergeFormRules" ref="mergeForm" :label-position="labelPosition" label-width="120px">
        <el-form-item label="权限名称" prop="right_text">
          <el-input v-model="mergeForm.right_text" placeholder="请输入权限名称"></el-input>
        </el-form-item>
        <el-form-item label="权限类型" prop="right_type">
          <el-input v-model="mergeForm.right_type" placeholder="请输入权限的类型"></el-input>
        </el-form-item>
        <el-form-item label="权限图标" prop="right_icon">
          <el-input v-model="mergeForm.right_icon" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="权限的URL" prop="right_url">
          <el-input v-model="mergeForm.right_url" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="权限提示" prop="right_tip">
          <el-input type="textarea" rows="2" maxlength="50" show-word-limit v-model="mergeForm.right_tip" placeholder="请输入权限的提示内容"></el-input>
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
          right_type: null, //权限类型
          right_text: null, //权限名称
          current_page: 1, //当前显示页码数
          page_size: 8, //每页显示的最大行数
          total_count: 0 //数据的总记录数
        },
        queryForm2: {
          right_type: null, //权限类型
          right_text: null, //权限名称
        },
        result: [], //数据的结果集
        dialogVisible: false, //弹出框的显示判断
        dialogTitle: '模块修改', //弹出框的名称
        labelPosition: 'left', //弹出框中文字标签的位置
        mergeForm: {
          right_code: null, //权限ID
          right_parent_code: null, //父权限ID
          right_text: null, //权限名称
          right_type: null, //权限类型
          right_icon: null, //权限图标
          right_url: null, //权限对应的URL
          right_tip: null //权限提示
        },
        mergeFormRules: { //表单验证
          right_text: [{
            required: true,
            message: '请输入权限名称',
            trigger: 'blur'
          }],
          right_type: [{
            required: true,
            message: '请选择权限类型',
            trigger: 'blur'
          }],
          right_icon: [{
            required: true,
            message: '请输入权限图标',
            trigger: 'blur'
          }],
          right_url: [{
            required: true,
            message: '请输入权限对应的URL',
            trigger: 'blur'
          }],
          right_tip: [{
            required: true,
            message: '请输入权限提示的信息',
            trigger: 'blur'
          }]
        },
        types: null, //用户查询的权限类型数组

      };
    },
    created: function() {
      this.search();
    },
    methods: {
      //编辑文本（行）
      handleEdit: function(index, row) {
        this.mergeForm.right_code = row.right_code;
        this.mergeForm.right_parent_code = row.right_parent_code;
        this.mergeForm.right_text = row.right_text;
        this.mergeForm.right_type = row.right_type;
        this.mergeForm.right_icon = row.right_icon;
        this.mergeForm.right_url = row.right_url;
        this.mergeForm.right_tip = row.right_tip;
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
        this.mergeForm.right_code = null;
        this.mergeForm.right_parent_code = null;
        this.mergeForm.right_text = null;
        this.mergeForm.right_type = null;
        this.mergeForm.right_icon = null;
        this.mergeForm.right_url = null;
        this.mergeForm.right_tip = null;
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
        if (this.queryForm.right_text != this.queryForm2.right_text || this.queryForm.right_type != this.queryForm2.right_type) {
          if (this.queryForm.right_text != null && this.queryForm.right_text != '') {
            this.queryForm.current_page = 1;
          }
          if (this.queryForm.right_type != null && this.queryForm.right_type != '') {
            this.queryForm.current_page = 1;
          }
        }

        this.queryForm2.right_text = this.queryForm.right_text;
        this.queryForm2.right_type = this.queryForm.right_type;

        let url01 = this.axios.urls.SYS_RIGHT_ALLlLIST;
        this.axios.post(url01, this.queryForm).then((resp) => {
          this.result = resp.data.result;
          this.queryForm.total_count = resp.data.rows;
        }).catch((error) => {});

        let url02 = this.axios.urls.SYS_RIGHT_ALLTYPES;
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
