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
            path: "/404", component: resolve => {
                require(['@/pages/404'], resolve)
            }
        },
        { path: "*", redirect: "/404" }
    ]
});