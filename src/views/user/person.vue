<template>
  <div>
    <div style="margin-bottom: 10px">
      <span>
          <el-input placeholder="请输入接种者姓名" style="width:250px;margin-right:10px" v-model="input"></el-input>
          <el-button type="primary" @click="searchuser">搜索</el-button>
      </span>
    </div>
    <el-table
    :data="userinfo"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="ID"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="real_name"
      label="姓名"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="card_id"
      label="身份证号"
      width="300"
      align="center">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300"
      align="center">
    </el-table-column>
    <el-table-column
      label="操作"
      align="center">
      <template slot-scope="scope">
        <el-button type="text"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
   name: '',
   components: {
     
   },
   mixins: [],
   props: {
     
   },
   data() {
     return {
       userinfo: [],
       input: '',
     }
   },
   computed: {
     
   },
   watch: {
     
   },
   mounted() {
    axios.get('/showuserinfo').then((res)=>{
     console.log(res.data)
     this.userinfo = res.data
    }).catch(()=>{
      this.userinfo=[]
    })
   },
   methods: {
    //删除用户
    handleDelete(index,item){
      axios.get('/deleteuser', { params: item })
      .then(() => {
        axios.get('/showuserinfo')
        .then(value => {
          this.userinfo = value.data
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'});
        })
      }).catch((res)=>{
        console.log(res)
      })
            
    },
    searchuser() {
       if (this.input == '') {
          axios.get('/showuserinfo').then(value => {
              this.userinfo = value.data

          }).catch(err => {
              console.log(err.message);
          })
      } else {
          axios.get(`selectuser?name=${this.input}`).then(value => {
            this.userinfo = value.data
          }).catch(err => {
          })
      }
    }
  }
}
</script>
<style lang='' scoped>
</style>