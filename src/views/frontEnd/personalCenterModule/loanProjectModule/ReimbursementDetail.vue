<template>
  <header>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" >
      <el-breadcrumb-item style="font-size: 20px;">我的账户</el-breadcrumb-item>
      <el-breadcrumb-item style="font-size: 20px;">借贷项目</el-breadcrumb-item>
      <el-breadcrumb-item style="font-size: 20px;">还款明细</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="width: 90%;margin-left: 280px;margin-top: -700px;">
      <el-table :data="result"  height="370px" border  highlight-current-row :summary-method="getSummaries"
                style="width: 90% " :model="mergeForm">
        <el-table-column type="index" label="序" :index="indexMethod" min-width="10" align="center">
        </el-table-column>
        <el-table-column prop="accountName" label="交易用户" width="180">
        </el-table-column>
        <el-table-column prop="amount"  label="交易金额" width="180">
        </el-table-column>
        <el-table-column prop="tradeTimeCN"  label="交易时间" width="180">
        </el-table-column>
        <el-table-column prop="servicefee"  label="服务费用" width="180">
        </el-table-column>
        <el-table-column prop="state" label="还款状态" width="180">
        </el-table-column>
      </el-table>
    </div>
    <!-- 完整分页 -->
    <div class="block" style="padding-top: 20px; text-align: left;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="reChargeForm.current_page"
                     :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
                     :total="reChargeForm.total_count">
      </el-pagination>
    </div>

  </header>



</template>

<script>
  export default {
    data:function () {
      return {
        reChargeForm: {//search方法
          state:null,//状态
          current_page: 1, //当前显示的页码数
          page_size: 10, //每页显示的最大页码数
          total_count: 0 //总记录数
        },
        result:[]
      }
    },
    created: function () {
      this.search();
    },
    methods: {
      search:function () {

        let url = this.axios.urls.QUERY_ACCOUNT_WATER;
        this.axios.post(url, {}).then((resp) => {
          this.result = resp.data.result;
          this.reChargeForm.total_count = resp.data.total;
        }).catch((error) => {
          console.log(error);
        });
      },
      //更改每页显示行数
      handleSizeChange(rows) {
        //console.log('rows=%i', rows);
        this.reChargeForm.page_size = rows;
        this.reChargeForm.current_page = 1;
        this.search();
      },
      //更改当前页码数
      handleCurrentChange(page) {
        this.selectCansle();
        //console.log('page=%i', page);
        this.reChargeForm.current_page = page;
        this.search();
      },
    }

  }
</script>

<style>
</style>
