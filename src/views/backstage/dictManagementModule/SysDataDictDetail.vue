<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>基础管理</el-breadcrumb-item>
      <el-breadcrumb-item>数据字典明细</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索筛选 -->
    <el-form :inline="true" class="searchBox">
      <el-form-item label="字典明细显示名称">
        <el-input size="small" v-model="queryForm.title" clearable placeholder="请输入搜索的字典明细显示名称"></el-input>
      </el-form-item>
      <el-form-item label="字典明细是否可用">
        <el-input size="small" v-model="queryForm.tvalue" clearable placeholder="请输入可用或者禁用"></el-input>
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
      <el-table-column prop="dictTypeName" label="字典类别" min-width="15" align="center">
      </el-table-column>
      <el-table-column prop="title" label="字典名称" min-width="25" align="center">
      </el-table-column>
      <el-table-column prop="dictItemName" label="字典是否可编辑 " min-width="20" align="center">
      </el-table-column>
      <el-table-column prop="sequence" label="字典明细在类中的排序" min-width="10" align="center">
      </el-table-column>
      <el-table-column prop="mark" label="字典分类使用说明" min-width="30" align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="25" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" icon="el-icon-edit" @click="handleEdit(scope.row)"
                     :disabled="scope.row.dictAbled">编辑
          </el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 完整分页-->
    <el-pagination style="margin-top: 15px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="queryForm.current_page" :page-sizes="[10, 20, 30, 40]"
                   :page-size="queryForm.page_size" layout="total, sizes, prev, pager, next, jumper"
                   :total="queryForm.total_count">
    </el-pagination>

    <!-- 添加和编辑操作 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="35%" @close="handleDialogClose">
      <el-form :model="mergeForm" :rules="mergeFormRules" ref="mergeForm" :label-position="labelPosition"
               label-width="100px">
        <!--<el-form-item label="明细名称" prop="dictid">-->
        <!--<el-input v-model="mergeForm.dictid" placeholder="请输入字典明细显示名称"></el-input>-->
        <!--</el-form-item>-->
            <!--<el-option key="nn" index="nn" label="所有明细名称" value=""></el-option>-->
            <!--<el-option v-for="r in types" :key="r.dictid" :label="r.dictid" :value="r.dictid">-->
        <el-form-item label="字典类型" prop="dictid">
          <el-select v-model="mergeForm.dictid" placeholder="请选择字典类型" clearable>
            <el-option v-for="r in types1" :label="r.titlem" :value="r.dictid" :key="r.dictid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典编码" prop="titleValue">
          <el-input v-model="mergeForm.titleValue" placeholder="请输入字典编码" clearable></el-input>
        </el-form-item>
        <el-form-item label="字典名称" prop="title">
          <el-input v-model="mergeForm.title" placeholder="请输入字典名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="字典排序" prop="sequence">
          <el-input v-model="mergeForm.sequence" placeholder="字典明细在该类中的排序" clearable></el-input>
        </el-form-item>
        <el-form-item label="字典说明" prop="mark" clearable>
          <el-input
            type="textarea"
            placeholder="请输入字典分类使用说明"
            v-model="mergeForm.mark"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="能否编辑" prop="tvalue">
          <!--<template>-->
          <!--<el-radio v-model="mergeForm.tvalue" label="1">是</el-radio>-->
          <!--<el-radio v-model="mergeForm.tvalue" label="0">否</el-radio>-->
          <!--</template>-->
          <div>
            <el-radio v-model="mergeForm.tvalue" label="可用" value="可用" border size="medium">可用</el-radio>
            <el-radio v-model="mergeForm.tvalue" label="禁用" value="禁用" border size="medium">禁用</el-radio>
          </div>
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
    data: function () {
      return {
        queryForm: {
          current_page: 1,
          page_size: 10,
          total_count: 0,
          dictitemid: '',
          title: null,
          titlem:null,
          dictid: null,
          tvalue: null
          // dictItem: null,
          // dictValue: null
        },
        queryForm2: {
          title: null,
          titlem:null,
          tvalue:null
          // dictItem: null,
          // dictValue: null
        },
        result: [],
        dialogVisible: false,
        dialogTitle: '数据字典明细添加',
        labelPosition: 'left',
        mergeForm: {
          dictItemName: null,
          dictitemid: null,
          title: null,
          titlem:null,
          tvalue: null,
          dictid: null,
          sequence: null,
          mark: null,
          // dictName: null,
          body: null,
          titleValue: null
          // dictiseDitable: null
        },
        mergeFormRules: {
          dictid: [{
            required: true,
            message: '请输入字典分类名称',
            trigger: 'change'
          }],
          sequence: [{
            required: true,
            message: '请输入字典明细在该类中的排序',
            trigger: 'blur'
          }],
          mark: [{
            required: true,
            message: '请输入字典使用说明',
            trigger: 'blur'
          }],
          tvalue: [{
            required: true,
            message: '请选择是否可编辑',
            trigger: 'changer'
          }],
          title: [{
            required: true,
            message: '请输入字典名称',
            trigger: 'blur'
          }],
          titleValue: [{
            required: true,
            message: '请输入字典编码',
            trigger: 'blur'
          }]
        },
        types: [],
        types1: []

      };
    },
    created: function () {
      this.search();
    },
    methods: {

      //编辑文本（行）
      handleEdit: function (row) {
        console.log('handleEdit');
        this.mergeForm.dictitemid = row.dictitemid,
          this.mergeForm.title = row.title,
          this.mergeForm.titlem = row.titlem,
          this.mergeForm.tvalue = row.tvalue,
          this.mergeForm.sequence = row.sequence,
          this.mergeForm.mark = row.mark,
          this.mergeForm.dictid = row.dictid;
          this.mergeForm.titleValue = row.titleValue;

          this.dialogVisible = true,
          this.dialogTitle = '数据字典明细修改';
      },
      //删除文本（行）
      handleDelete: function (row) {
        console.log('handleDelete');

        this.$confirm('你确定要删除这条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = this.axios.urls.sys_dict_dictItemDel;
          this.axios.post(url, {
            dictitemid: row.dictitemid
          }).then((resp) => {
            this.$message({
              message: resp.data.message,
              type: 'success'
            });
            this.search();
          }).catch((error) => {
          });

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
      onSubmitMergeForm: function () {
        this.$refs['mergeForm'].validate((valid) => {
          if (false === valid) {
            return false;
          }
          // console.log('onSubmitMergeForm');
          console.log("----", this.mergeForm);

          let url = this.axios.urls.sys_dict_dictItemMerge;
          this.axios.post(url, this.mergeForm).then((resp) => {
            this.$message({
              message: resp.data.message,
              type: 'success'
            });
            if (null == this.mergeForm.dictitemid) {
              this.handleDialogClose();
              /* this.doOpenDialog(); */
            }
            this.search();

          }).catch((error) => {
          });
        });
      },
      //dialog对话框的关闭事件
      handleDialogClose: function () {
        console.log('handleDialogClose......');

        this.$refs['mergeForm'].resetFields(); //清空验证信息
        this.doClearMergeForm();
      },
      //清空表单中的数据
      doClearMergeForm: function () {
        this.mergeForm.dictitemid = null; //清空后台提交表单数据
          this.mergeForm.title = null;
          this.mergeForm.titlem=null,
          this.mergeForm.tvalue = null;
          this.mergeForm.sequence = null;
          this.mergeForm.mark = null;
          this.mergeForm.dictid = null;
          this.mergeForm.titleValue = null;
          // this.mergeForm.dictiseDitable=null,
          // this.mergeForm.dictId = row.dictId;
          // this.mergeForm.dictType = row.dictType;
          // this.mergeForm.dictItem= row.dictItem;
          // this.mergeForm.dictValue = row.dictValue;
          // this.mergeForm.dictiseDitable = row.dictiseDitable;

          // this.$refs['mergeForm'].resetFields(); //清空验证信息

          this.dialogTitle = '数据字典明细添加';
      },
      /* doOpenDialog: function(row) {
        console.log('row的值为：' + row);
        if (!row) {
          this.mergeForm.id = null;
          this.mergeForm.title = null;
          this.mergeForm.body = null;
          console.log('--------------------');
        }else{
          this.mergeForm.id = row.id;
          this.mergeForm.title = row.title;
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
      search: function () {
        if (this.queryForm2.title != this.queryForm.title || this.queryForm2.tvalue != this.queryForm.tvalue) {
          if (this.queryForm.title != null && this.queryForm.title != '') {
            this.queryForm.current_page = 1;
          }
          if (this.queryForm.tvalue != null && this.queryForm.tvalue != '') {
            this.queryForm.current_page = 1;
          }
        }
        this.queryForm2.title = this.queryForm.title;
        this.queryForm2.tvalue = this.queryForm.tvalue;


        let url = this.axios.urls.sys_dict_dictItemSelect;
        this.axios.post(url, this.queryForm).then((resp) => {
          this.result = resp.data.result;
          this.queryForm.total_count = resp.data.total;
          // if (this.types.length == 0) {
          this.types = resp.data.types;
          // }
        }).catch((error) => {
        });

        let url02 = this.axios.urls.sys_dict_dictSelect;
        this.axios.post(url02, {
          page_size: 1000000
        }).then((resp) => {
          this.types1 = resp.data.result;
        }).catch((error) => {
        });


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
