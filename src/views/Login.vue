<template>
    <div class="center">
      <div class="card">
        <el-input
        v-model="username"
        placeholder="用户名"
        prefix-icon='el-icon-user-solid'
        clearable
        ></el-input>
        <el-input type="password" placeholder="密码" v-model="password" show-password prefix-icon='el-icon-key' @keyup.enter.native='login()' />
        <el-button type="primary" @click="login()">登录</el-button>
      </div>
    </div>
</template>

<script>
const axios = require('axios').default;

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  components: {

  },
  methods: {
    login() {
      if (!(/^[\w|\u4e00-\u9fa5]+$/.test(this.username))) {
        this.$message({
          showClose: true,
          message: '您输入的用户名不符合规范!',
          type: 'error'
        });
        return;
      }
      const article = {
        'username' : this.username,
        'password' : this.password,
      };
      axios.post("/admin/login", article)
        .then(response => {
          if (response.data.code !== '200') {
            this.$message({
              showClose: true,
              message: response.data.msg,
              type: 'error'
            });
          } else {
            this.$router.push('/index');
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // encrypt(passwd) {
    //   const PASSWORD_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
    //   const CAESAR_KEY = 9;
    //   let res = "";
    //   for (let i = 0; i < passwd.length; i ++) {
    //       let c = passwd[i];
    //       for (let j = 0; j < PASSWORD_ALPHABET.length; j ++) {
    //         if (PASSWORD_ALPHABET[j] == c) {
    //           res += PASSWORD_ALPHABET[(j + PASSWORD_ALPHABET.length - CAESAR_KEY) % PASSWORD_ALPHABET.length];
    //         }
    //       }
    //   }
    //   return res;
    // }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}


.center
{
  height:100vh;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
}

.card
{
  height:35em;
  width:20em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5em 1em;
  text-align:center;
}

.el-input, .el-button {
    margin-bottom: 25px;
    width: 450px;
}

div >>> .el-input__inner {
  height: 55px;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  color: #ecf5ff;
}
</style>
