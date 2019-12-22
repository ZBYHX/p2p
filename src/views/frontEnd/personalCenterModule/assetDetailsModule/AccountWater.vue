<template>
  <div>
    <div>
      <!--<div>-->
      <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
      <!--<el-breadcrumb-item style="font-size: 18px;">账户流水</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item style="font-size: 18px;">账户流水</el-breadcrumb-item>-->
      <!--</el-breadcrumb>-->
      <!--</div>-->
      <div style="margin-top: 10px;">
        <el-form>
          <el-form-item>
            <el-input placeholder="请输入账户名" v-model="queryForm.accountName" style="width: 210px;" clearable></el-input>
            <el-select v-model="queryForm.actiontype" style="width: 210px;" placeholder="请选择类型" key="-1" value="-1"
                       clearable>
              <el-option v-for="item in types" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>&nbsp;

            <el-date-picker style="width: 210px;" v-model="queryForm.tradetimeName" clearable align="right" type="date"
                            placeholder="选择交易日期" value-format="yyyy-MM-dd"></el-date-picker>

            <el-select style="width: 200px;" v-model="queryForm.amount00" clearable placeholder="请选择交易价格段">
              <el-option v-for="(item,index) in this.list" :value="item" :index="index" :key="index" :label="item"
                         :disabled="item.disabled"></el-option>
            </el-select>

            <el-button icon="el-icon-search" @click="loadAll()">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div style="width: 79%; margin-left: 262px ; margin-top: -700px">
        <!-- 数据表格 -->
        <el-table :data="dataResult" border style="width: 100%">
          <el-table-column type="index" label="序号" :index="indexMethod" min-width="30" align="center"></el-table-column>

          <el-table-column prop="accountName" label="交易用户" width="175"></el-table-column>

          <el-table-column prop="amount" label="交易金额" width="177"></el-table-column>

          <el-table-column prop="tradeTimeCN" label="交易时间" width="180"></el-table-column>

          <el-table-column prop="servicefee" label="服务费用" width="178"></el-table-column>

          <el-table-column prop="actionTypeCN" label="交易类型" width="178"></el-table-column>

        </el-table>

        <!--完整分页-->
        <div class="block" style="padding-top: 20px; text-align: left;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="queryForm.current_page"
                         :page-sizes="[10, 20, 30, 40]" :page-size="queryForm.page_size"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="queryForm.total_count">
          </el-pagination>
        </div>

        <div style="margin-top: -23px; margin-left: 3px; text-align: center">
          <span>小亿祝你生活幸福!</span>
        </div>

        <!-- 添加和编辑操作 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" @close="handleDialogClose">
          <el-form :model="mergeForm" ref="mergeForm" :label-position="labelPosition"
                   label-width="80px">
            <el-form-item label="用户名称" prop="accountName">
              <el-input :readonly="diss" v-model="mergeForm.accountName"></el-input>
            </el-form-item>
            <el-form-item label="交易类型" prop="actiontype">
              <el-select v-model="mergeForm.actiontype" filterable placeholder="请选择">
                <el-option v-for="item in types" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="交易金额" prop="amount">
              <el-input v-model="mergeForm.amount"></el-input>
            </el-form-item>
            <el-form-item label="服务费" prop="servicefee">
              <el-input v-model="mergeForm.servicefee"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible=false">取 消</el-button>
            <el-button type="primary" @click="onSubmitMergeForm()">确 定</el-button>
          </div>
        </el-dialog>
      </div>

    </div>
  </div>

</template>

