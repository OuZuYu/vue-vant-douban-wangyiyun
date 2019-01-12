module.exports = {
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
            '/db': {
                target: 'https://api.douban.com',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/db': ''
                }
            }
        }
    }
}