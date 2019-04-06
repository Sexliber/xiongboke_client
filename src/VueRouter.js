// 组件引入<=S
import HomePage from "./pages/HomePage";
import Writes from "./pages/Writes";
import PageNotFound from "./pages/404";
import Contact from "./pages/Contact";
import TencentComic from "./components/TencentComics";
// 组件引入=>E

// 引入路由器模块
import VueRouter from "vue-router";

export default new VueRouter({
    mode: "history",
    base: __dirname,
    routes: [
        // 首页
        { path: "/", component: HomePage },
        // 我的信息
        {
            path: "/contact", component: Contact, children: [{ path: "laji", component: TencentComic }]
        },
        // 文章页面
        { path: "/writes/:id", component: Writes },
        // 404页面
        { path: "/404", component: PageNotFound },
        { path: "*", redirect: "/404" }
    ]
});