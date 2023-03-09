<template>
    <div>
        <el-form ref="form" label-width="100px" :model="form" :inline="inline">
            <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
                <!-- 姓名 年龄 地址 -->
                <el-input v-if="item.type === 'input'" :placeholder="'请输入' + item.label + item.xianding"
                    v-model="form[item.model]">
                </el-input>
                <el-switch v-if="item.type == 'switch'" v-model="form[item.model]"></el-switch>
                <!-- 出生日期 -->
                <el-date-picker v-if="item.type == 'date'" type="date" value-format="yyyy-MM-dd" placeholder="
                选择时间" v-model="form[item.model]"></el-date-picker>
                <!-- 性别 -->
                <el-select v-if="item.type === 'select'" placeholder="请选择" v-model="form[item.model]">
                    <el-option v-for="items in item.opts" :key="items.value" :label="items.label" :value="items.label">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <slot></slot>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'Form',
    props: {
        formLabel: Array,
        form: Object,
        inline: Boolean,
    },
    // props: ['formLabel', 'form'],
    data() {
        return {

        }
    },
}
</script>
<style>
</style>