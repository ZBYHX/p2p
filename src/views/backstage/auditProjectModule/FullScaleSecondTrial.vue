<template>

  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px;font-family: '宋体';font-weight: bold;">
      <el-breadcrumb-item>审核项目</el-breadcrumb-item>
      <el-breadcrumb-item>满标二审</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="searchBox">
      <el-form-item label="审核时间">
        <el-date-picker type="date" size="small" placeholder="选择日期" v-model="reChargeQuery.auditTime" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item style="float: right;margin-right: 30px;">
        <el-button type="success" width="200px" icon="el-icon-question">&emsp;帮&emsp;助&emsp;</el-button>
        <el-button type="primary" width="200px" icon="el-icon-search" @click="search()">&emsp;查&emsp;询&emsp;</el-button>
      </el-form-item>
    </el-form>
    <hr />
    <el-form label-width="80px">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="fullsID" label="满标二审ID" min-width="10">
        </el-table-column>
        <el-table-column prop="fullNameId" label="满标审核ID" min-width="15">
        </el-table-column>
        <el-table-column prop="auditTime" label="审核时间" min-width="15">
        </el-table-column>
        <el-table-column prop="auditorId" label="审核人ID" min-width="15">
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="20">
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
      <el-form :inline="true" :model="fillBidsForm" ref="valide" :rules="mergeFormRules" label-position="left"
               label-width="80px" style="overflow: auto;max-height: 400px;">
        <div>
          <el-form-item label="满标二审ID" v-if="false" prop="fullsID">
            <el-input type="hidden" v-model="fillBidsForm.fullsID" readonly="readonly"></el-input>
          </el-form-item><br />
          <el-form-item label="满标审核ID" prop="fullNameId">
            <el-input style="width: 300px;" size="20" v-model="fillBidsForm.fullNameId" readonly="readonly"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="审核ID" prop="auditorId">
            <el-input style="width: 300px;" v-model="fillBidsForm.auditorId" readonly="readonly" ></el-input>
          </el-form-item>
        </div>
        <div>
        </div>
        <div>
          <el-form-item label="审核时间" prop="auditTime">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期(自动)" v-model="fillBidsForm.auditTime" style="width: 80%;"
                              readonly="readonly"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间(自动)" v-model="fillBidsForm.auditTime" style="width: 80%;" readonly="readonly"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" rows="12" v-model="fillBidsForm.remark" placeholder="请填写您的备注" maxlength="3000"
                      show-word-limit></el-input>
          </el-form-item><br />
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
        fillBidsForm: {
          fullsID:null,//满标一审ID
          fullNameId: null, //满标审核ID（1=满标一审,2=满标二审)
          auditTime: null, //审核时间
          auditorId: null, //审核人ID
          remark:null,//备注
          current_page: 1, //当前显示的页码数
          page_size: 10, //每页显示的最大页码数
          total_count: 0 //总记录数
        },
        reChargeQuery: {
          auditTime: null //交易时间
        },
        queryForm: {
          current_page: 1, //当前页码数
          page_size: 8, //每页显示的最大记录数
          total_count: 0, //总记录数


        },
        result: [],
        dialogVisible: false,
        dialogTitle: '满标二审',
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



        this.reChargeForm.auditTime = row.auditTime; //审核时间

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
