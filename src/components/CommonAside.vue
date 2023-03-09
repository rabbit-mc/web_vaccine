<template>
    <el-menu default-active="0" class="el-menu-vertical-demo" background-color='#545c64' text-color="#fff"
        active-text-color="#ffd04b" :collapse="isCollapse">
        <h3>{{ isCollapse ? '后台' : '疫苗预约接种' }}</h3>
        <el-submenu v-for="(item,index) in hasChildren" :index="index+''" :key="item.path">
            <template slot="title">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item @click="clickMenu(subitem)" v-for="subitem in item.children" :index="subitem.path"
                    :key="subitem.path">
                    <i :class="'el-icon-' + subitem.icon"></i>
                    <span slot="title">{{ subitem.label }}</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    height: 100%;
    border: none;

    h3 {
        text-align: center;
        line-height: 48px;
        color: rgb(255,
                255,
                255);
        font-weight: normal;
    }
}
</style>

<script>
export default {
    data() {
        return {
            //侧边栏显示的内容
            menu: [{
                label: '用户管理',
                icon: 'user-solid',
                children: [{
                    path: 'user',
                    name: 'user',
                    label: '接种者信息',
                }, {
                    path: 'root',
                    name: 'root',
                    label: '管理员信息',
                }]
            },{
                label: '疫苗管理',
                icon: 's-operation',
                children: [{
                    path: 'yimiao',
                    name: 'yimiao',
                    label: '疫苗信息',
                },]
            },{
                label: '接种点管理',
                icon: 'location',
                children: [{
                    path: 'jiezhongdian',
                    name: 'jiezhongdian',
                    label: '接种点信息',
                },{
                    path: 'doctor',
                    name: 'doctor',
                    label: '医护人员信息',
                },]
            },
            {
                label: '预约计划管理',
                icon: 's-grid',
                children: [{
                    path: 'plan',
                    name: 'plan',
                    label: '预约计划信息',
                },]
            },
            {
                label: '预约接种流程管理',
                icon: 's-marketing',
                children: [{
                    path: 'pay',
                    name: 'pay',
                    label: '支付查询',
                },{
                    path: 'select',
                    name: 'select',
                    label: '预约查询',
                },{
                    path: 'finish',
                    name: 'finish',
                    label: '接种查询',
                }
            ]
            },
        ],
        };
    },
    methods: {
        clickMenu(item) {
            // console.log(item.path);
            this.$router.push({ path: item.path })
            this.$store.commit('selectMenu', item)
        }
    },
    computed: {
        //判断侧边栏项目是否有子项目渲染
        noChildren() {
            return this.menu.filter(item => !item.children)
        },
        hasChildren() {
            return this.menu.filter(item => item.children)
        },
        isCollapse() {
            return this.$store.state.isCollapse
        }
    }
}
</script>