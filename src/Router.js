// *
// * 路由实例化
// * 路由配置
// *
import VueRouter from "vue-router";

export default new VueRouter({
    mode: "history",
    base: __dirname,
    routes: [
        // *
        // * 首页
        // * *
        {
            path: "/",
            component: resolve => {
                require(['@/pages/HomePage'], resolve);
            },
            children: [
                // 首页-总内容盒子
                {
                    path: "/",
                    component: resolve => {
                        require(['@/pages/FlexTitleAnima'], resolve);
                    }
                }
            ]
        },



        // *
        // * 我的联系方式
        // * *
        {
            path: "/contact",
            component: resolve => {
                require(['@/pages/Contact'], resolve);
            }
        },



        // *
        // * 在线漫画
        // * *
        // 书架页面
        {
            path: "/comic",
            name: "comic",
            component: resolve => {
                require(['@/pages/Comic'], resolve);
            }
        },
        // 漫画目录页面
        {
            path: "/comic/comiccatalog",
            component: resolve => {
                require(['@/pages/ComicCatalog'], resolve);
            }
        },
        // 漫画内容页面
        {
            path: "/comicctt",
            component: resolve => {
                require(['@/pages/ComicContent'], resolve);
            }
        },



        // *
        // * 影视欣赏
        // * *
        // 影视搜索页面
        {
            path: "/video",
            component: resolve => {
                require(['@/pages/Video'], resolve);
            }
        },
        // 影视信息和播放地址页面
        {
            path: "/videodetails",
            component: resolve => {
                require(['@/pages/VideoDetails'], resolve);
            }
        },


        // *
        // * 文章页面
        // * *
        {
            path: "/writes/:id",
            component: resolve => {
                require(['@/pages/Writes'], resolve);
            }
        },



        // *
        // * 404页面,并且将未定义的路由重定向到/404组件
        // * *
        {
            path: "/404",
            component: resolve => {
                require(['@/pages/404'], resolve)
            }
        },
        { path: "*", redirect: "/404" }
    ]
});