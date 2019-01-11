module.exports = {
    css: {
        loaderOptions: {
            sass: {
                // 引入全局变量
                data: `@import "@/scss/variable.scss";`
            }
        }
    }
}