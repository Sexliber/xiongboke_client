// *
// * Vue全局变量
// * userConfiger: 用户配置信息
// * browserConfiger: 浏览器配置
// *

let userConfiger = {

    // *
    // * 首页静态图片
    // * *
    // 背景图片
    FullPageBg: "../assets/images/homepage/background.jpg",
    // 首屏轮播图
    homepageHeaderImg: [
        "../assets/images/homepage/advert-bg-3.jpg",
        "../assets/images/homepage/advert-bg-1.jpg",
        "../assets/images/homepage/advert-bg-4.jpg",
        "../assets/images/homepage/advert-bg-2.jpg",
    ],

}

let browserConfiger = {
    // axios请求默认地址
    BASE_URL: "/",



    // 404图片地址
    img403: `this.src='./assets/images/img404.jpg'`,



    // *
    // * LRY-API(漫画,电源,小说)
    // * *
    // 漫画封面请求参数名,@params mhname:漫画名
    ComicCover: "http://api.pingcc.cn/?mhname=",
    // 漫画目录请求参数名,@params mhurl1: ComicCover接口获取的url
    ComicCatalog: "http://api.pingcc.cn/?mhurl1=",
    // 漫画单个章节所有图片,@params mhurl2: ComicCatalog接口获取的url
    ComicPic: "http://api.pingcc.cn/?mhurl2=",




    // *
    // * VueScroll滚动条配置参数
    // * *
    VueScrollConfig: {
        ops: {
            vuescroll: {
                mode: 'native',
                sizeStrategy: Number,
                detectResize: true
            },
            scrollPanel: {
                initialScrollY: false,
                initialScrollX: false,
                scrollingX: false,
                scrollingY: true,
                easing: 'easeInOutQuint',
                verticalNativeBarPos: 'right'
            },
            bar: {
                showDelay: 500,
                onlyShowBarOnScroll: true,
                keepShow: false,
                background: '#ffc815',
                opacity: 1,
                hoverStyle: false,
                specifyBorderRadius: false,
                minSize: false,
                size: '6px',
                disable: false,
            }
        },
        name: 'vueScroll'
    },





    // *
    // * Vue懒加载配置
    // * *
    VueLazyConfig: {
        error: "./assets/images/img404.jpg"
    },
}

export default Object.assign(userConfiger, browserConfiger);