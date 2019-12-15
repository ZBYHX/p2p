<template>
  <div class="hello">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索筛选 -->
    <el-form :inline="true" class="searchBox">
      <el-form-item label="名称">
        <el-input size="small" clearable style="width: 300px;" prefix-icon="el-icon-search" v-model="queryForm.role_name"
                  placeholder="请输入搜索的角色名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search()">&emsp;搜&emsp;索&emsp;</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible=true">&emsp;添&emsp;加&emsp;</el-button>
        <!-- <el-button size="small" type="warning" icon="el-icon-close" @click="setCurrent()">&ensp;取&ensp;消&ensp;选&ensp;中&ensp;</el-button> -->
      </el-form-item>
    </el-form>

    <!-- 数据表格-->
    <!-- <div> -->
    <!-- <div style="width: 76%;float: left;"> -->
    <el-table :data="result" ref="singleTable" highlight-current-row @current-change="handleCurrentChange02" style="width: 100%;"
              height="450">
      <el-table-column type="index" label="序" :index="indexMethod" min-width="" align="center">
      </el-table-column>
      <el-table-column prop="role_name" label="角色名称" min-width="20">
      </el-table-column>
      <el-table-column prop="role_desc" label="角色说明" min-width="30">
      </el-table-column>
      <el-table-column prop="role_flagName" label="角色状态" min-width="10">
      </el-table-column>
      <el-table-column label="操作" min-width="30" align="center">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="drawer = true">权限设置</el-button>
          <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 完整分页-->
    <el-pagination style="margin-top: 15px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="queryForm.current_page" :page-sizes="[7, 20, 30, 40]" :page-size="queryForm.page_size" layout="total, sizes, prev, pager, next, jumper"
                   :total="queryForm.total_count">
    </el-pagination>

    <!-- 添加和编辑操作 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" @close="handleDialogClose">
      <el-form :model="mergeForm" :rules="mergeFormRules" ref="mergeForm" :label-position="labelPosition" label-width="80px">
        <el-form-item label="角色名称" prop="role_name">
          <el-input v-model="mergeForm.role_name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="role_flag">
          <template slot-scope="scope">
            <el-radio v-model="mergeForm.role_flag" label="1" border>可&ensp;用</el-radio>
            <el-radio v-model="mergeForm.role_flag" label="0" border>不可用</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="角色说明" prop="role_desc">
          <el-input type="textarea" rows="3" v-model="mergeForm.role_desc" placeholder="请输入角色说明" maxlength="50"
                    show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button style="width: 20%;" type="primary" @click="onSubmitMergeForm()">确 定</el-button>
        <el-button style="width: 20%;" @click="dialogVisible=false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 右侧权限显示窗口 -->
    <el-drawer title="权限设置" style="font-size: 40px;color: #42B983;" align="center" :visible.sync="drawer" size="50%">
      <div>
        <div style="width: 50%;height: 500px;overflow: auto;float: left;border-right: 2px solid aqua;">
          <div style="font-size: 20px;">页面权限部分</div>
          <el-tree style="margin-left: 80px;margin-top: 30px;" ref="tree" :data="data02" @check="handleNodeClick"
                   @node-click="myclick" :icon-class="data02[0].right_icon" show-checkbox node-key="right_code"
                   :default-expanded-keys="openNodes" :default-checked-keys="selectNodes" :props="defaultProps">
          </el-tree>
        </div>
        <div style="width: 49%;height: 500px;overflow: auto;font-size: 20px;">
          <div style="font-size: 20px;">功能权限部分</div>
          <el-tree style="margin-left: 25px;margin-top: 30px;" ref="tree02" :data="gong" @check="handleNodeClick02"
                   show-checkbox node-key="id" :props="defaultProps2">
          </el-tree>
        </div>
      </div>
      <div style="margin-top: 35px;">
        <el-row>
          <el-button type="success" @click="editAllRights">权限上传<i class="el-icon-upload el-icon--right"></i></el-button>
          <el-button type="warning" plain @click="backRights">恢复初始<i class="el-icon-refresh-left el-icon--right"></i></el-button>
        </el-row>
      </div>
    </el-drawer>

  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        queryForm: {
          role_name: null, //角色名称
          current_page: 1, //当前页码数
          page_size: 7, //每页显示的最大记录数
          total_count: 0 //总记录数
        },
        queryForm2: {
          role_name: null //角色名称
        },
        result: [], //用于接收查询表格数据的数组
        dialogVisible: false, //弹出框是否显示
        dialogTitle: '角色添加', //弹出框标题
        labelPosition: 'left', //弹出框中标签的位置
        mergeForm: {
          role_id: null, //角色ID
          role_name: null, //角色名称
          role_flag: null, //角色标识
          role_desc: null, //角色描述
          role_flagName: null //角色标识名称
        },
        mergeFormRules: { //角色增加或者修改的表单验证
          role_name: [{ //角色名称
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }],
          role_desc: [{ //角色描述
            required: true,
            message: '请输入角色描述信息',
            trigger: 'blur'
          }],
          role_flag: [{ //角色标识
            required: true,
            message: '请选择角色标识',
            trigger: 'change'
          }]
        },
        data02: [{ //存取权限数组
          right_code: 1,
          right_text: '一级 1',
          children: [{
            right_code: 4,
            right_text: '二级 1-1',
            children: [{
              right_code: 9,
              right_text: '三级 1-1-1'
            }, {
              right_code: 10,
              right_text: '三级 1-1-2'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'right_text',
          id: 'right_code',
          disabled: 'right_flag'
        },
        defaultProps2: {
          // children: 'children',
          // disabled: 'right_flag'
          children: 'children',
          label: 'text',
          id: 'id'
        },
        openNodes: ['01', '02'],
        selectNodes: [], //暂时未使用
        currentRow: null, //当前行
        editRights: {
          arr: [],
          role_id: null
        },
        usesArr: [],
        switchOne: true,
        drawer: false, //显示右侧框
        innerDrawer: false, //
        gong: []
      };
    },
    created: function() {
      this.search();
    },
    methods: {
      //点击显示页面权限设置的节点
      myclick: function(data, node, arr) {
        if (data.children.length == 0) {
          // console.log("权限id："+data.right_code);

          let url = this.axios.urls.SYS_RIGHT_SELECT_GONG;
          this.axios.post(url, {
            right_id: data.right_code, //权限id
            role_id: this.editRights.role_id
          }).then((resp) => {
            this.gong = resp.data.result;
            this.$refs.tree02.setCheckedKeys([], true); //使相关权限复选框全部不选中
            this.$refs.tree02.setCheckedKeys(resp.data.arr, true); //设置角色对应的权限复选框选中

            // this.$refs.tree02.setCheckedKeys([], true); //使相关权限复选框全部不选中
            // this.$refs.tree02.setCheckedKeys(['1','2'], true); //设置角色对应的权限复选框选中
            // this.$refs.tree2.setCheckedKeys(resp.data.result.arr2, true);
          }).catch((error) => {});
        }

      },
      //修改权限信息
      editAllRights: function() {
        if (this.editRights.role_id != null && this.editRights.arr.length != 0) {
          // console.log('总right_code数组:' + this.editRights.arr);
          // console.log('角色id：' + this.editRights.role_id);

          var a1 = this.editRights.arr;
          var cc = "[";

          for (let i = 0; i < this.editRights.arr.length; i++) {
            if (i == this.editRights.arr.length - 1) {
              cc += this.editRights.arr[i];
            } else {
              cc += this.editRights.arr[i] + ",";
            }
          }
          cc += "]";
          this.editRights.arr = cc;

          let url = this.axios.urls.SYS_right_EDIT;
          this.axios.post(url, {
            role_id: this.editRights.role_id,
            str: cc
          }).then((resp) => {
            if (resp.data.code == 0) {
              this.$message({
                message: resp.data.message,
                type: 'success'
              });
            }
            this.editRights.arr = a1;
          }).catch((error) => {});

        } else if (this.editRights.arr.length == 0) {
          this.$message({
            message: '保存的权限信息不能为空！',
            type: 'warning'
          });
        } else {
          this.$message({
            message: '请先选中需要操作的行！',
            type: 'warning'
          });
        }
      },
      //点击恢复角色对应的初始化权限信息
      backRights: function() {
        if (this.editRights.role_id != null) {
          let url = this.axios.urls.SYS_right_RIGHTSODES;
          this.axios.post(url, {
            role_id: this.editRights.role_id
          }).then((resp) => {
            this.$refs.tree.setCheckedKeys([], true); //使相关权限复选框全部不选中
            this.$refs.tree.setCheckedKeys(resp.data.result.arr1, true); //设置角色对应的权限复选框选中
            this.$refs.tree.setCheckedKeys(resp.data.result.arr2, true);
          }).catch((error) => {});
        } else {
          this.$message({
            message: '请先选中需要操作的行！',
            type: 'warning'
          });
        }
      },
      //权限树节点复选框改变触发
      handleNodeClick: function(data, selectedNodes) {
        // console.log(data.right_code + "--" + data.right_text + "--" + data.right_parent_code);
        // console.log("已选中的树节点树目前的选中状态对象的数组：" + JSON.stringify(selectedNodes.checkedNodes));
        // console.log("已选中的树节点key值数组：" + selectedNodes.checkedKeys);
        // console.log("子节点复选框未全选中的父节点key值："+selectedNodes.halfCheckedKeys);
        this.editRights.arr = [];
        var arr1 = selectedNodes.checkedKeys;
        var arr2 = selectedNodes.halfCheckedKeys;
        for (let i = 0; i < arr1.length; i++) {
          this.editRights.arr[i] = arr1[i];
        }
        for (let i = 0; i < arr2.length; i++) {
          this.editRights.arr[this.editRights.arr.length] = arr2[i];
        }
        // console.log('总right_code数组:' + this.editRights.arr);
        // console.log('角色id：' + this.editRights.role_id);
      },
      handleNodeClick02: function(data, selectedNodes) {
        var arr3 = selectedNodes.checkedKeys;
        var cc = "[";

        for (let i = 0; i < arr3.length; i++) {
          if (i == arr3.length - 1) {
            cc += arr3[i];
          } else {
            cc += arr3[i] + ",";
          }
        }
        cc += "]";
        // console.log("节点id: "+data.right_id);

        let url = this.axios.urls.SYS_RIGHT_UPDATE_GONG;
        this.axios.post(url, {
          role_id: this.editRights.role_id,
          str: cc,
          right_id: data.right_id
        }).then((resp) => {
          if (resp.data.code == 0) {
            this.$notify({
              title: '成功',
              message: resp.data.message,
              position: 'top-left',
              type: 'success'
            });
          }else{
            this.$notify({
              title: '警告',
              message: resp.data.message,
              position: 'top-left',
              type: 'warning'
            });
          }

          let url = this.axios.urls.SYS_RIGHT_SELECT_GONG;
          this.axios.post(url, {
            right_id: data.right_id, //权限id
            role_id: this.editRights.role_id
          }).then((resp) => {
            this.gong = resp.data.result;
            this.$refs.tree02.setCheckedKeys([], true); //使相关权限复选框全部不选中
            this.$refs.tree02.setCheckedKeys(resp.data.arr, true); //设置角色对应的权限复选框选中
          }).catch((error) => {});


        }).catch((error) => {});

      },
      //清空表单行或者选中指定行
      setCurrent: function(row) {
        this.$refs.singleTable.setCurrentRow(row);
        this.$refs.tree.setCheckedKeys([], true); //使相关权限复选框全部不选中
        this.editRights.arr = [];
        this.editRights.role_id = null;
      },
      //点击表格行触发
      handleCurrentChange02: function(rows) {
        if (null != rows) {
          // console.log("角色id：" + rows.role_id);
          // console.log("被选中的节点的 key 所组成的数组:"+this.$refs.tree.getCheckedKeys());
          // this.selectNodes = ['3d2c8d80b6864401830280e669ea1dd3','d9baa2a935e0429f91c0dd6011485bea'];
          // this.$refs.tree.setCheckedKeys([], true);
          // this.$refs.tree.setCheckedKeys(this.openNodes, true);
          // this.$refs.tree.setCheckedKeys(this.selectNodes, true);

          //给权限部分的复选框默认选中
          this.gong = [];
          this.editRights.role_id = rows.role_id;
          let url = this.axios.urls.SYS_right_RIGHTSODES;
          this.axios.post(url, {
            role_id: rows.role_id
          }).then((resp) => {
            this.$refs.tree.setCheckedKeys([], true); //使相关权限复选框全部不选中
            this.$refs.tree.setCheckedKeys(resp.data.result.arr1, true); //设置角色对应的权限复选框选中
            this.$refs.tree.setCheckedKeys(resp.data.result.arr2, true);
          }).catch((error) => {});
          this.currentRow = rows;

          //给角色对应用户区域赋值
          // let url02 = this.axios.urls.SYS_right_RIGHTSODES;
          // this.axios.post(url, {
          // 	role_id: rows.role_id
          // }).then((resp) => {

          // }).catch((error) => {});

        }

        // console.log("行数据："+rows);
      },
      //点击编辑文本（行）
      handleEdit: function(index, row) {
        this.mergeForm.role_id = row.role_id;
        this.mergeForm.role_name = row.role_name;
        this.mergeForm.role_desc = row.role_desc;
        this.mergeForm.role_flag = row.role_flag.toLocaleString();
        this.mergeForm.role_flagName = row.role_flagName;
        this.dialogVisible = true;
        this.dialogTitle = '角色修改';

      },
      //删除文本（行）
      handleDelete: function(index, row) {
        this.$confirm('你确定要删除这条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = this.axios.urls.SYS_ROLE_DEL;
          this.axios.post(url, {
            role_id: row.role_id
          }).then((resp) => {
            this.$message({
              message: resp.data.message,
              type: 'success'
            });
            this.setCurrent();
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
        this.$refs['mergeForm'].validate((valid) => {
          if (false === valid) {
            return false;
          }
          let url = this.axios.urls.SYS_ROLE_MERGE;
          this.axios.post(url, this.mergeForm).then((resp) => {
            this.$message({
              message: resp.data.message,
              type: 'success'
            });
            if (null == this.mergeForm.role_id) {
              this.handleDialogClose();
            }
            this.search();
          }).catch((error) => {});
        });
      },
      //dialog对话框的关闭事件
      handleDialogClose: function() {
        this.$refs['mergeForm'].resetFields(); //清空验证信息
        this.doClearMergeForm(); //调用方法清除表单中的数据
      },
      //清空表单中的数据
      doClearMergeForm: function() {
        //清空后台提交表单数据
        this.mergeForm.role_id = null;
        this.mergeForm.role_name = null;
        this.mergeForm.role_desc = null;
        this.mergeForm.role_flag = null;
        this.mergeForm.role_flagName = null;
        // this.$refs['mergeForm'].resetFields(); //清空验证信息
        this.dialogTitle = '角色添加';
      },
      //更改每页显示行数
      handleSizeChange(rows) {
        this.queryForm.page_size = rows;
        this.queryForm.current_page = 1;
        this.search();
      },
      //更改当前页码数
      handleCurrentChange(page) {
        this.queryForm.current_page = page;
        this.search();
      },
      //搜索
      search: function() {
        if (this.queryForm2.role_name != this.queryForm.role_name) {
          if (this.queryForm.role_name != null && this.queryForm.role_name != '') {
            this.queryForm.current_page = 1;
          }
        }
        this.queryForm2.role_name == this.queryForm.role_name

        let url = this.axios.urls.SYS_ROLE_LIST;
        this.axios.post(url, this.queryForm).then((resp) => {
          this.result = resp.data.result;
          this.queryForm.total_count = resp.data.rows;
        }).catch((error) => {});
        let url01 = this.axios.urls.SYS_right_ROOTRIGHTS;
        this.axios.post(url01, {}).then((resp) => {
          this.data02 = resp.data.result;
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

  .css01 {
    text-decoration: none;
    border-style: none;
    list-style: none;
    /*list-style-position: outside;*/
    outline-style: none;
  }

  .css01 li {
    list-style: none;
    border-color: yellowgreen;
    /* margin-top: 3px; */
    border: 1px solid white;
    line-height: 30px;
    padding-top: 3px;
    padding-bottom: 3px;
  }

  .css01 li:hover {
    background-color: lightgoldenrodyellow;
    font-weight: bolder;
    color: orangered;
  }
</style>
