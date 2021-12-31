<template>
  <div>
      <el-table
      :data="userList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="150">
      </el-table-column>
      <el-table-column
        prop="phoneNumber"
        label="电话号码"
        width="150">
      </el-table-column>
      <el-table-column
        prop="authorization"
        label="权限"
        width="150">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="150">
      </el-table-column>
      <el-table-column
        prop="registrationTime"
        label="注册时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div :data = "user" class="edit">
              <div>姓名</div>
              <el-input v-model = "user.name"></el-input>
              <div>年龄</div>
              <el-input v-model = "user.age"></el-input>
              <div>电话号码</div>
              <el-input v-model = "user.phoneNumber"></el-input>
              <div>状态</div>
              <el-input v-model = "user.status"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="handleClose()">取 消</el-button>
              <el-button type="primary" @click="updateUser()">确 定</el-button>
            </span>
          </el-dialog>

          <el-popconfirm title="确定删除这个用户吗？" @confirm="handleDelete(scope.$index, scope.row)">
            <el-button slot="reference" size="mini" type="danger">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const axios = require('axios').default;

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => vm.getData());
  },
	name: "User",
  data() {
    return {
      userList: [],
      dialogVisible: false,
      user: {},
    }
  },
  methods: {
    getData() {
      axios.get("/admin/login")
      .then(response => this.userList = response.data.data);
    },
    handleClose() {
      this.dialogVisible = false;
    },
    updateUser() {
      axios.put("/api/v1/me", this.user)
      .then(response => {
        if (response.data.code === "200") {
          this.getData();
          this.$message({
            showClose: true,
            message: "修改成功",
            type: 'success'
          });
        } else {
          this.$message({
            showClose: true,
            message: response.data.msg,
            type: 'error'
          });
        }
      });
      this.handleClose();
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.user = row;
    },
    handleDelete(index, row) {
      axios.delete("/api/v1/me/" + row.id)
      .then(response => {
        console.log(response);
        if (response.data.code === "200") {
          this.getData();
          this.$message({
            showClose: true,
            message: "删除成功",
            type: 'success'
          });
        } else {
          this.$message({
            showClose: true,
            message: response.data.msg,
            type: 'error'
          });
        }
      });
    }
  },
}
</script>

<style scoped>
.el-button {
  margin-right: 10px;
}

.el-input {
  margin-bottom: 10px;
}
</style>