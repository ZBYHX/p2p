<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px;font-family: '宋体';font-weight: bold;">
      <el-breadcrumb-item>审核项目</el-breadcrumb-item>
      <el-breadcrumb-item>充值审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="searchBox">
      <el-form-item label="交易时间">
        <el-date-picker type="date" size="small" placeholder="选择日期" v-model="reChargeQuery.tradeTime" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item style="float: right;margin-right: 30px;">
        <el-button type="success" width="200px" icon="el-icon-question">&emsp;帮&emsp;助&emsp;</el-button>
        <el-button type="primary" width="200px" icon="el-icon-search" @click="search()">&emsp;查&emsp;询&emsp;</el-button>
      </el-form-item>
    </el-form>
    <hr />
    <el-form label-width="80px">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="rechargeId" label="充值ID" min-width="10">
        </el-table-column>
        <el-table-column prop="bankId" label="银行卡ID" min-width="15">
        </el-table-column>
        <el-table-column prop="rechargeMoney" label="充值金额" min-width="20">
        </el-table-column>
        <el-table-column prop="tradeTime" label="交易时间" min-width="15">
        </el-table-column>
        <el-table-column prop="auditId" label="审核ID" min-width="15">
        </el-table-column>
        <el-table-column prop="date" label="操作" min-width="15">
          <template slot-scope="scope" margin-right="300px">
            <el-button size="mini" icon="el-icon-edit" type="primary" @click="toSubmit(scope.row)" round>确定</el-button>
            <el-button size="mini" icon="el-icon-delete" type="warning" @click="doDel(scope.row)" round>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 完整分页-->
      <el-pagination style="margin-top: 15px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="queryForm.current_page" :page-sizes="[8, 20, 30, 40]" :page-size="queryForm.page_size" layout="total, sizes, prev, pager, next, jumper"
                     :total="queryForm.total_count">
      </el-pagination>
    </el-form>
    <!-- <div style="width: 100%;margin-top: 20px;height: 580px;"> -->
    <el-dialog :title="title" :visible.sync="dialogSerFormVisible" @close="clearForm" width="60%">
      <el-form :inline="true" :model="reChargeForm" ref="valide" :rules="mergeFormRules" label-position="left"
               label-width="80px" style="overflow: auto;max-height: 400px;">
        <div>
          <el-form-item label="充值编号" v-if="false" prop="rechargeId">
            <el-input type="hidden" v-model="reChargeForm.rechargeId" readonly="readonly"></el-input>
          </el-form-item><br />
          <el-form-item label="银行卡号" prop="bankId">
            <el-input style="width: 300px;" size="20" v-model="reChargeForm.bankId" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="充值金额" style="margin-left: 60px;" prop="rechargeMoney">
            <el-input style="width: 300px;" v-model="reChargeForm.rechargeMoney" readonly="readonly" placeholder="请选择金额"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="审核ID" prop="auditId">
            <el-input style="width: 300px;" v-model="reChargeForm.auditId" readonly="readonly"></el-input>
          </el-form-item>
        </div>
        <div>

        </div>
        <div>
          <el-form-item label="交易时间" prop="tradeTime">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期(自动)" v-model="reChargeForm.tradeTime" style="width: 80%;"
                              readonly="readonly"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间(自动)" v-model="reChargeForm.tradeTime" style="width: 80%;" readonly="readonly"></el-time-picker>
            </el-col>
          </el-form-item>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button style="width: 20%;" type="primary" @click="onSubmitSerAssForm()">确 定</el-button>
        <el-button style="width: 20%;" @click="dialogSerFormVisible=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        reChargeForm: {
          rechargeId:null,//充值ID
          bankId: null, //银行卡ID
          rechargeMoney: null, //充值金额
          tradeTime: null, //交易时间
          auditId: null, //审核ID
          current_page: 1, //当前显示的页码数
          page_size: 10, //每页显示的最大页码数
          total_count: 0 //总记录数
        },
        reChargeQuery: {
          tradeTime: null //交易时间
        },
        queryForm: {
          current_page: 1, //当前页码数
          page_size: 8, //每页显示的最大记录数
          total_count: 0, //总记录数


        },
        result: [],
        dialogVisible: false,
        dialogTitle: '充值审核',
        mergeFormRules: {

        }
      };
    },
    created: function() {
      this.search();
      this.queryMoney();
    },
    methods: {
      //查询操作
      search: function(index, row) {



        this.reChargeForm.tradeTime = row.tradeTime; //交易时间

        this.dialogVisible = true;
      },
      queryMoney:function(){
        this.reChargeForm.auditId=this.$store.getters.userid;

      },

      //点击提交文本
      toSubmit: function() {//保存操作
        //this.reChargeForm.

      },
      //更改每页显示行数
      handleSizeChange(rows) {
        console.log('rows=%i', rows);
        this.queryForm.page_size = rows;
        this.queryForm.current_page = 1;
        this.queryMoney();
      },
      //更改当前页码数
      handleCurrentChange(page) {
        console.log('page=%i', page);
        this.queryForm.current_page = page;
        this.queryMoney();
      }


    }
  }


</script>

<style>
</style>
