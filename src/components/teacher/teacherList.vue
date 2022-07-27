<template>
  <div>

    <el-form :inline="true" >
      <el-form-item label="姓名">
        <el-input v-model="searchMap.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toTeacherList">查询</el-button>
        <el-button type="primary" @click="toAddTeacher">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          label="编号"
          width="50"
          prop="id">
      </el-table-column>
      <el-table-column
          label="姓名"
          width="180"
          prop="name">
      </el-table-column>
      <el-table-column
          label="年龄"
          width="50"
          prop="age">
      </el-table-column>
      <el-table-column
          label="创建日期"
          width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime |toFormatTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="修改时间"
          width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.updateTime |toFormatTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleStudentList(scope.row)">查看学生
          </el-button>
          <el-button
              size="mini"
              @click="handleEdit(scope.row.id)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete( scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="sizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    <el-dialog
        title="学生信息"
        :visible.sync="dialogVisible"
        width="30%"
       >

          <table class="datatable">
            <thead>
            <tr>
              <th>编号</th>
              <th>姓名</th>
              <th>年龄</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,i) in StudentList" :key="i">
              <td><label >{{item.id}}</label></td>
              <td><label >{{item.name}}</label></td>
              <td><label >{{item.age}}</label></td>
            </tr>
            </tbody>
          </table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios"
import moment from "moment"

export default {
  name: "teacherList",
  data() {
    return {
      StudentList:[],
      dialogVisible: false,
      tableData: [],
      currentPage4: 1,
      total: 0,
      sizes: 5,
      searchMap: {name: ""}
    }
  },
  methods: {
    toAddTeacher(){
      //路由页面跳转
      this.$router.push({path:'/teacherAdd'});
    },
    handleEdit(id) {
      this.$router.push({path:'/teacherEdit/'+id});
      // this.$router.push({path:'/teacherEdit/'+id});

    },
    handleDelete(id) {
      this.$confirm('是否删除老师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete(`http://127.0.0.1:9092/teachersFeign/deleteTeacher/${id}`).then(res => {
          if (res.data == 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.toTeacherList();
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            });
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSizeChange(val) {
      this.sizes = val;
      this.toTeacherList();
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.toTeacherList();
    },
    toTeacherList() {
      axios.post(`http://127.0.0.1:9092/teachersFeign/findTeacherList/${this.currentPage4}/${this.sizes}`, this.searchMap).then(res => {
        this.total = res.data.total;
        this.tableData = res.data.rows;
      })
    },
    handleStudentList(row){
      //这个方法用来展示学生信息

      this.StudentList=row.students;
      this.dialogVisible=true;
    }

  }, mounted() {
    this.toTeacherList();
  }, filters: {
    toFormatTime(date) {
      return moment(date).utcOffset(0, false).format("YYYY-MM-DD HH:mm:ss")
    }

  }
}
</script>

<style scoped>

</style>