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
            name: "homepage",
            path: "/",
            component: resolve => {
                require(['@/pages/HomePage'], resolve);
            }
        },



        // *
        // * 我的联系方式
        // * *
        {
            name: "contact",
            path: "/contact",
            component: resolve => {
                require(['@/pages/Contact'], resolve);
            }
        },



        // *
        // * 在线漫画
        // * *
        // 漫画书架页面
        {
            name: "comic",
            path: "/comic",
            component: resolve => {
                require(['@/pages/Comic'], resolve);
            }
        },
        // 漫画目录页面
        {
            name: "comiccatalog",
            path: "/comic/comiccatalog",
            component: resolve => {
                require(['@/pages/ComicCatalog'], resolve);
            }
        },
        // 漫画内容页面
        {
            name: "comicctt",
            path: "/comicctt",
            component: resolve => {
                require(['@/pages/ComicContent'], resolve);
            }
        },



        // *
        // * 文章页面
        // * *
        {
            name: "writes",
            path: "/writes",
            component: resolve => {
                require(['@/pages/Writes'], resolve);
            }
        },



        // *
        // * 404页面,并且将未定义的路由重定向到/404组件
        // * *
        {
            name: "404",
            path: "/404",
            component: resolve => {
                require(['@/pages/404'], resolve)
            }
        },
        { path: "*", redirect: "/404" }
    ]
});