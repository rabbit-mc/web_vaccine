<template>
  <div>
    <div style="margin-bottom: 10px">
      <span>
          <el-input placeholder="请输入医护人员姓名" style="width:250px;margin-right:10px" v-model="input"></el-input>
          <el-button type="primary" @click="searchvacc">搜索</el-button>
          <el-button type="primary" @click="dialogVisible = true;type='新增';title='医护人员添加'">添加</el-button>
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
    prop="username"
    label="账号"
    width="100"
    align="center">
  </el-table-column>
  <el-table-column
    prop="real_name"
    label="姓名"
    width="100"
    align="center">
  </el-table-column>
  <el-table-column
    prop="card_id"
    label="身份证号"
    width="230"
    align="center">
  </el-table-column>
  <el-table-column
    prop="phone"
    label="手机号"
    width="150"
    align="center">
  </el-table-column>
  <el-table-column
    prop="name"
    label="所属接种点"
    width="250"
    align="center">
  </el-table-column>
  <el-table-column
    prop="password"
    label="密码"
    width="200"
    align="center">
  </el-table-column>
  <el-table-column
    label="操作"
    align="center"
    width="100"
    >
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
        <el-form-item label="账号">
          <el-input v-model="addvaccinfo.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addvaccinfo.real_name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="addvaccinfo.card_id"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="addvaccinfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addvaccinfo.password"></el-input>
        </el-form-item>
        <el-form-item label="请选择接种点">
          <el-select v-model="addvaccinfo.name" placeholder="请选择接种点">
            <el-option
              v-for="item in address"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
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
 name: '',
 components: {
   
 },
 mixins: [],
 props: {
   
 },
 data() {
   return {
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
    this.axios.get('/doctorinfo').then(res=>{
      this.vaccine = res.data,
      this.addvaccinfo = {}
    })
    this.axios.get('/getaddress').then(res=>{
      this.address = res.data
      // this.addvaccinfo = {}
    })
  },
  searchvacc() {
    if (this.input == '') {
      this.axios.get('/doctorinfo').then(value => {
          this.vaccine = value.data
          console.log('搜索信息为空页面渲染', value)

      }).catch(err => {
          console.log(err.message);
      })
    } else {
      // console.log(this.input);
      this.axios.get(`/selectdoctor?name=${this.input}`).then(value => {
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
        if(this.addvaccinfo.name == item.name){
          this.addvaccinfo.inoculate_site_id = item.id
        }
      })
      this.axios.get('/adddoctor',{params:this.addvaccinfo}).then(res=>{
        console.log(res)
        this.dialogVisible = false
        // this.init()
      })
    }else{
      this.axios.get('/updatedoctor',{params:this.addvaccinfo}).then(res=>{
        this.dialogVisible = false
      })
    }
    
  },
  edit(index,item){
    this.title = '医护人员信息修改'
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