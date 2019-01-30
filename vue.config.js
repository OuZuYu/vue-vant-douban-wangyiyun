module.exports = {
    // baseUrl: './',
    css: {
        loaderOptions: {
            sass: {
                // 引入全局变量
                data: `@import "@/scss/variable.scss";`
            }
        }
    },
    devServer: {
        proxy: {
            '/v2': {
                target: 'https://api.douban.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/v2': '/v2'
                }
            }
        }
    }
}