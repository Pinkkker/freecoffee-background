<template>
  <el-container>
    <el-aside width="collapse">
      <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" active-text-color="#ffffff" text-color="#909399" background-color="#304156" :default-active="$route.path" router>
        <el-menu-item v-for="(item, i) in items" :key="i" :index="item.path">
          <template>
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
          </template>          
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <i class="el-icon-s-operation switch" @click="changeCollapse()"></i>
        <div class="header">
          <div>{{username}}</div>
          <el-button size="small" type="danger" @click="exit()">退出</el-button>
        </div>
      </el-header>
      <el-main>
        <transition name="fade">
          <router-view @changeName="changeName"/>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
const axios = require('axios').default;

export default {
  name: "Index",
  beforeRouteEnter (to, from, next) {
    axios.get("/admin/me")
      .then(response => next(vm=>{vm.username = response.data.data.name}));
  },
  data() {
      return {
        username: "",
        isCollapse: true,
        items:[
          {path:'/dashboard',title:'仪表盘',icon:'el-icon-odometer'},
          {path:'/user',title:'用户管理',icon:'el-icon-user-solid'},
          {path:'/post',title:'帖子管理',icon:'el-icon-chat-line-round'},
          {path:'/info',title:'修改信息',icon:'el-icon-setting'}
        ]
      };
  },
  methods: {
    exit() {
      axios.post("/admin/logout")
        .then(response => {
          if (response.data.code !== '200') {
            this.$message({
              showClose: true,
              message: response.data.msg,
              type: 'error'
            });
          } else {
            this.$router.push('/login');
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    changeName (name) {
      this.username = name;
    }
  },
};
</script>

<style>
.el-container {
  height: 100vh;
  width: 100vw;
}

.el-menu {
  text-align: left;
  height: 100vh;
}

.el-menu-item {
  margin-top: 100px;
}

.el-menu-item > span {
  font-size: 16px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.el-header {
  border-bottom: 1px black solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.header {
  width: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.switch {
  font-size: 25px;
}

.switch:hover {
  cursor: pointer;
}

.el-main {
  background-color: #f4f6f9;
}

.fade-enter-active {
  transition: opacity .8s;
}
.fade-enter {
  opacity: 0;
}
</style>
