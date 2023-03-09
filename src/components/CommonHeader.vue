<template>
    <div class="header">
        <div class="left">
            <el-button icon="el-icon-s-grid" size="mini" class="btnsize" @click="changecoll"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }"
                    style="margin-left:10px;">{{ item.label }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-dropdown trigger="click" size="mini">
                <span class="imgsize">
                    <img :src="imgurl" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="closeuser">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'CommonHeader',
    data() {
        return {
            imgurl: require('../img/header.jpg')
        }
    },
    methods: {
        //改变折叠状态
        changecoll() {
            this.$store.commit('collapseMenu')
        },
        //退出之后，页面回到登录，删除sessionstorage中的token
        closeuser() {
            //清除token
            this.$store.commit('deltoken')
            //页面跳转到login
            this.$router.push('/login')
        }
    },
    computed: {
        ...mapState({ tags: 'tablist' }),
    },
}
</script>
<style scoped>
.header {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.left {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>