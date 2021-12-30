<template>
  <div>
    <el-row type="flex" justify="space-around">
      <el-col :span="5">
        <div class="container" id="user">
          <div class="main">
            <i class="el-icon-user"></i>
            <div>
              <div class="title">用户总数</div>
              <div>{{userList.length}}</div>
            </div>
          </div>
          <div class="link" @click="goUser()">
            more info
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="container" id="post">
          <div class="main">
            <i class="el-icon-s-promotion"></i>
            <div>
              <div class="title">帖子总数</div>
              <div>{{postListNum}}</div>
            </div>
          </div>
          <div class="link" @click="goPost()">
            more info
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const axios = require('axios').default;

export default {
	name: "Dashboard",
  async beforeRouteEnter (to, from, next) {
    let userResponse = await axios.get("/admin/login");
    let postResponse = await axios.get("/api/v1/posts",{params: {pageSize: 1,pageNum: 1,}})
    next(vm => {
      vm.userList = userResponse.data.data;
      vm.postListNum = postResponse.data.totalNum;
    });
  },
  data() {
    return {
      userList: [],
      postListNum: 0,
    };
  },
  methods: {
    goUser() {
      this.$router.push('/user')
    },
    goPost() {
      this.$router.push('/post')
    },
  },
}
</script>

<style scoped>
.container {
  height: 120px;
  margin-top: 40px;
  border: 3px rgba(0, 0, 0, 0.3) outset;
  border-radius: 5px;
}

#user {
  background-color: rgba(230, 100, 100, 1);
}

#post {
  background-color: rgba(100, 180, 100, 1);
}

.link {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
}

.main {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

i {
  font-size: 55px;
}

.link {
  border-top: 3px black solid;
  margin-top: 20px;
  font-size: 20px;
}

.title {
  font-size: 22px;
  margin-bottom: 5px;
}

.title + div {
  font-size: 22px;
}
</style>