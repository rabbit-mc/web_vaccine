<template>
  <div>
    <div style="margin-bottom: 10px">
      <span>
          <el-input placeholder="请输入接种点名称" style="width:250px;margin-right:10px" v-model="input"></el-input>
          <el-button type="primary" @click="searchadd">搜索</el-button>
          <el-button type="primary" @click="dialogVisible = true;type='新增';title='接种点添加';itemaddress={}">添加</el-button>
      </span>
    </div>
    <el-table
  :data="address"
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
    prop="name"
    label="接种点名称"
    width="250"
    align="center">
  </el-table-column>
  <el-table-column
    prop="province_code"
    label="所属省"
    width="120"
    align="center">
  </el-table-column>
  <el-table-column
    prop="city_code"
    label="所属市"
    width="180"
    align="center">
  </el-table-column>
  <el-table-column
    prop="district_code"
    label="所属区县"
    width="150"
    align="center">
  </el-table-column>
  <el-table-column
    prop="address"
    label="地点"
    width="300"
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
      width="64%"
      @close="dialogVisible = false;init()">
      <el-form label-position="left" label-width="100px" :model="itemaddress">
        <el-form-item label="接种点名称">
          <el-input v-model="itemaddress.name"></el-input>
        </el-form-item>
        <el-form-item label="添加区域">
          <el-select v-model="itemaddress.province_code" placeholder="请选择省">
            <el-option
              v-for="item in pro_city_qu.pro"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <el-select v-model="itemaddress.city_code" placeholder="请选择市" style="margin: 0 10px 0 10px">
            <el-option
              v-for="item in pro_city_qu.city"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <el-select v-model="itemaddress.district_code" placeholder="请选择区县">
            <el-option
              v-for="item in pro_city_qu.qu"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="itemaddress.address"></el-input>
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
      title:'',
      type:'',
      //所有省市区
      pro_city_qu:{
        pro:[],
        city:[],
        qu:[],
      },
      address:[],
      input: '',
      dialogVisible :false,
      itemaddress:{}
   }
 },
 computed: {
   
 },
 watch: {
  'itemaddress.province_code'(newvalue,old){
    this.getcity()
    console.log(this.itemaddress)
  },
  'itemaddress.city_code'(newvalue,old){
    this.getquxian()
    console.log(newvalue)
  }
 },
 mounted() {
  //初始化列表
   this.init()
   //获取省份
   this.getpro()
 },
 methods: {
  init(){
    this.axios.get('/getaddress').then(res=>{
      this.address = res.data
    })
  },
  searchadd() {
    if (this.input == '') {
      this.axios.get('/getaddress').then(value => {
          this.address = value.data
          console.log('搜索信息为空页面渲染', value)

      }).catch(err => {
          console.log(err.message);
      })
    } else {
      // console.log(this.input);
      this.axios.get(`/selectaddress?name=${this.input}`).then(value => {
        this.address = value.data
      }).catch(err => {
          console.log(err.message);
      })
    }
  },
  //新增数据
  confirm(){
    if(this.type=='新增'){
      this.axios.get('/addhosp',{params:this.itemaddress}).then(res=>{
        console.log(res)
        this.dialogVisible = false
        // this.init()
      })
    }else{
      this.axios.get('/updatehosp',{params:this.itemaddress}).then(res=>{
        this.dialogVisible = false
      })
    }
    console.log(this.itemaddress)
    
  },
  edit(index,item){
    this.title = '接种点修改'
    this.type='编辑'
    this.dialogVisible = true
    this.itemaddress = item
  },
  //获取省份
  getpro(){
    this.axios.get('/province').then(res=>{
      this.pro_city_qu.pro = res.data
    })
  },
  getcity(){
    this.axios.get(`/city`,{params:this.itemaddress.province_code}).then(res=>{
      this.pro_city_qu.city = res.data
    })
  },
  getquxian(){
    this.axios.get(`/quxian`,{params:this.itemaddress.city_code}).then(res=>{
      this.pro_city_qu.qu = res.data
    })
  }
  //获取市
  //获取区县
 }
};
</script>
<style lang='' scoped>
</style>