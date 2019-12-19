// *
// * Vue全局变量
// *

export default {

    // axios请求默认地址
    BASE_URL: "/",


    // 整页背景
    FullPageBg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554179280430&di=f95b9060c536837614b87cff91f3c6a1&imgtype=0&src=http%3A%2F%2Fclubimg.club.vmall.com%2Fdata%2Fattachment%2Fforum%2F201811%2F21%2F093948xyt7oconm4aoui44.jpg",



    // 404图片地址
    img403: `this.src='./assets/images/img404.jpg'`,



    // LRY-API(漫画,电源,小说)-------------- <=S
    // 接口地址
    ComicVideoApi: "http://api.pingcc.cn",
    // 漫画封面请求参数名
    ComicCover: "/?mhname=",
    // 漫画目录请求参数名
    ComicCatalog: "/?mhurl1=",
    // 漫画单个章节所有图片
    ComicPic: "/?mhurl2=",
    // 影视封面请求参数名
    VideoCover: "/?ysname=",
    // 影视播放地址请求参数名
    VideoUrl: "/?ysurl=",
    // LRY-API(漫画,电源,小说)-------------- =>E



    // Vue懒加载配置参数-------------<=S
    VueLazyConfig: {
        error: "./assets/images/img404.jpg"
    },
    // Vue懒加载配置参数-------------E=>



    // VueScroll滚动条配置参数--------------<=S
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
    }
    // VueScroll滚动条配置参数-------------eE=>
}