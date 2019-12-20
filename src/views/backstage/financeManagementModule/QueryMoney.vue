<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item style="font-size: 24px;">借款投资查询</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="text-align: right">
        <el-button-group>
          <el-button type="primary" icon="el-icon-question" @click="wantHelp()">帮助</el-button>
        </el-button-group>
      </div>
      <br/>
      <div>
        <el-form>
          <el-form-item>
            <el-input placeholder="请输入账户名" v-model="queryForm.userName" style="width: 300px;" clearable></el-input>
            <el-select v-model="queryForm.state" placeholder="请选择类型" key="-1" value="-1" clearable>
              <!--<el-option key="-1" index="-1" label="所有产类型" value=""></el-option>-->
              <el-option v-for="item in types" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
            <el-date-picker clearable v-model="queryForm.dateName" clearable align="right" type="date"
                            placeholder="借款投资日期" value-format="yyyy-MM-dd"></el-date-picker>
            <el-date-picker clearable v-model="queryForm.dateName2" clearable align="right" type="date"
                            placeholder="截至日期" value-format="yyyy-MM-dd"></el-date-picker>
            <el-select clearable v-model="queryForm.totalamount00" clearable placeholder="请选择交易价格段">
              <!--<el-option key="e" index="r" label="" value=""></el-option>-->
              <el-option v-for="(item,index) in this.list" :value="item" :index="index" :key="index" :label="item"
                         :disabled="item.disabled"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="loadAll()">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 数据表格 -->
      <el-table :data="dataResult" border style="width: 100%">
        <el-table-column type="index" label="序" :index="indexMethod" min-width="30" align="center"></el-table-column>

        <el-table-column prop="userName" label="借款/投资用户" width="149"></el-table-column>

        <el-table-column prop="totalamount" label="借款/投资总金额" width="150"></el-table-column>

        <el-table-column prop="principal" label="借款本金/投资本金" width="150"></el-table-column>

        <el-table-column prop="payDateCN" label="借款/投资日期" width="153"></el-table-column>

        <el-table-column prop="deadLineCN" label="截止期限" width="153"></el-table-column>

        <el-table-column prop="interest" label="借款利息/投资获利" width="149"></el-table-column>

        <el-table-column prop="monthindex" label="月指数" width="149"></el-table-column>

        <el-table-column prop="callid" label="招标ID" width="150"></el-table-column>

        <el-table-column prop="stateCN" label="交易类型" width="150"></el-table-column>

        相关操作
        <el-table-column label="操作">
          <template label="操作" min-width="10px" slot-scope="scope">
            <el-button size="mini" type="warning" @click="handleByEdit(scope.row)" class="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleByDel(scope.row)" class="el-icon-delete">删除</el-button>
            <!--<el-button size="mini" type="success" @click="handleByDetails(scope.row)" class="el-icon-info">详情-->
            <!--</el-button>-->
          </template>
        </el-table-column>
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

      <!-- 添加和编辑操作 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" @close="handleDialogClose">
        <el-form :model="mergeForm" :rules="mergeFormRules" ref="mergeForm" :label-position="labelPosition"
                 label-width="130px">
          <el-form-item label="用户名称" prop="userName">
            <el-input :readonly="diss" v-model="mergeForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="交易类型" prop="state">
            <el-select v-model="mergeForm.state" filterable placeholder="请选择">
              <el-option v-for="item in types" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="借款/投资总金额" prop="totalamount">
            <el-input v-model="mergeForm.totalamount"></el-input>
          </el-form-item>
          <el-form-item label="月指数" prop="monthindex">
            <el-input v-model="mergeForm.monthindex"></el-input>
          </el-form-item>
          <el-form-item label="借款本金/投资本金" prop="principal">
            <el-input v-model="mergeForm.principal"></el-input>
          </el-form-item>
          <el-form-item label="借款/投资日期" prop="payDateCN">
            <el-input :readonly="diss" v-model="mergeForm.payDateCN"></el-input>
          </el-form-item>
          <el-form-item label="借款/投资日期" prop="deadLineCN">
            <el-input :readonly="diss" v-model="mergeForm.deadLineCN"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="onSubmitMergeForm()">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>

</template>

