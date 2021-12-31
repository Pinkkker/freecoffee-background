<template>
  <div>
    <el-table
      :data="postList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="150">
      </el-table-column>
      <el-table-column
        prop="intro"
        label="部分内容"
        width="150">
      </el-table-column>
      <el-table-column
        prop="commentNumber"
        label="评论数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="starred"
        label="标星数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="150">
      </el-table-column>
      <el-table-column
        prop="time"
        label="发帖时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div :data = "post" class="edit">
              <div>标题</div>
              <el-input v-model = "post.title"></el-input>
              <div>标星数</div>
              <el-input v-model = "post.starred"></el-input>
              <div>评论数</div>
              <el-input v-model = "post.commentNumber"></el-input>
              <div>状态</div>
              <el-input v-model = "post.status"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="handleClose()">取 消</el-button>
              <el-button type="primary" @click="updatePost()">确 定</el-button>
            </span>
          </el-dialog>

          <el-popconfirm title="确定删除这个帖子吗？" @confirm="handleDelete(scope.$index, scope.row)">
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
	name: "Post",
  data() {
    return {
      postList: [],
      dialogVisible: false,
      post: {},
    }
  },
  methods: {
    getData() {
      axios.get("/admin/posts")
      .then(response => {
        let postList = response.data.data;
        postList.forEach(post => post.intro = post.contents.substring(0, 10));
        this.postList = postList;
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    updatePost() {
      axios.put("/api/v1/posts/" + this.post.id, this.post)
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
      this.post = row;
    },
    handleDelete(index, row) {
      axios.delete("/api/v1/posts/" + row.id)
      .then(response => {
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
  }
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