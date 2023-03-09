<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>修改管理员账号密码</span>
    </div>
    <div style="width: 300px">
      用户名：
      <el-input
      v-model="rootdata.username">
      </el-input>
      密码：
      <el-input placeholder="请输入密码" v-model="rootdata.password" show-password></el-input>
      <el-button type="primary" style="margin: 10px 0 0 100px" @click="update">确认修改</el-button>
    </div>
</el-card>
</template>
<script>
export default {
   name: '',
   components: {
     
   },
   mixins: [],
   props: {
     
   },
   data() {
     return {
       rootdata:{}
     }
   },
   computed: {
     
   },
   watch: {
     
   },
   mounted() {
     this.axios.get('/getroot').then(res=>{
      this.rootdata= res.data[0]
     })
   },
   methods: {
     update(){
      this.axios.get('/updateroot',{params:this.rootdata}).then(res=>{
        this.$message(
          {showClose: true,
            message: '修改成功',
            type: 'success'
          })
      })
     }
   }
};
</script>
<style lang='' scoped>
</style>