<script>

  export default {
    data: function () {
      return {
        // pickerOptions: {
        //   disabledDate(time) {
        //     return time.getTime() > Date.now();
        //   },
        //   shortcuts: [{
        //     text: '今天',
        //     onClick(picker) {
        //       picker.$emit('pick', new Date());
        //     }
        //   }, {
        //     text: '昨天',
        //     onClick(picker) {
        //       const date = new Date();
        //       date.setTime(date.getTime() - 3600 * 1000 * 24);
        //       picker.$emit('pick', date);
        //     }
        //   }, {
        //     text: '一周前',
        //     onClick(picker) {
        //       const date = new Date();
        //       date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
        //       picker.$emit('pick', date);
        //     }
        //   }]
        // },
        // value2: '',
        diss: null,
        dialogVisible: false,
        dialogTitle: '借款投资添加',
        labelPosition: 'left',
        dataResult: [],
        queryForm: {
          current_page: 1, //当前页码数
          page_size: 10, //每页显示的最大记录数
          total_count: 0, //总记录数
          totalamount00: null,
          min: null,
          max: null
        },
        queryForm1: {
          deadlineX: null,
          // paydateX: null,
          dateName: null,
          state: null,
          userName: null,
          totalamount00: null,
        },

        totalamount: '',
        totalamountX: '',
        list: ["1-5000", "5001-10000", "10001-20000", "20001-50000", "50001-100000", "100001-200000", "200001-100000000"],
        mergeForm: {
          payid: null,
          deadline: null,
          paydate: null,
          totalamount: null,
          principal: null,
          interest: null,
          monthindex: null,
          userid: null,
          callid: null,
          state: null,
          deadLineCN: null,
          payDateCN: null,
          stateCN: null,
          userName: null,
          dateName: null,
          dateName2: null,
        },
        types: [{
          value: '1',
          label: '投资'
        }, {
          value: '2',
          label: '借款'
        }, {
          value: '3',
          label: '主动还款'
        }, {
          value: '4',
          label: '自动还款'
        }, {
          value: '5',
          label: '逾期还款'
        }, {
          value: '6',
          label: '投资收益'
        }],
        mergeFormRules: {}
      }
    },
    created: function () {
      // this.type();
      console.log(this.totalamountX);
      this.loadAll();
    },
    methods: {
      //查询的方法
      loadAll: function () {
        var min = null;
        var max = null;
        let str = this.queryForm.totalamount00;
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

        if (this.queryForm.userName != this.queryForm1.userName || this.queryForm1.state != this.queryForm.state || this.queryForm.dateName != this.queryForm1.dateName) {
          if (this.queryForm.userName != null && this.queryForm.userName != '') {
            this.queryForm.current_page = 1;
          }
          if (this.queryForm.state != null && this.queryForm.state != '') {
            this.queryForm.current_page = 1;
          }
          if (this.queryForm.dateName != null && this.queryForm.dateName != '') {
            this.queryForm.current_page = 1;
          }
          if (this.queryForm.dateName2 != null && this.queryForm.dateName2 != '') {
            this.queryForm.current_page = 1;
          }
        }
        this.queryForm1.userName = this.queryForm.userName;
        this.queryForm1.state = this.queryForm.state;
        this.queryForm1.dateName = this.queryForm.dateName;
        this.queryForm1.dateName2 = this.queryForm.dateName2;


        let url = this.axios.urls['QUERY_JKMANAGER'];

        if (this.queryForm.dateName != null && this.queryForm.dateName != '') {
          this.queryForm.dateName = this.queryForm.dateName.toString();
        }
        if (this.queryForm.dateName2 != null && this.queryForm.dateName2 != '') {
          this.queryForm.dateName2 = this.queryForm.dateName2.toString();
        }

        this.axios.post(url, this.queryForm).then((response) => {
          this.dataResult = response.data.result;
          this.queryForm.total_count = response.data.total;
        }).catch((response) => {
          console.log(Error);
        });
      },

      //绑定数据库的操作类型
      // type: function () {
      // let url = this.axios.urls['QUERY_TYPES'];
      // this.axios.post(url, this.queryForm).then((response) => {
      //   this.dataResult = response.data.result;
      // }).catch((response) => {
      //   console.log(Error);
      // });
      // },

      wantHelp: function () {
        this.$message({
          showClose: true,
          message: '这是系统账户流水查询界面，可进行查询、删除、修改等操作!'
        });
      },

      handleByDel: function (row) {
        this.$confirm('你确定要删除这条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          let url = this.axios.urls.DEL_JKMANAGER;
          console.log('123');
          this.axios.post(url, {
            payid: row.payid
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

      // handleByDetails: function () {
      //
      // },

      //提交表单
      onSubmitMergeForm: function () {
        this.$refs['mergeForm'].validate((valid) => {
          if (false === valid) {
            return false;
          }
          let url = this.axios.urls['EDIT_JKMANAGER'];
          console.log('edited');
          this.axios.post(url, {
              payid: this.mergeForm.payid,
              totalAmount: this.mergeForm.totalamount,
              principal: this.mergeForm.principal,
              monthIndex: this.mergeForm.monthindex,
              state: this.mergeForm.state,
            }
          ).then((response) => {
            this.$message({
              message: response.data.message,
              type: 'success'
            });
            if (null == this.mergeForm.payid) {
              this.handleDialogClose();
            }
            this.loadAll();
          }).catch((error) => {
          });
        });
        // this.queryForm1.accountName = this.queryForm.accountName;
      },
      //修改
      handleByEdit: function (row) {
        console.log(this.queryForm.payid);

        this.mergeForm.payid = row.payid;
        this.mergeForm.totalamount = row.totalamount;
        this.mergeForm.state = row.state.toString();
        this.mergeForm.userid = row.userid;
        this.mergeForm.interest = row.interest;
        this.mergeForm.monthindex = row.monthindex;
        this.mergeForm.principal = row.principal;
        this.mergeForm.callid = row.callid;
        this.mergeForm.userName = row.userName;
        this.mergeForm.payDateCN = row.payDateCN;
        this.mergeForm.deadLineCN = row.deadLineCN;
        this.mergeForm.dateName=row.dateName;
        this.mergeForm.dateName2=row.dateName2;

        this.dialogVisible = true;
        this.diss = true;
        this.dialogTitle = '借款投资信息修改';
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
        this.mergeForm.payid = null,
          this.mergeForm.totalamount = null,
          this.mergeForm.state = null,
          this.mergeForm.userid = null,
          this.mergeForm.interest = null,
          this.mergeForm.monthindex = null,
          this.mergeForm.principal = null,
          this.mergeForm.callid = null,
          // this.$refs['mergeForm'].resetFields(); //清空验证信息
          this.dialogTitle = '添加';
      },
      //序列显示方法
      indexMethod(index) {
        return (this.queryForm.current_page - 1) * this.queryForm.page_size + (index + 1);
      },
    }
  }
</script>

<style scoped>

</style>
