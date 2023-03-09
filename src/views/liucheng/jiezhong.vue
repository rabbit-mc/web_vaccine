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
      prop="realid"
      label="ID"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="us_name"
      label="接种人姓名"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="part"
      label="接种部位"
      width="80"
      align="center">
    </el-table-column>
    <el-table-column
      prop="va_name"
      label="疫苗名称"
      align="center">
    </el-table-column>
    <el-table-column
      prop="wo_name"
      label="医护人员姓名"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="接种时间"
      align="center">
    </el-table-column>
    <el-table-column
      prop="name"
      label="接种点名称"
      align="center">
    </el-table-column>
    <el-table-column
      prop="note"
      label="备注"
      align="center">
    </el-table-column>
      </el-table>
  </div>
  </template>
  <script>
  export default {
   name: 'finish',
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
      this.axios.get('/finish').then(res=>{
          this.vaccine = res.data
      })
    },
    searchvacc() {
      if (this.input == '') {
        this.axios.get('/finish').then(value => {
            this.vaccine = value.data
            console.log('搜索信息为空页面渲染', value)
  
        }).catch(err => {
            console.log(err.message);
        })
      } else {
        // console.log(this.input);
        this.vaccine = []
        this.axios.get(`/finishsea?name=${this.input}`).then(value => {
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