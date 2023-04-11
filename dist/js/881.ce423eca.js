"use strict";(self["webpackChunkhello"]=self["webpackChunkhello"]||[]).push([[881],{18881:function(e,t,a){a.r(t),a.d(t,{default:function(){return s}});var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticStyle:{"margin-bottom":"10px"}},[a("span",[a("el-input",{staticStyle:{width:"250px","margin-right":"10px"},attrs:{placeholder:"请输入疫苗名称"},model:{value:e.input,callback:function(t){e.input=t},expression:"input"}}),a("el-button",{attrs:{type:"primary"},on:{click:e.searchvacc}},[e._v("搜索")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!0,e.type="新增",e.title="接种计划添加"}}},[e._v("添加")])],1)]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.vaccine,border:""}},[a("el-table-column",{attrs:{fixed:"",prop:"id",label:"ID",width:"100",align:"center"}}),a("el-table-column",{attrs:{prop:"vaccine_name",label:"疫苗名称",width:"150",align:"center"}}),a("el-table-column",{attrs:{prop:"inco_name",label:"接种点名称",width:"200",align:"center"}}),a("el-table-column",{attrs:{prop:"amount",label:"可预约总量",width:"100",align:"center"}}),a("el-table-column",{attrs:{prop:"start_date",label:"起始日期",width:"120",align:"center"}}),a("el-table-column",{attrs:{prop:"end_date",label:"结束日期",width:"120",align:"center"}}),a("el-table-column",{attrs:{prop:"start_time_morning",label:"上午起始整点数",width:"150",align:"center"}}),a("el-table-column",{attrs:{prop:"morning_limit",label:"上午最大预约量",width:"150",align:"center"}}),a("el-table-column",{attrs:{prop:"end_time_morning",label:"上午结束整点数",width:"150",align:"center"}}),a("el-table-column",{attrs:{prop:"start_time_afternoon",label:"下午起始整点数",width:"150",align:"center"}}),a("el-table-column",{attrs:{prop:"afternoon_limit",label:"下午最大预约量",width:"150",align:"center"}}),a("el-table-column",{attrs:{prop:"end_time_afternoon",label:"下午结束整点数",width:"150",align:"center"}}),a("el-table-column",{attrs:{prop:"start_time_evening",label:"夜晚起始整点数",width:"150",align:"center"}}),a("el-table-column",{attrs:{prop:"evening_limit",label:"夜晚最大预约量",width:"150",align:"center"}}),a("el-table-column",{attrs:{prop:"end_time_evening",label:"夜晚结束整点数",width:"150",align:"center"}}),a("el-table-column",{attrs:{label:"操作",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.edit(t.$index,t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),a("el-dialog",{attrs:{title:e.title,visible:e.dialogVisible,width:"40%"},on:{"update:visible":function(t){e.dialogVisible=t},close:function(t){e.dialogVisible=!1,e.init()}}},[a("el-form",{attrs:{"label-position":"left","label-width":"100px",model:e.addvaccinfo}},[a("el-form-item",{attrs:{label:"请选择接种点"}},[a("el-select",{attrs:{placeholder:"请选择接种点"},model:{value:e.addvaccinfo.inco_name,callback:function(t){e.$set(e.addvaccinfo,"inco_name",t)},expression:"addvaccinfo.inco_name"}},e._l(e.address,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.name}})})),1)],1),a("el-form-item",{attrs:{label:"请选择疫苗"}},[a("el-select",{attrs:{placeholder:"请选择接种点"},model:{value:e.addvaccinfo.vaccine_name,callback:function(t){e.$set(e.addvaccinfo,"vaccine_name",t)},expression:"addvaccinfo.vaccine_name"}},e._l(e.vacc,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.name}})})),1)],1),a("el-form-item",{attrs:{label:"起始时间"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择起始日期","value-format":"yyyy-MM-dd"},model:{value:e.addvaccinfo.start_date,callback:function(t){e.$set(e.addvaccinfo,"start_date",t)},expression:"addvaccinfo.start_date"}})],1),a("el-form-item",{attrs:{label:"结束时间"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择结束日期","value-format":"yyyy-MM-dd"},model:{value:e.addvaccinfo.end_date,callback:function(t){e.$set(e.addvaccinfo,"end_date",t)},expression:"addvaccinfo.end_date"}})],1),a("el-form-item",{attrs:{label:"可预约总量"}},[a("el-input",{model:{value:e.addvaccinfo.amount,callback:function(t){e.$set(e.addvaccinfo,"amount",t)},expression:"addvaccinfo.amount"}})],1),a("el-form-item",{attrs:{label:"上午起始"}},[a("el-input",{model:{value:e.addvaccinfo.start_time_morning,callback:function(t){e.$set(e.addvaccinfo,"start_time_morning",t)},expression:"addvaccinfo.start_time_morning"}})],1),a("el-form-item",{attrs:{label:"上午限制"}},[a("el-input",{model:{value:e.addvaccinfo.morning_limit,callback:function(t){e.$set(e.addvaccinfo,"morning_limit",t)},expression:"addvaccinfo.morning_limit"}})],1),a("el-form-item",{attrs:{label:"上午结束"}},[a("el-input",{model:{value:e.addvaccinfo.end_time_morning,callback:function(t){e.$set(e.addvaccinfo,"end_time_morning",t)},expression:"addvaccinfo.end_time_morning"}})],1),a("el-form-item",{attrs:{label:"下午起始"}},[a("el-input",{model:{value:e.addvaccinfo.start_time_afternoon,callback:function(t){e.$set(e.addvaccinfo,"start_time_afternoon",t)},expression:"addvaccinfo.start_time_afternoon"}})],1),a("el-form-item",{attrs:{label:"下午限制"}},[a("el-input",{model:{value:e.addvaccinfo.afternoon_limit,callback:function(t){e.$set(e.addvaccinfo,"afternoon_limit",t)},expression:"addvaccinfo.afternoon_limit"}})],1),a("el-form-item",{attrs:{label:"下午结束"}},[a("el-input",{model:{value:e.addvaccinfo.end_time_afternoon,callback:function(t){e.$set(e.addvaccinfo,"end_time_afternoon",t)},expression:"addvaccinfo.end_time_afternoon"}})],1),a("el-form-item",{attrs:{label:"夜晚起始"}},[a("el-input",{model:{value:e.addvaccinfo.start_time_evening,callback:function(t){e.$set(e.addvaccinfo,"start_time_evening",t)},expression:"addvaccinfo.start_time_evening"}})],1),a("el-form-item",{attrs:{label:"夜晚限制"}},[a("el-input",{model:{value:e.addvaccinfo.evening_limit,callback:function(t){e.$set(e.addvaccinfo,"evening_limit",t)},expression:"addvaccinfo.evening_limit"}})],1),a("el-form-item",{attrs:{label:"夜晚结束"}},[a("el-input",{model:{value:e.addvaccinfo.end_time_evening,callback:function(t){e.$set(e.addvaccinfo,"end_time_evening",t)},expression:"addvaccinfo.end_time_evening"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1,e.init()}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.confirm}},[e._v("确 定")])],1)],1)],1)},n=[],l={name:"yycx",components:{},mixins:[],props:{},data(){return{vacc:"",address:[],title:"",type:"",vaccine:[],input:"",dialogVisible:!1,addvaccinfo:{username:"",real_name:"",card_id:"",phone:"",name:""}}},computed:{},watch:{},mounted(){this.init()},methods:{init(){this.axios.get("/planinfo").then((e=>{this.vaccine=e.data,this.addvaccinfo={}})),this.axios.get("/getaddress").then((e=>{this.address=e.data})),this.axios.get("/getvacc").then((e=>{this.vacc=e.data}))},searchvacc(){""==this.input?this.axios.get("/planinfo").then((e=>{this.vaccine=e.data,console.log("搜索信息为空页面渲染",e)})).catch((e=>{console.log(e.message)})):this.axios.get(`/plansea?name=${this.input}`).then((e=>{this.vaccine=e.data})).catch((e=>{console.log(e.message)}))},confirm(){"新增"==this.type?(this.address.forEach((e=>{this.addvaccinfo.inco_name==e.name&&(this.addvaccinfo.inoculate_site_id=e.id)})),this.vacc.forEach((e=>{this.addvaccinfo.vaccine_name==e.name&&(this.addvaccinfo.vaccine_id=e.id)})),this.axios.get("/addplan",{params:this.addvaccinfo}).then((e=>{this.dialogVisible=!1,this.$message({message:"添加数据成功",type:"success"})}))):(this.address.forEach((e=>{this.addvaccinfo.inco_name==e.name&&(this.addvaccinfo.inoculate_site_id=e.id)})),this.vacc.forEach((e=>{this.addvaccinfo.vaccine_name==e.name&&(this.addvaccinfo.vaccine_id=e.id)})),console.log(this.addvaccinfo),this.axios.get("/updateplan",{params:this.addvaccinfo}).then((e=>{this.dialogVisible=!1,this.$message({message:"修改成功",type:"success"})})))},edit(e,t){this.title="接种计划修改",this.type="编辑",this.dialogVisible=!0,this.addvaccinfo=t}}},c=l,o=a(1001),d=(0,o.Z)(c,i,n,!1,null,"692f4010",null),s=d.exports}}]);
//# sourceMappingURL=881.ce423eca.js.map