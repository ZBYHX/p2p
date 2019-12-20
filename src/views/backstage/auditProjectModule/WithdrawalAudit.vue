<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item style="font-size: 20px;">审核管理</el-breadcrumb-item>
      <el-breadcrumb-item style="font-size: 20px;">撤资审核</el-breadcrumb-item>
    </el-breadcrumb>
    <br/>

    <!-- 搜索筛选 -->
    <el-form :inline="true" class="searchBox">
      <el-form-item label="审核状态">
        <el-select v-model="queryForm.state" clearable>
          <el-option v-for="item in types01" :value="item.value" :label="item.typeName" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请时间">
        <!--applytime-->
        <!--<span class="demonstration">带快捷选项</span>-->
        <el-date-picker
          v-model="value4"
          type="datetimerange"
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>

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
      <el-table-column prop="audit.nickname" label="申请人" min-width="25">
      </el-table-column>
      <el-table-column prop="audit.applytimeName" label="申请时间" min-width="25">
      </el-table-column>
      <el-table-column prop="audit.userName" label="审核人" min-width="20">
      </el-table-column>
      <el-table-column prop="audit.audittimeName" label="审核时间" min-width="25">
      </el-table-column>
      <el-table-column prop="audit.audittypeName" label="审核类型" min-width="20">
      </el-table-column>
      <el-table-column prop="audit.stateName" label="审核状态" min-width="20">
      </el-table-column>
      <el-table-column label="操作" min-width="30">
        <template slot-scope="scope">
          <!--<el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>-->
          <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">{{scope.row.audit.diableState}}
          </el-button>
          <el-button type="danger" icon="el-icon-delete"  @click="del(scope.row)"  >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 完整分页 -->
    <div class="block" style="padding-top: 20px; text-align: left;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="queryForm.current_page"
                     :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
                     :total="queryForm.total_count">
      </el-pagination>
    </div>

    <!-- 添加和编辑操作-->
    <el-dialog title="撤资审核编辑" :visible.sync="dialogFormVisible" @close="doDialogMergeFormClose" width="60%"
               style="margin-top: -30px;">
      <!--<el-form :model="mergeForm" :rules="MergeFormRules" ref="mergeForm" label-position="left" label-width="120px">-->
      <el-form :inline="true" :model="mergeForm" ref="mergeForm" :rules="MergeFormRules" label-position="left"
               label-width="100px" style="overflow: auto;max-height: 350px;">
        <!--<div style="height: 500px;overflow: auto;">-->
        <div>
          <el-form-item label="资金撤消ID" prop="withdrawid">
            <el-input style="width: 300px;" v-model="mergeForm.withdrawid" readonly="readonly"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="招标ID" prop="callid" style="margin-left: 60px;">
            <el-input style="width: 300px;" v-model="mergeForm.callid" readonly="readonly" auto-complete="off"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="平台服务费" prop="servicefee">
            <el-input style="width: 300px;" v-model="mergeForm.servicefee" readonly="readonly"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="银行名称" prop="bankname" style="margin-left: 60px;">
            <el-input style="width: 300px;" v-model="mergeForm.bankname" readonly="readonly" auto-complete="off"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="账户名称" prop="accountname">
            <el-input style="width: 300px;" v-model="mergeForm.accountname" readonly="readonly" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="账目编号" prop="accountnumber" style="margin-left: 60px;">
            <el-input style="width: 300px;" v-model="mergeForm.accountnumber" readonly="readonly" auto-complete="off"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" rows="3" style="width: 770px;" v-model="mergeForm.remark"
                      auto-complete="off" maxlength="200"
                      placeholder="请输入你审核的备注信息"></el-input>
          </el-form-item>
          <el-form-item style="width: 500px;" label="审核结果" prop="state">
            <el-radio-group v-model="mergeForm.state" size="small">
              <el-radio label="1" border>通过</el-radio>
              <el-radio label="2" border>拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
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
          state: null,//审核类型
          startTime: null,//起始时间
          endTime: null,//结束时间
          current_page: 1,
          page_size: 10,
          total_count: 0
        },
        result: [],
        //日期值的  到时候查询结果里面有
        value1: '',
        currentRow: null,
        dialogFormVisible: false,
        mergeForm: {
          withdrawid: null,
          callid: null,
          servicefee: null,
          bankname: null,
          accountname: null,
          accountnumber: null,
          auditid: null,
          remarkk: null,
          state: null
        },
        //类型数组
        types01: [
          {
            value: '1',
            typeName: '已通过'
          },
          {
            value: '2',
            typeName: '已拒绝'
          },
          {
            value: '3',
            typeName: '未审核'
          }
        ],
        visible01: false,
        MergeFormRules: {
          remarkk: [{
            required: true,
            message: '请输入审核的备注信息',
            trigger: 'blur'
          }],
          state: [{
            required: true,
            message: '请选择审核结果',
            trigger: 'change'
          }]
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        // value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value4: ''
      }
    },
    created: function () {
      this.search();
    },
    methods: {
      //选中一行
      selectCansle(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handelSelectRow(rows) {
        if (rows != null) {
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
      //查询
      search: function () {
        //分页
        if (this.value4 != null && this.value4.length > 0) {
          //起始时间
          const t1 = this.value4[0].toLocaleString().substr(0, 10);
          const t2 = this.value4[0].toLocaleString().substr(13);
          this.queryForm.startTime = t1 + " " + t2;
          //结束时间
          const t01 = this.value4[1].toLocaleString().substr(0, 10);
          const t02 = this.value4[1].toLocaleString().substr(13);
          this.queryForm.endTime = t01 + " " + t02;
        }else {
          this.queryForm.startTime = null;
          this.queryForm.endTime = null;
        }

        // console.log("search...");
        let url = this.axios.urls.WITHDRAW_LISTALLWITHDRAW;
        this.axios.post(url, this.queryForm).then((resp) => {
          this.result = resp.data.result;
          this.queryForm.total_count = resp.data.total;
        }).catch((error) => {
          console.log(error);
        });


      },
      //序列显示方法
      indexMethod(index) {
        return (this.queryForm.current_page - 1) * this.queryForm.page_size + (index + 1);
      },
      //修改方法
      handleEdit: function (row) {
        if (row.audit.state != null && row.audit.state != 3) {
          this.mergeForm.state = row.audit.state.toString();
          console.log("状态id", this.mergeForm.state);
        }
        this.mergeForm.withdrawid = row.withdrawid;
        this.mergeForm.callid = row.callid;

        this.mergeForm.servicefee = row.servicefee;
        this.mergeForm.bankname = row.bankname;
        this.mergeForm.accountname = row.accountname;

        this.mergeForm.accountnumber = row.accountnumber;
        this.mergeForm.remarkk = row.audit.remarkk;
        this.mergeForm.auditid = row.audit.auditid;

        this.dialogFormVisible = true;
      },

      doMergeForm: function () {
        //新增和修改同是调用此方法
        // console.log('doMergeForm...');
        // console.log(this.mergeForm);
        this.$refs['mergeForm'].validate((valid) => {
          if (false === valid) {
            return false;
          }

          //创建一个提交表单
          let from01 = {
            remarkk: this.mergeForm.remarkk,
            state: this.mergeForm.state,
            aid: this.mergeForm.auditid,
            auditid: this.$store.getters.userId
          }

          console.log(from01);

          let url = this.axios.urls['WITHDRAW_EDITWITHDRAW'];
          this.axios.post(url, from01).then((response) => {
            if (0 === response.data.code) {
              this.$message({
                message: response.data.message,
                type: 'success'
              });
            }
            this.search();
          }).catch(function (error) {
            console.log(error);
          });
        });
      },
      //删除的单条数据的方法
      del: function (row) {
        this.$confirm('你确定要删除这条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let from01={
            withdrawid: row.withdrawid,
            aid: row.audit.auditid
          }

          let url = this.axios.urls.WITHDRAW_DELWITHDRAW;
          this.axios.post(url, from01).then((resp) => {
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

      //dialog对话框的关闭事件
      handleDialogClose: function () {
        console.log('handleDialogClose......');
        this.$refs['mergeForm'].resetFields(); //清空验证信息
        //this.doClearMergeForm();
      },

      doDialogMergeFormClose: function () {
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
