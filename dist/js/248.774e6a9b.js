"use strict";(self["webpackChunkhello"]=self["webpackChunkhello"]||[]).push([[248],{11248:function(t,a,e){e.r(a),e.d(a,{default:function(){return i}});var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("el-card",{staticClass:"box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",[t._v("修改管理员账号密码")])]),e("div",{staticStyle:{width:"300px"}},[t._v(" 用户名： "),e("el-input",{model:{value:t.rootdata.username,callback:function(a){t.$set(t.rootdata,"username",a)},expression:"rootdata.username"}}),t._v(" 密码： "),e("el-input",{attrs:{placeholder:"请输入密码","show-password":""},model:{value:t.rootdata.password,callback:function(a){t.$set(t.rootdata,"password",a)},expression:"rootdata.password"}}),e("el-button",{staticStyle:{margin:"10px 0 0 100px"},attrs:{type:"primary"},on:{click:t.update}},[t._v("确认修改")])],1)])},o=[],r={name:"",components:{},mixins:[],props:{},data(){return{rootdata:{}}},computed:{},watch:{},mounted(){this.axios.get("/getroot").then((t=>{this.rootdata=t.data[0]}))},methods:{update(){this.axios.get("/updateroot",{params:this.rootdata}).then((t=>{this.$message({showClose:!0,message:"修改成功",type:"success"})}))}}},l=r,n=e(1001),d=(0,n.Z)(l,s,o,!1,null,"5ef720f0",null),i=d.exports}}]);
//# sourceMappingURL=248.774e6a9b.js.map