<template>
  <div>
    <div style="margin-bottom: 10px">
      <span>
          <el-input placeholder="请输入接种人" style="width:250px;margin-right:10px" v-model="input"></el-input>
          <el-button type="primary" @click="searchvacc">搜索</el-button>
      </span>
    </div>
    <el-table
  :data="vaccine"
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
    prop="real_name"
    label="接种人姓名"
    align="center">
  </el-table-column>
  <el-table-column
    prop="cost"
    label="支付金额"
    width="200"
    align="center">
  </el-table-column>
  <el-table-column
    prop="vaccname"
    label="疫苗名称"
    align="center">
  </el-table-column>
  <el-table-column
    prop="create_time"
    label="支付时间"
    align="center">
  </el-table-column>
    </el-table>
</div>
</template>
<script>
export default {
 name: 'pay',
 components: {
   
 },
 mixins: [],
 props: {
   
 },
 data() {
   return {
    vacc:'',
    address:[],
    title:'',
     type:'',
     vaccine:[],
     input: '',
     dialogVisible :false,
     addvaccinfo:{
      username:'',
      real_name:'',
      card_id:'',
      phone:'',
      name:'',
     }
   }
 },
 computed: {
   
 },
 watch: {
   
 },
 mounted() {
   this.init()
 },
 methods: {
  init(){
    this.axios.get('/pay').then(res=>{
        this.vaccine = res.data
    })
  },
  searchvacc() {
    if (this.input == '') {
      this.axios.get('/pay').then(value => {
          this.vaccine = value.data
          console.log('搜索信息为空页面渲染', value)

      }).catch(err => {
          console.log(err.message);
      })
    } else {
      // console.log(this.input);
      this.vaccine = []
      this.axios.get(`/payname?name=${this.input}`).then(value => {
        this.vaccine = value.data
      }).catch(err => {
          console.log(err.message);
      })
    }
  },
  }
}
</script>
<style lang='' scoped>
</style>