<template>
  <div id="app">
    <el-container>
      <el-header>H2109C王恒</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >

            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">
              <router-link :to="{path:'/studentList'}">
                学生列表</router-link>
              </span>
            </el-menu-item>

            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span slot="title" @click="goTeacherList">老师列表</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span slot="title" @click="goUserAddSave">添加地址</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span slot="title" @click="goUserAddList">收货信息</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goTeacherList(){
      this.$router.push({path:'/teacherList'});
    },
    goUserAddSave(){
      this.$router.push({path:'/userAddSave'});
    },
    goUserAddList(){
      this.$router.push({path:'/userAddList'});
    }
  }
}
</script>

<style>
.el-header, .el-footer {
  background-color: #409EFF;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
