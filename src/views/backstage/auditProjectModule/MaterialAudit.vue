<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item style="font-size: 20px;">审核管理</el-breadcrumb-item>
      <el-breadcrumb-item style="font-size: 20px;">材料认证审核</el-breadcrumb-item>
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
          <!--<el-button type="primary" icon="el-icon-edit" @click="handleEditFile(scope.row)">{{scope.row.audit.diableState}}-->
          <!--</el-button>-->
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

    <!-- 添加和编辑操作-->
    <el-dialog title="材料认证编辑" :visible.sync="dialogMergeFormVisible" @close="doDialogMergeFormClose" width="60%"
               style="margin-top: -30px;">
      <el-form :inline="true" :model="mergeForm" ref="mergeForm" :rules="MergeFormRules" label-position="left"
               label-width="100px" style="overflow: auto;max-height: 420px;">
        <div>
          <!--认证材料ID不可被编辑 -->
          <el-form-item label="认证材料ID" prop="materid">
            <el-input style="width: 300px;" v-model="mergeForm.materid" auto-complete="off" placeholder="请输入认证材料ID"></el-input>
          </el-form-item>
          <!-- 用户ID-->
          <el-form-item  label="用户ID" prop="userid" style="margin-left: 60px;">
            <el-input style="width: 300px;"  v-model="mergeForm.userid" auto-complete="off" placeholder="请输入用户ID"></el-input>
          </el-form-item>
        </div>

        <div>
          <!--手机号 -->
          <el-form-item label="手机号" prop="phonenumber">
            <el-input v-model="mergeForm.phonenumber" style="width: 300px;" auto-complete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <!-- 收入ID-->
          <el-form-item label="收入ID" prop="incomegradeid" style="margin-left: 60px;">
            <el-input v-model="mergeForm.incomegradeid" style="width: 300px;" auto-complete="off" placeholder="请输入收入ID"></el-input>
          </el-form-item>
        </div>

        <div>
          <!--婚姻情况ID -->
          <el-form-item label="婚姻情况ID" prop="marriageid">
            <el-input v-model="mergeForm.marriageid" style="width: 300px;" auto-complete="off" placeholder="请输入婚姻情况ID"></el-input>
          </el-form-item>

          <!--子女情况ID-->
          <el-form-item label="子女情况ID" prop="kidcountid" style="margin-left: 60px;">
            <el-input v-model="mergeForm.kidcountid" style="width: 300px;" auto-complete="off" placeholder="请输入民族"></el-input>
          </el-form-item>
        </div>

        <div>
          <!--学历ID -->
          <el-form-item label="学历ID" prop="educateid">
            <el-input v-model="mergeForm.educateid" style="width: 300px;" auto-complete="off" placeholder="请输入学历ID"></el-input>
          </el-form-item>
          <!--住房条件ID -->
          <el-form-item label="住房条件ID" prop="houseconditionid" style="margin-left: 60px;">
            <el-input v-model="mergeForm.houseconditionid" style="width: 300px;" auto-complete="off" placeholder="请输入住房条件"></el-input>
          </el-form-item>
        </div>

        <div>
          <!--审核ID -->
          <el-form-item label="审核ID" prop="auditid">
            <el-input v-model="mergeForm.auditid" style="width: 300px;" auto-complete="off" placeholder="请输入审核ID"></el-input>
          </el-form-item>
          <!--备注 -->
          <el-form-item label="备注" prop="remark" style="margin-left: 60px;">
            <el-input v-model="mergeForm.remark" style="width: 300px;" auto-complete="off" placeholder="请输入备注"></el-input>
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

    <!--&lt;!&ndash; 认证材料文件编辑操作&ndash;&gt;-->
    <!--<el-dialog title="材料文件认证编辑" :visible.sync="dialogMergeFormVisible" @close="doDialogMergeFormClose" width="60%"-->
               <!--style="margin-top: -30px;">-->
      <!--<el-form :inline="true" :model="mergeForm" ref="mergeForm" :rules="MergeFormRules" label-position="left"-->
               <!--label-width="100px" style="overflow: auto;max-height: 420px;">-->
        <!--<div>-->
          <!--&lt;!&ndash; 文件ID&ndash;&gt;-->
          <!--<el-form-item  label="用户ID" prop="fileid" style="margin-left: 60px;">-->
            <!--<el-input style="width: 300px;"  v-model="mergeForm.fileid" auto-complete="off" placeholder="请输入文件ID"></el-input>-->
          <!--</el-form-item>-->
          <!--&lt;!&ndash; 认证材料ID&ndash;&gt;-->
          <!--<el-form-item label="认证材料ID" prop="materid">-->
            <!--<el-input style="width: 300px;" v-model="mergeForm.materid" auto-complete="off" placeholder="请输入认证材料ID"></el-input>-->
          <!--</el-form-item>-->
        <!--</div>-->

        <!--<div>-->
          <!--&lt;!&ndash;手机号 &ndash;&gt;-->
          <!--<el-form-item label="手机号" prop="state">-->
            <!--<el-input v-model="mergeForm.state" style="width: 300px;" auto-complete="off" placeholder="请选择状态"></el-input>-->
          <!--</el-form-item>-->
          <!--&lt;!&ndash; 收入ID&ndash;&gt;-->
          <!--<el-form-item label="收入ID" prop="incomegradeid" style="margin-left: 60px;">-->
            <!--<el-input v-model="mergeForm.incomegradeid" style="width: 300px;" auto-complete="off" placeholder="请输入收入ID"></el-input>-->
          <!--</el-form-item>-->
        <!--</div>-->

        <!--<div>-->
          <!--&lt;!&ndash;婚姻情况ID &ndash;&gt;-->
          <!--<el-form-item label="婚姻情况ID" prop="marriageid">-->
            <!--<el-input v-model="mergeForm.marriageid" style="width: 300px;" auto-complete="off" placeholder="请输入婚姻情况ID"></el-input>-->
          <!--</el-form-item>-->

          <!--&lt;!&ndash;子女情况ID&ndash;&gt;-->
          <!--<el-form-item label="子女情况ID" prop="kidcountid" style="margin-left: 60px;">-->
            <!--<el-input v-model="mergeForm.kidcountid" style="width: 300px;" auto-complete="off" placeholder="请输入民族"></el-input>-->
          <!--</el-form-item>-->
        <!--</div>-->

        <!--<div>-->
          <!--&lt;!&ndash;学历ID &ndash;&gt;-->
          <!--<el-form-item label="学历ID" prop="educateid">-->
            <!--<el-input v-model="mergeForm.educateid" style="width: 300px;" auto-complete="off" placeholder="请输入学历ID"></el-input>-->
          <!--</el-form-item>-->
          <!--&lt;!&ndash;住房条件ID &ndash;&gt;-->
          <!--<el-form-item label="住房条件ID" prop="houseconditionid" style="margin-left: 60px;">-->
            <!--<el-input v-model="mergeForm.houseconditionid" style="width: 300px;" auto-complete="off" placeholder="请输入住房条件"></el-input>-->
          <!--</el-form-item>-->
        <!--</div>-->

        <!--<div>-->
          <!--&lt;!&ndash;审核ID &ndash;&gt;-->
          <!--<el-form-item label="审核ID" prop="auditid">-->
            <!--<el-input v-model="mergeForm.auditid" style="width: 300px;" auto-complete="off" placeholder="请输入审核ID"></el-input>-->
          <!--</el-form-item>-->
          <!--&lt;!&ndash;备注 &ndash;&gt;-->
          <!--<el-form-item label="备注" prop="remark" style="margin-left: 60px;">-->
            <!--<el-input v-model="mergeForm.remark" style="width: 300px;" auto-complete="off" placeholder="请输入备注"></el-input>-->
          <!--</el-form-item>-->
        <!--</div>-->
        <!--<div>-->
          <!--<el-form-item label="备注" prop="remarkk">-->
            <!--<el-input type="textarea" rows="3" style="width: 770px;" v-model="mergeForm.remarkk"-->
                      <!--auto-complete="off" maxlength="200"-->
                      <!--placeholder="请输入你审核的备注信息"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item style="width: 500px;" label="审核结果" prop="state">-->
            <!--<el-radio-group v-model="mergeForm.state" size="small">-->
              <!--<el-radio label="1" border>通过</el-radio>-->
              <!--<el-radio label="2" border>拒绝</el-radio>-->
            <!--</el-radio-group>-->
          <!--</el-form-item>-->
        <!--</div>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogMergeFormVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="doMergeForm">确 定</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->

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
        phonenumberID: null,
        state: null,

        mergeForm: {
          materid: null,
          userid: null,
          phonenumber: null,
          marriageid: null,
          kidcountid: null,
          incomegradeid: null,
          educateid: null,
          houseconditionid: null,
          auditid: null,
          remark: null,
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
        this.phonenumberID = null;
        this.realname = null;
      },
      handelSelectRow(rows) {
        if (rows != null) {
          this.phonenumberID = rows.custNo;
          this.realname = rows.realname;
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

        let url = this.axios.urls.MATERIAL_LISTALLMATERIAL;
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
        if (row.audit.state != null && row.audit.state != 3) {
          this.mergeForm.state = row.audit.state.toString();
          console.log("状态id", this.mergeForm.state);
        }

        this.mergeForm.materid = row.materid;
        this.mergeForm.userid = row.userid;
        this.mergeForm.phonenumber = row.phonenumber;

        this.mergeForm.marriageid = row.marriageid;
        this.mergeForm.kidcountid = row.kidcountid;
        this.mergeForm.incomegradeid = row.incomegradeid;

        this.mergeForm.educateid = row.educateid;
        this.mergeForm.houseconditionid = row.houseconditionid;
        this.mergeForm.auditid = row.auditid;
        this.mergeForm.remark = row.remark;

        this.mergeForm.remarkk = row.audit.remarkk;
        this.mergeForm.auditid = row.audit.auditid;

        this.dialogMergeFormVisible = true;
      },

      doMergeForm: function() {
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

          let url = this.axios.urls['REALNAME_EDITREALNAME'];
          this.axios.post(url, from01).then((response) => {
            if (0 === response.data.code) {
              this.$message({
                message: response.data.message,
                type: 'success'
              });
            }
            //只有新增时才需要清空表单
            // if (!this.mergeForm.custNo) {
            //   this.doClearMergeForm();
            // }
            this.search();
          }).catch(function(error) {
            console.log(error);
          });
        });
      },
      //dialog对话框的关闭事件
      handleDialogClose: function() {
        console.log('handleDialogClose......');
        this.$refs['mergeForm'].resetFields(); //清空验证信息
        //this.doClearMergeForm();
      },
      //删除的单条数据的方法
      del: function (row) {
        this.$confirm('你确定要删除这条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let from01={
            materid: row.materid,
            aid: row.audit.auditid
          }
          let url = this.axios.urls.MATERIAL_DELMATERIAL;
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
