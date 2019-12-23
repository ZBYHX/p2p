<template>
  <header>
    <!--列表-->
    <div class="page-filter wrap">
      <div class="breadcrumbs"><a href="index.html">首页</a>&gt;<span class="cur">散标投资列表</span></div>
      <div class="invest-filter" data-target="sideMenu">
        <div class="filter-inner clearfix">
          <div class="filter-item">
            <div class="hd">
              <h3>筛选投资项目</h3>
              <!--<label>-->
              <!--<input id="filterMulti" name="multiple_choice" type="checkbox">-->
              <!--多选</label>-->
            </div>
            <br/>
            <div>
              <el-form>
                <el-form-item>
                  <el-input placeholder="请输入还款期" v-model="queryForm.borrowtimeid" style="width: 300px;"
                            clearable></el-input>
                  <el-select v-model="queryForm.borrowtype" placeholder="请选择类型" key="-1" value="-1" clearable>
                    <el-option v-for="item in types01" :label="item.label" :value="item.value"
                               :key="item.value"></el-option>
                  </el-select>
                  <el-select v-model="queryForm.projecttypeid" placeholder="请选择类型" key="-2" value="-2" clearable>
                    <el-option v-for="item in types02" :label="item.label" :value="item.value"
                               :key="item.value"></el-option>
                  </el-select>
                  <el-button icon="el-icon-search" @click="loadAll()">搜索</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="common-problem">
            <h3>常见问题</h3>
            <ul>
              <li><a href="#">什么是债权贷？</a></li>
              <li><a href="#">关于"债权贷"产品的说明</a></li>
              <li><a href="#">易贷网P2P理财收费标准</a></li>
              <li><a href="#">债权贷和房易贷、车易贷有什么区别？</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="invest-list mrt30 clearfix">
        <div class="hd">
          <h3>投资列表</h3>
          <div class="count">
            <ul>
              <li class="line">散标投资交易金额&nbsp;&nbsp;<span class="f20 bold">{{sumMoney}}￥(万)</span></li>
              <li>累计赚取收益&nbsp;&nbsp;<span class="f20 bold">{{earn}}￥(万)</span></li>
            </ul>
          </div>
        </div>
        <div class="bd">
          <div class="invest-table clearfix">
            <!-- 数据表格 -->
            <el-table :data="dataResult" border style="width: 99%">

              <el-table-column prop="callBids.title" label="借款标题" width="280"></el-table-column>

              <el-table-column prop="callBids.bidrequestamount" label="借款金额" width="145"></el-table-column>

              <el-table-column prop="projecttypeid" label="投资类型" width="123">
                <template slot-scope="scope">
                  <span>{{scope.row.projecttypeid===1?'车易贷':(scope.row.projecttypeid===2?'房易贷':(scope.row.projecttypeid===3?'赎楼贷':(scope.row.projecttypeid===4?'债权贷款':'其他贷')))}}</span>
                </template>
              </el-table-column>

              <el-table-column prop="yearcountid" label="年利率" width="100"></el-table-column>

              <el-table-column prop="borrowtimeid" label="借款期限(月)" width="110"></el-table-column>

              <el-table-column prop="borrowtype" label="还款方式" width="150">
                <template slot-scope="scope">
                  <span>{{scope.row.borrowtype===1?'按月还息到期还本':(scope.row.borrowtype===2?'等额本息法还款':'一次性还款')}}</span>
                </template>
              </el-table-column>

              <el-table-column prop="x" label="借款进度" width="130">
                <template slot-scope="scope">
                  <span> <el-progress :text-inside="true" :stroke-width="24"
                                      :percentage="Math.round((parseInt(scope.row.callBids.currentsum)/parseInt(scope.row.callBids.bidrequestamount))*100)"
                                      status="success"></el-progress></span>
                </template>

              </el-table-column>
              <!--currentSum 当前招标总金额-->
              <!--bidRequestAmount 招标请求金额-->

              <el-table-column label="操作" width="110px">
                <template label="操作" min-width="10px" slot-scope="scope">
                  <el-button size="mini" @click="toubiao" class="">我要投标</el-button>
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

            <!--添加和编辑操作-->
            <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" @close="handleDialogClose">
              <el-form ref="mergeForm" :label-position="labelPosition"
                       label-width="130px">
                <el-form-item label="申请用户" prop="applierid">
                  <el-input :readonly="diss" v-model="mergeForm.applierid"></el-input>
                </el-form-item>
                <el-form-item label="投资金额" prop="bidmoney">
                  <el-input v-model="mergeForm.bidmoney"></el-input>
                </el-form-item>
                <el-form-item label="实际汇率" :readonly="diss" prop="actualrate">
                  <el-input v-model="mergeForm.actualrate"></el-input>
                </el-form-item>
                <el-form-item label="投资备注" prop="remark">
                  <el-input v-model="mergeForm.remark"></el-input>
                </el-form-item>
                <el-form-item label="审核人" :readonly="diss" prop="audit.userName">
                  <el-input v-model="mergeForm.audit"></el-input>
                </el-form-item>
                <el-form-item :readonly="diss" label="审核时间" prop="audit.audittime">
                  <el-input v-model="mergeForm.audit"></el-input>
                </el-form-item>
                <el-form-item :readonly="diss" label="申请时间" prop="audit.applytime">
                  <el-input v-model="mergeForm.audit"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="dialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="suretoubiao()">确 定</el-button>
              </div>
            </el-dialog>

          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import {jquery} from "../static/script/jquery.min";
  import {common} from "../static/script/common"

  export default {
    data: function () {
      return {
        diss: null,
        dialogVisible: false,
        dialogTitle: '我要投标界面 ',
        labelPosition: 'left',
        dataResult: [],
        sumMoney: null,
        earn: null,
        queryForm: {
          current_page: 1, //当前页码数
          page_size: 7, //每页显示的最大记录数
          total_count: 0, //总记录数
        },
        queryForm1: {
          typeName: null,
          borrowtype: null,
          borrowTypeName: null,
          borrowtimeid: null,
          yearcountid: null,
          projecttypeid: null
        },
        queryForm2: {
          bidmoney: null,
          bidtime: null,
          actualrate: null,
          remark: null,
          audit: null,
        },
        mergeForm: {
          bidmoney: null,
          bidtime: null,
          actualrate: null,
          audittime: null,
          remark: null,
          audit: null,
          applierid: null,
          applytime: null,
        },
        types01: [{
          value: '1',
          label: '按月还息到期还本'
        }, {
          value: '2',
          label: '等额本息法还款'
        }, {
          value: '3',
          label: '一次性还款'
        }],
        types02: [{
          value: '1',
          label: '车易贷'
        }, {
          value: '2',
          label: '房易贷'
        }, {
          value: '3',
          label: '赎楼贷'
        }, {
          value: '4',
          label: '债权贷款'
        }, {
          value: '5',
          label: '其他贷款'
        }],
        mergeFormRules: {},

      }
    },
    methods: {
      //查询项目类型的方法
      searchProject: function (t) {
        $("#type" + 0).removeClass("active");
        $("#type" + 1).removeClass("active");
        $("#type" + 2).removeClass("active");
        $("#type" + 3).removeClass("active");
        $("#type" + 4).removeClass("active");
        $("#type" + 5).removeClass("active");
        $('#type' + t).addClass("active");
      },
      searchProject1: function (t) {
        $("#borrow" + 0).removeClass("active");
        $("#borrow" + 1).removeClass("active");
        $("#borrow" + 2).removeClass("active");
        $("#borrow" + 3).removeClass("active");
        $("#borrow" + 4).removeClass("active");
        $("#borrow" + t).addClass("active");
      },
      searchProject2: function (t) {
        $("#month" + 0).removeClass("active");
        $("#month" + 1).removeClass("active");
        $("#month" + 2).removeClass("active");
        $("#month" + 3).removeClass("active");
        $("#month" + 4).removeClass("active");
        $("#month" + 5).removeClass("active");
        $("#month" + t).addClass("active");
      },
      searchProject3: function (t) {
        $("#time" + 0).removeClass("active");
        $("#time" + 1).removeClass("active");
        $("#time" + 2).removeClass("active");
        $("#time" + 3).removeClass("active");
        $("#time" + t).addClass("active");
      },

      clickInfor: function () {
        this.$router.replace({
          path: "/Infor"
        });
      },

      toubiao: function () {

        this.dialogVisible = true;
        this.diss = true;
      },

      suretoubiao: function () {
        this.$refs['mergeForm'].validate((valid) => {
          if (false === valid) {
            return false;
          }
          let url = this.axios.urls['EDIT_JKMANAGER'];
          this.axios.post(url, {
              // payid: this.mergeForm.payid,
              // totalAmount: this.mergeForm.totalamount,
              // principal: this.mergeForm.principal,
              // monthIndex: this.mergeForm.monthindex,
              // state: this.mergeForm.state,
            }
          ).then((response) => {
            this.$router.replace({
              path: "/Infor"
            });
            this.$message({
              message: response.data.message,
              type: 'success'
            });
            if (null == this.mergeForm) {
              this.handleDialogClose();
            }
            this.loadAll();
          }).catch((error) => {
          });
        });
      },
      //清空表单中的数据
      doClearMergeForm: function () {
        // 清空后台提交表单数据
        this.mergeForm.bidmoney = null,
          this.mergeForm.bidtime = null,
          this.mergeForm.actualrate = null,
          this.mergeForm.audittime = null,
          this.mergeForm.remark = null,
          this.mergeForm.audit = null,
          this.mergeForm.applierid = null,
          this.mergeForm.applytime = null
        // this.$refs['mergeForm'].resetFields(); //清空验证信息

      },

      loadMoney: function () {
        let url = this.axios.urls['LIST_CALLBIDSTYPE'];
        this.axios.post(url, this.queryForm).then((response) => {
          this.result2 = response.data.result;
          for (let i = 0; i < this.result2.length; i++) {
            if (this.result2[i].callBids.bidrequeststate == 1) {
              this.sumMoney += this.result2[i].callBids.currentsum;
              this.earn += (this.result2[i].callBids.currentrate) * (this.result2[i].callBids.currentsum);
            }
          }
        }).catch((response) => {
          console.log(Error);
        });
      },
      //查询的方法
      loadAll: function () {
        if (this.queryForm.borrowtimeid != this.queryForm1.borrowtimeid || this.queryForm.yearcountid != this.queryForm1.yearcountid || this.queryForm.typeName != this.queryForm1.typeName || this.queryForm1.borrowTypeName != this.queryForm.borrowTypeName) {
          if (this.queryForm.typeName != null && this.queryForm.typeName != '') {
            this.queryForm.current_page = 1;
          }
          if (this.queryForm.borrowTypeName != null && this.queryForm.borrowTypeName != '') {
            this.queryForm.current_page = 1;
          }
          if (this.queryForm.borrowtimeid != null && this.queryForm.borrowtimeid != '') {
            this.queryForm.current_page = 1;
          }
          if (this.queryForm.yearcountid != null && this.queryForm.yearcountid != '') {
            this.queryForm.current_page = 1;
          }
        }
        this.queryForm1.typeName = this.queryForm.typeName;
        this.queryForm1.borrowTypeName = this.queryForm.borrowTypeName;
        this.queryForm1.borrowtimeid = this.queryForm.borrowtimeid;
        this.queryForm1.yearcountid = this.queryForm.yearcountid;

        let url = this.axios.urls['LIST_CALLBIDSTYPE'];
        this.axios.post(url, this.queryForm).then((response) => {
          this.dataResult = response.data.result;
          this.queryForm.total_count = response.data.total;
        }).catch((response) => {
          console.log(Error);
        });
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
      //序列显示方法
      indexMethod(index) {
        return (this.queryForm.current_page - 1) * this.queryForm.page_size + (index + 1);
      },
    },
    created() {
      this.loadAll();
      this.loadMoney();
    }

  }

</script>


<style>
  @import "../static/css/common.css";
  @import "../static/css/index.css";
  @import "../static/css/detail.css";

</style>
