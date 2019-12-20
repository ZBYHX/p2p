<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item style="font-size: 20px;">审核管理</el-breadcrumb-item>
      <el-breadcrumb-item style="font-size: 20px;">银行卡认证审核</el-breadcrumb-item>
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
          <el-button type="danger" icon="el-icon-delete" @click="del(scope.row)">删除</el-button>
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
      <!--实名认证ID不可被编辑 -->
      <el-form :inline="true" :model="mergeForm" ref="mergeForm" :rules="MergeFormRules" label-position="left"
               label-width="100px" style="overflow: auto;max-height: 420px;">

        <div>
          <!-- 银行卡ID-->
          <el-form-item label="银行卡ID" prop="bankid">
            <el-input v-model="mergeForm.bankid" style="width: 300px;" auto-complete="off"
                      placeholder="请输入银行卡ID" readonly="readonly"></el-input>
          </el-form-item>
          <!-- 银行名称-->
          <el-form-item label="银行名称" prop="bankname" style="margin-left: 60px;">
            <el-input v-model="mergeForm.bankname" auto-complete="off" readonly="readonly" placeholder="请输入银行名称"></el-input>
          </el-form-item>
        </div>

        <div>
          <!--真实姓名 -->
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="mergeForm.realname" style="width: 300px;" auto-complete="off" readonly="readonly"
                      placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <!--身份证ID -->
          <el-form-item label="身份证ID" prop="idnumber" style="margin-left: 60px;">
            <el-input v-model="mergeForm.idnumber" auto-complete="off" readonly="readonly" placeholder="请输入身份证ID"></el-input>
          </el-form-item>
        </div>

        <div>
          <!-- 银行卡号-->
          <el-form-item label="银行卡号" prop="banknumber">
            <el-input v-model="mergeForm.banknumber" style="width: 300px;" readonly="readonly" auto-complete="off"
                      placeholder="请输入银行卡号"></el-input>
          </el-form-item>
          <!-- 手机号-->
          <el-form-item label="手机号" prop="phonenumber" style="margin-left: 60px;">
            <el-input v-model="mergeForm.phonenumber" auto-complete="off" readonly="readonly" placeholder="请输入手机号"></el-input>
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
          total_count: 0,
        },
        queryForm2: {
          state: null,//审核状态
          value4:null//申请时间
        },
        result: [],
        //日期值的  到时候查询结果里面有
        value1: '',
        currentRow: null,
        dialogMergeFormVisible: false,
        //定义一个行的ID属性
        banknameID: null,
        bankname: null,
        state: null,
        mergeForm: {
          bankid: null,
          bankname: null,
          realname: null,
          idnumber: null,
          banknumber: null,
          phonenumber: null,
          auditid: null,
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
        //console.log('rows=%i', rows);
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
        console.log('aaaaaaaa');
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

        let url = this.axios.urls.BANKCARD_LISTALLBANKCARD;
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
      handleEdit: function (row) {
        if (row.audit.state != null && row.audit.state != 3) {
          this.mergeForm.state = row.audit.state.toString();
          console.log("状态id", this.mergeForm.state);
        }
        this.mergeForm.bankid = row.bankid;
        this.mergeForm.bankname = row.bankname;

        this.mergeForm.realname = row.realname;
        this.mergeForm.idnumber = row.idnumber;
        this.mergeForm.banknumber = row.banknumber;

        this.mergeForm.phonenumber = row.phonenumber;
        this.mergeForm.auditid = row.auditid;

        this.mergeForm.remarkk = row.audit.remarkk;
        this.mergeForm.state = row.audit.state.toString();

        this.dialogMergeFormVisible = true;
      },

      doMergeForm: function () {
        //新增和修改同是调用此方法
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

          var url = this.axios.urls['BANKCARD_EDITBANKCARD'];
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
            bankid: row.bankid,
            aid: row.audit.auditid
          }
          let url = this.axios.urls.BANKCARD_DELBANKCARD;
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
        this.$refs['mergeForm'].resetFields(); //清空验证信息
      },

      doDialogMergeFormClose: function () {
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
