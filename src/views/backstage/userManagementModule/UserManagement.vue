<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>平台用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索筛选 -->
    <el-form :inline="true" class="searchBox">
      <el-form-item label="名称">
        <el-input size="small" clearable style="width: 300px;" prefix-icon="el-icon-search" v-model="queryForm.user_name"
                  placeholder="请输入搜索的用户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search()">&emsp;搜&emsp;索&emsp;</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible=true">&emsp;添&emsp;加&emsp;</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表格-->
    <el-table :data="result" border style="width: 100%" height="450">
      <el-table-column type="index" label="序" :index="indexMethod" align="center">
      </el-table-column>
      <el-table-column prop="user_name" label="用户账号" min-width="30">
      </el-table-column>
      <el-table-column prop="role_name" label="用户角色" min-width="26">
      </el-table-column>
      <el-table-column prop="user_flagName2" label="用户标识" min-width="20">
      </el-table-column>
      <el-table-column label="操作" min-width="25" align="center">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>&emsp;
          <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 完整分页-->
    <el-pagination style="margin-top: 15px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="queryForm.current_page" :page-sizes="[10, 20, 30, 40]" :page-size="queryForm.page_size" layout="total, sizes, prev, pager, next, jumper"
                   :total="queryForm.total_count">
    </el-pagination>

    <!-- 添加用户信息操作 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" @close="handleDialogClose">
      <el-form :model="mergeForm" :rules="mergeFormRules" ref="mergeForm" :label-position="labelPosition" label-width="80px">
        <el-form-item label="用户账号" prop="user_name">
          <el-input v-model="mergeForm.user_name" placeholder="请输入2-10的用户账号"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="user_password">
          <el-input type="password" v-model="mergeForm.user_password" placeholder="请输入2-10的用户密码" autocomplete="off"
                    show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repwd">
          <el-input type="password" v-model="mergeForm.repwd" placeholder="请输入确认你输入的密码" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="role_id">
          <el-select v-model="mergeForm.role_id" placeholder="请选择用户角色">
            <el-option v-for="(r, index) in result2" :label="r.role_name" :value="r.role_id" :key="index" :index="r.role_id">{{r.role_name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户状态" prop="user_flag">
          <el-select v-model="mergeForm.user_flag" placeholder="请选择用户状态">
            <el-option label="不可用" value="0"></el-option>
            <el-option label="可用" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button style="width: 20%;" type="primary" @click="onSubmitMergeForm()">确 定</el-button>
        <el-button style="width: 20%;" @click="dialogVisible=false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户相关信息的操作 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible02" width="40%" @close="handleDialogClose">
      <el-form :model="mergeForm2" :rules="mergeFormRules02" ref="mergeForm" :label-position="labelPosition" label-width="80px">
        <el-form-item label="用户账号" prop="user_name">
          <el-input v-model="mergeForm2.user_name" placeholder="请输入2-10的用户账号"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="user_password">
          <el-input v-model="mergeForm2.user_password" placeholder="请输入2-10的用户密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="role_id">
          <el-select v-model="mergeForm2.role_id" placeholder="请选择用户角色">
            <el-option v-for="(r, index) in result2" :label="r.role_name" :value="r.role_id" :key="index" :index="r.role_id">{{r.role_name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户状态" prop="user_flag">
          <el-select v-model="user_flagName" placeholder="请选择用户状态">
            <el-option label="不可用" value="0"></el-option>
            <el-option label="可用" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button style="width: 20%;" type="primary" @click="onSubmitMergeForm()">确 定</el-button>
        <el-button style="width: 20%;" @click="dialogVisible02=false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data: function() {
      var validatePass = (rule, value, callback) => {
        if (value == null) {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.mergeForm.user_password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        queryForm: {
          user_name: null, //用户名称
          current_page: 1, //当前显示页码数
          page_size: 10, //每页显示的最大行数
          total_count: 0 //数据的总记录数
        },
        queryForm2: {
          user_name: null //用户名称
        },
        result: [], //返回多个用户结果集
        result2: [], //返回所有用户-角色结果集
        dialogVisible: false, //用户添加显示框
        dialogVisible02: false, //用户修改显示框
        dialogTitle: '用户添加', //用户显示框的题目（左上方）
        labelPosition: 'left', //文字在文本框左侧显示
        mergeForm: {
          user_id: null, //用户ID
          user_name: null, //用户账号
          user_password: null, //用户密码
          user_flag: null, //用户标识
          repwd: null, //确认密码
          role_id: null //角色ID
        },
        mergeForm2: {
          user_id: null, //用户ID
          user_name: null, //用户账号
          user_password: null, //用户密码
          user_flag: null, //用户标识
          role_id: null //角色ID
        },
        user_flagName: null, //用户标识的名称
        mergeFormRules: { //添加用户表单验证
          user_name: [{
            required: true,
            message: '请输入用户账号',
            trigger: 'blur'
          },
            {
              min: 2,
              max: 10,
              message: '长度在 2 到 10 个字符',
              trigger: 'blur'
            }
          ],
          user_password: [{
            required: true,
            message: '请输入用户密码',
            trigger: 'blur'
          },
            {
              min: 2,
              max: 16,
              message: '长度在 2 到 16 个字符',
              trigger: 'blur'
            }
          ],
          repwd: [{
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }],
          user_flag: [{
            required: true,
            message: '请选择用户状态',
            trigger: 'change'
          }],
          role_id: [{
            required: true,
            message: '请选择用户角色',
            trigger: 'change'
          }]
        },
        mergeFormRules02: { //修改用户表单验证
          user_name: [{
            required: true,
            message: '请输入用户账号',
            trigger: 'blur'
          },
            {
              min: 2,
              max: 10,
              message: '长度在 2 到 10 个字符',
              trigger: 'blur'
            }
          ],
          user_password: [{
            required: true,
            message: '请输入用户密码',
            trigger: 'blur'
          },
            {
              min: 2,
              max: 16,
              message: '长度在 2 到 16 个字符',
              trigger: 'blur'
            }
          ],
          user_flagName: [{
            required: true,
            message: '请选择用户状态',
            trigger: 'change'
          }],
          role_id: [{
            required: true,
            message: '请选择用户角色',
            trigger: 'change'
          }]
        }
      };
    },
    created: function() {
      this.search();
    },
    methods: {

      //编辑文本（行）
      handleEdit: function(index, row) {
        this.dialogVisible02 = true;
        this.mergeForm2.user_id = row.user_id;
        this.mergeForm2.user_name = row.user_name;
        this.mergeForm2.user_password = row.user_password;
        this.mergeForm2.user_flag = row.user_flag;
        this.mergeForm2.role_id = row.role_id;
        if (this.mergeForm2.user_flag == 0) {
          this.user_flagName = '不可用';
        } else {
          this.user_flagName = '可用';
        }
        this.dialogTitle = '用户修改';
      },
      //删除文本（行）
      handleDelete: function(index, row) {
        // console.log('handleDelete');

        this.$confirm('你确定要删除这条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = this.axios.urls.SYS_USER_DEL;
          this.axios.post(url, {
            user_id: row.user_id
          }).then((resp) => {
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
      //序列显示方法
      indexMethod(index) {
        return (this.queryForm.current_page - 1) * this.queryForm.page_size + (index + 1);
      },
      //表单提交(添加或者修改的使用)
      onSubmitMergeForm: function() {
        //给表单中的用户标识（状态）赋值
        if (this.user_flagName != null) {
          if (this.user_flagName.length == 1) {
            this.mergeForm2.user_flag = this.user_flagName;
          }
        }

        this.$refs['mergeForm'].validate((valid) => {
          if (false === valid) {
            return false;
          }

          var myForm = null;
          var url = null;
          if (null != this.mergeForm2.user_id) {
            url = this.axios.urls.SYS_USER_EDIT;
            myForm = this.mergeForm2;
          } else {
            url = this.axios.urls.SYS_USER_ADD;
            myForm = this.mergeForm;
          }
          this.axios.post(url, myForm).then((resp) => {
            if (0 == resp.data.code) {
              this.$message({
                message: resp.data.message,
                type: 'success'
              });
              if (null == this.mergeForm2.user_id) {
                this.handleDialogClose();
              }
              this.search();
            } else {
              this.$message.error(resp.data.message);
            }

          }).catch((error) => {});
        });
      },
      //dialog对话框的关闭事件
      handleDialogClose: function() {
        this.$refs['mergeForm'].resetFields(); //清空验证信息
        // this.$refs['mergeForm2'].resetFields(); //清空验证信息
        this.doClearMergeForm();
      },
      //清空表单中的数据
      doClearMergeForm: function() {
        this.mergeForm.user_id = null; //清空后台提交表单数据
        this.mergeForm.user_name = null;
        this.mergeForm.user_password = null;
        this.mergeForm.user_flag = null;
        this.mergeForm.role_id = null;
        this.mergeForm.repwd = null;

        this.mergeForm2.user_id = null; //清空后台提交表单数据
        this.mergeForm2.user_name = null;
        this.mergeForm2.user_password = null;
        this.mergeForm2.user_flag = null;
        this.mergeForm2.role_id = null;

        this.user_flagName = null;
        this.dialogTitle = '用户添加';
      },
      //更改每页显示行数
      handleSizeChange(rows) {
        // console.log('rows=%i', rows);
        this.queryForm.page_size = rows;
        this.queryForm.current_page = 1;
        this.search();
      },
      //更改当前页码数
      handleCurrentChange(page) {
        // console.log('page=%i', page);
        this.queryForm.current_page = page;
        this.search();
      },
      //搜索
      search: function() {
        if (this.queryForm.user_name != this.queryForm2.user_name) {
          if (this.queryForm.user_name != null && this.queryForm.user_name != '') {
            this.queryForm.current_page = 1;
          }
        }
        this.queryForm2.user_name == this.queryForm.user_name

        let url = this.axios.urls.SYS_USER_LIST;
        this.axios.post(url, this.queryForm).then((resp) => {
          this.result = resp.data.result;
          this.queryForm.total_count = resp.data.total_count;
          // this.queryForm.page_size = resp.data.page_size;
          // this.queryForm.current_page = resp.data.current_page;
        }).catch((error) => {});

        let url2 = this.axios.urls.SYS_ROLE_LIST;
        this.axios.post(url2, {}).then((resp) => {
          this.result2 = resp.data.result;
        }).catch((error) => {});

      }

    }
  }
</script>


<style scoped>
  .searchBox {
    margin-top: 20px;
  }

  .userRole {
    width: 100%;
  }

  .width01 {
    min-width: 200px;
  }
</style>
