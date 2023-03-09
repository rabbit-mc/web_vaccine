import Vue from 'vue'
//引入app
import App from './App.vue'
import vueRouter from 'vue-router'
//全局引入elementui
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
//vue全局注入echarts
Vue.prototype.$echarts = echarts;
//引入路由器
import router from './router/index'
//引入vuex
import store from './store/index'
import axios from 'axios'
import 'default-passive-events';
//elementui按需引入
import {
    Button,
    Radio,
    Container,
    Main,
    Header,
    Aside,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    Card,
    Table,
    TableColumn,
    Breadcrumb,
    BreadcrumbItem,
    Tag,
    Form,
    FormItem,
    Dialog,
    Input,
    Select,
    Switch,
    DatePicker,
    Option,
    Pagination,
    MessageBox,
    Message
} from 'element-ui'
Vue.use(Button)
Vue.use(Radio)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(TableColumn)
Vue.use(Pagination)

//关闭生产提示
Vue.config.productionTip = false

//使用vueRouter
Vue.use(vueRouter)

Vue.prototype.axios = axios;
Vue.prototype.$message = Message
// Vue.use(ElementUI
Vue.prototype.axios = axios;
axios.interceptors.request.use(
        config => {
            if (store.state.token) {
                config.headers.Authorization = store.state.token
            }
            return config
        },
        err => {
            return Promise.reject(err)
        }
    )
    //创建vm
const vm = new Vue({
    el: '#app',
    store,
    render: h => h(App),
    router: router,
    //全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
    },
})