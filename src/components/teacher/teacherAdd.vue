<template>
  <div>
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="教师姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="教师年龄">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <div v-for="(item,i) in form.students" :key="i">
        <el-form-item label="学生:" prop="name">
          <el-input v-model="form.students[i].name"  placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item prop="age">
          <el-input v-model="form.students[i].age"  placeholder="年龄"></el-input>
        </el-form-item>
        <el-button circle icon="el-icon-plus" @click="addList()"></el-button>
        <el-button circle icon="el-icon-minus" @click="subList(i)" v-if="i>0"></el-button>
      </div>
      <el-divider></el-divider>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="toTeacherList">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>

//import axios from "axios"

import axios from "axios";

export default {
  name: "teacherAdd",
  data() {
    return {
      id:0,
      form: {
        name: '',
        age: '',
        students:[{name: '', age: ''}
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      var addTeacher=null;
      if(this.id === undefined){
        addTeacher=axios.post(`http://127.0.0.1:9092/teachersFeign/addTeacher`, this.form);
      }else{
        addTeacher=axios.put(`http://127.0.0.1:9092/teachersFeign/editTeacher/${this.id}`, this.form);
      }
     //进行提交表单添加
      addTeacher.then(res => {
        if (res.data == 1) {
          this.$message.success("成功");
          this.$router.push({path:'/teacherList'});
        } else {
          this.$message.error(res.data.message);
        }
      })
    },
    //加号
    addList() {
      this.form.students.unshift({name: '', age: ''})
    },
    //减号
    subList(index) {
      this.form.students.splice(index, 1)
    },
    toTeacherList(){
      this.$router.push({path:'/teacherList'});

    },
    //回显
    findByIdteacher(id){
      axios.get(`http://127.0.0.1:9092/teachersFeign/findTeacherById/${id}`).then(res => {
        this.form=res.data;
      })
    }

  }, mounted() {
    this.id=this.$route.params.id;
    if(this.id)
    this.findByIdteacher(this.id);

  }
}
</script>

<style scoped>

</style>