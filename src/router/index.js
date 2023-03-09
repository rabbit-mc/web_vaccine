import vueRouter from 'vue-router'
import Main from '../views/Main'
import Login from '../views/login'
import vuex1 from '../store/index'
// src/router/index.js

const VueRouterPush = vueRouter.prototype.push
vueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

//创建并暴露一个路由器
const router = new vueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        component: Main,
        redirect: '/user',
        children: [
            {
                path: 'user',
                component: ()=> import('@/views/user/person')
            }, 
            {
                path: 'root',
                component: ()=> import('@/views/user/manage')
            }, 
            {
                path: 'yimiao',
                component: ()=> import('@/views/yimiao/index'),
            },
            {
                path: 'jiezhongdian',
                component: ()=> import('@/views/jiezhongdian/address'),
            },
            {
                path: 'doctor',
                component: ()=> import('@/views/jiezhongdian/doctor'),
            },
            {
                path: 'plan',
                component: ()=> import('@/views/yuyue/index'),
            },
            {
                path: 'pay',
                component: ()=> import('@/views/liucheng/pay'),
            },
            {
                path: 'select',
                component: ()=> import('@/views/liucheng/yuyue'),
            },
            {
                path: 'finish',
                component: ()=> import('@/views/liucheng/jiezhong'),
            },
        ]
    }, {
        path: '/login',
        component: Login,
        name: 'Login'
    }],
})
router.beforeEach((to, from, next) => { //路由导航守卫
    vuex1.commit('settoken')
    const token = vuex1.state.token
        // console.log('router', token);
        //如果token不存在，则一直是login
    if (!token && to.name !== 'Login') {
        next('/login')
            // console.log(111);
            //如果token存在则不可以登录，
    } else if (token && to.name == 'Login') {
        next('user')
            // console.log(222);
            //否则next
    } else {
        next()
            // console.log(333);
    }


})

export default router