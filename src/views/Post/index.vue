<template>
  <div>
    <el-table
      :data="postList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="contents"
        label="内容"
        width="180">
      </el-table-column>
      <el-table-column
        prop="commentNumber"
        label="评论数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="starred"
        label="标星数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="time"
        label="发帖时间">
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
    axios.get("/api/v1/posts",{params: {pageSize: 10,pageNum: 1,}})
      .then(response => next(vm=>{vm.postList = response.data.data}));
  },
	name: "Post",
  data() {
    return {
      postList: [],
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
      axios.delete("/api/v1/posts/" + row.id)
      .then(response => {
        if (response.data.code === "200") {
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
  }
}
</script>

<style>

</style>