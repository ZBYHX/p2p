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
            <div class="bd">
              <dl>
                <dt>项目类型</dt>
                <dd>
                  <ul>
                    <li class="n1"><a href="javascript:url('post_type','');" @click="searchProject('0')" id="type0"
                                      class="active">不限</a></li>
                    <li class="n2"><a href="javascript:url('post_type','car');" @click="searchProject('1')" id="type1">车易贷</a>
                    </li>
                    <li class="n3"><a href="javascript:url('post_type','house');" @click="searchProject('2')"
                                      id="type2">房易贷</a></li>
                    <li class="n4"><a href="javascript:url('post_type','bridge');" @click="searchProject('3')"
                                      id="type3">赎楼贷</a></li>
                    <li class="n5"><a href="javascript:url('post_type','worth');" @click="searchProject('4')"
                                      id="type4">债权贷</a></li>
                    <li class="n5"><a href="javascript:url('post_type','worth');" @click="searchProject('5')"
                                      id="type5">其他贷款</a></li>
                  </ul>
                </dd>
              </dl>
              <dl>
                <dt>年利率</dt>
                <dd>
                  <ul>
                    <li class="n1"><a href="javascript:url('borrow_interestrate','');" id="borrow0"
                                      @click="searchProject1('0')"
                                      class="active">不限</a></li>
                    <li class="n2"><a id="borrow1"
                                      href="javascript:url('borrow_interestrate','1');" @click="searchProject1('1')">12%以下</a>
                    </li>
                    <li class="n3"><a id="borrow2"
                                      href="javascript:url('borrow_interestrate','2');" @click="searchProject1('2')">12%-14%</a>
                    </li>
                    <li class="n4"><a id="borrow3"
                                      href="javascript:url('borrow_interestrate','3');" @click="searchProject1('3')">14%-16%</a>
                    </li>
                    <li class="n5"><a id="borrow4"
                                      href="javascript:url('borrow_interestrate','4');" @click="searchProject1('4')">16%及以上</a>
                    </li>
                  </ul>
                </dd>
              </dl>
              <dl>
                <dt>期限</dt>
                <dd>
                  <ul>
                    <li class="n1"><a href="javascript:url('spread_month','');" @click="searchProject2('0')" id="month0"
                                      class="active">不限</a>
                    </li>
                    <li class="n2"><a id="month1" href="javascript:url('spread_month','1');"
                                      @click="searchProject2('1')">1月以下</a></li>
                    <li class="n3"><a id="month2" href="javascript:url('spread_month','2');"
                                      @click="searchProject2('2')">1-3月</a></li>
                    <li class="n4"><a id="month3" href="javascript:url('spread_month','3');"
                                      @click="searchProject2('3')">3-6月</a></li>
                    <li class="n5"><a id="month4" href="javascript:url('spread_month','4');"
                                      @click="searchProject2('4')">6-12月</a></li>
                    <li class="n6"><a id="month5" href="javascript:url('spread_month','5');"
                                      @click="searchProject2('5')">12月及以上</a></li>
                  </ul>
                </dd>
              </dl>
              <dl class="repayment">
                <dt>还款方式</dt>
                <dd>
                  <ul>
                    <li class="n1"><a @click="searchProject3('0')" href="javascript:url('repay_style','');" id="time0"
                                      class="active">不限</a>
                    </li>
                    <li class="n2"><a @click="searchProject3('1')" id="time1"
                                      href="javascript:url('repay_style','end');">到期还本付息</a></li>
                    <li class="n2"><a id="time2" @click="searchProject3('2')"
                                      href="javascript:url('repay_style','endmonth');">按月付息,到期还本</a></li>
                    <li class="n2"><a @click="searchProject3('3')" id="time3"
                                      href="javascript:url('repay_style','month');">等额本息</a></li>
                  </ul>
                </dd>
              </dl>
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
              <li class="line">散标投资交易金额&nbsp;&nbsp;<span class="f20 bold">x￥(万)</span></li>
              <li>累计赚取收益&nbsp;&nbsp;<span class="f20 bold">x￥(万)</span></li>
            </ul>
          </div>
        </div>
        <div class="bd">
          <div class="invest-table clearfix">
            <!-- 数据表格 -->
            <el-table :data="dataResult" border style="width: 99%">

              <el-table-column prop="callBids.title" label="借款标题" width="280"></el-table-column>

              <el-table-column prop="callBids.totalrewardamount" label="借款金额" width="145"></el-table-column>

              <el-table-column prop="projecttypeid" label="投资类型" width="123">
                <template slot-scope="scope">
                  <span>{{scope.row.projecttypeid===4?'债权贷款':'其他贷'|| scope.row.projecttypeid===1?'车易贷':'其他贷'|| scope.row.projecttypeid===2?'房易贷':'其他贷'||scope.row.projecttypeid===3?'赎楼贷':'其他贷' }}</span>
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
                  <el-button size="mini" type="success" @click="" class="">我要投标</el-button>
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
        dialogTitle: '',
        labelPosition: 'left',
        dataResult: [],
        queryForm: {
          current_page: 1, //当前页码数
          page_size: 7, //每页显示的最大记录数
          total_count: 0, //总记录数
          // min: null,
          // max: null
        },
        queryForm1: {
          typeName: null,
          borrowTypeName: null,
          borrowtimeid: null,
          yearcountid: null,
        },
        // list: ["1-5000", "5001-10000", "10001-20000", "20001-50000", "50001-100000", "100001-200000", "200001-100000000"],
        mergeForm: {},
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
      //查询的方法
      loadAll: function () {
        // var min = null;
        // var max = null;
        // let str = this.queryForm.totalamount00;
        // if (str != null && str.length > 0) {
        //   let str1 = str.split("-");
        //   min = str1[0];
        //   max = str1[1];
        // }
        // console.log("最小值：", min);
        // console.log("最大值：", max);
        //将参数传到后台
        // this.queryForm.min = min;
        // this.queryForm.max = max;

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
    }

  }

</script>


<style>
  @import "../static/css/common.css";
  @import "../static/css/index.css";
  @import "../static/css/detail.css";

</style>
