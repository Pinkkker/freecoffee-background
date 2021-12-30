<template>
  <div>
      <el-table
      :data="userList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phoneNumber"
        label="电话号码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="authorization"
        label="权限"
        width="180">
      </el-table-column>
      <el-table-column
        prop="registrationTime"
        label="注册时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const axios = require('axios').default;

export default {
  beforeRouteEnter (to, from, next) {
    axios.get("/admin/login")
      .then(response => next(vm=>{vm.userList = response.data.data}));
  },
	name: "User",
  data() {
    return {
      userList: [],
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.$message({
        showClose: true,
        message: "暂不支持编辑",
        type: 'error'
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
}
</script>

<style>

</style>