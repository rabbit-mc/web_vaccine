const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false, //关闭语法检查
    //开启代理服务器（方式一）
    devServer: {
        proxy: 'http://localhost:3000'
    },
    //代理服务器（方式二）
    // devServer: {
    //     proxy: {
    //         '/mc1': {
    //             target: 'http://localhost:5000',
    //             pathRewrite: { '/mc1': '' }
    //             // ws: true,
    //             // changeOrigin: true
    //         },
    //         '/mc2': {
    //             target: 'http://localhost:5001',
    //             pathRewrite: { '/mc2': '' }
    //             // ws: true,
    //             // changeOrigin: true
    //         },
    //     }
    // }
})