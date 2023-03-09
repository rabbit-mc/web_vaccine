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
    label="预约人姓名"
    width="100"
    align="center">
  </el-table-column>
  <el-table-column
    prop="hosptialname"
    label="接种点名称"
    align="center">
  </el-table-column>
  <el-table-column
    prop="appoint_date"
    label="预约日期"
    width="100"
    align="center">
  </el-table-column>
  <el-table-column
    prop="create_time"
    label="操作时间"
    width="200"
    align="center">
  </el-table-column>
  <el-table-column
    prop="timeslot"
    label="预约时间段"
    width="120"
    align="center">
  </el-table-column>
  <el-table-column
    prop="yimiaoname"
    label="疫苗名称"
    width="150"
    align="center">
  </el-table-column>
  <el-table-column
    prop="flag"
    label="当前状态"
    width="150"
    align="center">
  </el-table-column>
    </el-table>
</div>
</template>
<script>
export default {
 name: 'yuyue',
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
    this.axios.get('/yuyue').then(res=>{
      res.data.forEach(item=>{
        switch(item.time_slot){
          case 0:
            item.timeslot = '9点 - 12点'
            break
          case 1:
            item.timeslot = '14点 - 18点' 
            break
          case 2:
            item.timeslot = '19点 - 23点'
            break
        }
        switch(item.status){
          case 1:
            item.flag = '预约成功'
            break
          case 2:
          item.flag = '接种完成'
            break
          case 3:
            item.flag = '预约过期'
            break
          case 4:
            item.flag = '预约取消'
            break
          default:
            item.flag = '预约异常'
        }
        this.vaccine.push(item)
      })
    })
  },
  searchvacc() {
    if (this.input == '') {
      this.axios.get('/yuyue').then(value => {
          this.vaccine = value.data
          console.log('搜索信息为空页面渲染', value)

      }).catch(err => {
          console.log(err.message);
      })
    } else {
      // console.log(this.input);
      this.vaccine = []
      this.axios.get(`/yuyuename?name=${this.input}`).then(value => {
        value.data.forEach(item=>{
          item.time_slot = item.time_slot=0 ? '9点 - 12点' : item.time_slot=1 ? '14点 - 18点' : '19点 - 23点'
          item.status = item.status = 0 ? '待签到' : item.status = 1 ? '待预检' : item.status = 2 ? '待接种' : item.status = 3 ? '留观中' : item.status = 4 ? '接种结束' : item.status = 5 ? '预约过期' : item.status = 6 ? '取消预约' : '接种流程异常'
          this.vaccine.push(item)
        })
        console.log(this.vaccine)
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