<template>
    <div>
        <el-container style="height:100vh">
            <el-aside width="auto">
                <CommonAside></CommonAside>
            </el-aside>
            <el-container>
                <el-header>
                    <CommonHeader></CommonHeader>
                </el-header>
                <el-main>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>
<script>
import CommonAside from '../components/CommonAside'
import CommonHeader from '../components/CommonHeader.vue'
export default {
    name: 'Main',
    components: {
        CommonAside,
        CommonHeader
    }

}
</script>
<style scoped lang="less">
.el-header {
    background-color: rgb(237,
            239,
            236);
}
</style> 