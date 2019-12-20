<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" >
      <el-breadcrumb-item style="font-size: 20px;">审核项目</el-breadcrumb-item>
      <el-breadcrumb-item style="font-size: 20px;">提现审核</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="searchBox">
      <el-form-item label="审核状态">
        <el-select v-model="reChargeForm.state" clearable>
          <el-option v-for="item in types01" :value="item.value" :label="item.typeName" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请时间">
        <!--applytime-->
        <!--<span class="demonstration">带快捷选项</span>-->
        <el-date-picker v-model="value4" type="datetimerange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" align="right">
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
                     :current-page="reChargeForm.current_page"
                     :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
                     :total="reChargeForm.total_count">
      </el-pagination>
    </div>
    <!-- 添加和编辑操作-->
    <el-dialog title="提现审核编辑" :visible.sync="dialogVisible" @close="doDialogMergeFormClose" width="60%"
               style="margin-top: -30px;">
      <!--<el-form :model="mergeForm" :rules="MergeFormRules" ref="mergeForm" label-position="left" label-width="120px">-->
      <el-form :inline="true" :model="reChargeForm2" ref="mergeForm" :rules="MergeFormRules" label-position="left"
               label-width="100px" style="overflow: auto;max-height: 420px;">
        <!--<div style="height: 500px;overflow: auto;">-->
        <div>
          <!--充值ID不可被编辑 -->
          <el-form-item label="提现ID" prop="cashid">
            <el-input style="width: 300px;" v-model="reChargeForm2.cashid" readonly="readonly"
                      auto-complete="off"></el-input>
          </el-form-item>
          <!--银行卡ID-->
          <el-form-item label="银行卡ID" prop="bankid" style="margin-left: 60px;">
            <el-input style="width: 300px;" v-model="reChargeForm2.bankid" readonly="readonly" auto-complete="off"
                      placeholder=""></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="提现金额" prop="cashmoney">
            <el-input style="width: 300px;" v-model="reChargeForm2.cashmoney" readonly="readonly" auto-complete="off"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="交易时间" prop="tradeTime" style="margin-left: 60px;" >
            <el-date-picker type="datetime" v-model="reChargeForm2.tradetime" style="width: 300px;"  readonly="readonly" auto-complete="off"
                            placeholder=""></el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="平台服务费" prop="servicefee">
            <el-input style="width: 300px;" v-model="reChargeForm2.servicefee" readonly="readonly" auto-complete="off"
                      placeholder=""></el-input>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="备注" prop="remarkk">
            <el-input type="textarea" rows="3" style="width: 770px;" v-model="reChargeForm2.remarkk"
                      auto-complete="off" maxlength="200"
                      placeholder="请输入你审核的备注信息"></el-input>
          </el-form-item>
          <el-form-item style="width: 500px;" label="审核结果" prop="state">
            <!--<el-radio v-model="mergeForm.state" value="1" label="通过"  border></el-radio>-->
            <!--<el-radio v-model="mergeForm.state" value="2" label="拒绝"  border></el-radio>-->
            <el-radio-group v-model="reChargeForm2.state" size="small">
              <el-radio label="1" border>通过</el-radio>
              <el-radio label="2" border>拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doMergeForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
  export default {
    data: function () {
      return {
        reChargeForm: {//search方法
          state:null,//状态
          startTime: null,//起始时间
          endTime: null,//结束时间
          current_page: 1, //当前显示的页码数
          page_size: 10, //每页显示的最大页码数
          total_count: 0 //总记录数
        },
        reChargeForm2: {
          cashid: null,//提现ID
          bankid: null, //银行卡ID
          cashmoney: null, //提现金额
          tradetime: null, //交易时间
          servicefee: null,//平台服务费
          auditid: null, //审核ID
          remarkk: null,
          state: null
        },
        result: [],
        currentRow:null,
        //日期值的  到时候查询结果里面有
        value1: '',
        dialogVisible: false,
        dialogTitle: '提现审核',
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
        value4: '',


      };
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
      search: function () {
        if (this.value4 != null && this.value4.length > 0) {
          //起始时间
          const t1 = this.value4[0].toLocaleString().substr(0, 10);
          const t2 = this.value4[0].toLocaleString().substr(13);
          this.reChargeForm.startTime = t1 + " " + t2;
          //结束时间
          const t01 = this.value4[1].toLocaleString().substr(0, 10);
          const t02 = this.value4[1].toLocaleString().substr(13);
          this.reChargeForm.endTime = t01 + " " + t02;
        }else {
          this.reChargeForm.startTime = null;
          this.reChargeForm.endTime = null;
        }
        console.log(this.reChargeForm);
        console.log("search...");
        let url = this.axios.urls.CASH_LISTALLCASH;
        this.axios.post(url, this.reChargeForm).then((resp) => {
          this.result = resp.data.result;
          this.reChargeForm.total_count = resp.data.total;
        }).catch((error) => {
          console.log(error);
        });


      },
      //序列显示方法
      indexMethod(index) {
        return (this.reChargeForm.current_page - 1) * this.reChargeForm.page_size + (index + 1);
      },
      //修改方法
      handleEdit: function (row) {
        if (row.audit.state != null && row.audit.state != 3) {
          this.reChargeForm2.state = row.audit.state.toString();
          console.log("状态id", this.reChargeForm2.state);
        }
        this.reChargeForm2.cashid = row.cashid;
        this.reChargeForm2.bankid = row.bankid;
        this.reChargeForm2.cashmoney = row.cashmoney;
        this.reChargeForm2.tradetime = row.tradetime;

        this.reChargeForm2.servicefee = row.servicefee;
        this.reChargeForm2.state = row.audit.state;

        this.reChargeForm2.auditid = row.audit.auditid;

        // this.mergeForm.custCredit = row.image1;
        // this.mergeForm.custAddr = row.image2;
        // this.mergeForm.custZip = row.auditId.toLocaleString();

        this.dialogVisible = true;
      },

      //确定按钮
      doMergeForm: function () {
        //新增和修改同是调用此方法
        // console.log('doMergeForm...');
        // console.log(this.mergeForm);
        this.$refs['reChargeForm2'].validate((valid) => {
          if (false === valid) {
            return false;
          }

          //创建一个提交表单
          let from01 = {
            remarkk: this.reChargeForm2.remarkk,
            state: this.reChargeForm2.state,
            aid: this.reChargeForm2.auditid,
            auditid: this.$store.getters.userId
          }

          let url = this.axios.urls['CASH_EDITCASH'];
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
            cashid: row.cashid,
            aid: row.audit.auditid
          }

          let url = this.axios.urls.CASH_DELCASH;
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
        this.$refs['reChargeForm2'].resetFields(); //清空验证信息
      },

      doDialogMergeFormClose: function () {
        console.log('close...');
        this.handleDialogClose();
      },

    }
  }

</script>

<style>
</style>

