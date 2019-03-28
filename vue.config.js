module.exports = {
    // 服务器代理<=S
    devServer: {
        proxy: {
            // 腾讯漫画<=S
            '/tencentComic': {
                target: 'https://ac.qq.com/Recommend/get',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/tencentComic': ''
                }
            },
            // 腾讯漫画=>E
            // 网易头条=<S
            '/cloudHeadline': {
                target: 'http://c.m.163.com/nc/article/headline/T1348647853363/0-18.html',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/cloudHeadline': ''
                }
            },
            // 网易云漫画=>E
            // 网易精选<=
            '/cloudWell': {
                target: 'Shttp://c.3g.163.com/nc/article/list/T1467284926140/0-12.html',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/cloudWell': ''
                }
            },
            // 网易精选=>E
            // 网易休闲<=S
            '/cloudCasual': {
                target: 'http://c.3g.163.com/nc/article/list/T1348648517839/0-20.html',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/cloudCasual': ''
                }
            },
            // 网易休闲=>E
        }
    }
    // 服务器代理=>E
}