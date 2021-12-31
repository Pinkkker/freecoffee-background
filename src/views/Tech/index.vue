<template>
  <div>
      <el-table
      :data="techList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="180">
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
    next(vm => vm.getData());
  },
	name: "Tech",
  data() {
    return {
      techList: [],
    }
  },
  methods: {
    getData() {
      axios.get("/admin/techs")
      .then(response => this.techList = response.data.data);
    },
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

<style scoped>
.el-button {
  margin-right: 10px;
}

.el-input {
  margin-bottom: 10px;
}
</style>