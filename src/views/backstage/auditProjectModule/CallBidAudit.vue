<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item style="font-size: 20px;">审核管理</el-breadcrumb-item>
      <el-breadcrumb-item style="font-size: 20px;">招标审核</el-breadcrumb-item>
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
        <el-button size="middle" type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
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


    <!-- 查单个编辑操作-->
    <el-dialog title="银行卡认证编辑" :visible.sync="dialogMergeFormVisible" @close="doDialogMergeFormClose" width="60%"
               style="margin-top: -30px;">
      <el-form  :inline="true" :model="mergeForm" ref="mergeForm" :rules="MergeFormRules" label-position="left"
      label-width="100px" style="overflow: auto;max-height: 420px;">
        <div>
          <!--招标请求ID不可被编辑 -->
          <el-form-item label="招标请求ID" prop="callid">
            <el-input style="width: 300px;" v-model="mergeForm.callid" auto-complete="off"></el-input>
          </el-form-item>

          <!--招标请求类型 -->
          <el-form-item label="招标请求类型" prop="bidrequesttype" style="margin-left: 60px;">
            <el-input style="width: 300px;" v-model="mergeForm.bidrequesttype" auto-complete="off" placeholder="请输入招标请求类型"></el-input>
          </el-form-item>
        </div>

        <div>
          <!--招标请求状态-->
          <el-form-item label="招标请求状态" prop="bidrequeststate">
            <el-input style="width: 300px;" v-model="mergeForm.bidrequeststate" auto-complete="off" placeholder="请输入招标请求状态"></el-input>
          </el-form-item>

          <!--招标请求金额 -->
          <el-form-item label="招标请求金额" prop="bidrequestamount" style="margin-left: 60px;">
            <el-input style="width: 300px;" v-model="mergeForm.bidrequestamount" auto-complete="off" placeholder="请输入招标请求金额"></el-input>
          </el-form-item>
        </div>

        <div>
          <!--当前汇率 -->
          <el-form-item label="当前汇率" prop="currentrate">
            <el-input style="width: 300px;" v-model="mergeForm.currentrate" auto-complete="off" placeholder="请输入当前汇率"></el-input>
          </el-form-item>

          <!--投标数量 -->
          <el-form-item label="投标数量" prop="bidcount" style="margin-left: 60px;">
            <el-input style="width: 300px;" v-model="mergeForm.bidcount" auto-complete="off" placeholder="请输入投标数量"></el-input>
          </el-form-item>
        </div>

        <div>
          <!--总报酬金额 -->
          <el-form-item label="当前汇率" prop="totalrewardamount">
            <el-input style="width: 300px;" v-model="mergeForm.totalrewardamount" auto-complete="off" placeholder="请输入总报酬金额"></el-input>
          </el-form-item>

          <!--当前招标总金额 -->
          <el-form-item label="投标数量" prop="currentsum" style="margin-left: 60px;">
            <el-input style="width: 300px;" v-model="mergeForm.currentsum" auto-complete="off" placeholder="请输入当前招标总金额"></el-input>
          </el-form-item>
        </div>

        <div>
          <!--招标请求标题 -->
          <el-form-item label="招标请求标题" prop="title">
            <el-input style="width: 300px;" v-model="mergeForm.title" auto-complete="off" placeholder="请输入招标请求标题"></el-input>
          </el-form-item>

          <!--招标请求描述 -->
          <el-form-item label="招标请求描述" prop="description" style="margin-left: 60px;">
            <el-input style="width: 300px;" v-model="mergeForm.description" auto-complete="off" placeholder="请输入招标请求描述"></el-input>
          </el-form-item>
        </div>

        <div>
          <!--招标注意事项 -->
          <el-form-item label="招标注意事项" prop="note">
            <el-input style="width: 300px;" v-model="mergeForm.note" auto-complete="off" placeholder="请输入招标注意事项"></el-input>
          </el-form-item>

          <!--招标备注 -->
          <el-form-item label="招标备注" prop="remark" style="margin-left: 60px;">
            <el-input style="width: 300px;" v-model="mergeForm.remark" auto-complete="off" placeholder="请输入招标备注"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="备注" prop="remarkk">
            <el-input type="textarea" rows="3" style="width: 770px;" v-model="mergeForm.remarkk"
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
        <el-button @click="dialogMergeFormVisible = false">取 消</el-button>
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
          state: null,//审核状态
          value4:null,//申请时间
          startTime: null,//起始时间
          endTime: null,//结束时间
          current_page: 1,
          page_size: 10,
          total_count: 0
        },
        queryForm2: {
          state: null,//审核状态
          value4:null//申请时间
        },
        result: [],
        //日期值的  到时候查询结果里面有
        value1: '',
        currentRow: null,
        dialogMergeFormVisible:false,
        //定义一个行的ID属性
        banknameID: null,
        state: null,
        mergeForm: {
          callid: null,
          bidrequesttype: null,
          bidrequeststate: null,
          bidrequestamount: null,
          currentrate: null,
          bidcount: null,
          totalrewardamount: null,
          currentsum: null,
          title: null,
          description: null,
          note: null,
          auditid:null,
          remark:null,
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
        this.banknameID = null;
        this.bankname = null;
      },
      handelSelectRow(rows) {
        if (rows != null) {
          this.banknameID = rows.custNo;
          this.bankname = rows.bankname;
          this.currentRow = rows;
        }
      },
      //更改每页显示行数
      handleSizeChange(rows) {
        this.queryForm.page_size = rows;
        this.queryForm.current_page = 1;
        this.search();
      },
      //更改当前页码数
      handleCurrentChange(page) {
        this.selectCansle();
        this.queryForm.current_page = page;
        this.search();
      },
      search: function () {
        //分页Bug
        if (this.queryForm2.state != this.queryForm.state||this.queryForm2.value4!=this.queryForm.value4) {
          if (this.queryForm.state != null && this.queryForm.state != ''||this.queryForm.value4!=null&&this.queryForm.value4) {
            this.queryForm.current_page = 1;
          }
        }
        this.queryForm2.state = this.queryForm.state;
        this.queryForm2.value4=this.queryForm.value4;

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

        let url = this.axios.urls.CALLBIDS_LISTALLCALLBIDS;
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
      handleEdit: function(row) {
        this.mergeForm.callid = row.callid;
        this.mergeForm.bidrequesttype = row.bidrequesttype;
        this.mergeForm.bidrequeststate = row.bidrequeststate;

        this.mergeForm.bidrequestamount = row.bidrequestamount;
        this.mergeForm.currentrate = row.currentrate;
        this.mergeForm.bidcount = row.bidcount;

        this.mergeForm.totalrewardamount = row.totalrewardamount;
        this.mergeForm.currentsum = row.currentsum;
        this.mergeForm.title = row.title;

        this.mergeForm.description = row.description;
        this.mergeForm.note = row.note;
        this.mergeForm.auditid = row.auditid;

        this.mergeForm.remarkk = row.audit.remarkk;
        this.mergeForm.remark = row.remark;
        this.mergeForm.state = row.audit.state.toString();

        this.dialogMergeFormVisible = true;
      },

      doMergeForm: function() {
        //新增和修改同是调用此方法
        console.log('doMergeForm...');
        console.log(this.mergeForm);
        this.$refs['mergeForm'].validate((valid) => {
          if (false === valid) {
            return false;
          }

          //创建一个提交表单
          let from01 = {
            remarkk: this.mergeForm.remarkk,
            state: this.mergeForm.state,
            aid: this.mergeForm.auditid,
            auditorid: this.$store.getters.userId
          }

          var url = this.axios.urls['CALLBIDS_EDITCALLBIDS'];
          this.axios.post(url, from01).then((response) => {
            if (0 === response.data.code) {
              this.$message({
                message: response.data.message,
                type: 'success'
              });
            }
            this.search();
          }).catch(function(error) {
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
            callid: row.callid,
            aid: row.audit.auditid
          }
          let url = this.axios.urls.CALLBIDS_DELCALLBIDS;
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
      handleDialogClose: function() {
        this.$refs['mergeForm'].resetFields(); //清空验证信息
        //this.doClearMergeForm();
      },

      doDialogMergeFormClose: function() {
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
</style>
