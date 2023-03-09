<template>
    <div>
        <!-- 总体展示页面 分为两列 -->
        <el-row class="home" :gutter="10">
            <!-- 左侧页面 -->
            <el-col :span="8">
                <!-- 左上侧用户信息及登录时间地点信息 -->
                <el-card>
                    <div slot="header" class="usertotal">
                        <img :src="imgurl" alt="" />
                        <div class="userinfo">
                            <p class="name">Admin</p>
                            <p class="access">超级管理员</p>
                        </div>
                    </div>
                    <div>
                        <p>上次登录时间:<span class="logindate">2022-7-20</span></p>
                        <p>上次登录地点:<span class="logindate">陕西西安</span></p>
                    </div>
                </el-card>
                <!-- 下方品牌列表信息 -->
                <el-card style="margin-top:10px;">
                    <el-table :data="tabledata">
                        <el-table-column v-for="(item, key) in tablelist" :key-="key" :prop="key" :label="item">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <!-- 右侧页面 -->
            <el-col :span="16">
                <!-- 订单详细信息 -->
                <div class="num" style="display:flex; justify-content: space-between;">
                    <el-card class="dingdan" v-for="item in countdata" :key=item.name
                        :body-style="{ display: 'flex', padding: 0 }">
                        <span class="iconsize" :style="{ background: item.color }"> <i class="icon"
                                :class="`el-icon-${item.icon}`"></i>
                        </span>
                        <div class="detail">
                            <p class="num">￥{{ item.value }}</p>
                            <p class="txt">{{ item.name }}</p>
                        </div>
                    </el-card>
                </div>
                <!-- 折线图显示页面 -->
                <el-card style="height:260px;margin-bottom: 10px;">
                    <div style="height:260px" ref="echarts"></div>
                </el-card>
                <div class="graph">
                    <el-card style="height:260px;width:355px;">
                        <!-- 柱形图 -->
                        <div style="height:260px" ref="echartsbar"></div>
                    </el-card>
                    <!-- 扇形图 -->
                    <el-card style="height:260px;width:355px">
                        <div style="height:260px" ref="echartspie"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts'
import '../../css/echarts.min'
export default {
    name: 'Home',
    data() {
        return {
            imgurl: require('../../img/header.jpg'),
            //表格body内容
            tabledata: [{
                name: '苹果',
                todaybuy: 100,
                monthbuy: 300,
                totalbuy: 800,
            },
            {
                name: 'oppo',
                todaybuy: 100,
                monthbuy: 300,
                totalbuy: 800,
            },
            {
                name: 'vivo',
                todaybuy: 100,
                monthbuy: 300,
                totalbuy: 800,
            }, {
                name: '三星',
                todaybuy: 100,
                monthbuy: 300,
                totalbuy: 800,
            }, {
                name: '魅族',
                todaybuy: 100,
                monthbuy: 300,
                totalbuy: 800,
            },

            ],
            //表格头部内容
            tablelist: {
                name: '品牌',
                todaybuy: '今日购买',
                monthbuy: '本月购买',
                todaybuy: '总购买'
            },
            countdata: [
                {
                    name: '今日支付订单',
                    value: 1234,
                    icon: 'success',
                    color: '#2ec7c9'
                }, {
                    name: '今日收藏订单',
                    value: 210,
                    icon: 'star-on',
                    color: '#ffb980'
                }, {
                    name: '今日未支付订单',
                    value: 1234,
                    icon: 's-goods',
                    color: '#5ab1ef'
                }, {
                    name: '本月支付订单',
                    value: 1234,
                    icon: 'success',
                    color: '#2ec7c9'
                }, {
                    name: '本月收藏订单',
                    value: 210,
                    icon: 'star-on',
                    color: '#ffb980'
                }, {
                    name: '本月未支付订单',
                    value: 1234,
                    icon: 's-goods',
                    color: '#5ab1ef'
                },
            ]
        }
    },
    mounted() {
        axios.get(' http://localhost:8080/getData').then(value => {
            //服务器请求过来的数据
            var totaldata = value.data
            //1.seriesline为折线图的数据
            let seriesline = []
            //获取过来的数据遍历
            totaldata[4].forEach((item, index) => {
                //使得name属性为图例 content属性为data数据
                //将name和data插入到servies数组中展示
                seriesline.push({
                    name: item.name,
                    data: item.content,
                    type: 'line'
                })

            })
            // 指定图表的配置项和数据
            const optionline = {
                tooltip: { show: true },
                title: {
                    text: '手机品牌2019上半年月销售'
                },
                tooltip: {},
                legend: {
                    //显示图例
                    show: true,
                    //图例在右边显示
                    x: 'right'
                },//居右显示
                xAxis: {
                    //横坐标的内容
                    data: totaldata[2]
                },
                yAxis: {
                    type: 'value',
                    scale: true
                },
                series: seriesline,
            };
            // 使用刚指定的配置项和数据显示图表。
            var E = echarts.init(this.$refs.echarts)
            E.setOption(optionline)

            //2.柱形图
            var optionbar = {
                tooltip: { show: true },
                legend: {
                    show: true,
                    x: 'right',
                },
                xAxis: {
                    type: 'category',
                    data: totaldata[1].map(item => item.data)
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '新增用户',
                    data: totaldata[1].map(item => item.new),
                    type: 'bar'
                }, {
                    name: '活跃用户',
                    data: totaldata[1].map(item => item.active),
                    type: 'bar'
                },]
            };
            //图形根据ref属性的值插入页面
            var B = echarts.init(this.$refs.echartsbar)
            B.setOption(optionbar)

            //3.饼图
            var optionpie = {
                tooltip: { show: true },
                // color: ["#0f78f4", "#dd536b", "＃FF0000", "a6a6a6", "39c362", "#3ed1cf"],
                series: [
                    {
                        type: 'pie',
                        data: totaldata[0],
                        label: {
                            show: true,
                            position: 'inside',
                        },
                    },
                ],
            };
            var P = echarts.init(this.$refs.echartspie)
            P.setOption(optionpie)
        })
    }
}
</script>
<style scoped>
img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.userinfo {
    display: inline-block;
    margin-left: 20px;
}

.usertotal {
    display: flex;
    align-items: center;
}

.name {
    font-size: 20px;
}

.access {
    margin-top: 3px;
    font-size: 12px;
    color: rgb(186,
            187,
            191);
}

.logindate {
    margin-left: 20px;
}

.num {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.dingdan {
    width: 230px;
    height: 60px;
    margin-bottom: 10px;

}

.iconsize {
    display: inline-block;
    height: 60px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;

}

i {
    font-size: 30px;
}

.detail {
    padding: 5px 0 0 5px;

}

.detail .num {
    font-size: 25px;
}

.detail .txt {
    font-size: 12px;
    color: rgb(206,
            206,
            206);
    padding-left: 6px
}

.graph {
    display: flex;
    justify-content: space-between;
}
</style>