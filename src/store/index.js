//该文件用于创建vuex中核心的store

//引入vuex
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)

//准备actions  用于响应组件中的动作
const actions = {

};
//准备mutations  用于操作数据state
const mutations = {
    //判断是否展开
    collapseMenu(state) {
        state.isCollapse = !state.isCollapse
    },
    //面包屑功能
    selectMenu(state, value) {
        //判断右侧导航栏点击的的内容，若不为首页,并且在tablist中没有重复的
        var flag = 0
        state.tablist.forEach((item, index) => {
            if (item.name == value.name) {
                //实现如果面包屑里面有这个导航，则删除这个导航之后的导航
                state.tablist = state.tablist.slice(0, index + 1)
                flag = 1
            }
        });
        if (flag == 0) {
            state.tablist.push(value)
        } else {}
    },
    setsession(state, value) {
        sessionStorage.setItem('token', value)
    },
    settoken(state, token) {
        state.token = sessionStorage.getItem('token')
    },
    deltoken(state) {
        sessionStorage.removeItem('token')
        state.token = sessionStorage.getItem('token')
    }
};
//准备state  用于存储数据
const state = {
    //是否折叠左侧导航栏
    isCollapse: false,
    tablist: [{
        path: '/',
        name: 'home',
        icon: 'home',
        label: '首页'
    }, ],
    //存放token
    token: '',

};

//创建并且暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
})