<template>
  <div class="container">
    <el-row type="flex" justify="space-around">
      <el-col :span="11">
        <div class="title">基本信息</div>
        <el-divider></el-divider>
        <div class="content">
          <div class="contentT">用户名</div>
          <el-input v-model="username"></el-input>
        </div>
        <div class="footer">
          <el-button type="primary" @click="changeInfo()">确认修改</el-button>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="title">修改密码</div>
        <el-divider></el-divider>
        <div class="content">
          <div class="contentT">原密码</div>
          <el-input type="password" show-password v-model="oldPassword" placeholder="请输入原密码"></el-input>
          <div class="contentT">新密码</div>
          <el-input type="password" show-password v-model="newPassword" placeholder="请输入新密码"></el-input>
        </div>
        <div class="footer">
          <el-button type="primary" @click="changePassword()">确认修改</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const axios = require('axios').default;

export default {
	name: "Info",
  beforeRouteEnter (to, from, next) {
    axios.get("/admin/me")
      .then(response => next(vm=>{vm.username = response.data.data.name}));
  },
  data() {
    return {
      username: "",
      oldPassword: "",
      newPassword: "",
    };
  },
  methods: {
    changeInfo() {
      const info = {
        "flag": "0",
        "username": this.username,
      };
      axios.put("/admin/me", info)
        .then(response => {
          if (response.data.code !== '200') {
            this.$message({
              showClose: true,
              message: response.data.msg,
              type: 'error'
            });
          } else {
            this.$emit('changeName', this.username);
            this.$message({
              showClose: true,
              message: "修改成功",
              type: 'success'
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    changePassword() {
      const info = {
        "flag": "1",
        "oldP": this.oldPassword,
        "newP": this.newPassword,
      };
      axios.put("/admin/me", info)
        .then(response => {
          if (response.data.code !== '200') {
            this.$message({
              showClose: true,
              message: response.data.msg,
              type: 'error'
            });
          } else {
            this.oldPassword = "";
            this.newPassword = "";
            this.$message({
              showClose: true,
              message: "修改成功",
              type: 'success'
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
}
</script>

<style scoped>
.el-row {
  margin-top: 30px;
}

.el-col {
  height: 500px;
  margin: 5px;
  padding: 25px;
  background-color: white;
  border-radius: 5px;
  border: 2px rgba(0, 0, 0, 0.3) outset;
}

.title {
  font-size: 24px;
  display: flex;
  justify-content: flex-start;
}

.content {
  height: 320px;
}

.content > div {
  margin-bottom: 15px;
}

.contentT {
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
}

.footer {
  display: flex;
  justify-content: flex-end;
}
</style>