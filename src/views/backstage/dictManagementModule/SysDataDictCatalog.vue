<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>基础管理</el-breadcrumb-item>
      <el-breadcrumb-item>数据字典目录</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索筛选 -->
    <el-form :inline="true" class="searchBox">
      <!--<el-form-item label="字典分类编号">-->
        <!--<el-select v-model="queryForm.dictcode" placeholder="请选择分类编号">-->
          <!--<el-option key="nn" index="nn" label="所有分类编号" value=""></el-option>-->
          <!--<el-option v-for="r in types" :key="r.dictcode" :label="r.dictcode" :value="r.dictcode">-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item label="字典分类名称">
        <el-input size="small" v-model="queryForm.titlem" clearable placeholder="请输入搜索的字典分类名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible=true">添加</el-button>
        <!-- <el-button size="small" type="primary" icon="el-icon-plus" @click="doOpenDialog()">添加</el-button> -->

      </el-form-item>
    </el-form>

    <!-- 数据表格-->
    <el-table :data="result" ref="singleTable" style="width: 100%;" height="450">
      <el-table-column type="index" label="序" :index="indexMethod" min-width="" align="center">
      </el-table-column>
      <!--<el-table-column prop="dictcode" label="字典分类编码" min-width="20" align="center">-->
      <!--</el-table-column>-->
      <el-table-column prop="titlem" label="字典分类名称" min-width="20" align="center">
      </el-table-column>
      <el-table-column prop="mark" label="字典使用说明" min-width="20" align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="20" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" icon="el-icon-edit" @click="handleEdit(scope.row)" :disabled="scope.row.dictAbled">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 完整分页-->
    <el-pagination style="margin-top: 15px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="queryForm.current_page" :page-sizes="[10, 20, 30, 40]" :page-size="queryForm.page_size" layout="total, sizes, prev, pager, next, jumper"
                   :total="queryForm.total_count">
    </el-pagination>
    <!-- 添加和编辑操作 -->
    <el-dialog :titlem="dialogtitlem" :visible.sync="dialogVisible" width="40%" @close="handleDialogClose">
      <el-form :model="mergeForm" :rules="mergeFormRules" ref="mergeForm" :label-position="labelPosition" label-width="100px">
        <!--<el-form-item label="分类编码" prop="dictcode">-->
          <!--<el-input v-model="mergeForm.dictcode" placeholder="请输入字典分类编码"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="分类名称" prop="titlem">
          <el-input v-model="mergeForm.titlem" placeholder="请输入字典分类名称"></el-input>
        </el-form-item>
        <el-form-item label="使用说明" prop="mark">
          <el-input
            type="textarea"
            placeholder="请输入字典分类使用说明"
            v-model="mergeForm.mark"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="onSubmitMergeForm()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        queryForm: {
          current_page: 1,
          page_size: 10,
          total_count: 0,
          dictid: '',
          titlem: null,
          dictcode:null,
          // dictItem: null,
          // dictValue: null
        },
        queryForm2: {
          titlem: null,
          dictcode:null,
          // dictItem: null,
          // dictValue: null
        },
        result: [],
        dialogVisible: false,
        dialogtitlem: '数据字典目录添加',
        labelPosition: 'left',
        mergeForm: {
          dictid: null,
          dictcode: null,
          titlem: null,
          mark: null,
          // dictName: null,
          body: null,
          // dictiseDitable: null
        },
        mergeFormRules: {
          dictcode: [{
            required: true,
            message: '请输入字典分类编码',
            trigger: 'blur'
          }],
          titlem: [{
            required: true,
            message: '请输入字典分类名称',
            trigger: 'blur'
          }],
          mark: [{
            required: true,
            message: '请输入字典使用说明',
            trigger: 'blur'
          }]
        },
        types: []

      };
    },
    created: function() {
      this.search();
    },
    methods: {

      //编辑文本（行）
      handleEdit: function(row) {
        console.log('handleEdit');
        this.mergeForm.dictid = row.dictid,
        this.mergeForm.dictcode = row.dictcode,
        this.mergeForm.titlem= row.titlem,
        this.mergeForm.mark = row.mark,
        this.dialogVisible = true,
        this.dialogtitlem = '数据字典目录修改';
      },
      //删除文本（行）
      handleDelete: function(row) {
        console.log('handleDelete');

        this.$confirm('你确定要删除这条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = this.axios.urls.sys_dict_dictDel;
          this.axios.post(url, {
            dictid: row.dictid
          }).then((resp) => {
            this.$message({
              message: resp.data.message,
              type: 'success'
            });
            this.search();
          }).catch((error) => {});

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

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
          console.log('onSubmitMergeForm');

          let url = this.axios.urls.sys_dict_dictMerge;
          this.axios.post(url, this.mergeForm).then((resp) => {
            this.$message({
              message: resp.data.message,
              type: 'success'
            });
            if (null == this.mergeForm.dictid) {
              this.handleDialogClose();
              /* this.doOpenDialog(); */
            }
            this.search();

          }).catch((error) => {});
        });
      },
      //dialog对话框的关闭事件
      handleDialogClose: function() {
        console.log('handleDialogClose......');

        this.$refs['mergeForm'].resetFields(); //清空验证信息
        this.doClearMergeForm();
      },
      //清空表单中的数据
      doClearMergeForm: function() {
        this.mergeForm.dictid = null, //清空后台提交表单数据
        this.mergeForm.dictcode = null,
        this.mergeForm.titlem = null,
        this.mergeForm.mark=null,
          // this.mergeForm.dictiseDitable=null,
          // this.mergeForm.dictId = row.dictId;
          // this.mergeForm.dictType = row.dictType;
          // this.mergeForm.dictItem= row.dictItem;
          // this.mergeForm.dictValue = row.dictValue;
          // this.mergeForm.dictiseDitable = row.dictiseDitable;

          // this.$refs['mergeForm'].resetFields(); //清空验证信息

          this.dialogtitlem = '基础字典添加';
      },
      /* doOpenDialog: function(row) {
        console.log('row的值为：' + row);
        if (!row) {
          this.mergeForm.id = null;
          this.mergeForm.titlem = null;
          this.mergeForm.body = null;
          console.log('--------------------');
        }else{
          this.mergeForm.id = row.id;
          this.mergeForm.titlem = row.titlem;
          this.mergeForm.body = row.body;
        }
        this.dialogVisible = true;
      }, */
      //更改每页显示行数
      handleSizeChange(total) {
        console.log('rows=%i', total);
        this.queryForm.page_size = total;
        this.queryForm.current_page = 1;
        this.search();
      },
      //更改当前页码数
      handleCurrentChange(page_size) {
        console.log('page=%i', page_size);
        this.queryForm.current_page = page_size;
        this.search();
      },
      //搜索
      search: function() {
        if (this.queryForm2.titlem != this.queryForm.titlem ||  this.queryForm2.dictcode != this.queryForm.dictcode){
          if (this.queryForm.titlem != null && this.queryForm.titlem != ''){
            this.queryForm.current_page = 1;
          }
          if (this.queryForm.dictcode != null && this.queryForm.dictcode != '') {
            this.queryForm.current_page = 1;
          }
        }
        this.queryForm2.titlem = this.queryForm.titlem;



        let url = this.axios.urls.sys_dict_dictSelect;
        this.axios.post(url, this.queryForm).then((resp) => {
          this.result = resp.data.result;
          this.queryForm.total_count = resp.data.total;
          // if (this.types.length == 0) {
          // this.types = resp.data.types;
          // }
        }).catch((error) => {});


      }

      // handleEdit: function() {

      // },

      // SelStore
      // SelProData
      // DataAndDict


      //market
      //Customerplan
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
