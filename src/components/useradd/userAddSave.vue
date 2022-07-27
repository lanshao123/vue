<template>
  <div>
    <el-form ref="form" :model="form"  label-width="100px">
      <el-form-item label="姓名">
        <el-col :span="3">
        <el-input v-model="form.name" ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号">
        <el-col :span="3">
        <el-input v-model="form.phone"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-col :span="5">
          <el-input v-model="form.addresinfo"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="选择地址">
        <!--        省-->
        <el-col :span="2">
          <el-select v-model="form.shengId" placeholder="请选择">
            <el-option
                v-for="item in sheng"
                :key="item.id"
                :label="item.name"
                :value="item.id" @click.native="shengClick(item.id)">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select v-model="form.shiId" placeholder="请选择">
            <el-option
                v-for="item in shi"
                :key="item.id"
                :label="item.name"
                :value="item.id" @click.native="shiClick(item.id)">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select v-model="form.quId" placeholder="请选择">
            <el-option
                v-for="item in qu"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="是否默认">
        <el-col :span="1">
        <el-switch v-model="form.isdefault"></el-switch>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
      value:"",
      id:0,
      form: {
        name: '',
        shengId: '',
        shiId: '',
        quId: '',
        isdefault:false

      },
      sheng:[],
      shi:[],
      qu:[]
    }
  },
  methods: {
    //回显
    findByIdteacher(id){
      axios.get(`http://127.0.0.1:9090/address/findAddressListByParentId/${id}`).then(res => {
        this.sheng=res.data;
      })
    },
    shengClick(id){
      this.shi=[];
      this.form.shiId="";
      this.qu=[];
      this.form.quId="";
      axios.get(`http://127.0.0.1:9090/address/findAddressListByParentId/${id}`).then(res => {
        this.shi=res.data;
      })
    },
    shiClick(id){
      this.qu=[];
      this.form.quId="";
      axios.get(`http://127.0.0.1:9090/address/findAddressListByParentId/${id}`).then(res => {
        this.qu=res.data;
      })
    },
    onSubmit(){
      //创建
      axios.post(`http://127.0.0.1:9090/user/saveUser`,this.form).then(res => {
        console.log(JSON.stringify(this.form));
        if(res.data==0){
          this.$message.success("添加成功");
        }else{
          this.$message.error("添加失败");
        }

      })
    }

  }, mounted() {
    this.findByIdteacher(0);
  }
}
</script>

<style scoped>

</style>