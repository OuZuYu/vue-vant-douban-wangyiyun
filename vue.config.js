module.exports = {
    baseUrl: './',
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
            },
            '/api': {
                target: 'http://67.216.223.155:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}