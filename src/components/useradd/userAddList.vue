<template>
  <div>
      <!--        省-->
    <el-form :inline="true">
      <el-form-item label="选择收货人">
        <el-select v-model="uid" placeholder="请选择">
          <el-option
              v-for="item in userAddressList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    收货人姓名:{{userAddress.name}} <br>
    收货人手机号:{{userAddress.phone}} <br>
    收货人地址:{{userAddress.shengname+userAddress.shiname+userAddress.quname+userAddress.addresinfo}} <br>

  </div>
</template>

<script>

//import axios from "axios"

import axios from "axios";

export default {
  name: "teacherAdd",
  data() {
    return {
      userAddressList:[],
      uid:"",
      userAddress:{}
    }
  },
  methods: {
    //回显
    getUserAddressList(){
      axios.get(`http://127.0.0.1:9090/user/getUserAddressList`).then(res => {
        this.userAddressList=res.data;
        var vv=this.userAddressList.filter((add)=>{
          return add.isdefault==true;
        })
        this.userAddress=vv[0];
      })
    }

  }, mounted() {
    this.getUserAddressList();

  },watch:{
    uid:{
      handler(newValue){
        var vv=this.userAddressList.filter((add)=>{
          return add.id==newValue;
        })
        this.userAddress=vv[0];

      }
    }
  }
}
</script>

<style scoped>

</style>