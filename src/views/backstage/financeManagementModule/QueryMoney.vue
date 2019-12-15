<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item style="font-size: 24px;">系统账户流水查询</el-breadcrumb-item>
      </el-breadcrumb>

      <div style="text-align: right">
        <el-button-group>
          <el-button type="primary" icon="el-icon-question" @click="wantHelp()">帮助</el-button>
        </el-button-group>
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click="dialogVisible=true">添加</el-button>
        </el-button-group>
      </div>
      <br/>

      <div>
        <el-form>
          <el-form-item>
            <el-input placeholder="请输入查询条件" v-model="queryForm.actiontype" style="width: 300px;" clearable></el-input>
            <el-button type="primary" icon="el-icon-search" @click="loadAll()">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 数据表格 -->
      <el-table :data="dataResult" border style="width: 100%">
        <el-table-column type="index" label="序" :index="indexMethod" min-width="30" align="center"></el-table-column>

        <el-table-column prop="accountName" label="交易用户" width="181"></el-table-column>

        <el-table-column prop="amount" label="交易金额" width="180"></el-table-column>

        <el-table-column prop="tradeTimeCN" label="交易时间" width="181"></el-table-column>

        <el-table-column prop="servicefee" label="服务费用" width="180"></el-table-column>

        <el-table-column prop="actionTypeCN" label="交易类型" width="181"></el-table-column>

        相关操作
        <el-table-column label="操作">
          <template label="操作" min-width="30" slot-scope="scope">
            <el-button size="mini" type="success" @click="handleByEdit(scope.row)" class="el-icon-edit">编辑</el-button>
            &nbsp;&nbsp;&nbsp;
            <el-button size="mini" type="warning" @click="handleByDel(scope.row)" class="el-icon-delete">删除</el-button>
            &nbsp;&nbsp;&nbsp;
            <el-button size="mini" type="warning" @click="handleByDetails(scope.row)" class="el-icon-delete">详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--完整分页-->
      <div class="block" style="padding-top: 20px; text-align: right;">
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
                 label-width="80px">
          <el-form-item label="交易金额" prop="amount">
            <el-input v-model="mergeForm.amount"></el-input>
          </el-form-item>
          <el-form-item label="服务费" prop="servicefee">
            <el-input v-model="mergeForm.servicefee"></el-input>
          </el-form-item>
          <el-form-item label="交易类型" prop="actiontype">
            <el-select v-model="mergeForm.actiontype" filterable placeholder="请选择">
              <el-option v-for="(item,index) in types" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账户ID" prop="accountId">
            <el-input v-model="mergeForm.accountId"></el-input>
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
        dialogVisible: false,
        dialogTitle: '账户流水添加',
        labelPosition: 'left',
        dataResult: [],
        queryForm: {
          current_page: 1, //当前页码数
          page_size: 7, //每页显示的最大记录数
          total_count: 0, //总记录数
        },
        mergeForm: {
          amount: null,
          tradetime: null,
          servicefee: null,
          actiontype: null,
          accountId: null
        },
        types: [{
          value: '选项1',
          label: '充值'
        }, {
          value: '选项2',
          label: '提现'
        }, {
          value: '选项3',
          label: '还款'
        }, {
          value: '选项4',
          label: '获利'
        }],
        value: ''
      }
    },
    created: function () {
      // this.type();
      this.loadAll();
    },
    methods: {
      loadAll: function () {
        let url = this.axios.urls['QUERY_ACCOUNT_WATER'];
        // console.log('123');
        this.axios.post(url, this.queryForm).then((response) => {
          this.dataResult = response.data.result;
          // console.log(this.dataResult);
          // console.log(this.url);
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
          message: '这是系统账户流水查询界面，可进行查询、删除、修改、增加等操作!'
        });
      },
      handleByDel: function () {

      },
      handleByDetails: function () {

      },
      handleByEdit: function () {

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

        // this.$refs['mergeForm'].resetFields(); //清空验证信息
        this.dialogTitle = '账户流水添加';
      },
      //序列显示方法
      indexMethod(index) {
        return (this.queryForm.current_page - 1) * this.queryForm.page_size + (index + 1);
      },

    },

  }
</script>

<style scoped>

</style>
