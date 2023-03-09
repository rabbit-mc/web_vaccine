<template>
  <div>
    <div style="margin-bottom: 10px">
      <span>
          <el-input placeholder="请输入疫苗名称" style="width:250px;margin-right:10px" v-model="input"></el-input>
          <el-button type="primary" @click="searchvacc">搜索</el-button>
          <el-button type="primary" @click="dialogVisible = true;type='新增';title='接种计划添加'">添加</el-button>
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
    prop="vaccine_name"
    label="疫苗名称"
    width="150"
    align="center">
  </el-table-column>
  <el-table-column
    prop="inco_name"
    label="接种点名称"
    width="200"
    align="center">
  </el-table-column>
  <el-table-column
    prop="amount"
    label="可预约总量"
    width="100"
    align="center">
  </el-table-column>
  <el-table-column
    prop="start_date"
    label="起始日期"
    width="120"
    align="center">
  </el-table-column>
  <el-table-column
    prop="end_date"
    label="结束日期"
    width="120"
    align="center">
  </el-table-column>
  <el-table-column
    prop="start_time_morning"
    label="上午起始整点数"
    width="150"
    align="center">
  </el-table-column>
  <el-table-column
    prop="morning_limit"
    label="上午最大预约量"
    width="150"
    align="center">
  </el-table-column>
  <el-table-column
    prop="end_time_morning"
    label="上午结束整点数"
    width="150"
    align="center">
  </el-table-column>
  <el-table-column
    prop="start_time_afternoon"
    label="下午起始整点数"
    width="150"
    align="center">
  </el-table-column>
  <el-table-column
    prop="afternoon_limit"
    label="下午最大预约量"
    width="150"
    align="center">
  </el-table-column>
  <el-table-column
    prop="end_time_afternoon"
    label="下午结束整点数"
    width="150"
    align="center">
  </el-table-column>
  <el-table-column
    prop="start_time_evening"
    label="夜晚起始整点数"
    width="150"
    align="center">
  </el-table-column>
  <el-table-column
    prop="evening_limit"
    label="夜晚最大预约量"
    width="150"
    align="center">
  </el-table-column>
  <el-table-column
    prop="end_time_evening"
    label="夜晚结束整点数"
    width="150"
    align="center">
  </el-table-column>
  <el-table-column
    label="操作"
    align="center"
    width="100">
    <template slot-scope="scope">
      <el-button type="text"  @click="edit(scope.$index, scope.row)">编辑</el-button>
      <el-button type="text"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
    </template>
  </el-table-column>
    </el-table>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="40%"
      @close="dialogVisible = false;init()">
      <el-form label-position="left" label-width="100px" :model="addvaccinfo">
        <el-form-item label="请选择接种点">
          <el-select v-model="addvaccinfo.inco_name" placeholder="请选择接种点">
            <el-option
              v-for="item in address"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择疫苗">
          <el-select v-model="addvaccinfo.vaccine_name" placeholder="请选择接种点">
            <el-option
              v-for="item in vacc"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始时间">
          <el-date-picker
            v-model="addvaccinfo.start_date"
            type="date"
            placeholder="选择起始日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="addvaccinfo.end_date"
            type="date"
            placeholder="选择结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="可预约总量">
          <el-input v-model="addvaccinfo.amount"></el-input>
        </el-form-item>
        <el-form-item label="上午起始">
          <el-input v-model="addvaccinfo.start_time_morning"></el-input>
        </el-form-item>
        <el-form-item label="上午限制">
          <el-input v-model="addvaccinfo.morning_limit"></el-input>
        </el-form-item>
        <el-form-item label="上午结束">
          <el-input v-model="addvaccinfo.end_time_morning"></el-input>
        </el-form-item>
        <el-form-item label="下午起始">
          <el-input v-model="addvaccinfo.start_time_afternoon"></el-input>
        </el-form-item>
        <el-form-item label="下午限制">
          <el-input v-model="addvaccinfo.afternoon_limit"></el-input>
        </el-form-item>
        <el-form-item label="下午结束">
          <el-input v-model="addvaccinfo.end_time_afternoon"></el-input>
        </el-form-item>
        <el-form-item label="夜晚起始">
          <el-input v-model="addvaccinfo.start_time_evening"></el-input>
        </el-form-item>
        <el-form-item label="夜晚限制">
          <el-input v-model="addvaccinfo.evening_limit"></el-input>
        </el-form-item>
        <el-form-item label="夜晚结束">
          <el-input v-model="addvaccinfo.end_time_evening"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;init()">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>
<script>
export default {
 name: 'yycx',
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
    this.axios.get('/planinfo').then(res=>{
      this.vaccine = res.data,
      this.addvaccinfo = {}
    })
    this.axios.get('/getaddress').then(res=>{
      this.address = res.data
      // this.addvaccinfo = {}
    })
    this.axios.get('/getvacc').then(res=>{
      this.vacc = res.data
      // this.addvaccinfo = {}
    })
  },
  searchvacc() {
    if (this.input == '') {
      this.axios.get('/planinfo').then(value => {
          this.vaccine = value.data
          console.log('搜索信息为空页面渲染', value)

      }).catch(err => {
          console.log(err.message);
      })
    } else {
      // console.log(this.input);
      this.axios.get(`/plansea?name=${this.input}`).then(value => {
        this.vaccine = value.data
      }).catch(err => {
          console.log(err.message);
      })
    }
  },
  //新增数据
  confirm(){
    if(this.type=='新增'){
      this.address.forEach(item=>{
        if(this.addvaccinfo.inco_name == item.name){
          this.addvaccinfo.inoculate_site_id = item.id
        }
      })
      this.vacc.forEach(item=>{
        if(this.addvaccinfo.vaccine_name == item.name){
          this.addvaccinfo.vaccine_id = item.id
        }
      })
      this.axios.get('/addplan',{params:this.addvaccinfo}).then(res=>{
        this.dialogVisible = false
        this.$message({
          message: '添加数据成功',
          type: 'success'
        });
        // this.init()
      })
    }else{
      this.address.forEach(item=>{
        if(this.addvaccinfo.inco_name == item.name){
          this.addvaccinfo.inoculate_site_id = item.id
        }
      })
      this.vacc.forEach(item=>{
        if(this.addvaccinfo.vaccine_name == item.name){
          this.addvaccinfo.vaccine_id = item.id
        }
      })
      console.log(this.addvaccinfo)
      this.axios.get('/updateplan',{params:this.addvaccinfo}).then(res=>{
        this.dialogVisible = false
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      })
    }
    
  },
  edit(index,item){
    this.title = '接种计划修改'
    this.type='编辑'
    this.dialogVisible = true
    this.addvaccinfo = item
  },
  //清空输入的内容
 }
};
</script>
<style lang='' scoped>
</style>