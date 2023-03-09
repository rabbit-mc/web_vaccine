<template>
    <div>
      <div style="margin-bottom: 10px">
        <span>
            <el-input placeholder="请输入疫苗名称" style="width:250px;margin-right:10px" v-model="input"></el-input>
            <el-button type="primary" @click="searchvacc">搜索</el-button>
            <el-button type="primary" @click="dialogVisible = true;type='新增';title='疫苗添加'">添加</el-button>
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
      prop="name"
      label="疫苗名称"
      width="250"
      align="center">
    </el-table-column>
    <el-table-column
      prop="price"
      label="疫苗单价"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="manufacturer"
      label="生产厂家"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="category"
      label="疫苗种类"
      width="150"
      align="center">
    </el-table-column>
    <el-table-column
      prop="detail"
      label="疫苗详情"
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
        width="40%"
        @close="dialogVisible = false;init()">
        <el-form label-position="left" label-width="80px" :model="addvaccinfo">
          <el-form-item label="疫苗名称">
            <el-input v-model="addvaccinfo.name"></el-input>
          </el-form-item>
          <el-form-item label="疫苗单价">
            <el-input v-model="addvaccinfo.price"></el-input>
          </el-form-item>
          <el-form-item label="生产厂家">
            <el-input v-model="addvaccinfo.manufacturer"></el-input>
          </el-form-item>
          <el-form-item label="疫苗种类">
            <el-input v-model="addvaccinfo.category"></el-input>
          </el-form-item>
          <el-form-item label="疫苗详情">
            <el-input v-model="addvaccinfo.detail"></el-input>
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
       vaccine:[],
       input: '',
       dialogVisible :false,
       addvaccinfo:{
        name:'',
        price:'',
        manufacturer:'',
        category:'',
        detail:''
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
      this.axios.get('/getvacc').then(res=>{
        this.vaccine = res.data,
        this.addvaccinfo = {}
      })
    },
    searchvacc() {
      if (this.input == '') {
        this.axios.get('/getvacc').then(value => {
            this.vaccine = value.data
            console.log('搜索信息为空页面渲染', value)

        }).catch(err => {
            console.log(err.message);
        })
      } else {
        // console.log(this.input);
        this.axios.get(`/selectvacc?name=${this.input}`).then(value => {
          this.vaccine = value.data
        }).catch(err => {
            console.log(err.message);
        })
      }
    },
    //新增数据
    confirm(){
      if(this.type=='新增'){
        this.axios.get('/addvacc',{params:this.addvaccinfo}).then(res=>{
          console.log(res)
          this.dialogVisible = false
          this.init()
        })
      }else{
        this.axios.get('/updatevacc',{params:this.addvaccinfo}).then(res=>{
          this.dialogVisible = false
        })
      }
      
    },
    edit(index,item){
      this.title = '疫苗信息修改'
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