<script>
  export default {
    data: function () {
      return {
        diss: null,
        dialogVisible: false,
        dialogTitle: '账户流水添加',
        labelPosition: 'left',
        dataResult: [],
        queryForm: {
          current_page: 1, //当前页码数
          page_size: 10, //每页显示的最大记录数
          total_count: 10, //总记录数
          amount00: null,
          min: null,
          max: null
        },
        queryForm1: {
          accountName: null,
          amount00: null,
          tradetimeName: null,
          actiontype: null
        },
        amount: '',
        amounts: '',
        list: ["1-5000", "5000-10000", "10000-20000", "20000-50000", "50000-100000", "100000-200000", "200000-100000000"],
        mergeForm: {
          amount: null,
          tradetime: null,
          tradeTimeCN: null,
          servicefee: null,
          actiontype: null,
          actionTypeCN: null,
          accountId: null,
          accountName: null,
          accountflowid: null
        },
        types: [{
          value: '1',
          label: '充值'
        }, {
          value: '2',
          label: '提现'
        }, {
          value: '3',
          label: '还款'
        }, {
          value: '4',
          label: '获利'
        }, {
          value: '5',
          label: '逾期还款'
        }, {
          value: '6',
          label: '资金撤销'
        }],
      }
    },
    created() {
      this.loadAll();
    },
    methods: {
      loadAll: function () {
        var min = null;
        var max = null;
        let str = this.queryForm.amount00;
        if (str != null && str.length > 0) {
          let str1 = str.split("-");
          min = str1[0];
          max = str1[1];
        }
        // console.log("最小值：", min);
        // console.log("最大值：", max);
        //将参数传到后台
        this.queryForm.min = min;
        this.queryForm.max = max;

        if (this.queryForm.actiontype == '') {
          this.queryForm.actiontype = null;
        }

        // if (this.queryForm.accountName != this.queryForm1.accountName || this.queryForm1.actiontype != this.queryForm.actiontype || this.queryForm.tradetime != this.queryForm1.tradetime) {
        //   if (this.queryForm.accountName != null && this.queryForm.accountName != '') {
        //     this.queryForm.current_page = 1;
        //   }
        //   if (this.queryForm.actiontype != null && this.queryForm.actiontype != '') {
        //     this.queryForm.current_page = 1;
        //   }
        //   if (this.queryForm.tradetimeName != null && this.queryForm.tradetimeName != '') {
        //     this.queryForm.current_page = 1;
        //   }
        // }
        // this.queryForm1.accountName = this.queryForm.accountName;
        // this.queryForm1.actiontype = this.queryForm.actiontype;
        // this.queryForm1.tradetimeName = this.queryForm.tradetimeName;

        let url = this.axios.urls['QUERY_ACCOUNT_WATER'];

        if (this.queryForm.tradetimeName != null && this.queryForm.tradetimeName != '') {
          this.queryForm.tradetimeName = this.queryForm.tradetimeName.toString();
        }

        this.axios.post(url, this.queryForm).then((response) => {
          this.dataResult = response.data.result;
          this.queryForm.total_count = response.data.total;
        }).catch((response) => {
          console.log(Error);
        });
      },
      handleByDel: function (row) {
        this.$confirm('你确定要删除这条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = this.axios.urls.DEL_ACCOUNT_FLOW;
          this.axios.post(url, {
            accountflowid: row.accountflowid
          }).then((response) => {
            this.$message({
              message: response.data.message,
              type: 'success'
            });
            this.loadAll();
          }).catch((error) => {
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      onSubmitMergeForm: function () {
        this.$refs['mergeForm'].validate((valid) => {
          if (false === valid) {
            return false;
          }
          let url = this.axios.urls['EDIT_ACCOUNT_FLOW'];
          this.axios.post(url, {
              accountflowid: this.mergeForm.accountflowid,
              amount: this.mergeForm.amount,
              servicefee: this.mergeForm.servicefee,
              actiontype: this.mergeForm.actiontype
            }
          ).then((response) => {
            this.$message({
              message: response.data.message,
              type: 'success'
            });
            if (null == this.mergeForm.accountflowid) {
              this.handleDialogClose();
            }
            this.loadAll();
          }).catch((error) => {
          });
        });
        // this.queryForm1.accountName = this.queryForm.accountName;
      },
      //dialog对话框的关闭事件
      handleDialogClose: function () {
        this.$refs['mergeForm'].resetFields(); //清空验证信息
        this.doClearMergeForm(); //调用方法清除表单中的数据
      },
      //更改每页显示行数
      handleSizeChange(total) {
        this.queryForm.page_size = total;
        this.queryForm.current_page = 1;
        this.loadAll();
      },
      //更改当前页码数
      handleCurrentChange(page_size) {
        this.queryForm.current_page = page_size;
        this.loadAll();
      },
      //dialog对话框的关闭事件
      handleDialogClose: function () {
        this.$refs['mergeForm'].resetFields(); //清空验证信息
        this.doClearMergeForm(); //调用方法清除表单中的数据
      },
      //清空表单中的数据
      doClearMergeForm: function () {
        // 清空后台提交表单数据
        this.mergeForm.accountId = null,
          this.mergeForm.actiontype = null,
          this.mergeForm.servicefee = null,
          this.mergeForm.amount = null,
          this.mergeForm.tradetime = null,
          // this.$refs['mergeForm'].resetFields(); //清空验证信息
          this.dialogTitle = '账户流水添加';
      },
      //修改
      handleByEdit: function (row) {
        this.mergeForm.amount = row.amount;
        this.mergeForm.actiontype = row.actiontype.toString();
        this.mergeForm.accountId = row.accountId;
        this.mergeForm.servicefee = row.servicefee;
        this.mergeForm.accountName = row.accountName;
        this.mergeForm.tradeTimeCN = row.tradeTimeCN;
        this.mergeForm.accountflowid = row.accountflowid;
        this.dialogVisible = true;
        this.diss = true;
        this.dialogTitle = '信息修改';
      },
      //序列显示方法
      indexMethod(index) {
        return (this.queryForm.current_page - 1) * this.queryForm.page_size + (index + 1);
      },

    }
  }
</script>

<style>
</style>
