<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item style="font-size: 20px;">审核管理</el-breadcrumb-item>
      <el-breadcrumb-item style="font-size: 20px;">实名认证审核</el-breadcrumb-item>
    </el-breadcrumb>
    <br/>

    <!-- 搜索筛选 -->
    <el-form :inline="true" class="searchBox">
      <el-form-item label="名称">
        <el-input size="small" style="width: 300px;" v-model="queryForm.realname" clearable
                  placeholder="请输入搜索的真实姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表格  现实重要列名 :data="result"-->
    <el-table :data="result" ref="singleTable" border style="width: 100%" height="450" highlight-current-row
              @current-change="handelSelectRow">
      <el-table-column type="index" label="序" :index="indexMethod" min-width="10" align="center">
      </el-table-column>
      <el-table-column prop="realname" label="真实姓名" min-width="25">
      </el-table-column>
      <el-table-column prop="nation" label="民族" min-width="20">
      </el-table-column>
      <el-table-column prop="address" label="地址" min-width="30">
      </el-table-column>
      <el-table-column prop="idnumber" label="身份证号" min-width="30">
      </el-table-column>
      <el-table-column label="操作" min-width="30">
        <template slot-scope="scope">
          <!--<el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>-->
          <el-button size="mini" @click="dialogMergeFormVisible=true">查看详情并编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 完整分页 -->
    <div class="block" style="padding-top: 20px; text-align: left;">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryForm.current_page"
    :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="queryForm.total_count">
    </el-pagination>
    </div>

    <!-- 添加和编辑操作-->
    <el-dialog :title="实名认证编辑" :visible.sync="dialogMergeFormVisible" @close="doDialogMergeFormClose" width="80%"
               style="margin-top: -30px;">
      <el-form :model="mergeForm" :rules="MergeFormRules" ref="mergeForm" :label-position="left" label-width="120px">
        <div style="width: 48%;float: left;">
            <!--实名认证ID不可被编辑 -->
            <el-form-item label="实名认证ID" prop="realid">
              <el-input v-model="mergeForm.realId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="realname">
              <el-input v-model="mergeForm.realName" auto-complete="off" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <!-- 1男2女-->
            <el-form-item label="性别" prop="sex">
                <template>
                  <el-radio v-model="mergeForm.sex" label="1">男</el-radio>
                  <el-radio v-model="mergeForm.sex" label="2">女</el-radio>
                </template>
            </el-form-item>

            <el-form-item label="民族" prop="nation">
              <el-input v-model="mergeForm.nation" auto-complete="off" placeholder="请输入民族"></el-input>
            </el-form-item>

            <el-form-item label="出生年月日" prop="birthday">
              <template>
                <div class="block">
                  <span class="demonstration"></span>
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </template>
            </el-form-item>
        </div>

        <div style="width: 48%;float: left;margin-left: 20px;">

            <el-form-item label="住址" prop="address">
              <el-input v-model="mergeForm.address" auto-complete="off" placeholder="请输入住址"></el-input>
            </el-form-item>

            <el-form-item label="身份证ID" prop="idnumber">
              <el-input v-model="mergeForm.idNumber" auto-complete="off" placeholder="请输入身份证号"></el-input>
            </el-form-item>

            <el-form-item label="图片一" prop="image1">
             <div v-model="mergeForm.image1" auto-complete="off">
               请输入图片一
             </div>
            </el-form-item>

             <el-form-item label="图片二" prop="image2">
                <div v-model="mergeForm.image2" auto-complete="off">
                  请输入图片二
                </div>
             </el-form-item>

            <el-form-item label="审核ID" prop="auditId">
              <el-input v-model="mergeForm.auditId" auto-complete="off" placeholder="请输入审核ID"></el-input>
            </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMergeFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doMergeForm">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        queryForm: {
          realname: null,
          current_page: 1,
          page_size: 10,
          total_count: 0
        },
        queryForm2: {
          realname: null
        },
        result: [],
        //日期值的  到时候查询结果里面有
        value1: '',
        currentRow: null,
        dialogMergeFormVisible:false,
        //定义一个行的ID属性
        realnameID: null,
        realname: null,
        mergeForm: {
          realid: null,
          realname: null,
          sex: null,
          nation: null,
          birthday: null,
          address: null,
          idnumber: null,
          image1: null,
          image2: null,
          auditId: null,
        },
        MergeFormRules: {
          realid: [],
          realname: [{
            required: true,
            message: '请输入真实姓名',
            trigger: 'blur'
          },
            {
              min: 2,
              max: 5,
              message: '长度在2到5个字符',
              trigger: 'blur'
            }
          ],
          sex: [{
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }],
          nation: [{
            required: true,
            message: '请输入民族',
            trigger: 'blur'
          },
            {
              min: 1,
              max: 5,
              message: '长度在1 到 5 个字符',
              trigger: 'blur'
            }
          ],
          birthday: [{ type: 'date',
            required: true, message: '请选择日期',
            trigger: 'change'
          }],
          address: [{
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }],
          idnumber: [{
            required: true,
            message: '请输入身份证号',
            trigger: 'blur'
          },
            {
              length:18,
              message: '身份证的长度为18位',
              trigger: 'blur'
          }],
          image1: [{
            required: true,
            message: '请选择图片',
            trigger: 'blur'
          }],
          image2: [{
            required: true,
            message: '请选择图片',
            trigger: 'blur'
          }],
          auditId: [{
            required: true,
            message: '请输入审核',
            trigger: 'blur'
          }],
        }
      }
    },
    created: function () {
      this.search();
    },
    methods: {
      //选中一行
      selectCansle(row) {
        this.$refs.singleTable.setCurrentRow(row);
        this.realnameID = null;
        this.realname = null;
      },
      handelSelectRow(rows) {
        if (rows != null) {
          this.realnameID = rows.custNo;
          this.realname = rows.realname;
          this.currentRow = rows;
        }
      },
      //更改每页显示行数
      handleSizeChange(rows) {
        //console.log('rows=%i', rows);
        this.queryForm.page_size = rows;
        this.queryForm.current_page = 1;
        this.search();
      },
      //更改当前页码数
      handleCurrentChange(page) {
        this.selectCansle();
        //console.log('page=%i', page);
        this.queryForm.current_page = page;
        this.search();
      },
      search: function () {
        //分页
        if (this.queryForm2.realname != this.queryForm.realname) {
          if (this.queryForm.realname != null && this.queryForm.realname != '') {
            this.queryForm.current_page = 1;
          }
        }
        console.log("search...");
        let url = this.axios.urls.REALNAME_LISTALLNAME;
        this.axios.post(url, this.queryForm).then((resp) => {
          this.result = resp.data.result;
          this.queryForm.total_count = resp.data.total;
        }).catch((error) => {
          console.log(error);
        });

        this.queryForm2.realname = this.queryForm.realname;
      },
      //序列显示方法
      indexMethod(index) {
        return (this.queryForm.current_page - 1) * this.queryForm.page_size + (index + 1);
      },
      //修改方法
      handleEdit: function(row) {
        this.mergeForm.custNo = row.realid;
        this.mergeForm.custName = row.realname;
        this.mergeForm.custRegion = row.sex;

        this.mergeForm.custManagerName = row.nation;
        this.mergeForm.custLevel = row.address;
        this.mergeForm.custLevelLabel = row.birthday;

        this.mergeForm.custSatisfy = row.idnumber;
        this.mergeForm.custCredit = row.image1;
        this.mergeForm.custAddr = row.image2;

        this.mergeForm.custZip = row.auditId.toLocaleString();
        // this.dialogMergeFormTitle = '客户信息修改';
        this.dialogMergeFormVisible = true;
      },

      doMergeForm: function() {
        //新增和修改同是调用此方法
        console.log('doMergeForm...');
        console.log(this.mergeForm);
        this.$refs['mergeForm'].validate((valid) => {
          if (false === valid) {
            return false;
          }
          var url = this.axios.urls['CUSTOMER_MERGE'];
          this.axios.post(url, this.mergeForm).then((response) => {
            if (0 === response.data.code) {
              this.$message({
                message: response.data.message,
                type: 'success'
              });
            }
            //只有新增时才需要清空表单
            // if (!this.mergeForm.custNo) {
            //   this.doClearMergeForm();
            // }
            this.search();
          }).catch(function(error) {
            console.log(error);
          });
        });
      },
      //dialog对话框的关闭事件
      handleDialogClose: function() {
        console.log('handleDialogClose......');
        this.$refs['mergeForm'].resetFields(); //清空验证信息
        //this.doClearMergeForm();
      },

      doDialogMergeFormClose: function() {
        console.log('close...');
        this.handleDialogClose();
      },

      //再次调用查询的方法
      created: function () {
        this.search();
      }
    }
  }

</script>

<style>
  .searchBox {
    margin-top: 20px;
  }
</style>
